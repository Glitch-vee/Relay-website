-- Emails collected before a Relay APK download.
-- The table stays closed: row level security is on and there are no policies.
-- record_lead is the only insert path for the publishable key.
-- lead_list returns addresses only when p_secret matches public.app_secrets.
-- Insert that row yourself. The value is not stored in this repository.
--   insert into public.app_secrets (key, value) values ('leads_secret', '<LEADS_SECRET>');

create table public.download_leads (
  id bigserial primary key,
  email text not null,
  created_at timestamptz not null default now(),
  user_agent text,
  referrer text,
  constraint download_leads_email_len check (char_length(email) between 3 and 320),
  constraint download_leads_user_agent_len check (user_agent is null or char_length(user_agent) <= 500),
  constraint download_leads_referrer_len check (referrer is null or char_length(referrer) <= 500)
);

comment on table public.download_leads is
  'Email addresses collected when someone downloads the Relay APK. No IP address is stored.';

create index download_leads_created_at_idx on public.download_leads (created_at desc);

alter table public.download_leads enable row level security;

revoke all on table public.download_leads from public;
revoke all on table public.download_leads from anon;
revoke all on table public.download_leads from authenticated;
revoke all on sequence public.download_leads_id_seq from public;
revoke all on sequence public.download_leads_id_seq from anon;
revoke all on sequence public.download_leads_id_seq from authenticated;

create table public.app_secrets (
  key text primary key,
  value text not null
);

comment on table public.app_secrets is
  'Server secrets checked inside security definer functions. Not readable through the Data API.';

alter table public.app_secrets enable row level security;

revoke all on table public.app_secrets from public;
revoke all on table public.app_secrets from anon;
revoke all on table public.app_secrets from authenticated;

create or replace function public.record_lead(
  p_email text,
  p_user_agent text,
  p_referrer text
)
returns void
language plpgsql
security definer
set search_path = public
as $function$
declare
  clean_email text;
begin
  clean_email := lower(btrim(coalesce(p_email, '')));

  if clean_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
     or char_length(clean_email) < 3
     or char_length(clean_email) > 320 then
    raise exception 'invalid email' using errcode = '22023';
  end if;

  if p_user_agent is not null and char_length(p_user_agent) > 500 then
    raise exception 'invalid user_agent' using errcode = '22023';
  end if;

  if p_referrer is not null and char_length(p_referrer) > 500 then
    raise exception 'invalid referrer' using errcode = '22023';
  end if;

  insert into public.download_leads (email, user_agent, referrer)
  values (clean_email, p_user_agent, p_referrer);
end;
$function$;

comment on function public.record_lead(text, text, text) is
  'Store one lowercase email for an APK download. Does not accept an IP address.';

revoke all on function public.record_lead(text, text, text) from public;
revoke all on function public.record_lead(text, text, text) from anon;
revoke all on function public.record_lead(text, text, text) from authenticated;
grant execute on function public.record_lead(text, text, text) to anon, authenticated;

create or replace function public.lead_list(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  expected text;
begin
  select app_secrets.value into expected
  from public.app_secrets
  where app_secrets.key = 'leads_secret';

  if expected is null or p_secret is null or expected is distinct from p_secret then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'count', (select count(*)::bigint from public.download_leads),
    'emails', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'email', recent.email,
          'created_at', recent.created_at
        )
        order by recent.created_at desc
      )
      from (
        select download_leads.email, download_leads.created_at
        from public.download_leads
        order by download_leads.created_at desc
        limit 50
      ) as recent
    ), '[]'::jsonb)
  );
end;
$function$;

comment on function public.lead_list(text) is
  'Total lead count and the latest 50 emails. Requires the leads_secret value from public.app_secrets.';

revoke all on function public.lead_list(text) from public;
revoke all on function public.lead_list(text) from anon;
revoke all on function public.lead_list(text) from authenticated;
grant execute on function public.lead_list(text) to anon;
