import {
  pgTable,
  serial,
  varchar,
  text,
  decimal,
  boolean,
  integer,
  timestamp,
  jsonb,
  index,
  customType,
} from "drizzle-orm/pg-core";

// tsvector is not a built-in Drizzle type; declare it so we can reference the column
const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

export const properties = pgTable(
  "properties",
  {
    id: serial("id").primaryKey(),
    caixaId: varchar("caixa_id", { length: 20 }).unique().notNull(),
    uf: varchar("uf", { length: 2 }).notNull().default("RS"),
    cidade: varchar("cidade", { length: 100 }).notNull(),
    bairro: varchar("bairro", { length: 100 }),
    endereco: text("endereco"),
    cep: varchar("cep", { length: 10 }),
    preco: decimal("preco", { precision: 12, scale: 2 }),
    valorAvaliacao: decimal("valor_avaliacao", { precision: 12, scale: 2 }),
    desconto: decimal("desconto", { precision: 5, scale: 2 }),
    aceitaFinanciamento: boolean("aceita_financiamento").default(false),
    descricao: text("descricao"),
    modalidadeVenda: varchar("modalidade_venda", { length: 80 }),
    linkCaixa: text("link_caixa"),
    tipoImovel: varchar("tipo_imovel", { length: 50 }),
    quartos: integer("quartos"),
    vagas: integer("vagas"),
    banheiros: integer("banheiros"),
    areaTotalM2: decimal("area_total_m2", { precision: 10, scale: 2 }),
    areaPrivativaM2: decimal("area_privativa_m2", { precision: 10, scale: 2 }),
    matricula: varchar("matricula", { length: 30 }),
    comarca: varchar("comarca", { length: 50 }),
    lat: decimal("lat", { precision: 10, scale: 7 }),
    lng: decimal("lng", { precision: 10, scale: 7 }),
    geocodedAt: timestamp("geocoded_at"),
    score: decimal("score", { precision: 5, scale: 2 }),
    scoreDetails: jsonb("score_details"),
    firstSeenAt: timestamp("first_seen_at").notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at").notNull().defaultNow(),
    removedAt: timestamp("removed_at"),
    detailScrapedAt: timestamp("detail_scraped_at"),
    fotoUrl: text("foto_url"),
    crimeRate: decimal("crime_rate", { precision: 10, scale: 2 }),
    crimeRateUpdatedAt: timestamp("crime_rate_updated_at"),
    marketValue: decimal("market_value", { precision: 12, scale: 2 }),
    marketValuePerM2: decimal("market_value_per_m2", { precision: 10, scale: 2 }),
    marketRentValue: decimal("market_rent_value", { precision: 10, scale: 2 }),
    comparablesCount: integer("comparables_count"),
    comparablesTier1Count: integer("comparables_tier1_count"),
    comparablesTier2Count: integer("comparables_tier2_count"),
    marketValueUpdatedAt: timestamp("market_value_updated_at"),
    zapMarketValue: decimal("zap_market_value", { precision: 12, scale: 2 }),
    zapMarketValuePerM2: decimal("zap_market_value_per_m2", { precision: 10, scale: 2 }),
    zapRentValue: decimal("zap_rent_value", { precision: 10, scale: 2 }),
    zapComparablesCount: integer("zap_comparables_count"),
    zapUpdatedAt: timestamp("zap_updated_at"),
    qaMarketValue: decimal("qa_market_value", { precision: 12, scale: 2 }),
    qaRentValue: decimal("qa_rent_value", { precision: 10, scale: 2 }),
    qaComparablesCount: integer("qa_comparables_count"),
    qaUpdatedAt: timestamp("qa_updated_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    searchVector: tsvector("search_vector"),
  },
  (table) => [
    index("idx_properties_cidade").on(table.cidade),
    index("idx_properties_score").on(table.score),
    index("idx_properties_preco").on(table.preco),
    index("idx_properties_desconto").on(table.desconto),
    index("idx_properties_removed").on(table.removedAt),
    index("idx_properties_latlng").on(table.lat, table.lng),
  ]
);

export const priceHistory = pgTable(
  "price_history",
  {
    id: serial("id").primaryKey(),
    propertyId: integer("property_id")
      .notNull()
      .references(() => properties.id),
    preco: decimal("preco", { precision: 12, scale: 2 }),
    desconto: decimal("desconto", { precision: 5, scale: 2 }),
    recordedAt: timestamp("recorded_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_price_history_prop").on(table.propertyId, table.recordedAt),
  ]
);

export const itbiTransactions = pgTable(
  "itbi_transactions",
  {
    id: serial("id").primaryKey(),
    dataEstimativa: timestamp("data_estimativa"),
    dataPagamento: timestamp("data_pagamento"),
    baseCalculo: decimal("base_calculo", { precision: 12, scale: 2 }),
    percTransmitido: decimal("perc_transmitido", { precision: 5, scale: 2 }),
    finalidadeConstrucao: varchar("finalidade_construcao", { length: 100 }),
    logradouro: text("logradouro"),
    nEndereco: varchar("n_endereco", { length: 20 }),
    nUnidade: varchar("n_unidade", { length: 50 }),
    complemento: text("complemento"),
    bairro: varchar("bairro", { length: 100 }),
    cep: varchar("cep", { length: 10 }),
    areaTotalTerreno: decimal("area_total_terreno", { precision: 10, scale: 2 }),
    areaConstrTotal: decimal("area_constr_total", { precision: 10, scale: 2 }),
    areaConstrPrivativa: decimal("area_constr_privativa", { precision: 10, scale: 2 }),
    anoConstrucao: integer("ano_construcao"),
    matricula: varchar("matricula", { length: 30 }),
    zonaRegistro: varchar("zona_registro", { length: 10 }),
    situacao: varchar("situacao", { length: 30 }),
    year: integer("year"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_itbi_bairro").on(table.bairro),
    index("idx_itbi_tipo").on(table.finalidadeConstrucao),
    index("idx_itbi_data").on(table.dataEstimativa),
    index("idx_itbi_year").on(table.year),
  ]
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 128 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    propertyId: integer("property_id").notNull().references(() => properties.id),
    username: varchar("username", { length: 50 }),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_favorites_property").on(table.propertyId),
    index("idx_favorites_username").on(table.username),
  ]
);

export const hiddenProperties = pgTable(
  "hidden_properties",
  {
    id: serial("id").primaryKey(),
    propertyId: integer("property_id").notNull().references(() => properties.id),
    username: varchar("username", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_hidden_property").on(table.propertyId),
    index("idx_hidden_username").on(table.username),
  ]
);

export const zapListings = pgTable("zap_listings", {
  id: serial("id").primaryKey(),
  zapId: varchar("zap_id", { length: 30 }),
  business: varchar("business", { length: 10 }), // SALE or RENTAL
  cidade: varchar("cidade", { length: 100 }),
  bairro: varchar("bairro", { length: 100 }),
  unitType: varchar("unit_type", { length: 30 }),
  price: decimal("price", { precision: 12, scale: 2 }),
  area: decimal("area", { precision: 10, scale: 2 }),
  pricePerM2: decimal("price_per_m2", { precision: 10, scale: 2 }),
  bedrooms: integer("bedrooms"),
  parkingSpaces: integer("parking_spaces"),
  listingUrl: text("listing_url"),
  condoFee: decimal("condo_fee", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_zap_cidade_bairro").on(table.cidade, table.bairro),
  index("idx_zap_business").on(table.business),
]);

export const propertyNotes = pgTable(
  "property_notes",
  {
    id: serial("id").primaryKey(),
    propertyId: integer("property_id")
      .notNull()
      .references(() => properties.id),
    username: varchar("username", { length: 50 }),
    note: text("note").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_property_notes_prop").on(table.propertyId),
    index("idx_property_notes_username").on(table.username),
  ]
);

export const pipelineRuns = pgTable("pipeline_runs", {
  id: serial("id").primaryKey(),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
  status: varchar("status", { length: 20 }),
  propertiesTotal: integer("properties_total"),
  propertiesNew: integer("properties_new"),
  propertiesRemoved: integer("properties_removed"),
  priceChanges: integer("price_changes"),
  errors: text("errors"),
});
