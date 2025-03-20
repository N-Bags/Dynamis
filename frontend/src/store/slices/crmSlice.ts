import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { crmService } from '../../services/crmService';
import { FileAttachment } from '../types/file';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  source: 'website' | 'referral' | 'social' | 'other';
  budget: number;
  probability: number;
  expectedCloseDate: string;
  notes: string;
  lastContact: string;
  createdAt: string;
  updatedAt: string;
  attachments: FileAttachment[];
}

interface CRMState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: CRMState = {
  leads: [],
  loading: false,
  error: null,
};

export const fetchLeads = createAsyncThunk(
  'crm/fetchLeads',
  async (_, { rejectWithValue }) => {
    try {
      const response = await crmService.getAllLeads();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leads');
    }
  }
);

export const createLead = createAsyncThunk(
  'crm/createLead',
  async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await crmService.createLead(lead);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create lead');
    }
  }
);

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(lead => lead.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter(lead => lead.id !== action.payload);
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
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setLeads,
  addLead,
  updateLead,
  deleteLead,
  setLoading,
  setError,
} = crmSlice.actions;

export default crmSlice.reducer; 