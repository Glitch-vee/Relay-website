const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lowercased email, or null when the address is missing or not a real shape. */
export function normalizeEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 320) return null;
  if (!EMAIL_PATTERN.test(email)) return null;
  return email;
}
