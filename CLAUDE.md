@AGENTS.md

# Caixa Imóveis RS

Private dashboard for analyzing repossessed properties from Caixa Econômica Federal in RS.

## Stack
- Next.js 16 (App Router) + TypeScript (strict) + Tailwind CSS + shadcn/ui
- Drizzle ORM + PostgreSQL 16 (postgres.js driver)
- Auth: custom HMAC-SHA256 cookie (`proxy.ts` guards ALL routes)
- Import alias: `@/*` → `./src/*`

## Critical Next.js 16 Gotcha
- Uses `proxy.ts` (NOT `middleware.ts`) — export `proxy()` not `middleware()`
- Read `node_modules/next/dist/docs/` before writing any Next.js-specific code

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
- `CSV_LOCAL_PATH` — set to `/tmp/caixa_imoveis_rs.csv` to skip Caixa download (Radware blocks server IP)

## CSV Download Workaround
Caixa's Radware bot protection blocks fetch and curl from Hetzner. Always use Chrome automation to download the CSV locally, then:
```bash
scp Lista_imoveis_RS.csv root@188.34.199.27:/tmp/caixa_imoveis_rs.csv
ssh root@188.34.199.27 "docker cp /tmp/caixa_imoveis_rs.csv <container>:/tmp/caixa_imoveis_rs.csv"
```

## Pipeline Execution Order
After importing a new CSV, always run in this order:
1. `POST /api/pipeline/trigger` — download/upsert properties
2. `POST /api/pipeline/parse-descriptions` — extract tipo/quartos/vagas
3. `POST /api/scoring/run` — calculate 0-100 scores

## Scoring Formula (`src/lib/scoring.ts`)
7-factor weighted: discount 25%, price efficiency 20%, financing 15%, type 10%, area value 15%, days-on-market 5%, crime 10%.
- Newer listings score higher on days-on-market
- Leilão SFI where preço > avaliação gets a negative discount penalty

## Table Columns (`src/app/imoveis/page.tsx`)
- Columns are customizable (drag-reorder, resize, show/hide) — saved in localStorage
- New default-visible columns use auto-add logic in useEffect so existing users see them
- Market value columns (ITBI, ZAP, 5ºAndar) are clickable → ComparablesPopup
- Aluguel → RentPopup, Yield Alug. → YieldPopup with full investment analysis

## Investment Analysis Constants
- ITBI rate: POA 3% (Lei Municipal 7.111/92), RS interior 2%
- Selic benchmark: 14.25% (Mar 2025) — hardcoded in YieldPopup, detail page, rent popup
- Acquisition costs: ITBI + registro 1.5%; Annual costs: IPTU 0.5%, vacancy 8.3%, admin 10%, maint 0.5%

## No Tests
No testing framework is configured. Verify features manually via browser after deploy.
