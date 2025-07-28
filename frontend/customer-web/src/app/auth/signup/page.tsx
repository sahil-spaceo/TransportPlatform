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
const SignupContainer = styled.div`
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
      circle at 70% 30%,
      ${({ theme }) => theme.colors.primary.light}20 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 30% 70%,
      ${({ theme }) => theme.colors.secondary.light}15 0%,
      transparent 50%
    );
    animation: float 25s ease-in-out infinite reverse;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-20px, -20px) rotate(1deg); }
    66% { transform: translate(20px, -10px) rotate(-1deg); }
  }
`;

const SignupWrapper = styled.div`
  width: 100%;
  max-width: 520px;
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
    content: '\2190';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 10px;
    left: 10px;
  }
`;

const SignupCard = styled(GradientCard)`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const SignupHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  p {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: ${({ theme }) => theme.spacing.sm} 0 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  }
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const CheckboxSection = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.primary.main};
  margin-top: 2px;
`;

const CheckboxLabel = styled.label<{ $required?: boolean; $error?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme, $error }) => $error ? theme.colors.functional.error.main : theme.colors.text.secondary};
  cursor: pointer;
  line-height: 1.4;

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CheckboxError = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.functional.error.main};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '⚠';
    font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
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

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LoginLink = styled.button`
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

const PasswordStrengthIndicator = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  
  h4 {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xs};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      grid-template-columns: 1fr;
    }
  }
  
  li {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
    color: ${({ theme }) => theme.colors.text.secondary};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    
    &::before {
      content: '•';
      color: ${({ theme }) => theme.colors.primary.main};
    }
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

const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.colors.functional.success.light};
  border: 1px solid ${({ theme }) => theme.colors.functional.success.main};
  color: ${({ theme }) => theme.colors.functional.success.dark};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '✓';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }
`;

