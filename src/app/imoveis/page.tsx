"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, EyeOff } from "lucide-react";
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
  zapMarketValuePerM2: string | null;
  zapRentValue: string | null;
  zapComparablesCount: number | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

function formatBRL(value: string | number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function ComparablesPopup({ propertyId, onClose }: { propertyId: number; onClose: () => void }) {
  const [data, setData] = useState<{
    property: { bairro: string; tipoImovel: string; areaPrivativaM2: string };
    tier1: { comparables: Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string; finalidadeConstrucao: string }>; medianPrecoM2: number; count: number };
    tier2: { comparables: Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string; finalidadeConstrucao: string }>; medianPrecoM2: number; count: number };
    methodology: { estimatedValue: number; medianPrecoM2: number; usedTier: number };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${propertyId}/comparables`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [propertyId]);

  const comps = data ? (data.tier1.count > 0 ? data.tier1.comparables : data.tier2.comparables) : [];

  return (
    <div className="absolute right-0 top-full mt-1 z-50 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl p-3 w-[420px] max-h-[400px] overflow-auto text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">
          Transações ITBI usadas no cálculo
        </span>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
      </div>
      {loading ? (
        <p className="text-xs text-zinc-500">Carregando...</p>
      ) : !data || comps.length === 0 ? (
        <p className="text-xs text-zinc-500">Nenhum comparável encontrado</p>
      ) : (
        <>
          <p className="text-xs text-zinc-500 mb-2">
            Mediana R$/m²: <span className="text-zinc-300 font-medium">R$ {Math.round(data.methodology.medianPrecoM2).toLocaleString("pt-BR")}</span>
            {" · "}{comps.length} transações
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
              {comps.slice(0, 10).map((c, i) => (
                <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="py-1 pr-2 text-zinc-300 max-w-[180px] truncate" title={`${c.logradouro}, ${c.nEndereco} — ${c.bairro} (${c.dataEstimativa?.slice(0, 10)})`}>
                    {c.logradouro}, {c.nEndereco}
                    <span className="text-zinc-600 ml-1">{c.dataEstimativa?.slice(0, 10)}</span>
                  </td>
                  <td className="py-1 pr-2 text-right text-zinc-300">{formatBRL(c.baseCalculo)}</td>
                  <td className="py-1 pr-2 text-right text-zinc-400">{c.areaConstrPrivativa}m²</td>
                  <td className="py-1 text-right text-zinc-300 font-medium">
                    R$ {Math.round(c.precoM2).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {comps.length > 10 && (
            <p className="text-xs text-zinc-500 mt-1">
              <a href={`/imoveis/${propertyId}#comparaveis`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Ver todas as {comps.length} transações →
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}

