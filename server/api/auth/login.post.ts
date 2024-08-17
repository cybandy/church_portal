/**
 * Login user
 * body = {email:string, password:string}
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await useLogin(event, body.email, body.password)
})