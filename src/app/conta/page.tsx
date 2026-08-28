import Link from "next/link";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { alertas as alertasTable } from "@/lib/db/schema";
import { getAssinante, podeVer } from "@/lib/assinatura";
import AssinarBotoes from "./AssinarBotoes";
import CancelarBotao from "./CancelarBotao";
import AlertasPainel, { type AlertaCliente } from "./AlertasPainel";

export const metadata = { title: "Minha conta — Leilão de Imóveis Caixa" };

const ROTULO_PLANO: Record<string, string> = { livre: "Grátis", mensal: "Mensal", anual: "Anual" };
const ROTULO_STATUS: Record<string, string> = {
  ativa: "Ativa",
  pendente: "Pagamento pendente",
  cancelada: "Cancelada",
  inadimplente: "Pagamento não reconhecido",
};

function formatarData(d: Date | null): string | null {
  if (!d) return null;
  return new Date(d).toLocaleDateString("pt-BR");
}

export default async function ContaPage({
  searchParams,
}: {
  searchParams: Promise<{ assinar?: string }>;
}) {
  const assinante = await getAssinante();
  const { assinar } = await searchParams;

  if (!assinante) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-zinc-100">
        <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800 text-center">
          <CardHeader>
            <CardTitle className="text-white">Você ainda não entrou</CardTitle>
            <CardDescription className="text-zinc-400">
              Entre ou crie uma conta grátis para ver seu plano e seus alertas.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button size="lg" render={<Link href="/entrar" />}>
              Entrar
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/cadastro" />}>
              Criar conta grátis
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const liberado = podeVer(assinante, "alertas");

  const linhas = await db
    .select()
    .from(alertasTable)
    .where(eq(alertasTable.assinanteId, assinante.id));

  const listaAlertas: AlertaCliente[] = linhas.map((a) => ({
    id: a.id,
    nome: a.nome,
    uf: a.uf,
    cidade: a.cidade,
    precoMax: a.precoMax,
    descontoMin: a.descontoMin,
    tipoImovel: a.tipoImovel,
    crimeNotaMax: a.crimeNotaMax,
    ativo: a.ativo,
    ultimoEnvioEm: a.ultimoEnvioEm ? a.ultimoEnvioEm.toISOString() : null,
    criadoEm: a.criadoEm.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Minha conta</h1>
            <p className="text-sm text-zinc-400">{assinante.email}</p>
          </div>
          <a href="/api/assinatura/sair" className="text-xs text-zinc-500 underline hover:text-zinc-300">
            Sair
          </a>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Plano</CardTitle>
              <Badge
                variant="outline"
                className={liberado ? "border-emerald-700 text-emerald-300" : "border-zinc-700 text-zinc-300"}
              >
                {ROTULO_PLANO[assinante.plano] ?? assinante.plano}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-400">
              Status: <span className="text-zinc-200">{ROTULO_STATUS[assinante.status] ?? assinante.status}</span>
              {assinante.validoAte && <> · válido até {formatarData(assinante.validoAte)}</>}
            </p>

            {!liberado && (
              <AssinarBotoes planoSugerido={assinar === "anual" ? "anual" : "mensal"} />
            )}

            {liberado && assinante.status === "ativa" && <CancelarBotao />}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Alertas</CardTitle>
            <CardDescription className="text-zinc-400">
              Avisamos quando um imóvel novo bater com sua busca.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {liberado ? (
              <AlertasPainel alertasIniciais={listaAlertas} />
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-700 p-4 text-center">
                <p className="text-sm text-zinc-400">
                  Alertas são um recurso dos planos Mensal e Anual.
                </p>
                <Link href="/planos" className="mt-2 inline-block text-sm text-emerald-400 underline">
                  Ver planos
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
