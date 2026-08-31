"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Caixa do "copia e cola" do PIX. O código vem pronto do Server Component —
 * este arquivo só mostra e copia, nunca gera nada: se o texto fosse montado
 * aqui, um F5 mudaria o `txid` e o pagamento chegaria com um identificador
 * diferente do que está pendente no banco.
 */
export default function CopiaECola({ brcode }: { brcode: string }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(brcode);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Clipboard bloqueado (http, permissão negada): o código segue visível
      // e selecionável na tela — ninguém fica sem pagar por causa disso.
      setCopiado(false);
    }
  };

  return (
    <div className="space-y-2">
      <p
        className="max-h-28 overflow-y-auto rounded-md border border-zinc-800 bg-zinc-950 p-3 font-mono text-[11px] leading-relaxed break-all text-zinc-400 select-all"
        aria-label="Código PIX copia e cola"
      >
        {brcode}
      </p>
      <Button onClick={copiar} className="w-full" size="lg">
        {copiado ? "Código copiado" : "Copiar código PIX"}
      </Button>
    </div>
  );
}
