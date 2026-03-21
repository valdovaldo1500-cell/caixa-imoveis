import { NextResponse } from "next/server";
import { signSession, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth";

const DASHBOARD_PASSWORD =
  process.env.DASHBOARD_PASSWORD || "change-me";
const HCAPTCHA_SECRET =
  process.env.HCAPTCHA_SECRET || "0x0000000000000000000000000000000000000000";

export async function POST(request: Request) {
  const body = await request.json();
  const { password, hcaptchaToken } = body;

  if (!password || !hcaptchaToken) {
    return NextResponse.json(
      { error: "Senha e captcha são obrigatórios" },
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

  // Verify password
  if (password !== DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "Senha incorreta" },
      { status: 401 }
    );
  }

  // Create session
  const token = signSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);

  return response;
}
