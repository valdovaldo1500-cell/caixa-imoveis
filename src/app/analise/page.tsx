"use client";

import { useState, useEffect } from "react";
import NavHeader from "@/components/NavHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  type PieLabelRenderProps,
} from "recharts";

interface StatsData {
  byCity: { cidade: string; count: number; avgDiscount: number; avgPrice: number }[];
  byType: { tipo: string; count: number }[];
  byDiscount: { range: string; count: number }[];
  byModalidade: { modalidade: string; count: number }[];
  priceDistribution: { range: string; count: number }[];
}

const PIE_COLORS = [
  "#60a5fa", // blue-400
  "#34d399", // emerald-400
  "#f59e0b", // amber-400
  "#f87171", // red-400
  "#a78bfa", // violet-400
  "#fb923c", // orange-400
  "#22d3ee", // cyan-400
  "#e879f9", // fuchsia-400
  "#4ade80", // green-400
  "#facc15", // yellow-400
];

const TOOLTIP_STYLE = {
  backgroundColor: "#18181b",
  border: "1px solid #3f3f46",
  borderRadius: "6px",
  color: "#f4f4f5",
  fontSize: "13px",
};

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

export default function AnalisePage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/stats", { credentials: "include" })
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Análise</h1>
        <p className="text-sm text-zinc-400">Distribuições e estatísticas dos imóveis</p>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <CardContent className="h-72 animate-pulse bg-zinc-800/50 rounded-lg" />
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-8 text-center text-zinc-400">
            Erro ao carregar dados. Verifique a conexão com o banco.
          </CardContent>
        </Card>
      )}

      {data && (
        <div className="space-y-6">
          {/* Row 1: Cities bar chart (full width) */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg">Top 15 Cidades por Quantidade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.byCity}
                  margin={{ top: 4, right: 16, left: 0, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis
                    dataKey="cidade"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                    tickLine={false}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    tickFormatter={(v) => truncate(v, 16)}
                  />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value, name) => {
                      const v = Number(value);
                      if (name === "avgDiscount") return [`${v}%`, "Desconto médio"];
                      if (name === "avgPrice") return [formatBRL(v), "Preço médio"];
                      return [v, "Imóveis"];
                    }}
                    labelStyle={{ color: "#f4f4f5", fontWeight: 600, marginBottom: 4 }}
                  />
                  <Bar dataKey="count" name="count" fill="#60a5fa" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Row 2: Type pie + Discount bar */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">Por Tipo de Imóvel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={data.byType}
                      dataKey="count"
                      nameKey="tipo"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={(props: PieLabelRenderProps) => {
                        const entry = props as unknown as Record<string, unknown>;
                        const tipo = String(entry["tipo"] ?? "");
                        const pct = typeof props.percent === "number" ? props.percent : 0;
                        return `${truncate(tipo, 12)} ${(pct * 100).toFixed(0)}%`;
                      }}
                      labelLine={{ stroke: "#52525b" }}
                    >
                      {data.byType.map((_, i) => (
                        <Cell
                          key={i}
                          fill={PIE_COLORS[i % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value) => [Number(value), "Imóveis"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Color legend */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {data.byType.map((entry, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <span>{entry.tipo}</span>
                      <span className="text-zinc-500">({entry.count})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">Distribuição de Desconto</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={data.byDiscount}
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis
                      dataKey="range"
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value) => [Number(value), "Imóveis"]}
                    />
                    <Bar dataKey="count" fill="#34d399" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Row 3: Price distribution + Modalidade */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">Distribuição de Preço</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={data.priceDistribution}
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis
                      dataKey="range"
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value) => [Number(value), "Imóveis"]}
                    />
                    <Bar dataKey="count" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">Por Modalidade de Venda</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={data.byModalidade}
                    layout="vertical"
                    margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="modalidade"
                      tick={{ fill: "#a1a1aa", fontSize: 10 }}
                      tickLine={false}
                      width={140}
                      tickFormatter={(v) => truncate(v, 22)}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value) => [Number(value), "Imóveis"]}
                    />
                    <Bar dataKey="count" fill="#a78bfa" radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
