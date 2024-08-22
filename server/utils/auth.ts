import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import type { NewMember } from '../database/types'
import type { H3Event } from 'h3'
import { z } from 'zod'
import crypto from 'crypto'

type newMemberData = { password: string } & Omit<NewMember, 'id' | 'createdAt' | 'password_hash'>

export const createUserSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
})


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
      email: DBTables.members.email
    }).catch((error) => {
      throw createError(error)
    })
  
  return generateToken(member[0].id, member[0].email, event)
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

  if (!member) throw createError('Invalid email')
  if (!member.password_hash) throw createError('Invalid email or password')
  
  const isPwdValid = await bcrypt.compare(password, member.password_hash)

  if (!isPwdValid) throw createError('incorrect password')
  
  return generateToken(member.id, email, event)
}

function generateJTI() {
  return crypto.randomBytes(16).toString('hex')
}

function generateToken(id: string|number, email: string, event:H3Event) {
  const { secret_key } = useRuntimeConfig().public.jwt
  const jti = generateJTI()
  const token = jsonwebtoken.sign({ id, email, jti }, secret_key, {expiresIn: '7d'})
  // set cookie
  setCookie(event, 'qb_token', token)
  return token
}

export function isAuthenticated(event: H3Event, token='') {
  
  if (!token) return false
  const config = useRuntimeConfig(event)
  try {
    const user = jsonwebtoken.verify(token, config.public.jwt.secret_key)
    return {
      status: true,
      data: user,
      error: null
    }
  } catch (error) {
    return {
      status: false,
      error: error,
      data:null
    }
  }
}

export async function useGetUser(event: H3Event, email:string) {
  const db = useDrizzle()
  let member = await db.query.members.findFirst({
    where(fields, operators) {
      return operators.eq(fields.email, email)
    },
    columns: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      address: true,
      avatar_url: true,
      tel: true,
      roles: true,
      createdAt: true,
      ss_group_id:true
    }
  })
  return member
}

export async function useLogout(jti: string, exp:number) {
  
  const expiration = new Date(exp * 1000)
  //save in db
  const db = useDrizzle()
  await db.insert(DBTables.blackListedTokens).values({ jti, expiration })
  return
}