'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { FormField } from '@/components/atoms/Form/FormField';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useFormValidation, COMMON_RULES } from '@/utils/validation';
import AuthLayoutComponent from '@/components/layout/AuthLayout';

// Force client-side rendering
export const dynamic = 'force-dynamic';
// Styled Components
const ResetPasswordForm = styled.form`
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

const InvalidTokenMessage = styled.div`
  background: ${({ theme }) => theme.colors.functional.warning.light};
  border: 1px solid ${({ theme }) => theme.colors.functional.warning.main};
  color: ${({ theme }) => theme.colors.functional.warning.dark};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  text-align: center;

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

// Form validation rules
const createValidationRules = (password: string) => ({
  newPassword: [
    COMMON_RULES.required('Password is required'),
    COMMON_RULES.password(),
  ],
  confirmPassword: [
    COMMON_RULES.required('Please confirm your password'),
    COMMON_RULES.confirmPassword(password),
  ],
});

// Initial form values
const initialValues = {
  newPassword: '',
  confirmPassword: '',
};

// Main Reset Password Page Component
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmPasswordReset } = useAuth();
  
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  const validationRules = {
    newPassword: [
      COMMON_RULES.required('New password is required'),
      COMMON_RULES.password(),
    ],
    confirmPassword: [
      COMMON_RULES.required('Please confirm your new password'),
    ],
  };

  const {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setFieldTouched,
    validateAll,
  } = useFormValidation(initialValues, validationRules);

  // Extract token from URL parameters
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setAuthError('Invalid or missing reset token');
      return;
    }
    
    const validation = validateAll();
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await confirmPasswordReset({
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      setIsSuccess(true);
    } catch (error: any) {
      if (error.code === 'INVALID_TOKEN' || error.code === 'EXPIRED_TOKEN') {
        setIsValidToken(false);
      } else {
        setAuthError(error.message || 'Failed to reset password. Please try again.');
      }
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
  };

  const handleInputBlur = (field: string) => () => {
    setFieldTouched(field);
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  const handleRequestNewReset = () => {
    router.push('/auth/forgot-password');
  };

  // Loading state while checking token
  if (isValidToken === null) {
    return (
      <AuthLayoutComponent
        title="Loading..."
        subtitle="Verifying reset token"
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f4f6', 
            borderTop: '4px solid #ff9a9e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#6b7280', margin: 0 }}>
            Please wait while we verify your reset link...
          </p>
        </div>
      </AuthLayoutComponent>
    );
  }

  // Invalid token state
  if (isValidToken === false) {
    return (
      <AuthLayoutComponent
        title="Invalid Reset Link"
        subtitle="This password reset link is not valid"
      >
        <InvalidTokenMessage>
          <h3>Reset Link Invalid or Expired</h3>
          <p>
            This password reset link is either invalid, expired, or has already been used. 
            Password reset links are only valid for 1 hour and can only be used once.
          </p>
        </InvalidTokenMessage>

        <FormActions>
          <GradientButton
            variant="primary"
            size="large"
            fullWidth
            onClick={handleRequestNewReset}
          >
            Request New Reset Link
          </GradientButton>

          <BackToLoginLink href="/auth/login">
            ← Back to Sign In
          </BackToLoginLink>
        </FormActions>
      </AuthLayoutComponent>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <AuthLayoutComponent
        title="Password Reset Successful"
        subtitle="Your password has been updated"
      >
        <SuccessMessage>
          <div>
            <strong>Password updated successfully!</strong><br />
            Your password has been reset and you can now sign in with your new password.
          </div>
        </SuccessMessage>

        <FormActions>
          <GradientButton
            variant="primary"
            size="large"
            fullWidth
            onClick={handleBackToLogin}
          >
            Continue to Sign In
          </GradientButton>
        </FormActions>
      </AuthLayoutComponent>
    );
  }

  // Main reset password form
  return (
    <AuthLayoutComponent
      title="Reset Your Password"
      subtitle="Enter your new password"
    >
      <InfoMessage>
        Choose a strong password that you haven't used before. Your new password will replace your old password immediately.
      </InfoMessage>

      <ResetPasswordForm onSubmit={handleSubmit} noValidate>
        {authError && (
          <ErrorMessage role="alert">
            {authError}
          </ErrorMessage>
        )}

        <FormField
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          value={values.newPassword}
          onChange={handleInputChange('newPassword')}
          onBlur={handleInputBlur('newPassword')}
          error={touched.newPassword ? errors.newPassword : undefined}
          required
          fullWidth
          autoComplete="new-password"
          disabled={isSubmitting}
          showPasswordStrength
        />

        <FormField
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          value={values.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          onBlur={handleInputBlur('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          required
          fullWidth
          autoComplete="new-password"
          disabled={isSubmitting}
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
            {isSubmitting ? 'Updating Password...' : 'Update Password'}
          </GradientButton>

          <BackToLoginLink href="/auth/login">
            ← Back to Sign In
          </BackToLoginLink>
        </FormActions>
      </ResetPasswordForm>
    </AuthLayoutComponent>
  );
}