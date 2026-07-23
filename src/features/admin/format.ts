import type { ContactLead } from "./types";

export function formatAdminDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export function formatAdminSource(source: string) {
  if (source.startsWith("tool:")) {
    return source
      .slice(5)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return source
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getLeadAttribution(metadata: ContactLead["metadata"]) {
  if (!isRecord(metadata) || !isRecord(metadata.attribution)) return null;

  const attribution = metadata.attribution;
  const tool = typeof attribution.tool === "string" ? attribution.tool : "";
  const summary =
    typeof attribution.summary === "string" ? attribution.summary : "";
  const details = isRecord(attribution.details)
    ? Object.entries(attribution.details).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      )
    : [];

  if (!tool || !summary) return null;
  return { tool, summary, details };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
