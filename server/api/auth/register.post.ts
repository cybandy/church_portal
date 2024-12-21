import { } from 'drizzle-zod'
import { createUserSchema } from '~~/server/utils/auth'
/**
 * Register user
 *
 */
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createUserSchema.parse)
  try {
    const token = await useCreateMember(body, event)
    return token
  }
  catch (error) {
    if (JSON.stringify(error).includes('duplicate key value violates')) {
      throw createError({
        message: `${body.email} is already registered`
      })
    }

    throw createError({
      statusCode: 500,
    })
  }
})