"use client";

import type {
  ToolEventInput,
  ToolEventMetadataValue,
  ToolEventName,
} from "./events";
import type { ToolAttributionSlug } from "@/features/leads/tool-attribution";

const SESSION_STORAGE_KEY = "xdcoderz_tool_session_id";
const SESSION_LIFETIME_MS = 30 * 24 * 60 * 60 * 1_000;
let memorySessionId = "";

type TrackToolEventInput = {
  tool: ToolAttributionSlug;
  event: ToolEventName;
  metadata?: Record<string, ToolEventMetadataValue>;
};

export function getToolSessionId() {
  if (typeof window === "undefined") return "";

  try {
    const storedSession = readStoredSession(
      window.localStorage.getItem(SESSION_STORAGE_KEY),
    );

    if (storedSession) return storedSession;

    const sessionId = window.crypto.randomUUID();
    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        id: sessionId,
        expiresAt: Date.now() + SESSION_LIFETIME_MS,
      }),
    );
    return sessionId;
  } catch {
    memorySessionId ||= window.crypto.randomUUID();
    return memorySessionId;
  }
}

function readStoredSession(value: string | null) {
  if (!value) return "";

  try {
    const parsed = JSON.parse(value) as { id?: unknown; expiresAt?: unknown };

    if (
      typeof parsed.id === "string" &&
      typeof parsed.expiresAt === "number" &&
      parsed.expiresAt > Date.now()
    ) {
      return parsed.id;
    }
  } catch {
    return "";
  }

  return "";
}

export function trackToolEvent(input: TrackToolEventInput) {
  if (typeof window === "undefined") return;

  const payload: ToolEventInput = {
    sessionId: getToolSessionId(),
    tool: input.tool,
    event: input.event,
    metadata: input.metadata,
  };

  void fetch("/api/tools/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the tool experience.
  });
}
