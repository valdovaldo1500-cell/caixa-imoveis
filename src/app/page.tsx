import Link from "next/link";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { sql, isNull } from "drizzle-orm";
import { ArrowRight, ShieldCheck, Trees, Lock } from "lucide-react";
import { ufUrl, imovelUrl } from "@/lib/slug";
import { BlocoSeguranca } from "@/components/BlocoSeguranca";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://imoveis.crimebrasil.com.br";

/**
 * Home pública do agregador (O6).
 *
 * Decisão de copy vinda da auditoria de concorrentes (28/08/2026): o hero usa
 * NÚMEROS REAIS do nosso estoque em vez de inflar amplitude. Não dá para
 * brigar de "quantas fontes" com quem anuncia 1.366 — e o desconto mediano
 * de 44% é um número melhor que qualquer contagem de leiloeiro.
 *
 * O segundo argumento é a lista aberta: o buscador da própria Caixa exige
 * CPF, telefone e e-mail antes de mostrar qualquer resultado (verificado no
 * wizard deles). Ser navegável sem cadastro é vantagem real sobre o "grátis".
 */
async function getResumo() {
  const [tot] = await db
    .select({
      total: sql<number>`count(*)::int`,
      cidades: sql<number>`count(distinct ${properties.cidade})::int`,
      descontoMediano: sql<string>`round(percentile_cont(0.5) within group (order by ${properties.desconto}) filter (where ${properties.desconto} > 0)::numeric, 0)`,
      comDesconto: sql<number>`count(*) filter (where ${properties.desconto} > 0)::int`,
      precoMediano: sql<string>`round(percentile_cont(0.5) within group (order by ${properties.preco})::numeric, 0)`,
      comSeguranca: sql<number>`count(${properties.crimeNota})::int`,
    })
    .from(properties)
    .where(isNull(properties.removedAt));

  const porUf = await db
    .select({
      uf: properties.uf,
      total: sql<number>`count(*)::int`,
      desconto: sql<string>`round(percentile_cont(0.5) within group (order by ${properties.desconto}) filter (where ${properties.desconto} > 0)::numeric, 0)`,
      comDesconto: sql<number>`count(*) filter (where ${properties.desconto} > 0)::int`,
    })
    .from(properties)
    .where(isNull(properties.removedAt))
    .groupBy(properties.uf)
    .orderBy(sql`count(*) desc`);

  const destaques = await db
    .select({
      caixaId: properties.caixaId,
      uf: properties.uf,
      cidade: properties.cidade,
      bairro: properties.bairro,
      tipoImovel: properties.tipoImovel,
      preco: properties.preco,
      valorAvaliacao: properties.valorAvaliacao,
      desconto: properties.desconto,
      crimeNota: properties.crimeNota,
      crimeTaxa: properties.crimeTaxa,
      crimeGrao: properties.crimeGrao,
      crimeFonte: properties.crimeFonte,
      crimeJanelaInicio: properties.crimeJanelaInicio,
      crimeJanelaFim: properties.crimeJanelaFim,
      crimeSuprimido: properties.crimeSuprimido,
    })
    .from(properties)
    .where(sql`${properties.removedAt} is null and ${properties.desconto} is not null and ${properties.preco} > 0`)
    .orderBy(sql`${properties.desconto} desc`)
    .limit(6);

  return { tot, porUf, destaques };
}

const UF_NOMES: Record<string, string> = { GO: "Goiás", RS: "Rio Grande do Sul" };

export async function generateMetadata() {
  const { tot } = await getResumo();
  const n = (tot?.total ?? 0).toLocaleString("pt-BR");
  return {
    title: "Imóveis de leilão da Caixa, com a segurança da região",
    description: `${n} imóveis da Caixa com desconto sobre a avaliação, e a nota de criminalidade do município ao lado de cada um. Navegue sem cadastro.`,
    alternates: { canonical: SITE_URL },
  };
}

