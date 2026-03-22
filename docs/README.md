# Caixa Imóveis RS — Developer Documentation

Private dashboard for analyzing repossessed properties from Caixa Econômica Federal in Rio Grande do Sul, Brazil.

**Production URL:** https://imoveis.crimebrasil.com.br

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Data Sources](#3-data-sources)
4. [Pages & Features](#4-pages--features)
5. [API Reference](#5-api-reference)
6. [Scoring Engine](#6-scoring-engine)
7. [Market Value Calculation](#7-market-value-calculation)
8. [Pipeline & Automation](#8-pipeline--automation)
9. [Deployment](#9-deployment)
10. [Development](#10-development)

---

## 1. Project Overview

Caixa Econômica Federal auctions repossessed properties (imóveis retomados) across Brazil. This dashboard ingests the daily RS property list, enriches each property with market value estimates, crime rates, geocoordinates, and scraped details from Caixa's website, then scores them 0–100 to surface investment opportunities.

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| ORM | Drizzle ORM |
| Database | PostgreSQL 16 |
| Auth | Custom HMAC-SHA256 cookie sessions (7 days) |
| Email | Resend API |
| Maps | Leaflet + react-leaflet-cluster |
| Charts | Recharts |

### Authentication

Login requires a password + hCaptcha verification. On success, the server issues an `imoveis_session` cookie containing `timestamp:HMAC-SHA256(timestamp)`. The HMAC is signed with `SESSION_SECRET`. Cookie lifetime is 7 days (`MAX_AGE = 604800`). The `proxy.ts` middleware (Next.js 16 equivalent of `middleware.ts`) validates the cookie on every request.

A separate `PIPELINE_TOKEN` environment variable allows API automation (cron jobs) to call pipeline and scoring endpoints without browser authentication, by passing `Authorization: Bearer <token>` in the request header.

---

## 2. Architecture

The project is a **full-stack Next.js monolith** — no separate backend service. All data access happens in Next.js API routes or server components talking directly to PostgreSQL via Drizzle ORM.

```
Browser
  └── Next.js App (port 3000)
        ├── proxy.ts        — auth guard (all routes)
        ├── /app            — pages (App Router)
        ├── /app/api        — API routes (REST)
        ├── /lib/db         — Drizzle ORM + schema
        ├── /lib/scoring.ts — scoring engine
        ├── /lib/auth.ts    — HMAC session logic
        └── /pipeline       — data pipeline modules
              ├── download-csv.ts
              ├── parse-csv.ts
              ├── parse-description.ts
              ├── scrape-details.ts
              ├── geocode.ts
              ├── crime-rate.ts
              ├── itbi.ts
              └── zap.ts
```

### Route Guard (`src/proxy.ts`)

Exported as `proxy()` (not `middleware()`), which is Next.js 16 convention. Logic:

- `/login` and `/api/auth/*` — always allowed
- `/api/pipeline/*` and `/api/scoring/*` — allowed with `Authorization: Bearer <PIPELINE_TOKEN>`
- All other routes — require valid `imoveis_session` cookie
- Unauthenticated API calls → 401; unauthenticated page visits → redirect to `/login`

### Database Schema

Eight tables, all defined in `src/lib/db/schema.ts`:

| Table | Purpose |
|-------|---------|
| `properties` | Core property records from Caixa CSV |
| `price_history` | Historical price snapshots for tracking changes |
| `itbi_transactions` | Porto Alegre real estate transaction data (2024–2026) |
| `favorites` | User-saved properties |
| `hidden_properties` | Properties dismissed from the main view |
| `zap_listings` | ZAP Imóveis scraped listings (SALE + RENTAL) |
| `property_notes` | Per-property text notes (one per property) |
| `pipeline_runs` | Audit log of pipeline executions |

---

## 3. Data Sources

### Caixa Econômica Federal CSV

- **URL:** `https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp?op=downloadCSVEstado&mensagem=lista&sigla_uf=RS`
- **Update frequency:** Daily (Caixa publishes new files each business day)
- **Content:** ~957 active RS properties with fields: `caixa_id`, `uf`, `cidade`, `bairro`, `endereco`, `cep`, `descricao`, `preco`, `valor_avaliacao`, `desconto`, `modalidade_venda`, `link_caixa`, `aceita_financiamento`
- **Blocker:** Radware Bot Manager blocks fetch and curl from the Hetzner server IP. Use `CSV_LOCAL_PATH=/tmp/caixa_imoveis_rs.csv` environment variable + `docker cp` to inject the file manually.
- **Pipeline step:** `POST /api/pipeline/trigger` — downloads (or reads local file), parses CSV, upserts all properties, marks properties not in today's file as `removed_at`.

### ITBI Porto Alegre

- **Source:** dadosabertos.poa.br — open data portal of Porto Alegre municipality
- **URLs (per year):**
  - 2024: `https://dadosabertos.poa.br/dataset/dd8ee5be-.../itbi-2024.csv`
  - 2025: `https://dadosabertos.poa.br/dataset/dd8ee5be-.../itbi-2025.csv`
  - 2026: `https://dadosabertos.poa.br/dataset/dd8ee5be-.../itbi-2026.csv`
- **Update frequency:** Weekly (Sundays via cron)
- **Content:** ~65,000 residential real estate transfer transactions for Porto Alegre (2024–2026). Fields include: `data_estimativa`, `base_de_calculo` (transaction value), `finalidade_construcao` (property type), `logradouro`, `bairro`, `cep`, `area_constr_privativa`, `ano_construcao`, `matricula`.
- **Filtering on import:** Only residential types are kept (`APARTAMENTO`, `RESIDENCIA ISOLADA`, etc.); cancelled transactions and records with zero area are discarded.
- **Use:** Powers the ITBI 2-tier market value calculation for Porto Alegre properties.

### ZAP Imóveis

- **Source:** zapimoveis.com.br scraped via Playwright (headless browser)
- **Update frequency:** Weekly (Wednesdays via cron)
- **Content:** ~2,927 listings covering 20 RS cities; both SALE and RENTAL. Fields: `zap_id`, `business`, `cidade`, `bairro`, `unit_type`, `price`, `area`, `price_per_m2`, `bedrooms`, `parking_spaces`, `listing_url`, `condo_fee`.
- **Import mechanism:** Playwright scraper writes output to `/tmp/zap-data.json`; `POST /api/pipeline/zap?action=import` reads this file and upserts into `zap_listings`.
- **Use:** Provides market value estimates (`zap_market_value`) and rent estimates (`zap_rent_value`) for all cities, as a fallback when ITBI data is unavailable (all non-POA cities).

### Crime Brasil API

- **Source:** crimebrasil.com.br (sister project)
- **Endpoint:** `GET https://crimebrasil.com.br/api/heatmap/municipios?state=RS&ultimos_meses=12`
- **Update frequency:** Updated per pipeline run (daily)
- **Content:** Crime `weight` (total incidents) + `population` per RS municipality. The pipeline calculates `(weight / population) * 100000` to get a crime rate per 100,000 inhabitants, stored in `properties.crime_rate`.
- **Use:** Feeds the `crimeSafety` scoring factor.

### Nominatim (OpenStreetMap)

- **URL:** `https://nominatim.openstreetmap.org/search`
- **Rate limit:** 1 request per second (enforced in the geocoder with 1100ms sleep)
- **Use:** Converts property addresses to `lat`/`lng`. The geocoder tries progressively less specific queries: full address → bairro+city → city only.

---

## 4. Pages & Features

### `/login`

Password input + hCaptcha widget. On success, sets the `imoveis_session` cookie and redirects to `/`.

### `/` — Dashboard

KPI summary cards showing: total active properties, new properties today, avg discount, avg score, properties with market value, and a summary of the latest pipeline run.

### `/imoveis` — Property Table

Full paginated data table with the following capabilities:

- **18 configurable columns:** cidade, bairro, tipo, preco, desconto, score, quartos, vagas, area, market_value, zap_market_value, modalidade, first_seen, aceita_financiamento, comarca, matricula, crime_rate, link_caixa
- **Multi-select filters:** city (multi), property type (multi), sale modality (multi), price range, minimum discount
- **Full-text search:** Uses PostgreSQL `tsvector` + `plainto_tsquery`/`to_tsquery` with Portuguese language config; falls back to `ilike` for city, bairro, and address fields
- **Sort:** Any column, ascending or descending; relevance-ranked when searching
- **Popups per row:**
  - Score popup — shows full scoring breakdown with factor weights
  - Comparables popup — shows ITBI tier1/tier2 comparables and ZAP listings
  - Rent popup — shows estimated rent from ITBI (0.5% of market value) or ZAP median rent
- **Hide/show:** Dismissed properties are hidden from the table (stored in `hidden_properties`)
- **Favorites toggle:** Heart icon saves a property to `/favoritos`
- **Notes:** Inline notes per property, persisted to `property_notes`

### `/imoveis/[id]` — Property Detail

Full detail view for a single property including:

- All property fields
- Score breakdown chart
- ITBI comparables list (tier 1 and tier 2) with address, area, transaction date, R$/m²
- ZAP sale/rental comparables
- Price history chart (from `price_history` table)
- Embedded Caixa crime rate for the city
- Property photo (if scraped from Caixa detail page)
- Direct link to Caixa's listing page

### `/analise` — Charts

Five Recharts visualizations:

1. **Properties by city** — bar chart, top 15 cities by count with avg discount and avg price
2. **Properties by type** — pie/bar chart of property types
3. **Discount distribution** — histogram in 10% buckets (0–10%, 10–20%, ... 90–100%)
4. **Price distribution** — histogram by price range (0–50k, 50k–100k, ..., 1M+)
5. **By sale modality** — chart of `modalidade_venda` values

### `/mapa` — Map

Interactive Leaflet map with marker clustering. Each marker opens a popup with price, discount, type, score, and a link to the detail page. Four filter controls:

1. Sale modality
2. Minimum discount
3. Price range
4. Property type

Only geolocated properties (with `lat`/`lng`) appear on the map.

### `/favoritos` — Saved Properties

List of favorited properties with their current price, discount, score, market value, and removal status (shows alert if a favorited property was removed from Caixa's list). Each entry supports per-property notes.

---

## 5. API Reference

All endpoints require authentication (session cookie) unless noted. Pipeline and scoring endpoints also accept `Authorization: Bearer <PIPELINE_TOKEN>`.

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/login` | None | Validates password + hCaptcha; sets session cookie |
| `GET` | `/api/auth/status` | None | Returns `{ authenticated: boolean }` |

**Login request body:**
```json
{ "password": "...", "hcaptchaToken": "..." }
```

### Properties

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/properties` | Paginated property list with filters |
| `GET` | `/api/properties/[id]` | Single property by internal ID |
| `GET` | `/api/properties/[id]/comparables` | ITBI + ZAP comparables for a property |
| `GET` | `/api/properties/[id]/history` | Price history records (oldest first) |
| `GET` | `/api/properties/[id]/favorite` | Check favorite status |
| `POST` | `/api/properties/[id]/favorite` | Toggle favorite on/off |
| `GET` | `/api/properties/[id]/hide` | Check hidden status |
| `POST` | `/api/properties/[id]/hide` | Toggle hidden on/off |
| `GET` | `/api/properties/[id]/notes` | Get note text for property |
| `PUT` | `/api/properties/[id]/notes` | Upsert note text (empty string deletes) |

**`GET /api/properties` query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | int | Page number (default: 1) |
| `limit` | int | Results per page (max: 100, default: 50) |
| `sort` | string | Column: `desconto`, `preco`, `cidade`, `score`, `first_seen`, `market_value` |
| `order` | string | `asc` or `desc` (default: `desc`) |
| `cidade` | string | Comma-separated city names (case-insensitive) |
| `tipo` | string | Comma-separated property types (partial match) |
| `modalidade` | string | Comma-separated sale modalities (case-insensitive) |
| `preco_min` | number | Minimum price |
| `preco_max` | number | Maximum price |
| `desconto_min` | number | Minimum discount percentage |
| `q` | string | Full-text search (Portuguese FTS + ilike fallback) |
| `removed` | `"true"` | Include removed properties |

**`GET /api/properties/[id]/comparables` query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `months` | int | Lookback window for ITBI tier 1 (default: 12); tier 2 uses 1.5x this value |

Response includes both `tier1` and `tier2` ITBI results, plus `zapListings` with sale and rental comparables.

**`PUT /api/properties/[id]/notes` request body:**
```json
{ "note": "Texto da nota" }
```

### Favorites

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/favorites` | All favorites with joined property data |
| `POST` | `/api/favorites` | Add a favorite (`{ propertyId, notes? }`) |
| `DELETE` | `/api/favorites/[id]` | Remove a favorite by favorite ID |
| `PATCH` | `/api/favorites/[id]` | Update notes on a favorite (`{ notes }`) |

### Hidden Properties

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/hidden` | Returns `{ ids: number[] }` of all hidden property IDs |

### Notes (bulk)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/notes` | Returns `{ notes: Record<propertyId, noteText> }` for all properties |

### Stats

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/stats` | Aggregated chart data: byCity, byType, byDiscount, byModalidade, priceDistribution |

The endpoint is marked `dynamic = "force-dynamic"` to prevent caching.

### Map

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/map` | All geolocated active properties for map rendering |

**`GET /api/map` query parameters:**

| Parameter | Description |
|-----------|-------------|
| `modalidade` | Filter by sale modality |
| `desconto_min` | Minimum discount |
| `desconto_max` | Maximum discount |
| `preco_min` | Minimum price |
| `preco_max` | Maximum price |
| `tipo` | Property type (partial match) |

Response: `{ data: [...] }` — each item includes `id`, `cidade`, `bairro`, `preco`, `valorAvaliacao`, `desconto`, `tipoImovel`, `quartos`, `vagas`, `areaPrivativaM2`, `score`, `marketValue`, `modalidadeVenda`, `linkCaixa`, `fotoUrl`, `lat`, `lng`.

### Pipeline

All pipeline endpoints require session cookie OR `Authorization: Bearer <PIPELINE_TOKEN>` header.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/pipeline/trigger` | Download CSV + upsert all properties (marks removals) |
| `POST` | `/api/pipeline/parse-descriptions` | Extract tipo/quartos/vagas/area from description text |
| `POST` | `/api/pipeline/scrape` | Scrape Caixa detail pages for photos + extra fields |
| `POST` | `/api/pipeline/geocode` | Geocode properties without lat/lng via Nominatim |
| `POST` | `/api/pipeline/crime-rates` | Fetch RS crime rates from crimebrasil.com.br API |
| `POST` | `/api/pipeline/itbi` | Import ITBI CSVs and/or calculate POA market values |
| `POST` | `/api/pipeline/zap` | Import ZAP JSON and/or calculate ZAP market values |
| `POST` | `/api/pipeline/notify` | Send daily email report of new properties + price changes |
| `POST` | `/api/pipeline/verify` | Run 24 data integrity checks; returns detailed report |

**`POST /api/pipeline/scrape` query parameters:**

| Parameter | Description |
|-----------|-------------|
| `limit` | Max properties to scrape (1–200, default: 20) |

**`POST /api/pipeline/geocode` query parameters:**

| Parameter | Description |
|-----------|-------------|
| `limit` | Max properties to geocode (1–200, default: 50) |

**`POST /api/pipeline/itbi` query parameters:**

| Parameter | Description |
|-----------|-------------|
| `action` | `import` (download CSVs only), `calculate` (market values only), or `all` (default) |

**`POST /api/pipeline/zap` query parameters:**

| Parameter | Description |
|-----------|-------------|
| `action` | `import` (load JSON file only), `calculate` (market values only), or `all` (default) |

**`POST /api/pipeline/verify`**

Requires `Authorization: Bearer caixa-pipeline-2026-rs-secret`. Runs 24 database integrity checks in parallel and returns a JSON report including:
- `totalActive`, `totalWithScore`, `totalWithCrimeRate`, `totalWithMarketValue`, `totalGeolocated`, `totalITBI`
- `duplicateCaixaIds`, `invalidDiscounts`, `invalidPrices`
- `scoreRange` (min/max/avg)
- `crimeRateRange` (min/max/avg)
- `lastPipelineRun`
- `geocodeBounds` (lat/lng bounding box for sanity check)
- `poaStats` (avg geocoords + crime range for POA properties)
- `avaliacaoVsPreco` (fraction where `valor_avaliacao >= preco * 0.95`)
- `scoreDetailsSample` (10 random score breakdowns for spot-checking)
- `marketValueNonPoa` (count — should be 0 since ITBI is POA-only)
- `marketValueComparables` (fraction of ITBI-valued properties that have actual comparables)
- `poaMedianPricePerM2` (ITBI median R$/m² across all POA)
- `discountGroups` (avg score per discount band — validates monotonicity)
- `priceSpikes` (price changes >50% in last 2 days — anomaly detection)

### Scoring

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/scoring/run` | Recalculate scores for all active properties |

Returns `{ scored: number, avgScore: number }`. Has an in-process mutex to prevent concurrent runs.

---

## 6. Scoring Engine

Source: `src/lib/scoring.ts`

Each active property receives a score from 0 to 100, computed as a weighted sum of 7 independent factors. The score and full breakdown are stored in `properties.score` and `properties.score_details` (JSONB).

### Factors and Weights

| Factor | Weight | Score Formula |
|--------|--------|--------------|
| **Discount** | 25% | `min(100, (discount% / 60) * 100)` — a 60%+ discount yields a perfect 100 |
| **Price Efficiency** | 20% | `max(0, min(100, (1 - price / marketValue) * 100 + 50))` — uses ITBI market value first, ZAP as fallback, city average as last resort; 50 is neutral |
| **Financing** | 15% | 100 if `aceita_financiamento = true`, else 0 |
| **Property Type** | 10% | Apartamento = 100, Casa = 75, Comercial/Loja/Sala = 50, Terreno/Lote = 40, other = 30 |
| **Area Value** | 15% | `max(0, min(100, (1 - pricePerM2 / cityAvgPricePerM2) * 100 + 50))` — 50 is neutral when area data unavailable |
| **Days on Market** | 5% | `min(100, (daysSinceFirstSeen / 90) * 100)` — saturates at 90 days |
| **Crime Safety** | 10% | Rate <500 = 100, 500–1000 = 80, 1000–2000 = 60, 2000–5000 = 40, 5000–10000 = 20, ≥10000 = 0; null → 50 (neutral) |

### Area Resolution Order

Area data for the Price Efficiency and Area Value factors is resolved in this order:
1. `areaPrivativaM2` column (populated by scraper or description parser)
2. `areaTotalM2` column
3. Parsed from `descricao` text using regex matching "X de área privativa" / "X de área total"

### City Statistics

Before scoring, city-level averages (`avgPrice`, `avgPricePerM2`) are computed in memory across all active properties. These are used as benchmarks when no ITBI or ZAP market value is available.

### Batch Updates

Scores are written back to the database in batches of 500 records per transaction. The total operation is O(n) in properties plus O(n/500) transactions.

---

## 7. Market Value Calculation

The system uses two separate market value estimation systems, with ITBI taking priority for Porto Alegre properties.

### ITBI Market Value (Porto Alegre only)

Source: `src/pipeline/itbi.ts` — `calculateMarketValues()`

Only applies to Porto Alegre properties because ITBI (Imposto de Transmissão de Bens Imóveis) data is only available from the Porto Alegre open data portal.

**Two-tier system:**

**Tier 1 — "Imóveis muito similares" (very similar properties):**
- Same bairro as the target property
- Exact same ITBI type (e.g., `APARTAMENTO` must match `APARTAMENTO`)
- Area within ±25% of target property's area
- Transaction date within last 12 months

**Tier 2 — "Imóveis no bairro" (neighborhood properties):**
- Same bairro
- Any type within the same mapped type group (e.g., any apartment variant)
- Area within ±50%
- Transaction date within last 18 months

**Selection rule:** If Tier 1 has ≥3 comparables, use Tier 1; otherwise fall back to Tier 2.

**Market value formula:**
```
median_price_per_m2 = median(baseCalculo / areaConstrPrivativa) for active comparables
market_value = median_price_per_m2 * property_area
```

**Rent estimate:**
```
market_rent_value = market_value * 0.005   (0.5% monthly)
```

**Stored columns:** `market_value`, `market_value_per_m2`, `market_rent_value`, `comparables_count`, `comparables_tier1_count`, `comparables_tier2_count`, `market_value_updated_at`

### ZAP Market Value (all cities)

Source: `src/pipeline/zap.ts` — `calculateZapMarketValues()`

Applies to all active properties. Uses ZAP Imóveis scraped listings as comparables.

**Lookup strategy for sale comparables (cascade):**
1. Same bairro + type filter + area ±50%
2. Same city + type filter + area ±50%
3. Same city + area ±50% (no type filter)
4. All city listings (absolute fallback, no filters)

**Lookup strategy for rental comparables:**
1. Same bairro + type + area
2. Same city + type + area
3. All city rental listings

**Market value formula:**
```
zap_market_value = median(price_per_m2 of sale comparables) * property_area
zap_rent_value = median(price of rental comparables)
```

**Stored columns:** `zap_market_value`, `zap_market_value_per_m2`, `zap_rent_value`, `zap_comparables_count`, `zap_updated_at`

### Scoring Priority

In the scoring engine, the effective market value for the Price Efficiency factor is:
```
effectiveMarketValue = itbiMarketValue > 0 ? itbiMarketValue : zapMarketValue
```

---

## 8. Pipeline & Automation

### Daily Pipeline (7am)

The full daily pipeline runs via an external cron job calling the API endpoints in sequence:

```bash
# 1. Download/ingest CSV
POST /api/pipeline/trigger

# 2. Extract structured fields from description text
POST /api/pipeline/parse-descriptions

# 3. Update crime rates
POST /api/pipeline/crime-rates

# 4. Recalculate scores
POST /api/scoring/run

# 5. Send email notification
POST /api/pipeline/notify
```

All requests use `Authorization: Bearer <PIPELINE_TOKEN>`.

### Weekly ITBI Refresh (Sundays)

```bash
# Download and import new ITBI data, then recalculate POA market values
POST /api/pipeline/itbi?action=all

# Re-run scoring with updated market values
POST /api/scoring/run
```

### Weekly ZAP Refresh (Wednesdays)

ZAP scraping requires a Playwright script running outside the Next.js container:

```bash
# 1. Run Playwright scraper (external) → /tmp/zap-data.json
# 2. Copy file into container
docker cp /tmp/zap-data.json <container>:/tmp/zap-data.json

# 3. Import and calculate
POST /api/pipeline/zap?action=all

# 4. Re-run scoring
POST /api/scoring/run
```

### Scraping Caixa Detail Pages

Caixa's detail pages are scraped via `curl` (not fetch) to extract photos, bedroom count, parking, area, and property registration details. Radware Bot Manager detection: if the response contains "Radware", "Bot Manager", "Access Denied", or is shorter than 500 bytes, the scrape is aborted with an error.

```bash
# Scrape up to 50 unscraped properties
POST /api/pipeline/scrape?limit=50
```

### Email Notifications

`POST /api/pipeline/notify` sends an HTML email via Resend API to `NOTIFICATION_EMAIL`. The email includes:

- Alert box for new properties with score ≥ 75 (highlighted in green)
- Table of new properties added today (up to 25 shown, sorted by score descending)
- Table of properties with price changes today (shows old vs. new price)

No email is sent if there are no new properties and no price changes.

### Data Verification

`POST /api/pipeline/verify` runs 24 parallel SQL checks and returns a detailed report. Key checks:

- Count of active properties with score, crime rate, market value, and geocoordinates
- Duplicate `caixa_id` detection
- Invalid discount values (< 0 or > 100)
- Invalid prices (≤ 0 or > 50 million)
- Score range validation (should be 0–100)
- Geocoding bounds verification (all RS coordinates should be within expected lat/lng range)
- `valor_avaliacao >= preco * 0.95` compliance rate (Caixa rule: auction price ≤ appraised value)
- Score breakdown spot-check (10 random samples)
- ITBI market values should only exist for Porto Alegre properties
- Discount monotonicity: higher discount bands should have higher avg scores
- Price spike detection: changes > 50% in last 2 days

---

## 9. Deployment

### Infrastructure

| Component | Details |
|-----------|---------|
| Host | Hetzner VPS — 188.34.199.27 |
| Platform | Coolify (self-hosted PaaS) |
| Coolify App UUID | `k888wo4k4w8s8kgws00sg0og` |
| SSL | Traefik + Let's Encrypt |
| Domain | imoveis.crimebrasil.com.br |

### Docker Services

Two services defined in `docker-compose.prod.yml`:

**`app`** — Next.js application
- Built from `Dockerfile` in project root
- Exposes port 3000 (Traefik forwards 443 → 3000)
- Depends on `imoveis-db` with health check
- Connected to both `default` and `coolify` (external) networks

**`imoveis-db`** — PostgreSQL 16
- Image: `postgres:16-alpine`
- Named `imoveis-db` (not `postgres`) to avoid DNS conflicts with other Coolify services sharing the same network
- Data persisted in `pgdata` Docker volume
- Health check: `pg_isready -U imoveis` every 5 seconds

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | `postgres://imoveis:<DB_PASSWORD>@imoveis-db:5432/imoveis` |
| `SESSION_SECRET` | Yes | Secret for HMAC-SHA256 session signing |
| `DASHBOARD_PASSWORD` | Yes | Login password for the dashboard |
| `HCAPTCHA_SECRET` | Yes | hCaptcha server-side secret |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | Yes | hCaptcha site key (also build arg) |
| `RESEND_API_KEY` | Yes | Resend API key for email notifications |
| `NOTIFICATION_EMAIL` | No | Email recipient (default: `valdovaldo1500@gmail.com`) |
| `PIPELINE_TOKEN` | Yes | Bearer token for automated API calls |
| `CSV_LOCAL_PATH` | No | Path to pre-downloaded CSV file (bypasses Caixa download) |
| `DB_PASSWORD` | Yes (prod) | PostgreSQL password |

### Traefik Labels

The `app` service has Traefik labels configured for:
- HTTP → HTTPS redirect
- TLS termination via Let's Encrypt (`certresolver=letsencrypt`)
- Domain: `imoveis.crimebrasil.com.br`
- Backend port: 3000

### Deployment Process

Auto-deploy is triggered on `git push origin main`. Coolify detects the push, rebuilds the Docker image, and restarts the container (typically 2–3 minutes).

```bash
# Deploy
cd /home/valdo/caixa-imoveis && git push origin main

# After deploy: copy CSV (if needed) and run pipeline
scp Lista_imoveis_RS.csv root@188.34.199.27:/tmp/caixa_imoveis_rs.csv

ssh root@188.34.199.27 "docker cp /tmp/caixa_imoveis_rs.csv \
  \$(docker ps --filter name=app-k888wo4k4w8s8kgws00sg0og --format '{{.Names}}'):/tmp/caixa_imoveis_rs.csv"

# Then trigger pipeline
curl -X POST https://imoveis.crimebrasil.com.br/api/pipeline/trigger \
  -H "Authorization: Bearer <PIPELINE_TOKEN>"
```

### Database Migrations

Drizzle ORM is used for schema management. Migration files live in `drizzle/`.

```bash
# Generate migration SQL from schema changes
pnpm drizzle-kit generate

# Apply to database (dev or prod)
pnpm drizzle-kit push
```

---

## 10. Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose (for local PostgreSQL)

### Local Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start local PostgreSQL (port 5432)
docker compose up -d

# 3. Copy and configure environment
cp .env.example .env.local
# Edit .env.local: DATABASE_URL, SESSION_SECRET, DASHBOARD_PASSWORD, HCAPTCHA_SECRET, etc.

# 4. Push schema to database
pnpm drizzle-kit push

# 5. Start dev server (port 3000)
pnpm dev
```

The local `docker-compose.yml` starts a single `postgres:16-alpine` service with:
- Database name: `imoveis`
- User: `imoveis`
- Password: `imoveis`
- Port: 5432

### Building

```bash
pnpm build     # Type-check + production build
pnpm start     # Start built server
```

### Key Source Files

| File | Purpose |
|------|---------|
| `src/proxy.ts` | Auth middleware (all route protection) |
| `src/lib/auth.ts` | HMAC session sign/verify logic |
| `src/lib/db/schema.ts` | Full database schema (all 8 tables) |
| `src/lib/scoring.ts` | Scoring engine + `computeScoreBreakdown()` |
| `src/pipeline/itbi.ts` | ITBI import, market value calculation, comparables API |
| `src/pipeline/zap.ts` | ZAP import and market value calculation |
| `src/pipeline/geocode.ts` | Nominatim geocoder (1 req/sec) |
| `src/pipeline/crime-rate.ts` | Crime rate fetcher from crimebrasil.com.br |
| `src/pipeline/scrape-details.ts` | Caixa detail page scraper (curl + cheerio) |
| `src/lib/email.ts` | Resend API email helper |

### Adding New Pipeline Steps

1. Create the module in `src/pipeline/yourmodule.ts` exporting an async function
2. Create the route in `src/app/api/pipeline/yourmodule/route.ts` with a `POST` handler
3. The route is automatically protected by `proxy.ts` (session or pipeline token)
4. Add to the daily cron sequence if needed

### Adding New Database Columns

1. Edit `src/lib/db/schema.ts` to add the column
2. Run `pnpm drizzle-kit generate` to create the migration SQL
3. Run `pnpm drizzle-kit push` to apply (dev) or commit the migration file and deploy

### Known Limitations

- **Radware blocker:** Caixa's CSV endpoint blocks server-side downloads from the Hetzner IP. The workaround is to download the CSV manually and inject it via `docker cp` + the `CSV_LOCAL_PATH` env var.
- **ITBI is POA-only:** Market value via ITBI comparables only works for Porto Alegre properties. All other cities use ZAP data.
- **ZAP scraper requires manual trigger:** The Playwright-based ZAP scraper runs outside the container. Scraped data must be copied in as `/tmp/zap-data.json` before calling `/api/pipeline/zap`.
- **Geocoding rate limit:** Nominatim enforces 1 request per second. Geocoding 957 properties takes ~17 minutes minimum. The scraper processes up to 200 per call.
- **Score mutex:** Both `/api/pipeline/trigger` and `/api/scoring/run` use in-process boolean flags to prevent concurrent execution. Restarting the container resets these flags.
