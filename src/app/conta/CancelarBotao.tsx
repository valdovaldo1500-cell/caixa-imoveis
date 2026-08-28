"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CancelarBotao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const cancelar = async () => {
    if (!confirm("Cancelar a assinatura? Você continua com acesso pago até o fim do período já pago.")) {
      return;
    }
    setErro("");
    setLoading(true);
    try {
      const res = await fetch("/api/assinatura/cancelar", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErro(data.error || "Erro ao cancelar");
        return;
      }
      router.refresh();
    } catch {
      setErro("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <Button variant="destructive" size="sm" onClick={cancelar} disabled={loading}>
        {loading ? "Cancelando..." : "Cancelar assinatura"}
      </Button>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
    </div>
  );
}
