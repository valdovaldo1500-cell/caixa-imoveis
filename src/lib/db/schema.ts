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
} from "drizzle-orm/pg-core";

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
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
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
