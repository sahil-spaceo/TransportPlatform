'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { GradientCard } from '@/components/atoms/Card/GradientCard';

// Styled Components
const ErrorContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.functional.error.main};
`;

const ErrorMessage = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ErrorDetails = styled.details`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  text-align: left;
`;

const ErrorSummary = styled.summary`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: background ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

const ErrorStack = styled.pre`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.functional.error.dark};
  background: ${({ theme }) => theme.colors.functional.error.light};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.functional.error.main};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

// Error Boundary Props and State
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Error Boundary Class Component
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    this.logErrorToService(error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to a logging service
    // like Sentry, LogRocket, or your own error tracking system
    console.error('Error Boundary caught an error:', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo: {
        componentStack: errorInfo.componentStack,
      },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });

    // Example: Send to monitoring service
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: {
    //       react: {
    //         componentStack: errorInfo.componentStack,
    //       },
    //     },
    //   });
    // }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportError = () => {
    const { error, errorInfo } = this.state;
    
    const errorReport = {
      error: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Create mailto link with error details
    const subject = encodeURIComponent('FlexFlow - Error Report');
    const body = encodeURIComponent(`
Error Report:
${JSON.stringify(errorReport, null, 2)}

Please describe what you were doing when this error occurred:
[User description here]
    `);

    window.open(`mailto:support@flexflow.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback component
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <ErrorContainer>
          <ErrorContent>
            <GradientCard variant="elevated">
              <ErrorIcon>💥</ErrorIcon>
              
              <GradientHeading 
                level="h1" 
                gradient="primary" 
                align="center"
                style={{ marginBottom: '1rem' }}
              >
                Oops! Something went wrong
              </GradientHeading>
              
              <ErrorMessage>
                We're sorry, but something unexpected happened. Our team has been notified 
                and is working to fix the issue. Please try refreshing the page or go back to the homepage.
              </ErrorMessage>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <ErrorDetails>
                  <ErrorSummary>🔍 Technical Details (Development Only)</ErrorSummary>
                  <ErrorStack>
                    <strong>Error:</strong> {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        <br />
                        <br />
                        <strong>Stack Trace:</strong>
                        <br />
                        {this.state.error.stack}
                      </>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <>
                        <br />
                        <br />
                        <strong>Component Stack:</strong>
                        <br />
                        {this.state.errorInfo.componentStack}
                      </>
                    )}
                  </ErrorStack>
                </ErrorDetails>
              )}

              <ButtonGroup>
                <GradientButton
                  variant="primary"
                  size="large"
                  onClick={this.handleReload}
                >
                  🔄 Refresh Page
                </GradientButton>
                
                <GradientButton
                  variant="outline"
                  size="large"
                  onClick={this.handleGoHome}
                >
                  🏠 Go Home
                </GradientButton>
                
                <GradientButton
                  variant="ghost"
                  size="large"
                  onClick={this.handleReportError}
                >
                  📧 Report Issue
                </GradientButton>
              </ButtonGroup>
            </GradientCard>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

// Hook for handling async errors in functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
    
    // Log to service
    console.error('Async error captured:', error);
    
    // In production, send to monitoring service
    // if (window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export default ErrorBoundary;