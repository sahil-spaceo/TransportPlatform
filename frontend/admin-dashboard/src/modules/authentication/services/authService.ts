import axios from 'axios';
import { LoginCredentials, LoginResponse, PasswordResetRequest, PasswordReset, TwoFactorAuth } from '../types/auth.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class AuthService {
  private apiClient = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Request interceptor to add auth token
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('adminAccessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem('adminRefreshToken');
          if (refreshToken) {
            try {
              const response = await this.refreshToken(refreshToken);
              localStorage.setItem('adminAccessToken', response.accessToken);
              
              // Retry original request
              error.config.headers.Authorization = `Bearer ${response.accessToken}`;
              return this.apiClient.request(error.config);
            } catch (refreshError) {
              this.logout();
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }


  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    }
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    // Use mock refresh for local development
    const isLocalDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       window.location.hostname.includes('local'));
    
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         process.env.NODE_ENV === 'test' ||
                         !process.env.NODE_ENV || 
                         isLocalDevelopment;
    
    if (isDevelopment) {
      return this.mockRefreshToken(refreshToken);
    }
    
    try {
      const response = await this.apiClient.post('/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Token refresh failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async verifyToken(token: string): Promise<LoginResponse> {
    // Use mock verification for local development
    const isLocalDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       window.location.hostname.includes('local'));
    
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         process.env.NODE_ENV === 'test' ||
                         !process.env.NODE_ENV || 
                         isLocalDevelopment;
    
    if (isDevelopment) {
      return this.mockVerifyToken(token);
    }
    
    try {
      const response = await this.apiClient.post('/verify', { token });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Token verification failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async forgotPassword(data: PasswordResetRequest): Promise<{ message: string }> {
    try {
      const response = await this.apiClient.post('/forgot-password', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Password reset request failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async resetPassword(data: PasswordReset): Promise<{ message: string }> {
    try {
      const response = await this.apiClient.post('/reset-password', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Password reset failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async enable2FA(): Promise<TwoFactorAuth> {
    try {
      const response = await this.apiClient.post('/2fa/enable');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '2FA setup failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async verify2FA(code: string): Promise<{ verified: boolean }> {
    try {
      const response = await this.apiClient.post('/2fa/verify', { code });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '2FA verification failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async disable2FA(code: string): Promise<{ message: string }> {
    try {
      const response = await this.apiClient.post('/2fa/disable', { code });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '2FA disable failed');
      }
      throw new Error('Network error occurred');
    }
  }

  async getSessions(): Promise<any[]> {
    try {
      const response = await this.apiClient.get('/sessions');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch sessions');
      }
      throw new Error('Network error occurred');
    }
  }

  async revokeSession(sessionId: string): Promise<{ message: string }> {
    try {
      const response = await this.apiClient.delete(`/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to revoke session');
      }
      throw new Error('Network error occurred');
    }
  }

  // Mock data for development (remove in production)
  async mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (credentials.email === 'admin@flexflow.com' && credentials.password === 'admin123') {
      return {
        user: {
          id: '1',
          email: 'admin@flexflow.com',
          firstName: 'Admin',
          lastName: 'User',
          role: {
            id: '1',
            name: 'super_admin',
            description: 'Super Administrator',
            level: 1,
            permissions: ['*'],
          },
          permissions: [{
            id: '1',
            resource: '*',
            actions: ['*'],
            scope: 'global',
          }],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        permissions: [{
          id: '1',
          resource: '*',
          actions: ['*'],
          scope: 'global',
        }],
      };
    }
    
    throw new Error('Invalid credentials');
  }

  async mockVerifyToken(token: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // If token is valid (mock-access-token), return user data
    if (token === 'mock-access-token') {
      return {
        user: {
          id: '1',
          email: 'admin@flexflow.com',
          firstName: 'Admin',
          lastName: 'User',
          role: {
            id: '1',
            name: 'super_admin',
            description: 'Super Administrator',
            level: 1,
            permissions: ['*'],
          },
          permissions: [{
            id: '1',
            resource: '*',
            actions: ['*'],
            scope: 'global',
          }],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        permissions: [{
          id: '1',
          resource: '*',
          actions: ['*'],
          scope: 'global',
        }],
      };
    }
    
    throw new Error('Invalid token');
  }

  async mockRefreshToken(refreshToken: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // If refresh token is valid, return new tokens
    if (refreshToken === 'mock-refresh-token') {
      return {
        user: {
          id: '1',
          email: 'admin@flexflow.com',
          firstName: 'Admin',
          lastName: 'User',
          role: {
            id: '1',
            name: 'super_admin',
            description: 'Super Administrator',
            level: 1,
            permissions: ['*'],
          },
          permissions: [{
            id: '1',
            resource: '*',
            actions: ['*'],
            scope: 'global',
          }],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
        permissions: [{
          id: '1',
          resource: '*',
          actions: ['*'],
          scope: 'global',
        }],
      };
    }
    
    throw new Error('Invalid refresh token');
  }

  // Override login method to use mock in development
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Use mock login for local development (localhost, 127.0.0.1, or development NODE_ENV)
    const isLocalDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       window.location.hostname.includes('local'));
    
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         process.env.NODE_ENV === 'test' ||
                         !process.env.NODE_ENV || 
                         isLocalDevelopment;
    
    if (isDevelopment) {
      return this.mockLogin(credentials);
    }
    
    // Production API call
    try {
      const response = await this.apiClient.post('/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw new Error('Network error occurred');
    }
  }
}

export const authService = new AuthService();