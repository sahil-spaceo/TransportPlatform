'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ProtectedRouteProps } from '../types/auth.types';
import { useAuthGuard } from '../hooks/useAuth';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.background};
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.border.light};
  border-top: 4px solid ${({ theme }) => theme.colors.functional.info};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.background};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const UnauthorizedTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UnauthorizedMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const UnauthorizedIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.6;
`;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions,
  requiredRole,
  fallback,
}) => {
  const router = useRouter();
  const { isAuthenticated, hasAccess, isLoading } = useAuthGuard(
    requiredPermissions,
    requiredRole
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Verifying access...</LoadingText>
      </LoadingContainer>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Redirecting to login...</LoadingText>
      </LoadingContainer>
    );
  }

  // Show unauthorized message if user lacks required permissions
  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <UnauthorizedContainer>
        <UnauthorizedIcon>🔒</UnauthorizedIcon>
        <UnauthorizedTitle>Access Denied</UnauthorizedTitle>
        <UnauthorizedMessage>
          You don't have the necessary permissions to access this page. 
          Please contact your administrator if you believe this is an error.
        </UnauthorizedMessage>
      </UnauthorizedContainer>
    );
  }

  // Render protected content
  return <>{children}</>;
};

// Higher-order component wrapper for easier usage
export const withProtection = (
  Component: React.ComponentType,
  requiredPermissions?: string[],
  requiredRole?: string
) => {
  const ProtectedComponent = (props: any) => (
    <ProtectedRoute
      requiredPermissions={requiredPermissions}
      requiredRole={requiredRole}
    >
      <Component {...props} />
    </ProtectedRoute>
  );

  ProtectedComponent.displayName = `withProtection(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};