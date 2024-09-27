import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isPublicAsset = pathname.startsWith('/_next/') || pathname === '/favicon.ico' || pathname ===  '/toolsnitchlogo.png'  || pathname ===  '/carousel1.jpg'  || pathname ===  '/carousel2.jpg'  || pathname ===  '/t.jpg' ;
  
  const jwtToken = request.cookies.get('jwtToken')?.value;

  
  if (isPublicAsset) {
    return NextResponse.next();
  }
  console.log(pathname);

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
  matcher: ['/((?!api|favicon.ico).*)'],
};

