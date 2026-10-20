import { redirectTarget, STATS_COOKIE, statsCookieOptions } from "@/lib/stats-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(redirectTarget(request, "/stats"), 303);
  response.cookies.set(STATS_COOKIE, "", { ...statsCookieOptions, maxAge: 0 });
  response.headers.set("cache-control", "no-store");
  return response;
}
