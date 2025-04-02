import api from './api';
import { Transaction } from '../store/slices/financialSlice';

export const financialService = {
  getAllTransactions: () => api.get<Transaction[]>('/transactions'),
  getTransaction: (id: string) => api.get<Transaction>(`/transactions/${id}`),
  createTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Transaction>('/transactions', transaction),
  updateTransaction: (id: string, transaction: Partial<Transaction>) => 
    api.put<Transaction>(`/transactions/${id}`, transaction),
  deleteTransaction: (id: string) => api.delete(`/transactions/${id}`),
}; 