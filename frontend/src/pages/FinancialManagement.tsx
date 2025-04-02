import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchTransactions, createTransaction, deleteTransaction } from '../store/slices/financialSlice';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import FileUploader from '../components/files/FileUploader';
import FileList from '../components/files/FileList';
import { fileService } from '../services/fileService';
import { addNotification } from '../store/slices/notificationSlice';

const FinancialManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error, summary } = useSelector((state: RootState) => state.financial);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showFileUploader, setShowFileUploader] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || transaction.type === typeFilter;
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    const matchesDate = (!dateRange.start || transaction.date >= dateRange.start) &&
      (!dateRange.end || transaction.date <= dateRange.end);
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const handleFileUpload = async (file: FileAttachment) => {
    try {
      dispatch(addNotification({
        type: 'success',
        message: 'File uploaded successfully',
        autoClose: true
      }));
      dispatch(fetchTransactions());
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to upload file',
        autoClose: true
      }));
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await fileService.deleteFile(fileId);
      dispatch(addNotification({
        type: 'success',
        message: 'File deleted successfully',
        autoClose: true
      }));
      dispatch(fetchTransactions());
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete file',
        autoClose: true
      }));
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => dispatch(fetchTransactions())} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Management</h1>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card bg-green-50">
          <h3 className="text-lg font-medium text-gray-900">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="card bg-red-50">
          <h3 className="text-lg font-medium text-gray-900">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ${summary.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="card bg-blue-50">
          <h3 className="text-lg font-medium text-gray-900">Net Balance</h3>
          <p className={`text-2xl font-bold ${summary.netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            ${Math.abs(summary.netBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="card bg-purple-50">
          <h3 className="text-lg font-medium text-gray-900">Monthly Average</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${(summary.netBalance / 12).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search transactions..."
        />
        <div className="flex space-x-4">
          <FilterDropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' },
            ]}
            label="Type"
          />
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            label="Status"
          />
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Date Range:</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="rounded-md border border-gray-300 text-sm"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="rounded-md border border-gray-300 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex space-x-2">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-primary">Add Transaction</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{transaction.category}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button 
                      className="ml-4 text-red-600 hover:text-red-900"
                      onClick={() => dispatch(deleteTransaction(transaction.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status: string): string => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export default FinancialManagement; 