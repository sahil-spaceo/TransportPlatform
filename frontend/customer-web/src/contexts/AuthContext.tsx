'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  User,
  AuthTokens,
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
  ChangePasswordRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  AuthenticationError,
} from '@/types/auth.types';
import { AuthService } from '@/services/auth.service';

// Auth State
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize authentication state
  const initializeAuth = async () => {
    try {
      // Check for stored user in localStorage (mock authentication)
      const storedUser = localStorage.getItem('flexflow_user');
      
      if (!storedUser) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // Parse stored user data
      const user = JSON.parse(storedUser);
      const mockTokens = {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, tokens: mockTokens } });
    } catch (error) {
      console.warn('Failed to initialize auth:', error);
      dispatch({ type: 'AUTH_LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Login function (mock implementation)
  const login = async (userData: any): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Store user data in localStorage for persistence
      localStorage.setItem('flexflow_user', JSON.stringify(userData));
      
      const mockTokens = {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: userData, tokens: mockTokens } });
    } catch (error) {
      const message = 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  // Signup function (mock implementation)
  const signup = async (userData: any): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Store user data in localStorage for persistence
      localStorage.setItem('flexflow_user', JSON.stringify(userData));
      
      const mockTokens = {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: userData, tokens: mockTokens } });
    } catch (error) {
      const message = 'Signup failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  // Logout function (mock implementation)
  const logout = async (): Promise<void> => {
    try {
      // Clear stored user data
      localStorage.removeItem('flexflow_user');
    } catch (error) {
      console.warn('Logout failed:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Refresh tokens function
  const refreshTokens = async (): Promise<void> => {
    try {
      const tokens = await AuthService.refreshTokens();
      if (state.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: state.user, tokens } });
      }
    } catch (error) {
      console.warn('Token refresh failed:', error);
      dispatch({ type: 'AUTH_LOGOUT' });
      throw error;
    }
  };

  // Update user function
  const updateUser = async (updates: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await AuthService.updateUser(updates);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      const message = error instanceof AuthenticationError ? error.message : 'Update failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  // Change password function
  const changePassword = async (request: ChangePasswordRequest): Promise<void> => {
    try {
      await AuthService.changePassword(request);
    } catch (error) {
      const message = error instanceof AuthenticationError ? error.message : 'Password change failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  // Request password reset function
  const requestPasswordReset = async (request: PasswordResetRequest): Promise<void> => {
    try {
      await AuthService.requestPasswordReset(request);
    } catch (error) {
      const message = error instanceof AuthenticationError ? error.message : 'Password reset request failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  // Confirm password reset function
  const confirmPasswordReset = async (request: PasswordResetConfirm): Promise<void> => {
    try {
      await AuthService.confirmPasswordReset(request);
    } catch (error) {
      const message = error instanceof AuthenticationError ? error.message : 'Password reset failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user: state.user,
    tokens: state.tokens,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    signup,
    logout,
    refreshTokens,
    updateUser,
    changePassword,
    requestPasswordReset,
    confirmPasswordReset,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// useAuthError hook for error handling
export function useAuthError() {
  const { login, signup, updateUser, changePassword, requestPasswordReset, confirmPasswordReset } = useAuth();
  
  const handleAuthError = (error: unknown): string => {
    if (error instanceof AuthenticationError) {
      return error.message;
    }
    
    if (error instanceof Error) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  };

  return {
    handleAuthError,
    login,
    signup,
    updateUser,
    changePassword,
    requestPasswordReset,
    confirmPasswordReset,
  };
}

export default AuthContext;