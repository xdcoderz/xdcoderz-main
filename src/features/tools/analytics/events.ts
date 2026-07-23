import {
  isToolAttributionSlug,
  type ToolAttributionSlug,
} from "@/features/leads/tool-attribution";

export const toolEventNames = [
  "tool_started",
  "tool_completed",
  "contact_clicked",
  "contact_submitted",
] as const;

export type ToolEventName = (typeof toolEventNames)[number];

export type ToolEventMetadataValue = string | number | boolean | null;

export type ToolEventInput = {
  sessionId: string;
  tool: ToolAttributionSlug;
  event: ToolEventName;
  metadata?: Record<string, ToolEventMetadataValue>;
};

const SESSION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_METADATA_KEYS = 16;
const MAX_METADATA_KEY_LENGTH = 60;
const MAX_METADATA_STRING_LENGTH = 300;

export function sanitizeToolEventInput(value: unknown): ToolEventInput | null {
  if (!isRecord(value)) return null;

  const sessionId = cleanString(value.sessionId, 36);

  if (
    !SESSION_ID_PATTERN.test(sessionId) ||
    !isToolAttributionSlug(value.tool) ||
    !isToolEventName(value.event)
  ) {
    return null;
  }

  return {
    sessionId,
    tool: value.tool,
    event: value.event,
    metadata: sanitizeMetadata(value.metadata),
  };
}

function sanitizeMetadata(value: unknown) {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .slice(0, MAX_METADATA_KEYS)
      .map(([key, item]) => [
        cleanString(key, MAX_METADATA_KEY_LENGTH),
        sanitizeMetadataValue(item),
      ])
      .filter(([key, item]) => Boolean(key) && item !== undefined),
  ) as Record<string, ToolEventMetadataValue>;
}

function sanitizeMetadataValue(value: unknown): ToolEventMetadataValue | undefined {
  if (typeof value === "string") {
    return cleanString(value, MAX_METADATA_STRING_LENGTH);
  }

  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean" || value === null) return value;
  return undefined;
}

function isToolEventName(value: unknown): value is ToolEventName {
  return (
    typeof value === "string" &&
    toolEventNames.some((eventName) => eventName === value)
  );
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
