import type {
  AuditOption,
  CompletedWorkflowAuditState,
  ErrorImpact,
  PeopleInvolved,
  ToolMaturity,
  WeeklyHours,
  WorkflowAuditResult,
  WorkflowAuditState,
  WorkflowFrequency,
  WorkflowType,
} from "../types";

export const workflowTypeOptions: AuditOption<WorkflowType>[] = [
  {
    value: "reporting",
    label: "Reporting and dashboards",
    description: "Collecting data, preparing recurring reports, or updating management views.",
  },
  {
    value: "data-entry",
    label: "Data entry and reconciliation",
    description: "Copying, validating, cleaning, or reconciling information across systems.",
  },
  {
    value: "approvals",
    label: "Approvals and reviews",
    description: "Routing requests, collecting decisions, and following up on stalled approvals.",
  },
  {
    value: "customer-requests",
    label: "Customer requests",
    description: "Receiving, categorizing, assigning, and resolving enquiries or service requests.",
  },
  {
    value: "file-processing",
    label: "Documents and files",
    description: "Extracting, renaming, converting, organizing, or generating files repeatedly.",
  },
  {
    value: "team-handoffs",
    label: "Team handoffs",
    description: "Moving work between people, departments, tools, or stages of delivery.",
  },
];

export const frequencyOptions: AuditOption<WorkflowFrequency>[] = [
  {
    value: "monthly",
    label: "A few times per month",
    description: "The workflow matters, but it does not continuously interrupt the team.",
  },
  {
    value: "weekly",
    label: "Several times per week",
    description: "The process is a regular operating responsibility with visible repetition.",
  },
  {
    value: "daily",
    label: "Every working day",
    description: "The workflow consumes attention daily and affects normal team throughput.",
  },
  {
    value: "multiple-daily",
    label: "Many times per day",
    description: "The process is embedded in operations and creates constant coordination cost.",
  },
];

export const weeklyHoursOptions: AuditOption<WeeklyHours>[] = [
  {
    value: "under-2",
    label: "Under 2 hours",
    description: "Combined team time spent on this workflow in a typical week.",
  },
  {
    value: "2-5",
    label: "2-5 hours",
    description: "A noticeable task, but still contained within part of a working day.",
  },
  {
    value: "6-10",
    label: "6-10 hours",
    description: "Roughly one full working day of team capacity every week.",
  },
  {
    value: "11-20",
    label: "11-20 hours",
    description: "A substantial recurring operating cost across the team.",
  },
  {
    value: "20-plus",
    label: "More than 20 hours",
    description: "The workflow consumes multiple working days of capacity each week.",
  },
];

export const peopleOptions: AuditOption<PeopleInvolved>[] = [
  {
    value: "one",
    label: "One person",
    description: "The workflow is owned and completed by one operator.",
  },
  {
    value: "2-3",
    label: "2-3 people",
    description: "A small number of people coordinate or depend on the result.",
  },
  {
    value: "4-8",
    label: "4-8 people",
    description: "The workflow crosses a team and creates meaningful handoff pressure.",
  },
  {
    value: "9-plus",
    label: "9 or more people",
    description: "The workflow affects several roles, departments, or operating groups.",
  },
];

export const errorImpactOptions: AuditOption<ErrorImpact>[] = [
  {
    value: "low",
    label: "Minor inconvenience",
    description: "Mistakes are uncommon and inexpensive to correct.",
  },
  {
    value: "moderate",
    label: "Creates rework",
    description: "Errors regularly consume extra time or delay another task.",
  },
  {
    value: "frequent",
    label: "Affects customers or decisions",
    description: "Errors reduce service quality, reporting confidence, or execution speed.",
  },
  {
    value: "costly",
    label: "Financial or compliance exposure",
    description: "Mistakes can create direct loss, regulatory risk, or serious reputational damage.",
  },
];

export const toolMaturityOptions: AuditOption<ToolMaturity>[] = [
  {
    value: "manual",
    label: "Mostly manual",
    description: "People complete the workflow through memory, checklists, or repetitive actions.",
  },
  {
    value: "fragmented",
    label: "Spreadsheets, email, and chat",
    description: "The process works across disconnected tools with no reliable source of truth.",
  },
  {
    value: "partly-automated",
    label: "Partly automated",
    description: "Some steps are automated, but exceptions and handoffs still require attention.",
  },
  {
    value: "legacy",
    label: "Legacy or rigid software",
    description: "A system exists, but it is slow, difficult to change, or poorly matched to the workflow.",
  },
];

export const defaultWorkflowAuditState: WorkflowAuditState = {
  workflowType: null,
  frequency: null,
  weeklyHours: null,
  peopleInvolved: null,
  errorImpact: null,
  toolMaturity: null,
};

export function isWorkflowAuditComplete(
  state: WorkflowAuditState,
): state is CompletedWorkflowAuditState {
  return Boolean(
    state.workflowType &&
      state.frequency &&
      state.weeklyHours &&
      state.peopleInvolved &&
      state.errorImpact &&
      state.toolMaturity,
  );
}

export function calculateWorkflowAudit(
  state: CompletedWorkflowAuditState,
): WorkflowAuditResult {
  const score = Math.min(
    100,
    frequencyScores[state.frequency] +
      weeklyHoursScores[state.weeklyHours] +
      peopleScores[state.peopleInvolved] +
      errorScores[state.errorImpact] +
      maturityScores[state.toolMaturity] +
      workflowScores[state.workflowType],
  );
  const band = getBand(score);
  const recommendedSystem = systemRecommendations[state.workflowType];

  return {
    score,
    band,
    automationFit: getAutomationFit(score),
    recoverableTime: calculateRecoverableTime(state.weeklyHours, score),
    recommendedSystem,
    summary: getSummary(score, recommendedSystem),
    reasons: getReasons(state),
    firstMove: getFirstMove(state),
    nextSteps: getNextSteps(state),
  };
}

