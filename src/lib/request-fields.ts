const TEXT_LIMIT = 500;

export function cleanText(value: string | null, limit = TEXT_LIMIT): string | null {
  if (!value) return null;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!cleaned) return null;
  return cleaned.slice(0, limit);
}

/** ISO country from Vercel's geo header. Anything else is dropped. */
export function countryFromHeader(value: string | null): string | null {
  if (!value) return null;
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

export function isPrefetch(request: Request): boolean {
  const purpose = `${request.headers.get("purpose") ?? ""} ${request.headers.get("sec-purpose") ?? ""}`.toLowerCase();
  if (purpose.includes("prefetch")) return true;
  if (request.headers.get("next-router-prefetch") === "1") return true;
  if (request.headers.get("x-middleware-prefetch") === "1") return true;
  return false;
}
