# Security & Compliance Implementation Guide

This guide provides detailed instructions for implementing security and compliance measures in Dynamis AI.

## Table of Contents
1. [GDPR Compliance](#gdpr-compliance)
2. [Data Encryption](#data-encryption)
3. [Authentication & Authorization](#authentication--authorization)
4. [Security Monitoring](#security-monitoring)
5. [Best Practices](#best-practices)
6. [AWS Secrets Manager Setup](#aws-secrets-manager-setup)

## GDPR Compliance

### AWS Services for GDPR Compliance
1. **AWS CloudTrail**
   - Enable CloudTrail in all regions
   - Configure log file validation
   - Set up S3 bucket for log storage
   - Enable CloudWatch Logs integration

2. **AWS CloudWatch**
   - Create log groups for different data types
   - Set up log retention policies
   - Configure alerts for security events

3. **AWS WAF**
   - Set up geographic restrictions
   - Configure rate limiting
   - Implement IP blocking

### Implementation Steps
1. **Data Processing Agreements**
   ```bash
   # Enable CloudTrail
   aws cloudtrail create-trail \
     --name dynamis-trail \
     --s3-bucket-name dynamis-logs \
     --include-global-service-events \
     --is-multi-region-trail
   ```

2. **Data Retention**
   - Set up lifecycle policies in S3
   - Configure RDS backup retention
   - Implement data deletion workflows

3. **User Consent Management**
   - Store consent records in DynamoDB
   - Implement consent withdrawal process
   - Set up data export functionality

## Data Encryption

### AES-256 Encryption Implementation
1. **AWS KMS Setup**
   ```bash
   # Create KMS key
   aws kms create-key \
     --description "Dynamis Encryption Key" \
     --key-usage ENCRYPT_DECRYPT \
     --origin AWS_KMS \
     --tags TagKey=Application,TagValue=Dynamis
   ```

2. **Key Rotation**
   - Enable automatic key rotation
   - Set up key rotation monitoring
   - Implement key backup procedures

3. **Data Encryption Process**
   ```python
   # Example encryption
   from app.services.security_service import security_service
   
   # Encrypt sensitive data
   encrypted_data = security_service.encrypt_sensitive_data(
       data={"ssn": "123-45-6789"},
       data_type="user"
   )
   ```

## Authentication & Authorization

### JWT Implementation
1. **Token Generation**
   ```python
   from app.core.security import create_access_token
   
   # Generate token
   token = create_access_token(
       subject=user_id,
       expires_delta=timedelta(minutes=30)
   )
   ```

2. **Token Validation**
   ```python
   from app.middleware.security import rbac_middleware
   
   # Verify token and permissions
   await rbac_middleware.verify_permissions(
       credentials=token,
       required_permissions=["manage_users"]
   )
   ```

### Role-Based Access Control (RBAC)
1. **User Roles**
   - Owner: Full system access
   - Admin: System management access
   - Manager: Team and project management
   - Team Member: Basic access

2. **Permission Implementation**
   ```python
   from app.core.security_config import UserRole, ROLE_PERMISSIONS
   
   # Check permissions
   def has_permission(user_role: UserRole, permission: str) -> bool:
       return permission in ROLE_PERMISSIONS[user_role]
   ```

## Security Monitoring

### AWS CloudWatch Setup
1. **Log Groups**
   ```bash
   # Create log group
   aws logs create-log-group \
     --log-group-name /aws/dynamis \
     --retention-in-days 30
   ```

2. **Alarms**
   ```bash
   # Create security alarm
   aws cloudwatch put-metric-alarm \
     --alarm-name dynamis-security-alarm \
     --metric-name FailedLoginAttempts \
     --namespace Dynamis \
     --statistic Sum \
     --period 300 \
     --threshold 5 \
     --alarm-actions arn:aws:sns:region:account:topic
   ```

### AWS WAF Configuration
1. **Rate Limiting**
   ```bash
   # Create rate-based rule
   aws wafv2 create-web-acl \
     --name dynamis-rate-limit \
     --scope REGIONAL \
     --default-action Allow={} \
     --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=dynamis-rate-limit
   ```

2. **Geographic Restrictions**
   ```bash
   # Create geo-match rule
   aws wafv2 create-rule-group \
     --name dynamis-geo-restrictions \
     --scope REGIONAL \
     --capacity 100 \
     --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=dynamis-geo
   ```

## Best Practices

### Security Headers
```python
# Add security headers
response.headers.update({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'"
})
```

### Data Validation
```python
from pydantic import BaseModel, EmailStr, constr

class UserData(BaseModel):
    email: EmailStr
    password: constr(min_length=8)
    full_name: str
```

### Error Handling
```python
from fastapi import HTTPException

async def handle_security_error(error: Exception):
    if isinstance(error, JWTError):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials"
        )
    # Handle other security errors
```

## Common Pitfalls and Solutions

1. **Token Management**
   - Problem: Tokens stored in localStorage
   - Solution: Use httpOnly cookies with secure flag

2. **Password Storage**
   - Problem: Plain text passwords
   - Solution: Use bcrypt with salt

3. **API Security**
   - Problem: Missing rate limiting
   - Solution: Implement AWS WAF rules

4. **Data Encryption**
   - Problem: Hardcoded encryption keys
   - Solution: Use AWS KMS

5. **Logging**
   - Problem: Sensitive data in logs
   - Solution: Implement log masking

## Regular Security Tasks

1. **Daily**
   - Review security logs
   - Check for failed login attempts
   - Monitor API usage

2. **Weekly**
   - Review user permissions
   - Check for suspicious activities
   - Update security patches

3. **Monthly**
   - Rotate encryption keys
   - Review security policies
   - Conduct security training

4. **Quarterly**
   - Perform security audit
   - Update compliance documentation
   - Review access controls

## AWS Secrets Manager Setup

### JWT Secret Key Management
1. **Create Secret in AWS Secrets Manager**
   ```bash
   # Generate a secure random string for the JWT secret
   JWT_SECRET=$(openssl rand -base64 32)
   
   # Create the secret in AWS Secrets Manager
   aws secretsmanager create-secret \
     --name /dynamis/jwt/secret \
     --description "JWT secret key for Dynamis authentication" \
     --secret-string "{\"jwt_secret\": \"$JWT_SECRET\"}" \
     --kms-key-id alias/aws/secretsmanager \
     --tags Key=Application,Value=Dynamis
   ```

2. **Configure Secret Rotation**
   ```bash
   # Enable automatic rotation
   aws secretsmanager rotate-secret \
     --secret-id /dynamis/jwt/secret \
     --rotation-rules AutomaticallyAfterDays=90
   ```

3. **Set Up IAM Permissions**
   ```bash
   # Create IAM policy for Secrets Manager access
   aws iam create-policy \
     --policy-name dynamis-secrets-access \
     --policy-document '{
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "secretsmanager:GetSecretValue",
             "secretsmanager:DescribeSecret",
             "secretsmanager:ListSecrets"
           ],
           "Resource": [
             "arn:aws:secretsmanager:*:*:secret:/dynamis/*"
           ]
         }
       ]
     }'
   ```

4. **Attach Policy to ECS Task Role**
   ```bash
   # Attach the policy to the ECS task role
   aws iam attach-role-policy \
     --role-name dynamis-ecs-task-role \
     --policy-arn arn:aws:iam::*:policy/dynamis-secrets-access
   ```

### Secret Retrieval in Application
```python
# Example of retrieving JWT secret in the application
import boto3
from botocore.exceptions import ClientError

def get_jwt_secret():
    secrets_manager = boto3.client('secretsmanager')
    try:
        response = secrets_manager.get_secret_value(
            SecretId='/dynamis/jwt/secret'
        )
        secret_data = json.loads(response['SecretString'])
        return secret_data['jwt_secret']
    except ClientError as e:
        raise Exception(f"Failed to retrieve JWT secret: {str(e)}")
```

### Monitoring and Auditing
1. **Set Up CloudWatch Alarms**
   ```bash
   # Create alarm for failed secret retrievals
   aws cloudwatch put-metric-alarm \
     --alarm-name dynamis-secret-retrieval-alarm \
     --metric-name SecretRetrievalFailures \
     --namespace Dynamis \
     --statistic Sum \
     --period 300 \
     --threshold 5 \
     --alarm-actions arn:aws:sns:region:account:topic
   ```

2. **Configure CloudTrail Logging**
   ```bash
   # Enable CloudTrail logging for Secrets Manager
   aws cloudtrail put-event-selectors \
     --trail-name dynamis-trail \
     --event-selectors '[{
       "ReadWriteType": "ReadOnly",
       "IncludeManagementEvents": true,
       "DataResources": [{
         "Type": "AWS::SecretsManager::Secret",
         "Values": ["arn:aws:secretsmanager:*:*:secret:/dynamis/*"]
       }]
     }]'
   ```

### Best Practices for Secret Management
1. **Regular Rotation**
   - Rotate secrets every 90 days
   - Monitor rotation status
   - Maintain rotation history

2. **Access Control**
   - Use IAM roles for service access
   - Implement least privilege principle
   - Monitor access patterns

3. **Monitoring**
   - Set up alerts for failed retrievals
   - Monitor access patterns
   - Review audit logs regularly

4. **Backup and Recovery**
   - Maintain backup copies of secrets
   - Document recovery procedures
   - Test recovery processes 