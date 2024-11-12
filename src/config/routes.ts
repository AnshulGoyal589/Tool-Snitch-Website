import { RouteConfig } from '../types/routes.types';
import { UserRole } from '../types/auth.types';

export const routeConfig: RouteConfig = {
  publicRoutes: ['/home','/login', '/register','/contact-us'],
  roleRoutes: {
    admin: {
      allowedRoutes: ['/admin'],
      redirectTo: '/login',
      defaultRoute: '/admin'
    },
    shopkeeper: {
      allowedRoutes: ['/dashboard', '/myShop', '/orders','/order-history','/inventory'],
      redirectTo: '/login',
      defaultRoute: '/dashboard'
    },
    customer: {
      allowedRoutes: ['/home','/shops', '/query', '/order-history', '/profile','track-order','/orders','/get-appointment'],
      redirectTo: '/login',
      defaultRoute: '/home'
    }
  }
};