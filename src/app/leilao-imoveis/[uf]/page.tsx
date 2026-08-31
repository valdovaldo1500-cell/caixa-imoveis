import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { isValidState, VALID_STATES } from "@/lib/state";
import { cidadeUrl, ufUrl } from "@/lib/slug";
import { formatBRL, tituloCaso } from "../_lib/format";
import { UF_NOME, getCidadesDoEstado, getResumoUf } from "../_lib/queries";
import { metaSeo } from "@/lib/seo";
import { breadcrumb, itemList, jsonLdSeguro } from "@/lib/jsonld";
import { GUIAS } from "@/app/guias/_lib/indice";

// O build do Coolify roda antes de o container entrar na rede do Postgres,
// então qualquer página pré-renderizada que consulte o banco derruba o
// deploy. É por isso que todas as páginas com banco deste repo são
// force-dynamic (ver src/app/[state]/page.tsx) — a página em si nunca é
// pré-renderizada. O cache de verdade mora nas consultas importadas de
// `../_lib/queries` (via `unstable_cache`, TTL de 1h): elas só executam em
// tempo de requisição, então nunca rodam durante `next build`
// (ver `@/lib/cache.ts`).
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ uf: string }> };

export function generateStaticParams() {
  return VALID_STATES.map((uf) => ({ uf }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uf: ufParam } = await params;
  if (!isValidState(ufParam)) return {};
  const uf = ufParam.toUpperCase();
  const nome = UF_NOME[uf] ?? uf;
  const resumo = await getResumoUf(uf);
  const total = resumo?.total ?? 0;
  const desconto = resumo?.descontoMediano;

  const totalTxt = total.toLocaleString("pt-BR");
  const title = `Imóveis em leilão da Caixa em ${nome} — ${totalTxt} ${total === 1 ? "imóvel" : "imóveis"}`;
  const description =
    total > 0
      ? `${totalTxt} imóveis retomados pela Caixa Econômica Federal em leilão em ${nome}${
          desconto ? `, desconto mediano de ${Number(desconto).toFixed(0)}% sobre a avaliação` : ""
        }. Preço, cidade e leitura de segurança da região antes de decidir.`
      : `Imóveis retomados pela Caixa Econômica Federal em leilão em ${nome}.`;

  return {
    ...metaSeo({ title, description, path: ufUrl(uf) }),
  };
}

export default async function HubEstadoPage({ params }: Props) {
  const { uf: ufParam } = await params;
  if (!isValidState(ufParam)) notFound();
  const uf = ufParam.toUpperCase();
  const nome = UF_NOME[uf] ?? uf;

  const [resumo, cidades] = await Promise.all([getResumoUf(uf), getCidadesDoEstado(uf)]);

  const total = resumo?.total ?? 0;
  const descontoMediano = resumo?.descontoMediano != null ? Number(resumo.descontoMediano) : null;
  const precoMin = formatBRL(resumo?.precoMin);
  const precoMax = formatBRL(resumo?.precoMax);

  // BreadcrumbList + ItemList das cidades: é assim que o Google entende o hub
  // como índice e acha as 175 páginas de cidade sem depender só do sitemap.
  const dados = [
    breadcrumb([
      { nome: "Início", caminho: "/" },
      { nome: nome, caminho: ufUrl(uf) },
    ]),
    itemList(`Cidades com imóveis em leilão em ${nome}`, cidades.map((c) => cidadeUrl(uf, c.cidade))),
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {dados.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(d) }} />
      ))}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav aria-label="Navegação estrutural" className="mb-4 flex items-center gap-1 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            Início
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-zinc-400">{nome}</span>
        </nav>

        <h1 className="text-2xl font-semibold text-zinc-100">Imóveis em leilão da Caixa em {nome}</h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {total > 0 ? (
            <>
              {total} imóveis retomados pela Caixa Econômica Federal ativos em {nome} agora, em {cidades.length}{" "}
              {cidades.length === 1 ? "cidade" : "cidades"}.
              {descontoMediano != null && ` Desconto mediano de ${descontoMediano.toFixed(0)}% sobre o valor de avaliação.`}
              {precoMin && precoMax && ` Preços de ${precoMin} a ${precoMax}.`}
            </>
          ) : (
            `Nenhum imóvel ativo em ${nome} no momento.`
          )}
        </p>

        <h2 className="mb-3 mt-8 text-sm font-medium text-zinc-300">Cidades com imóveis em leilão</h2>

        {cidades.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma cidade com estoque no momento.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {cidades.map((c) => {
              const nomeCidade = tituloCaso(c.cidade);
              // 1-2 imóveis entram na lista, mas sem destaque visual.
              const destaque = c.total > 2;
              return (
                <li key={c.cidade}>
                  <Link
                    href={cidadeUrl(uf, c.cidade)}
                    className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm transition ${
                      destaque
                        ? "border-zinc-800 bg-zinc-900/40 text-zinc-100 hover:border-zinc-700"
                        : "border-zinc-900 text-zinc-500 hover:border-zinc-800"
                    }`}
                  >
                    <span>{nomeCidade}</span>
                    <span className="tabular-nums text-xs text-zinc-500">
                      {c.total} {c.total === 1 ? "imóvel" : "imóveis"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10 rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-3">
          <p className="text-sm text-zinc-300">Antes de dar lance</p>
          <ul className="mt-2 space-y-1 text-sm">
            {GUIAS.map((g) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className="text-zinc-400 underline underline-offset-4 hover:text-zinc-100">
                  {g.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
