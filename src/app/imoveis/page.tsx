"use client";

import { useState, useEffect, useCallback } from "react";
import NavHeader from "@/components/NavHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  crimeRate: string | null;
  firstSeenAt: string;
  marketValue: string | null;
  marketValuePerM2: string | null;
  comparablesCount: number | null;
  areaPrivativaM2: string | null;
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
    [sort, order, search]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

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

      <div className="flex gap-3">
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
      </div>

      <Card className="bg-zinc-900 border-zinc-800 overflow-auto">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
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
                <TableHead className="text-zinc-400">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-zinc-500 py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-zinc-500 py-8">
                    Nenhum imóvel encontrado
                  </TableCell>
                </TableRow>
              ) : (
                data.map((p) => (
                  <TableRow
                    key={p.id}
                    className="border-zinc-800 hover:bg-zinc-800/50"
                  >
                    <TableCell className="font-medium">{p.cidade}</TableCell>
                    <TableCell className="text-zinc-400">
                      {p.bairro || "—"}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-xs">
                      {p.tipoImovel || p.descricao || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatBRL(p.preco)}
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
                        <span className="font-mono text-sm">
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
                        if (rate < 1000) {
                          return (
                            <Badge className="bg-green-900 text-green-300">
                              {label}
                            </Badge>
                          );
                        } else if (rate < 5000) {
                          return (
                            <Badge className="bg-yellow-900 text-yellow-300">
                              {label}
                            </Badge>
                          );
                        } else {
                          return (
                            <Badge className="bg-red-900 text-red-300">
                              {label}
                            </Badge>
                          );
                        }
                      })() : (
                        <span className="text-zinc-500">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {p.marketValue && p.preco ? (() => {
                        const mv = parseFloat(p.marketValue);
                        const preco = parseFloat(p.preco);
                        const isGoodDeal = preco < mv;
                        return (
                          <span className={isGoodDeal ? "text-green-400 font-medium" : "text-zinc-400"}>
                            {formatBRL(p.marketValue)}
                            {p.comparablesCount ? (
                              <span className="text-xs text-zinc-500 ml-1">
                                ({p.comparablesCount})
                              </span>
                            ) : null}
                          </span>
                        );
                      })() : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-zinc-400 text-sm">
                      {p.marketValuePerM2 ? (
                        `R$\u00a0${Math.round(parseFloat(p.marketValuePerM2)).toLocaleString("pt-BR")}`
                      ) : (
                        <span className="text-zinc-600">—</span>
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
                ))
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
