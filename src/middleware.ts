import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { routeConfig } from './config/routes';
import { UserRole } from './types/auth.types';

class AuthMiddleware {
  private request: NextRequest;
  private pathname: string;
  private jwtToken: string | undefined;
  private userRole: UserRole | null;
  private isHydrating: boolean;

  constructor(request: NextRequest) {
    this.request = request;
    this.pathname = request.nextUrl.pathname;
    this.jwtToken = request.cookies.get('jwtToken')?.value;
    this.userRole = this.getUserRole();
    // Provide a default value when the header might be undefined
    this.isHydrating = request.headers.get('accept')?.includes('text/html') ?? false;
}

  private getUserRole(): UserRole | null {
    const isShopkeeper = this.request.cookies.get('isShopkeeper')?.value === 'true';
    const isAdmin = this.request.cookies.get('isAdmin')?.value === 'true';

    if (isAdmin) return 'admin';
    if (isShopkeeper) return 'shopkeeper';
    return this.jwtToken ? 'customer' : null;
  }

  private isPublicRoute(): boolean {
    const publicRoutes = [
      '/login',
      '/register',
      '/home',
      ...routeConfig.publicRoutes
    ];
    
    return publicRoutes.some(route => 
      this.pathname.startsWith(route)
    );
  }

  private isRouteAllowedForRole(role: UserRole): boolean {
    if (!routeConfig.roleRoutes[role]) {
      return false;
    }

    // Always allow access to public routes
    if (this.isPublicRoute()) {
      return true;
    }

    return routeConfig.roleRoutes[role].allowedRoutes.some(route =>
      this.pathname.startsWith(route)
    );
  }

  private handleUnauthenticated(): NextResponse {
    // Don't redirect during hydration
    if (this.isHydrating && this.pathname === '/login') {
      return NextResponse.next();
    }

    if (this.isPublicRoute()) {
      return NextResponse.next();
    }

    if (this.pathname === '/') {
      return NextResponse.redirect(new URL('/home', this.request.url));
    }

    // Add rewrite instead of redirect for auth pages
    if (this.pathname.startsWith('/login') || this.pathname.startsWith('/register')) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', this.request.url));
  }

  private handleAuthenticated(): NextResponse {
    if (!this.userRole) {
      return this.handleUnauthenticated();
    }

    const roleConfig = routeConfig.roleRoutes[this.userRole];

    // Don't redirect during hydration
    if (this.isHydrating && this.isRouteAllowedForRole(this.userRole)) {
      return NextResponse.next();
    }

    // Handle root path redirect
    if (this.pathname === '/') {
      return NextResponse.redirect(new URL(roleConfig.defaultRoute, this.request.url));
    }

    // Allow access if route is permitted for role
    if (this.isRouteAllowedForRole(this.userRole)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(roleConfig.defaultRoute, this.request.url));
  }

  public handle(): NextResponse {
    // Skip middleware for static files and API routes
    if (
      this.pathname.includes('/_next') ||
      this.pathname.includes('/api') ||
      this.pathname.includes('.ico') ||
      this.pathname.includes('.png') ||
      this.pathname.includes('.jpg')
    ) {
      return NextResponse.next();
    }

    return this.jwtToken ? this.handleAuthenticated() : this.handleUnauthenticated();
  }
}

export function middleware(request: NextRequest) {
  const authMiddleware = new AuthMiddleware(request);
  return authMiddleware.handle();
}

// Update matcher to be more specific
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};