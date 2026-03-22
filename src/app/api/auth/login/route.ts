import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { signSession, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const HCAPTCHA_SECRET =
  process.env.HCAPTCHA_SECRET || "0x0000000000000000000000000000000000000000";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password, hcaptchaToken } = body;

  if (!username || !password || !hcaptchaToken) {
    return NextResponse.json(
      { error: "Usuário, senha e captcha são obrigatórios" },
      { status: 400 }
    );
  }

  // Verify hCaptcha
  const hcaptchaRes = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: HCAPTCHA_SECRET,
      response: hcaptchaToken,
    }),
  });
  const hcaptchaData = await hcaptchaRes.json();

  if (!hcaptchaData.success) {
    return NextResponse.json(
      { error: "Captcha inválido" },
      { status: 403 }
    );
  }

  // Look up user
  const [user] = await db
    .select({ id: users.id, username: users.username, passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.username, String(username).toLowerCase()))
    .limit(1);

  if (!user) {
    return NextResponse.json(
      { error: "Usuário ou senha incorretos" },
      { status: 401 }
    );
  }

  // Verify password (SHA-256)
  const hash = createHash("sha256").update(String(password)).digest("hex");
  if (hash !== user.passwordHash) {
    return NextResponse.json(
      { error: "Usuário ou senha incorretos" },
      { status: 401 }
    );
  }

  // Create session
  const token = signSession(user.username);
  const response = NextResponse.json({ success: true, username: user.username });
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);

  return response;
}
