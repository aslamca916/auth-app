// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Replace with your actual auth cookie/token check logic
  const token = request.cookies.get('auth-token')?.value

  // If no token exists, redirect the user to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Specify exactly which routes should be gated
export const config = {
  matcher: ['/products/:path*', '/profile/:path*'],
}
