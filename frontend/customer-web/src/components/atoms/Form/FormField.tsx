'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { TextInput } from '@/components/atoms/Input/TextInput';
import { ComponentSize } from '@/types/theme.types';

// Styled Components
const FieldContainer = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
`;

const FieldLabel = styled.label<{ $required?: boolean; $error?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, $error }) => $error ? theme.colors.functional.error.main : theme.colors.text.primary};
  
  ${({ $required }) => $required && css`
    &::after {
      content: ' *';
      color: ${({ theme }) => theme.colors.functional.error.main};
    }
  `}
`;

const FieldError = styled.div`
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

const FieldHelp = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const PasswordStrengthIndicator = styled.div<{ $strength: number }>`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-top: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $strength }) => $strength * 25}%;
    background: ${({ $strength, theme }) => {
      if ($strength <= 1) return theme.colors.functional.error.main;
      if ($strength <= 2) return theme.colors.functional.warning.main;
      if ($strength <= 3) return theme.colors.functional.info.main;
      return theme.colors.functional.success.main;
    }};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    transition: width ${({ theme }) => theme.animations.duration.normal};
  }
`;

const PasswordStrengthText = styled.div<{ $strength: number }>`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ $strength, theme }) => {
    if ($strength <= 1) return theme.colors.functional.error.main;
    if ($strength <= 2) return theme.colors.functional.warning.main;
    if ($strength <= 3) return theme.colors.functional.info.main;
    return theme.colors.functional.success.main;
  }};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

// Form Field Props
export interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ComponentSize;
  showPasswordStrength?: boolean;
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
  children?: React.ReactNode;
}

// Password strength calculation
function calculatePasswordStrength(password: string): number {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^A-Za-z0-9]/)) strength++;
  
  return Math.min(strength, 4);
}

function getPasswordStrengthText(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return '';
  }
}

// Main FormField Component
export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helpText,
  required = false,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  showPasswordStrength = false,
  autoComplete,
  maxLength,
  pattern,
  children,
}) => {
  const hasError = Boolean(error);
  const passwordStrength = showPasswordStrength && type === 'password' 
    ? calculatePasswordStrength(value) 
    : 0;

  return (
    <FieldContainer $fullWidth={fullWidth}>
      <FieldLabel 
        htmlFor={name} 
        $required={required} 
        $error={hasError}
      >
        {label}
      </FieldLabel>
      
      <TextInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        errorMessage={hasError ? error : undefined}
        disabled={disabled}
        size={size}
        autoComplete={autoComplete}
        maxLength={maxLength}
        pattern={pattern}
        fullWidth={fullWidth}
        aria-describedby={
          [
            error ? `${name}-error` : undefined,
            helpText ? `${name}-help` : undefined,
          ].filter(Boolean).join(' ') || undefined
        }
        aria-invalid={hasError}
        required={required}
      />
      
      {showPasswordStrength && type === 'password' && value && (
        <>
          <PasswordStrengthIndicator $strength={passwordStrength} />
          <PasswordStrengthText $strength={passwordStrength}>
            Password strength: {getPasswordStrengthText(passwordStrength)}
          </PasswordStrengthText>
        </>
      )}
      
      {error && (
        <FieldError id={`${name}-error`} role="alert">
          {error}
        </FieldError>
      )}
      
      {helpText && !error && (
        <FieldHelp id={`${name}-help`}>
          {helpText}
        </FieldHelp>
      )}
      
      {children}
    </FieldContainer>
  );
};

export default FormField;