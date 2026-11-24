export interface AuthenticatedUser {
  id: string;
  sub?: string;
  email: string;
  iat?: number;
  exp?: number;
}
