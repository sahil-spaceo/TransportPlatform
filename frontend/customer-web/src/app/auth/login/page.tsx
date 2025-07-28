'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FormField } from '@/components/atoms/Form/FormField';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { useAuth } from '@/contexts/AuthContext';
import { useFormValidation, COMMON_RULES } from '@/utils/validation';
import { useTranslation } from 'react-i18next';

// Force client-side rendering
export const dynamic = 'force-dynamic';
// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.gradient};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 70%,
      ${({ theme }) => theme.colors.primary.light}20 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      ${({ theme }) => theme.colors.secondary.light}15 0%,
      transparent 50%
    );
    animation: float 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-20px, -20px) rotate(1deg); }
    66% { transform: translate(20px, -10px) rotate(-1deg); }
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
`;

const BackToHome = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.paper}95;
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  z-index: 100;

  &:hover {
    background: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  &::before {
    content: '←';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 10px;
    left: 10px;
  }
`;

const LoginCard = styled(GradientCard)`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BrandIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const BrandText = styled.div`
  h1 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin: 0;
    background: ${({ theme }) => theme.colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: ${({ theme }) => theme.spacing.xs} 0 0;
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: ${({ theme }) => theme.spacing.sm} 0 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }
`;

const LoginForm = styled.form`
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

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.primary.main};
`;

const CheckboxLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
`;

const UtilityActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const SocialLoginSection = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.neutral[300]};
  }

  &::before {
    margin-right: ${({ theme }) => theme.spacing.md};
  }

  &::after {
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`;

const SocialButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SocialButton = styled.button<{ $provider: 'google' | 'apple' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.background.paper};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
    border-color: ${({ theme }) => theme.colors.neutral[400]};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: ${({ $provider }) => $provider === 'google' ? "'🔍'" : "'🍎'"};
    font-size: 1.2rem;
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SignupLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    text-decoration: underline;
  }
`;

const SecurityInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  
  &::before {
    content: '🔒';
    font-size: 1rem;
  }
  
  span {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
    color: ${({ theme }) => theme.colors.text.secondary};
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
  password: [
    COMMON_RULES.required('Password is required'),
    COMMON_RULES.minLength(6, 'Password must be at least 6 characters'),
  ],
};

// Initial form values
const initialValues = {
  email: '',
  password: '',
};

// Main Login Page Component
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      await login({
        email: values.email,
        password: values.password,
        rememberMe,
      });

      // Redirect to dashboard or intended page
      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';
      router.push(redirectTo);
    } catch (error: any) {
      setAuthError(error.message || 'Login failed. Please try again.');
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

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleSignupClick = () => {
    router.push('/auth/signup');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <LoginContainer>
      <BackToHome onClick={handleBackToHome}>
        Back to Home
      </BackToHome>
      
      <LoginWrapper>
        
        <LoginCard variant="glass" padding="large">
          <LoginHeader>
            <BrandSection>
              <BrandIcon>F</BrandIcon>
              <BrandText>
                <h1>FlexFlow</h1>
                <p>Flexibility in Motion</p>
              </BrandText>
            </BrandSection>
            
            <WelcomeMessage>
              <GradientHeading level="h2" gradient="primary" align="center">
                {t('auth.login.title')}
              </GradientHeading>
              <p>{t('auth.login.subtitle')}</p>
            </WelcomeMessage>
          </LoginHeader>

          <LoginForm onSubmit={handleSubmit} noValidate>
        {authError && (
          <ErrorMessage role="alert">
            {authError}
          </ErrorMessage>
        )}

            <FormField
              name="email"
              label={t('auth.login.email')}
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
            />

            <FormField
              name="password"
              label={t('auth.login.password')}
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleInputChange('password')}
              onBlur={handleInputBlur('password')}
              error={touched.password ? errors.password : undefined}
              required
              fullWidth
              autoComplete="current-password"
              disabled={isSubmitting}
            />

            <UtilityActions>
              <RememberMeContainer>
                <Checkbox
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isSubmitting}
                />
                <CheckboxLabel htmlFor="rememberMe">
                  {t('auth.login.remember')}
                </CheckboxLabel>
              </RememberMeContainer>
              
              <ForgotPasswordLink onClick={handleForgotPassword}>
                {t('auth.login.forgot')}
              </ForgotPasswordLink>
            </UtilityActions>

            <FormActions>
              <GradientButton
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? t('common.loading') : t('auth.login.submit')}
              </GradientButton>
            </FormActions>
          </LoginForm>

          <SocialLoginSection>
            <Divider>{t('auth.login.divider')}</Divider>
            
            <SocialButtonsGrid>
              <SocialButton 
                type="button" 
                $provider="google"
                onClick={() => handleSocialLogin('google')}
                disabled={isSubmitting}
              >
                {t('auth.login.google')}
              </SocialButton>
              
              <SocialButton 
                type="button" 
                $provider="apple"
                onClick={() => handleSocialLogin('apple')}
                disabled={isSubmitting}
              >
                {t('auth.login.apple')}
              </SocialButton>
            </SocialButtonsGrid>
          </SocialLoginSection>

          <SignupPrompt>
            Don't have an account?{' '}
            <SignupLink onClick={handleSignupClick}>
              {t('auth.login.signup')}
            </SignupLink>
          </SignupPrompt>
          
          <SecurityInfo>
            <span>Your data is protected with 256-bit SSL encryption</span>
          </SecurityInfo>
        </LoginCard>
      </LoginWrapper>
    </LoginContainer>
  );
}