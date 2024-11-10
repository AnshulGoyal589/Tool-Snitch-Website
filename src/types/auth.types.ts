export type UserRole = 'admin' | 'shopkeeper' | 'customer';

export interface UserSession {
  jwtToken?: string;
  role: UserRole;
  isAuthenticated: boolean;
}
