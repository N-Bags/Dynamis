interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  autoClose?: boolean;
  createdAt: string;
} 