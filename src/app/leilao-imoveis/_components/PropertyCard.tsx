import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlocoSeguranca } from "@/components/BlocoSeguranca";
import { imovelUrl } from "@/lib/slug";
import { areaTexto, dataCurta, descontoTexto, formatBRL, proximaDataUrgencia, tituloCaso } from "../_lib/format";
import type { ImovelCard } from "../_lib/queries";

/**
 * Anatomia do card (auditada no Arremata.ai e no LeilôAI, ver
 * research/concorrente-leilao/SEO.md): desconto → modalidade → foto → título
 * → cidade/UF → segurança → área → preço com avaliação riscada → botão.
 * O desconto é o elemento de maior peso visual — é o que todo concorrente
 * destaca primeiro.
 */
export function PropertyCard({ imovel }: { imovel: ImovelCard }) {
  const desconto = descontoTexto(imovel.desconto);
  const area = areaTexto(imovel.areaPrivativaM2 ?? imovel.areaTotalM2);
  const preco = formatBRL(imovel.preco);
  const valorAvaliacao = formatBRL(imovel.valorAvaliacao);
  const bairro = tituloCaso(imovel.bairro);
  const cidade = tituloCaso(imovel.cidade);
  const tipo = imovel.tipoImovel ?? "Imóvel";
  const alt = bairro ? `${tipo} em ${bairro}, ${cidade}` : `${tipo} em ${cidade}`;
  // Urgência (O6, requisito #7): só a data mais próxima e FUTURA. Sem
  // countdown pra data que já passou — não inventamos escassez.
  const urgencia = proximaDataUrgencia(imovel);

  return (
    <Link
      href={imovelUrl(imovel)}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 transition hover:border-zinc-700"
    >
      <div className="relative aspect-[4/3] bg-zinc-900">
        {desconto && (
          <Badge className="absolute left-2 top-2 z-10 h-auto border-transparent bg-emerald-600 px-2.5 py-1 text-sm font-bold text-white shadow-lg shadow-black/40">
            -{desconto}%
          </Badge>
        )}
        {imovel.modalidadeVenda && (
          <Badge
            variant="outline"
            className="absolute right-2 top-2 z-10 h-auto max-w-[65%] truncate border-zinc-700 bg-zinc-950/90 px-2 py-0.5 text-[11px] text-zinc-200 shadow-lg shadow-black/40"
          >
            {imovel.modalidadeVenda}
          </Badge>
        )}
        {urgencia && (
          <Badge className="absolute bottom-2 left-2 z-10 h-auto gap-1 border-transparent bg-zinc-950/90 px-2 py-0.5 text-[11px] text-amber-300 shadow-lg shadow-black/40">
            <CalendarClock className="size-3" />
            {urgencia.rotulo} em {dataCurta(urgencia.valor)}
          </Badge>
        )}
        {imovel.fotoUrl ? (
          // Fotos vêm de domínios variados da Caixa/scraper — <img> simples
          // evita ter que manter remotePatterns no next.config.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imovel.fotoUrl}
            alt={alt}
            loading="lazy"
            className="h-full w-full bg-zinc-900 object-cover text-transparent"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">Sem foto</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="min-h-[2.75rem]">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-zinc-100">
            {bairro ? `${tipo} — ${bairro}` : tipo}
          </h3>
          <p className="text-xs text-zinc-500">
            {cidade}/{imovel.uf}
          </p>
        </div>

        <BlocoSeguranca imovel={imovel} cidade={cidade} compacto />

        {area && <p className="text-xs text-zinc-400">{area}</p>}

        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-semibold text-zinc-100">{preco ?? "Sob consulta"}</p>
            {valorAvaliacao && <p className="text-xs text-zinc-500 line-through">{valorAvaliacao}</p>}
          </div>
          <span className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition group-hover:bg-emerald-500">
            Ver imóvel
          </span>
        </div>
      </div>
    </Link>
  );
}
