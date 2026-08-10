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
