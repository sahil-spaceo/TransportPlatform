'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FormField } from '@/components/atoms/Form/FormField';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useFormValidation, COMMON_RULES } from '@/utils/validation';
import AuthLayoutComponent from '@/components/layout/AuthLayout';

// Force client-side rendering
export const dynamic = 'force-dynamic';
// Styled Components
const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const BackToLoginLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const InfoMessage = styled.div`
  background: ${({ theme }) => theme.colors.functional.info.light};
  border: 1px solid ${({ theme }) => theme.colors.functional.info.main};
  color: ${({ theme }) => theme.colors.functional.info.dark};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.colors.functional.success.light};
  border: 1px solid ${({ theme }) => theme.colors.functional.success.main};
  color: ${({ theme }) => theme.colors.functional.success.dark};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '✓';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    font-weight: bold;
    margin-top: 2px;
  }
`;

const ErrorMessage = styled.div`
  background: ${({ theme }) => theme.colors.functional.error.light};
  border: 1px solid ${({ theme }) => theme.colors.functional.error.main};
  color: ${({ theme }) => theme.colors.functional.error.dark};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '⚠';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }
`;

// Form validation rules
const validationRules = {
  email: [
    COMMON_RULES.required('Email is required'),
    COMMON_RULES.email(),
  ],
};

// Initial form values
const initialValues = {
  email: '',
};

// Main Forgot Password Page Component
export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setFieldTouched,
    validateAll,
  } = useFormValidation(initialValues, validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateAll();
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await requestPasswordReset({
        email: values.email,
      });

      setIsSuccess(true);
    } catch (error: any) {
      setAuthError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string) => (value: string) => {
    setValue(field, value);
    // Clear auth error when user starts typing
    if (authError) {
      setAuthError(null);
    }
    // Reset success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleInputBlur = (field: string) => () => {
    setFieldTouched(field);
  };

  if (isSuccess) {
    return (
      <AuthLayoutComponent
        title="Check Your Email"
        subtitle="Password reset instructions sent"
      >
        <SuccessMessage>
          <div>
            <strong>Email sent successfully!</strong><br />
            We've sent password reset instructions to <strong>{values.email}</strong>. 
            Please check your email and click the reset link to create a new password.
            <br /><br />
            If you don't see the email within a few minutes, please check your spam folder.
          </div>
        </SuccessMessage>

        <FormActions>
          <GradientButton
            variant="primary"
            size="large"
            fullWidth
            onClick={() => setIsSuccess(false)}
          >
            Send Another Email
          </GradientButton>

          <BackToLoginLink href="/auth/login">
            ← Back to Sign In
          </BackToLoginLink>
        </FormActions>
      </AuthLayoutComponent>
    );
  }

  return (
    <AuthLayoutComponent
      title="Forgot Password"
      subtitle="Reset your FlexFlow account password"
    >
      <InfoMessage>
        Enter your email address and we'll send you instructions to reset your password.
      </InfoMessage>

      <ForgotPasswordForm onSubmit={handleSubmit} noValidate>
        {authError && (
          <ErrorMessage role="alert">
            {authError}
          </ErrorMessage>
        )}

        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={handleInputChange('email')}
          onBlur={handleInputBlur('email')}
          error={touched.email ? errors.email : undefined}
          required
          fullWidth
          autoComplete="email"
          disabled={isSubmitting}
          helpText="We'll send password reset instructions to this email"
        />

        <FormActions>
          <GradientButton
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Sending Instructions...' : 'Send Reset Instructions'}
          </GradientButton>

          <BackToLoginLink href="/auth/login">
            ← Back to Sign In
          </BackToLoginLink>
        </FormActions>
      </ForgotPasswordForm>
    </AuthLayoutComponent>
  );
}