export interface FileValidationConfig {
  maxSizeInMB: number;
  allowedTypes: string[];
}

export const defaultValidationConfig: FileValidationConfig = {
  maxSizeInMB: 10,
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
};

export const validateFile = (
  file: File,
  config: FileValidationConfig = defaultValidationConfig
): { isValid: boolean; error?: string } => {
  if (file.size > config.maxSizeInMB * 1024 * 1024) {
    return {
      isValid: false,
      error: `File size must be less than ${config.maxSizeInMB}MB`
    };
  }

  if (!config.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed`
    };
  }

  return { isValid: true };
} 