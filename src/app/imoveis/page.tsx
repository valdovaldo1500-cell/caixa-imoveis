"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, EyeOff, MessageSquare, Bell, BellOff, Settings2, X, ChevronDown, Save, Trash2, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Property {
  id: number;
  caixaId: string;
  cidade: string;
  bairro: string | null;
  endereco: string | null;
  descricao: string | null;
  tipoImovel: string | null;
  preco: string | null;
  valorAvaliacao: string | null;
  desconto: string | null;
  modalidadeVenda: string | null;
  aceitaFinanciamento: boolean;
  linkCaixa: string | null;
  score: string | null;
  scoreDetails: Record<string, number> | null;
  crimeRate: string | null;
  firstSeenAt: string;
  marketValue: string | null;
  marketValuePerM2: string | null;
  marketRentValue: string | null;
  comparablesCount: number | null;
  areaPrivativaM2: string | null;
  areaTotalM2: string | null;
  quartos: number | null;
  zapMarketValue: string | null;
  zapMarketValuePerM2: string | null;
  zapRentValue: string | null;
  zapComparablesCount: number | null;
  qaMarketValue: string | null;
  qaRentValue: string | null;
  qaComparablesCount: number | null;
  fotoUrl: string | null;
  lat: string | null;
  lng: string | null;
  dataQualityFlag: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface SavedFilterPreset {
  name: string;
  isDefault: boolean;
  filters: {
    cidades: string[];
    tipos: string[];
    modalidades: string[];
    descontoMin: string;
    precoMax: string;
    precoMin: string;
    showHidden: boolean;
  };
}

const FILTERS_KEY = "caixa-imoveis-filters";
const SAVED_FILTERS_KEY = "caixa-imoveis-saved-filters";
const NOTIFICATIONS_KEY = "caixa-imoveis-notifications";
const COLUMNS_KEY = "caixa-imoveis-columns";

// ---------------------------------------------------------------------------
// Column configuration
// ---------------------------------------------------------------------------
const ALL_COLUMNS = [
  { id: "foto", label: "Foto", defaultVisible: true, defaultWidth: 90 },
  { id: "actions", label: "", defaultVisible: true, defaultWidth: 70 },
  { id: "cidade", label: "Cidade", defaultVisible: true, sortKey: "cidade" },
  { id: "bairro", label: "Bairro", defaultVisible: true, sortKey: "bairro" },
  { id: "tipo", label: "Tipo", defaultVisible: true, defaultWidth: 90 },
  { id: "preco", label: "Preço", defaultVisible: true, sortKey: "preco", defaultWidth: 100 },
  { id: "precoM2", label: "R$/m²", defaultVisible: true, defaultWidth: 75 },
  { id: "avaliacao", label: "Avaliação", defaultVisible: true, defaultWidth: 100 },
  { id: "quartos", label: "Qtos", defaultVisible: true, sortKey: "quartos", defaultWidth: 45 },
  { id: "areaPriv", label: "m² Priv.", defaultVisible: true, sortKey: "area_priv", defaultWidth: 65 },
  { id: "areaTotal", label: "m² Total", defaultVisible: true, sortKey: "area_total", defaultWidth: 65 },
  { id: "desconto", label: "Desc.", defaultVisible: true, sortKey: "desconto", defaultWidth: 65 },
  { id: "descontoMercado", label: "Desc. Merc.", defaultVisible: true, sortKey: "desconto_mercado", defaultWidth: 75 },
  { id: "modalidade", label: "Modalidade", defaultVisible: false },
  { id: "score", label: "Score", defaultVisible: true, sortKey: "score", defaultWidth: 55 },
  { id: "crime", label: "Crime", defaultVisible: true, sortKey: "crime", defaultWidth: 90 },
  { id: "valorMercado", label: "ITBI", defaultVisible: true, sortKey: "market_value", defaultWidth: 100 },
  { id: "zapValor", label: "ZAP", defaultVisible: true, sortKey: "zap_value", defaultWidth: 100 },
  { id: "mercadoM2", label: "R$/m² ITBI", defaultVisible: false, defaultWidth: 80 },
  { id: "zapM2", label: "R$/m² ZAP", defaultVisible: false, defaultWidth: 80 },
  { id: "qaValor", label: "5ºAndar", defaultVisible: true, sortKey: "qa_value", defaultWidth: 100 },
  { id: "aluguel", label: "Aluguel ZAP", defaultVisible: true, sortKey: "zap_rent", defaultWidth: 95 },
  { id: "qaAluguel", label: "Aluguel 5º", defaultVisible: true, sortKey: "qa_rent", defaultWidth: 95 },
  { id: "yield", label: "Yield Alug.", defaultVisible: true, sortKey: "yield", defaultWidth: 75 },
  { id: "link", label: "Link", defaultVisible: true, defaultWidth: 40 },
  { id: "distancia", label: "Dist. POA", defaultVisible: false, defaultWidth: 70 },
  { id: "adicionado", label: "Adicionado", defaultVisible: true, sortKey: "first_seen", defaultWidth: 85 },
] as const;

type ColumnId = typeof ALL_COLUMNS[number]["id"];

const DEFAULT_VISIBLE = ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.id as string);

