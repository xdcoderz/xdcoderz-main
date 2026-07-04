import type { LucideIcon } from "lucide-react";

export type ToolCategory =
  | "Planning Tools"
  | "Business Tools"
  | "Developer Tools"
  | "Growth Tools";

export type ToolStatus = "Live" | "Preview" | "Planned";

export type ToolDefinition = {
  slug: string;
  name: string;
  category: ToolCategory;
  status: ToolStatus;
  featured?: boolean;
  summary: string;
  description: string;
  outcome: string;
  audience: string;
  businessUse: string;
  ctaLabel: string;
  icon: LucideIcon;
  tags: string[];
  inputs: string[];
  outputs: string[];
  nextSteps: string[];
};

