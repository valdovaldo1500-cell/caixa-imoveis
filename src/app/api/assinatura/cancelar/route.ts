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
  await provedor.cancelarAssinatura({
    assinanteId: assinante.id,
    provedorAssinaturaId: assinante.provedorAssinaturaId,
  });

  // O acesso pago continua até `validoAte` — cancelar não corta na hora,
  // só desliga a renovação. `podeVer()` já sabe ler isso.
  await db
    .update(assinantes)
    .set({ status: "cancelada", canceladoEm: new Date() })
    .where(eq(assinantes.id, assinanteId));

  return NextResponse.json({ success: true });
}
