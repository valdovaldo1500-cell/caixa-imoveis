import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes } from "@/lib/db/schema";
import { getAssinanteIdFromRequest, getProvedorPagamento } from "@/lib/assinatura";

export async function POST(request: Request) {
  const assinanteId = getAssinanteIdFromRequest(request);
  if (!assinanteId) {
    return NextResponse.json({ error: "É preciso estar logado" }, { status: 401 });
  }

  const [assinante] = await db
    .select({ id: assinantes.id, provedorAssinaturaId: assinantes.provedorAssinaturaId })
    .from(assinantes)
    .where(eq(assinantes.id, assinanteId))
    .limit(1);

  if (!assinante) {
    return NextResponse.json({ error: "Conta não encontrada" }, { status: 404 });
  }

  const provedor = getProvedorPagamento();
  const resultado = await provedor.cancelarAssinatura({
    assinanteId: assinante.id,
    provedorAssinaturaId: assinante.provedorAssinaturaId,
  });

  // Com o provedor demo, `cancelarAssinatura` sempre volta `ok: true` (é só
  // cosmético). Com o PagBank de verdade, se a chamada ao provedor falhar
  // (ex.: `PAGSEGURO_ASSINATURAS_TOKEN` ausente), NÃO marcamos `cancelada`
  // aqui — senão o produto acha que parou de cobrar enquanto o PagBank
  // continua debitando o cartão do assinante nos próximos ciclos.
  if (!resultado.ok) {
    return NextResponse.json({ error: resultado.erro || "Não foi possível cancelar no provedor" }, { status: 502 });
  }

  // O acesso pago continua até `validoAte` — cancelar não corta na hora,
  // só desliga a renovação. `podeVer()` já sabe ler isso.
  await db
    .update(assinantes)
    .set({ status: "cancelada", canceladoEm: new Date() })
    .where(eq(assinantes.id, assinanteId));

  return NextResponse.json({ success: true });
}
