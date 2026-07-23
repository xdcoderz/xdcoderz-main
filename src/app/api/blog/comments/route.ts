import { NextResponse } from "next/server";
import { getBlogPost } from "@/features/blog/blog-utils";
import {
  getBlogComments,
  saveBlogComment,
} from "@/features/blog/comments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 64;
const MAX_BODY_LENGTH = 1_200;
const MIN_BODY_LENGTH = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = normalizeSlug(url.searchParams.get("slug") ?? "");

  if (!slug || !getBlogPost(slug)) {
    return NextResponse.json(
      { ok: false, message: "Blog post not found." },
      { status: 404 },
    );
  }

  const comments = await getBlogComments(slug);

  return NextResponse.json({
    ok: true,
    comments,
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return validationError("Write a comment before posting.");
  }

  if (!isRecord(payload)) {
    return validationError("Write a comment before posting.");
  }

  if (getString(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const slug = normalizeSlug(getString(payload.slug));
  const name = normalizeName(getString(payload.name));
  const body = normalizeBody(getString(payload.body));

  if (!slug || !getBlogPost(slug)) {
    return NextResponse.json(
      { ok: false, message: "Blog post not found." },
      { status: 404 },
    );
  }

  if (body.length < MIN_BODY_LENGTH) {
    return validationError("Add a little more context before posting.");
  }

  if (body.length > MAX_BODY_LENGTH) {
    return validationError("Keep it under 1,200 characters.");
  }

  if (countLinks(body) > 2) {
    return validationError("Too many links for a public comment.");
  }

  const ip = getClientIp(request);
  const rateLimitKey = `${ip}:${slug}`;

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { ok: false, message: "Too many comments. Give it a minute." },
      { status: 429 },
    );
  }

  try {
    const comment = await saveBlogComment({
      slug,
      name,
      body,
      userAgent: request.headers.get("user-agent") ?? undefined,
      ip,
    });

    return NextResponse.json({
      ok: true,
      message: "Comment posted.",
      comment,
    });
  } catch (error) {
    console.error("Blog comment failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Comments are not available right now. Try again shortly.",
      },
      { status: 502 },
    );
  }
}

function validationError(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeSlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 140);
}

function normalizeName(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, MAX_NAME_LENGTH);
  return normalized || "Anonymous builder";
}

function normalizeBody(value: string) {
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function countLinks(value: string) {
  return (value.match(/https?:\/\//gi) ?? []).length;
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
