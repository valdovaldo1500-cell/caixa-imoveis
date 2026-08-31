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

  // Rotas públicas — o produto de leilão (O6). Não exigem sessão.
  //
  // O painel interno continua sendo /[state]/* (/rs, /go) e segue exigindo
  // login: são dois públicos diferentes no mesmo app. O que é público aqui é
  // o agregador; o que decide o acesso do ASSINANTE (plano pago) é
  // src/lib/assinatura.ts, dentro da própria página — a parede nunca vira
  // redirect, porque o visitante precisa ver o que existe antes de assinar.
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/sitios" ||
    pathname === "/sitios.html" ||
    pathname === "/planos" ||
    pathname === "/entrar" ||
    pathname === "/cadastro" ||
    // startsWith, não igualdade: /conta/pagar (tela do PIX) é filha desta área
    // e cair no redirect de operador deixaria o assinante sem como pagar —
    // foi exatamente o que aconteceu com /sitemap/* em 28/08.
    pathname.startsWith("/conta") ||
    pathname.startsWith("/imovel/") ||
    pathname.startsWith("/leilao-imoveis") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/api/assinatura/")
  ) {
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap|robots.txt).*)"],
};
