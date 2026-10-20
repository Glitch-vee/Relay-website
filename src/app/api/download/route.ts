import { recordDownload } from "@/lib/downloads";
import { normalizeEmail } from "@/lib/email";
import { recordLead } from "@/lib/leads";
import { RELAY_VERSION } from "@/lib/release";
import { cleanText, countryFromHeader } from "@/lib/request-fields";
import { connection } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connection();
  const target = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) target.host = host;
  const proto = request.headers.get("x-forwarded-proto");
  if (proto === "http" || proto === "https") target.protocol = `${proto}:`;
  target.pathname = "/";
  target.search = "?download=1";
  const response = NextResponse.redirect(target, 302);
  response.headers.set("cache-control", "no-store");
  return response;
}

export async function POST(request: Request) {
  await connection();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "email" }, { status: 400, headers: { "cache-control": "no-store" } });
  }

  const email = normalizeEmail(
    body && typeof body === "object" && "email" in body && typeof body.email === "string" ? body.email : "",
  );
  if (!email) {
    return Response.json({ error: "email" }, { status: 400, headers: { "cache-control": "no-store" } });
  }

  const lead = await recordLead({
    email,
    referrer: cleanText(request.headers.get("referer")),
    userAgent: cleanText(request.headers.get("user-agent")),
  });

  if (lead === "missing" || lead === "failed") {
    return Response.json({ error: "save" }, { status: 503, headers: { "cache-control": "no-store" } });
  }

  await recordDownload({
    version: RELAY_VERSION,
    country: countryFromHeader(request.headers.get("x-vercel-ip-country")),
    referrer: cleanText(request.headers.get("referer")),
    userAgent: cleanText(request.headers.get("user-agent")),
  });

  return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
