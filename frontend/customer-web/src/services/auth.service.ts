import axios, { AxiosResponse } from 'axios';
import {
  User,
  AuthTokens,
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,
  AuthenticationError,
} from '@/types/auth.types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const AUTH_ENDPOINTS = {
  login: '/auth/login',
  signup: '/auth/signup',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  me: '/auth/me',
  changePassword: '/auth/change-password',
  requestPasswordReset: '/auth/request-password-reset',
  confirmPasswordReset: '/auth/confirm-password-reset',
  verifyEmail: '/auth/verify-email',
  resendVerification: '/auth/resend-verification',
} as const;

// Create axios instance
const authAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Token management
class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'flexflow_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'flexflow_refresh_token';
  private static readonly EXPIRES_AT_KEY = 'flexflow_expires_at';

  static setTokens(tokens: AuthTokens): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
      localStorage.setItem(this.EXPIRES_AT_KEY, tokens.expiresAt.toString());
    }
  }

  static getTokens(): AuthTokens | null {
    if (typeof window === 'undefined') return null;

    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);

    if (!accessToken || !refreshToken || !expiresAt) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresAt: parseInt(expiresAt, 10),
    };
  }

  static clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.EXPIRES_AT_KEY);
    }
  }

  static isTokenExpired(): boolean {
    const tokens = this.getTokens();
    if (!tokens) return true;

    return Date.now() >= tokens.expiresAt;
  }
}

// Request/Response interceptors
authAPI.interceptors.request.use(
  (config) => {
    const tokens = TokenManager.getTokens();
    if (tokens && !TokenManager.isTokenExpired()) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await AuthService.refreshTokens();
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return authAPI(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        TokenManager.clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication Service
export class AuthService {
  /**
   * Login user with credentials
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await authAPI.post(
        AUTH_ENDPOINTS.login,
        credentials
      );

      const { user, tokens } = response.data;
      TokenManager.setTokens(tokens);

      return { user, tokens };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign up new user
   */
  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await authAPI.post(
        AUTH_ENDPOINTS.signup,
        credentials
      );

      const { user, tokens } = response.data;
      TokenManager.setTokens(tokens);

      return { user, tokens };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await authAPI.post(AUTH_ENDPOINTS.logout);
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed, continuing with local logout:', error);
    } finally {
      TokenManager.clearTokens();
    }
  }

  /**
   * Refresh authentication tokens
   */
  static async refreshTokens(): Promise<AuthTokens> {
    const currentTokens = TokenManager.getTokens();
    if (!currentTokens) {
      throw new AuthenticationError('NO_REFRESH_TOKEN', 'No refresh token available');
    }

    try {
      const response: AxiosResponse<{ tokens: AuthTokens }> = await authAPI.post(
        AUTH_ENDPOINTS.refresh,
        { refreshToken: currentTokens.refreshToken }
      );

      const { tokens } = response.data;
      TokenManager.setTokens(tokens);

      return tokens;
    } catch (error: any) {
      TokenManager.clearTokens();
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response: AxiosResponse<{ user: User }> = await authAPI.get(AUTH_ENDPOINTS.me);
      return response.data.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(updates: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<{ user: User }> = await authAPI.patch(
        AUTH_ENDPOINTS.me,
        updates
      );
      return response.data.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Change user password
   */
  static async changePassword(request: ChangePasswordRequest): Promise<void> {
    try {
      await authAPI.post(AUTH_ENDPOINTS.changePassword, request);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(request: PasswordResetRequest): Promise<void> {
    try {
      await authAPI.post(AUTH_ENDPOINTS.requestPasswordReset, request);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Confirm password reset
   */
  static async confirmPasswordReset(request: PasswordResetConfirm): Promise<void> {
    try {
      await authAPI.post(AUTH_ENDPOINTS.confirmPasswordReset, request);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Verify email address
   */
  static async verifyEmail(token: string): Promise<void> {
    try {
      await authAPI.post(AUTH_ENDPOINTS.verifyEmail, { token });
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Resend email verification
   */
  static async resendEmailVerification(): Promise<void> {
    try {
      await authAPI.post(AUTH_ENDPOINTS.resendVerification);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const tokens = TokenManager.getTokens();
    return tokens !== null && !TokenManager.isTokenExpired();
  }

  /**
   * Get stored tokens
   */
  static getStoredTokens(): AuthTokens | null {
    return TokenManager.getTokens();
  }

  /**
   * Handle API errors and convert to AuthenticationError
   */
  private static handleAuthError(error: any): AuthenticationError {
    if (error.response?.data) {
      const { code, message, field } = error.response.data;
      return new AuthenticationError(code || 'UNKNOWN_ERROR', message || 'An error occurred', field);
    }

    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
      return new AuthenticationError('NETWORK_ERROR', 'Unable to connect to server');
    }

    if (error.code === 'TIMEOUT') {
      return new AuthenticationError('TIMEOUT', 'Request timed out');
    }

    return new AuthenticationError('UNKNOWN_ERROR', error.message || 'An unexpected error occurred');
  }
}

export default AuthService;