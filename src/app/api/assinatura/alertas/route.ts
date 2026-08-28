import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { alertas } from "@/lib/db/schema";
import { getAssinanteIdFromRequest, podeVer, type AssinanteSessao } from "@/lib/assinatura";
import { assinantes } from "@/lib/db/schema";

async function carregarAssinante(assinanteId: number): Promise<AssinanteSessao | null> {
  const [row] = await db
    .select({
      id: assinantes.id,
      email: assinantes.email,
      nome: assinantes.nome,
      telefone: assinantes.telefone,
      plano: assinantes.plano,
      status: assinantes.status,
      validoAte: assinantes.validoAte,
      criadoEm: assinantes.criadoEm,
    })
    .from(assinantes)
    .where(eq(assinantes.id, assinanteId))
    .limit(1);
  return row ?? null;
}

export async function GET(request: Request) {
  const assinanteId = getAssinanteIdFromRequest(request);
  if (!assinanteId) {
    return NextResponse.json({ error: "É preciso estar logado" }, { status: 401 });
  }

  const lista = await db.select().from(alertas).where(eq(alertas.assinanteId, assinanteId));
  return NextResponse.json({ alertas: lista });
}

export async function POST(request: Request) {
  const assinanteId = getAssinanteIdFromRequest(request);
  if (!assinanteId) {
    return NextResponse.json({ error: "É preciso estar logado" }, { status: 401 });
  }

  const assinante = await carregarAssinante(assinanteId);
  if (!podeVer(assinante, "alertas")) {
    return NextResponse.json(
      { error: "Alertas são um recurso do plano pago", upgrade: "/planos" },
      { status: 403 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const nome = body.nome ? String(body.nome).trim().slice(0, 80) : null;
  const uf = body.uf ? String(body.uf).trim().toUpperCase().slice(0, 2) : null;
  const cidade = body.cidade ? String(body.cidade).trim().slice(0, 100) : null;
  const precoMax = body.precoMax != null && body.precoMax !== "" ? Number(body.precoMax) : null;
  const descontoMin = body.descontoMin != null && body.descontoMin !== "" ? Number(body.descontoMin) : null;
  const tipoImovel = body.tipoImovel ? String(body.tipoImovel).trim().slice(0, 50) : null;
  const crimeNotaMax = body.crimeNotaMax != null && body.crimeNotaMax !== "" ? Number(body.crimeNotaMax) : null;

  const [criado] = await db
    .insert(alertas)
    .values({
      assinanteId,
      nome,
      uf,
      cidade,
      precoMax: precoMax != null && Number.isFinite(precoMax) ? precoMax.toString() : null,
      descontoMin: descontoMin != null && Number.isFinite(descontoMin) ? descontoMin.toString() : null,
      tipoImovel,
      crimeNotaMax: crimeNotaMax != null && Number.isFinite(crimeNotaMax) ? crimeNotaMax : null,
      ativo: true,
    })
    .returning();

  return NextResponse.json({ alerta: criado }, { status: 201 });
}
