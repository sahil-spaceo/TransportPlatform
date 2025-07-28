import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType } from '../types/auth.types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Custom hook for permission checking
export const usePermissions = () => {
  const { state, hasPermission, hasRole } = useAuth();
  
  return {
    permissions: state.permissions,
    hasPermission,
    hasRole,
    isAdmin: hasRole('admin'),
    isSuperAdmin: hasRole('super_admin'),
    isManager: hasRole('manager'),
  };
};

// Custom hook for protected routes
export const useAuthGuard = (requiredPermissions?: string[], requiredRole?: string) => {
  const { state, hasPermission, hasRole } = useAuth();
  
  const hasRequiredPermissions = requiredPermissions 
    ? requiredPermissions.every(permission => hasPermission(permission))
    : true;
    
  const hasRequiredRole = requiredRole 
    ? hasRole(requiredRole) 
    : true;
  
  return {
    isAuthenticated: state.isAuthenticated,
    hasAccess: hasRequiredPermissions && hasRequiredRole,
    user: state.user,
    isLoading: state.isLoading,
  };
};