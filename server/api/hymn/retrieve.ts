import { z } from 'zod'
import { groupBy } from 'es-toolkit'

const queryParams = z.object({
  number: z.string(),
  
})

export default defineEventHandler(async (event) => {
  const { number } = await getValidatedQuery(event, queryParams.parse)

  const db = useDrizzle()
  const res = await db.transaction(async (tx) => {
    let query = await tx.query.hymn.findMany({
      where(fields, operators) {
        return operators.eq(fields.number, number)
      },
      with: {
        stanzas: {
          columns: {
            number: true,
            verse: true,
            is_refrain: true
          }
        }
      },
      columns: {
        id: true, number: true, title: true, language: true, author: true, mp3: true
      }
    })
    return query
  })

  return {
    data:res
  }
})
