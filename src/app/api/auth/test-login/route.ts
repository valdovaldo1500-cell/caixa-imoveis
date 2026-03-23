import { NextResponse } from "next/server";
import { signSession, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Test login endpoint — bypasses hCaptcha for automated testing.
 * Requires PIPELINE_TOKEN as Bearer auth.
 * POST /api/auth/test-login { username }
 */
export async function POST(request: Request) {
  const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN;
  const auth = request.headers.get("authorization");

  if (!PIPELINE_TOKEN || auth !== `Bearer ${PIPELINE_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { username } = body;

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const [user] = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.username, String(username).toLowerCase()))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const token = signSession(user.username);
  const response = NextResponse.json({ success: true, username: user.username });
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);

  return response;
}
