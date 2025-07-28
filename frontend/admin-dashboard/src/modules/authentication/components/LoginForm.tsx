'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import GradientButton from '@/components/common/GradientButton';
import { LoginFormData } from '../types/auth.types';
import { useAuth } from '../hooks/useAuth';

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  backdrop-filter: blur(20px);
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.text.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormField = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.functional.error : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.animations.duration.normal} 
              ${({ theme }) => theme.animations.easing.easeInOut};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.functional.info};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.functional.infoGradient.replace('100%)', '20%)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Checkbox = styled.input`
  margin-right: ${({ theme }) => theme.spacing.sm};
  accent-color: ${({ theme }) => theme.colors.functional.info};
`;

const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.functional.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ForgotPasswordLink = styled.a`
  display: block;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.functional.info};
  text-decoration: none;
  margin-top: ${({ theme }) => theme.spacing.lg};
  transition: color ${({ theme }) => theme.animations.duration.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: underline;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface LoginFormProps {
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const { login, state } = useAuth();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Redirect to dashboard after successful authentication
  useEffect(() => {
    if (state.isAuthenticated && !state.isLoading) {
      router.push('/');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError('');
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      // Redirection will happen automatically via useEffect
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <FormContainer>
      <Title>Welcome Back</Title>
      <Subtitle>Sign in to your admin dashboard</Subtitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@flexflow.com"
            $hasError={!!errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            $hasError={!!errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormField>

        <CheckboxContainer>
          <Checkbox
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
          />
          <CheckboxLabel htmlFor="rememberMe">
            Remember me for 30 days
          </CheckboxLabel>
        </CheckboxContainer>

        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

        <GradientButton
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={isSubmitting || state.isLoading}
        >
          {(isSubmitting || state.isLoading) && <LoadingSpinner />}
          Sign In
        </GradientButton>

        <ForgotPasswordLink href="#" onClick={(e) => {
          e.preventDefault();
          onForgotPassword?.();
        }}>
          Forgot your password?
        </ForgotPasswordLink>
      </form>
    </FormContainer>
  );
};