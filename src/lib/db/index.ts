import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL || "postgres://imoveis:imoveis@localhost:5432/imoveis";

// Explícito de propósito. O default da lib já é max:10/idle_timeout:null,
// então isto não muda o comportamento em prod hoje — mas fica documentado e
// resistente a mudança de default numa versão futura do pacote. Com
// max_connections=100 no Postgres (checado em produção em 28/08/2026) e ESTE
// processo sendo o único cliente da instância (nenhum outro serviço na rede
// docker do Coolify conecta em imoveis-db), 10 conexões é o teto físico de
// carga que o painel interno + o site público (force-dynamic, até ~7
// queries/página em /leilao-imoveis/[uf]/[cidade]) podem gerar juntos —
// nunca esgota o Postgres, só enfileira sob pico.
const client = postgres(connectionString, { max: 10, idle_timeout: 20 });
export const db = drizzle(client, { schema });
