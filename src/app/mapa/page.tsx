"use client";

import dynamic from "next/dynamic";
import NavHeader from "@/components/NavHeader";
import { useState, useEffect, useCallback } from "react";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-zinc-400">
      Carregando mapa...
    </div>
  ),
});

interface MapProperty {
  id: number;
  cidade: string;
  bairro: string | null;
  preco: string | null;
  desconto: string | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  lat: string;
  lng: string;
}

const MODALIDADES = [
  "Todas",
  "Venda Direta Online",
  "Licitação Aberta",
  "1º Leilão SFI",
  "2º Leilão SFI",
  "Venda Online",
];

const DESCONTO_MIN_OPTIONS = [
  { label: "Todos", value: "" },
  { label: "≥20%", value: "20" },
  { label: "≥30%", value: "30" },
  { label: "≥40%", value: "40" },
  { label: "≥50%", value: "50" },
  { label: "≥60%", value: "60" },
  { label: "≥70%", value: "70" },
];

const PRECO_MAX_OPTIONS = [
  { label: "Todos", value: "" },
  { label: "até R$ 50k", value: "50000" },
  { label: "até R$ 100k", value: "100000" },
  { label: "até R$ 200k", value: "200000" },
  { label: "até R$ 500k", value: "500000" },
  { label: "até R$ 1M", value: "1000000" },
];

const TIPO_OPTIONS = [
  { label: "Todos", value: "" },
  { label: "Apartamento", value: "Apartamento" },
  { label: "Casa", value: "Casa" },
  { label: "Terreno", value: "Terreno" },
  { label: "Comercial", value: "Comercial" },
  { label: "Loja", value: "Loja" },
];

export default function MapaPage() {
  const [properties, setProperties] = useState<MapProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalidade, setModalidade] = useState("Todas");
  const [descontoMin, setDescontoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [tipo, setTipo] = useState("");

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (modalidade && modalidade !== "Todas") params.set("modalidade", modalidade);
    if (descontoMin) params.set("desconto_min", descontoMin);

    const url = `/api/map${params.toString() ? `?${params.toString()}` : ""}`;

    fetch(url, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setProperties(json.data || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [modalidade, descontoMin]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col h-screen">
      <NavHeader />

      {/* Map subheader with status */}
      <div className="flex items-center gap-4 px-4 py-2 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <h1 className="text-sm font-semibold text-zinc-300">Mapa de Imóveis</h1>
        {!loading && !error && (
          <span className="text-sm text-zinc-400">
            {properties.length} geolocalizados
          </span>
        )}
        {loading && (
          <span className="text-sm text-zinc-500">Carregando dados...</span>
        )}
        {error && (
          <span className="text-sm text-red-400">Erro: {error}</span>
        )}
      </div>

      {/* Legend + Filters bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-400 shrink-0">
        {/* Legend */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-zinc-300">Desconto:</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 border border-black/40" />
            &ge;50%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 border border-black/40" />
            30–49%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 border border-black/40" />
            &lt;30%
          </span>
        </div>

        {/* Divider */}
        <span className="hidden sm:block w-px h-4 bg-zinc-700" />

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-medium text-zinc-300">Filtros:</span>

          <div className="flex items-center gap-1.5">
            <label className="text-zinc-500">Modalidade</label>
            <select
              value={modalidade}
              onChange={(e) => setModalidade(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-0.5 focus:outline-none focus:border-zinc-500"
            >
              {MODALIDADES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <label className="text-zinc-500">Desconto mín.</label>
            <select
              value={descontoMin}
              onChange={(e) => setDescontoMin(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-0.5 focus:outline-none focus:border-zinc-500"
            >
              {DESCONTO_MIN_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!loading && (
          <PropertyMap properties={properties} />
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
            Carregando dados...
          </div>
        )}
      </div>
    </div>
  );
}
