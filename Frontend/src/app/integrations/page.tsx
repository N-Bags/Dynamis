"use client";

import React from 'react'

interface Integration {
  id: number
  name: string
  status: 'connected' | 'disconnected'
  lastSync?: string
  type: 'crm' | 'communication' | 'automation'
  description: string
}

interface HeaderProps {
  onAddIntegration: () => void
}

interface ConnectedAppsProps {
  integrations: Integration[]
  onSync: (id: number) => void
  onDisconnect: (id: number) => void
}

interface AvailableIntegrationsProps {
  integrations: Integration[]
  onConnect: (id: number) => void
}

// Header Component
function Header({ onAddIntegration }: HeaderProps) {
  return (
    <header>
      <h1>Integrations</h1>
      <button onClick={onAddIntegration}>+ Add Integration</button>
    </header>
  )
}

// Connected Apps Component
function ConnectedApps({ integrations, onSync, onDisconnect }: ConnectedAppsProps) {
  return (
    <section aria-label="Connected Applications">
      <h2>Connected Apps</h2>
      <ul>
        {integrations.map((integration) => (
          <li key={integration.id}>
            <article>
              <header>
                <h3>{integration.name}</h3>
                <span>Status: {integration.status}</span>
              </header>

              <div>
                <p>Last Sync: {integration.lastSync}</p>
                <p>{integration.description}</p>
              </div>

              <footer>
                <button onClick={() => onSync(integration.id)}>Sync Now</button>
                <button onClick={() => onDisconnect(integration.id)}>Disconnect</button>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Available Integrations Component
function AvailableIntegrations({ integrations, onConnect }: AvailableIntegrationsProps) {
  return (
    <section aria-label="Available Integrations">
      <h2>Available Integrations</h2>
      <ul>
        {integrations.map((integration) => (
          <li key={integration.id}>
            <article>
              <header>
                <h3>{integration.name}</h3>
                <span>Status: {integration.status}</span>
              </header>

              <div>
                <p>{integration.description}</p>
              </div>

              <footer>
                <button onClick={() => onConnect(integration.id)}>Connect</button>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Configuration Placeholder Component
function ConfigurationPlaceholder() {
  return (
    <section aria-label="Integration Configuration">
      <h2>Configuration</h2>
      <div>
        <h3>Webhook Configuration</h3>
        <p>Configure webhooks and API keys for your integrations</p>
        <button>Configure</button>
      </div>

      <div>
        <h3>Zapier Automation Manager</h3>
        <p>Coming soon: Manage your Zapier automations directly from here</p>
      </div>
    </section>
  )
}

export default function IntegrationsPage() {
  // Mock data - replace with actual data fetching
  const connectedApps: Integration[] = [
    {
      id: 1,
      name: 'HubSpot',
      status: 'connected',
      lastSync: '2024-04-22T14:30:00',
      type: 'crm',
      description: 'Customer relationship management and marketing automation'
    },
    {
      id: 2,
      name: 'Zoho',
      status: 'connected',
      lastSync: '2024-04-22T13:15:00',
      type: 'crm',
      description: 'Business software suite and CRM platform'
    },
    {
      id: 3,
      name: 'QuoteIQ',
      status: 'connected',
      lastSync: '2024-04-22T12:45:00',
      type: 'automation',
      description: 'Quote management and automation platform'
    }
  ]

  const availableIntegrations: Integration[] = [
    {
      id: 4,
      name: 'Salesforce',
      status: 'disconnected',
      type: 'crm',
      description: 'Enterprise CRM and cloud computing platform'
    },
    {
      id: 5,
      name: 'Slack',
      status: 'disconnected',
      type: 'communication',
      description: 'Business communication platform'
    }
  ]

  const handleAddIntegration = () => {
    // Implement add integration functionality
  }

  const handleSync = (id: number) => {
    // Implement sync functionality
  }

  const handleDisconnect = (id: number) => {
    // Implement disconnect functionality
  }

  const handleConnect = (id: number) => {
    // Implement connect functionality
  }

  return (
    <main>
      <Header onAddIntegration={handleAddIntegration} />
      
      <ConnectedApps 
        integrations={connectedApps}
        onSync={handleSync}
        onDisconnect={handleDisconnect}
      />
      
      <AvailableIntegrations 
        integrations={availableIntegrations}
        onConnect={handleConnect}
      />
      
      <ConfigurationPlaceholder />
    </main>
  )
} 