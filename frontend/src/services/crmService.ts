import api from './api';
import { Lead } from '../store/slices/crmSlice';

export const crmService = {
  getAllLeads: () => api.get<Lead[]>('/leads'),
  getLead: (id: string) => api.get<Lead>(`/leads/${id}`),
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Lead>('/leads', lead),
  updateLead: (id: string, lead: Partial<Lead>) => 
    api.put<Lead>(`/leads/${id}`, lead),
  deleteLead: (id: string) => api.delete(`/leads/${id}`),
}; 