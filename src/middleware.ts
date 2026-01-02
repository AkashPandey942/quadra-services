import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude the login page itself to avoid redirect loop
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin_token cookie
    const token = request.cookies.get('admin_token');

    if (!token) {
      // Redirect to login page if no token
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
