import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] Path: ${pathname}, authenticated: ${Boolean(token)}`);
  }

  // Protected routes
  const protectedRoutes = ['/dashboard', '/ai-tools', '/analytics'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth routes (should not be accessible if already logged in)
  if ((pathname === '/login' || pathname === '/register') && token) {
    // Redirect authenticated users to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
