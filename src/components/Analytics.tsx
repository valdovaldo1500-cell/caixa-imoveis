"use client";

import Script from "next/script";

/**
 * GA4 no site público de leilões (O6).
 *
 * Por que a MESMA propriedade do crimebrasil.com.br (G-EYENXNM0EG) em vez de
 * uma nova: subdomínio na mesma propriedade é o padrão do GA4, o tráfego se
 * separa por hostname no relatório, e não depende de ninguém criar
 * propriedade no painel — o que travaria a medição por dias. Se um dia o
 * produto justificar propriedade própria, basta trocar a env.
 *
 * Só carrega em produção e só no site público: o painel interno da equipe
 * não é produto e mediria uso nosso como se fosse visitante.
 *
 * `afterInteractive` de propósito: o script não pode competir com o LCP.
 * A regra da casa exige CWV medido antes e depois — ver o PR.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function Analytics() {
  if (!GA_ID) return null;

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
