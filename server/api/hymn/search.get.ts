import { sql } from 'drizzle-orm'
import { z } from 'zod'
import _ from 'es-toolkit'
const queryParams = z.object({
  q: z.string().default('')
})
export default defineEventHandler(async (event) => {
  const {q} = await getValidatedQuery(event, queryParams.parse)
  const db = useDrizzle()

  

  const res = await db.transaction(async (tx) => {
    const formatted_search_query = q.split(' ').join(' & ')
    const results = await tx
  .select()
  .from(DBTables.hymn)
  .where(sql`"hymnSearch" @@ to_tsquery('english', ${formatted_search_query})`);
    return results
  })

  const groups = _.groupBy(res, x=>x.number as string)

  return {
    hymns: groups, count: Object.keys(groups).length
  }
})
