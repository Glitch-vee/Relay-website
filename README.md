# Relay

Marketing and download site for Relay, an Android app by Alvee Alam in Sylhet, Bangladesh.

Relay forwards the texts and notifications you choose, like a bank text or a bKash alert, to Grok. Version 3.0 is free, Android only, and installs as an APK.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dev server in this project is usually started on port 43123:

```bash
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Environment variables

Set these in `.env.local` for local development and in the Vercel project for production. Do not commit real values. `.env*` is gitignored except this example.

| Variable | Required | Scope | What it does |
| --- | --- | --- | --- |
| `SUPABASE_URL` | Yes, for counting | Server | Supabase project URL. |
| `SUPABASE_PUBLISHABLE_KEY` | Yes, for counting | Server only | Publishable (anon) key. The server uses it to call the download functions. Never use a `NEXT_PUBLIC_` prefix. |
| `STATS_PASSWORD` | Yes, for `/stats` | Server | Password for the private stats page. Stored only as an HMAC in an httpOnly cookie. |
| `LEADS_SECRET` | Yes, to list emails | Server only | Passed to `lead_list`. Must match the `app_secrets` row whose key is `leads_secret`. |

Vercel also provides `VERCEL_URL` and `VERCEL_PROJECT_PRODUCTION_URL` automatically. The site uses those for Open Graph URLs. You do not need to set them.

The APK is `public/Relay-v3.0.apk`. Download asks for an email, saves it, records the download, then sends that file. If Supabase is missing or the save fails, the file is not sent. The hero hides the download count until it is at least 10. `/stats` explains when counting is not set up.

## Download counting

`POST /api/download` saves the email with `record_lead`, records one download, and returns `{ "ok": true }`. The browser then downloads `/Relay-v3.0.apk` and opens `/guide`. `GET /api/download` only opens the email form. Prefetch requests are not counted.

The row goes in the `downloads` table:

| Column | Source |
| --- | --- |
| `id` | Generated UUID |
| `created_at` | Database time |
| `version` | `3.0` |
| `country` | Vercel header `x-vercel-ip-country`, only if it is a two-letter code |
| `referrer` | `Referer` header, trimmed, at most 500 characters |
| `user_agent` | `User-Agent` header, trimmed, at most 500 characters |

IP addresses are not read and there is no column for them.

`GET /api/download/count` returns JSON and nothing else:

```json
{ "total": 128 }
```

`total` is `null` with status 503 when Supabase is configured but the query fails. The home page reads that total and shows “Downloaded N times” only when N is 10 or more.

## Stats

`/stats` is not linked from the main navigation. The footer has a quiet Stats link. The page asks for `STATS_PASSWORD`, then sets an httpOnly cookie. It shows the total, a bar for each of the last 30 UTC days, countries from those 30 days, and the email count plus the latest 50 addresses.

## Database

Apply both files in `supabase/migrations`, in filename order, before counting will succeed. In the Supabase SQL editor, paste each file and run it. With the Supabase CLI, from this directory:

```bash
supabase db push
```


`20261020061800_create_downloads.sql` creates `public.downloads`, enables row level security, and adds no policies. `anon` and `authenticated` have no privileges on the table, so the Data API cannot read or write it directly.

`20261020070941_download_rpc.sql` adds three `security definer` functions. Each sets `search_path` to empty and schema-qualifies `public.downloads`. Execute is revoked from `public`, `anon`, and `authenticated`, then granted to `anon` only:

- `record_download(version, country, referrer, user_agent)` inserts one row after the same checks as the table. It does not accept an IP address.
- `download_count()` returns the total number of downloads.
- `download_stats()` returns daily counts for the last 30 UTC days, including days with zero, and country totals for that window. It returns aggregates only.

`20261020081221_download_leads.sql` creates `public.download_leads` and `public.app_secrets`. Both have row level security and no policies. `record_lead(p_email, p_user_agent, p_referrer)` checks the email, stores it in lowercase, and is granted to `anon` and `authenticated`. `lead_list(p_secret)` returns the count and the latest 50 emails only when `p_secret` matches `app_secrets.key = 'leads_secret'`. Execute on `lead_list` is granted to `anon` only. Insert that secret row yourself:

```sql
insert into public.app_secrets (key, value) values ('leads_secret', '<same value as LEADS_SECRET>');
```

The website calls those functions from the server with `SUPABASE_PUBLISHABLE_KEY`. The key is not sent to the browser. `/stats` is still gated by `STATS_PASSWORD`.

## Setup guide

The home page is one screen (headline, phone, Download) and one setup panel below it with four short tabs: Install, Connect, Keep running, Help. `/guide` redirects to `/#setup`, and the download dialog links there once the APK starts. The steps live in `src/components/setup-panel.tsx`.

## Deploy on Vercel

This is a Next.js App Router app. Import the repository in Vercel and add the environment variables above. No `vercel.json` and no extra build settings are required. The framework preset is Next.js.

`@vercel/analytics` is included in the root layout. Traffic shows up in the Vercel project after deploy. It does not record message content.

## App screens

The phones on the site are dark only. `home`, `connection`, `apps` and `phone-setup` in `public/screens` are real Relay 3.0 captures with the status bar, nav bar and bot address blacked out. The three add-connection steps are drawn in code (`src/components/phones/screens.tsx`) from the Android app's own layout. All phones render through `src/components/phones/phone.tsx`.

To swap a screenshot, replace the `.webp` (900 x 2000, status bar and nav bar painted black) and keep the file name.

The logo is `public/logo.png`.

## Creator

Alvee's name, tagline and every profile link live in `src/lib/creator.ts` and `src/components/social-icons.tsx`. They show in the footer and on the download success screen. The photo is `public/alvee.jpg` (from his LinkedIn profile, shown in a green ring). Replace the file to change it. If it is ever missing, a monogram shows instead.
