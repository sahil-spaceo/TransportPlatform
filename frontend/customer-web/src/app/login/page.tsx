'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { TextInput } from '@/components/atoms/Input/TextInput';
import { useAuth } from '@/contexts/AuthContext';

// Force client-side rendering
export const dynamic = 'force-dynamic';
// Styled Components
const LoginContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const LoginCard = styled(GradientCard)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.functional.error.light};
  color: ${({ theme }) => theme.colors.functional.error.main};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  text-align: center;
`;

const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.functional.success.light};
  color: ${({ theme }) => theme.colors.functional.success.main};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  text-align: center;
`;

const DemoCredentials = styled.div`
  background: ${({ theme }) => theme.colors.functional.info.light};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.functional.info.main};
  }

  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: underline;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.neutral[300]};
  }
  
  span {
    background: ${({ theme }) => theme.colors.neutral.white};
    padding: 0 ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  }
`;

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'demo@flexflow.com',
    password: 'password123',
    firstName: 'Demo',
    lastName: 'User',
    subscriptionTier: 'gold' as const,
    phone: '+1 (555) 123-4567',
    preferences: {
      notifications: true,
      language: 'en',
      currency: 'USD',
    },
  },
  {
    id: '2',
    email: 'basic@flexflow.com',
    password: 'password123',
    firstName: 'Basic',
    lastName: 'User',
    subscriptionTier: 'basic' as const,
    phone: '+1 (555) 234-5678',
    preferences: {
      notifications: true,
      language: 'en',
      currency: 'USD',
    },
  },
  {
    id: '3',
    email: 'silver@flexflow.com',
    password: 'password123',
    firstName: 'Silver',
    lastName: 'Member',
    subscriptionTier: 'silver' as const,
    phone: '+1 (555) 345-6789',
    preferences: {
      notifications: true,
      language: 'en',
      currency: 'USD',
    },
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check mock users
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Mock successful login
      await login(user);
      setSuccess('Login successful! Redirecting...');
      
      // Redirect after success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    
    // Auto-submit after setting values
    setTimeout(async () => {
      const user = mockUsers.find(u => u.email === demoEmail);
      if (user) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          await login(user);
          setSuccess('Demo login successful! Redirecting...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } catch (err: any) {
          setError(err.message || 'Demo login failed');
        } finally {
          setIsLoading(false);
        }
      }
    }, 100);
  };

  return (
    <Layout noFooter>
      <LoginContainer>
        <LoginCard variant="elevated" padding="large">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <GradientHeading level="h1" gradient="primary" align="center">
              Welcome Back
            </GradientHeading>
            <p style={{ 
              color: '#616161', 
              margin: '0.5rem 0 0', 
              fontSize: '1rem' 
            }}>
              Sign in to your FlexFlow account
            </p>
          </div>

          {/* Demo Credentials */}
          <DemoCredentials>
            <h4>🚀 Demo Accounts</h4>
            <p>Click any tier to instantly login:</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
              <GradientButton
                variant="ghost"
                size="small"
                onClick={() => handleDemoLogin('demo@flexflow.com')}
                disabled={isLoading}
              >
                Gold Demo
              </GradientButton>
              <GradientButton
                variant="ghost"
                size="small"
                onClick={() => handleDemoLogin('silver@flexflow.com')}
                disabled={isLoading}
              >
                Silver Demo
              </GradientButton>
              <GradientButton
                variant="ghost"
                size="small"
                onClick={() => handleDemoLogin('basic@flexflow.com')}
                disabled={isLoading}
              >
                Basic Demo
              </GradientButton>
            </div>
          </DemoCredentials>

          <Divider>
            <span>Or sign in with your account</span>
          </Divider>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <LoginForm onSubmit={handleSubmit}>
            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            <GradientButton
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading || !email || !password}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </GradientButton>
          </LoginForm>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <LinkButton onClick={() => router.push('/signup')}>
              Don't have an account? Sign up
            </LinkButton>
            <LinkButton onClick={() => router.push('/forgot-password')}>
              Forgot your password?
            </LinkButton>
          </div>

          <div style={{ 
            fontSize: '0.75rem', 
            color: '#9e9e9e', 
            textAlign: 'center', 
            marginTop: '1.5rem',
            lineHeight: '1.4'
          }}>
            <strong>Demo Mode:</strong> This is a development environment with mock authentication. 
            All demo accounts use password: <code>password123</code>
          </div>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
}