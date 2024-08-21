import { sql } from 'drizzle-orm'
import { z } from 'zod'
import { groupBy } from 'es-toolkit'
import { parseHymnIterator } from '~~/server/utils/hymn'
const queryParams = z.object({
  q: z.string().default('')
})
export default defineEventHandler(async (event) => {
  const {q} = await getValidatedQuery(event, queryParams.parse)
  const db = useDrizzle()

  

  const res = await db.transaction(async (tx) => {
    
    const formatted_search_query = q.trim().split(' ').join(' & ')
    const results = await tx
  .select()
  .from(DBTables.hymn)
  .where(sql`"hymnSearch" @@ to_tsquery('english', ${formatted_search_query})`);
    return results
  })

  const groups = groupBy(res, x=>x.number as string)

  const group_keys = Object.keys(groups)

  const gen = parseHymnIterator(res, 'number')
  const hymn_values = group_keys.map(x => gen.next().value)
  return {
    hymns: hymn_values,
    count: group_keys.length
  }
})
