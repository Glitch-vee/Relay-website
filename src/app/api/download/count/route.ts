import { getDownloadTotal } from "@/lib/downloads";
import { supabaseConfigured } from "@/lib/supabase";
import { connection } from "next/server";

export async function GET() {
  await connection();
  const total = await getDownloadTotal();

  if (total === null && supabaseConfigured()) {
    return Response.json({ total: null }, { status: 503, headers: { "cache-control": "no-store" } });
  }

  return Response.json(
    { total: total ?? 0 },
    { headers: { "cache-control": "no-store" } },
  );
}
