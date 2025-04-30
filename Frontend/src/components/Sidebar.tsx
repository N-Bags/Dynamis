"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto">
      <nav className="flex flex-col gap-2 p-4 text-sm text-gray-700 dark:text-gray-300">
        <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
        <Link href="/crm" className="hover:text-blue-500">CRM</Link>
        <Link href="/tasks" className="hover:text-blue-500">Tasks</Link>
        <Link href="/calendar" className="hover:text-blue-500">Calendar</Link>
        <Link href="/finances" className="hover:text-blue-500">Finances</Link>
        <Link href="/integrations" className="hover:text-blue-500">Integrations</Link>
        <Link href="/settings" className="hover:text-blue-500">Settings</Link>
        <Link href="/profile" className="hover:text-blue-500">Profile</Link>
      </nav>
    </aside>
  );
} 