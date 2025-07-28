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
const SignupContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const SignupCard = styled(GradientCard)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
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

const TierSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const TierCard = styled.div<{ $selected: boolean; $tier: 'basic' | 'silver' | 'gold' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, $selected, $tier }) => 
    $selected 
      ? theme.colors.subscription[$tier].main 
      : theme.colors.neutral[300]
  };
  background: ${({ theme, $selected, $tier }) => 
    $selected 
      ? theme.colors.subscription[$tier].light 
      : theme.colors.neutral.white
  };
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  text-align: center;
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    border-color: ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
    background: ${({ theme, $tier }) => theme.colors.subscription[$tier].light};
  }
`;

const TierName = styled.div<{ $tier: 'basic' | 'silver' | 'gold' }>`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TierPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
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

const subscriptionTiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: ['Standard rides', 'Basic delivery', 'Standard support'],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: '$9.99/mo',
    features: ['Drone delivery', 'Priority booking', 'Extended support'],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '$19.99/mo',
    features: ['Ride sharing', 'Concierge support', 'VIP treatment'],
  },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    subscriptionTier: 'basic' as 'basic' | 'silver' | 'gold',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTierSelect = (tier: 'basic' | 'silver' | 'gold') => {
    setFormData(prev => ({ ...prev, subscriptionTier: tier }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Please enter a valid email';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful signup
      const newUser = {
        id: `user_${Date.now()}`,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        subscriptionTier: formData.subscriptionTier,
        preferences: {
          notifications: true,
          language: 'en',
          currency: 'USD',
        },
      };

      await login(newUser as any);
      setSuccess('Account created successfully! Redirecting to dashboard...');
      
      // Redirect after success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout noFooter>
      <SignupContainer>
        <SignupCard variant="elevated" padding="large">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <GradientHeading level="h1" gradient="primary" align="center">
              Join FlexFlow
            </GradientHeading>
            <p style={{ 
              color: '#616161', 
              margin: '0.5rem 0 0', 
              fontSize: '1rem' 
            }}>
              Create your account and start your journey
            </p>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <SignupForm onSubmit={handleSubmit}>
            <FormRow>
              <TextInput
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                disabled={isLoading}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                disabled={isLoading}
              />
            </FormRow>

            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              disabled={isLoading}
            />

            <TextInput
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={isLoading}
            />

            <FormRow>
              <TextInput
                label="Password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                disabled={isLoading}
              />
              <TextInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                disabled={isLoading}
              />
            </FormRow>

            {/* Subscription Tier Selection */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#212121'
              }}>
                Choose Your Plan
              </label>
              <TierSelection>
                {subscriptionTiers.map((tier) => (
                  <TierCard
                    key={tier.id}
                    $selected={formData.subscriptionTier === tier.id}
                    $tier={tier.id}
                    onClick={() => handleTierSelect(tier.id)}
                  >
                    <TierName $tier={tier.id}>{tier.name}</TierName>
                    <TierPrice>{tier.price}</TierPrice>
                  </TierCard>
                ))}
              </TierSelection>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#616161', 
                textAlign: 'center',
                marginTop: '0.5rem'
              }}>
                Selected: <strong>{subscriptionTiers.find(t => t.id === formData.subscriptionTier)?.name}</strong>
              </div>
            </div>

            <GradientButton
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </GradientButton>
          </SignupForm>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem'
          }}>
            <LinkButton onClick={() => router.push('/login')}>
              Already have an account? Sign in
            </LinkButton>
          </div>

          <div style={{ 
            fontSize: '0.75rem', 
            color: '#9e9e9e', 
            textAlign: 'center', 
            marginTop: '1.5rem',
            lineHeight: '1.4'
          }}>
            <strong>Demo Mode:</strong> This creates a mock account for development purposes. 
            You can upgrade or downgrade your subscription at any time.
          </div>
        </SignupCard>
      </SignupContainer>
    </Layout>
  );
}