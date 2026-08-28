import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assinantes } from "@/lib/db/schema";
import { verificarSenha, assinarSessaoAssinante, COOKIE_ASSINANTE, COOKIE_ASSINANTE_OPTIONS } from "@/lib/assinatura";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const senha = String(body.senha || "");

  if (!email || !senha) {
    return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 });
  }

  const [assinante] = await db
    .select({ id: assinantes.id, senhaHash: assinantes.senhaHash })
    .from(assinantes)
    .where(eq(assinantes.email, email))
    .limit(1);

  // Mesma mensagem para "não existe" e "senha errada" — não vazar qual dos
  // dois é o caso.
  const senhaOk = assinante ? await verificarSenha(senha, assinante.senhaHash) : false;
  if (!assinante || !senhaOk) {
    return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
  }

  await db
    .update(assinantes)
    .set({ ultimoAcessoEm: new Date() })
    .where(eq(assinantes.id, assinante.id));

  const token = assinarSessaoAssinante(assinante.id);
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_ASSINANTE, token, COOKIE_ASSINANTE_OPTIONS);
  return response;
}
