import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { financialService } from '../../services/financialService';
import { FileAttachment } from '../types/file';

export interface Transaction {
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

interface FinancialState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
    monthlyRevenue: number[];
    monthlyExpenses: number[];
  };
}

const initialState: FinancialState = {
  transactions: [],
  loading: false,
  error: null,
  summary: {
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    monthlyRevenue: Array(12).fill(0),
    monthlyExpenses: Array(12).fill(0),
  },
};

export const fetchTransactions = createAsyncThunk(
  'financial/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financialService.getAllTransactions();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
    }
  }
);

export const createTransaction = createAsyncThunk(
  'financial/createTransaction',
  async (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await financialService.createTransaction(transaction);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create transaction');
    }
  }
);

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      updateFinancialSummary(state);
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      updateFinancialSummary(state);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        updateFinancialSummary(state);
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      updateFinancialSummary(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        updateFinancialSummary(state);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

// Helper function to update financial summary
const updateFinancialSummary = (state: FinancialState) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Reset monthly arrays
  state.summary.monthlyRevenue = Array(12).fill(0);
  state.summary.monthlyExpenses = Array(12).fill(0);
  
  // Calculate totals and monthly breakdowns
  state.summary.totalIncome = 0;
  state.summary.totalExpenses = 0;
  
  state.transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date);
    const monthIndex = transactionDate.getMonth();
    
    if (transactionDate.getFullYear() === currentYear) {
      if (transaction.type === 'income') {
        state.summary.totalIncome += transaction.amount;
        state.summary.monthlyRevenue[monthIndex] += transaction.amount;
      } else {
        state.summary.totalExpenses += transaction.amount;
        state.summary.monthlyExpenses[monthIndex] += transaction.amount;
      }
    }
  });
  
  state.summary.netBalance = state.summary.totalIncome - state.summary.totalExpenses;
};

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setLoading,
  setError,
} = financialSlice.actions;

export default financialSlice.reducer; 