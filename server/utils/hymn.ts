import { z } from 'zod'
import { HymnNew, StanzaNew } from "../database/types";

// export type createHymnBodySchema = Array<
//   HymnNew & StanzaNew
//   >

export const createHymnBodySchema = z.array(
  z.object({
    number: z.string().min(1),
    language: z.string(),
    author: z.string(),
    mp3: z.string(),
    title: z.string(),
    stanzas: z.array(
      z.object({
        number: z.number(),
        verse: z.string(),
        is_refrain: z.boolean()
      })
    )
  })
)

export async function useCreateHymn(data: HymnNew[]) {
  const db = useDrizzle()
  const hymnal = await db.transaction(async (tx) => {
    return tx.insert(DBTables.hymn)
    .values(data).returning({
      id: DBTables.hymn.id,
      number: DBTables.hymn.number,
      language: DBTables.hymn.language
    }).catch((error) => {
      throw createError(error)
    })
  })

  return hymnal
}

export async function useCreateStanza(data: Array<StanzaNew>) {
  const db = useDrizzle()
  const stanza = await db.transaction(async (tx) => {
    const d = await tx.insert(DBTables.stanza)
    .values(data).returning({
      id: DBTables.stanza.id
    }).catch((error) => {
      throw createError(error)
    })
    return d
  })
  // const stanza = await db.insert(DBTables.stanza)
  //   .values(data).returning({
  //     id: DBTables.stanza.id
  //   }).catch((error) => {
  //     throw createError(error)
  //   })
  return stanza
}

export async function useGetHymn(id: number) {
  const db = useDrizzle()
  const hymn = await db.query.hymn.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
    with: {
      stanzas: true
    }
  })
  return hymn
}