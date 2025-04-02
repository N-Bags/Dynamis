from fastapi import Request, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Optional, List
import re
from datetime import datetime
import boto3
from botocore.exceptions import ClientError

from app.core.security_config import JWT_CONFIG, AWS_SECURITY_CONFIG
from app.services.audit_service import audit_service

security = HTTPBearer()

class SecurityMiddleware:
    def __init__(self):
        self.secrets_manager = boto3.client('secretsmanager')
        self.waf_client = boto3.client('wafv2')
        self.rate_limit = AWS_SECURITY_CONFIG['waf']['rate_limit']
        self.blocked_ips = AWS_SECURITY_CONFIG['waf']['blocked_ips']
        self.geo_restrictions = AWS_SECURITY_CONFIG['waf']['geo_restrictions']

    async def __call__(self, request: Request, call_next):
        # Check for blocked IPs
        client_ip = request.client.host
        if client_ip in self.blocked_ips:
            raise HTTPException(status_code=403, detail="IP address blocked")

        # Geographic restrictions are handled by AWS WAF
        # This middleware only logs the request for audit purposes
        if self.geo_restrictions['enabled']:
            await audit_service.log_security_event(
                event_type='geo_check',
                user_id=None,
                action='request',
                resource='api',
                ip_address=client_ip,
                user_agent=request.headers.get('user-agent')
            )

        # Add security headers
        response = await call_next(request)
        response.headers.update({
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "X-XSS-Protection": "1; mode=block",
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
            "Content-Security-Policy": "default-src 'self'"
        })
        
        return response

class RBACMiddleware:
    def __init__(self):
        self.required_permissions = {}
        self.secrets_manager = boto3.client('secretsmanager')
        self.jwt_secret = self._get_jwt_secret()

    def _get_jwt_secret(self) -> str:
        """Retrieve JWT secret from AWS Secrets Manager"""
        try:
            response = self.secrets_manager.get_secret_value(
                SecretId=AWS_SECURITY_CONFIG['secrets_manager']['jwt_secret_name']
            )
            return response['SecretString']
        except ClientError as e:
            raise Exception(f"Failed to retrieve JWT secret: {str(e)}")

    def require_permissions(self, permissions: List[str]):
        def decorator(func):
            self.required_permissions[func.__name__] = permissions
            return func
        return decorator

    async def verify_permissions(self, 
                               credentials: HTTPAuthorizationCredentials = Security(security),
                               required_permissions: List[str] = None) -> bool:
        try:
            # Verify JWT token using secret from AWS Secrets Manager
            payload = jwt.decode(
                credentials.credentials,
                self.jwt_secret,
                algorithms=[JWT_CONFIG['algorithm']]
            )
            
            # Get user permissions from token
            user_permissions = payload.get('permissions', [])
            
            # Check if user has required permissions
            if required_permissions:
                return all(perm in user_permissions for perm in required_permissions)
            return True
            
        except JWTError:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication credentials"
            )

class RateLimitMiddleware:
    def __init__(self):
        self.rate_limit = AWS_SECURITY_CONFIG['waf']['rate_limit']
        self.rate_limit_window = 300  # 5 minutes in seconds

    async def check_rate_limit(self, request: Request) -> bool:
        # Rate limiting is handled by AWS WAF
        # This middleware only logs the request for audit purposes
        client_ip = request.client.host
        await audit_service.log_security_event(
            event_type='rate_limit_check',
            user_id=None,
            action='request',
            resource='api',
            ip_address=client_ip
        )
        return True

class GDPRComplianceMiddleware:
    def __init__(self):
        self.consent_required = True
        self.data_retention_period = 365  # days

    async def check_consent(self, request: Request) -> bool:
        # Check if user has given consent for data processing
        consent_header = request.headers.get('X-Data-Processing-Consent')
        return consent_header == 'true'

    async def log_data_processing(self, 
                                user_id: str,
                                data_type: str,
                                processing_purpose: str) -> None:
        await audit_service.log_gdpr_event(
            event_type='data_processing',
            user_id=user_id,
            action='process_data',
            data_type=data_type,
            details={'purpose': processing_purpose}
        )

# Create middleware instances
security_middleware = SecurityMiddleware()
rbac_middleware = RBACMiddleware()
rate_limit_middleware = RateLimitMiddleware()
gdpr_middleware = GDPRComplianceMiddleware() 