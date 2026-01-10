import { getIronSession, IronSession } from 'iron-session'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export interface SessionData {
  isLoggedIn: boolean
  username?: string
}

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'bootsified_admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session.isLoggedIn === true
}

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return false
  }

  // Check if the stored password is hashed (starts with $2a$ or $2b$)
  if (adminPassword.startsWith('$2')) {
    return bcrypt.compare(password, adminPassword)
  }
  
  // For backwards compatibility, support plain text passwords (not recommended)
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
