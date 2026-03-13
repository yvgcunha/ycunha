import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = 'hub_session'
const PUBLIC_ROUTES = ['/', '/api/auth']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)

  if (!sessionId?.value) {
    // Redirect to login
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
