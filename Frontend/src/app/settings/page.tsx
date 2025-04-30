"use client";

import React from 'react'

interface ProfileSettingsProps {
  onSaveProfile: (data: { name: string; email: string }) => void
  onChangePassword: () => void
}

interface PreferencesProps {
  onToggleDarkMode: () => void
  onToggleNotifications: () => void
  onTimezoneChange: (timezone: string) => void
}

interface SecurityProps {
  onToggle2FA: () => void
  onViewLogins: () => void
  onRevokeSessions: () => void
}

interface DangerZoneProps {
  onDeleteAccount: () => void
  onLogoutEverywhere: () => void
}

// Profile Settings Component
function ProfileSettings({ onSaveProfile, onChangePassword }: ProfileSettingsProps) {
  return (
    <section aria-label="Profile Settings">
      <h2>Profile Settings</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        onSaveProfile({
          name: formData.get('name') as string,
          email: formData.get('email') as string
        })
      }}>
        <fieldset>
          <legend>Personal Information</legend>
          
          <div>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email"
            />
          </div>

          <button type="submit">Save Changes</button>
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <button type="button" onClick={onChangePassword}>
            Change Password
          </button>
        </fieldset>
      </form>
    </section>
  )
}

// Preferences Component
function Preferences({ onToggleDarkMode, onToggleNotifications, onTimezoneChange }: PreferencesProps) {
  return (
    <section aria-label="Preferences">
      <h2>Preferences</h2>
      <form>
        <fieldset>
          <legend>Display & Notifications</legend>
          
          <div>
            <label htmlFor="dark-mode">Dark Mode</label>
            <input 
              type="checkbox" 
              id="dark-mode" 
              onChange={onToggleDarkMode}
            />
          </div>

          <div>
            <label htmlFor="notifications">Notifications</label>
            <input 
              type="checkbox" 
              id="notifications" 
              onChange={onToggleNotifications}
            />
          </div>

          <div>
            <label htmlFor="timezone">Timezone</label>
            <select 
              id="timezone" 
              onChange={(e) => onTimezoneChange(e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

// Security Component
function Security({ onToggle2FA, onViewLogins, onRevokeSessions }: SecurityProps) {
  return (
    <section aria-label="Security Settings">
      <h2>Security</h2>
      <form>
        <fieldset>
          <legend>Account Security</legend>
          
          <div>
            <label htmlFor="2fa">Two-Factor Authentication</label>
            <input 
              type="checkbox" 
              id="2fa" 
              onChange={onToggle2FA}
            />
          </div>

          <div>
            <button type="button" onClick={onViewLogins}>
              View Recent Logins
            </button>
          </div>

          <div>
            <button type="button" onClick={onRevokeSessions}>
              Revoke All Sessions
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

// Danger Zone Component
function DangerZone({ onDeleteAccount, onLogoutEverywhere }: DangerZoneProps) {
  return (
    <section aria-label="Danger Zone">
      <h2>Danger Zone</h2>
      <fieldset>
        <legend>Account Actions</legend>
        
        <div>
          <button 
            type="button" 
            onClick={onDeleteAccount}
            aria-label="Delete account"
          >
            Delete Account
          </button>
        </div>

        <div>
          <button 
            type="button" 
            onClick={onLogoutEverywhere}
            aria-label="Logout from all devices"
          >
            Logout Everywhere
          </button>
        </div>
      </fieldset>
    </section>
  )
}

export default function SettingsPage() {
  const handleSaveProfile = (data: { name: string; email: string }) => {
    // Implement profile save functionality
  }

  const handleChangePassword = () => {
    // Implement password change functionality
  }

  const handleToggleDarkMode = () => {
    // Implement dark mode toggle
  }

  const handleToggleNotifications = () => {
    // Implement notifications toggle
  }

  const handleTimezoneChange = (timezone: string) => {
    // Implement timezone change
  }

  const handleToggle2FA = () => {
    // Implement 2FA toggle
  }

  const handleViewLogins = () => {
    // Implement view logins functionality
  }

  const handleRevokeSessions = () => {
    // Implement revoke sessions functionality
  }

  const handleDeleteAccount = () => {
    // Implement account deletion
  }

  const handleLogoutEverywhere = () => {
    // Implement logout everywhere functionality
  }

  return (
    <main>
      <header>
        <h1>Settings</h1>
      </header>

      <ProfileSettings 
        onSaveProfile={handleSaveProfile}
        onChangePassword={handleChangePassword}
      />

      <Preferences 
        onToggleDarkMode={handleToggleDarkMode}
        onToggleNotifications={handleToggleNotifications}
        onTimezoneChange={handleTimezoneChange}
      />

      <Security 
        onToggle2FA={handleToggle2FA}
        onViewLogins={handleViewLogins}
        onRevokeSessions={handleRevokeSessions}
      />

      <DangerZone 
        onDeleteAccount={handleDeleteAccount}
        onLogoutEverywhere={handleLogoutEverywhere}
      />
    </main>
  )
} 