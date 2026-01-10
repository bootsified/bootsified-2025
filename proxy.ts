import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login and /api/admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check if the session cookie exists
    const sessionCookie = request.cookies.get('bootsified_admin_session')
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Let the route handler verify the actual session validity
    // If the session is invalid, the route handler will redirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
