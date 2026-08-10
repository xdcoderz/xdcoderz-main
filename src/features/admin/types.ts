export const leadStatuses = [
  "new",
  "contacted",
  "qualified",
  "won",
  "closed",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type ContactLead = {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  source: string;
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  source: string;
  slug: string | null;
  status: string;
  subscribed_at: string;
  created_at: string;
};

export type ToolEvent = {
  session_id: string;
  tool_slug: string;
  event_name: string;
  created_at: string;
};

export type ToolFunnel = {
  slug: string;
  label: string;
  started: number;
  completed: number;
  clicked: number;
  submitted: number;
  completionRate: number;
  conversionRate: number;
};

export type AdminLabProject = {
  id: string;
  slug: string;
  name: string;
  repo: string;
  status: string;
  maturity: string;
  category: string;
  license: string;
  description: string;
  business_value: string;
  tags: string[];
  github_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
