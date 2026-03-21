@AGENTS.md

# Caixa Imóveis RS

Private dashboard for analyzing repossessed properties from Caixa Econômica Federal in RS.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Drizzle ORM + PostgreSQL 16
- Auth: custom HMAC-SHA256 cookie (proxy.ts guards all routes)
- Next.js 16 uses `proxy.ts` instead of `middleware.ts`

## Commands
```bash
pnpm dev                    # Dev server (port 3000)
pnpm build                  # Production build
pnpm drizzle-kit generate   # Generate migrations
pnpm drizzle-kit push       # Push schema to DB
docker compose up -d        # Start local PostgreSQL
```

## Deploy
- Production: imoveis.crimebrasil.com.br (Coolify on Hetzner)
- Auto-deploy on git push
- docker-compose.prod.yml has Traefik labels for SSL

## Key env vars
- DATABASE_URL, SESSION_SECRET, DASHBOARD_PASSWORD
- HCAPTCHA_SECRET, NEXT_PUBLIC_HCAPTCHA_SITE_KEY
- CSV_LOCAL_PATH (optional, skip download from Caixa)
