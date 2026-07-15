import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/features/subscribers/newsletter";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_SOURCE_LENGTH = 80;
const MAX_SLUG_LENGTH = 120;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Send a valid email address." },
      { status: 400 },
    );
  }

  if (!isRecord(payload)) {
    return NextResponse.json(
      { ok: false, message: "Send a valid email address." },
      { status: 400 },
    );
  }

  const honeypot = getString(payload.website);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const email = normalizeEmail(getString(payload.email));
  const source = trimAndLimit(getString(payload.source), MAX_SOURCE_LENGTH) || "blog";
  const slug = trimAndLimit(getString(payload.slug), MAX_SLUG_LENGTH);

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Use a real email address." },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  const rateLimitKey = `${ip}:${email}`;

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { ok: false, message: "Too many tries. Give it a minute and try again." },
      { status: 429 },
    );
  }

  let turnstileResult: Awaited<ReturnType<typeof verifyTurnstileToken>>;

  try {
    turnstileResult = await verifyTurnstileToken(
      getString(payload.turnstileToken),
      ip,
    );
  } catch (error) {
    console.error("Turnstile verification failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Verification is not available right now. Try again shortly.",
      },
      { status: 502 },
    );
  }

  if (!turnstileResult.ok) {
    return NextResponse.json(
      { ok: false, message: turnstileResult.message },
      { status: 403 },
    );
  }

  try {
    await subscribeToNewsletter({
      email,
      source,
      slug,
      userAgent: request.headers.get("user-agent") ?? undefined,
      ip,
    });

    return NextResponse.json({
      ok: true,
      message: "You are on the Friday Brief list.",
    });
  } catch (error) {
    console.error("Newsletter subscription failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Subscription is not available right now. Try again shortly.",
      },
      { status: 502 },
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function trimAndLimit(value: string, maxLength: number) {
  return value.trim().slice(0, maxLength);
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
  if (rateLimitStore.size < 500) {
    return;
  }

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}
