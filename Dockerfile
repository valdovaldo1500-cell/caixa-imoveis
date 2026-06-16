FROM node:20-alpine AS base

# Install pnpm and curl (for CSV download)
# pnpm is PINNED to 9.x: this image is node:20-alpine, and pnpm >=10 requires
# Node >=22.13 (uses node:util styleText) — `pnpm@latest` silently broke the
# build once pnpm 10 shipped. 9.15.9 matches our lockfileVersion 9.0. Do NOT
# revert to @latest without also bumping the Node base image.
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate && \
    apk add --no-cache curl

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_HCAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_HCAPTCHA_SITE_KEY=$NEXT_PUBLIC_HCAPTCHA_SITE_KEY
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 app && \
    adduser --system --uid 1001 app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
COPY --from=builder --chown=app:app /app/drizzle ./drizzle
COPY --from=builder --chown=app:app /app/scripts ./scripts
COPY --from=builder --chown=app:app /app/node_modules/drizzle-orm ./node_modules/drizzle-orm
COPY --from=builder --chown=app:app /app/node_modules/postgres ./node_modules/postgres

# Startup script: migrate then start
COPY --chown=app:app entrypoint.sh ./
RUN chmod +x entrypoint.sh

USER app

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./entrypoint.sh"]
