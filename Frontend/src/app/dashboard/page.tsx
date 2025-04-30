"use client";

import React from 'react'
import { FiActivity, FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi'

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold">$24,780</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FiDollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-500">↑ 12% from last month</p>
        </div>

        <div className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FiUsers className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-500">↑ 8% from last month</p>
        </div>

        <div className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasks Due Today</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <FiCalendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="mt-2 text-sm text-red-500">↓ 2 from yesterday</p>
        </div>

        <div className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Health</p>
              <p className="text-2xl font-bold">98%</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <FiActivity className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-500">All systems operational</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 rounded-lg border bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">John Doe created a new account</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-6 rounded-lg border bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <p className="font-medium text-blue-800 dark:text-blue-200">Focus on Upsells</p>
              <p className="text-sm text-blue-600 dark:text-blue-300">Based on recent customer behavior patterns</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30">
              <p className="font-medium text-green-800 dark:text-green-200">Customer Retention</p>
              <p className="text-sm text-green-600 dark:text-green-300">High engagement with new features</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <p className="font-medium text-purple-800 dark:text-purple-200">Market Trends</p>
              <p className="text-sm text-purple-600 dark:text-purple-300">Growing demand in mobile segment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 