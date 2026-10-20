import { LoginForm } from "@/app/stats/login-form";
import { Button } from "@/components/ui/button";
import { getDownloadStats } from "@/lib/downloads";
import { getLeadList } from "@/lib/leads";
import { STATS_COOKIE, statsCookieMatches, statsPassword } from "@/lib/stats-auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";

type StatsSearch = { error?: string };

export const metadata: Metadata = {
  title: "Stats",
  robots: { index: false, follow: false },
};

export default function StatsPage({ searchParams }: { searchParams: Promise<StatsSearch> }) {
  return (
    <div className="flex-1 bg-[#f3f3f5] text-[#1d1d1f] [color-scheme:light]">
      <Suspense fallback={<p className="site-wrap py-20 text-[#6e6e73]">Loading…</p>}>
        <StatsBody searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function StatsBody({ searchParams }: { searchParams: Promise<StatsSearch> }) {
  await connection();
  const params = await searchParams;
  const password = statsPassword();

  if (!password) {
    return (
      <div className="site-wrap max-w-md py-20">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Stats</h1>
        <p className="mt-3 text-[#424245]">Stats are not set up on this server yet.</p>
      </div>
    );
  }

  const cookieStore = await cookies();
  const authed = statsCookieMatches(cookieStore.get(STATS_COOKIE)?.value, password);
  if (!authed) {
    return (
      <div className="site-wrap max-w-md py-16">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Stats</h1>
        <p className="mt-3 text-[#424245]">This page is private. Enter the password to see downloads.</p>
        <LoginForm error={params.error} />
      </div>
    );
  }

  const [stats, leads] = await Promise.all([getDownloadStats(), getLeadList()]);

  return (
    <div className="site-wrap py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6e6e73]">Private</p>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Downloads</h1>
        </div>
        <form action="/api/stats/logout" method="post">
          <Button type="submit" variant="outline" className="h-10 rounded-full px-4">
            Lock
          </Button>
        </form>
      </div>

      {stats.error ? (
        <p className="mt-8 max-w-lg text-[#424245]" role="alert">
          {stats.error === "missing-env"
            ? "Supabase is not configured, so there is nothing to show."
            : "Could not load downloads. Check the Supabase URL and publishable key."}
        </p>
      ) : (
        <StatsView stats={stats} />
      )}
      <LeadsView leads={leads} />
    </div>
  );
}

function LeadsView({
  leads,
}: {
  leads: Awaited<ReturnType<typeof getLeadList>>;
}) {
  return (
    <section className="mt-4 rounded-3xl bg-white p-6">
      <h2 className="text-lg font-semibold tracking-[-0.02em]">Emails</h2>
      {leads.error === "missing-secret" ? (
        <p className="mt-3 text-[#424245]">
          Set LEADS_SECRET on the server, and insert the same value in app_secrets under the key leads_secret.
        </p>
      ) : null}
      {leads.error === "query" ? (
        <p className="mt-3 text-[#424245]" role="alert">
          Could not load emails. Check that the leads migration is applied and LEADS_SECRET matches the
          leads_secret row.
        </p>
      ) : null}
      {leads.error === null ? (
        <>
          <p className="mt-1 text-sm text-[#6e6e73]">
            {leads.count.toLocaleString("en-US")} {leads.count === 1 ? "address" : "addresses"}
          </p>
          {leads.emails.length === 0 ? (
            <p className="mt-6 text-[#424245]">No emails yet.</p>
          ) : (
            <ol className="mt-4 divide-y divide-black/5">
              {leads.emails.map((lead) => (
                <li
                  key={`${lead.createdAt}-${lead.email}`}
                  className="flex items-center justify-between gap-4 py-3 text-[15px]"
                >
                  <span className="text-[#1d1d1f]">{lead.email}</span>
                  <time className="shrink-0 text-sm text-[#6e6e73]" dateTime={lead.createdAt}>
                    {lead.createdAt.slice(0, 16).replace("T", " ")}
                  </time>
                </li>
              ))}
            </ol>
          )}
        </>
      ) : null}
    </section>
  );
}

function StatsView({
  stats,
}: {
  stats: {
    total: number;
    last30: number;
    days: { date: string; count: number }[];
    countries: { code: string; name: string; count: number }[];
  };
}) {
  const max = Math.max(1, ...stats.days.map((day) => day.count));

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
      <section className="rounded-3xl bg-white p-6">
        <p className="text-sm text-[#6e6e73]">Total</p>
        <p className="mt-1 text-5xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">
          {stats.total.toLocaleString("en-US")}
        </p>
        <p className="mt-4 text-sm text-[#6e6e73]">
          {stats.last30.toLocaleString("en-US")} in the last 30 days
        </p>
        <p className="mt-6 text-xs leading-relaxed text-[#6e6e73]">
          Version, country, time, referrer, and browser. No IP address.
        </p>
      </section>

      <section className="rounded-3xl bg-white p-6">
        <h2 className="text-lg font-semibold tracking-[-0.02em]">Last 30 days</h2>
        <p className="mt-1 text-sm text-[#6e6e73]">Days are in UTC.</p>
        {stats.last30 === 0 ? (
          <p className="mt-8 text-[#424245]">No downloads yet. When someone taps Download, it will show up here.</p>
        ) : (
          <>
            <div className="mt-6 flex h-36 items-end gap-[3px]" aria-hidden="true">
              {stats.days.map((day) => (
                <div key={day.date} className="flex h-full flex-1 items-end" title={`${day.date}: ${day.count}`}>
                  <div
                    className="w-full rounded-sm bg-[#007aff]"
                    style={{
                      height: `${day.count === 0 ? 3 : Math.max(8, (day.count / max) * 100)}%`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-[#6e6e73]">
              <span>{formatDay(stats.days[0]?.date)}</span>
              <span>{formatDay(stats.days.at(-1)?.date)}</span>
            </div>
            <table className="sr-only">
              <caption>Downloads per day for the last 30 days</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Downloads</th>
                </tr>
              </thead>
              <tbody>
                {stats.days.map((day) => (
                  <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>{day.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>

      <section className="rounded-3xl bg-white p-6 lg:col-span-2">
        <h2 className="text-lg font-semibold tracking-[-0.02em]">Countries</h2>
        <p className="mt-1 text-sm text-[#6e6e73]">From the last 30 days.</p>
        {stats.countries.length === 0 ? (
          <p className="mt-6 text-[#424245]">No countries yet.</p>
        ) : (
          <ol className="mt-4 divide-y divide-black/5">
            {stats.countries.map((country) => (
              <li key={country.code} className="flex items-center justify-between py-3 text-[15px]">
                <span className="text-[#1d1d1f]">{country.name}</span>
                <span className="tabular-nums text-[#6e6e73]">{country.count.toLocaleString("en-US")}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function formatDay(iso: string | undefined): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
