import { SITE_URL, urlAbs } from "./seo";

/**
 * Dados estruturados do site público (O6).
 *
 * O hard check de 31/08/2026 encontrou JSON-LD só na ficha do imóvel — e lá,
 * malformado: o objeto declarava `"@type": ["Product", "Offer"]`, o que não
 * existe no schema.org. Um Product **contém** uma Offer em `offers`; declarar
 * os dois no mesmo nó faz o Google descartar preço e disponibilidade, que é
 * justamente o que renderiza preço no resultado de busca.
 *
 * A serialização segura mora em `@/app/imovel/_lib/helpers` desde antes deste
 * arquivo; é reexportada aqui para haver UM lugar por onde o JSON-LD passa,
 * em vez de duas cópias da mesma proteção contra `</script>`.
 */
export { jsonLdSeguro } from "@/app/imovel/_lib/helpers";

export function breadcrumb(trilha: { nome: string; caminho: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.nome,
      item: urlAbs(t.caminho),
    })),
  };
}

/**
 * Lista de imóveis de uma página de cidade ou hub. `ItemList` com URLs é o que
 * o Google usa para entender que a página é um índice e não conteúdo fino —
 * e é o caminho de descoberta das fichas que não cabem na primeira página.
 */
export function itemList(nome: string, urls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nome,
    numberOfItems: urls.length,
    itemListElement: urls.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: urlAbs(u),
    })),
  };
}

export function artigo({
  titulo,
  descricao,
  caminho,
  atualizadoEm,
}: {
  titulo: string;
  descricao: string;
  caminho: string;
  atualizadoEm: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titulo,
    description: descricao,
    mainEntityOfPage: urlAbs(caminho),
    dateModified: atualizadoEm.toISOString(),
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "Leilão de Imóveis da Caixa", url: SITE_URL },
  };
}

export function websiteEOrganizacao() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: "Leilão de Imóveis da Caixa",
        inLanguage: "pt-BR",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Leilão de Imóveis da Caixa",
        url: SITE_URL,
      },
    ],
  };
}
