export type ProjectType =
  | "business-website"
  | "web-application"
  | "android-application"
  | "desktop-application"
  | "saas-product"
  | "automation-system";

export type Complexity = "lean" | "standard" | "advanced";

export type Timeline = "flexible" | "normal" | "fast";

export type IntegrationLevel = "none" | "light" | "moderate" | "heavy";

export type OwnershipLevel = "starter" | "growth" | "premium";

export type EstimatorState = {
  projectType: ProjectType | null;
  complexity: Complexity | null;
  timeline: Timeline | null;
  integrationLevel: IntegrationLevel | null;
  ownershipLevel: OwnershipLevel | null;
};

export type CompletedEstimatorState = {
  projectType: ProjectType;
  complexity: Complexity;
  timeline: Timeline;
  integrationLevel: IntegrationLevel;
  ownershipLevel: OwnershipLevel;
};

export type EstimateResult = {
  low: number;
  high: number;
  score: number;
  timelineWeeks: string;
  complexityLabel: string;
  recommendation: string;
  primaryDrivers: string[];
};
