import { NextResponse } from "next/server";
import { saveContactLead } from "@/features/leads/storage";
import {
  escapeHtml,
  getContactFromEmail,
  getContactReplyToEmail,
  sendResendEmail,
} from "@/lib/email/resend";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_REASON_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 4;

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
    return invalidRequest();
  }

  if (!isRecord(payload)) {
    return invalidRequest();
  }

  const honeypot = getString(payload.website);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = trimAndLimit(getString(payload.name), MAX_NAME_LENGTH);
  const email = normalizeEmail(getString(payload.email));
  const reason = trimAndLimit(getString(payload.reason), MAX_REASON_LENGTH);
  const message = trimAndLimit(getString(payload.message), MAX_MESSAGE_LENGTH);

  if (!name || !reason || message.length < 20) {
    return NextResponse.json(
      { ok: false, message: "Add your name, reason, and a useful project note." },
      { status: 400 },
    );
  }

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
      { ok: false, message: "Too many messages. Give it a minute and try again." },
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
    await persistContactLead({
      name,
      email,
      reason,
      message,
      ip,
      userAgent: request.headers.get("user-agent") ?? "not provided",
    });

    await sendContactEmails({
      name,
      email,
      reason,
      message,
      ip,
      userAgent: request.headers.get("user-agent") ?? "not provided",
    });

    return NextResponse.json({
      ok: true,
      message: "Message received. XDCoderz will reply from the growth inbox.",
    });
  } catch (error) {
    console.error("Contact email failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Contact email is not available right now. Try again shortly.",
      },
      { status: 502 },
    );
  }
}

type ContactEmailInput = {
  name: string;
  email: string;
  reason: string;
  message: string;
  ip: string;
  userAgent: string;
};

async function sendContactEmails(input: ContactEmailInput) {
  const serviceEmail = getContactReplyToEmail();
  const fromEmail = getContactFromEmail();
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeReason = escapeHtml(input.reason);
  const safeMessage = escapeHtml(input.message).replaceAll("\n", "<br />");
  const safeIp = escapeHtml(input.ip);
  const safeUserAgent = escapeHtml(input.userAgent);

  await sendResendEmail({
    from: fromEmail,
    to: serviceEmail,
    replyTo: input.email,
    subject: `New XDCoderz enquiry: ${input.reason}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Reason: ${input.reason}`,
      "",
      input.message,
      "",
      `IP: ${input.ip}`,
      `User agent: ${input.userAgent}`,
    ].join("\n"),
    html: [
      "<h2>New XDCoderz enquiry</h2>",
      "<ul>",
      `<li><strong>Name:</strong> ${safeName}</li>`,
      `<li><strong>Email:</strong> ${safeEmail}</li>`,
      `<li><strong>Reason:</strong> ${safeReason}</li>`,
      `<li><strong>IP:</strong> ${safeIp}</li>`,
      `<li><strong>User agent:</strong> ${safeUserAgent}</li>`,
      "</ul>",
      `<p>${safeMessage}</p>`,
    ].join(""),
  });

  await sendResendEmail({
    from: fromEmail,
    to: input.email,
    subject: "XDCoderz received your message",
    text: [
      `Hi ${input.name},`,
      "",
      "Thanks for contacting XDCoderz. Your message has reached the growth inbox.",
      "If it is a project enquiry, we will review the context and reply with the next practical step.",
      "",
      "XDCoderz",
    ].join("\n"),
    html: [
      `<p>Hi ${safeName},</p>`,
      "<p>Thanks for contacting <strong>XDCoderz</strong>. Your message has reached the growth inbox.</p>",
      "<p>If it is a project enquiry, we will review the context and reply with the next practical step.</p>",
      "<p>XDCoderz</p>",
    ].join(""),
  });
}

async function persistContactLead(input: ContactEmailInput) {
  try {
    const result = await saveContactLead(input);

    if (result.skipped) {
      console.warn("Contact lead storage skipped", result.reason);
    }
  } catch (error) {
    console.error("Contact lead storage failed", error);
  }
}

function invalidRequest() {
  return NextResponse.json(
    { ok: false, message: "Send a valid contact request." },
    { status: 400 },
  );
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
