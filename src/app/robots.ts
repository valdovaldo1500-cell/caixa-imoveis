import type { MetadataRoute } from "next";

/**
 * `sitemap.ts` usa `generateSitemaps` (mais de 5.000 URLs — ver comentário
 * lá). Isso quer dizer que não existe um `/sitemap.xml` de índice: o Next
 * serve cada seção em `/sitemap/<id>.xml`. O protocolo de sitemap aceita
 * múltiplas linhas `Sitemap:` num único robots.txt — é o próprio mecanismo
 * de índice, então listamos as três aqui.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://imoveis.crimebrasil.com.br").replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/rs/", "/go/"],
    },
    sitemap: [
      `${SITE_URL}/sitemap/estrutura.xml`,
      `${SITE_URL}/sitemap/imoveis-go.xml`,
      `${SITE_URL}/sitemap/imoveis-rs.xml`,
    ],
    host: SITE_URL,
  };
}
