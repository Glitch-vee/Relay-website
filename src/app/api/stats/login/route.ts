import {
  redirectTarget,
  safeEqual,
  signStatsCookie,
  STATS_COOKIE,
  statsCookieOptions,
  statsPassword,
} from "@/lib/stats-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const expected = statsPassword();
  if (!expected) {
    return NextResponse.redirect(redirectTarget(request, "/stats?error=setup"), 303);
  }

  if (!safeEqual(password, expected)) {
    return NextResponse.redirect(redirectTarget(request, "/stats?error=password"), 303);
  }

  const response = NextResponse.redirect(redirectTarget(request, "/stats"), 303);
  response.cookies.set(STATS_COOKIE, signStatsCookie(expected), statsCookieOptions);
  response.headers.set("cache-control", "no-store");
  return response;
}
