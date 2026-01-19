import { NextResponse } from 'next/server'
import { login, logout, isAuthenticated } from '@/lib/auth'
import { checkRateLimitKey } from '@/lib/rateLimit'
import { loginSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type')
    

    // Handle both JSON and form data
    let rawBody: unknown = {}
    if (contentType?.includes('application/json')) {
      rawBody = await request.json()
    } else {
      const formData = await request.formData()
      rawBody = {
        password: formData.get('password') as string | null,
        action: formData.get('action') as string | null,
      }
    }

    const parsed = loginSchema.safeParse(rawBody)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', errors: parsed.error.format() }, { status: 400 })
    }

    const { password, action } = parsed.data

    if (action === 'logout') {
      await logout()
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Basic validation and rate limiting per IP for login attempts
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimitKey(`login:${ip}`, 6, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many login attempts' }, { status: 429 })
    }

    if (typeof password !== 'string' || password.length === 0) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    const success = await login(password)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const authenticated = await isAuthenticated()
  return NextResponse.json({ isAuthenticated: authenticated })
}
