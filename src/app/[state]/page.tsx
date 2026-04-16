import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { sql, isNull, eq, and } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { isValidState } from "@/lib/state";

export const dynamic = "force-dynamic";

async function getStats(uf: string) {
  const [totalResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(properties)
    .where(and(isNull(properties.removedAt), eq(properties.uf, uf)));

  const [avgDiscount] = await db
    .select({
      avg: sql<string>`round(avg(${properties.desconto})::numeric, 1)`,
    })
    .from(properties)
    .where(and(isNull(properties.removedAt), eq(properties.uf, uf)));

  const [avgPrice] = await db
    .select({
      avg: sql<string>`round(avg(${properties.preco})::numeric, 0)`,
    })
    .from(properties)
    .where(and(isNull(properties.removedAt), eq(properties.uf, uf)));

  const [newToday] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(properties)
    .where(
      sql`${properties.firstSeenAt}::date = current_date AND ${properties.removedAt} IS NULL AND ${properties.uf} = ${uf}`
    );

  const [removedToday] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(properties)
    .where(sql`${properties.removedAt}::date = current_date AND ${properties.uf} = ${uf}`);

  const [withGeo] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(properties)
    .where(
      sql`${properties.lat} IS NOT NULL AND ${properties.removedAt} IS NULL AND ${properties.uf} = ${uf}`
    );

  // Investment KPIs
  const [avgYield] = await db
    .select({
      avg: sql<string>`round(avg(CASE WHEN ${properties.zapRentValue}::numeric > 0 AND ${properties.preco}::numeric > 0 THEN (${properties.zapRentValue}::numeric * 12 / ${properties.preco}::numeric) * 100 ELSE NULL END)::numeric, 1)`,
    })
    .from(properties)
    .where(and(isNull(properties.removedAt), eq(properties.uf, uf)));

  const [beatsSelic] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(properties)
    .where(
      sql`${properties.removedAt} IS NULL AND ${properties.zapRentValue}::numeric > 0 AND ${properties.preco}::numeric > 0 AND (${properties.zapRentValue}::numeric * 12 / ${properties.preco}::numeric) * 100 > 14.25 AND ${properties.uf} = ${uf}`
    );

  const [withMarketValue] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(properties)
    .where(
      sql`${properties.removedAt} IS NULL AND (${properties.zapMarketValue} IS NOT NULL OR ${properties.marketValue} IS NOT NULL OR ${properties.qaMarketValue} IS NOT NULL) AND ${properties.uf} = ${uf}`
    );

  const topCidades = await db
    .select({
      cidade: properties.cidade,
      count: sql<number>`count(*)::int`,
    })
    .from(properties)
    .where(and(isNull(properties.removedAt), eq(properties.uf, uf)))
    .groupBy(properties.cidade)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  const byTipo = await db
    .select({
      tipo: sql<string>`coalesce(${properties.tipoImovel}, ${properties.descricao}, 'N/D')`,
      count: sql<number>`count(*)::int`,
    })
    .from(properties)
    .where(and(isNull(properties.removedAt), eq(properties.uf, uf)))
    .groupBy(
      sql`coalesce(${properties.tipoImovel}, ${properties.descricao}, 'N/D')`
    )
    .orderBy(sql`count(*) desc`)
    .limit(8);

  return {
    total: totalResult?.count ?? 0,
    avgDiscount: avgDiscount?.avg ?? "0",
    avgPrice: avgPrice?.avg ?? "0",
    newToday: newToday?.count ?? 0,
    removedToday: removedToday?.count ?? 0,
    withGeo: withGeo?.count ?? 0,
    avgYield: avgYield?.avg ?? "0",
    beatsSelic: beatsSelic?.count ?? 0,
    withMarketValue: withMarketValue?.count ?? 0,
    topCidades,
    byTipo,
  };
}

function formatBRL(value: string | number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  if (!isValidState(state)) notFound();
  const uf = state.toUpperCase();

  let stats;
  try {
    stats = await getStats(uf);
  } catch {
    stats = null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-zinc-400">
          Análise de imóveis retomados
        </p>
      </div>

      {!stats ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-8 text-center text-zinc-400">
            <p className="text-lg mb-2">Banco de dados não disponível</p>
            <p className="text-sm">
              Execute o pipeline para importar os dados:{" "}
              <code className="bg-zinc-800 px-2 py-1 rounded">
                POST /api/pipeline/trigger
              </code>
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Total Imóveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Desconto Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-400">
                  {stats.avgDiscount}%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Preço Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {formatBRL(stats.avgPrice)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Novos Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-400">
                  {stats.newToday}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Removidos Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-400">
                  {stats.removedToday}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Geolocalizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.withGeo}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Yield Médio Bruto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${parseFloat(stats.avgYield) >= 8 ? "text-green-400" : "text-yellow-400"}`}>
                  {stats.avgYield}%
                </p>
                <p className="text-[10px] text-zinc-500">Selic: 14,25%</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Yield &gt; Selic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-400">{stats.beatsSelic}</p>
                <p className="text-[10px] text-zinc-500">Yield bruto &gt; 14,25%</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-zinc-400 font-normal">
                  Com Valor Mercado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.withMarketValue}</p>
                <p className="text-[10px] text-zinc-500">ITBI, ZAP ou 5ºAndar</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">Top Cidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.topCidades.map((c) => (
                    <div
                      key={c.cidade}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-zinc-300">{c.cidade}</span>
                      <span className="text-zinc-400">{c.count}</span>
                    </div>
                  ))}
                  {stats.topCidades.length === 0 && (
                    <p className="text-zinc-500 text-sm">Sem dados</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">Por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.byTipo.map((t) => (
                    <div key={t.tipo} className="flex justify-between text-sm">
                      <span className="text-zinc-300">{t.tipo}</span>
                      <span className="text-zinc-400">{t.count}</span>
                    </div>
                  ))}
                  {stats.byTipo.length === 0 && (
                    <p className="text-zinc-500 text-sm">Sem dados</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
