"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PRECOS } from "@/lib/precos";

function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plano = searchParams.get("plano"); // "mensal" | "anual" | null — repassado para /conta
  // Só as duas faixas reais entram na tela: `?plano=qualquercoisa` não pode
  // renderizar preço nenhum nem quebrar a página.
  const planoEscolhido = plano === "mensal" || plano === "anual" ? plano : null;

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/assinatura/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, nome: nome || undefined }),
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.replace(plano === "mensal" || plano === "anual" ? `/conta?assinar=${plano}` : "/conta");
      } else {
        setError(data.error || "Erro ao criar conta");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 text-zinc-100">
      <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            {planoEscolhido ? "Criar sua conta" : "Criar conta grátis"}
          </CardTitle>
          {/* Quem chega de /planos clicando "Assinar mensal" via um cartão que
              dizia "Criar conta grátis / Sem cartão" e nenhuma menção ao plano
              — parecia que tinha clicado errado, no exato passo da conversão.
              O `?plano=` já era repassado para /conta; só não aparecia. */}
          {planoEscolhido ? (
            <p className="text-sm text-zinc-400">
              Plano {planoEscolhido === "mensal" ? "mensal" : "anual"} ·{" "}
              <span className="text-zinc-200">{PRECOS[planoEscolhido].rotulo}</span>. Primeiro a conta;
              o pagamento vem na tela seguinte.
            </p>
          ) : (
            <p className="text-sm text-zinc-400">
              Só o e-mail e uma senha. Sem cartão.
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-zinc-300">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                placeholder="Pelo menos 8 caracteres"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome" className="text-zinc-300">Nome (opcional)</Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                autoComplete="name"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Criando..." : "Criar conta"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-zinc-500">
            Já tem conta?{" "}
            <Link href="/entrar" className="text-zinc-300 underline hover:text-white">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={null}>
      <CadastroForm />
    </Suspense>
  );
}
