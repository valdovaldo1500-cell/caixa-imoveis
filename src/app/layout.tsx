import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { SITE_URL } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// `metadataBase` faz o Next resolver canonical e og:url relativos em absolutos.
// Sem ela, uma página que declara `alternates.canonical: "/x"` emite caminho
// relativo — o Google aceita, mas qualquer scraper de rede social não.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Imóveis de leilão da Caixa", template: "%s" },
  description:
    "Imóveis da Caixa em leilão, com a nota de segurança do município ao lado de cada um.",
  // Padrão de Open Graph do site. Página que não declarar o seu herda este —
  // melhor um card genérico do que link cru, que era o estado até 31/08/2026.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Leilão de Imóveis da Caixa",
    title: "Imóveis de leilão da Caixa",
    description:
      "Imóveis da Caixa em leilão, com a nota de segurança do bairro ou do município ao lado de cada um.",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  // NOINDEX no site inteiro até o lançamento (decisão do dono, 03/09/2026).
  // O site entrou no índice em 31/08 (sitemaps submetidos nesse dia) e já
  // aparece na busca assinado "Crime Brasil" — mas ainda não foi lançado:
  // 2.010 dos 5.351 imóveis ativos não têm foto e 3.578 fichas de imóvel
  // removido respondem 200. Enquanto isso estiver assim, a marca do Crime
  // Brasil está associada a páginas incompletas. Sai do índice até ficar
  // pronto. `robots.txt` continua liberando o rastreio de propósito — o
  // Google precisa BUSCAR a página para enxergar este noindex.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
