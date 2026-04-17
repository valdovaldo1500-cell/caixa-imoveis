# Caixa Imóveis — Master Plan

Last updated: 17/04 15:30

---

## Current State

| State | Total | Scored | Photos | Geocoded | ZAP val |
|-------|-------|--------|--------|----------|---------|
| RS | 861 | 861 ✓ | 839 | 861 ✓ | 493 |
| GO | 4706 | 4706 ✓ | 3283 | 3410 | 3268 ✓ |

Avg score: 58.41 (up from 56.08 after ZAP market value fix)

---

## 🔄 Running Now (background)

| Process | Status | Log |
|---------|--------|-----|
| Photos GO | ~1423 remaining, loop running | `/tmp/photos_loop3.log` |
| Geocoding GO | ~1296 remaining, loop running | `/tmp/geocode_loop.log` |
| VivaReal GO scrape | Running — 353/673 bairros | `/tmp/vivareal-go-scrape.log` |
| VR auto-import | Waiting for scrape to finish | `/tmp/vivareal-go-import.log` |

---

## ✅ Done (this session)

### Routing & Architecture
- [x] `/rs/*` and `/go/*` routes via single `[state]` dynamic segment
- [x] Landing page at `/` with RS/GO state cards
- [x] `NavHeader` with RS ↔ GO toggle preserving sub-route
- [x] Legacy redirects (`/imoveis` → `/rs/imoveis` etc.)
- [x] State utilities: `src/lib/state.ts`

### GO Pipeline
- [x] CSV download GO (CDP bypass Radware)
- [x] 4706 GO properties imported and scored
- [x] ZAP GO: 5454 listings imported, market values calculated
- [x] QuintoAndar GO: 205 listings imported
- [x] VivaReal GO: scraping now → auto-import on finish
- [x] Daily cron loops `for UF in RS GO` — Wednesday ZAP+VR, Saturday QA
- [x] Scoring: 5567 total properties (RS+GO) scored

### UI Fixes (GO-specific)
- [x] Map centers on Goiânia for `/go/mapa`
- [x] Distance filter: "Distância Goiânia" label + correct center coords for km
- [x] ITBI completely hidden on GO (column, period filter, comparables, detail card)
- [x] Score pane factor bars now show real values (fixed object vs number bug)
- [x] Thumbnail hover popup flips upward near bottom of page (no flicker)
- [x] Renovation costs by type: apt R$280/700/1300, casa R$300/750/1450 per m² (SINAPI GO 2024)

### Users
- [x] Leo user created (psql direct insert)

---

## ⏳ In Progress

### Photos GO
- 3283/4706 done, 1423 remaining
- Loop: `/tmp/photos_loop3.sh` (PID 2272509)
- ETA: ~3h from 12:25

### Geocoding GO
- 3381/4706 done, 1325 remaining
- Loop: `/tmp/geocode_loop.sh` (PID 2284697)
- Nominatim rate-limited — ETA: ~3h

### VivaReal GO
- Scraping 673 bairros (Playwright + DISPLAY=:99)
- Auto-import daemon will SCP → docker cp → POST /api/pipeline/vivareal?action=all&uf=GO → scoring
- ETA: ~6-8h from 12:25

---

## 📋 Pending (not started)

### VivaReal RS
- Scraper already parameterized (`--uf RS`)
- Need to: run initial RS scrape, add to daily pipeline (already added Wednesday slot)
- Blocked: do RS after GO is confirmed working

### VivaReal RS
- Scraper already parameterized (`--uf RS`)
- Need to: run initial RS scrape, add to daily pipeline (already added Wednesday slot)
- Blocked: do RS after GO is confirmed working

---

## 🚫 Permanent Limitations (by design)

| Feature | RS | GO | Reason |
|---------|----|----|--------|
| Crime rates | ✓ | ✗ | crimebrasil.com.br API returns `[]` for GO |
| ITBI market value | ✓ | ✗ | Goiânia doesn't publish ITBI datasets |
| Crime score | real | neutral 50/100 | No upstream data for GO |

---

## Daily Cron Schedule (`~/scripts/caixa-daily-pipeline.sh`, 7am)

| Day | Tasks |
|-----|-------|
| Every day | CSV download RS+GO → import → parse descriptions → crime rates (RS) → geocode → score → photos → notify |
| Wednesday | + ZAP scrape RS+GO + VivaReal GO |
| Saturday | + QuintoAndar RS+GO |
| Sunday | + ITBI update (RS only) |

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/state.ts` | `VALID_STATES`, `STATE_META`, `isValidState` |
| `src/app/[state]/layout.tsx` | State validation, NavHeader mount |
| `src/lib/db/schema.ts` | All tables — `uf` on properties/zapListings/qaListings |
| `src/pipeline/zap.ts` | `importZapData(path, uf)`, `calculateZapMarketValues(uf)` |
| `src/pipeline/vivareal.ts` | Same pattern as zap — uses `source="vivareal"` in zap_listings |
| `~/scripts/caixa-daily-pipeline.sh` | Master cron |
| `~/scripts/zap-scraper.py` | `--uf RS\|GO`, 673 GO bairros |
| `~/scripts/vivareal-scraper.py` | `--uf RS\|GO`, 673 GO bairros |
| `~/scripts/quintoandar-scraper.py` | `--uf RS\|GO`, CITIES_GO dict |
| `~/scripts/caixa-scrape-photos.py` | `--uf RS\|GO` |

---

## Production

- URL: https://imoveis.crimebrasil.com.br
- Server: Hetzner 188.34.199.27, Coolify auto-deploy on push to `main`
- DB container: `imoveis-db-k888wo4k4w8s8kgws00sg0og`
- App container: `app-k888wo4k4w8s8kgws00sg0og-*`
- Pipeline token: `caixa-pipeline-2026-rs-secret`
- SESSION_SECRET: in container env (used for auth cookies)
