"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/imoveis", label: "Tabela" },
  { href: "/analise", label: "Análise" },
  { href: "/mapa", label: "Mapa" },
  { href: "/favoritos", label: "Favoritos" },
];

export default function NavHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/status", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.authed && d.username) setUsername(d.username);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/login");
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 shrink-0">
      <div className="flex items-center justify-between px-4 h-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-bold text-white hover:text-zinc-200 whitespace-nowrap"
        >
          Imóveis Caixa RS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-700 text-white font-medium"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* User + Logout */}
          <div className="ml-3 pl-3 border-l border-zinc-700 flex items-center gap-2">
            {username && (
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <User className="w-3 h-3" />
                {username}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-zinc-800"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-zinc-800 py-2 px-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-700 text-white font-medium"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded text-sm text-red-400 hover:bg-zinc-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair{username ? ` (${username})` : ""}
          </button>
        </nav>
      )}
    </header>
  );
}
