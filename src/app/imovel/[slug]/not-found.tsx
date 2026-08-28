import Link from "next/link";

/**
 * Só entra em cena quando o `caixaId` do slug não existe na base — nunca
 * para um imóvel removido (esse caso é tratado dentro de page.tsx com um
 * aviso, sem 404, porque a URL pode já estar indexada).
 */
export default function ImovelNaoEncontrado() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold text-zinc-100">Imóvel não encontrado</h1>
      <p className="text-sm text-zinc-400">
        Esse endereço não corresponde a nenhum imóvel da nossa base. Pode ser um link digitado
        errado ou um imóvel que já saiu do catálogo definitivamente.
      </p>
      <Link href="/" className="text-sm font-medium text-emerald-400 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
