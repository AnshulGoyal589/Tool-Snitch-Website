import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isNotAuthPage = pathname.startsWith('/shops') || pathname.startsWith('/query') || pathname.startsWith('/dashboard')  || pathname.startsWith('/myShop');
  const jwtToken = request.cookies.get('jwtToken')?.value;
  const isShopkeeper = request.cookies.get('isShopkeeper')?.value;
  const shopAuth = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/profile') || pathname.startsWith('/shops')|| pathname=='/';
  const custAuth = pathname.startsWith('/dashboard') || pathname.startsWith('/myShop') || pathname.startsWith('/login') || pathname.startsWith('/register');

  if (jwtToken) {
    if( isShopkeeper=='true' ){
      if( pathname=='/profile' ) return NextResponse.redirect(new URL('/myShop', request.url));
      else if (shopAuth) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    }else{
      if (custAuth) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }
  } else {
    if (isNotAuthPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};