import api from './api';
import { Task } from '../store/slices/taskSlice';

export const taskService = {
  getAllTasks: () => api.get<Task[]>('/tasks'),
  getTask: (id: string) => api.get<Task>(`/tasks/${id}`),
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Task>('/tasks', task),
  updateTask: (id: string, task: Partial<Task>) => 
    api.put<Task>(`/tasks/${id}`, task),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
}; 