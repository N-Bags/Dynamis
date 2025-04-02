import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';
import CRMManagement from './pages/CRMManagement';
import FinancialManagement from './pages/FinancialManagement';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="tasks"
            element={
              <ProtectedRoute requiredRole="user">
                <TaskManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="crm"
            element={
              <ProtectedRoute requiredRole="manager">
                <CRMManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="finance"
            element={
              <ProtectedRoute requiredRole="manager">
                <FinancialManagement />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App; 