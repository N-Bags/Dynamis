interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  source: string;
  budget: number;
  probability: number;
  expectedCloseDate: string;
  notes: string;
  lastContact: string;
  createdAt: string;
  updatedAt: string;
  attachments: FileAttachment[];
} 