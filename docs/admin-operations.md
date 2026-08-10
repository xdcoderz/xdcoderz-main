# XDCoderz Admin Operations

This document explains how to use the XDCoderz admin area and how to extend the Open Product Lab from the dashboard.

## Admin Access

Admin routes are protected by Supabase Auth and the `ADMIN_EMAILS` environment variable.

Production URLs:

- `/admin/login` - admin sign in
- `/admin` - dashboard overview
- `/admin/leads` - contact leads
- `/admin/subscribers` - newsletter subscribers
- `/admin/lab` - Open Product Lab project management

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=you@example.com
```

`ADMIN_EMAILS` can contain multiple comma-separated emails.

## How Sign In Works

1. Create the admin user in Supabase Auth.
2. Add the same email to `ADMIN_EMAILS` in Vercel.
3. Redeploy after changing environment variables.
4. Visit `/admin/login`.
5. Sign in with the Supabase Auth email and password.

The code checks both Supabase Auth and `ADMIN_EMAILS`. A valid Supabase user cannot enter admin unless the email is explicitly allowed.

## Current Admin Capabilities

### Overview

`/admin` shows:

- Total leads
- New leads
- Active subscribers
- 30-day tool events
- Tool funnel performance
- Recent enquiries

### Leads

`/admin/leads` lets you review contact submissions and update lead status.

Supported statuses:

- `new`
- `contacted`
- `qualified`
- `won`
- `closed`

### Subscribers

`/admin/subscribers` lists newsletter subscribers stored in Supabase.

### Open Product Lab

`/admin/lab` lets you add public GitHub repositories to the Lab by submitting a GitHub repo URL.

Example:

```txt
https://github.com/xdcoderz/aegis-eye
```

When submitted, the admin action:

1. Validates that the URL is a GitHub repository URL.
2. Reads public repository metadata from the GitHub API.
3. Creates a normalized `lab_projects` row in Supabase.
4. Revalidates `/` and `/lab`.
5. Shows the project in the public Open Product Lab.

The editorial projects in `src/content/projects.ts` still exist for priority projects. Admin-managed projects are merged after those records and duplicates are ignored by repo name.

## Lab Projects Table Setup

Run this SQL in Supabase SQL Editor before using `/admin/lab`:

```sql
create table if not exists public.lab_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  repo text not null unique,
  status text not null default 'active',
  maturity text not null default 'Open-source build',
  category text not null default 'Open Source',
  license text not null default 'Open source',
  description text not null,
  business_value text not null,
  tags text[] not null default '{}',
  github_url text not null,
  featured boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.lab_projects enable row level security;

drop policy if exists "No public lab project access" on public.lab_projects;
create policy "No public lab project access"
on public.lab_projects
for all
using (false)
with check (false);
```

The website uses the Supabase service role key on the server to read and write this table. Public visitors never get direct table access.

## GitHub Token

`GITHUB_TOKEN` is optional but recommended.

Without it, GitHub API calls can hit low anonymous rate limits. With it, repo metadata and Lab stats are more reliable.

Use a fine-grained GitHub token with read-only access to public repository metadata.

Add it in Vercel:

```env
GITHUB_TOKEN=
```

## Adding A New Lab Project

1. Go to `/admin/lab`.
2. Paste a GitHub repository URL.
3. Click `Add to Lab`.
4. Open `/lab` and confirm the project appears.

For stronger public positioning, edit the generated row in Supabase later:

- `description`
- `business_value`
- `category`
- `tags`
- `maturity`
- `sort_order`

## Priority Projects

Keep strategic projects in `src/content/projects.ts`.

Current priority projects:

- `xdcoderz/aegis-eye`
- `xdcoderz/aegis-command`

Admin-managed projects are best for quick additions. Code-managed editorial projects are best when the project needs polished copy, custom ordering, or launch positioning.
