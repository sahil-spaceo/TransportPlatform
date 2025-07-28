'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { LoginForm } from '@/modules/authentication/components/LoginForm';
import { ForgotPasswordForm } from '@/modules/authentication/components/ForgotPasswordForm';
import { useAuth } from '@/modules/authentication/hooks/useAuth';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gradients.background};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(29, 78, 216, 0.05) 0%, transparent 50%);
  pointer-events: none;
`;

const LoginContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BrandHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  background: ${({ theme }) => theme.colors.text.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Footer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DemoCredentials = styled.div`
  background: ${({ theme }) => theme.colors.functional.infoGradient};
  border: 1px solid ${({ theme }) => theme.colors.functional.info}20;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DemoTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.functional.info};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DemoText = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

type ViewMode = 'login' | 'forgot-password';

export default function LoginPage() {
  const [currentView, setCurrentView] = useState<ViewMode>('login');
  const { state } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (state.isAuthenticated && !state.isLoading) {
      router.push('/');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'forgot-password':
        return (
          <ForgotPasswordForm 
            onBackToLogin={() => setCurrentView('login')}
          />
        );
      default:
        return (
          <LoginForm 
            onForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
    }
  };

  return (
    <LoginContainer>
      <BackgroundDecoration />
      <LoginContent>
        <BrandHeader>
          <Logo>FlexFlow</Logo>
          <Tagline>Admin Dashboard</Tagline>
        </BrandHeader>

        {currentView === 'login' && (
          <DemoCredentials>
            <DemoTitle>Demo Credentials</DemoTitle>
            <DemoText>
              <strong>Email:</strong> admin@flexflow.com<br />
              <strong>Password:</strong> admin123
            </DemoText>
          </DemoCredentials>
        )}

        {renderCurrentView()}

        <Footer>
          <FooterText>
            FlexFlow Transport Platform - Admin Panel
          </FooterText>
          <FooterText>
            © 2024 FlexFlow. All rights reserved.
          </FooterText>
        </Footer>
      </LoginContent>
    </LoginContainer>
  );
}