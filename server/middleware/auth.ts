

export default defineEventHandler(async (event) => {
  const authorization = event.headers.get('Authorization')
  if (authorization) {
    const token = authorization.split(' ')[1]
    const d = isAuthenticated(event, token) as any
    if (d && !d.error) {
      event.context.user = d.data

    }
  }
})