'use client';

import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ComponentSize, ColorVariant } from '@/types/theme.types';

// Input Container
const InputContainer = styled.div<{
  $fullWidth?: boolean;
  $hasError?: boolean;
}>`
  position: relative;
  display: ${({ $fullWidth }) => $fullWidth ? 'block' : 'inline-block'};
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Input Label
const InputLabel = styled.label<{
  $required?: boolean;
  $hasError?: boolean;
}>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme, $hasError }) => 
    $hasError ? theme.colors.functional.error.main : theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: color ${({ theme }) => theme.animations.duration.fast};

  ${({ $required }) => $required && css`
    &::after {
      content: ' *';
      color: ${({ theme }) => theme.colors.functional.error.main};
    }
  `}
`;

// Styled Input
const StyledInput = styled.input<{
  $size: ComponentSize;
  $hasError?: boolean;
  $hasIcon?: boolean;
  $iconPosition?: 'left' | 'right';
}>`
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 2px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.functional.error.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.standard};
  outline: none;

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.bodySmall};
          min-height: 36px;
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.bodyLarge};
          min-height: 56px;
        `;
      default: // medium
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.body};
          min-height: 44px;
        `;
    }
  }}

  /* Icon padding adjustment */
  ${({ $hasIcon, $iconPosition, theme }) => {
    if ($hasIcon) {
      const iconSpacing = '40px';
      return css`
        padding-${$iconPosition === 'right' ? 'right' : 'left'}: ${iconSpacing};
      `;
    }
  }}

  /* Focus state */
  &:focus {
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.functional.error.main : theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => 
      $hasError ? 
        `${theme.colors.functional.error.main}20` : 
        `${theme.colors.primary.main}20`};
  }

  /* Hover state */
  &:hover:not(:focus):not(:disabled) {
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.functional.error.main : theme.colors.primary.main};
  }

  /* Disabled state */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.neutral[200]};
  }

  /* Placeholder styles */
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.hint};
    opacity: 1;
  }

  /* Autofill styles */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.background.default} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Number input - hide spinners */
  &[type="number"] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

// Icon Container
const IconContainer = styled.div<{
  $position: 'left' | 'right';
  $size: ComponentSize;
  $hasError?: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $hasError }) => 
    $hasError ? theme.colors.functional.error.main : theme.colors.text.secondary};
  pointer-events: none;
  transition: color ${({ theme }) => theme.animations.duration.fast};

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          width: 16px;
          height: 16px;
          font-size: 16px;
        `;
      case 'large':
        return css`
          width: 24px;
          height: 24px;
          font-size: 24px;
        `;
      default:
        return css`
          width: 20px;
          height: 20px;
          font-size: 20px;
        `;
    }
  }}
`;

// Error Message
const ErrorMessage = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.functional.error.main};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// Helper Text
const HelperText = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

// Component Props Interface
export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  size?: ComponentSize;
  fullWidth?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: ColorVariant;
}

// Main Component
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  helperText,
  errorMessage,
  size = 'medium',
  fullWidth = false,
  required = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  className,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(errorMessage);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <InputContainer $fullWidth={fullWidth} $hasError={hasError} className={className}>
      {label && (
        <InputLabel htmlFor={inputId} $required={required} $hasError={hasError}>
          {label}
        </InputLabel>
      )}
      
      <div style={{ position: 'relative' }}>
        <StyledInput
          ref={ref}
          id={inputId}
          $size={size}
          $hasError={hasError}
          $hasIcon={Boolean(icon)}
          $iconPosition={iconPosition}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {icon && (
          <IconContainer 
            $position={iconPosition} 
            $size={size}
            $hasError={hasError}
          >
            {icon}
          </IconContainer>
        )}
      </div>

      {errorMessage && (
        <ErrorMessage role="alert">
          <span>⚠</span>
          {errorMessage}
        </ErrorMessage>
      )}

      {helperText && !errorMessage && (
        <HelperText>
          {helperText}
        </HelperText>
      )}
    </InputContainer>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;