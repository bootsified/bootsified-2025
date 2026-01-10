import { NextResponse } from 'next/server'
import { login, logout, isAuthenticated } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type')
    let password: string | undefined
    let action: string | undefined

    // Handle both JSON and form data
    if (contentType?.includes('application/json')) {
      const body = await request.json()
      password = body.password
      action = body.action
    } else {
      const formData = await request.formData()
      password = formData.get('password') as string
      action = formData.get('action') as string
    }

    if (action === 'logout') {
      await logout()
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
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
