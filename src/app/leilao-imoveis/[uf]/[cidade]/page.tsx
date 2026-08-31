import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { isValidState } from "@/lib/state";
import { cidadeUrl, ufUrl } from "@/lib/slug";
import { lerSegurancaMunicipio, type Seguranca, type NivelSeguranca } from "@/lib/seguranca";
import { formatBRL, tituloCaso } from "../../_lib/format";
import {
  UF_NOME,
  getImoveisDaCidade,
  getResumoCidade,
  getTiposDaCidade,
  resolverCidade,
  type OrdemListagem,
} from "../../_lib/queries";
import { PropertyCard } from "../../_components/PropertyCard";
import { Filtros } from "../../_components/Filtros";
import { Paginacao } from "../../_components/Paginacao";

// A página lê filtro e paginação da querystring em toda requisição — por
// isso continua dinâmica na prática, mas a consulta por trás (`getImoveisDaCidade`
// e as demais, em `../../_lib/queries`) é cacheada por `uf+cidade+filtros`
// via `unstable_cache`, TTL de 1h.
// O build do Coolify roda antes de o container entrar na rede do Postgres,
// então qualquer página pré-renderizada que consulte o banco derruba o
// deploy. É por isso que todas as páginas com banco deste repo são
// force-dynamic (ver src/app/[state]/page.tsx) — a página em si nunca é
// pré-renderizada, e `unstable_cache` só executa em tempo de requisição
// (nunca no build — ver `@/lib/cache.ts`).
export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

type Params = { uf: string; cidade: string };
type SearchParams = { [key: string]: string | string[] | undefined };
type Props = { params: Promise<Params>; searchParams: Promise<SearchParams> };

