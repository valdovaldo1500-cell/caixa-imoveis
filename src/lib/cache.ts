/**
 * Constantes de cache das páginas públicas do agregador (O6).
 *
 * As rotas públicas (home, hub de UF, lista de cidade, ficha do imóvel,
 * sitemap) continuam `export const dynamic = "force-dynamic"` — isso NÃO
 * muda aqui. O build do Coolify roda antes de o container entrar na rede do
 * Postgres, e qualquer página pré-renderizada que bata no banco derruba o
 * deploy inteiro (já aconteceu 3x). `force-dynamic` existe por causa disso e
 * continua existindo.
 *
 * O cache mora um nível abaixo, na CONSULTA, via `unstable_cache` do Next
 * (`next/cache`). Isso resolve o problema real (5.161 imóveis + 175 cidades
 * expostos a crawler batendo no banco a cada acesso) sem reintroduzir a
 * dependência de banco no build: `unstable_cache` só executa quando alguém
 * chama a função encapsulada — nunca durante `next build`, porque nenhuma
 * página `force-dynamic` é renderizada no build.
 *
 * PEGADINHA da versão instalada (Next 16.2.1): por baixo do capô,
 * `unstable_cache` serializa o retorno com `JSON.stringify`/`JSON.parse`
 * (ver node_modules/next/dist/esm/server/web/spec-extension/unstable-cache.js).
 * Isso tem duas consequências que já morderam gente em outros projetos:
 *
 * 1. Em cache HIT, qualquer `Date` no retorno vira STRING (ISO 8601) — só no
 *    cache MISS (primeira chamada, ou depois de expirar) o valor é o `Date`
 *    de verdade. Código que chama `.getFullYear()`/`.toISOString()` direto
 *    num campo cacheado funciona no miss e quebra no primeiro hit. As
 *    colunas `timestamp`/`date` deste schema (`crimeJanelaInicio/Fim` etc.)
 *    já são lidas de forma defensiva em `lib/seguranca.ts` (aceitam
 *    `Date | string`) — mantenha esse padrão em qualquer campo novo que
 *    passar por uma função cacheada aqui.
 * 2. A chave de cache é `JSON.stringify(args)` dos argumentos da própria
 *    chamada — então TODOS os parâmetros que mudam o resultado (uf, cidade,
 *    página, cada filtro) precisam estar entre os argumentos da função
 *    encapsulada. Uma função que lê filtro de uma variável fechada (closure)
 *    em vez de receber como argumento quebra o cache silenciosamente: serve
 *    o resultado errado para o parâmetro errado.
 */

/** Listas, hubs de UF e ficha do imóvel — o estoque só muda 1x/dia, às 7h. */
export const CACHE_TTL_LISTA = 3600;

/** Sitemap — tolera atraso maior, não é UX direta (é só para o crawler). */
export const CACHE_TTL_SITEMAP = 21600;
