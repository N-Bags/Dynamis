import React from 'react';
import { FileAttachment } from '../../types/file';

interface FilePreviewProps {
  file: FileAttachment;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const isImage = file.fileType.startsWith('image/');
  const isPDF = file.fileType === 'application/pdf';
  const isText = file.fileType.startsWith('text/');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{file.fileName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {isImage && (
            <img
              src={file.url}
              alt={file.fileName}
              className="max-w-full h-auto mx-auto"
            />
          )}
          {isPDF && (
            <iframe
              src={`${file.url}#view=FitH`}
              className="w-full h-full min-h-[500px]"
              title={file.fileName}
            />
          )}
          {isText && (
            <pre className="whitespace-pre-wrap p-4 bg-gray-50 rounded">
              <code>{/* Text content would be loaded here */}</code>
            </pre>
          )}
          {!isImage && !isPDF && !isText && (
            <div className="text-center py-8">
              <p>Preview not available for this file type.</p>
              <a
                href={file.url}
                download
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview; 