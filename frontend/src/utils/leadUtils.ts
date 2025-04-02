export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  lastContact: string;
  notes: string;
  score?: number;
  source?: string;
  budget?: number;
  timeline?: string;
}

export const calculateLeadScore = (lead: Lead): number => {
  let score = 0;

  // Status scores
  const statusScores = {
    new: 10,
    contacted: 20,
    qualified: 30,
    proposal: 40,
    negotiation: 50,
    closed: 60,
  };

  // Add base status score
  score += statusScores[lead.status];

  // Add budget consideration if available
  if (lead.budget) {
    if (lead.budget > 100000) score += 30;
    else if (lead.budget > 50000) score += 20;
    else if (lead.budget > 10000) score += 10;
  }

  // Add timeline consideration if available
  if (lead.timeline) {
    const timeline = lead.timeline.toLowerCase();
    if (timeline.includes('immediate') || timeline.includes('urgent')) score += 20;
    else if (timeline.includes('month')) score += 15;
    else if (timeline.includes('quarter')) score += 10;
  }

  // Add source consideration if available
  if (lead.source) {
    const source = lead.source.toLowerCase();
    if (source.includes('referral')) score += 15;
    else if (source.includes('website')) score += 10;
    else if (source.includes('social')) score += 5;
  }

  return Math.min(score, 100); // Cap at 100
};

export const getLeadStatusColor = (status: Lead['status']): string => {
  const colors = {
    new: 'bg-gray-100 text-gray-800',
    contacted: 'bg-blue-100 text-blue-800',
    qualified: 'bg-yellow-100 text-yellow-800',
    proposal: 'bg-purple-100 text-purple-800',
    negotiation: 'bg-orange-100 text-orange-800',
    closed: 'bg-green-100 text-green-800',
  };
  return colors[status];
};

export const sortLeadsByScore = (leads: Lead[]): Lead[] => {
  return [...leads].sort((a, b) => {
    const scoreA = calculateLeadScore(a);
    const scoreB = calculateLeadScore(b);
    return scoreB - scoreA; // Higher score first
  });
};

export const getLeadsByStatus = (leads: Lead[], status: Lead['status']): Lead[] => {
  return leads.filter((lead) => lead.status === status);
};

export const getLeadsByScoreRange = (leads: Lead[], min: number, max: number): Lead[] => {
  return leads.filter((lead) => {
    const score = calculateLeadScore(lead);
    return score >= min && score <= max;
  });
};

export const getLeadConversionRate = (leads: Lead[]): number => {
  if (leads.length === 0) return 0;
  const closedLeads = leads.filter((lead) => lead.status === 'closed').length;
  return (closedLeads / leads.length) * 100;
};

export const getAverageLeadScore = (leads: Lead[]): number => {
  if (leads.length === 0) return 0;
  const totalScore = leads.reduce((sum, lead) => sum + calculateLeadScore(lead), 0);
  return totalScore / leads.length;
};

export const getLeadPipelineMetrics = (leads: Lead[]) => {
  const metrics = {
    total: leads.length,
    byStatus: {} as Record<Lead['status'], number>,
    averageScore: getAverageLeadScore(leads),
    conversionRate: getLeadConversionRate(leads),
  };

  // Count leads by status
  leads.forEach((lead) => {
    metrics.byStatus[lead.status] = (metrics.byStatus[lead.status] || 0) + 1;
  });

  return metrics;
}; 