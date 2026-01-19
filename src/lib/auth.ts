import { getIronSession, IronSession } from 'iron-session'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export interface SessionData {
  isLoggedIn: boolean
  username?: string
}

const sessionPassword = process.env.SESSION_SECRET ?? ''

const sessionOptions = {
  password: sessionPassword,
  cookieName: 'bootsified_admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function getSession(): Promise<IronSession<SessionData>> {
  if (!sessionOptions.password) {
    throw new Error('SESSION_SECRET environment variable is required for sessions')
  }

  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session.isLoggedIn === true
}

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD?.trim()

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return false
  }

  // If password looks like a bcrypt hash, compare securely
  if (adminPassword.startsWith('$2')) {
    try {
      return await bcrypt.compare(password, adminPassword)
    } catch (error) {
      console.error('Error comparing bcrypt password')
      return false
    }
  }

  // Plain-text admin passwords are allowed only in non-production environments
  if (process.env.NODE_ENV === 'production') {
    console.error('Plain-text ADMIN_PASSWORD is not allowed in production. Use a bcrypt hash.')
    return false
  }

  // Development fallback (warn): compare directly
  console.warn('ADMIN_PASSWORD is stored in plain text; prefer a bcrypt hash in production')
  return password === adminPassword
}

export async function login(password: string): Promise<boolean> {
  const isValid = await verifyPassword(password)

  if (isValid) {
    const session = await getSession()
    session.isLoggedIn = true
    session.username = 'admin'
    await session.save()
    return true
  }

  return false
}

export async function logout(): Promise<void> {
  const session = await getSession()
  session.destroy()
}
