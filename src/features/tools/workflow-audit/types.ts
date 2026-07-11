export type WorkflowType =
  | "reporting"
  | "data-entry"
  | "approvals"
  | "customer-requests"
  | "file-processing"
  | "team-handoffs";

export type WorkflowFrequency =
  | "monthly"
  | "weekly"
  | "daily"
  | "multiple-daily";

export type WeeklyHours = "under-2" | "2-5" | "6-10" | "11-20" | "20-plus";

export type PeopleInvolved = "one" | "2-3" | "4-8" | "9-plus";

export type ErrorImpact = "low" | "moderate" | "frequent" | "costly";

export type ToolMaturity = "manual" | "fragmented" | "partly-automated" | "legacy";

export type WorkflowAuditState = {
  workflowType: WorkflowType | null;
  frequency: WorkflowFrequency | null;
  weeklyHours: WeeklyHours | null;
  peopleInvolved: PeopleInvolved | null;
  errorImpact: ErrorImpact | null;
  toolMaturity: ToolMaturity | null;
};

export type CompletedWorkflowAuditState = {
  [Key in keyof WorkflowAuditState]: NonNullable<WorkflowAuditState[Key]>;
};

export type AuditOption<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export type AuditBand = "Monitor" | "Promising" | "Strong" | "Critical";

export type WorkflowAuditResult = {
  score: number;
  band: AuditBand;
  automationFit: string;
  recoverableTime: string;
  recommendedSystem: string;
  summary: string;
  reasons: string[];
  firstMove: string;
  nextSteps: string[];
};
