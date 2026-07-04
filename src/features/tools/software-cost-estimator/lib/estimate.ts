import type {
  CompletedEstimatorState,
  Complexity,
  EstimateResult,
  EstimatorState,
  IntegrationLevel,
  OwnershipLevel,
  ProjectType,
  Timeline,
} from "../types";

type OptionConfig<T extends string> = {
  value: T;
  label: string;
  description: string;
};

type MarketRange = {
  label: string;
  range: string;
  note: string;
};

export const projectTypeOptions: OptionConfig<ProjectType>[] = [
  {
    value: "business-website",
    label: "Business website",
    description: "A conversion-focused website for credibility, discovery, and qualified enquiries.",
  },
  {
    value: "web-application",
    label: "Web application",
    description: "A browser-based system with user flows, data handling, and operational logic.",
  },
  {
    value: "android-application",
    label: "Android application",
    description: "A focused mobile app for customers, teams, or a product workflow.",
  },
  {
    value: "desktop-application",
    label: "Desktop application",
    description: "A local software tool for productivity, utilities, or heavier workflows.",
  },
  {
    value: "saas-product",
    label: "SaaS product",
    description: "A subscription-ready product with accounts, workflows, and growth potential.",
  },
  {
    value: "automation-system",
    label: "Automation system",
    description: "A workflow engine that reduces repetitive manual work and connects business tools.",
  },
];

export const complexityOptions: OptionConfig<Complexity>[] = [
  {
    value: "lean",
    label: "Lean MVP",
    description: "Core journey, essential screens, and the fastest responsible launch path.",
  },
  {
    value: "standard",
    label: "Standard build",
    description: "Polished experience, stronger workflows, admin surfaces, and better handoff.",
  },
  {
    value: "advanced",
    label: "Advanced system",
    description: "Custom logic, richer roles, deeper flows, analytics, and long-term scaling needs.",
  },
];

export const timelineOptions: OptionConfig<Timeline>[] = [
  {
    value: "flexible",
    label: "Flexible",
    description: "Best for thoughtful planning, lower delivery pressure, and cleaner prioritization.",
  },
  {
    value: "normal",
    label: "Standard",
    description: "Balanced timeline for a serious build without unnecessary rush cost.",
  },
  {
    value: "fast",
    label: "Fast-track",
    description: "Higher coordination intensity when speed matters more than a relaxed process.",
  },
];

export const integrationOptions: OptionConfig<IntegrationLevel>[] = [
  {
    value: "none",
    label: "No integrations",
    description: "Standalone product or website with minimal external system dependency.",
  },
  {
    value: "light",
    label: "Light",
    description: "Contact forms, analytics, payments, email, or one simple third-party service.",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "Multiple tools, APIs, dashboards, automations, or operational handoffs.",
  },
  {
    value: "heavy",
    label: "Heavy",
    description: "Complex API flows, data migration, role-based systems, or business-critical logic.",
  },
];

export const ownershipOptions: OptionConfig<OwnershipLevel>[] = [
  {
    value: "starter",
    label: "Launch-ready",
    description: "Clean implementation, responsive UI, and essential deployment support.",
  },
  {
    value: "growth",
    label: "Growth-ready",
    description: "Better SEO, analytics, conversion polish, documentation, and maintainability.",
  },
  {
    value: "premium",
    label: "Operator-grade",
    description: "Stronger QA, dashboards, maintainability, security posture, and scale planning.",
  },
];

const baseRanges: Record<ProjectType, [number, number]> = {
  "business-website": [35000, 120000],
  "web-application": [90000, 350000],
  "android-application": [85000, 320000],
  "desktop-application": [65000, 260000],
  "saas-product": [150000, 650000],
  "automation-system": [70000, 300000],
};

const complexityMultipliers: Record<Complexity, number> = {
  lean: 1,
  standard: 1.45,
  advanced: 2.15,
};

const timelineMultipliers: Record<Timeline, number> = {
  flexible: 0.95,
  normal: 1,
  fast: 1.22,
};

const integrationMultipliers: Record<IntegrationLevel, number> = {
  none: 1,
  light: 1.12,
  moderate: 1.35,
  heavy: 1.72,
};

const ownershipMultipliers: Record<OwnershipLevel, number> = {
  starter: 1,
  growth: 1.22,
  premium: 1.48,
};

const timelineWeeks: Record<ProjectType, Record<Complexity, string>> = {
  "business-website": {
    lean: "2-4 weeks",
    standard: "4-7 weeks",
    advanced: "7-10 weeks",
  },
  "web-application": {
    lean: "4-7 weeks",
    standard: "7-12 weeks",
    advanced: "12-20 weeks",
  },
  "android-application": {
    lean: "4-8 weeks",
    standard: "8-14 weeks",
    advanced: "14-22 weeks",
  },
  "desktop-application": {
    lean: "3-6 weeks",
    standard: "6-10 weeks",
    advanced: "10-18 weeks",
  },
  "saas-product": {
    lean: "6-10 weeks",
    standard: "10-18 weeks",
    advanced: "18-30 weeks",
  },
  "automation-system": {
    lean: "3-6 weeks",
    standard: "6-11 weeks",
    advanced: "11-18 weeks",
  },
};

