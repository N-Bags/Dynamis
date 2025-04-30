"use client";

import React from 'react'
import { useState } from "react";
import { Phone, Mail, MessageSquare, Clock, Building2, Users } from "lucide-react";

interface Client {
  id: number;
  name: string;
  industry: string;
  companySize: string;
  lastActive: string;
  contact: {
    email: string;
    phone: string;
  };
  recentNotes: string;
  activities: {
    type: "call" | "email" | "ai" | "meeting";
    date: string;
    description: string;
  }[];
}

interface Activity {
  id: number;
  type: string;
  timestamp: string;
}

interface ClientListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
}

interface ClientDetailsProps {
  client: Client | null;
}

interface ClientActionsProps {
  onCall: () => void;
  onEmail: () => void;
  onAddNote: () => void;
}

const dummyClients: Client[] = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Manufacturing",
    companySize: "500-1000 employees",
    lastActive: "2024-04-06T14:30:00",
    contact: {
      email: "john.doe@acme.com",
      phone: "+1 (555) 123-4567",
    },
    recentNotes: "Interested in upgrading their production line with AI integration.",
    activities: [
      {
        type: "call",
        date: "2024-04-06",
        description: "Initial consultation call",
      },
      {
        type: "ai",
        date: "2024-04-05",
        description: "AI generated custom proposal",
      },
      {
        type: "email",
        date: "2024-04-04",
        description: "Sent product catalog",
      },
    ],
  },
  {
    id: 2,
    name: "TechStart Inc.",
    industry: "Software",
    companySize: "50-200 employees",
    lastActive: "2024-04-05T09:15:00",
    contact: {
      email: "sarah@techstart.com",
      phone: "+1 (555) 987-6543",
    },
    recentNotes: "Looking for AI-powered analytics solution for their SaaS platform.",
    activities: [
      {
        type: "meeting",
        date: "2024-04-05",
        description: "Product demo meeting",
      },
      {
        type: "email",
        date: "2024-04-03",
        description: "Follow-up on pricing",
      },
    ],
  },
  {
    id: 3,
    name: "Global Retail Co.",
    industry: "Retail",
    companySize: "1000+ employees",
    lastActive: "2024-04-04T16:45:00",
    contact: {
      email: "mike.johnson@globalretail.com",
      phone: "+1 (555) 456-7890",
    },
    recentNotes: "Planning to implement AI-driven inventory management system.",
    activities: [
      {
        type: "call",
        date: "2024-04-04",
        description: "Discussion about implementation timeline",
      },
      {
        type: "ai",
        date: "2024-04-03",
        description: "AI analyzed their current inventory patterns",
      },
    ],
  },
];

// Client List Component
function ClientList({ clients, onSelectClient }: ClientListProps) {
  return (
    <section aria-label="Client List">
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <button onClick={() => onSelectClient(client)}>
              <span>{client.name}</span>
              <time>{new Date(client.lastActive).toLocaleDateString()}</time>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Client Details Component
function ClientDetails({ client }: ClientDetailsProps) {
  if (!client) return null

  return (
    <section aria-label="Client Details">
      <header>
        <h1>{client.name}</h1>
        <div>
          <p>{client.contact.email}</p>
          <p>{client.contact.phone}</p>
        </div>
      </header>

      <div>
        <dl>
          <div>
            <dt>Industry</dt>
            <dd>{client.industry}</dd>
          </div>
          <div>
            <dt>Company Size</dt>
            <dd>{client.companySize}</dd>
          </div>
        </dl>
      </div>

      <section>
        <h2>Notes</h2>
        <p>{client.recentNotes}</p>
      </section>

      <section>
        <h2>Activity Log</h2>
        <ul>
          {client.activities.map((activity) => (
            <li key={activity.date}>
              <span>{activity.type}</span>
              <time>{activity.date}</time>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

// Actions Component
function ClientActions({ onCall, onEmail, onAddNote }: ClientActionsProps) {
  return (
    <section aria-label="Client Actions">
      <button onClick={onCall}>Call</button>
      <button onClick={onEmail}>Email</button>
      <button onClick={onAddNote}>Add Note</button>
    </section>
  )
}

export default function CRMPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleCall = () => {
    // Implement call functionality
  };

  const handleEmail = () => {
    // Implement email functionality
  };

  const handleAddNote = () => {
    // Implement add note functionality
  };

  return (
    <main>
      <ClientList 
        clients={dummyClients} 
        onSelectClient={setSelectedClient} 
      />
      
      <ClientDetails client={selectedClient} />
      
      {selectedClient && (
        <ClientActions 
          onCall={handleCall}
          onEmail={handleEmail}
          onAddNote={handleAddNote}
        />
      )}
    </main>
  );
} 