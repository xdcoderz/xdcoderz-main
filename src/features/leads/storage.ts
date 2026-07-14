import {
  insertSupabaseRow,
  upsertSupabaseRow,
} from "@/lib/supabase/server";

export type ContactLeadRecord = {
  name: string;
  email: string;
  reason: string;
  message: string;
  ip?: string;
  userAgent?: string;
};

export type NewsletterSubscriberRecord = {
  email: string;
  source: string;
  slug?: string;
  ip?: string;
  userAgent?: string;
};

export async function saveContactLead(record: ContactLeadRecord) {
  return insertSupabaseRow("contact_leads", {
    name: record.name,
    email: record.email,
    reason: record.reason,
    message: record.message,
    source: "contact_page",
    status: "new",
    metadata: {
      ip: record.ip ?? null,
      userAgent: record.userAgent ?? null,
    },
  });
}

export async function saveNewsletterSubscriber(
  record: NewsletterSubscriberRecord,
) {
  return upsertSupabaseRow(
    "newsletter_subscribers",
    {
      email: record.email,
      source: record.source,
      slug: record.slug ?? null,
      status: "subscribed",
      subscribed_at: new Date().toISOString(),
      metadata: {
        ip: record.ip ?? null,
        userAgent: record.userAgent ?? null,
      },
    },
    "email",
  );
}
