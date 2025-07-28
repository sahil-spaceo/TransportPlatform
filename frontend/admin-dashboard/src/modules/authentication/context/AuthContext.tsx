'use client';

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials, AdminUser, AdminPermission } from '../types/auth.types';
import { authService } from '../services/authService';

// Auth reducer
type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AdminUser; permissions: AdminPermission[] } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<AdminUser> }
  | { type: 'REFRESH_TOKEN_SUCCESS'; payload: { user: AdminUser; permissions: AdminPermission[] } }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  permissions: [],
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        permissions: action.payload.permissions,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        permissions: [],
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        permissions: action.payload.permissions,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('adminAccessToken');
        
        if (token) {
          const response = await authService.verifyToken(token);
          dispatch({
            type: 'REFRESH_TOKEN_SUCCESS',
            payload: {
              user: response.user,
              permissions: response.permissions,
            },
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authService.login(credentials);
      
      // Store tokens
      localStorage.setItem('adminAccessToken', response.accessToken);
      localStorage.setItem('adminRefreshToken', response.refreshToken);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          permissions: response.permissions,
        },
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('adminRefreshToken');
      if (!refreshToken) throw new Error('No refresh token');
      
      const response = await authService.refreshToken(refreshToken);
      
      localStorage.setItem('adminAccessToken', response.accessToken);
      localStorage.setItem('adminRefreshToken', response.refreshToken);
      
      dispatch({
        type: 'REFRESH_TOKEN_SUCCESS',
        payload: {
          user: response.user,
          permissions: response.permissions,
        },
      });
    } catch (error) {
      logout();
      throw error;
    }
  };

  const updateUser = (updates: Partial<AdminUser>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const hasPermission = (permission: string, resource?: string): boolean => {
    if (!state.user || !state.permissions) return false;
    
    return state.permissions.some(p => {
      // Check for wildcard permissions (super admin)
      if (p.actions.includes('*') || p.resource === '*') return true;
      
      // Check for specific permission
      const hasAction = p.actions.includes(permission);
      const hasResource = !resource || p.resource === resource;
      
      return hasAction && hasResource;
    });
  };

  const hasRole = (role: string): boolean => {
    if (!state.user) return false;
    return state.user.role.name === role;
  };

  const contextValue: AuthContextType = {
    state,
    login,
    logout,
    refreshToken,
    updateUser,
    hasPermission,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};