type ResendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  from?: string;
  replyTo?: string;
};

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "XDCoderz <hello@xdcoderz.xyz>";
const DEFAULT_REPLY_TO_EMAIL = "grow.xdcoderz@gmail.com";

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getContactFromEmail() {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    process.env.NEWSLETTER_FROM_EMAIL?.trim() ||
    DEFAULT_FROM_EMAIL
  );
}

export function getContactReplyToEmail() {
  return (
    process.env.CONTACT_REPLY_TO_EMAIL?.trim() ||
    process.env.XDCODERZ_SERVICE_EMAIL?.trim() ||
    DEFAULT_REPLY_TO_EMAIL
  );
}

export async function sendResendEmail(input: ResendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is required to send email.");
  }

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: input.from ?? getContactFromEmail(),
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
      reply_to: input.replyTo ?? getContactReplyToEmail(),
    }),
  });

  if (response.ok) {
    return;
  }

  let detail = "";

  try {
    detail = await response.text();
  } catch {
    detail = "";
  }

  throw new Error(
    `Resend email failed with ${response.status}${detail ? `: ${detail}` : "."}`,
  );
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
