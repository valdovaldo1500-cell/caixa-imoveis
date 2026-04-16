import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { and, isNull, isNotNull, gte, lte, ilike, SQL, sql, eq } from "drizzle-orm";
import { STATE_META } from "@/lib/state";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const modalidadeParam = searchParams.get("modalidade");
  const descontoMin = searchParams.get("desconto_min");
  const descontoMax = searchParams.get("desconto_max");
  const precoMin = searchParams.get("preco_min");
  const precoMax = searchParams.get("preco_max");
  const tipoParam = searchParams.get("tipo");
  const maxDistance = searchParams.get("max_distance");
  const ufParam = searchParams.get("uf");

  // Get center coords from STATE_META (default to RS)
  const uf = ufParam?.toUpperCase() ?? "RS";
  const meta = STATE_META[uf] ?? STATE_META["RS"];
  const CENTER_LAT = meta.centerLat;
  const CENTER_LNG = meta.centerLng;

  const modalidades = modalidadeParam ? modalidadeParam.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const tipos = tipoParam ? tipoParam.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const conditions: SQL[] = [
    isNull(properties.removedAt),
    isNotNull(properties.lat),
  ];

  if (ufParam) {
    conditions.push(eq(properties.uf, ufParam.toUpperCase()));
  }

  if (modalidades.length === 1) {
    conditions.push(ilike(properties.modalidadeVenda, modalidades[0]));
  } else if (modalidades.length > 1) {
    conditions.push(sql`(${sql.join(modalidades.map((m) => ilike(properties.modalidadeVenda, m)), sql` OR `)})`);
  }

  if (descontoMin) {
    const min = parseFloat(descontoMin);
    if (!isNaN(min)) {
      conditions.push(gte(properties.desconto, String(min)));
    }
  }

  if (descontoMax) {
    const max = parseFloat(descontoMax);
    if (!isNaN(max)) {
      conditions.push(lte(properties.desconto, String(max)));
    }
  }

  if (precoMin) {
    const min = parseFloat(precoMin);
    if (!isNaN(min)) {
      conditions.push(gte(properties.preco, String(min)));
    }
  }

  if (precoMax) {
    const max = parseFloat(precoMax);
    if (!isNaN(max)) {
      conditions.push(lte(properties.preco, String(max)));
    }
  }

  if (tipos.length === 1) {
    conditions.push(ilike(properties.tipoImovel, `%${tipos[0]}%`));
  } else if (tipos.length > 1) {
    conditions.push(sql`(${sql.join(tipos.map((t) => ilike(properties.tipoImovel, `%${t}%`)), sql` OR `)})`);
  }

  if (maxDistance) {
    const dist = parseFloat(maxDistance);
    if (!isNaN(dist)) {
      conditions.push(sql`
        (6371 * acos(
          cos(radians(${CENTER_LAT})) * cos(radians(${properties.lat}::float)) *
          cos(radians(${properties.lng}::float) - radians(${CENTER_LNG})) +
          sin(radians(${CENTER_LAT})) * sin(radians(${properties.lat}::float))
        )) <= ${dist}
      `);
    }
  }

  const data = await db
    .select({
      id: properties.id,
      cidade: properties.cidade,
      bairro: properties.bairro,
      preco: properties.preco,
      valorAvaliacao: properties.valorAvaliacao,
      desconto: properties.desconto,
      tipoImovel: properties.tipoImovel,
      quartos: properties.quartos,
      vagas: properties.vagas,
      areaPrivativaM2: properties.areaPrivativaM2,
      score: properties.score,
      marketValue: properties.marketValue,
      modalidadeVenda: properties.modalidadeVenda,
      linkCaixa: properties.linkCaixa,
      fotoUrl: properties.fotoUrl,
      lat: properties.lat,
      lng: properties.lng,
    })
    .from(properties)
    .where(and(...conditions));

  return NextResponse.json({ data });
}
