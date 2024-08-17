
export default defineEventHandler((event) => {
  const authorization = event.headers.get('Authorization')
  if (authorization) {
    const token = authorization.split(' ')[1]
    const d = isAuthenticated(event, token)
    if (d && !d.error) {
      event.context.user = d.data
    }
  }
})