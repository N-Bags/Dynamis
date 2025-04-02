import api from './api';
import { FileAttachment } from '../types/file';

export const fileService = {
  uploadFile: async (file: File, entityType: string, entityId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityType', entityType);
    formData.append('entityId', entityId);

    const response = await api.post<FileAttachment>('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteFile: async (fileId: string) => {
    await api.delete(`/files/${fileId}`);
  },

  getFilesByEntity: async (entityType: string, entityId: string) => {
    const response = await api.get<FileAttachment[]>(`/files/entity/${entityType}/${entityId}`);
    return response.data;
  }
}; 