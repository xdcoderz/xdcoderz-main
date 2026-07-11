export type IdeaAudience =
  | "small-businesses"
  | "operations-teams"
  | "creators"
  | "developers"
  | "students"
  | "consumers";

export type IdeaPlatform =
  | "any"
  | "web-app"
  | "mobile-app"
  | "saas"
  | "automation"
  | "desktop-app";

export type BuildDifficulty = "weekend" | "focused" | "serious";

export type IdeaBrief = {
  topic: string;
  audience: IdeaAudience | null;
  platform: IdeaPlatform | null;
  difficulty: BuildDifficulty | null;
};

export type CompletedIdeaBrief = {
  topic: string;
  audience: IdeaAudience;
  platform: IdeaPlatform;
  difficulty: BuildDifficulty;
};

export type IdeaOption<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export type GeneratedProjectIdea = {
  id: string;
  number: number;
  title: string;
  thesis: string;
  targetCustomer: string;
  problem: string;
  solution: string;
  platform: string;
  buildScope: string;
  mvpFeatures: string[];
  monetization: string;
  validation: string;
};
