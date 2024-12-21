import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const DBTables = schema

export function postgresDatabase() {
  if (!process.env.DATABASE_URL) {
    console.log('database_url not found');
  }
  const db_url = process.env.DATABASE_URL || ''
  const client = postgres(db_url)
  return client
}

export function useDrizzle() {
  return drizzle(postgresDatabase(), { schema })
}
