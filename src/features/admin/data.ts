import "server-only";

import { getToolAttributionLabel, toolAttributionSlugs } from "@/features/leads/tool-attribution";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "./auth";
import type {
  ContactLead,
  NewsletterSubscriber,
  ToolEvent,
  ToolFunnel,
} from "./types";

const PAGE_SIZE = 30;
const EVENT_PAGE_SIZE = 1_000;
const MAX_DASHBOARD_EVENTS = 10_000;

export async function getAdminOverview() {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1_000).toISOString();

  const [leadCount, newLeadCount, subscriberCount, recentLeads, events] =
    await Promise.all([
      supabase.from("contact_leads").select("id", { count: "exact", head: true }),
      supabase
        .from("contact_leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("newsletter_subscribers")
        .select("id", { count: "exact", head: true })
        .eq("status", "subscribed"),
      supabase
        .from("contact_leads")
        .select("id,name,email,reason,source,status,created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      loadToolEventsSince(since),
    ]);

  assertQuery(leadCount.error, "lead count");
  assertQuery(newLeadCount.error, "new lead count");
  assertQuery(subscriberCount.error, "subscriber count");
  assertQuery(recentLeads.error, "recent leads");

  return {
    leadCount: leadCount.count ?? 0,
    newLeadCount: newLeadCount.count ?? 0,
    subscriberCount: subscriberCount.count ?? 0,
    recentLeads: (recentLeads.data ?? []) as ContactLead[],
    funnels: buildToolFunnels(events),
    eventCount: events.length,
  };
}

export async function getLeads(input: {
  status?: string;
  source?: string;
  query?: string;
  page?: number;
}) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const page = Math.max(1, input.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  let query = supabase
    .from("contact_leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (input.status && input.status !== "all") {
    query = query.eq("status", input.status);
  }

  if (input.source && input.source !== "all") {
    query = input.source === "tools"
      ? query.like("source", "tool:%")
      : query.eq("source", input.source);
  }

  const search = sanitizeSearch(input.query);

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,reason.ilike.%${search}%`,
    );
  }

  const result = await query;
  assertQuery(result.error, "lead list");

  return {
    leads: (result.data ?? []) as ContactLead[],
    count: result.count ?? 0,
    page,
    pageCount: Math.max(1, Math.ceil((result.count ?? 0) / PAGE_SIZE)),
  };
}

export async function getSubscribers(input: {
  status?: string;
  query?: string;
  page?: number;
}) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const page = Math.max(1, input.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  let query = supabase
    .from("newsletter_subscribers")
    .select("id,email,source,slug,status,subscribed_at,created_at", {
      count: "exact",
    })
    .order("subscribed_at", { ascending: false })
    .range(from, to);

  if (input.status && input.status !== "all") {
    query = query.eq("status", input.status);
  }

  const search = sanitizeSearch(input.query);

  if (search) query = query.ilike("email", `%${search}%`);

  const result = await query;
  assertQuery(result.error, "subscriber list");

  return {
    subscribers: (result.data ?? []) as NewsletterSubscriber[],
    count: result.count ?? 0,
    page,
    pageCount: Math.max(1, Math.ceil((result.count ?? 0) / PAGE_SIZE)),
  };
}

async function loadToolEventsSince(since: string) {
  const supabase = createSupabaseAdminClient();
  const events: ToolEvent[] = [];

  for (let from = 0; from < MAX_DASHBOARD_EVENTS; from += EVENT_PAGE_SIZE) {
    const result = await supabase
      .from("tool_events")
      .select("session_id,tool_slug,event_name,created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .range(from, from + EVENT_PAGE_SIZE - 1);

    assertQuery(result.error, "tool events");
    const page = (result.data ?? []) as ToolEvent[];
    events.push(...page);

    if (page.length < EVENT_PAGE_SIZE) break;
  }

  return events;
}

function buildToolFunnels(events: ToolEvent[]): ToolFunnel[] {
  return toolAttributionSlugs.map((slug) => {
    const sessions = {
      tool_started: new Set<string>(),
      tool_completed: new Set<string>(),
      contact_clicked: new Set<string>(),
      contact_submitted: new Set<string>(),
    };

    events
      .filter((event) => event.tool_slug === slug)
      .forEach((event) => {
        if (event.event_name in sessions) {
          sessions[event.event_name as keyof typeof sessions].add(event.session_id);
        }
      });

    const started = sessions.tool_started.size;
    const completed = sessions.tool_completed.size;
    const submitted = sessions.contact_submitted.size;

    return {
      slug,
      label: getToolAttributionLabel(slug),
      started,
      completed,
      clicked: sessions.contact_clicked.size,
      submitted,
      completionRate: percentage(completed, started),
      conversionRate: percentage(submitted, started),
    };
  });
}

function percentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

function sanitizeSearch(value: string | undefined) {
  return (value ?? "").trim().replace(/[,%()]/g, "").slice(0, 80);
}

function assertQuery(error: { message: string } | null, operation: string) {
  if (error) throw new Error(`Supabase admin ${operation} failed: ${error.message}`);
}
