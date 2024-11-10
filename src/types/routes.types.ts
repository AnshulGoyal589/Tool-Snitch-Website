import { UserRole } from './auth.types';

export interface RouteConfig {
  publicRoutes: string[];
  roleRoutes: {
    [key in UserRole]: {
      allowedRoutes: string[];
      redirectTo: string;
      defaultRoute: string;
    };
  };
}