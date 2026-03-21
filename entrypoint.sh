#!/bin/sh

echo "Waiting for postgres..."
sleep 5

echo "Running database migrations..."
node -e "
const { drizzle } = require('drizzle-orm/postgres-js');
const { migrate } = require('drizzle-orm/postgres-js/migrator');
const postgres = require('postgres');

async function main() {
  const client = postgres(process.env.DATABASE_URL, { max: 1, connect_timeout: 10 });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete.');
  await client.end();
}
main().catch(err => { console.error('Migration failed:', err.message); });
" || true

echo "Starting server..."
exec node server.js