function brl(v: string | number | null) {
  if (v == null) return "—";
  return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export default async function Home() {
  const { tot, porUf, destaques } = await getResumo();

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-semibold text-zinc-100">Imóveis de Leilão</span>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/planos" className="text-zinc-400 hover:text-zinc-100">Planos</Link>
            <Link href="/entrar" className="text-zinc-400 hover:text-zinc-100">Entrar</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <section>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-zinc-50 sm:text-5xl">
            O imóvel é barato. Mas o bairro é seguro?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            {(tot?.total ?? 0).toLocaleString("pt-BR")} imóveis da Caixa em{" "}
            {(tot?.cidades ?? 0).toLocaleString("pt-BR")} cidades.{" "}
            {(tot?.comDesconto ?? 0).toLocaleString("pt-BR")} saem abaixo da avaliação, com desconto mediano de{" "}
            <strong className="text-zinc-200">{tot?.descontoMediano ?? "—"}%</strong> — e a criminalidade do
            município ao lado de cada um. Nenhum outro agregador mostra isso.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {porUf.map((u) => (
              <Link
                key={u.uf}
                href={ufUrl(u.uf)}
                className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 transition hover:border-zinc-600"
              >
                <span className="font-semibold">{UF_NOMES[u.uf] ?? u.uf}</span>
                <span className="text-zinc-500">
                  {u.total.toLocaleString("pt-BR")} imóveis · {u.comDesconto.toLocaleString("pt-BR")} com desconto,
                  mediana {u.desconto}%
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
            <ShieldCheck className="h-4 w-4" />
            Navegue sem cadastro. O buscador da própria Caixa pede CPF e telefone antes de mostrar a lista.
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            A mediana de desconto considera só os imóveis que saem abaixo da avaliação. No leilão SFI de edital
            único o lance mínimo é a dívida do imóvel, e não raro fica acima da avaliação — contar esses como
            &quot;0% de desconto&quot; achataria o número e esconderia as oportunidades reais.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Maiores descontos agora
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((d) => (
              <Link
                key={d.caixaId}
                href={imovelUrl(d)}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-600"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-sm font-semibold text-emerald-300">
                    -{Number(d.desconto).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%
                  </span>
                  <BlocoSeguranca imovel={d} cidade={d.cidade} compacto />
                </div>
                <p className="mt-3 text-sm font-medium text-zinc-200">
                  {d.tipoImovel ?? "Imóvel"}
                  {d.bairro ? ` · ${d.bairro}` : ""}
                </p>
                <p className="text-sm text-zinc-500">
                  {d.cidade}/{d.uf}
                </p>
                <p className="mt-3 text-lg font-semibold text-zinc-100">{brl(d.preco)}</p>
                <p className="text-xs text-zinc-500 line-through">{brl(d.valorAvaliacao)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-lg font-semibold text-zinc-100">De onde vem a nota de segurança</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
            A nota é do <strong className="text-zinc-300">município</strong>, calculada sobre mortes violentas
            registradas no DATASUS/SIM, e comparada com a distribuição dos 3.615 municípios brasileiros com dado
            suficiente. Cada imóvel mostra o número, a fonte e o período — e onde o município teve poucos
            registros, dizemos que o dado é insuficiente em vez de exibir um número frágil.
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            {(tot?.comSeguranca ?? 0).toLocaleString("pt-BR")} dos {(tot?.total ?? 0).toLocaleString("pt-BR")}{" "}
            imóveis têm a leitura de segurança da região.
          </p>
        </section>

        <section className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/sitios.html"
            className="flex flex-1 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-600"
          >
            <Trees className="h-5 w-5 shrink-0 text-emerald-400" />
            <span className="text-sm text-zinc-300">Sítios, chácaras e terrenos — catálogo do canal Darlei Souza</span>
          </a>
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-500 transition hover:border-zinc-600"
          >
            <Lock className="h-4 w-4 shrink-0" />
            Painel interno
          </Link>
        </section>
      </main>
    </div>
  );
}
