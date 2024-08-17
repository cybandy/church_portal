import { sql } from 'drizzle-orm'
import { z } from 'zod'
const queryParams = z.object({
  q: z.string().min(1)
})
export default defineEventHandler(async (event) => {
  const {q} = await getValidatedQuery(event, queryParams.parse)
  const db = useDrizzle()

  

  const res = await db.transaction(async (tx) => {
    // return await tx.query.hymn.findMany({
    //   where(fields, operators) {
    //     return operators.or(
    //       operators.ilike(fields.title, query.q),
    //       // operators.ilike(fields.author, query.q),
    //       operators.ilike(fields.number, query.q),
    //       operators.inArray(fields.author, query.q.split(''))
    //     )
    //   },
    // })
    const formatted_search_query = q.split(' ').join(' & ')
    const results = await tx
  .select()
  .from(DBTables.hymn)
  .where(sql`"hymnSearch" @@ to_tsquery('english', ${formatted_search_query})`);
    return results
  })

  return {
    hymns: res,
    count: res.length
  }
})
