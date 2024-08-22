export default defineEventHandler(async (event) => {
  const data = event.context.user
  return data
})
