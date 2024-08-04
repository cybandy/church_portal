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
  out: './server/database/migrations'
})