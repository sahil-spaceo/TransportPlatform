'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { SkipLinks } from '@/components/atoms/Accessibility/SkipLink';
import { AuthWrapper } from '@/components/layout/AuthWrapper';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { I18nProvider } from '@/components/providers/I18nProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Skip links configuration
const skipLinks = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' },
];

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <AuthWrapper>
              <GlobalStyles />
              
              {/* Skip Links for Accessibility */}
              <SkipLinks links={skipLinks} />
              
              {/* Main Application */}
              <div id="app-root">
                {children}
              </div>
              
              {/* Accessibility announcements container */}
              <div 
                id="accessibility-announcements" 
                aria-live="polite" 
                aria-atomic="true"
                style={{
                  position: 'absolute',
                  left: '-10000px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden'
                }}
              />
            </AuthWrapper>
          </ErrorBoundary>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}