import React, { useState } from 'react';
import { FileAttachment } from '../../types/file';
import { fileService } from '../../services/fileService';
import { formatFileSize } from '../../utils/fileValidation';
import FilePreview from './FilePreview';

interface FileListProps {
  files: FileAttachment[];
  onDelete: (fileId: string) => Promise<void>;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  const [previewFile, setPreviewFile] = useState<FileAttachment | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (fileId: string) => {
    setIsDeleting(fileId);
    try {
      await onDelete(fileId);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex-1">
                <button
                  onClick={() => setPreviewFile(file)}
                  className="text-left hover:text-blue-600"
                >
                  {file.fileName}
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 h-10 w-10">
              <button
                type="button"
                className="px-2 py-1 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {previewFile && (
        <FilePreview file={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </>
  );
};

export default FileList; 