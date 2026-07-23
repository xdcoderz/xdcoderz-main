import { NextResponse } from "next/server";
import { sanitizeToolEventInput } from "@/features/tools/analytics/events";
import { saveToolEvent } from "@/features/tools/analytics/storage";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Event payload is too large." },
      { status: 413 },
    );
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Event rate limit reached." },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return invalidEvent();
  }

  const event = sanitizeToolEventInput(payload);

  if (!event) return invalidEvent();

  try {
    const result = await saveToolEvent(event);

    if (result.skipped) {
      console.warn("Tool event storage skipped", result.reason);
    }

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (error) {
    console.error("Tool event storage failed", error);

    return NextResponse.json(
      { ok: false, message: "Event storage is not available." },
      { status: 502 },
    );
  }
}

function invalidEvent() {
  return NextResponse.json(
    { ok: false, message: "Send a valid tool event." },
    { status: 400 },
  );
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    cleanupRateLimitStore(now);
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size < 500) return;

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }
}
