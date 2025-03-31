import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Task API endpoints
export const taskApi = {
  getAll: () => api.get('/tasks'),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (data: any) => api.post('/tasks', data),
  update: (id: string, data: any) => api.put(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

// CRM API endpoints
export const crmApi = {
  getAllLeads: () => api.get('/leads'),
  getLeadById: (id: string) => api.get(`/leads/${id}`),
  createLead: (data: any) => api.post('/leads', data),
  updateLead: (id: string, data: any) => api.put(`/leads/${id}`, data),
  deleteLead: (id: string) => api.delete(`/leads/${id}`),
};

// Financial API endpoints
export const financialApi = {
  getAllTransactions: () => api.get('/transactions'),
  getTransactionById: (id: string) => api.get(`/transactions/${id}`),
  createTransaction: (data: any) => api.post('/transactions', data),
  updateTransaction: (id: string, data: any) => api.put(`/transactions/${id}`, data),
  deleteTransaction: (id: string) => api.delete(`/transactions/${id}`),
  getFinancialSummary: () => api.get('/financial/summary'),
};

// Auth API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export default api; 