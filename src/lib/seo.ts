import type { Metadata } from "next";

/**
 * Metadados de SEO do site público (O6).
 *
 * Existe porque o hard check de 31/08/2026 achou o site inteiro sem Open Graph
 * e sem Twitter Card: todo link colado no WhatsApp, LinkedIn ou X saía como URL
 * crua, sem título, sem descrição e sem imagem. Para um produto cujo canal de
 * aquisição é orgânico + compartilhamento, isso é o canal de compartilhamento
 * desligado.
 *
 * O Next NÃO preenche `og:title` a partir do `title` da página — se `openGraph`
 * não for declarado, a tag simplesmente não sai. Por isso toda página pública
 * monta os metadados por aqui, em vez de repetir o objeto e esquecer metade.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br"
).replace(/\/+$/, "");

const NOME_SITE = "Leilão de Imóveis da Caixa";

export function urlAbs(caminho: string): string {
  return caminho.startsWith("http") ? caminho : `${SITE_URL}${caminho}`;
}

export function metaSeo({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  /** Caminho da página (ex.: "/planos"). Vira canonical e og:url. */
  path: string;
  /** `true` em tela de autenticação: não é conteúdo, e indexada só canibaliza a home. */
  noindex?: boolean;
}): Metadata {
  const url = urlAbs(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: NOME_SITE,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
