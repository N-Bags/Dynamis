export interface FileAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  entityType: 'task' | 'lead' | 'transaction';
  entityId: string;
} 