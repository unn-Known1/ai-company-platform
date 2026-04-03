export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface Agent {
  id: number;
  company_id: number;
  name: string;
  description: string;
  provider_id: number;
  provider_name: string;
  provider_model: string;
  is_active: number;
  temperature: number;
  max_tokens: number;
  created_at: string;
}

export interface Ticket {
  id: number;
  company_id: number;
  title: string;
  description: string;
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  assignee_agent_id: number;
  created_at: string;
  updated_at: string;
}

export interface Mission {
  id: number;
  company_id: number;
  title: string;
  description: string;
  progress: number;
  completed: number;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: number;
  agent_id: number;
  agent_name: string;
  month_year: string;
  total_budget: number;
  spent_amount: number;
}

export interface OrgNode {
  id: number;
  company_id: number;
  parent_id: number | null;
  name: string;
  title: string;
  email: string;
  department: string;
}
