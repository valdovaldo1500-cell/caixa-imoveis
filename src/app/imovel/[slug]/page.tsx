import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Bath, Bed, Car, ChevronRight, ExternalLink, ImageOff, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlocoSeguranca } from "@/components/BlocoSeguranca";
import { lerSeguranca } from "@/lib/seguranca";
import { caixaIdDoSlug, cidadeUrl, imovelUrl, ufUrl } from "@/lib/slug";
import { buscarImovel, formatBRL, nomeUf, plural, tituloCaso, urlAbsoluta } from "../_lib/helpers";

// Revalida a cada hora — o preço e a disponibilidade mudam devagar, mas mudam.
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function tituloImovel(tipo: string | null, bairro: string, cidade: string): string {
  const t = tipo ?? "Imóvel";
  return bairro ? `${t} em ${bairro}, ${cidade}` : `${t} em ${cidade}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caixaId = caixaIdDoSlug(slug);
  if (!caixaId) return {};

  const imovel = await buscarImovel(caixaId);
  if (!imovel) return {};

  const cidade = tituloCaso(imovel.cidade);
  const bairro = tituloCaso(imovel.bairro);
  const titulo = tituloImovel(imovel.tipoImovel, bairro, cidade);
  const preco = formatBRL(imovel.preco);
  const canonical = urlAbsoluta(imovelUrl(imovel));
  const seguranca = lerSeguranca(imovel);

  const titleParts = [titulo, imovel.uf, preco].filter(Boolean);

  const descontoTxt =
    imovel.desconto != null
      ? `${Number(imovel.desconto).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}% de desconto sobre a avaliação.`
      : null;
  const segurancaTxt = seguranca
    ? `Segurança da região: ${seguranca.rotulo.toLowerCase()}, ${cidade} está ${seguranca.contexto}.`
    : null;
  const disponibilidadeTxt = imovel.removedAt
    ? "Este imóvel não está mais disponível para leilão."
    : "Imóvel de leilão da Caixa Econômica Federal.";

  return {
    title: titleParts.join(" — "),
    description: [descontoTxt, segurancaTxt, disponibilidadeTxt].filter(Boolean).join(" "),
    alternates: { canonical },
  };
}

export default async function ImovelPage({ params }: Props) {
  const { slug } = await params;
  const caixaId = caixaIdDoSlug(slug);
  if (!caixaId) notFound();

  const imovel = await buscarImovel(caixaId);
  if (!imovel) notFound();

  // URL canônica evita conteúdo duplicado quando o slug mudou (preço/tipo
  // atualizados) mas o caixaId — que é a chave real — continua o mesmo.
  const caminhoCanonico = imovelUrl(imovel);
  const slugCanonico = caminhoCanonico.replace(/^\/imovel\//, "");
  if (slug !== slugCanonico) {
    permanentRedirect(caminhoCanonico);
  }

  const uf = imovel.uf;
  const cidade = tituloCaso(imovel.cidade);
  const bairro = tituloCaso(imovel.bairro);
  const titulo = tituloImovel(imovel.tipoImovel, bairro, cidade);
  const removido = Boolean(imovel.removedAt);
  const urlCidade = cidadeUrl(uf, imovel.cidade);
  const canonicalUrl = urlAbsoluta(caminhoCanonico);

  const preco = formatBRL(imovel.preco);
  const valorAvaliacao = formatBRL(imovel.valorAvaliacao);
  const economiaReais =
    imovel.preco != null && imovel.valorAvaliacao != null
      ? Number(imovel.valorAvaliacao) - Number(imovel.preco)
      : null;
  const economia = economiaReais != null && economiaReais > 0 ? formatBRL(economiaReais) : null;
  const descontoPct =
    imovel.desconto != null
      ? Number(imovel.desconto).toLocaleString("pt-BR", { maximumFractionDigits: 1 })
      : null;

  // Características: nunca renderiza "null" nem "0" — se o campo não veio
  // preenchido ou veio zerado (artefato comum da coleta), simplesmente omite.
  const quartos = imovel.quartos && imovel.quartos > 0 ? imovel.quartos : null;
  const vagas = imovel.vagas && imovel.vagas > 0 ? imovel.vagas : null;
  const banheiros = imovel.banheiros && imovel.banheiros > 0 ? imovel.banheiros : null;
  const areaTotal = imovel.areaTotalM2 != null && Number(imovel.areaTotalM2) > 0 ? Number(imovel.areaTotalM2) : null;
  const areaPrivativa =
    imovel.areaPrivativaM2 != null && Number(imovel.areaPrivativaM2) > 0 ? Number(imovel.areaPrivativaM2) : null;

  const caracteristicas: { Icone: typeof Bed; texto: string }[] = [];
  if (quartos) caracteristicas.push({ Icone: Bed, texto: plural(quartos, "quarto", "quartos") });
  if (vagas) caracteristicas.push({ Icone: Car, texto: plural(vagas, "vaga", "vagas") });
  if (banheiros) caracteristicas.push({ Icone: Bath, texto: plural(banheiros, "banheiro", "banheiros") });
  if (areaTotal)
    caracteristicas.push({ Icone: Ruler, texto: `${areaTotal.toLocaleString("pt-BR")} m² totais` });
  if (areaPrivativa)
    caracteristicas.push({ Icone: Ruler, texto: `${areaPrivativa.toLocaleString("pt-BR")} m² privativos` });

  // Product+Offer no mesmo nó — é o padrão pedido para o rich result de imóvel.
  const jsonLdProduto = {
    "@context": "https://schema.org",
    "@type": ["Product", "Offer"],
    name: titulo,
    description: imovel.descricao ?? titulo,
    ...(imovel.fotoUrl ? { image: imovel.fotoUrl } : {}),
    sku: imovel.caixaId,
    url: canonicalUrl,
    ...(imovel.preco != null ? { price: Number(imovel.preco), priceCurrency: "BRL" } : {}),
    availability: removido ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    itemCondition: "https://schema.org/UsedCondition",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: urlAbsoluta("/") },
      { "@type": "ListItem", position: 2, name: nomeUf(uf), item: urlAbsoluta(ufUrl(uf)) },
      { "@type": "ListItem", position: 3, name: cidade, item: urlAbsoluta(urlCidade) },
      { "@type": "ListItem", position: 4, name: titulo, item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- JSON-LD, não navegação */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduto) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* 1. Breadcrumb */}
        <nav aria-label="Navegação estrutural" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            Início
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={ufUrl(uf)} className="hover:text-zinc-300">
            {nomeUf(uf)}
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link href={urlCidade} className="hover:text-zinc-300">
            {cidade}
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="truncate text-zinc-400">{titulo}</span>
        </nav>

        {removido && (
          <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            Este imóvel não está mais disponível — foi retirado do leilão ou já foi vendido.{" "}
            <Link href={urlCidade} className="font-medium underline underline-offset-2">
              Ver imóveis disponíveis em {cidade}
            </Link>
          </div>
        )}

        {/* 2. Foto */}
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
          {imovel.fotoUrl ? (
            // Fotos vêm de domínios variados da Caixa/scraper — <img> simples
            // evita ter que manter uma lista de remotePatterns em next.config.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imovel.fotoUrl} alt={titulo} className="aspect-video w-full object-cover" />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-zinc-600">
              <ImageOff className="size-8" />
              <span className="text-xs">Sem foto disponível</span>
            </div>
          )}
        </div>

        {/* 3. Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {descontoPct && (
            <Badge className="border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
              -{descontoPct}% de desconto
            </Badge>
          )}
          {imovel.modalidadeVenda && <Badge variant="outline">{imovel.modalidadeVenda}</Badge>}
          {imovel.tipoImovel && <Badge variant="outline">{imovel.tipoImovel}</Badge>}
          {imovel.aceitaFinanciamento && <Badge variant="outline">Aceita financiamento</Badge>}
        </div>

        {/* 4. Título e características */}
        <h1 className="mt-3 text-xl font-semibold text-zinc-100">{titulo}</h1>

        {caracteristicas.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400">
            {caracteristicas.map((c) => (
              <span key={c.texto} className="inline-flex items-center gap-1.5">
                <c.Icone className="size-4 text-zinc-500" />
                {c.texto}
              </span>
            ))}
          </div>
        )}

        {/* 5. Bloco de segurança — o diferencial do produto */}
        <div className="mt-4">
          <BlocoSeguranca imovel={imovel} cidade={cidade} />
        </div>

        {/* 6. Os três números */}
        <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-zinc-500">Preço do leilão</p>
            <p className="text-lg font-semibold text-zinc-100">{preco ?? "Sob consulta"}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Valor de avaliação</p>
            <p className="text-lg font-semibold text-zinc-100">{valorAvaliacao ?? "Não informado"}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Economia estimada</p>
            <p className="text-lg font-semibold text-emerald-400">
              {economia ?? "—"}
              {economia && descontoPct && (
                <span className="ml-1 text-sm font-normal text-zinc-500">({descontoPct}%)</span>
              )}
            </p>
          </div>
        </div>

        {/* 7. Endereço e registro */}
        {(imovel.endereco || imovel.comarca || imovel.matricula) && (
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-sm">
            <h2 className="text-sm font-medium text-zinc-300">Endereço e registro</h2>
            {imovel.endereco && (
              <p className="mt-1 text-zinc-400">
                {imovel.endereco}
                {imovel.cep ? ` — CEP ${imovel.cep}` : ""}
              </p>
            )}
            {imovel.comarca && <p className="mt-1 text-zinc-500">Comarca: {imovel.comarca}</p>}
            {imovel.matricula && <p className="mt-1 text-zinc-500">Matrícula: {imovel.matricula}</p>}
          </div>
        )}

        {/* 8. Descrição */}
        {imovel.descricao && (
          <div className="mt-4">
            <h2 className="text-sm font-medium text-zinc-300">Descrição</h2>
            <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-zinc-400">{imovel.descricao}</p>
          </div>
        )}

        {/* 9. Botão principal */}
        <div className="mt-6">
          {removido ? (
            <Link
              href={urlCidade}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 hover:bg-zinc-700"
            >
              Ver imóveis disponíveis em {cidade}
            </Link>
          ) : imovel.linkCaixa ? (
            <a
              href={imovel.linkCaixa}
              target="_blank"
              rel="nofollow noopener"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Ver no site da Caixa
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
