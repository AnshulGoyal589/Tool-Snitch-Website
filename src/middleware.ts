import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isPublicAsset = pathname.startsWith('/_next/') || pathname === '/favicon.ico' || pathname ===  '/toolsnitchlogo.png'  || pathname ===  '/_next/image?url=%2Fgroup.png&w=3840&q=75'  || pathname ===  '/_next/image?url=%2FiPhone.png&w=3840&q=75'  || pathname ===  '/_next/image?url=%2Ft.jpg&w=3840&q=75'   || pathname ===  'next/image?url=%2Fcarousel1.jpg&w=3840&q=75'  || pathname ===  '/_next/image?url=%2Fcarousel2.jpg&w=3840&q=75';
  
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

