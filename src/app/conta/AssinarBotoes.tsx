"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Dispara `POST /api/assinatura/assinar` e leva para onde se paga: no provedor
 * padrão (`pix`) isso é `/conta/pagar`, com o copia-e-cola. Só o provedor
 * `demo` não devolve `checkoutUrl` — aí a conta apenas fica "pagamento
 * pendente" sem cobrar nada. Ver `src/lib/assinatura.ts`.
 *
 * `rotuloMensal`/`rotuloAnual` vêm como prop (calculados no Server Component
 * a partir de `PRECOS`) em vez de importar `@/lib/assinatura` aqui — esse
 * módulo também importa `db` (postgres) e `next/headers`, que não podem
 * entrar no bundle do cliente.
 */
export default function AssinarBotoes({
  planoSugerido,
  rotuloMensal,
  rotuloAnual,
}: {
  planoSugerido: "mensal" | "anual";
  rotuloMensal: string;
  rotuloAnual: string;
}) {
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
      // Provedor real devolve para onde pagar: rota interna (PIX copia-e-cola)
      // ou link hospedado do PagBank. Sem checkoutUrl (só o demo), fica na
      // conta com o status atualizado.
      if (typeof data.checkoutUrl === "string" && data.checkoutUrl) {
        if (data.checkoutUrl.startsWith("/")) {
          router.push(data.checkoutUrl);
        } else {
          window.location.href = data.checkoutUrl;
        }
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
          {loadingPlano === "mensal" ? "..." : `Assinar mensal — ${rotuloMensal}`}
        </Button>
        <Button
          size="lg"
          className="w-full"
          disabled={loadingPlano !== null}
          onClick={() => assinar("anual")}
          variant={planoSugerido === "anual" ? "default" : "outline"}
        >
          {loadingPlano === "anual" ? "..." : `Assinar anual — ${rotuloAnual}`}
        </Button>
      </div>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <p className="text-xs text-zinc-600">
        O pagamento é por PIX. A conta fica &quot;pagamento pendente&quot; até a
        entrada ser conferida — costuma sair no mesmo dia útil.
      </p>
    </div>
  );
}
