@AGENTS.md

# Caixa Imóveis — Multi-State Dashboard (RS + GO)

Private dashboard for analyzing repossessed properties from Caixa Econômica Federal. Covers **Rio Grande do Sul (RS)** and **Goiás (GO)**.

## Stack
- Next.js 16 (App Router) + TypeScript (strict) + Tailwind CSS + shadcn/ui
- Drizzle ORM + PostgreSQL 16 (postgres.js driver)
- Auth: custom HMAC-SHA256 cookie (`proxy.ts` guards ALL routes)
- Import alias: `@/*` → `./src/*`

## Critical Next.js 16 Gotcha
- Uses `proxy.ts` (NOT `middleware.ts`) — export `proxy()` not `middleware()`
- Read `node_modules/next/dist/docs/` before writing any Next.js-specific code

## Routes
- `/` — public landing page, RS/GO state selector cards
- `/rs/*` — RS dashboard (all sub-routes)
- `/go/*` — GO dashboard (same code, `uf='GO'` filter on all queries)
- Route group: `src/app/[state]/` — single dynamic segment, NOT duplicated per state
- State validation + NavHeader mounted in `src/app/[state]/layout.tsx`
- State utilities: `src/lib/state.ts` — `VALID_STATES`, `STATE_META`, `isValidState`

## Commands
```bash
pnpm dev                    # Dev server (port 3000)
pnpm build                  # Production build
pnpm drizzle-kit generate   # Generate migration from schema changes
pnpm drizzle-kit push       # Push schema directly (dev only)
docker compose up -d        # Start local PostgreSQL (port 5432)
```

## Deploy
- Production: imoveis.crimebrasil.com.br (Coolify on Hetzner, auto-deploy on git push to main)
- Migrations run automatically at container start via `entrypoint.sh`
- Schema: `src/lib/db/schema.ts` — migrations output to `drizzle/`

## Key env vars
- `DATABASE_URL`, `SESSION_SECRET`, `DASHBOARD_PASSWORD`
- `HCAPTCHA_SECRET`, `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
- `CSV_LOCAL_PATH` — RS CSV local path override (Radware blocks server IP)
- `CSV_LOCAL_PATH_GO` — GO CSV local path override

## CSV Download Workaround
Caixa's Radware bot protection blocks fetch and curl from Hetzner AND from local curl/Playwright. Use CDP to open a tab in the real Chrome-in-VNC (display :99, debug port 9222):
```bash
curl -s -X PUT "http://localhost:9222/json/new?https://venda-imoveis.caixa.gov.br/listaweb/Lista_imoveis_GO.csv"
# File downloads to ~/Downloads/Lista_imoveis_GO.csv
scp ~/Downloads/Lista_imoveis_GO.csv root@188.34.199.27:/tmp/caixa_imoveis_go.csv
ssh root@188.34.199.27 "docker cp /tmp/caixa_imoveis_go.csv <container>:/tmp/caixa_imoveis_go.csv"
```
Daily automation: `~/scripts/caixa-download-csv.py --uf RS|GO`

## Daily Cron (runs at 7am from local machine)
`~/scripts/caixa-daily-pipeline.sh` — loops `for UF in RS GO`:
- Downloads CSV per state → SCP → docker cp → trigger → crime-rates
- Parse descriptions (all states, one pass)
- ZAP scrape (Wednesdays): `~/scripts/zap-scraper.py --uf RS|GO`
- QuintoAndar scrape (Saturdays): `~/scripts/quintoandar-scraper.py --uf RS|GO`
- ITBI update (Sundays): RS only (GO has no public dataset)
- Scoring + geocoding (all states, one pass)
- Photo scraping: `~/scripts/caixa-scrape-photos.py --uf RS|GO`

## Pipeline Execution Order (per state)
All API endpoints accept `?uf=RS|GO`:
1. `POST /api/pipeline/trigger?uf=GO` — download/upsert properties
2. `POST /api/pipeline/parse-descriptions` — extract tipo/quartos/vagas (all states)
3. `POST /api/pipeline/crime-rates?uf=RS` — RS only (GO has no upstream data)
4. `POST /api/pipeline/zap?action=all&uf=GO` — after docker cp /tmp/zap-data.json
5. `POST /api/pipeline/quintoandar?action=all&uf=GO` — after docker cp /tmp/qa-data.json
6. `POST /api/scoring/run` — all states
7. `POST /api/pipeline/geocode?limit=200` — all states (loop until done)

## Scraper scripts (`~/scripts/`)
All support `--uf RS|GO`:
- `zap-scraper.py` — Playwright + DISPLAY=:99, ALL_BAIRROS_GO (673 bairros)
- `vivareal-scraper.py` — same architecture as ZAP
- `quintoandar-scraper.py` — requests only (no anti-bot), CITIES_GO dict
- `caixa-scrape-photos.py` — Playwright, queries DB for foto_url IS NULL per UF
- `caixa-download-csv.py` — Playwright, dynamic Lista_imoveis_{UF}.csv URL

## GO Limitations (permanent)
- **Crime rates**: crimebrasil.com.br API returns `[]` for GO — no data published
- **ITBI market values**: Goiânia doesn't publish ITBI transaction datasets publicly
- **ZAP/QA**: scraped from my local machine (Hetzner IP is Cloudflare-blocked)

## Schema Notes
- `properties.uf` — varchar(2), default 'RS' — ALL queries must filter by uf
- `zapListings.uf`, `qaListings.uf` — added in migration 0013, default 'RS'
- `itbiTransactions.cidade` — added in migration 0013, default 'PORTO ALEGRE'
- No `uf` on `itbiTransactions` — ITBI is POA-only for now

## Scoring Formula (`src/lib/scoring.ts`)
7-factor weighted: discount 25%, price efficiency 20%, financing 15%, type 10%, area value 15%, days-on-market 5%, crime 10%.
- Newer listings score higher on days-on-market
- Leilão SFI where preço > avaliação gets a negative discount penalty
- GO properties get neutral crime score (no data)

## Table Columns (`src/app/[state]/imoveis/page.tsx`)
- Columns are customizable (drag-reorder, resize, show/hide) — saved in localStorage **per state** (`caixa-imoveis-filters-rs` vs `caixa-imoveis-filters-go`)
- Market value columns (ITBI, ZAP, 5ºAndar) are clickable → ComparablesPopup
- Aluguel → RentPopup, Yield Alug. → YieldPopup with full investment analysis

## Investment Analysis Constants
- ITBI rate: POA 3% (Lei Municipal 7.111/92), RS interior 2%, Goiânia 2%
- Selic benchmark: 14.25% (Mar 2025) — hardcoded in YieldPopup, detail page, rent popup
- Acquisition costs: ITBI + registro 1.5%; Annual costs: IPTU 0.5%, vacancy 8.3%, admin 10%, maint 0.5%

## No Tests
No testing framework is configured. Verify features manually via browser after deploy.
