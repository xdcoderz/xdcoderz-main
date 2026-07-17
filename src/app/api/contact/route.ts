import { NextResponse } from "next/server";
import { saveContactLead } from "@/features/leads/storage";
import {
  getToolAttributionLabel,
  sanitizeToolAttribution,
  type ToolAttribution,
} from "@/features/leads/tool-attribution";
import { sanitizeToolEventInput } from "@/features/tools/analytics/events";
import { saveToolEvent } from "@/features/tools/analytics/storage";
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
  const attribution = sanitizeToolAttribution(payload.attribution);
  const contactSubmissionEvent = attribution
    ? sanitizeToolEventInput({
        sessionId: payload.sessionId,
        tool: attribution.tool,
        event: "contact_submitted",
        metadata: { reason },
      })
    : null;

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
      attribution,
    });

    await sendContactEmails({
      name,
      email,
      reason,
      message,
      ip,
      userAgent: request.headers.get("user-agent") ?? "not provided",
      attribution,
    });

    await persistContactSubmissionEvent(contactSubmissionEvent);

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

async function persistContactSubmissionEvent(
  event: NonNullable<ReturnType<typeof sanitizeToolEventInput>> | null,
) {
  if (!event) return;

  try {
    const result = await saveToolEvent(event);

    if (result.skipped) {
      console.warn("Contact submission event storage skipped", result.reason);
    }
  } catch (error) {
    console.error("Contact submission event storage failed", error);
  }
}

type ContactEmailInput = {
  name: string;
  email: string;
  reason: string;
  message: string;
  ip: string;
  userAgent: string;
  attribution: ToolAttribution | null;
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
  const attributionText = formatAttributionText(input.attribution);
  const attributionHtml = formatAttributionHtml(input.attribution);

  await sendResendEmail({
    from: fromEmail,
    to: serviceEmail,
    replyTo: input.email,
    subject: `New XDCoderz enquiry: ${input.reason}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Reason: ${input.reason}`,
      ...attributionText,
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
      attributionHtml,
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
      input.attribution
        ? `We also received the context from your ${getToolAttributionLabel(input.attribution.tool)} result.`
        : "",
      "If it is a project enquiry, we will review the context and reply with the next practical step.",
      "",
      "XDCoderz",
    ].join("\n"),
    html: [
      `<p>Hi ${safeName},</p>`,
      "<p>Thanks for contacting <strong>XDCoderz</strong>. Your message has reached the growth inbox.</p>",
      input.attribution
        ? `<p>We also received the context from your <strong>${escapeHtml(getToolAttributionLabel(input.attribution.tool))}</strong> result.</p>`
        : "",
      "<p>If it is a project enquiry, we will review the context and reply with the next practical step.</p>",
      "<p>XDCoderz</p>",
    ].join(""),
  });
}

function formatAttributionText(attribution: ToolAttribution | null) {
  if (!attribution) return [];

  return [
    `Source tool: ${getToolAttributionLabel(attribution.tool)}`,
    `Source page: ${attribution.sourcePath}`,
    `Tool summary: ${attribution.summary}`,
    ...Object.entries(attribution.details).map(([key, value]) => `${key}: ${value}`),
  ];
}

function formatAttributionHtml(attribution: ToolAttribution | null) {
  if (!attribution) return "";

  const details = Object.entries(attribution.details)
    .map(
      ([key, value]) =>
        `<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</li>`,
    )
    .join("");

  return [
    `<li><strong>Source tool:</strong> ${escapeHtml(getToolAttributionLabel(attribution.tool))}</li>`,
    `<li><strong>Source page:</strong> ${escapeHtml(attribution.sourcePath)}</li>`,
    `<li><strong>Tool summary:</strong> ${escapeHtml(attribution.summary)}</li>`,
    details,
  ].join("");
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
