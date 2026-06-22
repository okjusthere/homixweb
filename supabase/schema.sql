-- Homix — agent self-edit schema.
-- Run once in the Supabase SQL editor after creating your project.

create table if not exists public.agents (
  id text primary key,
  slug text unique not null,
  name text not null,
  title text not null default 'Licensed Real Estate Salesperson',
  photo_url text,
  phone text,
  email text,
  bio text,
  specialties text[] not null default '{}',
  social jsonb not null default '{}'::jsonb,
  license_number text,
  profile_url text,
  edit_token text unique not null,
  sort int not null default 100,
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Row Level Security: anyone may READ visible agents; nobody may write through
-- the public/anon key. All writes go through the server (service role key),
-- which bypasses RLS and is gated by each advisor's secret edit token.
alter table public.agents enable row level security;

drop policy if exists "agents public read" on public.agents;
create policy "agents public read"
  on public.agents for select
  using (visible = true);

-- Public bucket for advisor headshots.
insert into storage.buckets (id, name, public)
values ('agent-photos', 'agent-photos', true)
on conflict (id) do nothing;

drop policy if exists "agent photos public read" on storage.objects;
create policy "agent photos public read"
  on storage.objects for select
  using (bucket_id = 'agent-photos');

-- Website inquiries submitted through the public contact forms. No public read
-- or write policy is created; inserts happen through the server-side service
-- role after validation, and the team can review rows in Supabase.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text not null,
  message text,
  consent boolean not null default false,
  source text not null default 'website',
  page_path text,
  locale text,
  status text not null default 'received',
  ip_address text,
  user_agent text,
  referrer text,
  email_sent_at timestamptz,
  email_error text
);

alter table public.inquiries enable row level security;

-- Agent-portal training videos: Cloudflare Stream UIDs + metadata. Managed in
-- /admin, read server-side for the gated /portal/training. RLS is on with no
-- policy, so the anon key sees nothing; the server (service role) bypasses it.
create table if not exists public.training_videos (
  id text primary key,
  title text not null,
  summary text,
  category text not null default 'Training',
  cloudflare_uid text,
  duration text,
  level text,
  sort int not null default 100,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.training_videos enable row level security;

-- Agent-portal resource library: links to SOPs, scripts, templates, assets.
create table if not exists public.resources (
  id text primary key,
  title text not null,
  description text,
  category text not null default 'Resources',
  url text not null,
  sort int not null default 100,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.resources enable row level security;

-- Private bucket for resource files uploaded later (no public read policy; the
-- portal serves them via short-lived signed URLs once the agent is logged in).
insert into storage.buckets (id, name, public)
values ('portal-files', 'portal-files', false)
on conflict (id) do nothing;
