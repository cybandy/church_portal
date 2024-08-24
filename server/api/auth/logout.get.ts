export default defineEventHandler(async (event) => {
  const data = event.context.user
  await useLogout(data.jti, data.exp)
  event.headers.set('Authorization', '')
  return
})