// Form validation rules
const createValidationRules = (password: string) => ({
  firstName: [
    COMMON_RULES.required('First name is required'),
    COMMON_RULES.name('Please enter a valid first name'),
    COMMON_RULES.minLength(2, 'First name must be at least 2 characters'),
  ],
  lastName: [
    COMMON_RULES.required('Last name is required'),
    COMMON_RULES.name('Please enter a valid last name'),
    COMMON_RULES.minLength(2, 'Last name must be at least 2 characters'),
  ],
  email: [
    COMMON_RULES.required('Email is required'),
    COMMON_RULES.email(),
  ],
  phone: [
    COMMON_RULES.phone('Please enter a valid phone number'),
    COMMON_RULES.minLength(10, 'Phone number must be at least 10 digits'),
  ],
  password: [
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
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

// Main Signup Page Component
export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { t } = useTranslation();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const validationRules = {
    firstName: [
      COMMON_RULES.required('First name is required'),
      COMMON_RULES.name(),
      COMMON_RULES.minLength(2),
    ],
    lastName: [
      COMMON_RULES.required('Last name is required'),
      COMMON_RULES.name(),
      COMMON_RULES.minLength(2),
    ],
    email: [
      COMMON_RULES.required('Email is required'),
      COMMON_RULES.email(),
    ],
    phone: [
      COMMON_RULES.phone(),
    ],
    password: [
      COMMON_RULES.required('Password is required'),
      COMMON_RULES.password(),
    ],
    confirmPassword: [
      COMMON_RULES.required('Please confirm your password'),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate terms acceptance
    if (!acceptTerms) {
      setTermsError('You must accept the Terms of Service and Privacy Policy');
      return;
    }

    const validation = validateAll();
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);
    setTermsError(null);

    try {
      await signup({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || undefined,
        acceptTerms,
        subscribeToNewsletter: subscribeNewsletter,
      });

      // Redirect to dashboard or intended page
      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';
      router.push(redirectTo);
    } catch (error: any) {
      setAuthError(error.message || 'Signup failed. Please try again.');
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

  const handleTermsChange = (checked: boolean) => {
    setAcceptTerms(checked);
    if (checked && termsError) {
      setTermsError(null);
    }
  };

  const handleSocialSignup = (provider: 'google' | 'apple') => {
    console.log(`Signup with ${provider}`);
    // TODO: Implement social signup
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  return (
    <SignupContainer>
      <BackToHome onClick={handleBackToHome}>
        Back to Home
      </BackToHome>
      
      <SignupWrapper>
        
        <SignupCard variant="glass" padding="large">
          <SignupHeader>
            <BrandSection>
              <BrandIcon>F</BrandIcon>
              <BrandText>
                <h1>FlexFlow</h1>
                <p>Flexibility in Motion</p>
              </BrandText>
            </BrandSection>
            
            <WelcomeMessage>
              <GradientHeading level="h2" gradient="primary" align="center">
                {t('auth.register.title')}
              </GradientHeading>
              <p>{t('auth.register.subtitle')}</p>
            </WelcomeMessage>
          </SignupHeader>

          <SignupForm onSubmit={handleSubmit} noValidate>
        {authError && (
          <ErrorMessage role="alert">
            {authError}
          </ErrorMessage>
        )}

            <FormRow>
              <FormField
                name="firstName"
                label={t('auth.register.firstname')}
                type="text"
                placeholder="Enter your first name"
                value={values.firstName}
                onChange={handleInputChange('firstName')}
                onBlur={handleInputBlur('firstName')}
                error={touched.firstName ? errors.firstName : undefined}
                required
                fullWidth
                autoComplete="given-name"
                disabled={isSubmitting}
              />

              <FormField
                name="lastName"
                label={t('auth.register.lastname')}
                type="text"
                placeholder="Enter your last name"
                value={values.lastName}
                onChange={handleInputChange('lastName')}
                onBlur={handleInputBlur('lastName')}
                error={touched.lastName ? errors.lastName : undefined}
                required
                fullWidth
                autoComplete="family-name"
                disabled={isSubmitting}
              />
            </FormRow>

            <FormField
              name="email"
              label={t('auth.register.email')}
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
              name="phone"
              label={t('auth.register.phone')}
              type="tel"
              placeholder="Enter your phone number (optional)"
              value={values.phone}
              onChange={handleInputChange('phone')}
              onBlur={handleInputBlur('phone')}
              error={touched.phone ? errors.phone : undefined}
              fullWidth
              autoComplete="tel"
              disabled={isSubmitting}
              helpText="Optional - for delivery notifications"
            />

            <div>
              <FormField
                name="password"
                label={t('auth.register.password')}
                type="password"
                placeholder="Create a strong password"
                value={values.password}
                onChange={handleInputChange('password')}
                onBlur={handleInputBlur('password')}
                error={touched.password ? errors.password : undefined}
                required
                fullWidth
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              
              <PasswordStrengthIndicator>
                <h4>Password Requirements:</h4>
                <ul>
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number or symbol</li>
                </ul>
              </PasswordStrengthIndicator>
            </div>

            <FormField
              name="confirmPassword"
              label={t('auth.register.confirmpassword')}
              type="password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              onBlur={handleInputBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              required
              fullWidth
              autoComplete="new-password"
              disabled={isSubmitting}
            />

            <CheckboxSection>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => handleTermsChange(e.target.checked)}
                  disabled={isSubmitting}
                />
                <div>
                  <CheckboxLabel htmlFor="acceptTerms" $error={Boolean(termsError)}>
                    {t('auth.register.terms')}
                  </CheckboxLabel>
                  {termsError && (
                    <CheckboxError role="alert">
                      {termsError}
                    </CheckboxError>
                  )}
                </div>
              </CheckboxContainer>

              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="subscribeNewsletter"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  disabled={isSubmitting}
                />
                <CheckboxLabel htmlFor="subscribeNewsletter">
                  {t('auth.register.marketing')}
                </CheckboxLabel>
              </CheckboxContainer>
            </CheckboxSection>

            <FormActions>
              <GradientButton
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                loading={isSubmitting}
                disabled={!isValid || !acceptTerms || isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : t('auth.register.submit')}
              </GradientButton>
            </FormActions>
          </SignupForm>

          <SocialLoginSection>
            <Divider>or sign up with</Divider>
            
            <SocialButtonsGrid>
              <SocialButton 
                type="button" 
                $provider="google"
                onClick={() => handleSocialSignup('google')}
                disabled={isSubmitting}
              >
                Continue with Google
              </SocialButton>
              
              <SocialButton 
                type="button" 
                $provider="apple"
                onClick={() => handleSocialSignup('apple')}
                disabled={isSubmitting}
              >
                Continue with Apple
              </SocialButton>
            </SocialButtonsGrid>
          </SocialLoginSection>

          <LoginPrompt>
            Already have an account?{' '}
            <LoginLink onClick={handleLoginClick}>
              {t('auth.register.signin')}
            </LoginLink>
          </LoginPrompt>
          
          <SecurityInfo>
            <span>Your data is protected with 256-bit SSL encryption</span>
          </SecurityInfo>
        </SignupCard>
      </SignupWrapper>
    </SignupContainer>
  );
}