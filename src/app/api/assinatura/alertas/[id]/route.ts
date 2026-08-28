import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { alertas } from "@/lib/db/schema";
import { getAssinanteIdFromRequest } from "@/lib/assinatura";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const assinanteId = getAssinanteIdFromRequest(request);
  if (!assinanteId) {
    return NextResponse.json({ error: "É preciso estar logado" }, { status: 401 });
  }

  const { id } = await params;
  const alertaId = parseInt(id, 10);
  if (isNaN(alertaId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if ("nome" in body) patch.nome = body.nome ? String(body.nome).trim().slice(0, 80) : null;
  if ("uf" in body) patch.uf = body.uf ? String(body.uf).trim().toUpperCase().slice(0, 2) : null;
  if ("cidade" in body) patch.cidade = body.cidade ? String(body.cidade).trim().slice(0, 100) : null;
  if ("precoMax" in body) {
    const v = body.precoMax != null && body.precoMax !== "" ? Number(body.precoMax) : null;
    patch.precoMax = v != null && Number.isFinite(v) ? v.toString() : null;
  }
  if ("descontoMin" in body) {
    const v = body.descontoMin != null && body.descontoMin !== "" ? Number(body.descontoMin) : null;
    patch.descontoMin = v != null && Number.isFinite(v) ? v.toString() : null;
  }
  if ("tipoImovel" in body) patch.tipoImovel = body.tipoImovel ? String(body.tipoImovel).trim().slice(0, 50) : null;
  if ("crimeNotaMax" in body) {
    const v = body.crimeNotaMax != null && body.crimeNotaMax !== "" ? Number(body.crimeNotaMax) : null;
    patch.crimeNotaMax = v != null && Number.isFinite(v) ? v : null;
  }
  if ("ativo" in body) patch.ativo = Boolean(body.ativo);

  // where com assinanteId embutido — nunca deixa editar alerta de outra conta.
  const [atualizado] = await db
    .update(alertas)
    .set(patch)
    .where(and(eq(alertas.id, alertaId), eq(alertas.assinanteId, assinanteId)))
    .returning();

  if (!atualizado) {
    return NextResponse.json({ error: "Alerta não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ alerta: atualizado });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const assinanteId = getAssinanteIdFromRequest(request);
  if (!assinanteId) {
    return NextResponse.json({ error: "É preciso estar logado" }, { status: 401 });
  }

  const { id } = await params;
  const alertaId = parseInt(id, 10);
  if (isNaN(alertaId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const deletado = await db
    .delete(alertas)
    .where(and(eq(alertas.id, alertaId), eq(alertas.assinanteId, assinanteId)))
    .returning();

  if (deletado.length === 0) {
    return NextResponse.json({ error: "Alerta não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
