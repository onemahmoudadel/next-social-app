import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
})