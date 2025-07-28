'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

// Styled Components
const LoadingContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.gradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const LoadingCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  border: 1px solid rgba(255, 154, 158, 0.2);
  padding: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.neutral[200]};
  border-top: 4px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const LoadingText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSubtext = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  opacity: 0.7;
`;

const UnauthorizedContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.gradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const UnauthorizedCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  border: 1px solid rgba(255, 154, 158, 0.2);
  padding: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const UnauthorizedIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.functional.warning.main};
`;

const UnauthorizedMessage = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

// Protected Route Props
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
  subscriptionTiers?: ('basic' | 'silver' | 'gold')[];
  permissions?: string[];
}

// Authentication Guard Component
const AuthGuard: React.FC<ProtectedRouteProps> = ({
  children,
  requiredAuth = true,
  redirectTo,
  fallback,
  subscriptionTiers,
  permissions,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Don't redirect during initial load
    if (isLoading) {
      return;
    }

    // If authentication is required but user is not authenticated
    if (requiredAuth && !isAuthenticated) {
      const loginUrl = redirectTo || `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      setShouldRedirect(true);
      router.push(loginUrl);
      return;
    }

    // If user is authenticated, check subscription tier requirements
    if (isAuthenticated && user && subscriptionTiers && subscriptionTiers.length > 0) {
      if (!subscriptionTiers.includes(user.subscriptionTier)) {
        // Redirect to upgrade page or show unauthorized
        router.push(`/subscription/upgrade?required=${subscriptionTiers.join(',')}&redirect=${encodeURIComponent(pathname)}`);
        return;
      }
    }

    // If user is authenticated, check permission requirements
    if (isAuthenticated && permissions && permissions.length > 0) {
      // TODO: Implement permission checking logic
      // This would depend on how permissions are structured in the user object
      console.warn('Permission checking not yet implemented:', permissions);
    }

    setShouldRedirect(false);
  }, [isAuthenticated, isLoading, user, pathname, requiredAuth, redirectTo, subscriptionTiers, permissions, router]);

  // Show loading state
  if (isLoading) {
    return fallback || <LoadingScreen />;
  }

  // Show unauthorized state if user doesn't meet requirements
  if (requiredAuth && !isAuthenticated) {
    if (shouldRedirect) {
      return <LoadingScreen message="Redirecting to login..." />;
    }
    return <UnauthorizedScreen />;
  }

  // Check subscription tier requirements
  if (isAuthenticated && user && subscriptionTiers && subscriptionTiers.length > 0) {
    if (!subscriptionTiers.includes(user.subscriptionTier)) {
      return (
        <UnauthorizedScreen
          title="Subscription Required"
          message={`This feature requires a ${subscriptionTiers.join(' or ')} subscription. Please upgrade your account to continue.`}
          icon="💎"
        />
      );
    }
  }

  // Render protected content
  return <>{children}</>;
};

// Loading Screen Component
const LoadingScreen: React.FC<{ message?: string; subtext?: string }> = ({
  message = "Loading your account...",
  subtext = "Please wait while we verify your authentication"
}) => (
  <LoadingContainer>
    <LoadingCard>
      <div style={{ marginBottom: '2rem' }}>
        <GradientHeading
          level="h2"
          gradient="primary"
          align="center"
        >
          FlexFlow
        </GradientHeading>
      </div>
      
      <LoadingSpinner />
      
      <LoadingText>{message}</LoadingText>
      {subtext && <LoadingSubtext>{subtext}</LoadingSubtext>}
    </LoadingCard>
  </LoadingContainer>
);

// Unauthorized Screen Component
const UnauthorizedScreen: React.FC<{
  title?: string;
  message?: string;
  icon?: string;
}> = ({
  title = "Authentication Required",
  message = "You need to sign in to access this page. Please log in to continue.",
  icon = "🔒"
}) => (
  <UnauthorizedContainer>
    <UnauthorizedCard>
      <UnauthorizedIcon>{icon}</UnauthorizedIcon>
      
      <div style={{ marginBottom: '1rem' }}>
        <GradientHeading
          level="h2"
          gradient="primary"
          align="center"
        >
          {title}
        </GradientHeading>
      </div>
      
      <UnauthorizedMessage>
        {message}
      </UnauthorizedMessage>
    </UnauthorizedCard>
  </UnauthorizedContainer>
);

// Higher-Order Component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  const AuthenticatedComponent = (props: P) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  return AuthenticatedComponent;
}

// Hook for checking authentication status in components
export function useAuthGuard(options: {
  requiredAuth?: boolean;
  subscriptionTiers?: ('basic' | 'silver' | 'gold')[];
  permissions?: string[];
} = {}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const {
    requiredAuth = true,
    subscriptionTiers = [],
    permissions = []
  } = options;

  const isAuthorized = React.useMemo(() => {
    if (isLoading) return null; // Still loading

    if (requiredAuth && !isAuthenticated) return false;

    if (isAuthenticated && user) {
      // Check subscription tier
      if (subscriptionTiers.length > 0 && !subscriptionTiers.includes(user.subscriptionTier)) {
        return false;
      }

      // Check permissions (placeholder for future implementation)
      if (permissions.length > 0) {
        // TODO: Implement permission checking
        console.warn('Permission checking not yet implemented:', permissions);
      }
    }

    return true;
  }, [isAuthenticated, isLoading, user, requiredAuth, subscriptionTiers, permissions]);

  return {
    isAuthorized,
    isLoading,
    user,
    isAuthenticated,
  };
}

// Main ProtectedRoute Component
export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => (
  <AuthGuard {...props} />
);

export default ProtectedRoute;