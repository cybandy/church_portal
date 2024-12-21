import type { HymnNew, StanzaNew } from '~~/server/database/types'
import { createHymnBodySchema } from '~~/server/utils/hymn'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401 })

  const body = await readValidatedBody(event, createHymnBodySchema.parse)

  const hymnPayload: Array<HymnNew> = body.map((x) => {
    return {
      number: x.number,
      language: x.language as any,
      author: x.author,
      mp3: x.mp3,
      title: x.title
    }
  })
  const db = useDrizzle()
  const res = await db.transaction(async (tx) => {
    const hymns = await tx.insert(DBTables.hymn)
      .values(hymnPayload)
      .returning({
        id: DBTables.hymn.id,
        number: DBTables.hymn.number,
        language: DBTables.hymn.language
      })
      .catch((error) => {
        throw createError(error)
      })
    const stanzaPayload = [] as Array<StanzaNew>

    hymns.map((x, i) => {
      const d = body.find(y => y.language == x.language && y.number == x.number)
      if (d) {
        d.stanzas.map((st) => {
          stanzaPayload.push({
            hymn_id: x.id,
            number: st.number,
            is_refrain: st.is_refrain,
            verse: st.verse
          })
        })
      }
    })

    await tx.insert(DBTables.stanza)
      .values(stanzaPayload)
      .returning({
        id: DBTables.stanza.id
      }).catch((error) => {
        throw createError(error)
      })

    const hymnals = await tx.query.hymn.findMany({
      where(fields, operators) {
        return operators.inArray(fields.id, hymns.map(x => x.id))
      },
    })

    return hymnals
  })

  // const id = hymn[0].id

  return { hymns: res, count: res.length }
})
