-- Anonymous download events for the Relay APK.
-- No IP address is stored. Country is the Vercel geo country code only.
-- Row level security is on, and there are no policies for anon or authenticated.
-- The service role bypasses RLS and is the only intended reader and writer.

create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  version text not null check (char_length(version) between 1 and 32),
  country text check (country is null or country ~ '^[A-Z]{2}$'),
  referrer text check (referrer is null or char_length(referrer) <= 500),
  user_agent text check (user_agent is null or char_length(user_agent) <= 500)
);

comment on table public.downloads is
  'Anonymous Relay APK download events. Columns are id, created_at, version, country, referrer, and user_agent. IP addresses are not stored.';

comment on column public.downloads.country is
  'ISO 3166-1 alpha-2 country from the Vercel x-vercel-ip-country header. Not an IP address.';

create index downloads_created_at_idx on public.downloads (created_at desc);

alter table public.downloads enable row level security;

-- Intentionally no policies. With RLS enabled and no policies, anon and
-- authenticated cannot select, insert, update, or delete. The service role
-- bypasses RLS and is used only by the website server.

revoke all on table public.downloads from public;
revoke all on table public.downloads from anon;
revoke all on table public.downloads from authenticated;
grant select, insert, update, delete on table public.downloads to service_role;
