'use client';

import { useState } from 'react';

export default function CRM() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const contacts = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      status: 'active',
      lastContacted: '2024-03-20'
    },
    {
      name: 'Michael Chen',
      company: 'Global Solutions',
      status: 'warm',
      lastContacted: '2024-03-18'
    },
    {
      name: 'Emma Wilson',
      company: 'Innovate Labs',
      status: 'active',
      lastContacted: '2024-03-15'
    },
    {
      name: 'David Brown',
      company: 'Future Systems',
      status: 'cold',
      lastContacted: '2024-02-28'
    },
    {
      name: 'Lisa Anderson',
      company: 'Creative Works',
      status: 'warm',
      lastContacted: '2024-03-10'
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'warm', label: 'Warm' },
    { id: 'cold', label: 'Cold' }
  ];

  const filteredContacts = contacts.filter(contact => 
    selectedFilter === 'all' ? true : contact.status === selectedFilter
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Client Relationship Manager
      </h1>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Contacts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Contacted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredContacts.map((contact, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  onClick={() => {/* TODO: Open contact details modal */}}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {contact.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      contact.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : contact.status === 'warm'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {new Date(contact.lastContacted).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
} 