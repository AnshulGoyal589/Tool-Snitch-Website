import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isPublicAsset = pathname.startsWith('/') || pathname.startsWith('/_next/') || pathname === '/favicon.ico';
  
  const jwtToken = request.cookies.get('jwtToken')?.value;

  // Allow access to public assets without authentication
  if (isPublicAsset) {
    return NextResponse.next();
  }

  if (jwtToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (pathname !== '/' && !isAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
