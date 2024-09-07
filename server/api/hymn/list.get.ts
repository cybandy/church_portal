import { z } from 'zod'
import { groupBy } from 'es-toolkit'
import { parseHymnIterator } from '~~/server/utils/hymn'
import { sql } from 'drizzle-orm'
// import {groupBy} from 'lodash-es'
// import { parseHymnGenerator } from '~~/server/utils/hymn'

const queryParams = z.object({
  number: z.string().default(''),
  limit: z.preprocess((val) => parseInt(val as string, 10), z.number().default(20)),
  offset: z.preprocess((val) => parseInt(val as string, 10), z.number().default(0)),
  // offset: z.number().default(0),
  language: z.string().default('twi')
})


export default defineEventHandler(async (event) => {
  const { number, limit, offset, language } = await getValidatedQuery(event, queryParams.parse)

  const db = useDrizzle()

  const res = await db.transaction(async (tx) => {
    let query = await tx.query.hymn.findMany({
      where(fields, operators) {
        return operators.and(
          // operators.eq(fields.language, 'twi'),
          (
            number.length > 0 ? operators.inArray(fields.number, number.split(',')) : operators.gte(fields.id, 1)
          )
        )
      },
      limit,
      offset,
      // columns: {
      //   id: true, number: true, title: true, language: true, author: true, mp3: true
      // }

    })

    let count = await tx.select({ count: sql<number> `count(*)` }).from(DBTables.hymn)
    let _count = count[0].count

    return { hymns: query, count: _count }
  })

  const count = await db.transaction(async (tx) => {
    return await tx.select({
      count: sql<number>`count(*)`
    }).from(DBTables.hymn)
  })

  const groups = groupBy(res.hymns, (x) => x.number as string)
  const group_keys = Object.keys(groups)

  const gen = parseHymnIterator(res.hymns, 'number')
  const hymn_values = group_keys.map(x => gen.next().value)
  return {
    hymns: hymn_values,
    count: res.count
  }
})
