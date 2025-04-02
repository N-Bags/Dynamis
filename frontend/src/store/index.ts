import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import crmReducer from './slices/crmSlice';
import financialReducer from './slices/financialSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    crm: crmReducer,
    financial: financialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
} 