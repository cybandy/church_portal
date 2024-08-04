import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'

export const tables = schema

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


