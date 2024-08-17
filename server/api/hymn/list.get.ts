import { z } from 'zod'
import { eq, inArray } from 'drizzle-orm'
import _ from 'es-toolkit'

const queryParams = z.object({
  number: z.string().default(''),
  limit: z.number().default(10),
  offset: z.number().default(0)
})
export default defineEventHandler(async (event) => {
  const { number, limit, offset } = await getValidatedQuery(event, queryParams.parse)
  const db = useDrizzle()
  const res = await db.transaction(async (tx) => {
    let query = await tx.query.hymn.findMany({
      where(fields, operators) {
        return number.length > 0 ? operators.inArray(fields.number, number.split('')) : operators.gte(fields.id, 1) 
      },
      // limit,
      // offset,
      
    })
    return query
  })
  const groups = _.groupBy(res, (x)=>x.number as string)
  return {
    hymns: groups,
    count: Object.keys(groups).length
  }
})
