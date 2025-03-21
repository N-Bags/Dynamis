import boto3
import json
from datetime import datetime, timedelta
from typing import Any, Dict, Optional
from botocore.exceptions import ClientError

from app.core.security_config import ENCRYPTION_CONFIG, SENSITIVE_FIELDS

class SecurityService:
    def __init__(self):
        self.kms_client = boto3.client('kms')
        self.key_id = self._get_or_create_kms_key()
        
    def _get_or_create_kms_key(self) -> str:
        """Get or create a KMS key for encryption"""
        try:
            # List existing keys
            response = self.kms_client.list_keys()
            for key in response['Keys']:
                # Check if key is for our application
                tags = self.kms_client.list_resource_tags(KeyId=key['KeyId'])
                if any(tag['TagKey'] == 'Application' and tag['TagValue'] == 'Dynamis' 
                      for tag in tags['Tags']):
                    return key['KeyId']
            
            # Create new key if none exists
            response = self.kms_client.create_key(
                Description='Dynamis Encryption Key',
                KeyUsage='ENCRYPT_DECRYPT',
                Origin='AWS_KMS',
                Tags=[
                    {'TagKey': 'Application', 'TagValue': 'Dynamis'},
                    {'TagKey': 'Environment', 'TagValue': 'Production'}
                ]
            )
            return response['KeyMetadata']['KeyId']
        except ClientError as e:
            raise Exception(f"Failed to manage KMS key: {str(e)}")

    def encrypt_sensitive_data(self, data: Dict[str, Any], data_type: str) -> Dict[str, Any]:
        """Encrypt sensitive fields in the data"""
        if data_type not in SENSITIVE_FIELDS:
            return data
            
        encrypted_data = data.copy()
        for field in SENSITIVE_FIELDS[data_type]:
            if field in encrypted_data:
                encrypted_data[field] = self._encrypt_value(encrypted_data[field])
        return encrypted_data

    def decrypt_sensitive_data(self, data: Dict[str, Any], data_type: str) -> Dict[str, Any]:
        """Decrypt sensitive fields in the data"""
        if data_type not in SENSITIVE_FIELDS:
            return data
            
        decrypted_data = data.copy()
        for field in SENSITIVE_FIELDS[data_type]:
            if field in decrypted_data:
                decrypted_data[field] = self._decrypt_value(decrypted_data[field])
        return decrypted_data

    def _encrypt_value(self, value: Any) -> str:
        """Encrypt a single value using KMS"""
        try:
            response = self.kms_client.encrypt(
                KeyId=self.key_id,
                Plaintext=str(value).encode(),
                EncryptionContext=ENCRYPTION_CONFIG['encryption_context']
            )
            return response['CiphertextBlob'].decode('utf-8')
        except ClientError as e:
            raise Exception(f"Encryption failed: {str(e)}")

    def _decrypt_value(self, encrypted_value: str) -> str:
        """Decrypt a single value using KMS"""
        try:
            response = self.kms_client.decrypt(
                KeyId=self.key_id,
                CiphertextBlob=encrypted_value.encode(),
                EncryptionContext=ENCRYPTION_CONFIG['encryption_context']
            )
            return response['Plaintext'].decode('utf-8')
        except ClientError as e:
            raise Exception(f"Decryption failed: {str(e)}")

    def rotate_encryption_key(self) -> None:
        """Rotate the KMS key"""
        try:
            self.kms_client.enable_key_rotation(KeyId=self.key_id)
        except ClientError as e:
            raise Exception(f"Failed to rotate key: {str(e)}")

    def get_key_status(self) -> Dict[str, Any]:
        """Get the current status of the KMS key"""
        try:
            response = self.kms_client.describe_key(KeyId=self.key_id)
            return {
                'key_id': response['KeyMetadata']['KeyId'],
                'key_state': response['KeyMetadata']['KeyState'],
                'creation_date': response['KeyMetadata']['CreationDate'].isoformat(),
                'key_usage': response['KeyMetadata']['KeyUsage'],
                'origin': response['KeyMetadata']['Origin']
            }
        except ClientError as e:
            raise Exception(f"Failed to get key status: {str(e)}")

    def revoke_access(self, key_id: str) -> None:
        """Revoke access to the KMS key"""
        try:
            self.kms_client.disable_key(KeyId=key_id)
        except ClientError as e:
            raise Exception(f"Failed to revoke key access: {str(e)}")

# Create a singleton instance
security_service = SecurityService() 