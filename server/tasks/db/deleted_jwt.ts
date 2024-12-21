import { eq } from 'drizzle-orm'

export default defineTask({
  meta: {
    name: 'db:deleted_jwt',
    description: 'Delete all expired blacklisted jwt\'s'
  },
  async run({ payload, context }) {
    const db = useDrizzle()
    const date = new Date()
    try {
      await db.delete(DBTables.blackListedTokens)
        .where(eq(DBTables.blackListedTokens.expiration, date))

      console.log('scheduled tasks: clearing blacklist jwt\'s')

      return {
        result: {
          status: true,
          msg: 'success'
        }
      }
    }
    catch (error) {
      console.log(error)
      return {
        result: {
          status: false,
          msg: JSON.stringify(error)
        }
      }
    }
  },
})