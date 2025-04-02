import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchTasks, createTask, deleteTask } from '../store/slices/taskSlice';
import { Task } from '../store/slices/taskSlice';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import FileUploader from '../components/files/FileUploader';
import FileList from '../components/files/FileList';
import { addNotification } from '../store/slices/notificationSlice';
import { fileService } from '../services/fileService';

const TaskManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    assignedTo: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showFileUploader, setShowFileUploader] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => dispatch(fetchTasks())} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTask(newTask)).unwrap();
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        assignedTo: '',
      });
    } catch (error) {
      // Handle error (could show a toast notification here)
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleFileUpload = async (file: FileAttachment) => {
    try {
      dispatch(addNotification({
        type: 'success',
        message: 'File uploaded successfully',
        autoClose: true
      }));
      // Refresh task data to include new file
      dispatch(fetchTasks());
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
      // Refresh task data
      dispatch(fetchTasks());
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete file',
        autoClose: true
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Management</h1>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search tasks..."
        />
        <div className="flex space-x-4">
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'todo', label: 'To Do' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
            label="Status"
          />
          <FilterDropdown
            value={priorityFilter}
            onChange={setPriorityFilter}
            options={[
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
            label="Priority"
          />
        </div>
      </div>

      {/* Add New Task Form */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="input-field"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="input-field"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                className="input-field"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                className="input-field"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <input
              type="text"
              className="input-field"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-white"></div>
                Adding...
              </>
            ) : (
              'Add Task'
            )}
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="btn-secondary"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                <span>Priority: {task.priority}</span>
                <span>Status: {task.status}</span>
                <span>Due Date: {task.dueDate}</span>
                <span>Assigned To: {task.assignedTo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Task Attachments</h3>
              <button
                onClick={() => setSelectedTask(null)}
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
                  entityType="task"
                  entityId={selectedTask.id}
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
                  Upload New File
                </button>
              )}

              <FileList
                files={selectedTask.attachments || []}
                onDelete={handleFileDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement; 