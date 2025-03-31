import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateFile, defaultValidationConfig } from '../../utils/fileValidation';
import { fileService } from '../../services/fileService';

interface FileUploaderProps {
  entityType: string;
  entityId: string;
  onUploadComplete: (file: FileAttachment) => void;
  onError: (error: string) => void;
  validationConfig?: FileValidationConfig;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  entityType,
  entityId,
  onUploadComplete,
  onError,
  validationConfig = defaultValidationConfig
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validation = validateFile(file, validationConfig);
    if (!validation.isValid) {
      onError(validation.error!);
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFile = await fileService.uploadFile(file, entityType, entityId);
      onUploadComplete(uploadedFile);
    } catch (error) {
      onError('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }, [entityType, entityId, onUploadComplete, onError, validationConfig]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Uploading...</span>
        </div>
      ) : isDragActive ? (
        <p>Drop the file here</p>
      ) : (
        <div>
          <p>Drag and drop a file here, or click to select</p>
          <p className="text-sm text-gray-500 mt-2">
            Supported files: {validationConfig.allowedTypes.join(', ')}
            <br />
            Max size: {validationConfig.maxSizeInMB}MB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader; 