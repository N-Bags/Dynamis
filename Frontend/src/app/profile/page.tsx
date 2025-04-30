"use client";

import React from 'react'

interface ProfileHeaderProps {
  onEditProfile: () => void
}

interface AccountOverviewProps {
  memberSince: string
  role: string
  lastLogin: string
}

interface ActivitySummaryProps {
  monthlyLogins: number
  tasksCompleted: number
  crmInteractions: number
}

// Profile Header Component
function ProfileHeader({ onEditProfile }: ProfileHeaderProps) {
  return (
    <section className="flex items-center gap-6 p-6 border rounded-lg">
      <div className="w-24 h-24 rounded-full bg-gray-300" />
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-gray-600">john.doe@example.com</p>
      </div>

      <button 
        onClick={onEditProfile}
        className="px-4 py-2 border rounded"
      >
        Edit Profile
      </button>
    </section>
  )
}

// Account Overview Component
function AccountOverview({ memberSince, role, lastLogin }: AccountOverviewProps) {
  return (
    <section className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Account Overview</h2>
      
      <div className="space-y-4">
        <div>
          <p className="font-medium">Member Since</p>
          <p className="text-gray-600">{new Date(memberSince).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="font-medium">Role</p>
          <p className="text-gray-600">{role}</p>
        </div>

        <div>
          <p className="font-medium">Last Login</p>
          <p className="text-gray-600">{new Date(lastLogin).toLocaleString()}</p>
        </div>
      </div>
    </section>
  )
}

// Activity Summary Component
function ActivitySummary({ monthlyLogins, tasksCompleted, crmInteractions }: ActivitySummaryProps) {
  return (
    <section className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Activity Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="font-medium">Monthly Logins</p>
          <p className="text-2xl font-bold">{monthlyLogins}</p>
        </div>

        <div>
          <p className="font-medium">Tasks Completed</p>
          <p className="text-2xl font-bold">{tasksCompleted}</p>
        </div>

        <div>
          <p className="font-medium">CRM Interactions</p>
          <p className="text-2xl font-bold">{crmInteractions}</p>
        </div>
      </div>
    </section>
  )
}

export default function ProfilePage() {
  // Mock data - replace with actual data fetching
  const accountData = {
    memberSince: '2024-01-15',
    role: 'Admin',
    lastLogin: '2024-04-22T14:30:00'
  }

  const activityData = {
    monthlyLogins: 42,
    tasksCompleted: 156,
    crmInteractions: 89
  }

  const handleEditProfile = () => {
    // Implement edit profile functionality
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <ProfileHeader onEditProfile={handleEditProfile} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountOverview 
          memberSince={accountData.memberSince}
          role={accountData.role}
          lastLogin={accountData.lastLogin}
        />
        
        <ActivitySummary 
          monthlyLogins={activityData.monthlyLogins}
          tasksCompleted={activityData.tasksCompleted}
          crmInteractions={activityData.crmInteractions}
        />
      </div>
    </main>
  )
} 