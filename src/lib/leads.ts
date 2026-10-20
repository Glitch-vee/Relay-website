import { createSupabase, supabaseConfigured } from "@/lib/supabase";
import { normalizeEmail } from "@/lib/email";

export type LeadInsert = {
  email: string;
  userAgent: string | null;
  referrer: string | null;
};

export async function recordLead(row: LeadInsert): Promise<"ok" | "invalid" | "failed" | "missing"> {
  const email = normalizeEmail(row.email);
  if (!email) return "invalid";
  if (!supabaseConfigured()) return "missing";
  const supabase = createSupabase();
  if (!supabase) return "missing";
  try {
    const { error } = await supabase.rpc("record_lead", {
      p_email: email,
      p_user_agent: row.userAgent,
      p_referrer: row.referrer,
    });
    if (error) {
      console.error("Failed to record lead");
      return "failed";
    }
    return "ok";
  } catch {
    console.error("Failed to record lead");
    return "failed";
  }
}

export type LeadRow = {
  email: string;
  createdAt: string;
};

export async function getLeadList(): Promise<
  | { error: null; count: number; emails: LeadRow[] }
  | { error: "missing-secret" | "query" }
> {
  const secret = process.env.LEADS_SECRET;
  if (!secret || !supabaseConfigured()) return { error: "missing-secret" };
  const supabase = createSupabase();
  if (!supabase) return { error: "missing-secret" };

  try {
    const { data, error } = await supabase.rpc("lead_list", { p_secret: secret });
    if (error || !data || typeof data !== "object") return { error: "query" };
    const raw = data as { count?: unknown; emails?: unknown };
    const count =
      typeof raw.count === "number"
        ? raw.count
        : typeof raw.count === "string" && /^\d+$/.test(raw.count)
          ? Number(raw.count)
          : null;
    if (count === null || !Array.isArray(raw.emails)) return { error: "query" };

    const emails: LeadRow[] = [];
    for (const item of raw.emails) {
      if (!item || typeof item !== "object") return { error: "query" };
      const row = item as { email?: unknown; created_at?: unknown };
      if (typeof row.email !== "string" || typeof row.created_at !== "string") return { error: "query" };
      emails.push({ email: row.email, createdAt: row.created_at });
    }
    return { error: null, count, emails };
  } catch {
    return { error: "query" };
  }
}
