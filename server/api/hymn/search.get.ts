import { eq, or, like } from 'drizzle-orm/expressions'
import { z } from 'zod'
const queryParams = z.object({
  q: z.string().min(1)
})
export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, queryParams.parse)
  const db = useDrizzle()

  const res = await db.transaction(async (tx) => {
    return await tx.query.hymn.findMany({
      where(fields, operators) {
        return operators.or(
          operators.ilike(fields.title, query.q),
          // operators.ilike(fields.author, query.q),
          operators.ilike(fields.number, query.q),
          operators.inArray(fields.author, query.q.split(''))
        )
      },
    })
  })

  return {
    hymns: res,
    count: res.length
  }
})
