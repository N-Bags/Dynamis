interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  attachments: FileAttachment[];
}

interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  monthlyRevenue: number[];
  monthlyExpenses: number[];
} 