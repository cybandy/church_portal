/**
 * Register user
 * 
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await useCreateMember(body, event)
})