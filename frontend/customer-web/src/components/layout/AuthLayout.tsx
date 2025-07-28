'use client';

import React from 'react';
import styled from 'styled-components';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';

// Styled Components
const AuthLayout = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  border: 1px solid rgba(255, 154, 158, 0.2);
  overflow: hidden;
`;

const AuthHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background: ${({ theme }) => theme.colors.primary.gradient};
  background-clip: padding-box;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
`;

const AuthHeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const AuthBrand = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AuthSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const AuthContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const BackToHome = styled.a`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  backdrop-filter: blur(10px);
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }

  &::before {
    content: '←';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: static;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    align-self: flex-start;
  }
`;

const AuthLayoutContainer = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// Layout component props
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

// Main Auth Layout Component
export default function AuthLayoutComponent({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <AuthLayout>
      <AuthLayoutContainer>
        <BackToHome href="/">
          Back to Home
        </BackToHome>
        
        <AuthContainer>
          <AuthHeader>
            <AuthHeaderContent>
              <AuthBrand>
                <GradientHeading 
                  level="h1" 
                  gradient="primary"
                  align="center"
                  style={{ color: 'white', fontSize: '2rem' }}
                >
                  FlexFlow
                </GradientHeading>
              </AuthBrand>
              
              <GradientHeading 
                level="h2" 
                align="center"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.95)', 
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem' 
                }}
              >
                {title}
              </GradientHeading>
              
              {subtitle && (
                <AuthSubtitle>
                  {subtitle}
                </AuthSubtitle>
              )}
            </AuthHeaderContent>
          </AuthHeader>
          
          <AuthContent>
            {children}
          </AuthContent>
        </AuthContainer>
      </AuthLayoutContainer>
    </AuthLayout>
  );
}