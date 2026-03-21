import { createHmac, timingSafeEqual } from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "change-me-in-production";
const MAX_AGE = 604800; // 7 days

export function signSession(): string {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}:${signature}`;
}

export function verifySession(token: string): boolean {
  const parts = token.split(":");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  // Check expiry
  if (Date.now() / 1000 - ts > MAX_AGE) return false;

  // Verify signature
  const expected = createHmac("sha256", SESSION_SECRET)
    .update(timestamp)
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export const COOKIE_NAME = "imoveis_session";
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: MAX_AGE,
  path: "/",
};
