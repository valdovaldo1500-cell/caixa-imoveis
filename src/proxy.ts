import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

const LEGACY_REDIRECTS: Record<string, string> = {
  "/imoveis": "/rs/imoveis",
  "/analise": "/rs/analise",
  "/mapa": "/rs/mapa",
  "/favoritos": "/rs/favoritos",
  "/investimentos": "/rs/investimentos",
  "/investimentos-online": "/rs/investimentos-online",
  "/flippa": "/rs/flippa",
  "/portfolio-acquisitions": "/rs/portfolio-acquisitions",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — no auth required
  if (pathname === "/" || pathname === "/login" || pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Legacy flat-URL redirects (e.g. /imoveis → /rs/imoveis)
  const legacyRedirect = LEGACY_REDIRECTS[pathname];
  if (legacyRedirect) {
    return NextResponse.redirect(new URL(legacyRedirect, request.url));
  }

  // Allow API calls with pipeline token
  const PIPELINE_TOKEN = process.env.PIPELINE_TOKEN;
  const authHeader = request.headers.get("authorization");
  if (
    PIPELINE_TOKEN &&
    authHeader === `Bearer ${PIPELINE_TOKEN}` &&
    (pathname.startsWith("/api/pipeline/") || pathname.startsWith("/api/scoring/") || pathname.startsWith("/api/properties/"))
  ) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  if (!sessionCookie || !verifySession(sessionCookie)) {
    if (pathname.startsWith("/api/")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
