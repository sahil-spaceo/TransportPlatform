'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { FormField } from '@/components/atoms/Form/FormField';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFormValidation, COMMON_RULES } from '@/utils/validation';
import { useTheme as useStyledTheme } from 'styled-components';

// Force client-side rendering
export const dynamic = 'force-dynamic';

// Styled Components
const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.gradient};
  width: 100%;
  min-height: 100vh;
`;

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const ProfileAvatar = styled.div<{ $tier: 'basic' | 'silver' | 'gold' }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme, $tier }) => theme.colors.subscription[$tier].gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  border: 4px solid ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
  position: relative;
`;

const SubscriptionBadge = styled.div<{ $tier: 'basic' | 'silver' | 'gold' }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: ${({ theme, $tier }) => theme.colors.subscription[$tier].gradient};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: uppercase;
  border: 2px solid white;
`;

const ProfileInfo = styled.div`
  text-align: center;
`;

const UserName = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const UserEmail = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const JoinDate = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const TabContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TabList = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xs};
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme, $active }) => $active ? 'white' : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.primary.main : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme, $active }) => $active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  box-shadow: ${({ theme, $active }) => $active ? theme.shadows.light : 'none'};

  &:hover {
    background: ${({ theme, $active }) => $active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &::before {
    content: '✓';
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }
`;

// Tab types
type TabType = 'profile' | 'account' | 'preferences' | 'security';

// Form validation rules
const profileValidationRules = {
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
    COMMON_RULES.minLength(10),
  ],
};

const passwordValidationRules = (currentPassword: string) => ({
  currentPassword: [
    COMMON_RULES.required('Current password is required'),
  ],
  newPassword: [
    COMMON_RULES.required('New password is required'),
    COMMON_RULES.password(),
  ],
  confirmPassword: [
    COMMON_RULES.required('Please confirm your new password'),
    COMMON_RULES.confirmPassword(currentPassword),
  ],
});

