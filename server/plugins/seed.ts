import { } from 'postgres'
import { consola } from 'consola'
import * as schema from '../database/schema'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return
  // db client
  // const db = useDrizzle()

  // // check if data is already in db
  // const _member = await db.query.members.findMany()
  // if (_member.length > 5) return
  
  // // inserting seed data
  // consola.info("started seeding=======\n")
  // consola.info("seeding members=======")

  // for (let ind = 0; ind < 10; ind++) {
  //   const member = await db
  //     .insert(schema.members)
  //     .values({
        
  //     })
  // }
})