import type { Metadata } from "next";
import { metaSeo } from "@/lib/seo";

/**
 * Tela de autenticação não é conteúdo. Até o hard check de 31/08/2026 ela
 * herdava título e descrição da home, ficava indexável e sem canonical — duas
 * URLs disputando a mesma consulta com a própria home, que é canibalização
 * pura. Aqui ela ganha metadados próprios e `noindex, follow`: some do índice,
 * mas os links dela continuam sendo seguidos.
 */
export const metadata: Metadata = metaSeo({
  title: "Criar conta — Leilão de Imóveis da Caixa",
  description: "Crie uma conta grátis para salvar buscas e receber alerta quando entrar imóvel da Caixa que bate com o seu filtro.",
  path: "/cadastro",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
