import { routes } from "@/lib/routes";

export const toolAttributionSlugs = [
  "software-cost-estimator",
  "workflow-audit",
  "project-ideas-generator",
] as const;

export type ToolAttributionSlug = (typeof toolAttributionSlugs)[number];

export type ToolAttribution = {
  source: "tool";
  sourcePath: `/tools/${ToolAttributionSlug}`;
  tool: ToolAttributionSlug;
  reason: string;
  summary: string;
  message: string;
  details: Record<string, string>;
};

type ToolContactInput = Omit<ToolAttribution, "source" | "sourcePath">;

type SearchParams = Record<string, string | string[] | undefined>;

const MAX_REASON_LENGTH = 120;
const MAX_SUMMARY_LENGTH = 300;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_DETAIL_KEYS = 16;
const MAX_DETAIL_KEY_LENGTH = 60;
const MAX_DETAIL_VALUE_LENGTH = 300;

export function buildToolContactHref(input: ToolContactInput) {
  const params = new URLSearchParams({
    source: "tool",
    tool: input.tool,
    reason: input.reason,
    summary: input.summary,
    message: input.message,
    details: JSON.stringify(input.details),
  });

  return `${routes.contact}?${params.toString()}`;
}

export function parseToolAttributionSearchParams(
  searchParams: SearchParams,
): ToolAttribution | null {
  return sanitizeToolAttribution({
    source: firstValue(searchParams.source),
    tool: firstValue(searchParams.tool),
    reason: firstValue(searchParams.reason),
    summary: firstValue(searchParams.summary),
    message: firstValue(searchParams.message),
    details: parseDetails(firstValue(searchParams.details)),
  });
}

export function sanitizeToolAttribution(value: unknown): ToolAttribution | null {
  if (
    !isRecord(value) ||
    value.source !== "tool" ||
    !isToolAttributionSlug(value.tool)
  ) {
    return null;
  }

  const reason = cleanString(value.reason, MAX_REASON_LENGTH);
  const summary = cleanString(value.summary, MAX_SUMMARY_LENGTH);
  const message = cleanString(value.message, MAX_MESSAGE_LENGTH);
  const details = sanitizeDetails(value.details);

  if (!reason || !summary || !message) {
    return null;
  }

  return {
    source: "tool",
    sourcePath: `/tools/${value.tool}`,
    tool: value.tool,
    reason,
    summary,
    message,
    details,
  };
}

export function getToolAttributionLabel(tool: ToolAttributionSlug) {
  switch (tool) {
    case "software-cost-estimator":
      return "Software Cost Estimator";
    case "workflow-audit":
      return "Workflow Audit";
    case "project-ideas-generator":
      return "Project Ideas Generator";
  }
}

function parseDetails(value: string) {
  if (!value) return {};

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return {};
  }
}

function sanitizeDetails(value: unknown) {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .slice(0, MAX_DETAIL_KEYS)
      .map(([key, detail]) => [
        cleanString(key, MAX_DETAIL_KEY_LENGTH),
        cleanString(detail, MAX_DETAIL_VALUE_LENGTH),
      ])
      .filter(([key, detail]) => Boolean(key && detail)),
  );
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isToolAttributionSlug(
  value: unknown,
): value is ToolAttributionSlug {
  return (
    typeof value === "string" &&
    toolAttributionSlugs.some((slug) => slug === value)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
