import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

const SESSION_SECRET = process.env.SESSION_SECRET || "change-me-in-production";
const MAX_AGE = 604800; // 7 days

export function signSession(username: string): string {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const payload = `${timestamp}:${username}`;
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}:${signature}`;
}

export function verifySession(token: string): { valid: boolean; username?: string } {
  // Format: timestamp:username:signature
  const firstColon = token.indexOf(":");
  if (firstColon === -1) return { valid: false };

  const lastColon = token.lastIndexOf(":");
  if (lastColon === firstColon) return { valid: false };

  const timestamp = token.slice(0, firstColon);
  const username = token.slice(firstColon + 1, lastColon);
  const signature = token.slice(lastColon + 1);

  if (!timestamp || !username || !signature) return { valid: false };

  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return { valid: false };

  // Check expiry
  if (Date.now() / 1000 - ts > MAX_AGE) return { valid: false };

  // Verify signature
  const payload = `${timestamp}:${username}`;
  const expected = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return { valid: false };
    const valid = timingSafeEqual(sigBuf, expBuf);
    return valid ? { valid: true, username } : { valid: false };
  } catch {
    return { valid: false };
  }
}

export function getUsernameFromRequest(request: NextRequest): string | null {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return null;
  const result = verifySession(cookie);
  return result.valid ? result.username ?? null : null;
}

export const COOKIE_NAME = "imoveis_session";
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: MAX_AGE,
  path: "/",
};
