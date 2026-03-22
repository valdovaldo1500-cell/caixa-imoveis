import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API routes
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth/")
  ) {
    return NextResponse.next();
  }

  // Allow API calls with pipeline token (for automation/cron)
  const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN;
  const authHeader = request.headers.get("authorization");
  if (
    PIPELINE_TOKEN &&
    authHeader === `Bearer ${PIPELINE_TOKEN}` &&
    (pathname.startsWith("/api/pipeline/") || pathname.startsWith("/api/scoring/"))
  ) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  if (!sessionCookie || !verifySession(sessionCookie)) {
    // For API routes, return 401
    if (pathname.startsWith("/api/")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // For pages, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
