import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isNotAuthPage = pathname.startsWith('/shops') || pathname.startsWith('/query') || pathname.startsWith('/query/problem') || pathname.startsWith('/query/location');
  
  const jwtToken = request.cookies.get('jwtToken')?.value;

  if (jwtToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (isNotAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};

