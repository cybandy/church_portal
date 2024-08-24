import { isJwtBlacklisted, useGetUser } from "../utils/auth"

export default defineEventHandler(async (event) => {
  const user = event.context.user
  await isJwtBlacklisted(event, user.jti)

  if (user && typeof user !== 'string') {
    const data = await useGetUser(event, user.email)

    return data
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'unauthorized',
    })
  }
})
