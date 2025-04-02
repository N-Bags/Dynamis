from enum import Enum
from typing import Dict, List, Set

class UserRole(str, Enum):
    OWNER = "owner"
    ADMIN = "admin"
    MANAGER = "manager"
    TEAM_MEMBER = "team_member"

# Define permissions for each role
ROLE_PERMISSIONS: Dict[UserRole, Set[str]] = {
    UserRole.OWNER: {
        "manage_users",
        "manage_roles",
        "manage_billing",
        "manage_settings",
        "view_analytics",
        "manage_projects",
        "manage_teams",
        "manage_integrations",
        "manage_security",
        "manage_compliance",
        "view_audit_logs",
        "manage_api_keys",
        "manage_encryption_keys",
        "manage_backups",
        "manage_infrastructure"
    },
    UserRole.ADMIN: {
        "manage_users",
        "manage_roles",
        "manage_settings",
        "view_analytics",
        "manage_projects",
        "manage_teams",
        "manage_integrations",
        "view_audit_logs",
        "manage_api_keys"
    },
    UserRole.MANAGER: {
        "manage_projects",
        "manage_teams",
        "view_analytics",
        "view_audit_logs"
    },
    UserRole.TEAM_MEMBER: {
        "view_projects",
        "view_teams",
        "view_analytics"
    }
}

# Define sensitive data fields that require encryption
SENSITIVE_FIELDS = {
    "user": ["password", "ssn", "credit_card", "bank_account"],
    "project": ["client_secret", "api_key", "access_token"],
    "financial": ["amount", "account_number", "routing_number", "tax_id"]
}

# AWS Security Services Configuration
AWS_SECURITY_CONFIG = {
    "cloudtrail": {
        "log_group_name": "/aws/cloudtrail/dynamis",
        "log_retention_days": 90,
        "include_global_services": True,
        "is_multi_region_trail": True
    },
    "cloudwatch": {
        "log_group_name": "/aws/dynamis",
        "log_retention_days": 30,
        "alarm_thresholds": {
            "failed_login_attempts": 5,
            "api_errors": 100,
            "unauthorized_access": 1
        }
    },
    "waf": {
        "rate_limit": 2000,  # requests per 5 minutes
        "blocked_ips": [],  # list of blocked IP addresses
        "geo_restrictions": {
            "enabled": True,
            "allowed_countries": ["US", "CA", "GB", "EU"],  # GDPR compliance
            "blocked_countries": []  # countries to block
        }
    },
    "secrets_manager": {
        "jwt_secret_name": "/dynamis/jwt/secret",
        "kms_key_name": "/dynamis/kms/key",
        "rotation_period": 90  # days
    }
}

# GDPR Compliance Settings
GDPR_CONFIG = {
    "data_retention_period": 365,  # days
    "data_export_format": "json",
    "consent_required": True,
    "privacy_policy_version": "1.0",
    "data_processing_agreement": True,
    "right_to_be_forgotten": True,
    "data_portability": True
}

# Encryption Settings
ENCRYPTION_CONFIG = {
    "algorithm": "AES-256-GCM",
    "key_rotation_period": 90,  # days
    "key_storage": "AWS KMS",
    "encryption_context": {
        "environment": "production",
        "application": "dynamis"
    }
}

# JWT Settings
JWT_CONFIG = {
    "algorithm": "HS256",
    "access_token_expire_minutes": 30,
    "refresh_token_expire_days": 7,
    "token_type": "bearer",
    "issuer": "dynamis-ai",
    "audience": "dynamis-clients",
    "secret_key_source": "aws_secrets_manager"  # Indicates secret key is stored in AWS Secrets Manager
}

# Audit Logging Configuration
AUDIT_CONFIG = {
    "log_level": "INFO",
    "log_format": "json",
    "include_ip": True,
    "include_user_agent": True,
    "include_timestamp": True,
    "include_user_id": True,
    "include_action": True,
    "include_resource": True,
    "include_changes": True
} 