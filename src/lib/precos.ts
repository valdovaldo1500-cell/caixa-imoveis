/**
 * Faixas de preço da assinatura (O6).
 *
 * Vive fora de `assinatura.ts` porque aquele arquivo importa `next/headers` e o
 * banco — é servidor puro. A tela de cadastro é `"use client"` e precisa mostrar
 * qual plano a pessoa escolheu; importar `assinatura.ts` de lá arrastaria
 * `cookies()` e o Drizzle para o bundle do navegador e quebraria o build.
 *
 * `assinatura.ts` reexporta daqui, então quem já importava `PRECOS` de lá
 * continua funcionando.
 */
export const PRECOS = {
  mensal: { valor: 49.9, rotulo: "R$ 49,90/mês" },
  anual: { valor: 499, rotulo: "R$ 499/ano", equivalenteMensal: "R$ 41,58/mês" },
} as const;

export type PlanoPago = keyof typeof PRECOS;
