import { } from 'drizzle-zod'
import { createUserSchema } from '~~/server/utils/auth'
/**
 * Register user
 * 
 */
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createUserSchema.parse)
  return await useCreateMember(body, event)
})