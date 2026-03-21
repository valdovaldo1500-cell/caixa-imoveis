"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    hcaptcha: {
      render: (
        container: HTMLElement,
        config: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          theme: string;
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [hcaptchaToken, setHcaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderCaptcha = useCallback(() => {
    if (
      captchaRef.current &&
      window.hcaptcha &&
      !widgetIdRef.current
    ) {
      widgetIdRef.current = window.hcaptcha.render(captchaRef.current, {
        sitekey:
          process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ||
          "10000000-ffff-ffff-ffff-000000000000",
        callback: (token: string) => setHcaptchaToken(token),
        "expired-callback": () => setHcaptchaToken(""),
        theme: "dark",
      });
    }
  }, []);

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/auth/status", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authed) router.replace("/");
      })
      .catch(() => {});

    // Load hCaptcha script
    if (typeof window !== "undefined" && !document.getElementById("hcaptcha-script")) {
      const script = document.createElement("script");
      script.id = "hcaptcha-script";
      script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
      script.async = true;
      script.onload = () => renderCaptcha();
      document.head.appendChild(script);
    } else if (window.hcaptcha) {
      renderCaptcha();
    }
  }, [renderCaptcha, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, hcaptchaToken }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.replace("/");
      } else {
        setError(data.error || "Erro ao fazer login");
        if (window.hcaptcha && widgetIdRef.current) {
          window.hcaptcha.reset(widgetIdRef.current);
        }
        setHcaptchaToken("");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-zinc-100">
            Imóveis Caixa RS
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Dashboard de análise de imóveis retomados
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                placeholder="Digite a senha"
                required
              />
            </div>

            <div className="flex justify-center">
              <div ref={captchaRef} />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || !hcaptchaToken || !password}
              className="w-full"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