function formatBRL(value: string | number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

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

// ---------------------------------------------------------------------------
// MultiSelect component
// ---------------------------------------------------------------------------
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
        className={`flex items-center gap-1 bg-zinc-800 border rounded px-2 py-1.5 text-zinc-300 text-xs whitespace-nowrap transition-colors ${
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

// ---------------------------------------------------------------------------
// ColumnSettings panel
// ---------------------------------------------------------------------------
function ColumnSettings({
  visibleColumns,
  onChange,
  onClose,
}: {
  visibleColumns: string[];
  onChange: (cols: string[]) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  const isVisible = (id: string) => visibleColumns.includes(id);

  const toggle = (id: string) => {
    if (isVisible(id)) {
      // Don't allow hiding all columns
      if (visibleColumns.length <= 1) return;
      onChange(visibleColumns.filter((c) => c !== id));
    } else {
      // Insert at the position defined by ALL_COLUMNS order
      const allIds = ALL_COLUMNS.map((c) => c.id as string);
      const newVisible = [...visibleColumns, id].sort(
        (a, b) => allIds.indexOf(a) - allIds.indexOf(b)
      );
      onChange(newVisible);
    }
  };

  const moveUp = (id: string) => {
    const idx = visibleColumns.indexOf(id);
    if (idx <= 0) return;
    const next = [...visibleColumns];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const moveDown = (id: string) => {
    const idx = visibleColumns.indexOf(id);
    if (idx < 0 || idx >= visibleColumns.length - 1) return;
    const next = [...visibleColumns];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-[300] bg-zinc-950 border border-zinc-700 rounded-lg shadow-xl p-3 w-64"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">Colunas visíveis</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="space-y-0.5 max-h-72 overflow-y-auto">
        {ALL_COLUMNS.map((col) => {
          const vis = isVisible(col.id);
          const idx = visibleColumns.indexOf(col.id as string);
          return (
            <div
              key={col.id}
              className="flex items-center gap-2 px-1 py-1 rounded hover:bg-zinc-800"
            >
              <input
                type="checkbox"
                checked={vis}
                onChange={() => toggle(col.id as string)}
                className="accent-blue-500 shrink-0"
              />
              <span className={`flex-1 text-xs ${vis ? "text-zinc-200" : "text-zinc-500"}`}>
                {col.label || "(ações)"}
              </span>
              {vis && (
                <div className="flex gap-0.5">
                  <button
                    onClick={() => moveUp(col.id as string)}
                    disabled={idx === 0}
                    className="text-zinc-600 hover:text-zinc-300 disabled:opacity-30 text-xs px-0.5"
                    title="Mover para cima"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDown(col.id as string)}
                    disabled={idx === visibleColumns.length - 1}
                    className="text-zinc-600 hover:text-zinc-300 disabled:opacity-30 text-xs px-0.5"
                    title="Mover para baixo"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => onChange([...DEFAULT_VISIBLE])}
        className="mt-2 w-full text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 rounded py-1 transition-colors"
      >
        Reset padrão
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SaveFilterPopup
// ---------------------------------------------------------------------------
function SaveFilterPopup({
  onSave,
  onClose,
}: {
  onSave: (name: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);
  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 z-[300] bg-zinc-950 border border-zinc-700 rounded-lg shadow-xl p-3 w-60"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">Salvar filtro</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <input
        autoFocus
        type="text"
        placeholder="Nome do filtro..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) {
            onSave(name.trim());
          }
        }}
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 mb-2"
      />
      <button
        disabled={!name.trim()}
        onClick={() => name.trim() && onSave(name.trim())}
        className="w-full px-2 py-1.5 text-xs bg-blue-700 hover:bg-blue-600 text-white rounded disabled:opacity-40 transition-colors"
      >
        Salvar
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SavedFiltersDropdown
// ---------------------------------------------------------------------------
function SavedFiltersDropdown({
  presets,
  notificationsEnabled,
  onApply,
  onDelete,
  onSetDefault,
  onToggleNotifications,
}: {
  presets: SavedFilterPreset[];
  notificationsEnabled: boolean;
  onApply: (preset: SavedFilterPreset) => void;
  onDelete: (name: string) => void;
  onSetDefault: (name: string) => void;
  onToggleNotifications: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative flex items-center gap-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 bg-zinc-800 border rounded px-2 py-1.5 text-xs whitespace-nowrap transition-colors ${
          presets.length > 0 ? "border-blue-700 text-blue-300" : "border-zinc-700 text-zinc-400"
        }`}
      >
        <span>Filtros salvos{presets.length > 0 ? ` (${presets.length})` : ""}</span>
        <ChevronDown className="w-3 h-3 text-zinc-500 ml-0.5" />
      </button>
      {/* Notification bell inline */}
      <button
        onClick={onToggleNotifications}
        className={`flex items-center gap-1 border rounded px-2 py-1.5 text-xs transition-colors ${
          notificationsEnabled
            ? "text-yellow-400 border-yellow-700 bg-yellow-950 hover:bg-yellow-900"
            : "text-zinc-400 border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
        }`}
        title={notificationsEnabled ? "Notificações ativadas" : "Ativar notificações por email"}
      >
        {notificationsEnabled ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-[300] bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl w-60">
          {presets.length === 0 ? (
            <p className="text-xs text-zinc-500 px-3 py-3">Nenhum filtro salvo ainda.</p>
          ) : (
            presets.map((preset) => (
              <div
                key={preset.name}
                className="flex items-center gap-1 px-3 py-2 hover:bg-zinc-800 border-b border-zinc-800 last:border-0"
              >
                <button
                  onClick={() => {
                    onApply(preset);
                    setOpen(false);
                  }}
                  className="flex-1 text-left text-xs text-zinc-200 truncate"
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => onSetDefault(preset.name)}
                  title={preset.isDefault ? "Remover como padrão" : "Definir como padrão"}
                  className={`text-xs px-1 rounded transition-colors ${
                    preset.isDefault
                      ? "text-yellow-400"
                      : "text-zinc-600 hover:text-yellow-400"
                  }`}
                >
                  ★
                </button>
                <button
                  onClick={() => onDelete(preset.name)}
                  title="Excluir filtro"
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Popups
// ---------------------------------------------------------------------------
function ComparablesPopup({ propertyId, onClose, source = "itbi", months = 12 }: { propertyId: number; onClose: () => void; source?: "itbi" | "zap" | "qa"; months?: number }) {
  const [data, setData] = useState<{
    property: { bairro: string; tipoImovel: string; areaPrivativaM2: string };
    tier1: { comparables: Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string; finalidadeConstrucao: string }>; medianPrecoM2: number; count: number };
    tier2: { comparables: Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string; finalidadeConstrucao: string }>; medianPrecoM2: number; count: number };
    methodology: { estimatedValue: number; medianPrecoM2: number; usedTier: number };
    zapListings?: { saleComparables: Array<{ bairro: string | null; unitType: string | null; price: number; area: number; pricePerM2: number; bedrooms: number | null; listingUrl: string | null }>; medianSalePricePerM2: number | null };
    qaListings?: { saleComparables: Array<{ bairro: string | null; unitType: string | null; price: number; area: number; pricePerM2: number; bedrooms: number | null; listingUrl: string | null }>; medianSalePricePerM2: number | null };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/properties/${propertyId}/comparables?months=${months}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [propertyId, months]);

  const itbiComps = data ? (data.tier1.count > 0 ? data.tier1.comparables : data.tier2.comparables) : [];
  const zapComps = data?.zapListings?.saleComparables || [];
  const qaComps = data?.qaListings?.saleComparables || [];
  const showZap = source === "zap";
  const showQA = source === "qa";
  const listingComps = showQA ? qaComps : zapComps;
  const title = showQA ? "Anúncios 5ºAndar usados no cálculo" : showZap ? "Anúncios ZAP usados no cálculo" : "Transações ITBI usadas no cálculo";

  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 z-[100] bg-zinc-950 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-xl p-3 w-[480px] max-h-[400px] overflow-auto text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
        </div>
      </div>
      {loading ? (
        <p className="text-xs text-zinc-500">Carregando...</p>
      ) : (showZap || showQA) ? (
        /* ZAP / QA listings */
        listingComps.length === 0 ? (
          <p className="text-xs text-zinc-500">Nenhum anúncio {showQA ? "5ºAndar" : "ZAP"} encontrado</p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-2">
              {listingComps.length} anúncios comparáveis
              {showQA && <span className="text-orange-500 ml-1">— Valor ajustado -20% (original 5ºAndar tende +25% acima do mercado)</span>}
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-1 pr-2">Bairro</th>
                  <th className="text-left py-1 pr-2">Tipo</th>
                  <th className="text-right py-1 pr-2">Preço</th>
                  <th className="text-right py-1 pr-2">Área</th>
                  <th className="text-right py-1 pr-2">R$/m²</th>
                  <th className="text-right py-1 pr-2">Qtos</th>
                  <th className="text-right py-1">Link</th>
                </tr>
              </thead>
              <tbody>
                {listingComps.map((c, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="py-1 pr-2 text-zinc-300 max-w-[100px] truncate">{c.bairro || "—"}</td>
                    <td className="py-1 pr-2 text-zinc-400 max-w-[80px] truncate">{c.unitType || "—"}</td>
                    <td className="py-1 pr-2 text-right text-zinc-300">{formatBRL(c.price)}</td>
                    <td className="py-1 pr-2 text-right text-zinc-400">{c.area > 0 ? `${Math.round(c.area)}m²` : "—"}</td>
                    <td className="py-1 pr-2 text-right text-zinc-300 font-medium">R$ {Math.round(c.pricePerM2).toLocaleString("pt-BR")}</td>
                    <td className="py-1 pr-2 text-right text-zinc-400">{c.bedrooms ?? "—"}</td>
                    <td className="py-1 text-right">
                      {c.listingUrl ? <a href={c.listingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ver</a> : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      ) : (
        /* ITBI transactions */
        itbiComps.length === 0 ? (
          <p className="text-xs text-zinc-500">Nenhum comparável ITBI encontrado</p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-2">
              {itbiComps.length} transações comparáveis
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-1 pr-2">Endereço</th>
                  <th className="text-right py-1 pr-2">Valor</th>
                  <th className="text-right py-1 pr-2">Área</th>
                  <th className="text-right py-1">R$/m²</th>
                </tr>
              </thead>
              <tbody>
                {itbiComps.map((c, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="py-1 pr-2 text-zinc-300 max-w-[180px] truncate" title={`${c.logradouro}, ${c.nEndereco} — ${c.bairro} (${c.dataEstimativa?.slice(0, 10)})`}>
                      {c.logradouro}, {c.nEndereco}
                      <span className="text-zinc-600 ml-1">{c.dataEstimativa?.slice(0, 10)}</span>
                    </td>
                    <td className="py-1 pr-2 text-right text-zinc-300">{formatBRL(c.baseCalculo)}</td>
                    <td className="py-1 pr-2 text-right text-zinc-400">{c.areaConstrPrivativa}m²</td>
                    <td className="py-1 text-right text-zinc-300 font-medium">R$ {Math.round(c.precoM2).toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {itbiComps.length > 10 && (
              <p className="text-xs text-zinc-500 mt-1">
                <a href={`/imoveis/${propertyId}#comparaveis`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Ver todas as {itbiComps.length} transações →
                </a>
              </p>
            )}
          </>
        )
      )}
    </div>
  );
}

function RentPopup({ propertyId, onClose, months = 12, propertyPrice = 0 }: { propertyId: number; onClose: () => void; months?: number; propertyPrice?: number }) {
  const [itbiComps, setItbiComps] = useState<Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string }>>([]);
  const [medianM2, setMedianM2] = useState(0);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [estimatedRent, setEstimatedRent] = useState<number | null>(null);
  const [zapRentals, setZapRentals] = useState<Array<{ zapId: string | null; bairro: string | null; unitType: string | null; price: number; area: number; pricePerM2: number; bedrooms: number | null; listingUrl: string | null }>>([]);
  const [zapMedianRent, setZapMedianRent] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/properties/${propertyId}/comparables?months=${months}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const tier = d.tier1?.count > 0 ? d.tier1 : d.tier2;
        setItbiComps(tier?.comparables || []);
        setMedianM2(d.methodology?.medianPrecoM2 || 0);
        setEstimatedValue(d.methodology?.estimatedValue ?? null);
        setEstimatedRent(d.methodology?.estimatedRent ?? null);
        setZapRentals(d.zapRentals?.comparables || []);
        setZapMedianRent(d.zapRentals?.medianRent || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [propertyId, months]);

  const hasZapRentals = zapRentals.length > 0;
  const rentValue = hasZapRentals ? zapMedianRent : estimatedRent;
  const marketValue = estimatedValue;

  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 z-[100] bg-zinc-950 backdrop-blur-sm border border-zinc-700 rounded-xl shadow-xl p-3 w-[480px] max-h-[480px] overflow-auto text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">
          {hasZapRentals ? "Aluguéis similares no ZAP" : "Como calculamos o aluguel"}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
        </div>
      </div>

      {/* Summary card */}
      <div className="text-xs text-zinc-400 space-y-1 mb-3 bg-zinc-800 rounded p-2">
        {hasZapRentals ? (() => {
          const annualRent = zapMedianRent * 12;
          const yieldPct = propertyPrice > 0 ? (annualRent / propertyPrice) * 100 : null;
          return (
            <>
              <p>Mediana aluguel ZAP: <span className="text-green-400 font-medium">{formatBRL(zapMedianRent)}/mês</span></p>
              <p>Aluguel anual estimado: <span className="text-zinc-200 font-medium">{formatBRL(annualRent)}/ano</span></p>
              {yieldPct !== null && (
                <>
                  <p>Yield bruto: <span className={`font-medium ${yieldPct >= 8 ? "text-green-400" : yieldPct >= 5 ? "text-yellow-400" : "text-zinc-200"}`}>{yieldPct.toFixed(1)}%</span> <span className="text-zinc-600">(Selic: 14,25%)</span></p>
                </>
              )}
              <p className="text-zinc-500">{zapRentals.length} imóvel{zapRentals.length !== 1 ? "is" : ""} comparável{zapRentals.length !== 1 ? "is" : ""} encontrado{zapRentals.length !== 1 ? "s" : ""}</p>
            </>
          );
        })() : (
          <>
            <p>Valor de mercado: <span className="text-zinc-200 font-medium">{formatBRL(marketValue)}</span></p>
            <p>Yield mensal: <span className="text-zinc-200 font-medium">0,5%</span></p>
            <p>Aluguel estimado: <span className="text-green-400 font-medium">{formatBRL(rentValue)}/mês</span></p>
            <p>Aluguel anual: <span className="text-zinc-200 font-medium">{formatBRL(rentValue !== null ? rentValue * 12 : null)}/ano</span></p>
          </>
        )}
      </div>

      {loading ? (
        <p className="text-xs text-zinc-500">Carregando dados...</p>
      ) : hasZapRentals ? (
        /* ZAP rental comparables table */
        <table className="w-full text-xs">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-800">
              <th className="text-left py-1 pr-2">Bairro</th>
              <th className="text-left py-1 pr-2">Tipo</th>
              <th className="text-right py-1 pr-2">Aluguel</th>
              <th className="text-right py-1 pr-2">R$/m²</th>
              <th className="text-right py-1 pr-2">Área</th>
              <th className="text-right py-1 pr-2">Qtos</th>
              <th className="text-right py-1">Link</th>
            </tr>
          </thead>
          <tbody>
            {zapRentals.map((r, i) => (
              <tr key={i} className="border-b border-zinc-800/50">
                <td className="py-1 pr-2 text-zinc-300 max-w-[100px] truncate" title={r.bairro || ""}>
                  {r.bairro || "—"}
                </td>
                <td className="py-1 pr-2 text-zinc-400 max-w-[80px] truncate" title={r.unitType || ""}>
                  {r.unitType || "—"}
                </td>
                <td className="py-1 pr-2 text-right text-green-400 font-medium">{formatBRL(r.price)}</td>
                <td className="py-1 pr-2 text-right text-zinc-400">
                  {r.area > 0 ? `R$\u00a0${Math.round(r.price / r.area).toLocaleString("pt-BR")}` : "—"}
                </td>
                <td className="py-1 pr-2 text-right text-zinc-400">{r.area > 0 ? `${Math.round(r.area)}m²` : "—"}</td>
                <td className="py-1 pr-2 text-right text-zinc-400">{r.bedrooms ?? "—"}</td>
                <td className="py-1 text-right">
                  {r.listingUrl ? (
                    <a href={r.listingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ver</a>
                  ) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : itbiComps.length === 0 ? (
        <p className="text-xs text-zinc-500">Sem comparáveis</p>
      ) : (
        /* Fallback: ITBI-based table */
        <>
          <p className="text-xs text-zinc-500 mb-1">
            Transações ITBI base · Mediana R$/m²: <span className="text-zinc-300">R$ {Math.round(medianM2).toLocaleString("pt-BR")}</span>
          </p>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1 pr-2">Endereço</th>
                <th className="text-right py-1 pr-2">Valor</th>
                <th className="text-right py-1 pr-2">Área</th>
                <th className="text-right py-1">R$/m²</th>
              </tr>
            </thead>
            <tbody>
              {itbiComps.slice(0, 8).map((c, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-1 pr-2 text-zinc-300 max-w-[180px] truncate" title={`${c.logradouro}, ${c.nEndereco} — ${c.bairro} (${c.dataEstimativa?.slice(0, 10)})`}>
                    {c.logradouro}, {c.nEndereco}
                  </td>
                  <td className="py-1 pr-2 text-right text-zinc-300">{formatBRL(c.baseCalculo)}</td>
                  <td className="py-1 pr-2 text-right text-zinc-400">{c.areaConstrPrivativa}m²</td>
                  <td className="py-1 text-right text-zinc-300">R$ {Math.round(c.precoM2).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {itbiComps.length > 8 && (
            <p className="text-xs text-zinc-500 mt-1">
              <a href={`/imoveis/${propertyId}#comparaveis`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                +{itbiComps.length - 8} transações →
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}

function YieldPopup({ preco, aluguelMensal, valorAvaliacao, onClose }: { preco: number; aluguelMensal: number; valorAvaliacao: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  const SELIC = 14.25; // Current Selic rate (Mar 2025)

  // Acquisition costs
  const itbiRate = 0.03;
  const registroRate = 0.01;
  const itbiCost = preco * itbiRate;
  const registroCost = preco * registroRate;
  const totalAcquisition = preco + itbiCost + registroCost;

  // Annual rental income
  const aluguelAnual = aluguelMensal * 12;

  // Ongoing costs (annual)
  const vacancyRate = 0.083;
  const adminRate = 0.10;
  const manutencaoRate = 0.005;
  const iptuBase = valorAvaliacao > 0 ? valorAvaliacao : preco;
  const iptuRate = 0.005;
  const iptuCost = iptuBase * iptuRate;

  const vacancyCost = aluguelAnual * vacancyRate;
  const adminCost = aluguelAnual * adminRate;
  const manutencaoCost = preco * manutencaoRate;

  // IR on rental income (progressive table 2025)
  let irAnual = 0;
  if (aluguelMensal > 6227) irAnual = (aluguelMensal * 0.275 - 963.17) * 12;
  else if (aluguelMensal > 4664) irAnual = (aluguelMensal * 0.225 - 651.73) * 12;
  else if (aluguelMensal > 3751) irAnual = (aluguelMensal * 0.15 - 370.40) * 12;
  else if (aluguelMensal > 2428) irAnual = (aluguelMensal * 0.075 - 89.10) * 12;

  const onboardingCost = aluguelMensal; // 1 month lost while finding tenant, amortized in year 1
  const totalCostAnual = vacancyCost + adminCost + manutencaoCost + iptuCost + irAnual + onboardingCost;
  const receitaLiquida = aluguelAnual - totalCostAnual;

  const yieldBruto = (aluguelAnual / preco) * 100;
  const yieldLiquido = (receitaLiquida / totalAcquisition) * 100;
  const spreadVsSelic = yieldLiquido - SELIC;
  const paybackMonths = receitaLiquida > 0 ? Math.round(totalAcquisition / (receitaLiquida / 12)) : null;
  const selicReturn = totalAcquisition * (SELIC / 100);

  const fmtBRL = (v: number) => `R$ ${Math.round(v).toLocaleString("pt-BR")}`;
  const yieldColor = (y: number) => y >= 8 ? "text-green-400" : y >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 z-[100] bg-zinc-950 border border-zinc-700 rounded-lg shadow-xl p-3 w-[360px] max-h-[520px] overflow-auto text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">Análise de Investimento</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
      </div>

      <div className="text-xs space-y-2.5">
        {/* Acquisition */}
        <div>
          <p className="text-zinc-500 font-semibold mb-1">Custo de Aquisição</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Preço Caixa</span><span className="text-zinc-200">{fmtBRL(preco)}</span></div>
            <div className="flex justify-between"><span>ITBI (3%)</span><span>{fmtBRL(itbiCost)}</span></div>
            <div className="flex justify-between"><span>Registro/Cartório (~1%)</span><span>{fmtBRL(registroCost)}</span></div>
            <div className="flex justify-between border-t border-zinc-800 pt-0.5 font-medium text-zinc-200"><span>Total Aquisição</span><span>{fmtBRL(totalAcquisition)}</span></div>
          </div>
        </div>

        {/* Revenue */}
        <div>
          <p className="text-zinc-500 font-semibold mb-1">Receita Anual</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Aluguel mensal (ZAP)</span><span className="text-green-400">{fmtBRL(aluguelMensal)}/mês</span></div>
            <div className="flex justify-between font-medium text-zinc-200"><span>Receita bruta anual</span><span>{fmtBRL(aluguelAnual)}/ano</span></div>
          </div>
        </div>

        {/* Costs */}
        <div>
          <p className="text-zinc-500 font-semibold mb-1">Custos Anuais</p>
          <div className="space-y-0.5 text-zinc-400">
            <div className="flex justify-between"><span>Vacância (8,3% — 1 mês/ano)</span><span>- {fmtBRL(vacancyCost)}</span></div>
            <div className="flex justify-between"><span>Administração (10%)</span><span>- {fmtBRL(adminCost)}</span></div>
            <div className="flex justify-between"><span>Manutenção (0,5%)</span><span>- {fmtBRL(manutencaoCost)}</span></div>
            <div className="flex justify-between"><span>IPTU (~0,5% {valorAvaliacao > 0 ? "avaliação" : "preço"})</span><span>- {fmtBRL(iptuCost)}</span></div>
            <div className="flex justify-between"><span>Onboarding inquilino (1 mês) <span className="text-zinc-600">(amortizado 1º ano)</span></span><span>- {fmtBRL(onboardingCost)}</span></div>
            <div className="flex justify-between"><span>IR aluguel</span><span>{irAnual > 0 ? `- ${fmtBRL(irAnual)}` : "Isento (< R$2.428)"}</span></div>
            <div className="flex justify-between border-t border-zinc-800 pt-0.5 font-medium text-zinc-200"><span>Receita líquida anual</span><span>{fmtBRL(receitaLiquida)}</span></div>
          </div>
        </div>

        {/* Yields + Benchmark */}
        <div className="bg-zinc-800 rounded p-2 space-y-1">
          <div className="flex justify-between"><span className="text-zinc-400">Yield bruto</span><span className={`font-medium ${yieldColor(yieldBruto)}`}>{yieldBruto.toFixed(1)}%</span></div>
          <div className="flex justify-between border-t border-zinc-700 pt-1"><span className="text-zinc-300 font-semibold">Yield líquido</span><span className={`font-bold ${yieldColor(yieldLiquido)}`}>{yieldLiquido.toFixed(1)}%</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Selic (referência)</span><span className="text-zinc-500">{SELIC}%</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Spread vs. Selic</span><span className={`font-medium ${spreadVsSelic >= 0 ? "text-green-400" : "text-red-400"}`}>{spreadVsSelic >= 0 ? "+" : ""}{spreadVsSelic.toFixed(1)} p.p.</span></div>
        </div>

        {/* Comparison + Payback */}
        <div className="space-y-1 text-zinc-400">
          <div className="flex justify-between"><span>Mesmo valor no Tesouro Selic:</span><span className="text-zinc-300">{fmtBRL(selicReturn)}/ano</span></div>
          <div className="flex justify-between"><span>Renda líquida do aluguel:</span><span className={receitaLiquida > selicReturn ? "text-green-400" : "text-red-400"}>{fmtBRL(receitaLiquida)}/ano</span></div>
          {paybackMonths && <div className="flex justify-between"><span>Payback</span><span className="text-zinc-300">{Math.floor(paybackMonths / 12)} anos e {paybackMonths % 12} meses</span></div>}
        </div>

        {/* Verdict */}
        <div className={`rounded p-2 text-center font-semibold ${spreadVsSelic >= 0 ? "bg-green-950 text-green-400" : spreadVsSelic >= -3 ? "bg-yellow-950 text-yellow-400" : "bg-red-950 text-red-400"}`}>
          {spreadVsSelic >= 0 ? "Rende mais que Selic — bom investimento" : spreadVsSelic >= -3 ? "Próximo da Selic — considere valorização" : "Rende menos que Selic — cuidado"}
        </div>

        {/* Sensitivity */}
        <div className="text-[10px] text-zinc-500">
          <span className="font-medium">Sensibilidade vacância: </span>
          {[5, 8.3, 15].map((vr) => {
            const vc = aluguelAnual * (vr / 100);
            const net = aluguelAnual - vc - adminCost - manutencaoCost - iptuCost - irAnual;
            const y = (net / totalAcquisition) * 100;
            return <span key={vr} className={`mr-2 ${y >= SELIC ? "text-green-500" : y >= 0 ? "text-zinc-400" : "text-red-400"}`}>{vr}%→{y.toFixed(1)}%</span>;
          })}
        </div>

        <p className="text-[10px] text-zinc-600">Condomínio: pago pelo inquilino. IPTU e IR estimados. Selic: {SELIC}% (Mar/2025).</p>
      </div>
    </div>
  );
}

function NotePopup({
  propertyId,
  initialNote,
  onSave,
  onClose,
}: {
  propertyId: number;
  initialNote: string;
  onSave: (note: string | null) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(initialNote);
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/properties/${propertyId}/notes`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: text }),
      });
      if (res.ok) {
        const json = await res.json() as { note: string | null };
        onSave(json.note);
        onClose();
      }
    } catch {
      // silently ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div ref={ref} className="absolute left-0 top-full mt-1 z-[100] bg-zinc-950 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-xl p-3 w-72 text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">Nota</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
      </div>
      <textarea
        className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-xs text-zinc-200 resize-none focus:outline-none focus:border-zinc-500"
        rows={4}
        placeholder="Adicione uma nota sobre este imóvel..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <div className="flex gap-2 mt-2 justify-end">
        <button
          onClick={onClose}
          className="px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200"
        >
          Cancelar
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="px-3 py-1 text-xs bg-blue-700 hover:bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page (inner — needs Suspense because of useSearchParams)
// ---------------------------------------------------------------------------
function ImoveisPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desconto");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filterCidades, setFilterCidades] = useState<string[]>([]);
  const [filterTipos, setFilterTipos] = useState<string[]>([]);
  const [filterModalidades, setFilterModalidades] = useState<string[]>([]);
  const [filterDescontoMin, setFilterDescontoMin] = useState("");
  const [filterPrecoMax, setFilterPrecoMax] = useState("");
  const [filterPrecoMin, setFilterPrecoMin] = useState("");
  const [filterDistancia, setFilterDistancia] = useState("");
  const [globalPeriod, setGlobalPeriod] = useState(12);
  const [precoMaxMode, setPrecoMaxMode] = useState<"preset" | "custom">("preset");
  const [customPrecoMin, setCustomPrecoMin] = useState("");
  const [customPrecoMax, setCustomPrecoMax] = useState("");
  // Map of propertyId -> favoriteId (present means favorited)
  const [favorited, setFavorited] = useState<Record<number, number>>({});
  const [expandedComparables, setExpandedComparables] = useState<string | null>(null); // "colId:propId"
  const [expandedRent, setExpandedRent] = useState<number | null>(null);
  const [expandedYield, setExpandedYield] = useState<number | null>(null);
  const [expandedScore, setExpandedScore] = useState<number | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
  const [showHidden, setShowHidden] = useState(true);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [expandedNote, setExpandedNote] = useState<number | null>(null);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("caixa-imoveis-col-widths");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const columnSettingsRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<{ colId: string; startX: number; startW: number } | null>(null);
  const [savedPresets, setSavedPresets] = useState<SavedFilterPreset[]>([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const savePopupRef = useRef<HTMLDivElement>(null);

  // Recalculated ITBI values keyed by propertyId, updated when globalPeriod changes
  const [recalculatedValues, setRecalculatedValues] = useState<
    Record<number, { marketValue: string | null; marketValuePerM2: string | null; comparablesCount: number }>
  >({});
  const [recalculating, setRecalculating] = useState(false);

  // Drag-and-drop column reorder state
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // Score popup click-outside ref
  const scorePopupRef = useRef<HTMLDivElement>(null);
  useClickOutside(scorePopupRef, () => setExpandedScore(null));

  // Helper to push URL params without navigation
  const syncUrl = useCallback((overrides?: {
    page?: number;
    sort?: string;
    order?: string;
    search?: string;
    filterCidades?: string[];
    filterTipos?: string[];
    filterModalidades?: string[];
    filterDescontoMin?: string;
    filterPrecoMax?: string;
    filterPrecoMin?: string;
    filterDistancia?: string;
    showHidden?: boolean;
  }) => {
    const s = overrides?.sort ?? sort;
    const o = overrides?.order ?? order;
    const q = overrides?.search ?? search;
    const p = overrides?.page ?? 1;
    const cidades = overrides?.filterCidades ?? filterCidades;
    const tipos = overrides?.filterTipos ?? filterTipos;
    const modalidades = overrides?.filterModalidades ?? filterModalidades;
    const descontoMin = overrides?.filterDescontoMin ?? filterDescontoMin;
    const precoMax = overrides?.filterPrecoMax ?? filterPrecoMax;
    const precoMin = overrides?.filterPrecoMin ?? filterPrecoMin;
    const dist = overrides?.filterDistancia ?? filterDistancia;
    const hidden = overrides?.showHidden ?? showHidden;

    const params = new URLSearchParams();
    if (p > 1) params.set("page", String(p));
    if (s && s !== "desconto") params.set("sort", s);
    if (o && o !== "desc") params.set("order", o);
    if (q) params.set("q", q);
    if (cidades.length > 0) params.set("cidade", cidades.join(","));
    if (tipos.length > 0) params.set("tipo", tipos.join(","));
    if (modalidades.length > 0) params.set("modalidade", modalidades.join(","));
    if (descontoMin) params.set("desconto_min", descontoMin);
    if (precoMax) params.set("preco_max", precoMax);
    if (precoMin) params.set("preco_min", precoMin);
    if (dist) params.set("max_distance", dist);
    if (!hidden) params.set("hidden", "false");
    const qs = params.toString();
    router.replace(qs ? `/imoveis?${qs}` : "/imoveis", { scroll: false });
  }, [sort, order, search, filterCidades, filterTipos, filterModalidades, filterDescontoMin, filterPrecoMax, filterPrecoMin, filterDistancia, showHidden, router]);

  // Load saved filters and column config from localStorage on mount
  useEffect(() => {
    try {
      // Read URL params first (highest priority)
      const urlSort = searchParams.get("sort");
      const urlOrder = searchParams.get("order");
      const urlQ = searchParams.get("q");
      const urlCidade = searchParams.get("cidade");
      const urlTipo = searchParams.get("tipo");
      const urlModalidade = searchParams.get("modalidade");
      const urlDescontoMin = searchParams.get("desconto_min");
      const urlPrecoMax = searchParams.get("preco_max");
      const urlPrecoMin = searchParams.get("preco_min");
      const urlDistance = searchParams.get("max_distance");
      const urlHidden = searchParams.get("hidden");
      const urlPage = searchParams.get("page");

      const hasUrlFilters = urlCidade || urlTipo || urlModalidade || urlDescontoMin || urlPrecoMax || urlPrecoMin || urlSort || urlOrder || urlQ || urlDistance || urlHidden || urlPage;

      if (hasUrlFilters) {
        // Apply URL params
        if (urlSort) setSort(urlSort);
        if (urlOrder) setOrder(urlOrder as "asc" | "desc");
        if (urlQ) setSearch(urlQ);
        if (urlDistance) setFilterDistancia(urlDistance);
        if (urlHidden === "false") setShowHidden(false);
        if (urlCidade) setFilterCidades(urlCidade.split(",").filter(Boolean));
        if (urlTipo) setFilterTipos(urlTipo.split(",").filter(Boolean));
        if (urlModalidade) setFilterModalidades(urlModalidade.split(",").filter(Boolean));
        if (urlDescontoMin) setFilterDescontoMin(urlDescontoMin);
        if (urlPrecoMax) {
          setFilterPrecoMax(urlPrecoMax);
          const presetValues = ["50000", "100000", "200000", "500000", "1000000"];
          if (!presetValues.includes(urlPrecoMax)) {
            setPrecoMaxMode("custom");
            setCustomPrecoMax(urlPrecoMax);
          }
        }
        if (urlPrecoMin) {
          setFilterPrecoMin(urlPrecoMin);
          setPrecoMaxMode("custom");
          setCustomPrecoMin(urlPrecoMin);
        }
      } else {
        // Fall back to localStorage: check for a default preset first
        const presetsRaw = localStorage.getItem(SAVED_FILTERS_KEY);
        const presets: SavedFilterPreset[] = presetsRaw ? JSON.parse(presetsRaw) : [];
        const defaultPreset = presets.find((p) => p.isDefault);
        if (defaultPreset) {
          setFilterCidades(defaultPreset.filters.cidades);
          setFilterTipos(defaultPreset.filters.tipos);
          setFilterModalidades(defaultPreset.filters.modalidades);
          setFilterDescontoMin(defaultPreset.filters.descontoMin);
          setFilterPrecoMax(defaultPreset.filters.precoMax);
          setFilterPrecoMin(defaultPreset.filters.precoMin || "");
          setShowHidden(defaultPreset.filters.showHidden);
        } else {
          // Legacy single-filter key
          const saved = localStorage.getItem(FILTERS_KEY);
          if (saved) {
            const filters = JSON.parse(saved) as {
              cidades?: string[];
              tipos?: string[];
              modalidades?: string[];
              cidade?: string;
              tipo?: string;
              modalidade?: string;
              descontoMin?: string;
              precoMax?: string;
              showHidden?: boolean;
            };
            if (filters.cidades !== undefined) setFilterCidades(filters.cidades);
            else if (filters.cidade) setFilterCidades([filters.cidade]);
            if (filters.tipos !== undefined) setFilterTipos(filters.tipos);
            else if (filters.tipo) setFilterTipos([filters.tipo]);
            if (filters.modalidades !== undefined) setFilterModalidades(filters.modalidades);
            else if (filters.modalidade) setFilterModalidades([filters.modalidade]);
            if (filters.descontoMin !== undefined) setFilterDescontoMin(filters.descontoMin);
            if (filters.precoMax !== undefined) setFilterPrecoMax(filters.precoMax);
            if (filters.showHidden !== undefined) setShowHidden(filters.showHidden);
          }
        }
      }

      // Always load presets list, notifications, columns
      const presetsRaw = localStorage.getItem(SAVED_FILTERS_KEY);
      if (presetsRaw) setSavedPresets(JSON.parse(presetsRaw) as SavedFilterPreset[]);
      const notif = localStorage.getItem(NOTIFICATIONS_KEY);
      if (notif !== null) setNotificationsEnabled(JSON.parse(notif) as boolean);
      const cols = localStorage.getItem(COLUMNS_KEY);
      if (cols) {
        const parsed = JSON.parse(cols) as string[];
        const validIds = new Set(ALL_COLUMNS.map((c) => c.id as string));
        const filtered = parsed.filter((id) => validIds.has(id));
        // Auto-add new default-visible columns that weren't in the saved set
        const savedSet = new Set(filtered);
        const newCols = ALL_COLUMNS.filter((c) => c.defaultVisible && !savedSet.has(c.id as string)).map((c) => c.id as string);
        if (newCols.length > 0) filtered.push(...newCols);
        if (filtered.length > 0) setVisibleColumns(filtered);
      }
    } catch {
      // ignore
    }
    setFiltersLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveColumns = useCallback((cols: string[]) => {
    setVisibleColumns(cols);
    try {
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(cols));
    } catch {
      // ignore
    }
  }, []);

  const handleSaveFilterPreset = (name: string) => {
    const newPreset: SavedFilterPreset = {
      name,
      isDefault: false,
      filters: {
        cidades: filterCidades,
        tipos: filterTipos,
        modalidades: filterModalidades,
        descontoMin: filterDescontoMin,
        precoMax: filterPrecoMax,
        precoMin: filterPrecoMin,
        showHidden,
      },
    };
    const updated = [...savedPresets.filter((p) => p.name !== name), newPreset];
    setSavedPresets(updated);
    try {
      localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    setShowSavePopup(false);
  };

  const handleDeletePreset = (name: string) => {
    const updated = savedPresets.filter((p) => p.name !== name);
    setSavedPresets(updated);
    try {
      localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSetDefaultPreset = (name: string) => {
    const updated = savedPresets.map((p) => ({
      ...p,
      isDefault: p.name === name ? !p.isDefault : false,
    }));
    setSavedPresets(updated);
    try {
      localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleApplyPreset = (preset: SavedFilterPreset) => {
    setFilterCidades(preset.filters.cidades);
    setFilterTipos(preset.filters.tipos);
    setFilterModalidades(preset.filters.modalidades);
    setFilterDescontoMin(preset.filters.descontoMin);
    setFilterPrecoMax(preset.filters.precoMax);
    setFilterPrecoMin(preset.filters.precoMin || "");
    setShowHidden(preset.filters.showHidden);
    syncUrl({
      filterCidades: preset.filters.cidades,
      filterTipos: preset.filters.tipos,
      filterModalidades: preset.filters.modalidades,
      filterDescontoMin: preset.filters.descontoMin,
      filterPrecoMax: preset.filters.precoMax,
      filterPrecoMin: preset.filters.precoMin || "",
    });
  };

  const toggleNotifications = () => {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const fetchData = useCallback(
    async (page = 1) => {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: "50",
        sort,
        order,
      });
      if (search) params.set("q", search);
      if (filterCidades.length > 0) params.set("cidade", filterCidades.join(","));
      if (filterTipos.length > 0) params.set("tipo", filterTipos.join(","));
      if (filterModalidades.length > 0) params.set("modalidade", filterModalidades.join(","));
      if (filterDescontoMin) params.set("desconto_min", filterDescontoMin);
      if (filterPrecoMax) params.set("preco_max", filterPrecoMax);
      if (filterPrecoMin) params.set("preco_min", filterPrecoMin);
      if (filterDistancia) params.set("max_distance", filterDistancia);

      try {
        const res = await fetch(`/api/properties?${params}`, {
          credentials: "include",
        });
        const json = await res.json();
        setData(json.data || []);
        setPagination(json.pagination || { page: 1, limit: 50, total: 0, pages: 0 });
        // Clear recalculated values so they get refreshed for the new page
        setRecalculatedValues({});
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [sort, order, search, filterCidades, filterTipos, filterModalidades, filterDescontoMin, filterPrecoMax, filterPrecoMin, filterDistancia]
  );

  // Load which properties are hidden
  const loadHidden = useCallback(async () => {
    try {
      const res = await fetch("/api/hidden", { credentials: "include" });
      if (!res.ok) return;
      const json = await res.json() as { ids: number[] };
      setHiddenIds(new Set(json.ids));
    } catch {
      // silently ignore
    }
  }, []);

  // Load all notes
  const loadNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes", { credentials: "include" });
      if (!res.ok) return;
      const json = await res.json() as { notes: Record<string, string> };
      const map: Record<number, string> = {};
      for (const [k, v] of Object.entries(json.notes)) {
        map[parseInt(k, 10)] = v;
      }
      setNotes(map);
    } catch {
      // silently ignore
    }
  }, []);

  const toggleHidden = async (propertyId: number) => {
    try {
      const res = await fetch(`/api/properties/${propertyId}/hide`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return;
      const json = await res.json() as { hidden: boolean };
      setHiddenIds((prev) => {
        const next = new Set(prev);
        if (json.hidden) {
          next.add(propertyId);
        } else {
          next.delete(propertyId);
        }
        return next;
      });
    } catch {
      // silently ignore
    }
  };

  // Load which properties are favorited
  const loadFavorites = useCallback(async () => {
    try {
      const res = await fetch("/api/favorites", { credentials: "include" });
      if (!res.ok) return;
      const favs = await res.json() as Array<{ id: number; propertyId: number }>;
      const map: Record<number, number> = {};
      for (const f of favs) {
        map[f.propertyId] = f.id;
      }
      setFavorited(map);
    } catch {
      // silently ignore
    }
  }, []);

  const toggleFavorite = async (propertyId: number) => {
    try {
      const res = await fetch(`/api/properties/${propertyId}/favorite`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return;
      const json = await res.json() as { favorited: boolean; favoriteId?: number };
      setFavorited((prev) => {
        const next = { ...prev };
        if (json.favorited && json.favoriteId != null) {
          next[propertyId] = json.favoriteId;
        } else {
          delete next[propertyId];
        }
        return next;
      });
    } catch {
      // silently ignore
    }
  };

  useEffect(() => {
    if (filtersLoaded) fetchData(1);
  }, [fetchData, filtersLoaded]);

  // Sync URL whenever filter state changes (skip on first render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!filtersLoaded) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    syncUrl();
  }, [filtersLoaded, sort, order, search, filterCidades, filterTipos, filterModalidades, filterDescontoMin, filterPrecoMax, filterPrecoMin, filterDistancia, showHidden, syncUrl]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    loadHidden();
  }, [loadHidden]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Recalculate ITBI values for the current page whenever globalPeriod or data changes
  useEffect(() => {
    if (data.length === 0) return;
    // Only recalculate for properties that have ITBI data (marketValue or marketValuePerM2)
    const idsWithItbi = data
      .filter((p) => p.marketValue || p.marketValuePerM2)
      .map((p) => p.id);
    if (idsWithItbi.length === 0) return;

    setRecalculating(true);
    fetch("/api/properties/recalculate", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyIds: idsWithItbi, months: globalPeriod }),
    })
      .then((r) => r.json())
      .then((json: { recalculated?: Record<number, { marketValue: string | null; marketValuePerM2: string | null; comparablesCount: number }> }) => {
        if (json.recalculated) {
          setRecalculatedValues(json.recalculated);
        }
      })
      .catch(() => {})
      .finally(() => setRecalculating(false));
  }, [data, globalPeriod]);

  const handleSort = (col: string) => {
    const newOrder = sort === col ? (order === "desc" ? "asc" : "desc") : "desc";
    const newSort = col;
    setSort(newSort);
    setOrder(newOrder);
    // Build URL directly to avoid stale-closure issues with syncUrl
    const params = new URLSearchParams();
    if (newSort && newSort !== "desconto") params.set("sort", newSort);
    if (newOrder && newOrder !== "desc") params.set("order", newOrder);
    if (search) params.set("q", search);
    if (filterCidades.length > 0) params.set("cidade", filterCidades.join(","));
    if (filterTipos.length > 0) params.set("tipo", filterTipos.join(","));
    if (filterModalidades.length > 0) params.set("modalidade", filterModalidades.join(","));
    if (filterDescontoMin) params.set("desconto_min", filterDescontoMin);
    if (filterPrecoMax) params.set("preco_max", filterPrecoMax);
    if (filterPrecoMin) params.set("preco_min", filterPrecoMin);
    if (filterDistancia) params.set("max_distance", filterDistancia);
    if (!showHidden) params.set("hidden", "false");
    const qs = params.toString();
    const newUrl = qs ? `/imoveis?${qs}` : "/imoveis";
    // Use history API directly for immediate URL update (router.replace may be async)
    window.history.replaceState(null, "", newUrl);
  };

  const sortIcon = (col: string) => {
    if (sort !== col) return "";
    return order === "desc" ? " ↓" : " ↑";
  };

  const hasActiveFilters =
    filterCidades.length > 0 ||
    filterTipos.length > 0 ||
    filterModalidades.length > 0 ||
    filterDescontoMin !== "" ||
    filterPrecoMax !== "" ||
    filterPrecoMin !== "" ||
    filterDistancia !== "";

  const applyCustomPrice = () => {
    setFilterPrecoMin(customPrecoMin);
    setFilterPrecoMax(customPrecoMax);
  };

  // ---------------------------------------------------------------------------
  // Render a single cell by columnId
  // ---------------------------------------------------------------------------
  const renderCell = (colId: string, p: Property) => {
    const isHidden = hiddenIds.has(p.id);
    switch (colId) {
      case "foto":
        return (
          <TableCell key={colId} className="w-24 px-1 relative group/img">
            {p.fotoUrl ? (
              <>
                <img
                  src={p.fotoUrl}
                  alt=""
                  className="w-20 h-14 rounded object-cover"
                  loading="lazy"
                />
                <div className="hidden group-hover/img:block absolute left-full top-0 ml-2 z-[200] pointer-events-none">
                  <img
                    src={p.fotoUrl}
                    alt=""
                    className="max-w-[500px] max-h-[400px] rounded-lg object-contain bg-zinc-950 shadow-2xl border-2 border-zinc-600 p-1"
                  />
                </div>
              </>
            ) : (
              <div className="w-8 h-6 rounded bg-zinc-800" />
            )}
          </TableCell>
        );

      case "actions":
        return (
          <TableCell key={colId} className="w-20 px-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleFavorite(p.id)}
                className={`transition-colors ${
                  favorited[p.id]
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-zinc-600 hover:text-zinc-400"
                }`}
                title={favorited[p.id] ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Star
                  className="w-4 h-4"
                  fill={favorited[p.id] ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={() => toggleHidden(p.id)}
                className={`transition-colors ${
                  isHidden
                    ? "text-zinc-400 hover:text-zinc-200"
                    : "text-zinc-700 hover:text-zinc-500"
                }`}
                title={isHidden ? "Mostrar imóvel" : "Ocultar imóvel"}
              >
                {isHidden ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setExpandedNote(expandedNote === p.id ? null : p.id)}
                  className={`transition-colors ${
                    notes[p.id]
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-zinc-700 hover:text-zinc-500"
                  }`}
                  title={notes[p.id] ? notes[p.id].slice(0, 60) : "Adicionar nota"}
                >
                  <MessageSquare
                    className="w-4 h-4"
                    fill={notes[p.id] ? "currentColor" : "none"}
                  />
                </button>
                {expandedNote === p.id && (
                  <NotePopup
                    propertyId={p.id}
                    initialNote={notes[p.id] ?? ""}
                    onSave={(note) => {
                      setNotes((prev) => {
                        const next = { ...prev };
                        if (note === null) {
                          delete next[p.id];
                        } else {
                          next[p.id] = note;
                        }
                        return next;
                      });
                    }}
                    onClose={() => setExpandedNote(null)}
                  />
                )}
              </div>
            </div>
          </TableCell>
        );

      case "cidade":
        return (
          <TableCell key={colId} className="font-medium">
            <Link href={`/imoveis/${p.id}`} className="hover:text-blue-400 transition-colors">
              {p.cidade}
            </Link>
          </TableCell>
        );

      case "bairro":
        return (
          <TableCell key={colId} className="text-zinc-400">
            {p.bairro || "—"}
          </TableCell>
        );

      case "tipo": {
        const flagLabel: Record<string, string> = {
          suspicious_area: "Area suspeita (valor pode estar incorreto)",
          suspicious_price: "Preco/m\u00b2 suspeito (< R$ 100/m\u00b2)",
          suspicious_discount: "Desconto suspeito (> 95%)",
        };
        const flagText = p.dataQualityFlag ? flagLabel[p.dataQualityFlag] ?? p.dataQualityFlag : null;
        return (
          <TableCell key={colId} className="text-zinc-400 text-xs">
            <span className="flex items-center gap-1">
              {p.tipoImovel || p.descricao || "\u2014"}
              {flagText && (
                <span title={flagText} className="text-yellow-400 shrink-0">
                  <AlertTriangle className="w-3 h-3" />
                </span>
              )}
            </span>
          </TableCell>
        );
      }

      case "preco":
        return (
          <TableCell key={colId} className="text-right">
            {formatBRL(p.preco)}
          </TableCell>
        );

      case "precoM2":
        return (
          <TableCell key={colId} className="text-right text-zinc-500 text-xs">
            {p.preco && p.areaPrivativaM2 && parseFloat(p.areaPrivativaM2) > 0
              ? `R$\u00a0${Math.round(parseFloat(p.preco) / parseFloat(p.areaPrivativaM2)).toLocaleString("pt-BR")}`
              : "—"}
          </TableCell>
        );

      case "avaliacao":
        return (
          <TableCell key={colId} className="text-right text-zinc-400">
            {formatBRL(p.valorAvaliacao)}
          </TableCell>
        );

      case "quartos":
        return (
          <TableCell key={colId} className="text-right text-zinc-400">
            {p.quartos ?? "—"}
          </TableCell>
        );

      case "areaPriv":
        return (
          <TableCell key={colId} className="text-right text-zinc-400">
            {p.areaPrivativaM2 && parseFloat(p.areaPrivativaM2) > 0 ? Math.round(parseFloat(p.areaPrivativaM2)) : "—"}
          </TableCell>
        );

      case "areaTotal":
        return (
          <TableCell key={colId} className="text-right text-zinc-400">
            {p.areaTotalM2 && parseFloat(p.areaTotalM2) > 0 ? Math.round(parseFloat(p.areaTotalM2)) : "—"}
          </TableCell>
        );

      case "desconto":
        return (
          <TableCell key={colId} className="text-right">
            {p.desconto ? (
              <Badge
                variant={parseFloat(p.desconto) >= 40 ? "default" : "secondary"}
                className={parseFloat(p.desconto) >= 40 ? "bg-green-900 text-green-300" : ""}
              >
                {parseFloat(p.desconto).toFixed(0)}%
              </Badge>
            ) : (
              "—"
            )}
          </TableCell>
        );

      case "descontoMercado": {
        const recalcDm = recalculatedValues[p.id];
        const dmv = (recalcDm ? recalcDm.marketValue : p.marketValue) || p.zapMarketValue;
        return (
          <TableCell key={colId} className="text-right">
            {dmv && p.preco ? (() => {
              const mv = parseFloat(dmv);
              const preco = parseFloat(p.preco);
              const pct = ((1 - preco / mv) * 100);
              const label = pct >= 0 ? `${pct.toFixed(0)}%` : `+${Math.abs(pct).toFixed(0)}%`;
              return (
                <Badge className={pct > 20 ? "bg-green-900 text-green-300" : pct > 0 ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}>
                  {label}
                </Badge>
              );
            })() : (
              <span className="text-zinc-600">—</span>
            )}
          </TableCell>
        );
      }

      case "modalidade":
        return (
          <TableCell key={colId} className="text-zinc-400 text-xs max-w-[120px] truncate">
            {p.modalidadeVenda || "—"}
          </TableCell>
        );

      case "score":
        return (
          <TableCell key={colId} className="relative">
            {p.score ? (
              <>
                <button
                  onClick={() => setExpandedScore(expandedScore === p.id ? null : p.id)}
                  className="font-mono text-sm cursor-pointer hover:underline"
                >
                  {parseFloat(p.score).toFixed(0)}
                </button>
                {expandedScore === p.id && p.scoreDetails && (
                  <div ref={scorePopupRef} className="absolute right-0 top-full mt-1 z-[100] bg-zinc-950 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-xl p-3 w-[280px] text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-zinc-300">Score: {parseFloat(p.score).toFixed(1)}</span>
                      <button onClick={() => setExpandedScore(null)} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
                    </div>
                    <div className="space-y-1.5">
                      {Object.entries(p.scoreDetails)
                        .filter(([k]) => k !== "total")
                        .map(([k, v]) => {
                          const labels: Record<string, string> = {
                            discount: "Desconto",
                            priceEfficiency: "Preço vs cidade",
                            financing: "Financiamento",
                            propertyType: "Tipo imóvel",
                            areaValue: "Valor/m²",
                            daysOnMarket: "Dias mercado",
                            crimeSafety: "Segurança",
                          };
                          const weights: Record<string, number> = {
                            discount: 25, priceEfficiency: 20, financing: 15,
                            propertyType: 10, areaValue: 15, daysOnMarket: 5, crimeSafety: 10,
                          };
                          const val = typeof v === "number" ? v : 0;
                          const w = weights[k] || 0;
                          return (
                            <div key={k} className="flex items-center gap-2 text-xs">
                              <span className="w-20 text-zinc-400 truncate">{labels[k] || k}</span>
                              <div className="flex-1 h-2 bg-zinc-800 rounded overflow-hidden">
                                <div className="h-full rounded" style={{
                                  width: `${val}%`,
                                  backgroundColor: val >= 70 ? "#22c55e" : val >= 40 ? "#eab308" : "#ef4444"
                                }} />
                              </div>
                              <span className="w-8 text-right text-zinc-500">{val.toFixed(0)}</span>
                              <span className="w-6 text-right text-zinc-600">{w}%</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              "—"
            )}
          </TableCell>
        );

      case "crime":
        return (
          <TableCell key={colId}>
            {p.crimeRate ? (() => {
              const rate = parseFloat(p.crimeRate);
              const label = `${Math.round(rate).toLocaleString("pt-BR")}/100k`;
              let bg: string, text: string;
              if (rate < 3000) {
                bg = "bg-green-900"; text = "text-green-300";
              } else if (rate < 5000) {
                bg = "bg-emerald-900"; text = "text-emerald-300";
              } else if (rate < 7000) {
                bg = "bg-yellow-900"; text = "text-yellow-300";
              } else if (rate < 9000) {
                bg = "bg-orange-900"; text = "text-orange-300";
              } else if (rate < 12000) {
                bg = "bg-red-900"; text = "text-red-300";
              } else {
                bg = "bg-red-950"; text = "text-red-400";
              }
              const citySlug = p.cidade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-");
              const bairroSlug = p.bairro ? p.bairro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-") : "";
              const crimeUrl = bairroSlug
                ? `https://crimebrasil.com.br/bairro/rs/${citySlug}/${bairroSlug}`
                : `https://crimebrasil.com.br/cidade/rs/${citySlug}`;
              return (
                <a href={crimeUrl} target="_blank" rel="noopener noreferrer" title={`Ver criminalidade em ${p.bairro || p.cidade} no Crime Brasil`}>
                  <Badge className={`${bg} ${text} hover:opacity-80 cursor-pointer`}>
                    {label}
                  </Badge>
                </a>
              );
            })() : (
              <span className="text-zinc-500">—</span>
            )}
          </TableCell>
        );

      case "valorMercado": {
        const recalc = recalculatedValues[p.id];
        const displayMarketValue = recalc ? recalc.marketValue : p.marketValue;
        const displayCount = recalc ? recalc.comparablesCount : p.comparablesCount;
        return (
          <TableCell key={colId} className="text-right relative">
            {displayMarketValue && p.preco ? (() => {
              const mv = parseFloat(displayMarketValue);
              const preco = parseFloat(p.preco);
              const isGoodDeal = preco < mv;
              return (
                <button
                  onClick={() => setExpandedComparables(expandedComparables === "valorMercado:" + p.id ? null : "valorMercado:" + p.id)}
                  className={`cursor-pointer hover:underline text-left ${isGoodDeal ? "text-green-400 font-medium" : "text-zinc-400"}`}
                >
                  {formatBRL(displayMarketValue)}
                  {displayCount ? <span className="text-xs text-zinc-600 ml-1">({displayCount})</span> : null}
                </button>
              );
            })() : (
              <span className="text-zinc-600">—</span>
            )}
            {expandedComparables === "valorMercado:" + p.id && (
              <ComparablesPopup propertyId={p.id} months={globalPeriod} onClose={() => setExpandedComparables(null)} />
            )}
          </TableCell>
        );
      }

      case "zapValor":
        return (
          <TableCell key={colId} className="text-right relative">
            {p.zapMarketValue && p.preco ? (() => {
              const mv = parseFloat(p.zapMarketValue);
              const preco = parseFloat(p.preco);
              const isGoodDeal = preco < mv;
              return (
                <button
                  onClick={() => setExpandedComparables(expandedComparables === "zapValor:" + p.id ? null : "zapValor:" + p.id)}
                  className={`cursor-pointer hover:underline text-left ${isGoodDeal ? "text-green-400 font-medium" : "text-zinc-400"}`}
                >
                  {formatBRL(p.zapMarketValue)}
                  {p.zapComparablesCount ? <span className={`text-xs ml-1 ${p.zapComparablesCount <= 2 ? "text-orange-500" : "text-zinc-600"}`}>({p.zapComparablesCount})</span> : null}
                </button>
              );
            })() : (
              <span className="text-zinc-600">—</span>
            )}
            {expandedComparables === "zapValor:" + p.id && (
              <ComparablesPopup propertyId={p.id} source="zap" months={globalPeriod} onClose={() => setExpandedComparables(null)} />
            )}
          </TableCell>
        );

      case "mercadoM2": {
        const recalcM2 = recalculatedValues[p.id];
        const displayM2 = recalcM2 ? recalcM2.marketValuePerM2 : p.marketValuePerM2;
        return (
          <TableCell key={colId} className="text-right relative">
            {displayM2 ? (
              <button
                onClick={() => setExpandedComparables(expandedComparables === "mercadoM2:" + p.id ? null : "mercadoM2:" + p.id)}
                className="text-zinc-400 text-sm cursor-pointer hover:underline"
              >
                R$&nbsp;{Math.round(parseFloat(displayM2)).toLocaleString("pt-BR")}
              </button>
            ) : (
              <span className="text-zinc-600">—</span>
            )}
            {expandedComparables === "mercadoM2:" + p.id && (
              <ComparablesPopup propertyId={p.id} months={globalPeriod} onClose={() => setExpandedComparables(null)} />
            )}
          </TableCell>
        );
      }

      case "zapM2":
        return (
          <TableCell key={colId} className="text-right relative">
            {p.zapMarketValuePerM2 ? (
              <button
                onClick={() => setExpandedComparables(expandedComparables === "zapM2:" + p.id ? null : "zapM2:" + p.id)}
                className="text-zinc-400 text-sm cursor-pointer hover:underline"
              >
                R$&nbsp;{Math.round(parseFloat(p.zapMarketValuePerM2)).toLocaleString("pt-BR")}
                {p.zapComparablesCount ? (
                  <span className="text-xs text-zinc-600 ml-1">({p.zapComparablesCount})</span>
                ) : null}
              </button>
            ) : (
              <span className="text-zinc-600">—</span>
            )}
            {expandedComparables === "zapM2:" + p.id && (
              <ComparablesPopup propertyId={p.id} source="zap" months={globalPeriod} onClose={() => setExpandedComparables(null)} />
            )}
          </TableCell>
        );

      case "qaValor":
        return (
          <TableCell key={colId} className="text-right relative">
            {p.qaMarketValue && p.preco ? (() => {
              const mv = parseFloat(p.qaMarketValue);
              const preco = parseFloat(p.preco);
              const isGoodDeal = preco < mv;
              return (
                <button
                  onClick={() => setExpandedComparables(expandedComparables === "qa:" + p.id ? null : "qa:" + p.id)}
                  className={`cursor-pointer hover:underline ${isGoodDeal ? "text-green-400 font-medium" : "text-zinc-400"}`}
                >
                  {formatBRL(p.qaMarketValue)}
                  <span className="text-[10px] text-zinc-500 ml-1">(ajust.)</span>
                  {p.qaComparablesCount ? <span className="text-xs text-zinc-600 ml-1">({p.qaComparablesCount})</span> : null}
                </button>
              );
            })() : (
              <span className="text-zinc-600">—</span>
            )}
            {expandedComparables === "qa:" + p.id && (
              <ComparablesPopup propertyId={p.id} source="qa" months={globalPeriod} onClose={() => setExpandedComparables(null)} />
            )}
          </TableCell>
        );

      case "aluguel":
        return (
          <TableCell key={colId} className="text-right relative">
            {p.zapRentValue ? (
              <button
                onClick={() => setExpandedRent(expandedRent === p.id ? null : p.id)}
                className="text-zinc-300 cursor-pointer hover:underline text-left"
              >
                {formatBRL(p.zapRentValue)}
                <span className="text-zinc-600 text-xs">/mês</span>
                {p.zapComparablesCount ? <span className={`text-xs ml-1 ${p.zapComparablesCount <= 2 ? "text-orange-500" : "text-zinc-600"}`}>({p.zapComparablesCount})</span> : null}
              </button>
            ) : (
              <span className="text-zinc-600">—</span>
            )}
            {expandedRent === p.id && (
              <RentPopup
                propertyId={p.id}
                months={globalPeriod}
                propertyPrice={p.preco ? parseFloat(p.preco) : 0}
                onClose={() => setExpandedRent(null)}
              />
            )}
          </TableCell>
        );

      case "qaAluguel":
        return (
          <TableCell key={colId} className="text-right">
            {p.qaRentValue ? (
              <span className="text-zinc-300">
                {formatBRL(p.qaRentValue)}
                <span className="text-zinc-600 text-xs">/mês</span>
              </span>
            ) : (
              <span className="text-zinc-600">—</span>
            )}
          </TableCell>
        );

      case "yield": {
        const rentVal = p.zapRentValue ? parseFloat(p.zapRentValue) : 0;
        const precoVal = p.preco ? parseFloat(p.preco) : 0;
        if (!rentVal || !precoVal) return <TableCell key={colId} className="text-zinc-600 text-right">—</TableCell>;
        const yieldPct = (rentVal * 12 / precoVal) * 100;
        const color = yieldPct >= 8 ? "text-green-400 font-medium" : yieldPct >= 5 ? "text-yellow-400" : "text-zinc-400";
        return (
          <TableCell key={colId} className={`text-right relative ${color}`}>
            <button
              onClick={() => setExpandedYield(expandedYield === p.id ? null : p.id)}
              className="cursor-pointer hover:underline"
            >
              {yieldPct.toFixed(1)}%
            </button>
            {expandedYield === p.id && (
              <YieldPopup
                preco={precoVal}
                aluguelMensal={rentVal}
                valorAvaliacao={p.valorAvaliacao ? parseFloat(p.valorAvaliacao) : 0}
                onClose={() => setExpandedYield(null)}
              />
            )}
          </TableCell>
        );
      }

      case "link":
        return (
          <TableCell key={colId}>
            {p.linkCaixa ? (
              <a
                href={p.linkCaixa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs"
              >
                Ver
              </a>
            ) : (
              "—"
            )}
          </TableCell>
        );

      case "distancia": {
        if (!p.lat || !p.lng) return <TableCell key={colId} className="text-zinc-600 text-xs">—</TableCell>;
        const lat = parseFloat(p.lat);
        const lng = parseFloat(p.lng);
        const POA_LAT = -30.0346;
        const POA_LNG = -51.2177;
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const dLat = toRad(lat - POA_LAT);
        const dLng = toRad(lng - POA_LNG);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(POA_LAT)) * Math.cos(toRad(lat)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const distKm = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (
          <TableCell key={colId} className="text-right text-zinc-400 text-xs">
            {distKm.toFixed(0)}km
          </TableCell>
        );
      }

      case "adicionado": {
        if (!p.firstSeenAt) return <TableCell key={colId} className="text-zinc-600 text-xs">—</TableCell>;
        const d = new Date(p.firstSeenAt);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
        const label = diffDays === 0 ? "Hoje" : diffDays === 1 ? "Ontem" : `${diffDays}d`;
        const dateStr = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
        return (
          <TableCell key={colId} className="text-xs text-zinc-400" title={dateStr}>
            <span className={diffDays <= 1 ? "text-green-400 font-medium" : diffDays <= 7 ? "text-blue-400" : ""}>
              {label}
            </span>
            <span className="text-zinc-600 ml-1">{dateStr}</span>
          </TableCell>
        );
      }

      default:
        return <TableCell key={colId} />;
    }
  };

  // ---------------------------------------------------------------------------
  // Render a column header by columnId
  // ---------------------------------------------------------------------------
  const onResizeStart = (colId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const th = (e.target as HTMLElement).closest("th");
    const startW = th?.offsetWidth || 100;
    resizingRef.current = { colId, startX: e.clientX, startW };

    const onMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const diff = ev.clientX - resizingRef.current.startX;
      const newW = Math.max(40, resizingRef.current.startW + diff);
      setColumnWidths((prev) => {
        const next = { ...prev, [colId]: newW };
        localStorage.setItem("caixa-imoveis-col-widths", JSON.stringify(next));
        return next;
      });
    };
    const onUp = () => {
      resizingRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const resizeHandle = (colId: string) => (
    <div
      onMouseDown={(e) => onResizeStart(colId, e)}
      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/50 active:bg-blue-500"
      style={{ zIndex: 10 }}
    />
  );

  const NON_DRAGGABLE = ["foto", "actions"];

  const handleDragStart = (colId: string) => {
    if (NON_DRAGGABLE.includes(colId)) return;
    setDragCol(colId);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    if (NON_DRAGGABLE.includes(colId) || colId === dragCol) return;
    e.preventDefault();
    setDragOverCol(colId);
  };

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    if (!dragCol || dragCol === targetColId || NON_DRAGGABLE.includes(targetColId)) {
      setDragCol(null);
      setDragOverCol(null);
      return;
    }
    const cols = [...visibleColumns];
    const fromIdx = cols.indexOf(dragCol);
    const toIdx = cols.indexOf(targetColId);
    if (fromIdx === -1 || toIdx === -1) return;
    cols.splice(fromIdx, 1);
    cols.splice(toIdx, 0, dragCol);
    saveColumns(cols);
    setDragCol(null);
    setDragOverCol(null);
  };

  const handleDragEnd = () => {
    setDragCol(null);
    setDragOverCol(null);
  };

  const renderHeader = (colId: string) => {
    const colDef = ALL_COLUMNS.find((c) => c.id === colId);
    const label = colDef?.label ?? "";
    const sk = (colDef as { sortKey?: string } | undefined)?.sortKey;
    const w = columnWidths[colId];
    const dw = (colDef as { defaultWidth?: number } | undefined)?.defaultWidth;
    const effectiveW = w || dw;
    const style = effectiveW ? { minWidth: effectiveW, maxWidth: w ? w : undefined } : undefined;
    const isDraggable = !NON_DRAGGABLE.includes(colId);
    const isDragTarget = dragOverCol === colId && dragCol !== colId;
    const isDragging = dragCol === colId;
    const dragStyle: React.CSSProperties = {
      ...style,
      opacity: isDragging ? 0.5 : 1,
      borderLeft: isDragTarget ? "2px solid #3b82f6" : undefined,
      cursor: isDraggable ? "grab" : undefined,
    };
    const dragProps = isDraggable
      ? {
          draggable: true,
          onDragStart: () => handleDragStart(colId),
          onDragOver: (e: React.DragEvent) => handleDragOver(e, colId),
          onDrop: (e: React.DragEvent) => handleDrop(e, colId),
          onDragEnd: handleDragEnd,
        }
      : {};

    const baseClass = "text-zinc-400 relative text-xs leading-tight whitespace-normal sticky top-0 z-30 bg-zinc-900";
    const rightCols = ["preco", "precoM2", "avaliacao", "desconto", "descontoMercado", "valorMercado", "mercadoM2", "zapM2", "aluguel", "distancia"];
    const rightAligned = rightCols.includes(colId);

    if (colId === "foto") {
      return <TableHead key={colId} className={`w-10 ${baseClass}`} style={dragStyle} {...dragProps}>{resizeHandle(colId)}</TableHead>;
    }
    if (colId === "actions") {
      return <TableHead key={colId} className={`w-16 ${baseClass}`} style={dragStyle} {...dragProps}>{resizeHandle(colId)}</TableHead>;
    }
    if (sk) {
      return (
        <TableHead
          key={colId}
          className={`${baseClass}${rightAligned ? " text-right" : ""}`}
          onClick={() => handleSort(sk)}
          style={{ ...dragStyle, cursor: isDraggable ? "grab" : "pointer" }}
          {...dragProps}
        >
          {label}{sortIcon(sk)}
          {resizeHandle(colId)}
        </TableHead>
      );
    }
    return (
      <TableHead key={colId} className={`${baseClass}${rightAligned ? " text-right" : ""}`} style={dragStyle} {...dragProps}>
        {label}
        {resizeHandle(colId)}
      </TableHead>
    );
  };

  const colCount = visibleColumns.length;

  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      <div className="p-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold">Imóveis</h1>
          <p className="text-sm text-zinc-400">
            {pagination.total} imóveis encontrados
          </p>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <Input
            placeholder="Buscar cidade, bairro ou endereço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData(1)}
            className="max-w-md bg-zinc-800 border-zinc-700"
          />
          <Button onClick={() => fetchData(1)} variant="secondary">
            Buscar
          </Button>
          <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => { setShowHidden(e.target.checked); syncUrl({ showHidden: e.target.checked }); }}
              className="accent-zinc-500"
            />
            Mostrar ocultos
          </label>
          {/* Column settings gear button */}
          <div ref={columnSettingsRef} className="relative ml-auto">
            <button
              onClick={() => setShowColumnSettings((v) => !v)}
              className={`flex items-center gap-1.5 border rounded px-2 py-1.5 text-xs transition-colors ${
                showColumnSettings
                  ? "text-zinc-200 border-zinc-500 bg-zinc-700"
                  : "text-zinc-400 border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
              }`}
              title="Personalizar colunas"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Colunas</span>
            </button>
            {showColumnSettings && (
              <ColumnSettings
                visibleColumns={visibleColumns}
                onChange={saveColumns}
                onClose={() => setShowColumnSettings(false)}
              />
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center text-xs">
          <MultiSelect
            label="Cidades"
            options={[
              "PORTO ALEGRE",
              "PELOTAS",
              "CAXIAS DO SUL",
              "CANOAS",
              "SANTA MARIA",
              "VIAMAO",
              "GRAVATAI",
              "NOVO HAMBURGO",
              "SAO LEOPOLDO",
              "PASSO FUNDO",
            ]}
            selected={filterCidades}
            onChange={setFilterCidades}
          />
          <MultiSelect
            label="Tipos"
            options={["Apartamento", "Casa", "Terreno", "Loja", "Comercial"]}
            selected={filterTipos}
            onChange={setFilterTipos}
          />
          <MultiSelect
            label="Modalidades"
            options={[
              "Venda Direta Online",
              "Licitação Aberta",
              "Venda Online",
              "1º Leilão SFI",
              "2º Leilão SFI",
            ]}
            selected={filterModalidades}
            onChange={setFilterModalidades}
          />
          <select value={filterDescontoMin} onChange={(e) => setFilterDescontoMin(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300 text-xs">
            <option value="">Desconto mín.</option>
            <option value="20">≥ 20%</option>
            <option value="30">≥ 30%</option>
            <option value="40">≥ 40%</option>
            <option value="50">≥ 50%</option>
            <option value="60">≥ 60%</option>
            <option value="70">≥ 70%</option>
          </select>
          {/* Price filter with custom option */}
          <select
            value={precoMaxMode === "custom" ? "custom" : filterPrecoMax}
            onChange={(e) => {
              if (e.target.value === "custom") {
                setPrecoMaxMode("custom");
              } else {
                setPrecoMaxMode("preset");
                setFilterPrecoMax(e.target.value);
                setFilterPrecoMin("");
                setCustomPrecoMin("");
                setCustomPrecoMax("");
              }
            }}
            className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300 text-xs"
          >
            <option value="">Preço máx.</option>
            <option value="50000">até R$ 50k</option>
            <option value="100000">até R$ 100k</option>
            <option value="200000">até R$ 200k</option>
            <option value="500000">até R$ 500k</option>
            <option value="1000000">até R$ 1M</option>
            <option value="custom">Personalizado...</option>
          </select>
          {precoMaxMode === "custom" && (
            <div className="flex items-center gap-1">
              <input
                type="number"
                placeholder="Mín."
                value={customPrecoMin}
                onChange={(e) => setCustomPrecoMin(e.target.value)}
                className="w-20 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300 text-xs focus:outline-none focus:border-zinc-500"
              />
              <span className="text-zinc-600">—</span>
              <input
                type="number"
                placeholder="Máx."
                value={customPrecoMax}
                onChange={(e) => setCustomPrecoMax(e.target.value)}
                className="w-20 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300 text-xs focus:outline-none focus:border-zinc-500"
              />
              <button
                onClick={applyCustomPrice}
                className="px-2 py-1.5 text-xs bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors"
              >
                OK
              </button>
              <button
                onClick={() => {
                  setPrecoMaxMode("preset");
                  setFilterPrecoMax("");
                  setFilterPrecoMin("");
                  setCustomPrecoMin("");
                  setCustomPrecoMax("");
                }}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <select
            value={filterDistancia}
            onChange={(e) => { setFilterDistancia(e.target.value); syncUrl({ filterDistancia: e.target.value }); }}
            className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300 text-xs"
          >
            <option value="">Distância POA</option>
            <option value="10">até 10km</option>
            <option value="25">até 25km</option>
            <option value="50">até 50km</option>
            <option value="100">até 100km</option>
            <option value="200">até 200km</option>
          </select>
          <div className="flex items-center gap-1">
            <select
              value={globalPeriod}
              onChange={(e) => setGlobalPeriod(Number(e.target.value))}
              className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300 text-xs"
            >
              <option value={6}>6 meses ITBI</option>
              <option value={12}>12 meses ITBI</option>
              <option value={18}>18 meses ITBI</option>
              <option value={24}>24 meses ITBI</option>
            </select>
            {recalculating && (
              <span className="text-xs text-zinc-500 animate-pulse">recalculando...</span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilterCidades([]);
                setFilterTipos([]);
                setFilterModalidades([]);
                setFilterDescontoMin("");
                setFilterPrecoMax("");
                setFilterPrecoMin("");
                setFilterDistancia("");
                setPrecoMaxMode("preset");
                setCustomPrecoMin("");
                setCustomPrecoMax("");
              }}
              className="text-zinc-500 hover:text-zinc-300 underline"
            >
              Limpar filtros
            </button>
          )}
          {/* Save filter button with popup */}
          <div ref={savePopupRef} className="relative">
            <button
              onClick={() => setShowSavePopup((v) => !v)}
              className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 border border-zinc-700 rounded px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 transition-colors"
              title="Salvar filtros atuais"
            >
              <Save className="w-3 h-3" />
              <span>Salvar filtro</span>
            </button>
            {showSavePopup && (
              <SaveFilterPopup
                onSave={handleSaveFilterPreset}
                onClose={() => setShowSavePopup(false)}
              />
            )}
          </div>
          {/* Saved filters dropdown + notifications bell inline */}
          <SavedFiltersDropdown
            presets={savedPresets}
            notificationsEnabled={notificationsEnabled}
            onApply={handleApplyPreset}
            onDelete={handleDeletePreset}
            onSetDefault={handleSetDefaultPreset}
            onToggleNotifications={toggleNotifications}
          />
        </div>

        <Card className="bg-zinc-900 border-zinc-800 overflow-auto max-h-[calc(100vh-280px)]">
          <CardContent className="p-0 pb-4">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                  {visibleColumns.map((colId) => renderHeader(colId))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={colCount} className="text-center text-zinc-500 py-8">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={colCount} className="text-center text-zinc-500 py-8">
                      Nenhum imóvel encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  data
                    .filter((p) => showHidden || !hiddenIds.has(p.id))
                    .map((p) => {
                      const isHidden = hiddenIds.has(p.id);
                      return (
                        <TableRow
                          key={p.id}
                          className={`border-zinc-800 hover:bg-zinc-800/50 transition-opacity ${isHidden ? "opacity-40" : ""}`}
                        >
                          {visibleColumns.map((colId) => renderCell(colId, p))}
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => {
                const newPage = pagination.page - 1;
                fetchData(newPage);
                syncUrl({ page: newPage });
              }}
            >
              Anterior
            </Button>
            <span className="text-sm text-zinc-400">
              {pagination.page} / {pagination.pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.pages}
              onClick={() => {
                const newPage = pagination.page + 1;
                fetchData(newPage);
                syncUrl({ page: newPage });
              }}
            >
              Próxima
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500">Carregando...</div>}>
      <ImoveisPageInner />
    </Suspense>
  );
}
