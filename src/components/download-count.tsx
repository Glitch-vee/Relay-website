import { getDownloadTotal } from "@/lib/downloads";
import { connection } from "next/server";

export async function DownloadCount() {
  await connection();
  const total = await getDownloadTotal();
  if (total === null || total < 10) return null;

  return (
    <p className="text-xs text-white/50">
      Downloaded {total.toLocaleString("en-US")} times
    </p>
  );
}