export function getAuditOptionLabel(field: keyof WorkflowAuditState, value: string | null) {
  if (!value) {
    return "Pending";
  }

  const optionsByField: Record<keyof WorkflowAuditState, AuditOption<string>[]> = {
    workflowType: workflowTypeOptions,
    frequency: frequencyOptions,
    weeklyHours: weeklyHoursOptions,
    peopleInvolved: peopleOptions,
    errorImpact: errorImpactOptions,
    toolMaturity: toolMaturityOptions,
  };

  return optionsByField[field].find((option) => option.value === value)?.label ?? value;
}

const frequencyScores: Record<WorkflowFrequency, number> = {
  monthly: 5,
  weekly: 12,
  daily: 18,
  "multiple-daily": 24,
};

const weeklyHoursScores: Record<WeeklyHours, number> = {
  "under-2": 4,
  "2-5": 9,
  "6-10": 15,
  "11-20": 21,
  "20-plus": 27,
};

const peopleScores: Record<PeopleInvolved, number> = {
  one: 3,
  "2-3": 7,
  "4-8": 12,
  "9-plus": 16,
};

const errorScores: Record<ErrorImpact, number> = {
  low: 2,
  moderate: 8,
  frequent: 13,
  costly: 18,
};

const maturityScores: Record<ToolMaturity, number> = {
  manual: 15,
  fragmented: 12,
  "partly-automated": 5,
  legacy: 10,
};

const workflowScores: Record<WorkflowType, number> = {
  reporting: 4,
  "data-entry": 4,
  approvals: 3,
  "customer-requests": 4,
  "file-processing": 4,
  "team-handoffs": 3,
};

const systemRecommendations: Record<WorkflowType, string> = {
  reporting: "Automated reporting pipeline with a decision dashboard",
  "data-entry": "Structured intake, validation, and reconciliation workflow",
  approvals: "Approval portal with routing, ownership, and status visibility",
  "customer-requests": "Request triage system with assignment and service tracking",
  "file-processing": "Document-processing pipeline with validation and export controls",
  "team-handoffs": "Internal workflow system with ownership, alerts, and audit history",
};

function getBand(score: number): WorkflowAuditResult["band"] {
  if (score >= 75) return "Critical";
  if (score >= 55) return "Strong";
  if (score >= 35) return "Promising";
  return "Monitor";
}

function getAutomationFit(score: number) {
  if (score >= 75) return "Excellent fit";
  if (score >= 55) return "High fit";
  if (score >= 35) return "Moderate fit";
  return "Low immediate fit";
}

function calculateRecoverableTime(hours: WeeklyHours, score: number) {
  const ranges: Record<WeeklyHours, [number, number]> = {
    "under-2": [0.5, 2],
    "2-5": [2, 5],
    "6-10": [6, 10],
    "11-20": [11, 20],
    "20-plus": [20, 30],
  };
  const [minimum, maximum] = ranges[hours];
  const [lowFactor, highFactor] =
    score >= 75 ? [0.45, 0.7] : score >= 55 ? [0.35, 0.6] : score >= 35 ? [0.25, 0.45] : [0.1, 0.25];
  const low = Math.max(0.5, Math.round(minimum * lowFactor * 2) / 2);
  const high = Math.max(low, Math.round(maximum * highFactor * 2) / 2);

  if (low === high) {
    return `Up to ${formatHours(high)} team hours/week`;
  }

  return `${formatHours(low)}-${formatHours(high)} team hours/week`;
}

function formatHours(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getSummary(score: number, system: string) {
  if (score >= 75) {
    return `This workflow is a priority operating constraint. A ${system.toLowerCase()} could release meaningful capacity while reducing execution risk.`;
  }

  if (score >= 55) {
    return `This is a strong software opportunity. Start with the highest-volume path and design the system around its common exceptions.`;
  }

  if (score >= 35) {
    return `There is enough recurring friction to justify a focused improvement. Validate the volume and standardize the process before building broadly.`;
  }

  return "The workflow is not yet an urgent software investment. Document it, measure the real cost, and revisit when volume or risk increases.";
}

function getReasons(state: CompletedWorkflowAuditState) {
  return [
    `${getAuditOptionLabel("frequency", state.frequency)} with ${getAuditOptionLabel("weeklyHours", state.weeklyHours).toLowerCase()} of combined team effort.`,
    `${getAuditOptionLabel("peopleInvolved", state.peopleInvolved)} depend on a process that is ${getAuditOptionLabel("toolMaturity", state.toolMaturity).toLowerCase()}.`,
    `The current error impact is: ${getAuditOptionLabel("errorImpact", state.errorImpact).toLowerCase()}.`,
  ];
}

function getFirstMove(state: CompletedWorkflowAuditState) {
  if (state.toolMaturity === "partly-automated") {
    return "Map every manual exception in the existing automation before replacing or extending it.";
  }

  if (state.toolMaturity === "legacy") {
    return "Document the workflows and data that the legacy system must preserve before selecting a replacement path.";
  }

  if (state.frequency === "multiple-daily") {
    return "Observe one working day and record every trigger, decision, exception, and handoff in the workflow.";
  }

  return "Document three recent examples and separate the repeatable steps from the decisions that require human judgment.";
}

function getNextSteps(state: CompletedWorkflowAuditState) {
  return [
    "Measure one representative week using actual volume, time, and exception data.",
    `Prototype the core ${getAuditOptionLabel("workflowType", state.workflowType).toLowerCase()} path before adding edge cases.`,
    "Define a success metric such as hours recovered, turnaround time, or error reduction.",
  ];
}
