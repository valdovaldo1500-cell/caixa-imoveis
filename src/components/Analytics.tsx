"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * GA4 no site público de leilões (O6).
 *
 * Por que a MESMA propriedade do crimebrasil.com.br (G-EYENXNM0EG) em vez de
 * uma nova: subdomínio na mesma propriedade é o padrão do GA4, o tráfego se
 * separa por hostname no relatório, e não depende de ninguém criar
 * propriedade no painel — o que travaria a medição por dias. Se um dia o
 * produto justificar propriedade própria, basta trocar a env.
 *
 * Sai por `NEXT_PUBLIC_GA_ID`; sem a env, nada carrega. Como é `NEXT_PUBLIC_*`,
 * o Next INLINA o valor no build — por isso a var precisa estar no `ARG` do
 * Dockerfile e no `build.args` do docker-compose.prod.yml, não só no runtime.
 * Sem isso o script some sem erro nenhum.
 *
 * Lista de PERMISSÃO por rota, não de bloqueio: só o site público é medido.
 * O painel interno da equipe (`/rs/...`, `/go/...`, `/login`) não é produto —
 * medir nosso próprio uso como se fosse visitante estragaria o único número
 * que o plano pede do O6, que é se a camada de segurança converte. Falha
 * fechada de propósito: rota nova nasce sem medição até ser listada aqui.
 *
 * `afterInteractive` de propósito: o script não pode competir com o LCP.
 * A regra da casa exige CWV medido antes e depois — ver o PR.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const ROTAS_PUBLICAS = [
  "/leilao-imoveis",
  "/imovel",
  // Os guias são justamente a aposta de busca orgânica do O6; deixá-los fora
  // desta lista mediria tudo MENOS o canal que eles existem para abrir.
  "/guias",
  "/planos",
  "/cadastro",
  "/conta",
  "/entrar",
];

function ehSitePublico(pathname: string): boolean {
  if (pathname === "/") return true;
  return ROTAS_PUBLICAS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function Analytics() {
  const pathname = usePathname();

  if (!GA_ID) return null;
  if (!ehSitePublico(pathname ?? "")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
