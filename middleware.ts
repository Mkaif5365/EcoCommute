import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value;

  // Check if the path is a protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isAuthRoute = 
    request.nextUrl.pathname === '/login' || 
    request.nextUrl.pathname === '/signup';

  // If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If user is already logged in and tries to access login/signup page, redirect to dashboard
  if (isAuthRoute && token) {
    try {
      const decoded = verifyToken(token);
      if (decoded) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Token is invalid, let them access the auth pages
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}; 