function primeiro(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function paraNumeroPagina(v: string | string[] | undefined): number {
  const n = Number(primeiro(v));
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

function paraNumeroPositivo(v: string | string[] | undefined): number | undefined {
  const raw = primeiro(v);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function paraNivelSeguranca(v: string | string[] | undefined): NivelSeguranca | undefined {
  const raw = primeiro(v);
  if (raw === "baixo" || raw === "moderado" || raw === "medio" || raw === "alto" || raw === "muito_alto") {
    return raw;
  }
  return undefined;
}

function paraOrdem(v: string | string[] | undefined): OrdemListagem {
  const raw = primeiro(v);
  return raw === "preco" || raw === "risco" ? raw : "desconto";
}

async function carregarContexto(paramsPromise: Promise<Params>): Promise<{ uf: string; cidade: string } | null> {
  const { uf: ufParam, cidade: cidadeSlug } = await paramsPromise;
  if (!isValidState(ufParam)) return null;
  const uf = ufParam.toUpperCase();
  const cidade = await resolverCidade(uf, cidadeSlug);
  if (!cidade) return null;
  return { uf, cidade };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const ctx = await carregarContexto(params);
  if (!ctx) return {};
  const { uf, cidade } = ctx;
  const nomeCidade = tituloCaso(cidade);
  const query = await searchParams;
  const pagina = paraNumeroPagina(query.p);

  const { resumo } = await getResumoCidade(uf, cidade);
  const total = resumo?.total ?? 0;
  const desconto = resumo?.descontoMediano;

  const title = `Imóveis em leilão da Caixa em ${nomeCidade}/${uf}${pagina > 1 ? ` — página ${pagina}` : ""}`;
  const description =
    total > 0
      ? `${total} ${total === 1 ? "imóvel" : "imóveis"} da Caixa Econômica Federal em leilão em ${nomeCidade}/${uf}${
          desconto ? `, desconto mediano de ${Number(desconto).toFixed(0)}%` : ""
        } sobre a avaliação. Preço, bairro e segurança da região.`
      : `Imóveis da Caixa Econômica Federal em leilão em ${nomeCidade}/${uf}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${cidadeUrl(uf, cidade)}` },
    robots: pagina > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function CidadePage({ params, searchParams }: Props) {
  const ctx = await carregarContexto(params);
  if (!ctx) notFound();
  const { uf, cidade } = ctx;
  const nomeUf = UF_NOME[uf] ?? uf;
  const nomeCidade = tituloCaso(cidade);
  const query = await searchParams;

  const pagina = paraNumeroPagina(query.p);
  const descontoMin = paraNumeroPositivo(query.desconto);
  const precoMax = paraNumeroPositivo(query.precoMax);
  const tipo = primeiro(query.tipo) || undefined;
  const segurancaMax = paraNivelSeguranca(query.seguranca);
  const ordem = paraOrdem(query.ordem);

  const [{ resumo, bairros, seguranca: amostraSeguranca }, tipos, listagem] = await Promise.all([
    getResumoCidade(uf, cidade),
    getTiposDaCidade(uf, cidade),
    getImoveisDaCidade(uf, cidade, { descontoMin, precoMax, tipo, segurancaMax, ordem, pagina }),
  ]);

  const seguranca = amostraSeguranca ? lerSeguranca(amostraSeguranca) : null;
  const paragrafo = gerarParagrafo({ cidade: nomeCidade, uf, resumo, bairros, seguranca });

  const filtrosAtuais = {
    desconto: primeiro(query.desconto),
    seguranca: primeiro(query.seguranca),
    precoMax: primeiro(query.precoMax),
    tipo: primeiro(query.tipo),
    ordem: primeiro(query.ordem),
  };

  const base = cidadeUrl(uf, cidade);
  const paramsAtuais = new URLSearchParams();
  for (const [chave, valor] of Object.entries(filtrosAtuais)) {
    if (valor) paramsAtuais.set(chave, valor);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav aria-label="Navegação estrutural" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            Início
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={ufUrl(uf)} className="hover:text-zinc-300">
            {nomeUf}
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-zinc-400">{nomeCidade}</span>
        </nav>

        <h1 className="text-2xl font-semibold text-zinc-100">
          Imóveis em leilão da Caixa em {nomeCidade}/{uf}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{paragrafo}</p>

        <div className="mt-6">
          <Filtros action={base} tipos={tipos} atual={filtrosAtuais} />
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          {listagem.total} {listagem.total === 1 ? "resultado" : "resultados"} com os filtros atuais
        </p>

        {listagem.itens.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">
            Nenhum imóvel encontrado com esses filtros.{" "}
            <Link href={base} className="underline underline-offset-2 hover:text-zinc-300">
              Limpar filtros
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listagem.itens.map((imovel) => (
              <PropertyCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}

        <Paginacao base={base} paramsAtuais={paramsAtuais} paginaAtual={pagina} totalPaginas={listagem.totalPaginas} />
      </div>
    </div>
  );
}

function gerarParagrafo({
  cidade,
  uf,
  resumo,
  bairros,
  seguranca,
}: {
  cidade: string;
  uf: string;
  resumo: { total: number; descontoMediano: string | null; precoMin: string | null; precoMax: string | null } | undefined;
  bairros: { bairro: string | null; total: number }[];
  seguranca: Seguranca | null;
}): string {
  const total = resumo?.total ?? 0;

  if (total === 0) {
    return `Não há imóveis ativos da Caixa Econômica Federal em leilão em ${cidade}/${uf} no momento.`;
  }

  if (total === 1) {
    const partes = [`Há 1 imóvel da Caixa Econômica Federal em leilão em ${cidade}/${uf} no momento.`];
    if (resumo?.descontoMediano) {
      partes.push(`Desconto de ${Number(resumo.descontoMediano).toFixed(0)}% sobre o valor de avaliação.`);
    }
    if (seguranca) partes.push(`${cidade} está ${seguranca.contexto} em segurança pública.`);
    return partes.join(" ");
  }

  const partes = [`${total} imóveis da Caixa Econômica Federal em leilão em ${cidade}/${uf} no momento.`];

  if (resumo?.descontoMediano) {
    partes.push(`Desconto mediano de ${Number(resumo.descontoMediano).toFixed(0)}% sobre o valor de avaliação.`);
  }
  if (resumo?.precoMin && resumo?.precoMax) {
    partes.push(`Preços de ${formatBRL(resumo.precoMin)} a ${formatBRL(resumo.precoMax)}.`);
  }

  const nomesBairros = bairros.filter((b) => b.bairro).map((b) => tituloCaso(b.bairro));
  if (nomesBairros.length === 1) {
    partes.push(`A maior parte está no bairro ${nomesBairros[0]}.`);
  } else if (nomesBairros.length > 1) {
    partes.push(`Os bairros com mais imóveis são ${nomesBairros.join(", ")}.`);
  }

  if (seguranca) {
    partes.push(`Em segurança pública, ${cidade} está ${seguranca.contexto}.`);
  }

  return partes.join(" ");
}