function RentPopup({ propertyId, rentValue, marketValue, onClose }: { propertyId: number; rentValue: number; marketValue: number; onClose: () => void }) {
  const [comps, setComps] = useState<Array<{ logradouro: string; nEndereco: string; bairro: string; baseCalculo: number; areaConstrPrivativa: number; precoM2: number; dataEstimativa: string }>>([]);
  const [medianM2, setMedianM2] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${propertyId}/comparables`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const tier = d.tier1?.count > 0 ? d.tier1 : d.tier2;
        setComps(tier?.comparables || []);
        setMedianM2(d.methodology?.medianPrecoM2 || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [propertyId]);

  return (
    <div className="absolute right-0 top-full mt-1 z-50 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl p-3 w-[420px] max-h-[400px] overflow-auto text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-zinc-300">Como calculamos o aluguel</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">✕</button>
      </div>
      <div className="text-xs text-zinc-400 space-y-1 mb-3 bg-zinc-800 rounded p-2">
        <p>Valor de mercado: <span className="text-zinc-200 font-medium">{formatBRL(marketValue)}</span></p>
        <p>Yield mensal: <span className="text-zinc-200 font-medium">0,5%</span></p>
        <p>Aluguel estimado: <span className="text-green-400 font-medium">{formatBRL(rentValue)}/mês</span></p>
        <p>Aluguel anual: <span className="text-zinc-200 font-medium">{formatBRL(rentValue * 12)}/ano</span></p>
      </div>
      {loading ? (
        <p className="text-xs text-zinc-500">Carregando transações...</p>
      ) : comps.length === 0 ? (
        <p className="text-xs text-zinc-500">Sem comparáveis</p>
      ) : (
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
              {comps.slice(0, 8).map((c, i) => (
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
          {comps.length > 8 && (
            <p className="text-xs text-zinc-500 mt-1">
              <a href={`/imoveis/${propertyId}#comparaveis`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                +{comps.length - 8} transações →
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function ImoveisPage() {
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
  const [filterCidade, setFilterCidade] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterModalidade, setFilterModalidade] = useState("");
  const [filterDescontoMin, setFilterDescontoMin] = useState("");
  const [filterPrecoMax, setFilterPrecoMax] = useState("");
  // Map of propertyId -> favoriteId (present means favorited)
  const [favorited, setFavorited] = useState<Record<number, number>>({});
  const [expandedComparables, setExpandedComparables] = useState<number | null>(null);
  const [expandedRent, setExpandedRent] = useState<number | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
  const [showHidden, setShowHidden] = useState(true);

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
      if (filterCidade) params.set("cidade", filterCidade);
      if (filterTipo) params.set("tipo", filterTipo);
      if (filterModalidade) params.set("modalidade", filterModalidade);
      if (filterDescontoMin) params.set("desconto_min", filterDescontoMin);
      if (filterPrecoMax) params.set("preco_max", filterPrecoMax);

      try {
        const res = await fetch(`/api/properties?${params}`, {
          credentials: "include",
        });
        const json = await res.json();
        setData(json.data || []);
        setPagination(json.pagination || { page: 1, limit: 50, total: 0, pages: 0 });
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [sort, order, search, filterCidade, filterTipo, filterModalidade, filterDescontoMin, filterPrecoMax]
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
    fetchData(1);
  }, [fetchData]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    loadHidden();
  }, [loadHidden]);

  const handleSort = (col: string) => {
    if (sort === col) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setSort(col);
      setOrder("desc");
    }
  };

  const sortIcon = (col: string) => {
    if (sort !== col) return "";
    return order === "desc" ? " ↓" : " ↑";
  };

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
            onChange={(e) => setShowHidden(e.target.checked)}
            className="accent-zinc-500"
          />
          Mostrar ocultos
        </label>
      </div>

      <div className="flex gap-2 flex-wrap items-center text-xs">
        <select value={filterCidade} onChange={(e) => setFilterCidade(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300">
          <option value="">Todas cidades</option>
          <option value="PORTO ALEGRE">Porto Alegre</option>
          <option value="PELOTAS">Pelotas</option>
          <option value="CAXIAS DO SUL">Caxias do Sul</option>
          <option value="CANOAS">Canoas</option>
          <option value="SANTA MARIA">Santa Maria</option>
          <option value="VIAMAO">Viamão</option>
          <option value="GRAVATAI">Gravataí</option>
          <option value="NOVO HAMBURGO">Novo Hamburgo</option>
          <option value="SAO LEOPOLDO">São Leopoldo</option>
          <option value="PASSO FUNDO">Passo Fundo</option>
        </select>
        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300">
          <option value="">Todos tipos</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
          <option value="Terreno">Terreno</option>
          <option value="Loja">Loja</option>
          <option value="Comercial">Comercial</option>
        </select>
        <select value={filterModalidade} onChange={(e) => setFilterModalidade(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300">
          <option value="">Todas modalidades</option>
          <option value="Venda Direta Online">Venda Direta Online</option>
          <option value="Licitação Aberta">Licitação Aberta</option>
          <option value="Venda Online">Venda Online</option>
          <option value="1º Leilão SFI">1º Leilão SFI</option>
          <option value="2º Leilão SFI">2º Leilão SFI</option>
        </select>
        <select value={filterDescontoMin} onChange={(e) => setFilterDescontoMin(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300">
          <option value="">Desconto mín.</option>
          <option value="20">≥ 20%</option>
          <option value="30">≥ 30%</option>
          <option value="40">≥ 40%</option>
          <option value="50">≥ 50%</option>
          <option value="60">≥ 60%</option>
          <option value="70">≥ 70%</option>
        </select>
        <select value={filterPrecoMax} onChange={(e) => setFilterPrecoMax(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-zinc-300">
          <option value="">Preço máx.</option>
          <option value="50000">até R$ 50k</option>
          <option value="100000">até R$ 100k</option>
          <option value="200000">até R$ 200k</option>
          <option value="500000">até R$ 500k</option>
          <option value="1000000">até R$ 1M</option>
        </select>
        {(filterCidade || filterTipo || filterModalidade || filterDescontoMin || filterPrecoMax) && (
          <button
            onClick={() => { setFilterCidade(""); setFilterTipo(""); setFilterModalidade(""); setFilterDescontoMin(""); setFilterPrecoMax(""); }}
            className="text-zinc-500 hover:text-zinc-300 underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <Card className="bg-zinc-900 border-zinc-800 overflow-auto">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead className="w-16 text-zinc-400" />
                <TableHead
                  className="cursor-pointer text-zinc-400"
                  onClick={() => handleSort("cidade")}
                >
                  Cidade{sortIcon("cidade")}
                </TableHead>
                <TableHead className="text-zinc-400">Bairro</TableHead>
                <TableHead className="text-zinc-400">Tipo</TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 text-right"
                  onClick={() => handleSort("preco")}
                >
                  Preço{sortIcon("preco")}
                </TableHead>
                <TableHead className="text-zinc-400 text-right">
                  R$/m²
                </TableHead>
                <TableHead className="text-zinc-400 text-right">
                  Avaliação
                </TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 text-right"
                  onClick={() => handleSort("desconto")}
                >
                  Desconto{sortIcon("desconto")}
                </TableHead>
                <TableHead className="text-zinc-400">Modalidade</TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400"
                  onClick={() => handleSort("score")}
                >
                  Score{sortIcon("score")}
                </TableHead>
                <TableHead className="text-zinc-400">Criminalidade</TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 text-right"
                  onClick={() => handleSort("market_value")}
                >
                  Valor Mercado{sortIcon("market_value")}
                </TableHead>
                <TableHead className="text-zinc-400 text-right">R$/m²</TableHead>
                <TableHead className="text-zinc-400 text-right">ZAP R$/m²</TableHead>
                <TableHead className="text-zinc-400 text-right">Aluguel</TableHead>
                <TableHead className="text-zinc-400">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={16} className="text-center text-zinc-500 py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={16} className="text-center text-zinc-500 py-8">
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
                    <TableCell className="w-16 px-2">
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
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/imoveis/${p.id}`} className="hover:text-blue-400 transition-colors">
                        {p.cidade}
                      </Link>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {p.bairro || "—"}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-xs">
                      {p.tipoImovel || p.descricao || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatBRL(p.preco)}
                    </TableCell>
                    <TableCell className="text-right text-zinc-500 text-xs">
                      {p.preco && p.areaPrivativaM2 && parseFloat(p.areaPrivativaM2) > 0
                        ? `R$\u00a0${Math.round(parseFloat(p.preco) / parseFloat(p.areaPrivativaM2)).toLocaleString("pt-BR")}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right text-zinc-400">
                      {formatBRL(p.valorAvaliacao)}
                    </TableCell>
                    <TableCell className="text-right">
                      {p.desconto ? (
                        <Badge
                          variant={
                            parseFloat(p.desconto) >= 40
                              ? "default"
                              : "secondary"
                          }
                          className={
                            parseFloat(p.desconto) >= 40
                              ? "bg-green-900 text-green-300"
                              : ""
                          }
                        >
                          {parseFloat(p.desconto).toFixed(0)}%
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-xs max-w-[120px] truncate">
                      {p.modalidadeVenda || "—"}
                    </TableCell>
                    <TableCell>
                      {p.score ? (
                        <span
                          className="font-mono text-sm cursor-help relative group"
                          title={p.scoreDetails ? Object.entries(p.scoreDetails)
                            .filter(([k]) => k !== "total")
                            .map(([k, v]) => {
                              const labels: Record<string, string> = {
                                discount: "Desconto",
                                priceEfficiency: "Preço vs cidade",
                                financing: "Financiamento",
                                propertyType: "Tipo imóvel",
                                areaValue: "Valor/m²",
                                daysOnMarket: "Dias no mercado",
                                crimeSafety: "Segurança",
                              };
                              return `${labels[k] || k}: ${typeof v === "number" ? v.toFixed(0) : v}`;
                            }).join(" | ") : ""}
                        >
                          {parseFloat(p.score).toFixed(0)}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
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
                        return (
                          <Badge className={`${bg} ${text}`}>
                            {label}
                          </Badge>
                        );
                      })() : (
                        <span className="text-zinc-500">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right relative">
                      {p.marketValue && p.preco ? (() => {
                        const mv = parseFloat(p.marketValue);
                        const preco = parseFloat(p.preco);
                        const isGoodDeal = preco < mv;
                        return (
                          <button
                            onClick={() => setExpandedComparables(expandedComparables === p.id ? null : p.id)}
                            className={`cursor-pointer hover:underline text-left ${isGoodDeal ? "text-green-400 font-medium" : "text-zinc-400"}`}
                          >
                            {formatBRL(p.marketValue)}
                            {p.comparablesCount ? (
                              <span className="text-xs text-zinc-500 ml-1">
                                ({p.comparablesCount})
                              </span>
                            ) : null}
                          </button>
                        );
                      })() : (
                        <span className="text-zinc-600">—</span>
                      )}
                      {expandedComparables === p.id && (
                        <ComparablesPopup propertyId={p.id} onClose={() => setExpandedComparables(null)} />
                      )}
                    </TableCell>
                    <TableCell className="text-right text-zinc-400 text-sm">
                      {p.marketValuePerM2 ? (
                        `R$\u00a0${Math.round(parseFloat(p.marketValuePerM2)).toLocaleString("pt-BR")}`
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-zinc-400 text-sm">
                      {p.zapMarketValuePerM2 ? (
                        <span title={`ZAP: ${p.zapComparablesCount ?? 0} anúncios`}>
                          {`R$\u00a0${Math.round(parseFloat(p.zapMarketValuePerM2)).toLocaleString("pt-BR")}`}
                          {p.zapComparablesCount ? (
                            <span className="text-xs text-zinc-600 ml-1">({p.zapComparablesCount})</span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right relative">
                      {p.marketRentValue ? (
                        <button
                          onClick={() => setExpandedRent(expandedRent === p.id ? null : p.id)}
                          className="text-zinc-300 cursor-pointer hover:underline text-left"
                        >
                          {formatBRL(p.marketRentValue)}<span className="text-zinc-600 text-xs">/mês</span>
                        </button>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                      {expandedRent === p.id && p.marketRentValue && p.marketValue && (
                        <RentPopup
                          propertyId={p.id}
                          rentValue={parseFloat(p.marketRentValue)}
                          marketValue={parseFloat(p.marketValue)}
                          onClose={() => setExpandedRent(null)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
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
            onClick={() => fetchData(pagination.page - 1)}
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
            onClick={() => fetchData(pagination.page + 1)}
          >
            Próxima
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}
