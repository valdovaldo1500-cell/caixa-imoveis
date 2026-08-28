import { NextRequest, NextResponse } from "next/server";
import { COOKIE_ASSINANTE } from "@/lib/assinatura";

function limparCookie(response: NextResponse): NextResponse {
  response.cookies.set(COOKIE_ASSINANTE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export async function POST() {
  return limparCookie(NextResponse.json({ success: true }));
}

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const url = `${proto}://${host}/entrar`;
  return limparCookie(NextResponse.redirect(url));
}
