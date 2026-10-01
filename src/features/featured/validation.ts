import type { Spotlight } from "./types";

export function safeDestination(value: string) {
  if (value.startsWith("/") && !value.startsWith("//") && !/[\\\\\s]/.test(value)) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch { return false; }
}

export function validateSpotlight(value: Spotlight): string | null {
  for (const [field, limit] of [["title", 100], ["description", 360], ["badge", 60], ["buttonLabel", 40], ["imageAlt", 180]] as const) {
    if ((field !== "badge" && !value[field].trim()) || value[field].length > limit) return `Check ${field}: maximum ${limit} characters.`;
  }
  if (!safeDestination(value.href) || value.href.length > 2048) return "Use a site path or a valid HTTPS destination.";
  for (const date of [value.startsAt, value.endsAt]) {
    if (date && !Number.isFinite(Date.parse(date))) return "Enter valid schedule dates.";
  }
  if (value.startsAt && value.endsAt && Date.parse(value.endsAt) <= Date.parse(value.startsAt)) return "End time must be after start time.";
  return null;
}

export function isVisible(value: Spotlight, now = Date.now()) {
  return value.enabled &&
    (!value.startsAt || Date.parse(value.startsAt) <= now) &&
    (!value.endsAt || now < Date.parse(value.endsAt));
}

