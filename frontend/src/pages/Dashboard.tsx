import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

interface TaskState {
  tasks: Array<{
    id: string;
    status: string;
    priority: string;
  }>;
}

interface CRMState {
  leads: Array<{
    id: string;
    status: string;
    probability: number;
  }>;
}

interface FinancialState {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
  };
}

const Dashboard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks as TaskState);
  const crm = useSelector((state: RootState) => state.crm as CRMState);
  const financial = useSelector((state: RootState) => state.financial as FinancialState);

  const totalTasks = tasks.tasks.length;
  const completedTasks = tasks.tasks.filter(task => task.status === 'completed').length;
  const highPriorityTasks = tasks.tasks.filter(task => task.priority === 'high').length;

  const totalLeads = crm.leads.length;
  const qualifiedLeads = crm.leads.filter(lead => lead.status === 'qualified').length;
  const highProbabilityLeads = crm.leads.filter(lead => lead.probability >= 70).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Task Summary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Task Overview</h2>
          <Link to="/tasks" className="text-blue-600 hover:text-blue-800">
            View All Tasks
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="card bg-blue-50">
            <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
            <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
          </div>
          <div className="card bg-green-50">
            <h3 className="text-lg font-medium text-gray-900">Completed Tasks</h3>
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
          </div>
          <div className="card bg-yellow-50">
            <h3 className="text-lg font-medium text-gray-900">High Priority</h3>
            <p className="text-2xl font-bold text-yellow-600">{highPriorityTasks}</p>
          </div>
        </div>
      </div>

      {/* CRM Summary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">CRM Overview</h2>
          <Link to="/crm" className="text-blue-600 hover:text-blue-800">
            View All Leads
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="card bg-blue-50">
            <h3 className="text-lg font-medium text-gray-900">Total Leads</h3>
            <p className="text-2xl font-bold text-blue-600">{totalLeads}</p>
          </div>
          <div className="card bg-green-50">
            <h3 className="text-lg font-medium text-gray-900">Qualified Leads</h3>
            <p className="text-2xl font-bold text-green-600">{qualifiedLeads}</p>
          </div>
          <div className="card bg-yellow-50">
            <h3 className="text-lg font-medium text-gray-900">High Probability</h3>
            <p className="text-2xl font-bold text-yellow-600">{highProbabilityLeads}</p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Financial Overview</h2>
          <Link to="/finance" className="text-blue-600 hover:text-blue-800">
            View Finances
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="card bg-green-50">
            <h3 className="text-lg font-medium text-gray-900">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">
              ${financial.summary.totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="card bg-red-50">
            <h3 className="text-lg font-medium text-gray-900">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              ${financial.summary.totalExpenses.toFixed(2)}
            </p>
          </div>
          <div className="card bg-blue-50">
            <h3 className="text-lg font-medium text-gray-900">Net Balance</h3>
            <p className={`text-2xl font-bold ${financial.summary.netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ${financial.summary.netBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 