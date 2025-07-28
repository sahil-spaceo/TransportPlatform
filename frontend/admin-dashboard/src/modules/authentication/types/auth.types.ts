// Authentication Types for Admin Panel
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  permissions: AdminPermission[];
  avatar?: string;
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  level: number; // 1=Super Admin, 2=Admin, 3=Manager, 4=Support
  permissions: string[];
}

export interface AdminPermission {
  id: string;
  resource: string;
  actions: string[];
  scope: 'global' | 'regional' | 'local';
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: AdminUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  permissions: AdminPermission[];
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  permissions: AdminPermission[];
}

export interface TwoFactorAuth {
  isEnabled: boolean;
  backupCodes?: string[];
  qrCode?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SessionInfo {
  id: string;
  userId: string;
  device: string;
  browser: string;
  location: string;
  lastActivity: Date;
  isActive: boolean;
}

// Form validation types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface TwoFactorFormData {
  code: string;
}

// Auth context types
export interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (updates: Partial<AdminUser>) => void;
  hasPermission: (permission: string, resource?: string) => boolean;
  hasRole: (role: string) => boolean;
}

// Route protection types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRole?: string;
  fallback?: React.ReactNode;
}