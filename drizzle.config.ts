// drizzle.config.ts
import {defineConfig } from "drizzle-kit";

// export default {
//   schema: "./schema.ts",
//   out: "./migrations",
//   dialect: "postgresql",
//   dbCredentials: {
//     // connectionString: process.env.DATABASE_URL,
//   },
//   verbose: true,
//   strict: true,
// } satisfies Config;

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    host:process.env.DB_HOST || 'localhost',
    // port:process.env.DB_PORT || 5432,
    password:process.env.DB_PASSWORD || 'cybandy',
    user:process.env.DB_USER || 'postgres',
    database:process.env.DB_NAME || 'churchportal',
  }
})