// Main Profile Content Component
function ProfileContent() {
  const { user, updateUser, changePassword } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const theme = useStyledTheme();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!user) return null;

  // Profile form
  const profileForm = useFormValidation({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
  }, profileValidationRules);

  // Password form validation rules
  const passwordValidationRulesFixed = {
    currentPassword: [
      COMMON_RULES.required('Current password is required'),
    ],
    newPassword: [
      COMMON_RULES.required('New password is required'),
      COMMON_RULES.password(),
    ],
    confirmPassword: [
      COMMON_RULES.required('Please confirm your new password'),
    ],
  };

  // Password form
  const passwordForm = useFormValidation({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }, passwordValidationRulesFixed);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = profileForm.validateAll();
    if (!validation.isValid) return;

    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      await updateUser({
        firstName: profileForm.values.firstName,
        lastName: profileForm.values.lastName,
        email: profileForm.values.email,
        phone: profileForm.values.phone || undefined,
      });
      
      setSuccessMessage('Profile updated successfully!');
    } catch (error: any) {
      console.error('Profile update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = passwordForm.validateAll();
    if (!validation.isValid) return;

    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      await changePassword({
        currentPassword: passwordForm.values.currentPassword,
        newPassword: passwordForm.values.newPassword,
        confirmPassword: passwordForm.values.confirmPassword,
      });
      
      setSuccessMessage('Password changed successfully!');
      passwordForm.reset();
    } catch (error: any) {
      console.error('Password change failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <GradientCard variant="elevated">
            {successMessage && (
              <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            
            <FormContainer onSubmit={handleProfileSubmit}>
              <FormRow>
                <FormField
                  name="firstName"
                  label="First Name"
                  value={profileForm.values.firstName}
                  onChange={(value) => profileForm.setValue('firstName', value)}
                  onBlur={() => profileForm.setFieldTouched('firstName')}
                  error={profileForm.touched.firstName ? profileForm.errors.firstName : undefined}
                  required
                  fullWidth
                  disabled={isSubmitting}
                />
                
                <FormField
                  name="lastName"
                  label="Last Name"
                  value={profileForm.values.lastName}
                  onChange={(value) => profileForm.setValue('lastName', value)}
                  onBlur={() => profileForm.setFieldTouched('lastName')}
                  error={profileForm.touched.lastName ? profileForm.errors.lastName : undefined}
                  required
                  fullWidth
                  disabled={isSubmitting}
                />
              </FormRow>

              <FormField
                name="email"
                label="Email Address"
                type="email"
                value={profileForm.values.email}
                onChange={(value) => profileForm.setValue('email', value)}
                onBlur={() => profileForm.setFieldTouched('email')}
                error={profileForm.touched.email ? profileForm.errors.email : undefined}
                required
                fullWidth
                disabled={isSubmitting}
              />

              <FormField
                name="phone"
                label="Phone Number"
                type="tel"
                value={profileForm.values.phone}
                onChange={(value) => profileForm.setValue('phone', value)}
                onBlur={() => profileForm.setFieldTouched('phone')}
                error={profileForm.touched.phone ? profileForm.errors.phone : undefined}
                fullWidth
                disabled={isSubmitting}
                helpText="Optional - for delivery notifications"
              />

              <FormActions>
                <GradientButton
                  variant="outline"
                  onClick={() => profileForm.reset()}
                  disabled={isSubmitting}
                >
                  Reset
                </GradientButton>
                
                <GradientButton
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={!profileForm.isValid || isSubmitting}
                >
                  Save Changes
                </GradientButton>
              </FormActions>
            </FormContainer>
          </GradientCard>
        );

      case 'account':
        return (
          <GradientCard variant="elevated">
            {successMessage && (
              <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>Account Settings</h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: theme.colors.text.secondary }}>
                Manage your account preferences, notifications, and data settings.
              </p>
            </div>

            {/* Email Preferences */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[50], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>📧 Email Preferences</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Marketing emails and promotions</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Service updates and notifications</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Booking confirmations and receipts</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Weekly activity summaries</span>
                </label>
              </div>
            </div>

            {/* Push Notifications */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[100], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>🔔 Push Notifications</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Driver arrival notifications</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Order status updates</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Special offers and discounts</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Location-based recommendations</span>
                </label>
              </div>
            </div>

            {/* Privacy Settings */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[100], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>🔒 Privacy Settings</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Share trip data for service improvements</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Allow location tracking when app is closed</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Personalized ads based on usage patterns</span>
                </label>
              </div>
            </div>

            {/* Account Actions */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[100], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>⚙️ Account Actions</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: theme.colors.text.primary }}>Download My Data</div>
                    <div style={{ fontSize: '0.75rem', color: theme.colors.text.secondary }}>Export all your account data and activity</div>
                  </div>
                  <GradientButton variant="outline" size="small">
                    Download
                  </GradientButton>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: theme.colors.text.primary }}>Deactivate Account</div>
                    <div style={{ fontSize: '0.75rem', color: theme.colors.text.secondary }}>Temporarily disable your account</div>
                  </div>
                  <GradientButton variant="ghost" size="small">
                    Deactivate
                  </GradientButton>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: theme.colors.functional.error.main }}>Delete Account</div>
                    <div style={{ fontSize: '0.75rem', color: theme.colors.text.secondary }}>Permanently delete your account and all data</div>
                  </div>
                  <GradientButton variant="outline" size="small" onClick={() => alert('Account deletion requires verification. Please contact support.')}>
                    Delete
                  </GradientButton>
                </div>
              </div>
            </div>

            <FormActions>
              <GradientButton
                variant="outline"
                onClick={() => {
                  // Reset checkboxes to default state
                  setSuccessMessage('Settings reset to default values');
                }}
                disabled={isSubmitting}
              >
                Reset to Defaults
              </GradientButton>
              
              <GradientButton
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => {
                    setIsSubmitting(false);
                    setSuccessMessage('Account settings saved successfully!');
                  }, 1000);
                }}
              >
                Save Settings
              </GradientButton>
            </FormActions>
          </GradientCard>
        );

      case 'preferences':
        return (
          <GradientCard variant="elevated">
            {successMessage && (
              <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>User Preferences</h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: theme.colors.text.secondary }}>
                Customize your FlexFlow experience with language, display, and app preferences.
              </p>
            </div>

            {/* Language & Region */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[50], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>🌍 Language & Region</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                    Language
                  </label>
                  <select style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: `2px solid ${theme.colors.neutral[300]}`, 
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white'
                  }}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="pt">Português</option>
                    <option value="ru">Русский</option>
                    <option value="ar">العربية</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="hi">हिन्दी</option>
                    <option value="nl">Nederlands</option>
                    <option value="sv">Svenska</option>
                    <option value="he">עברית</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                    Currency
                  </label>
                  <select style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: `2px solid ${theme.colors.neutral[300]}`, 
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white'
                  }}>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CNY">CNY (¥)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                  Time Zone
                </label>
                <select style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: `2px solid ${theme.colors.neutral[300]}`, 
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white'
                }}>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  <option value="Europe/Paris">Central European Time (CET)</option>
                  <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                  <option value="Asia/Shanghai">China Standard Time (CST)</option>
                  <option value="Asia/Kolkata">India Standard Time (IST)</option>
                  <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
                </select>
              </div>
            </div>

            {/* Display Preferences */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[50], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>🎨 Display Preferences</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: theme.colors.text.primary, marginBottom: '0.5rem' }}>
                    Theme Preference
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="theme" 
                        value="system" 
                        checked={themeMode === 'system'}
                        onChange={(e) => setThemeMode(e.target.value as any)}
                        style={{ marginRight: '0.5rem' }} 
                      />
                      <span style={{ fontSize: '0.875rem' }}>🌓 Auto (System)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="theme" 
                        value="light" 
                        checked={themeMode === 'light'}
                        onChange={(e) => setThemeMode(e.target.value as any)}
                        style={{ marginRight: '0.5rem' }} 
                      />
                      <span style={{ fontSize: '0.875rem' }}>☀️ Light Mode</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="theme" 
                        value="dark" 
                        checked={themeMode === 'dark'}
                        onChange={(e) => setThemeMode(e.target.value as any)}
                        style={{ marginRight: '0.5rem' }} 
                      />
                      <span style={{ fontSize: '0.875rem' }}>🌙 Dark Mode</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontSize: '0.875rem' }}>Enable smooth animations and transitions</span>
                  </label>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontSize: '0.875rem' }}>Show map previews in service cards</span>
                  </label>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontSize: '0.875rem' }}>Enable reduced motion for accessibility</span>
                  </label>
                </div>
              </div>
            </div>

            {/* App Behavior */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[100], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>⚙️ App Behavior</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Remember my last used service type</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Auto-save pickup and destination locations</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Enable quick booking from dashboard</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Show price estimates before booking</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Enable experimental features (Beta)</span>
                </label>
              </div>
            </div>

            {/* Accessibility */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[100], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>♿ Accessibility</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Enable high contrast mode</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Increase font size for better readability</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Enable screen reader optimizations</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Reduce motion and animations</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Enable voice commands (where supported)</span>
                </label>
              </div>
            </div>

            {/* Data & Sync */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: theme.colors.neutral[100], borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 1rem', color: theme.colors.text.primary, fontSize: '1rem' }}>☁️ Data & Sync</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Sync preferences across devices</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Backup favorite locations to cloud</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Auto-download offline maps for frequent routes</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>Save payment methods securely</span>
                </label>
              </div>
            </div>

            <FormActions>
              <GradientButton
                variant="outline"
                onClick={() => {
                  setSuccessMessage('Preferences reset to default values');
                }}
                disabled={isSubmitting}
              >
                Reset to Defaults
              </GradientButton>
              
              <GradientButton
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => {
                    setIsSubmitting(false);
                    setSuccessMessage('Preferences saved successfully!');
                  }, 1000);
                }}
              >
                Save Preferences
              </GradientButton>
            </FormActions>
          </GradientCard>
        );

      case 'security':
        return (
          <GradientCard variant="elevated">
            {successMessage && (
              <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            
            <FormContainer onSubmit={handlePasswordSubmit}>
              <FormField
                name="currentPassword"
                label="Current Password"
                type="password"
                value={passwordForm.values.currentPassword}
                onChange={(value) => passwordForm.setValue('currentPassword', value)}
                onBlur={() => passwordForm.setFieldTouched('currentPassword')}
                error={passwordForm.touched.currentPassword ? passwordForm.errors.currentPassword : undefined}
                required
                fullWidth
                disabled={isSubmitting}
              />

              <FormField
                name="newPassword"
                label="New Password"
                type="password"
                value={passwordForm.values.newPassword}
                onChange={(value) => passwordForm.setValue('newPassword', value)}
                onBlur={() => passwordForm.setFieldTouched('newPassword')}
                error={passwordForm.touched.newPassword ? passwordForm.errors.newPassword : undefined}
                required
                fullWidth
                disabled={isSubmitting}
                showPasswordStrength
              />

              <FormField
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={passwordForm.values.confirmPassword}
                onChange={(value) => passwordForm.setValue('confirmPassword', value)}
                onBlur={() => passwordForm.setFieldTouched('confirmPassword')}
                error={passwordForm.touched.confirmPassword ? passwordForm.errors.confirmPassword : undefined}
                required
                fullWidth
                disabled={isSubmitting}
              />

              <FormActions>
                <GradientButton
                  variant="outline"
                  onClick={() => passwordForm.reset()}
                  disabled={isSubmitting}
                >
                  Cancel
                </GradientButton>
                
                <GradientButton
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={!passwordForm.isValid || isSubmitting}
                >
                  Change Password
                </GradientButton>
              </FormActions>
            </FormContainer>
          </GradientCard>
        );

      default:
        return (
          <GradientCard variant="elevated">
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <GradientHeading level="h3" gradient="primary" align="center">
                Coming Soon
              </GradientHeading>
              <p style={{ color: theme.colors.text.secondary, marginTop: '1rem' }}>
                This section is currently under development.
              </p>
            </div>
          </GradientCard>
        );
    }
  };

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <ProfileContainer>
        {/* Profile Header */}
        <ProfileHeader>
          <ProfileAvatar $tier={user.subscriptionTier || 'basic'}>
            {(user.firstName || 'U')[0]}{(user.lastName || 'U')[0]}
            <SubscriptionBadge $tier={user.subscriptionTier || 'basic'}>
              {user.subscriptionTier || 'basic'}
            </SubscriptionBadge>
          </ProfileAvatar>
          
          <ProfileInfo>
            <UserName>{user.firstName || 'User'} {user.lastName || ''}</UserName>
            <UserEmail>{user.email || 'user@example.com'}</UserEmail>
            <JoinDate>Member since {formatJoinDate(user.createdAt)}</JoinDate>
          </ProfileInfo>
        </ProfileHeader>

        {/* Tabs */}
        <TabContainer>
          <TabList>
            <TabButton
              $active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </TabButton>
            <TabButton
              $active={activeTab === 'account'}
              onClick={() => setActiveTab('account')}
            >
              Account
            </TabButton>
            <TabButton
              $active={activeTab === 'preferences'}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </TabButton>
            <TabButton
              $active={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
            >
              Security
            </TabButton>
          </TabList>

          <TabContent>
            {renderTabContent()}
          </TabContent>
        </TabContainer>
      </ProfileContainer>
    </Layout>
    </PageContainer>
  );
}

// Protected Profile Page
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}