"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PRECOS } from "@/lib/assinatura";

/**
 * Dispara `POST /api/assinatura/assinar`. Com o provedor `demo` isto NUNCA
 * cobra de verdade — só deixa a conta em "pagamento pendente" e grava a
 * intenção em `cobrancas`. Ver `src/lib/assinatura.ts`.
 */
export default function AssinarBotoes({ planoSugerido }: { planoSugerido: "mensal" | "anual" }) {
  const router = useRouter();
  const [loadingPlano, setLoadingPlano] = useState<"mensal" | "anual" | null>(null);
  const [erro, setErro] = useState("");

  const assinar = async (plano: "mensal" | "anual") => {
    setErro("");
    setLoadingPlano(plano);
    try {
      const res = await fetch("/api/assinatura/assinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plano }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErro(data.error || "Erro ao iniciar assinatura");
        return;
      }
      router.refresh();
    } catch {
      setErro("Erro de conexão");
    } finally {
      setLoadingPlano(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="lg"
          className="w-full"
          disabled={loadingPlano !== null}
          onClick={() => assinar("mensal")}
          variant={planoSugerido === "mensal" ? "default" : "outline"}
        >
          {loadingPlano === "mensal" ? "..." : `Assinar mensal — ${PRECOS.mensal.rotulo}`}
        </Button>
        <Button
          size="lg"
          className="w-full"
          disabled={loadingPlano !== null}
          onClick={() => assinar("anual")}
          variant={planoSugerido === "anual" ? "default" : "outline"}
        >
          {loadingPlano === "anual" ? "..." : `Assinar anual — ${PRECOS.anual.rotulo}`}
        </Button>
      </div>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <p className="text-xs text-zinc-600">
        Ambiente de teste: nenhuma cobrança real acontece ainda. A conta fica
        &quot;pagamento pendente&quot; até o meio de pagamento real ser ligado.
      </p>
    </div>
  );
}
