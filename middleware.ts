import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Si l'utilisateur est connecté et essaie d'aller sur login ou signup → redirect dashboard
  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si pas de session et qu'on essaie d'aller sur une page protégée → redirect login
  if (!session && (pathname.startsWith('/dashboard') || pathname.startsWith('/projects'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/login', '/signup'],
};
