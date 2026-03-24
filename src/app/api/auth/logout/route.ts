import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

function clearCookieResponse(response: NextResponse): NextResponse {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export async function POST() {
  return clearCookieResponse(NextResponse.json({ success: true }));
}

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  return clearCookieResponse(NextResponse.redirect(loginUrl));
}
