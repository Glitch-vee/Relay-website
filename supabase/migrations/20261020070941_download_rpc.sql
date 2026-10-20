-- The downloads table stays closed: row level security on, no policies, and no
-- privileges for anon or authenticated. These functions are the only Data API
-- the publishable key may call. They are security definer so they run as the
-- owner (the migration role, which owns the table and therefore bypasses row
-- level security). search_path is empty and every relation is schema-qualified.

create or replace function public.record_download(
  version text,
  country text,
  referrer text,
  user_agent text
)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if record_download.version is null
     or char_length(record_download.version) < 1
     or char_length(record_download.version) > 32 then
    raise exception 'invalid version' using errcode = '22023';
  end if;

  if record_download.country is not null
     and record_download.country !~ '^[A-Z]{2}$' then
    raise exception 'invalid country' using errcode = '22023';
  end if;

  if record_download.referrer is not null
     and char_length(record_download.referrer) > 500 then
    raise exception 'invalid referrer' using errcode = '22023';
  end if;

  if record_download.user_agent is not null
     and char_length(record_download.user_agent) > 500 then
    raise exception 'invalid user_agent' using errcode = '22023';
  end if;

  insert into public.downloads (version, country, referrer, user_agent)
  values (
    record_download.version,
    record_download.country,
    record_download.referrer,
    record_download.user_agent
  );
end;
$function$;

comment on function public.record_download(text, text, text, text) is
  'Insert one anonymous download after the same checks as public.downloads. Does not accept an IP address.';

create or replace function public.download_count()
returns bigint
language sql
stable
security definer
set search_path = ''
as $function$
  select count(*) from public.downloads;
$function$;

comment on function public.download_count() is
  'Total rows in public.downloads. Returns a count only.';

create or replace function public.download_stats()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $function$
  with bounds as (
    select (timezone('utc', now()))::date as today
  ),
  window_days as (
    select (bounds.today - offs)::date as day
    from bounds
    cross join generate_series(0, 29) as offs
  ),
  daily as (
    select
      window_days.day,
      count(public.downloads.id)::bigint as count
    from window_days
    left join public.downloads
      on (timezone('utc', public.downloads.created_at))::date = window_days.day
    group by window_days.day
  ),
  country_totals as (
    select
      case
        when public.downloads.country ~ '^[A-Z]{2}$' then public.downloads.country
        else 'ZZ'
      end as code,
      count(*)::bigint as count
    from public.downloads
    cross join bounds
    where (timezone('utc', public.downloads.created_at))::date
      between (bounds.today - 29) and bounds.today
    group by 1
  )
  select jsonb_build_object(
    'days',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'date', to_char(daily.day, 'YYYY-MM-DD'),
            'count', daily.count
          )
          order by daily.day
        )
        from daily
      ),
      '[]'::jsonb
    ),
    'countries',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'code', country_totals.code,
            'count', country_totals.count
          )
          order by country_totals.count desc, country_totals.code
        )
        from country_totals
      ),
      '[]'::jsonb
    )
  );
$function$;

comment on function public.download_stats() is
  'Daily download counts for the last 30 UTC days, including zeros, and country totals for that window. Aggregates only.';

revoke all on table public.downloads from public;
revoke all on table public.downloads from anon;
revoke all on table public.downloads from authenticated;

revoke all on function public.record_download(text, text, text, text) from public;
revoke all on function public.record_download(text, text, text, text) from anon;
revoke all on function public.record_download(text, text, text, text) from authenticated;
grant execute on function public.record_download(text, text, text, text) to anon;

revoke all on function public.download_count() from public;
revoke all on function public.download_count() from anon;
revoke all on function public.download_count() from authenticated;
grant execute on function public.download_count() to anon;

revoke all on function public.download_stats() from public;
revoke all on function public.download_stats() from anon;
revoke all on function public.download_stats() from authenticated;
grant execute on function public.download_stats() to anon;
