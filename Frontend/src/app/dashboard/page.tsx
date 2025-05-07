import Link from 'next/link';

export default function Dashboard() {
  const activeJobs = [
    { name: 'Website Redesign', dueDate: '2024-03-25' },
    { name: 'Brand Guidelines', dueDate: '2024-03-28' },
    { name: 'Social Media Campaign', dueDate: '2024-03-30' },
    { name: 'Product Launch', dueDate: '2024-04-02' }
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Dashboard
      </h1>

      {/* Revenue Overview */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Revenue Overview
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              $24,780
            </span>
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
              +12%
            </span>
          </div>
          <div className="h-32 mt-4 bg-gray-100 dark:bg-gray-700 rounded">
            {/* Chart placeholder - will be replaced with Chart.js */}
          </div>
        </div>
      </section>

      {/* Active Jobs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Active Jobs This Week
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {activeJobs.map((job, index) => (
              <div
                key={index}
                className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <span className="text-gray-800 dark:text-gray-200">
                  {job.name}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Due: {new Date(job.dueDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Quick Actions
        </h2>
        <div className="flex gap-4">
          <Link
            href="/tasks/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            + Add Task
          </Link>
          <Link
            href="/crm/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            + Add Contact
          </Link>
        </div>
      </section>
    </main>
  );
} 