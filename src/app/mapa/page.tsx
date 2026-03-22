"use client";

import dynamic from "next/dynamic";
import NavHeader from "@/components/NavHeader";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";

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
  valorAvaliacao: string | null;
  desconto: string | null;
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  areaPrivativaM2: string | null;
  score: string | null;
  marketValue: string | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  fotoUrl: string | null;
  lat: string;
  lng: string;
}

const MODALIDADE_OPTIONS = [
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
  "Apartamento",
  "Casa",
  "Terreno",
  "Comercial",
  "Loja",
];

const DISTANCIA_OPTIONS = [
  { label: "Todas", value: "" },
  { label: "até 10km", value: "10" },
  { label: "até 25km", value: "25" },
  { label: "até 50km", value: "50" },
  { label: "até 100km", value: "100" },
  { label: "até 200km", value: "200" },
];

// ---------------------------------------------------------------------------
// MultiSelect component (inline)
// ---------------------------------------------------------------------------
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  const buttonLabel =
    selected.length === 0
      ? label
      : selected.length === 1
      ? selected[0]
      : `${label} (${selected.length})`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 bg-zinc-800 border rounded px-2 py-0.5 text-zinc-300 text-xs whitespace-nowrap transition-colors ${
          selected.length > 0 ? "border-blue-600" : "border-zinc-700"
        }`}
      >
        <span className={selected.length === 0 ? "text-zinc-500" : ""}>{buttonLabel}</span>
        <ChevronDown className="w-3 h-3 text-zinc-500 ml-0.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-[200] bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl min-w-[180px] max-h-64 overflow-y-auto">
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 border-b border-zinc-800"
            >
              Limpar seleção
            </button>
          )}
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="accent-blue-500"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MapaPage() {
  const [properties, setProperties] = useState<MapProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalidades, setModalidades] = useState<string[]>([]);
  const [descontoMin, setDescontoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [tipos, setTipos] = useState<string[]>([]);
  const [distancia, setDistancia] = useState("");

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (modalidades.length > 0) params.set("modalidade", modalidades.join(","));
    if (descontoMin) params.set("desconto_min", descontoMin);
    if (precoMax) params.set("preco_max", precoMax);
    if (tipos.length > 0) params.set("tipo", tipos.join(","));
    if (distancia) params.set("max_distance", distancia);

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
  }, [modalidades, descontoMin, precoMax, tipos, distancia]);

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

          <MultiSelect
            label="Modalidade"
            options={MODALIDADE_OPTIONS}
            selected={modalidades}
            onChange={setModalidades}
          />

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

          <div className="flex items-center gap-1.5">
            <label className="text-zinc-500">Preço máx.</label>
            <select
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-0.5 focus:outline-none focus:border-zinc-500"
            >
              {PRECO_MAX_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <MultiSelect
            label="Tipo"
            options={TIPO_OPTIONS}
            selected={tipos}
            onChange={setTipos}
          />

          <div className="flex items-center gap-1.5">
            <label className="text-zinc-500">Dist. POA</label>
            <select
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-0.5 focus:outline-none focus:border-zinc-500"
            >
              {DISTANCIA_OPTIONS.map((opt) => (
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
