import db from "./index";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connection = postgres(process.env.DB_URL!,{ max: 1 });

async function main() {
  await migrate(db,{migrationsFolder:"./db/migrations",})
  console.log('Migrated successfully')
  connection.end()
  process.exit(0)
}

main().catch((e) => {
  console.error('Migration failed')
  console.error(e)
  process.exit(1)
});