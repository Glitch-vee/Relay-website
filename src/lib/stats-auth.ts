import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const STATS_COOKIE = "relay_stats";

export function statsPassword(): string | null {
  const value = process.env.STATS_PASSWORD;
  if (!value) return null;
  return value;
}

export function signStatsCookie(password: string): string {
  return createHmac("sha256", password).update("relay-stats-v1").digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

export function statsCookieMatches(value: string | undefined, password: string): boolean {
  if (!value) return false;
  return safeEqual(value, signStatsCookie(password));
}

export function redirectTarget(request: NextRequest, path: string): URL {
  const url = request.nextUrl.clone();
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) url.host = host;
  const proto = request.headers.get("x-forwarded-proto");
  if (proto === "http" || proto === "https") url.protocol = `${proto}:`;
  const [pathname, search = ""] = path.split("?");
  url.pathname = pathname;
  url.search = search ? `?${search}` : "";
  return url;
}

export const statsCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};
