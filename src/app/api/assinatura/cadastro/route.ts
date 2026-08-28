import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes } from "@/lib/db/schema";
import { hashSenha, assinarSessaoAssinante, COOKIE_ASSINANTE, COOKIE_ASSINANTE_OPTIONS } from "@/lib/assinatura";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const senha = String(body.senha || "");
  const nome = body.nome ? String(body.nome).trim().slice(0, 120) : null;
  const telefone = body.telefone ? String(body.telefone).trim().slice(0, 20) : null;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }
  if (senha.length < 8) {
    return NextResponse.json({ error: "Senha precisa de pelo menos 8 caracteres" }, { status: 400 });
  }

  const [existente] = await db
    .select({ id: assinantes.id })
    .from(assinantes)
    .where(eq(assinantes.email, email))
    .limit(1);

  if (existente) {
    return NextResponse.json({ error: "Já existe conta com esse e-mail" }, { status: 409 });
  }

  const senhaHash = await hashSenha(senha);

  // Conta grátis por padrão (plano "livre") — não pede cartão nenhum.
  const [novo] = await db
    .insert(assinantes)
    .values({ email, senhaHash, nome, telefone, plano: "livre", status: "ativa" })
    .returning({ id: assinantes.id });

  const token = assinarSessaoAssinante(novo.id);
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_ASSINANTE, token, COOKIE_ASSINANTE_OPTIONS);
  return response;
}
