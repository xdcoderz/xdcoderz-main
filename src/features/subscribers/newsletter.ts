import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import {
  escapeHtml,
  getContactFromEmail,
  getContactReplyToEmail,
  sendResendEmail,
} from "@/lib/email/resend";

export type NewsletterProvider =
  | "local"
  | "resend"
  | "brevo"
  | "buttondown"
  | "mailchimp";

export type NewsletterSubscriptionInput = {
  email: string;
  source: string;
  slug?: string;
  userAgent?: string;
  ip?: string;
};

type ProviderResult = {
  provider: NewsletterProvider;
  ok: boolean;
};

const providerNames = new Set<NewsletterProvider>([
  "local",
  "resend",
  "brevo",
  "buttondown",
  "mailchimp",
]);

export function getNewsletterProvider(): NewsletterProvider {
  const configured = process.env.NEWSLETTER_PROVIDER?.toLowerCase().trim();

  if (configured && providerNames.has(configured as NewsletterProvider)) {
    return configured as NewsletterProvider;
  }

  if (process.env.BREVO_API_KEY) {
    return "brevo";
  }

  if (process.env.RESEND_API_KEY) {
    return "resend";
  }

  if (process.env.BUTTONDOWN_API_KEY) {
    return "buttondown";
  }

  if (process.env.MAILCHIMP_API_KEY) {
    return "mailchimp";
  }

  return "local";
}

export async function subscribeToNewsletter(
  input: NewsletterSubscriptionInput,
): Promise<ProviderResult> {
  const provider = getNewsletterProvider();

  if (provider === "brevo") {
    await subscribeWithBrevo(input);
    return { provider, ok: true };
  }

  if (provider === "resend") {
    await subscribeWithResend(input);
    return { provider, ok: true };
  }

  if (provider === "buttondown") {
    await subscribeWithButtondown(input);
    return { provider, ok: true };
  }

  if (provider === "mailchimp") {
    await subscribeWithMailchimp(input);
    return { provider, ok: true };
  }

  await subscribeLocally(input);
  return { provider, ok: true };
}

async function subscribeLocally(input: NewsletterSubscriptionInput) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "newsletter-subscribers.jsonl");
  const row = {
    email: input.email,
    source: input.source,
    slug: input.slug ?? null,
    createdAt: new Date().toISOString(),
    userAgent: input.userAgent ?? null,
    ip: input.ip ?? null,
  };

  await mkdir(dataDir, { recursive: true });
  await appendFile(filePath, `${JSON.stringify(row)}\n`, "utf8");
}

async function subscribeWithBrevo(input: NewsletterSubscriptionInput) {
  const apiKey = requireEnv("BREVO_API_KEY");
  const listId = Number.parseInt(requireEnv("BREVO_LIST_ID"), 10);

  if (!Number.isFinite(listId)) {
    throw new Error("BREVO_LIST_ID must be a number.");
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  await assertProviderResponse(response, "Brevo");
}

async function subscribeWithResend(input: NewsletterSubscriptionInput) {
  const safeEmail = escapeHtml(input.email);
  const safeSource = escapeHtml(input.source);
  const safeSlug = escapeHtml(input.slug ?? "not provided");
  const safeIp = escapeHtml(input.ip ?? "not provided");
  const safeUserAgent = escapeHtml(input.userAgent ?? "not provided");
  const serviceEmail = getContactReplyToEmail();
  const fromEmail = getContactFromEmail();

  await sendResendEmail({
    from: fromEmail,
    to: input.email,
    subject: "You are on the XDCoderz Friday Brief",
    text: [
      "You are on the XDCoderz Friday Brief.",
      "",
      "Every Friday, we send the few market and technology shifts that look worth building around.",
      "",
      "You can reply to this email if you want to discuss an idea with XDCoderz.",
    ].join("\n"),
    html: [
      "<p>You are on the <strong>XDCoderz Friday Brief</strong>.</p>",
      "<p>Every Friday, we send the few market and technology shifts that look worth building around.</p>",
      "<p>You can reply to this email if you want to discuss an idea with XDCoderz.</p>",
    ].join(""),
  });

  await sendResendEmail({
    from: fromEmail,
    to: serviceEmail,
    subject: "New XDCoderz Friday Brief subscriber",
    text: [
      `Email: ${input.email}`,
      `Source: ${input.source}`,
      `Slug: ${input.slug ?? "not provided"}`,
      `IP: ${input.ip ?? "not provided"}`,
      `User agent: ${input.userAgent ?? "not provided"}`,
    ].join("\n"),
    html: [
      "<h2>New Friday Brief subscriber</h2>",
      "<ul>",
      `<li><strong>Email:</strong> ${safeEmail}</li>`,
      `<li><strong>Source:</strong> ${safeSource}</li>`,
      `<li><strong>Slug:</strong> ${safeSlug}</li>`,
      `<li><strong>IP:</strong> ${safeIp}</li>`,
      `<li><strong>User agent:</strong> ${safeUserAgent}</li>`,
      "</ul>",
    ].join(""),
  });
}

async function subscribeWithButtondown(input: NewsletterSubscriptionInput) {
  const apiKey = requireEnv("BUTTONDOWN_API_KEY");

  const response = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      authorization: `Token ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      tags: ["friday-brief"],
      metadata: {
        source: input.source,
        slug: input.slug ?? "",
      },
    }),
  });

  await assertProviderResponse(response, "Buttondown");
}

async function subscribeWithMailchimp(input: NewsletterSubscriptionInput) {
  const apiKey = requireEnv("MAILCHIMP_API_KEY");
  const audienceId = requireEnv("MAILCHIMP_AUDIENCE_ID");
  const serverPrefix =
    process.env.MAILCHIMP_SERVER_PREFIX?.trim() ?? apiKey.split("-").at(1);

  if (!serverPrefix) {
    throw new Error(
      "MAILCHIMP_SERVER_PREFIX is required when the API key does not include a server suffix.",
    );
  }

  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        authorization: `Basic ${Buffer.from(`xdcoderz:${apiKey}`).toString("base64")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email_address: input.email,
        status_if_new: "subscribed",
        status: "subscribed",
        tags: ["friday-brief"],
      }),
    },
  );

  await assertProviderResponse(response, "Mailchimp");
}

async function assertProviderResponse(response: Response, providerName: string) {
  if (response.ok || response.status === 409) {
    return;
  }

  let detail = "";

  try {
    detail = await response.text();
  } catch {
    detail = "";
  }

  throw new Error(
    `${providerName} subscription failed with ${response.status}${detail ? `: ${detail}` : "."}`,
  );
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required for this newsletter provider.`);
  }

  return value;
}
