# XDCoderz Supabase Setup

Supabase stores operational records. Resend still sends email.

## Environment Variables

Set these in Vercel for Production and Preview:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
```

The publishable key may be used in browser code later. The service role/secret
key must stay server-side only.

## Tables

Run this once in:

```txt
Supabase -> SQL Editor -> New query
```

```sql
create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  reason text not null,
  message text not null,
  source text not null default 'contact_page',
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create index if not exists contact_leads_status_idx
  on public.contact_leads (status);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'blog',
  slug text,
  status text not null default 'subscribed',
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

create index if not exists newsletter_subscribers_subscribed_at_idx
  on public.newsletter_subscribers (subscribed_at desc);

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null default 'Anonymous builder',
  body text not null,
  status text not null default 'published' check (
    status in ('published', 'hidden')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_slug_created_at_idx
  on public.blog_comments (slug, created_at asc)
  where status = 'published';

create table if not exists public.tool_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  tool_slug text not null check (
    tool_slug in (
      'software-cost-estimator',
      'workflow-audit',
      'project-ideas-generator'
    )
  ),
  event_name text not null check (
    event_name in (
      'tool_started',
      'tool_completed',
      'contact_clicked',
      'contact_submitted'
    )
  ),
  source_path text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists tool_events_created_at_idx
  on public.tool_events (created_at desc);

create index if not exists tool_events_funnel_idx
  on public.tool_events (tool_slug, event_name, created_at desc);

create index if not exists tool_events_session_idx
  on public.tool_events (session_id, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists newsletter_subscribers_set_updated_at
  on public.newsletter_subscribers;

create trigger newsletter_subscribers_set_updated_at
before update on public.newsletter_subscribers
for each row
execute function public.set_updated_at();

alter table public.contact_leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.blog_comments enable row level security;
alter table public.tool_events enable row level security;
```

There are no public read/write policies on these tables. The website writes
through server routes using `SUPABASE_SERVICE_ROLE_KEY`, which can bypass RLS.

## Current Write Flow

- `/api/contact` writes to `contact_leads`, then sends Resend emails. Enquiries
  arriving from the Software Cost Estimator, Workflow Audit, or Project Ideas
  Generator use `source = tool:<tool-slug>` and keep the validated tool inputs
  and result summary inside the existing `metadata.attribution` JSON object.
- `/api/newsletter/subscribe` upserts `newsletter_subscribers`, then runs the
  configured newsletter provider.
- `/api/blog/comments` lets visitors post public blog comments without login.
  It validates real blog slugs, limits comment length and links, rate-limits by
  IP/post, writes to `blog_comments`, and falls back to `data/blog-comments.jsonl`
  when Supabase is not configured locally.
- `/api/tools/events` validates anonymous funnel events and writes them to
  `tool_events`. A successful attributed contact request writes the final
  `contact_submitted` event from the server.

Supabase write failures are logged server-side and do not block Resend email
delivery. This prevents the live forms from going down during setup or a brief
database issue.

Tool attribution itself requires no additional table. Funnel analytics requires
the `tool_events` table above.

## Next Tables

Add these later when the tool system starts collecting serious intent:

```txt
project_idea_runs
software_estimates
workflow_audits
```
