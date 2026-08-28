"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type AlertaCliente = {
  id: number;
  nome: string | null;
  uf: string | null;
  cidade: string | null;
  precoMax: string | null;
  descontoMin: string | null;
  tipoImovel: string | null;
  crimeNotaMax: number | null;
  ativo: boolean;
  ultimoEnvioEm: string | null;
  criadoEm: string;
};

function resumoAlerta(a: AlertaCliente): string {
  const partes: string[] = [];
  if (a.cidade) partes.push(a.uf ? `${a.cidade}/${a.uf}` : a.cidade);
  else if (a.uf) partes.push(a.uf);
  if (a.tipoImovel) partes.push(a.tipoImovel);
  if (a.precoMax) partes.push(`até R$ ${Number(a.precoMax).toLocaleString("pt-BR")}`);
  if (a.descontoMin) partes.push(`desconto mín. ${Number(a.descontoMin)}%`);
  if (a.crimeNotaMax != null) partes.push(`risco até ${a.crimeNotaMax}`);
  return partes.length ? partes.join(" · ") : "Sem filtros — todos os imóveis novos";
}

export default function AlertasPainel({ alertasIniciais }: { alertasIniciais: AlertaCliente[] }) {
  const router = useRouter();
  const [alertas, setAlertas] = useState(alertasIniciais);
  const [mostrarForm, setMostrarForm] = useState(alertasIniciais.length === 0);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const [nome, setNome] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [descontoMin, setDescontoMin] = useState("");

  const criar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      const res = await fetch("/api/assinatura/alertas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nome: nome || null,
          uf: uf || null,
          cidade: cidade || null,
          precoMax: precoMax || null,
          descontoMin: descontoMin || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Erro ao criar alerta");
        return;
      }
      setAlertas((prev) => [...prev, data.alerta]);
      setNome("");
      setUf("");
      setCidade("");
      setPrecoMax("");
      setDescontoMin("");
      setMostrarForm(false);
      router.refresh();
    } catch {
      setErro("Erro de conexão");
    } finally {
      setSalvando(false);
    }
  };

  const alternarAtivo = async (a: AlertaCliente) => {
    const res = await fetch(`/api/assinatura/alertas/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ativo: !a.ativo }),
    });
    if (res.ok) {
      setAlertas((prev) => prev.map((x) => (x.id === a.id ? { ...x, ativo: !x.ativo } : x)));
    }
  };

  const apagar = async (id: number) => {
    if (!confirm("Apagar este alerta?")) return;
    const res = await fetch(`/api/assinatura/alertas/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      setAlertas((prev) => prev.filter((x) => x.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {alertas.length === 0 && !mostrarForm && (
        <p className="text-sm text-zinc-500">Você ainda não tem nenhum alerta.</p>
      )}

      <ul className="space-y-2">
        {alertas.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-200">{a.nome || resumoAlerta(a)}</p>
              {a.nome && <p className="truncate text-xs text-zinc-500">{resumoAlerta(a)}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge
                variant="outline"
                className={a.ativo ? "border-emerald-700 text-emerald-300" : "border-zinc-700 text-zinc-500"}
              >
                {a.ativo ? "Ativo" : "Pausado"}
              </Badge>
              <Button size="sm" variant="outline" onClick={() => alternarAtivo(a)}>
                {a.ativo ? "Pausar" : "Ativar"}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => apagar(a.id)}>
                Apagar
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {mostrarForm ? (
        <form onSubmit={criar} className="space-y-3 rounded-lg border border-zinc-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="alerta-nome" className="text-xs text-zinc-400">Nome do alerta</Label>
              <Input
                id="alerta-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Apês em POA"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="alerta-uf" className="text-xs text-zinc-400">UF</Label>
              <Input
                id="alerta-uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                maxLength={2}
                placeholder="RS"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="alerta-cidade" className="text-xs text-zinc-400">Cidade</Label>
              <Input
                id="alerta-cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="alerta-preco" className="text-xs text-zinc-400">Preço máx. (R$)</Label>
              <Input
                id="alerta-preco"
                type="number"
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="alerta-desconto" className="text-xs text-zinc-400">Desconto mín. (%)</Label>
              <Input
                id="alerta-desconto"
                type="number"
                value={descontoMin}
                onChange={(e) => setDescontoMin(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>
          </div>
          {erro && <p className="text-sm text-red-400">{erro}</p>}
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar alerta"}
            </Button>
            {alertas.length > 0 && (
              <Button type="button" size="sm" variant="ghost" onClick={() => setMostrarForm(false)}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setMostrarForm(true)}>
          Novo alerta
        </Button>
      )}
    </div>
  );
}
