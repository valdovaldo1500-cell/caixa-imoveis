"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";

const NAV_PATHS = [
  { path: "", label: "Dashboard" },
  { path: "/imoveis", label: "Tabela" },
  { path: "/analise", label: "Análise" },
  { path: "/mapa", label: "Mapa" },
  { path: "/favoritos", label: "Favoritos" },
  { path: "/investimentos", label: "Investimentos", restrictTo: "isilva" },
  { path: "/investimentos-online", label: "Online Biz", restrictTo: "isilva" },
  { path: "/flippa", label: "Flippa", restrictTo: "isilva" },
];

export default function NavHeader({ state }: { state: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/status", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.authed && d.username) setUsername(d.username); })
      .catch(() => {});
  }, []);

  const handleLogout = () => { window.location.href = "/api/auth/logout"; };

  // Derive sub-path for state switching (e.g. from /rs/imoveis → /imoveis)
  const subPath = pathname.replace(`/${state}`, "") || "";

  const switchState = (targetState: string) => {
    router.push(`/${targetState}${subPath}`);
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 shrink-0">
      <div className="flex items-center justify-between px-4 h-12">
        {/* Logo + state toggle */}
        <div className="flex items-center gap-3">
          <Link href={`/${state}`} className="text-base font-bold text-white hover:text-zinc-200 whitespace-nowrap">
            Imóveis Caixa <span className="text-blue-400">{state.toUpperCase()}</span>
          </Link>
          <div className="flex items-center gap-0.5 bg-zinc-800 rounded p-0.5">
            {["rs", "go"].map((s) => (
              <button
                key={s}
                onClick={() => s !== state && switchState(s)}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                  s === state ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_PATHS.filter((l) => !l.restrictTo || l.restrictTo === username).map(({ path, label }) => {
            const href = `/${state}${path}`;
            const isActive = path === "" ? pathname === `/${state}` : pathname.startsWith(`/${state}${path}`);
            return (
              <Link key={path} href={href}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive ? "bg-zinc-700 text-white font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="ml-3 pl-3 border-l border-zinc-700 flex items-center gap-2">
            {username && (
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <User className="w-3 h-3" />{username}
              </span>
            )}
            <button onClick={handleLogout} className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-zinc-800" title="Sair">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button className="sm:hidden p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="sm:hidden border-t border-zinc-800 py-2 px-4 flex flex-col gap-1">
          {NAV_PATHS.filter((l) => !l.restrictTo || l.restrictTo === username).map(({ path, label }) => {
            const href = `/${state}${path}`;
            const isActive = path === "" ? pathname === `/${state}` : pathname.startsWith(`/${state}${path}`);
            return (
              <Link key={path} href={href} onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  isActive ? "bg-zinc-700 text-white font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded text-sm text-red-400 hover:bg-zinc-800 transition-colors">
            <LogOut className="w-4 h-4" />
            Sair{username ? ` (${username})` : ""}
          </button>
        </nav>
      )}
    </header>
  );
}
