import { RELAY_VERSION } from "@/lib/release";
import { countryName } from "@/lib/stats";
import { createSupabase, supabaseConfigured } from "@/lib/supabase";

export type DownloadInsert = {
  version: string;
  country: string | null;
  referrer: string | null;
  userAgent: string | null;
};

export async function recordDownload(row: DownloadInsert): Promise<void> {
  const supabase = createSupabase();
  if (!supabase) return;
  try {
    const { error } = await supabase.rpc("record_download", {
      version: row.version,
      country: row.country,
      referrer: row.referrer,
      user_agent: row.userAgent,
    });
    if (error) console.error("Failed to record download");
  } catch {
    console.error("Failed to record download");
  }
}

function asCount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return Math.trunc(value);
  }
  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) ? parsed : null;
  }
  return null;
}

/** Total downloads, or null when Supabase is not configured or the query fails. */
export async function getDownloadTotal(): Promise<number | null> {
  if (!supabaseConfigured()) return null;
  const supabase = createSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("download_count");
    if (error) return null;
    return asCount(data);
  } catch {
    return null;
  }
}

type DayCount = { date: string; count: number };
type CountryCount = { code: string; name: string; count: number };

function parseStats(data: unknown): { days: DayCount[]; countries: CountryCount[] } | null {
  if (!data || typeof data !== "object") return null;
  const raw = data as { days?: unknown; countries?: unknown };
  if (!Array.isArray(raw.days) || !Array.isArray(raw.countries)) return null;

  const days: DayCount[] = [];
  for (const item of raw.days) {
    if (!item || typeof item !== "object") return null;
    const day = item as { date?: unknown; count?: unknown };
    const count = asCount(day.count);
    if (typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || count === null) {
      return null;
    }
    days.push({ date: day.date, count });
  }

  const countries: CountryCount[] = [];
  for (const item of raw.countries) {
    if (!item || typeof item !== "object") return null;
    const country = item as { code?: unknown; count?: unknown };
    const count = asCount(country.count);
    if (typeof country.code !== "string" || !/^[A-Z]{2}$/.test(country.code) || count === null) {
      return null;
    }
    countries.push({ code: country.code, name: countryName(country.code), count });
  }

  countries.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  return { days, countries };
}

export async function getDownloadStats() {
  const supabase = createSupabase();
  if (!supabase) return { error: "missing-env" as const };

  try {
    const [totalResult, statsResult] = await Promise.all([
      supabase.rpc("download_count"),
      supabase.rpc("download_stats"),
    ]);

    if (totalResult.error || statsResult.error) {
      return { error: "query" as const };
    }

    const total = asCount(totalResult.data);
    const summary = parseStats(statsResult.data);
    if (total === null || !summary) return { error: "query" as const };

    const last30 = summary.days.reduce((sum, day) => sum + day.count, 0);
    return {
      error: null,
      total,
      version: RELAY_VERSION,
      last30,
      ...summary,
    };
  } catch {
    return { error: "query" as const };
  }
}
