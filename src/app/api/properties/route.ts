import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { sql, isNull, gte, lte, and, ilike } from "drizzle-orm";

// Porto Alegre center coordinates
const POA_LAT = -30.0346;
const POA_LNG = -51.2177;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = Math.max(1, parseInt(params.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(params.get("limit") || "50")));
  const offset = (page - 1) * limit;
  const sort = params.get("sort") || "desconto";
  const order = params.get("order") === "asc" ? "asc" : "desc";

  // Filters — support comma-separated multi-values for cidade, tipo, modalidade
  const cidadeParam = params.get("cidade");
  const tipoParam = params.get("tipo");
  const precoMin = params.get("preco_min");
  const precoMax = params.get("preco_max");
  const descontoMin = params.get("desconto_min");
  const modalidadeParam = params.get("modalidade");
  const search = params.get("q");
  const includeRemoved = params.get("removed") === "true";
  const maxDistance = params.get("max_distance");

  const cidades = cidadeParam ? cidadeParam.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const tipos = tipoParam ? tipoParam.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const modalidades = modalidadeParam ? modalidadeParam.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const conditions = [];

  if (!includeRemoved) {
    conditions.push(isNull(properties.removedAt));
  }
  if (cidades.length === 1) {
    conditions.push(ilike(properties.cidade, cidades[0]));
  } else if (cidades.length > 1) {
    // Use OR of ilike for case-insensitive multi-city matching
    conditions.push(sql`(${sql.join(cidades.map((c) => ilike(properties.cidade, c)), sql` OR `)})`);
  }
  if (tipos.length === 1) {
    conditions.push(
      sql`(${ilike(properties.tipoImovel, `%${tipos[0]}%`)} OR ${ilike(properties.descricao, `%${tipos[0]}%`)})`
    );
  } else if (tipos.length > 1) {
    conditions.push(
      sql`(${sql.join(tipos.map((t) => sql`(${ilike(properties.tipoImovel, `%${t}%`)} OR ${ilike(properties.descricao, `%${t}%`)})`), sql` OR `)})`
    );
  }
  if (precoMin) {
    conditions.push(gte(properties.preco, precoMin));
  }
  if (precoMax) {
    conditions.push(lte(properties.preco, precoMax));
  }
  if (descontoMin) {
    conditions.push(gte(properties.desconto, descontoMin));
  }
  if (modalidades.length === 1) {
    conditions.push(ilike(properties.modalidadeVenda, modalidades[0]));
  } else if (modalidades.length > 1) {
    conditions.push(sql`(${sql.join(modalidades.map((m) => ilike(properties.modalidadeVenda, m)), sql` OR `)})`);
  }
  if (maxDistance) {
    const dist = parseFloat(maxDistance);
    if (!isNaN(dist)) {
      conditions.push(sql`
        ${properties.lat} IS NOT NULL AND ${properties.lng} IS NOT NULL AND
        (6371 * acos(
          cos(radians(${POA_LAT})) * cos(radians(${properties.lat}::float)) *
          cos(radians(${properties.lng}::float) - radians(${POA_LNG})) +
          sin(radians(${POA_LAT})) * sin(radians(${properties.lat}::float))
        )) <= ${dist}
      `);
    }
  }
  // Full-text search using tsvector when q is provided
  let tsQuery: ReturnType<typeof sql> | null = null;
  if (search) {
    const words = search.trim().split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      // Multiple words: use FTS with AND logic, fallback to ilike for safety
      tsQuery = sql`plainto_tsquery('portuguese', ${search})`;
      conditions.push(sql`(
        ${properties.searchVector} @@ plainto_tsquery('portuguese', ${search})
        OR ${ilike(properties.cidade, `%${search}%`)}
        OR ${ilike(properties.bairro, `%${search}%`)}
      )`);
    } else {
      // Single word: prefix search via FTS + ilike fallback
      const prefixQuery = `${words[0]}:*`;
      tsQuery = sql`to_tsquery('portuguese', ${prefixQuery})`;
      conditions.push(sql`(
        ${properties.searchVector} @@ to_tsquery('portuguese', ${prefixQuery})
        OR ${ilike(properties.cidade, `%${search}%`)}
        OR ${ilike(properties.bairro, `%${search}%`)}
        OR ${ilike(properties.endereco, `%${search}%`)}
      )`);
    }
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  // Determine sort column — when searching, rank by relevance first
  const sortMap: Record<string, ReturnType<typeof sql>> = {
    desconto: sql`${properties.desconto}`,
    preco: sql`${properties.preco}`,
    cidade: sql`${properties.cidade}`,
    bairro: sql`${properties.bairro}`,
    score: sql`${properties.score}`,
    first_seen: sql`${properties.firstSeenAt}`,
    market_value: sql`${properties.marketValue}`,
    zap_value: sql`${properties.zapMarketValue}`,
    qa_value: sql`${properties.qaMarketValue}`,
    qa_rent: sql`${properties.qaRentValue}`,
    zap_rent: sql`${properties.zapRentValue}`,
    quartos: sql`${properties.quartos}`,
    area_priv: sql`${properties.areaPrivativaM2}`,
    area_total: sql`${properties.areaTotalM2}`,
    crime: sql`${properties.crimeRate}`,
    yield: sql`CASE WHEN ${properties.zapRentValue}::numeric > 0 AND ${properties.preco}::numeric > 0 THEN (${properties.zapRentValue}::numeric * 12 / ${properties.preco}::numeric) * 100 ELSE NULL END`,
    desconto_mercado: sql`CASE WHEN ${properties.preco}::numeric > 0 AND coalesce(${properties.marketValue}, ${properties.zapMarketValue}) IS NOT NULL THEN (1 - ${properties.preco}::numeric / coalesce(${properties.marketValue}, ${properties.zapMarketValue})::numeric) * 100 ELSE NULL END`,
  };
  const sortCol = sortMap[sort] || sortMap.desconto;

  let orderSql: ReturnType<typeof sql>;
  if (tsQuery && sort === "desconto") {
    // When searching without explicit sort override, order by relevance then desconto
    orderSql = sql`ts_rank(${properties.searchVector}, ${tsQuery}) DESC NULLS LAST, ${properties.desconto} DESC NULLS LAST, ${properties.id} ASC`;
  } else {
    // Always add id as tiebreaker to prevent pagination duplicates
    orderSql =
      order === "asc"
        ? sql`${sortCol} ASC NULLS LAST, ${properties.id} ASC`
        : sql`${sortCol} DESC NULLS LAST, ${properties.id} ASC`;
  }

  const [data, countResult] = await Promise.all([
    db
      .select()
      .from(properties)
      .where(where)
      .orderBy(orderSql)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(properties)
      .where(where),
  ]);

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total: countResult[0]?.count ?? 0,
      pages: Math.ceil((countResult[0]?.count ?? 0) / limit),
    },
  });
}
