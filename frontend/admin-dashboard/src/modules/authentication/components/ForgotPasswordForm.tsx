'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import GradientButton from '@/components/common/GradientButton';
import { ForgotPasswordFormData } from '../types/auth.types';
import { authService } from '../services/authService';

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
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
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

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.functional.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.functional.success};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.functional.successGradient};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.functional.success}20;
`;

const BackLink = styled.a`
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

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const [submitError, setSubmitError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setSubmitError('');
      await authService.forgotPassword(data);
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send reset email');
    }
  };

  if (isSuccess) {
    return (
      <FormContainer>
        <Title>Check Your Email</Title>
        <SuccessMessage>
          We've sent password reset instructions to your email address. 
          Please check your inbox and follow the link to reset your password.
        </SuccessMessage>
        <BackLink href="#" onClick={(e) => {
          e.preventDefault();
          onBackToLogin?.();
        }}>
          Back to Sign In
        </BackLink>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Title>Forgot Password</Title>
      <Subtitle>
        Enter your email address and we'll send you instructions to reset your password.
      </Subtitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
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

        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

        <GradientButton
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting && <LoadingSpinner />}
          Send Reset Instructions
        </GradientButton>

        <BackLink href="#" onClick={(e) => {
          e.preventDefault();
          onBackToLogin?.();
        }}>
          Back to Sign In
        </BackLink>
      </form>
    </FormContainer>
  );
};