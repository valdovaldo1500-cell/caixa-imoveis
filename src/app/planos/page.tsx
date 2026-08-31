import Link from "next/link";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAssinante, podeVer, PRECOS } from "@/lib/assinatura";

export const metadata = {
  title: "Planos — Leilão de Imóveis Caixa",
  description: "Acompanhe os leilões da Caixa e receba alerta quando entrar um imóvel que bate com a sua busca.",
};

// A lista do grátis é deliberadamente generosa: é o padrão do Arremata.ai,
// que abre quase tudo e cobra pelo extra. E a nota de segurança precisa ficar
// aberta porque é ela que traz gente pela busca — trancar o diferencial
// atrás da parede mataria o próprio canal de aquisição.
const RECURSOS_GRATIS = [
  "Todos os imóveis em leilão, sem limite",
  "Ficha completa de cada imóvel",
  "Nota de segurança do bairro ou do município, conforme a cobertura",
  "Filtro por nota de segurança",
  "Matrícula, comarca e edital de cada imóvel, quando a Caixa publica",
];

// Só entra aqui o que já está construído. A pesquisa de mercado mostrou que
// o alerta é o gancho principal de 100% dos concorrentes pagos — é ele que
// sustenta a assinatura, não uma lista comprida de promessas.
const RECURSOS_PAGOS = [
  "Alerta por e-mail quando um imóvel novo bate com sua busca",
  "Buscas salvas ilimitadas, por cidade, preço, desconto e segurança",
];

export default async function PlanosPage() {
  const assinante = await getAssinante();
  const jaAssina = podeVer(assinante, "alertas");

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white">Planos</h1>
          <p className="mx-auto max-w-xl text-sm text-zinc-400">
            O imóvel e o edital você vê de graça, sempre. O plano pago é para
            quem quer ser avisado primeiro e quer saber a segurança da região
            antes de decidir — somos os únicos que mostram esse dado.
          </p>
          {assinante && (
            <p className="text-xs text-zinc-500">
              Logado como {assinante.email} — plano atual:{" "}
              <span className="font-medium text-zinc-300">
                {assinante.plano === "livre" ? "Grátis" : assinante.plano === "mensal" ? "Mensal" : "Anual"}
              </span>
              {jaAssina ? " (ativo)" : assinante.status === "pendente" ? " (pagamento pendente)" : ""}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Grátis */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Grátis</CardTitle>
                <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                  R$ 0
                </Badge>
              </div>
              <CardDescription className="text-zinc-400">
                Para quem quer garimpar imóvel sem compromisso.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-zinc-300">
                {RECURSOS_GRATIS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Separator className="bg-zinc-800" />
              <ul className="space-y-2 text-sm text-zinc-500">
                {RECURSOS_PAGOS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                    {item}
                  </li>
                ))}
              </ul>
              {!assinante && (
                <Button size="lg" variant="outline" className="w-full" render={<Link href="/cadastro" />}>
                  Criar conta grátis
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Pago */}
          <Card className="bg-zinc-900 border-emerald-700/60 ring-1 ring-emerald-700/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Mensal &amp; Anual</CardTitle>
                <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-600/40" variant="outline">
                  Alertas
                </Badge>
              </div>
              <CardDescription className="text-zinc-400">
                Tudo do grátis, mais o que avisa você primeiro.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-center">
                  <p className="text-lg font-semibold text-white">{PRECOS.mensal.rotulo}</p>
                  <p className="text-xs text-zinc-500">plano mensal</p>
                </div>
                <div className="rounded-lg border border-emerald-700/50 bg-emerald-950/20 p-3 text-center">
                  <p className="text-lg font-semibold text-white">{PRECOS.anual.rotulo}</p>
                  <p className="text-xs text-emerald-400">{PRECOS.anual.equivalenteMensal}</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-zinc-300">
                {RECURSOS_GRATIS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
                {RECURSOS_PAGOS.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-medium">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>

              {jaAssina ? (
                <Button size="lg" className="w-full" render={<Link href="/conta" />}>
                  Ver minha conta
                </Button>
              ) : assinante ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button size="lg" className="w-full" render={<Link href="/conta?assinar=mensal" />}>
                    Assinar mensal
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" render={<Link href="/conta?assinar=anual" />}>
                    Assinar anual
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button size="lg" className="w-full" render={<Link href="/cadastro?plano=mensal" />}>
                    Assinar mensal
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" render={<Link href="/cadastro?plano=anual" />}>
                    Assinar anual
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-zinc-600">
          {assinante ? (
            <>
              Não é você? <Link href="/api/assinatura/sair" className="underline hover:text-zinc-400">Sair</Link>
            </>
          ) : (
            <>
              Já tem conta? <Link href="/entrar" className="underline hover:text-zinc-400">Entrar</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
