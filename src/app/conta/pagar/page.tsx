import Link from "next/link";
import { and, eq } from "drizzle-orm";
import QRCode from "qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cobrancas } from "@/lib/db/schema";
import { getAssinante, PRECOS } from "@/lib/assinatura";
import CopiaECola from "./CopiaECola";

// Mesmo motivo das outras páginas com banco: o runner do Coolify não alcança
// o Postgres no build (ver `[state]/page.tsx`).
export const dynamic = "force-dynamic";

export const metadata = { title: "Pagamento — Leilão de Imóveis Caixa" };

/**
 * Tela de pagamento do provedor `pix` (ver `src/lib/pagamento/pix-estatico.ts`).
 * Ela NÃO gera o código: relê o BR Code que foi gravado em `cobrancas.payload`
 * quando o checkout começou, filtrando pelo assinante logado — assim ninguém
 * abre o `?ref=` de outra pessoa, e um F5 não troca o `txid`.
 */
export default async function PagarPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const assinante = await getAssinante();
  const { ref } = await searchParams;

  if (!assinante) {
    return (
      <Moldura titulo="Entre para continuar" descricao="É preciso estar logado para ver o pagamento.">
        <Button className="w-full" render={<Link href="/entrar" />}>
          Entrar
        </Button>
      </Moldura>
    );
  }

  const [cobranca] = ref
    ? await db
        .select({ payload: cobrancas.payload, valor: cobrancas.valor, criadoEm: cobrancas.criadoEm })
        .from(cobrancas)
        .where(
          and(
            eq(cobrancas.provedorEventoId, ref),
            eq(cobrancas.assinanteId, assinante.id),
            eq(cobrancas.provedor, "pix")
          )
        )
        .limit(1)
    : [];

  const payload = (cobranca?.payload ?? null) as { brcode?: string; plano?: string } | null;
  const brcode = payload?.brcode;

  if (!brcode) {
    return (
      <Moldura
        titulo="Cobrança não encontrada"
        descricao="Esse pagamento não existe ou é de outra conta. Comece de novo pela sua conta."
      >
        <Button className="w-full" render={<Link href="/conta" />}>
          Voltar para a conta
        </Button>
      </Moldura>
    );
  }

  const plano = payload?.plano === "anual" ? "anual" : "mensal";
  const valor = Number(cobranca.valor ?? PRECOS[plano].valor);
  const qrSvg = await QRCode.toString(brcode, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff" },
  });

  return (
    <Moldura
      titulo={`Pague R$ ${valor.toFixed(2).replace(".", ",")} por PIX`}
      descricao={`Plano ${plano === "anual" ? "anual" : "mensal"} · escaneie o QR ou use o copia e cola`}
    >
      <div className="space-y-4">
        <div
          className="mx-auto w-48 rounded-lg bg-white p-3 [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <CopiaECola brcode={brcode} />
        <div className="space-y-2 rounded-md border border-zinc-800 bg-zinc-950/60 p-3 text-xs text-zinc-400">
          <p>
            Identificador desta cobrança: <span className="font-mono text-zinc-300">{ref}</span>
          </p>
          <p>
            Assim que a entrada for conferida, sua conta vira <strong>ativa</strong> — normalmente no
            mesmo dia útil. Você não precisa mandar comprovante: a gente casa pelo valor e por esse
            identificador.
          </p>
          <p>
            Algum problema com o pagamento? Escreva para{" "}
            <a className="underline hover:text-zinc-200" href="mailto:contato@crimebrasil.com.br">
              contato@crimebrasil.com.br
            </a>{" "}
            com o identificador acima.
          </p>
        </div>
        <Button variant="outline" className="w-full" render={<Link href="/conta" />}>
          Voltar para a conta
        </Button>
      </div>
    </Moldura>
  );
}

function Moldura({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-zinc-100">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-xl">{titulo}</CardTitle>
          <CardDescription className="text-zinc-400">{descricao}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
