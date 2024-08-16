import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import type { NewMember } from '../database/types'
import type { H3Event } from 'h3'

type newMemberData = { password: string } & Omit<NewMember, 'id' | 'createdAt' | 'password_hash'>


export async function useCreateMember(data:newMemberData, event:H3Event) {
  
  if (!data.email || !data.password) {
    throw createError('Email and password are required')
  }
  const salt = await bcrypt.genSalt(10)
  const hashPwd = await bcrypt.hash(data.password, salt)
  
  const db = useDrizzle()

  const member = await db
    .insert(DBTables.members)
    .values([{...data, password_hash: hashPwd}])
    .returning({
      id: DBTables.members.id,
    }).catch((error) => {
      throw createError(error)
    })
  
  return generateToken(member[0].id, data.password, event)
}

export async function useLogin(event:H3Event, email: string, password: string) {
  if (!email || !password) throw createError('Email and password are required')
  
  const db = useDrizzle()
  let member = await db.query.members.findFirst({
    where(fields, operators) {
      return operators.eq(fields.email, email)
    },
    columns: {
      password_hash: true,
      id:true
    }
  })

  if (!member) throw createError('Invalid email or password')
  if (!member.password_hash) throw createError('Invalid email or password')
  
  const isPwdValid = await bcrypt.compare(member.password_hash, password)

  if (!isPwdValid) throw createError('Invalid email or password')
  
  return generateToken(member.id, email, event)
}

function generateToken(id: string|number, email: string, event:H3Event) {
  const { secret_key } = useRuntimeConfig().public.jwt
  const token = jsonwebtoken.sign({ id, email }, secret_key)
  // set cookie
  setCookie(event, 'qb_token', token)
  return token
}

export function isAuthenticated(event: H3Event) {
  const cookies = parseCookies(event)
  const token = cookies['qb_token']
  if (!token) return false
  const config = useRuntimeConfig(event)
  try {
    jsonwebtoken.verify(token, config.public.jwt.secret_key)
    return true
  } catch (error) {
    return false
  }
}