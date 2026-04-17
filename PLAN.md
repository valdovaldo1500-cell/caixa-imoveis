# Caixa Imóveis — Master Plan

Last updated: 17/04 17:25

---

## Current State

| State | Total | Scored | Photos | Geocoded | ZAP sale | QA rent |
|-------|-------|--------|--------|----------|----------|---------|
| RS | 861 | 861 ✓ | 839 | 861 ✓ | 493 | 218 |
| GO | 4706 | 4706 ✓ | 3283 | 3410 | 3268 ✓ | 137 |

- Avg score: **58.41**
- GO QA: rental-only platform in GO (203 RENTAL, 2 SALE) — `qa_market_value` correctly NULL, rent values populated via city fallback

---

## 🔄 Running Now (background)

| Process | Status | Log |
|---------|--------|-----|
| Photos GO | ~1423 remaining | `/tmp/photos_loop3.log` |
| Geocoding GO | ~1296 remaining | `/tmp/geocode_loop.log` |
| VivaReal GO scrape | 443/673 bairros | `/tmp/vivareal-go-scrape.log` |
| VR auto-import | Waiting for scrape | `/tmp/vivareal-go-import.log` |

---

## ✅ Done (this session)

### Routing & Architecture
- [x] `/rs/*` and `/go/*` routes via single `[state]` dynamic segment
- [x] Landing page at `/` with RS/GO state cards — description updated to reflect live GO data
- [x] `NavHeader` with RS ↔ GO toggle preserving sub-route
- [x] Legacy redirects (`/imoveis` → `/rs/imoveis` etc.)
- [x] State utilities: `src/lib/state.ts`

### GO Pipeline
- [x] CSV download GO (CDP bypass Radware)
- [x] 4706 GO properties imported and scored
- [x] ZAP GO: 5454 listings imported; prefix match + city fallback → 3268/4706 with market values
- [x] QuintoAndar GO: 205 listings (203 rental); city fallback → 137 with rent values
- [x] VivaReal GO: scraping (443/673) → auto-import on finish
- [x] Daily cron: loops `for UF in RS GO` every day; Wednesday adds ZAP+VR; Saturday adds QA
- [x] Scoring: 5567 total scored, avg 58.41

### UI Fixes (GO-specific)
- [x] Map centers on Goiânia (`-16.69, -49.26`) for `/go/mapa`
- [x] Distance filter: "Distância Goiânia" label + Goiânia center for km calculation
- [x] Distance column in table: uses state center coords (was hardcoded POA)
- [x] City quick-select: shows top 10 GO cities on `/go`, RS cities on `/rs`
- [x] ITBI completely hidden on GO (column, period filter, comparables, detail card, cost calc)
- [x] Score pane factor bars show real values (fixed object vs number bug)
- [x] Thumbnail popup flips upward near bottom of page (no flicker)
- [x] Renovation costs by type (SINAPI GO 2024): apt R$280/700/1300, casa R$300/750/1450/m²
- [x] Investimentos page: filters by state UF, removed ITBI/RS refs in subtitle + methodology
- [x] Leo user created

### Pipeline Fixes
- [x] ZAP matching: prefix match + city fallback (was exact-only → 676 matches; now 3268)
- [x] QA matching: city fallback added (203 rental GO listings → 137 rent values)

---

## ⏳ In Progress

| Task | Progress | PID | Log |
|------|----------|-----|-----|
| Photos GO | 3283/4706 | 2272509 | `/tmp/photos_loop3.log` |
| Geocoding GO | 3410/4706 | 2284697 | `/tmp/geocode_loop.log` |
| VivaReal GO scrape | 443/673 | 2394030 | `/tmp/vivareal-go-scrape.log` |

---

## 📋 Pending (not started)

### VivaReal RS
- Scraper parameterized (`--uf RS`), daily pipeline slot ready (Wednesday)
- Need: run initial RS scrape + import

---

## 🚫 Permanent Limitations (by design)

| Feature | RS | GO | Reason |
|---------|----|----|--------|
| Crime rates | ✓ | ✗ | crimebrasil.com.br returns `[]` for GO |
| ITBI market value | ✓ | ✗ | Goiânia doesn't publish ITBI datasets |
| QA sale price | ✓ | ✗ | QuintoAndar GO is rental-only |
| Crime score | real | neutral 50/100 | No upstream data |

---

## Daily Cron (`~/scripts/caixa-daily-pipeline.sh`, 7am local)

| Day | Tasks |
|-----|-------|
| Every day | CSV RS+GO → import → parse descriptions → crime (RS) → geocode → score → photos → notify |
| Wednesday | + ZAP RS+GO + VivaReal GO |
| Saturday | + QuintoAndar RS+GO |
| Sunday | + ITBI (RS only) |

---

## Key Files

| File | Purpose |
|------|---------|
| `PLAN.md` | This file — master plan |
| `src/lib/state.ts` | `VALID_STATES`, `STATE_META`, `isValidState` |
| `src/app/[state]/layout.tsx` | State validation, NavHeader mount |
| `src/lib/db/schema.ts` | All tables — `uf` on properties/zapListings/qaListings |
| `src/pipeline/zap.ts` | Import + calculate market values; prefix+city fallback matching |
| `src/pipeline/quintoandar.ts` | Same pattern; city fallback for sparse GO data |
| `src/pipeline/vivareal.ts` | Uses `source="vivareal"` in zap_listings table |
| `src/pipeline/geocode.ts` | Nominatim; state-aware queries via STATE_META |
| `src/app/[state]/imoveis/page.tsx` | Main table; state-aware city list, distance, ITBI hiding |
| `src/app/[state]/imoveis/[id]/page.tsx` | Detail + investment analysis; type-aware reno costs |
| `src/app/[state]/investimentos/page.tsx` | Portfolio analysis; filters by UF |
| `src/components/PropertyMap.tsx` | Leaflet map; state-aware center |
| `~/scripts/caixa-daily-pipeline.sh` | Master cron |
| `~/scripts/zap-scraper.py` | `--uf RS\|GO`, 673 GO bairros |
| `~/scripts/vivareal-scraper.py` | `--uf RS\|GO`, 673 GO bairros |
| `~/scripts/quintoandar-scraper.py` | `--uf RS\|GO`, CITIES_GO dict |
| `~/scripts/caixa-scrape-photos.py` | `--uf RS\|GO` |
| `~/scripts/caixa-download-csv.py` | `--uf RS\|GO`, CDP bypass Radware |

---

## Production

- **URL**: https://imoveis.crimebrasil.com.br
- **Server**: Hetzner 188.34.199.27 — Coolify auto-deploys on push to `main`
- **DB container**: `imoveis-db-k888wo4k4w8s8kgws00sg0og`
- **App container**: `app-k888wo4k4w8s8kgws00sg0og-*` (suffix changes each deploy)
- **Pipeline token**: `caixa-pipeline-2026-rs-secret`
- **SESSION_SECRET**: `x9Kp2mZvR4tL7wQ3nB8jF6cH1dY5aE0iU` (container env)
- **Commits today**: `af4661d` → `545bebe` (36 commits)
