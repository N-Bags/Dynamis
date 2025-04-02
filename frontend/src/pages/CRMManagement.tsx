import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchLeads, createLead, deleteLead } from '../store/slices/crmSlice';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import FileUploader from '../components/files/FileUploader';
import FileList from '../components/files/FileList';
import { fileService } from '../services/fileService';
import { addNotification } from '../store/slices/notificationSlice';

const CRMManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state: RootState) => state.crm);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [probabilityFilter, setProbabilityFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFileUploader, setShowFileUploader] = useState(false);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesProbability = !probabilityFilter || getProbabilityRange(lead.probability) === probabilityFilter;
    return matchesSearch && matchesStatus && matchesProbability;
  });

  const getProbabilityRange = (probability: number): string => {
    if (probability >= 75) return 'high';
    if (probability >= 50) return 'medium';
    return 'low';
  };

  const handleFileUpload = async (file: FileAttachment) => {
    try {
      dispatch(addNotification({
        type: 'success',
        message: 'File uploaded successfully',
        autoClose: true
      }));
      // Refresh lead data to include new file
      dispatch(fetchLeads());
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
      dispatch(fetchLeads());
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete file',
        autoClose: true
      }));
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => dispatch(fetchLeads())} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">CRM Management</h1>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search leads..."
        />
        <div className="flex space-x-4">
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'new', label: 'New' },
              { value: 'contacted', label: 'Contacted' },
              { value: 'qualified', label: 'Qualified' },
              { value: 'proposal', label: 'Proposal' },
              { value: 'negotiation', label: 'Negotiation' },
              { value: 'closed', label: 'Closed' },
              { value: 'lost', label: 'Lost' },
            ]}
            label="Status"
          />
          <FilterDropdown
            value={probabilityFilter}
            onChange={setProbabilityFilter}
            options={[
              { value: 'high', label: 'High (75%+)' },
              { value: 'medium', label: 'Medium (50-74%)' },
              { value: 'low', label: 'Low (<50%)' },
            ]}
            label="Probability"
          />
        </div>
      </div>

      {/* Lead List with sorting */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Leads</h2>
          <div className="flex space-x-2">
            <button className="btn-secondary">
              Export CSV
            </button>
            <button className="btn-primary">
              Add New Lead
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name/Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.probability}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(lead.lastContact).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button 
                      className="ml-4 text-red-600 hover:text-red-900"
                      onClick={() => dispatch(deleteLead(lead.id))}
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

      {selectedLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Lead Documents</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {showFileUploader ? (
                <FileUploader
                  entityType="lead"
                  entityId={selectedLead.id}
                  onUploadComplete={(file) => {
                    handleFileUpload(file);
                    setShowFileUploader(false);
                  }}
                  onError={(error) => {
                    dispatch(addNotification({
                      type: 'error',
                      message: error,
                      autoClose: true
                    }));
                  }}
                />
              ) : (
                <button
                  onClick={() => setShowFileUploader(true)}
                  className="btn-primary w-full"
                >
                  Upload New Document
                </button>
              )}

              <FileList
                files={selectedLead.attachments || []}
                onDelete={handleFileDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status: string): string => {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    proposal: 'bg-purple-100 text-purple-800',
    negotiation: 'bg-indigo-100 text-indigo-800',
    closed: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export default CRMManagement; 