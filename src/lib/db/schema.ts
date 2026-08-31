import {
  pgTable,
  date,
  serial,
  varchar,
  text,
  decimal,
  boolean,
  integer,
  smallint,
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
    // Rastreador de edital (O6, requisito #7). Preenchido por
    // src/pipeline/scrape-edital.ts — ver drizzle/mig_05_edital.sql para o
    // porque matricula/comarca acima passam a ser escritas por ele também
    // (o scraper antigo nunca as populava: DOM da Caixa é <span>, não <td>).
    editalNumero: varchar("edital_numero", { length: 60 }),
    editalItem: varchar("edital_item", { length: 10 }),
    leiloeiro: varchar("leiloeiro", { length: 150 }),
    editalPublicadoEm: timestamp("edital_publicado_em"),
    editalPdfUrl: text("edital_pdf_url"),
    // Datas em UTC real (fonte é horário de Brasília, UTC-3 fixo — Brasil
    // não observa DST desde 2019 — convertido na coleta, ver scrape-edital.ts).
    leilao1Data: timestamp("leilao1_data"),
    leilao2Data: timestamp("leilao2_data"),
    licitacaoData: timestamp("licitacao_data"),
    propostaPrazo: timestamp("proposta_prazo"),
    oficio: varchar("oficio", { length: 10 }),
    inscricaoImobiliaria: varchar("inscricao_imobiliaria", { length: 40 }),
    // Bookkeeping do coletor — NÃO é a data do edital (essa é editalPublicadoEm).
    // NULL = nunca coletado. É o que torna o passo incremental.
    editalAtualizadoEm: timestamp("edital_atualizado_em"),
    editalErro: varchar("edital_erro", { length: 200 }),
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
    // Camada de segurança (O6). Preenchida por scripts/caixa-crime-layer.sh a
    // partir de app.score_nacional. crimeNota é RISCO: maior = mais violento.
    // As colunas crimeRate* acima são o caminho antigo (API do heatmap, só RS,
    // escala de todas as ocorrências) e não devem ser usadas na tela pública.
    crimeNota: integer("crime_nota"),
    crimeTaxa: decimal("crime_taxa", { precision: 12, scale: 4 }),
    crimeGrao: varchar("crime_grao", { length: 12 }),
    crimeCobertura: varchar("crime_cobertura", { length: 12 }),
    crimeFonte: varchar("crime_fonte", { length: 40 }),
    crimeJanelaInicio: date("crime_janela_inicio"),
    crimeJanelaFim: date("crime_janela_fim"),
    crimeSuprimido: boolean("crime_suprimido"),
    crimeAtualizadoEm: timestamp("crime_atualizado_em"),
    // Percentil nacional (0-100) da nota DENTRO do próprio grão. As réguas de
    // bairro e município são diferentes (medido 31/08/2026: p80 municipal=589,
    // p80 de bairro=497), então comparar crime_nota cru entre grãos é errado.
    // Filtro e ordenação de risco usam SEMPRE crimePercentil.
    crimePercentil: smallint("crime_percentil"),
    // Bairro que de fato gerou a nota. Difere de `bairro` quando a Caixa
    // cadastrou o nome do loteamento ("LOT RURAL ELDORADO") e a resolução veio
    // do polígono do IBGE.
    crimeBairro: varchar("crime_bairro", { length: 120 }),
    crimeBairroOrigem: varchar("crime_bairro_origem", { length: 12 }),
    crimeMarcado: boolean("crime_marcado"),
    crimeOcorrencias: integer("crime_ocorrencias"),
    // Contexto municipal, preenchido SEMPRE — inclusive quando a nota exibida
    // é a do bairro. crimeTaxa (mortes/100 mil hab.) só existe no grão
    // município; no grão bairro ela é NULL e a tela usa crimeMuniTaxa.
    crimeMuniNota: integer("crime_muni_nota"),
    crimeMuniTaxa: decimal("crime_muni_taxa", { precision: 10, scale: 2 }),
    crimeMuniJanelaInicio: date("crime_muni_janela_inicio"),
    crimeMuniJanelaFim: date("crime_muni_janela_fim"),
    crimeMuniFonte: varchar("crime_muni_fonte", { length: 40 }),
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
    dataQualityFlag: varchar("data_quality_flag", { length: 20 }), // null = OK, 'suspicious_area', 'suspicious_price', 'suspicious_discount'
    aiAnalysis: text("ai_analysis"),
    aiAnalysisAt: timestamp("ai_analysis_at"),
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
    index("properties_uf_idx").on(table.uf),
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
    cidade: varchar("cidade", { length: 100 }).default("PORTO ALEGRE"),
    year: integer("year"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_itbi_cidade_bairro").on(table.cidade, table.bairro),
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
  uf: varchar("uf", { length: 2 }).default("RS"),
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
  source: varchar("source", { length: 20 }).default("zap"), // "zap" or "vivareal"
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_zap_uf_cidade_bairro").on(table.uf, table.cidade, table.bairro),
  index("idx_zap_business").on(table.business),
  index("idx_zap_source").on(table.source),
]);

