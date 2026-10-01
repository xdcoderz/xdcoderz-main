-- Run once in the existing Supabase project's SQL Editor.
create table if not exists public.homepage_featured (
  slot text primary key check (slot in ('draft', 'published')),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.homepage_featured enable row level security;
revoke all on public.homepage_featured from anon, authenticated;
grant select, insert, update, delete on public.homepage_featured to service_role;
-- No public read policy: server renders only the eligible published content.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('featured-images', 'featured-images', true, 2097152, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = excluded.public,
file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
-- No client upload policy. Uploads pass through the authenticated server action.

