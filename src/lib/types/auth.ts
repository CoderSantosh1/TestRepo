export interface AdminJWTPayload {
  adminId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export type AdminRole = 'super_admin' | 'admin';

export interface AdminAuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  error?: string;
}