export const marketRanges: MarketRange[] = [
  {
    label: "Standard business website",
    range: "₹35,000 - ₹1,20,000",
    note: "Usually depends on content readiness, page count, design quality, SEO setup, and conversion polish.",
  },
  {
    label: "Web application",
    range: "₹90,000 - ₹3,50,000+",
    note: "Cost rises with accounts, dashboards, data models, permissions, workflows, and integrations.",
  },
  {
    label: "Android application",
    range: "₹85,000 - ₹3,20,000+",
    note: "The main drivers are screens, backend needs, device behavior, authentication, and release support.",
  },
  {
    label: "Desktop application",
    range: "₹65,000 - ₹2,60,000+",
    note: "Packaging, offline behavior, updates, system access, and installer quality affect the final range.",
  },
  {
    label: "SaaS MVP",
    range: "₹1,50,000 - ₹6,50,000+",
    note: "Subscriptions, roles, onboarding, billing, analytics, and admin operations make SaaS more strategic.",
  },
  {
    label: "Automation system",
    range: "₹70,000 - ₹3,00,000+",
    note: "Pricing depends on the number of workflows, tools connected, exception handling, and reporting needs.",
  },
];

export const defaultEstimatorState: EstimatorState = {
  projectType: null,
  complexity: null,
  timeline: null,
  integrationLevel: null,
  ownershipLevel: null,
};

export function isEstimatorComplete(state: EstimatorState): state is CompletedEstimatorState {
  return Boolean(
    state.projectType &&
      state.complexity &&
      state.timeline &&
      state.integrationLevel &&
      state.ownershipLevel,
  );
}

export function calculateEstimate(state: CompletedEstimatorState): EstimateResult {
  const [baseLow, baseHigh] = baseRanges[state.projectType];
  const multiplier =
    complexityMultipliers[state.complexity] *
    timelineMultipliers[state.timeline] *
    integrationMultipliers[state.integrationLevel] *
    ownershipMultipliers[state.ownershipLevel];

  const low = roundToNearest(baseLow * multiplier, 5000);
  const high = roundToNearest(baseHigh * multiplier, 5000);
  const score = calculateScore(state);

  return {
    low,
    high,
    score,
    timelineWeeks: timelineWeeks[state.projectType][state.complexity],
    complexityLabel: getComplexityLabel(score),
    recommendation: getRecommendation(score),
    primaryDrivers: getPrimaryDrivers(state),
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}

function calculateScore(state: CompletedEstimatorState) {
  const complexityScore = {
    lean: 1,
    standard: 2,
    advanced: 3,
  }[state.complexity];
  const integrationScore = {
    none: 0,
    light: 1,
    moderate: 2,
    heavy: 3,
  }[state.integrationLevel];
  const ownershipScore = {
    starter: 1,
    growth: 2,
    premium: 3,
  }[state.ownershipLevel];
  const productScore = {
    "business-website": 1,
    "desktop-application": 2,
    "automation-system": 2,
    "android-application": 3,
    "web-application": 3,
    "saas-product": 4,
  }[state.projectType];

  return complexityScore + integrationScore + ownershipScore + productScore;
}

function getComplexityLabel(score: number) {
  if (score >= 11) {
    return "Strategic build";
  }

  if (score >= 8) {
    return "Growth build";
  }

  return "Focused launch";
}

function getRecommendation(score: number) {
  if (score >= 11) {
    return "Treat this as a strategic system. Start with a discovery call, define the core workflow, and protect scope before development begins.";
  }

  if (score >= 8) {
    return "This is a strong candidate for a structured build. Prioritize the highest-value workflow first, then expand after launch feedback.";
  }

  return "This can move quickly if the first release stays focused. Launch the core outcome, measure response, and improve from real usage.";
}

function getPrimaryDrivers(state: CompletedEstimatorState) {
  const drivers = [
    getOptionLabel(projectTypeOptions, state.projectType),
    getOptionLabel(complexityOptions, state.complexity),
  ];

  if (state.integrationLevel !== "none") {
    drivers.push(getOptionLabel(integrationOptions, state.integrationLevel));
  }

  if (state.timeline === "fast") {
    drivers.push("Fast-track delivery");
  }

  drivers.push(getOptionLabel(ownershipOptions, state.ownershipLevel));

  return drivers;
}

function getOptionLabel<T extends string>(options: OptionConfig<T>[], value: T) {
  return options.find((option) => option.value === value)?.label ?? value;
}