export const qaListings = pgTable("qa_listings", {
  id: serial("id").primaryKey(),
  qaId: varchar("qa_id", { length: 30 }),
  business: varchar("business", { length: 10 }), // SALE or RENTAL
  uf: varchar("uf", { length: 2 }).default("RS"),
  cidade: varchar("cidade", { length: 100 }),
  bairro: varchar("bairro", { length: 100 }),
  unitType: varchar("unit_type", { length: 30 }),
  price: decimal("price", { precision: 12, scale: 2 }),
  area: decimal("area", { precision: 10, scale: 2 }),
  pricePerM2: decimal("price_per_m2", { precision: 10, scale: 2 }),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  parkingSpaces: integer("parking_spaces"),
  listingUrl: text("listing_url"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_qa_uf_cidade_bairro").on(table.uf, table.cidade, table.bairro),
  index("idx_qa_business").on(table.business),
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

export const flippaFavorites = pgTable("flippa_favorites", {
  id: serial("id").primaryKey(),
  listingId: varchar("listing_id", { length: 20 }).notNull(),
  username: varchar("username", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const flippaHidden = pgTable("flippa_hidden", {
  id: serial("id").primaryKey(),
  listingId: varchar("listing_id", { length: 20 }).notNull(),
  username: varchar("username", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

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

/**
 * Assinatura pública (O6, plano mestre §3).
 *
 * `users` acima é a equipe interna (4 contas, senha em hash, sem plano).
 * `assinantes` é o público pagante — mantidos separados de propósito: o
 * painel interno não vira produto e o produto não herda permissão interna.
 *
 * Faixas do plano: R$39–59/mês, a faixa comprovada do mercado
 * (Arremata.ai R$39,17 · LeilôAI R$59,90 · Mapa do Leilão R$74,90).
 */
export const assinantes = pgTable(
  "assinantes",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 160 }).unique().notNull(),
    senhaHash: varchar("senha_hash", { length: 128 }),
    nome: varchar("nome", { length: 120 }),
    telefone: varchar("telefone", { length: 20 }),
    // livre | mensal | anual — "livre" é a conta grátis, que existe para
    // capturar e-mail e liberar os documentos (padrão Arremata.ai).
    plano: varchar("plano", { length: 20 }).notNull().default("livre"),
    // ativa | pendente | cancelada | inadimplente
    status: varchar("status", { length: 20 }).notNull().default("ativa"),
    // Provedor de cobrança e id da assinatura lá — o produto não guarda cartão.
    provedor: varchar("provedor", { length: 20 }),
    provedorAssinaturaId: varchar("provedor_assinatura_id", { length: 80 }),
    validoAte: timestamp("valido_ate"),
    canceladoEm: timestamp("cancelado_em"),
    ultimoAcessoEm: timestamp("ultimo_acesso_em"),
    criadoEm: timestamp("criado_em").notNull().defaultNow(),
  },
  (table) => [
    index("idx_assinantes_plano").on(table.plano),
    index("idx_assinantes_status").on(table.status),
  ]
);

/**
 * Alertas por busca salva. A pesquisa de mercado mostrou que o alerta rápido
 * é o gancho principal de TODOS os concorrentes pagos — é o que o assinante
 * compra primeiro, antes de análise jurídica ou amplitude de fontes.
 */
export const alertas = pgTable(
  "alertas",
  {
    id: serial("id").primaryKey(),
    assinanteId: integer("assinante_id").notNull().references(() => assinantes.id),
    nome: varchar("nome", { length: 80 }),
    uf: varchar("uf", { length: 2 }),
    cidade: varchar("cidade", { length: 100 }),
    precoMax: decimal("preco_max", { precision: 12, scale: 2 }),
    descontoMin: decimal("desconto_min", { precision: 5, scale: 2 }),
    tipoImovel: varchar("tipo_imovel", { length: 50 }),
    // Teto de risco aceito: filtra pela nota de segurança. É o filtro que
    // nenhum concorrente tem.
    crimeNotaMax: integer("crime_nota_max"),
    ativo: boolean("ativo").notNull().default(true),
    ultimoEnvioEm: timestamp("ultimo_envio_em"),
    criadoEm: timestamp("criado_em").notNull().defaultNow(),
  },
  (table) => [index("idx_alertas_assinante").on(table.assinanteId)]
);

/** Eventos de cobrança, para auditar o que o provedor mandou. */
export const cobrancas = pgTable(
  "cobrancas",
  {
    id: serial("id").primaryKey(),
    assinanteId: integer("assinante_id").references(() => assinantes.id),
    provedor: varchar("provedor", { length: 20 }).notNull(),
    provedorEventoId: varchar("provedor_evento_id", { length: 80 }),
    tipo: varchar("tipo", { length: 40 }),
    valor: decimal("valor", { precision: 10, scale: 2 }),
    status: varchar("status", { length: 20 }),
    payload: jsonb("payload"),
    criadoEm: timestamp("criado_em").notNull().defaultNow(),
  },
  (table) => [index("idx_cobrancas_assinante").on(table.assinanteId)]
);
