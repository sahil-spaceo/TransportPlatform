'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonVariant, ComponentSize, SubscriptionTier } from '@/types/theme.types';

// Styled Button Component
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ComponentSize;
  $fullWidth?: boolean;
  $tier?: SubscriptionTier;
  $disabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.standard};
  overflow: hidden;
  
  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.bodySmall};
          border-radius: ${theme.borderRadius.medium};
          min-height: 36px;
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.bodyLarge};
          border-radius: ${theme.borderRadius.large};
          min-height: 56px;
        `;
      default: // medium
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.body};
          border-radius: ${theme.borderRadius.medium};
          min-height: 44px;
        `;
    }
  }}

  /* Color variants */
  ${({ $variant, theme, $tier }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary.gradient};
          color: ${theme.colors.primary.contrastText};
          box-shadow: ${theme.shadows.light};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.medium};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            transition: all ${theme.animations.duration.fast};
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.secondary.gradient};
          color: ${theme.colors.secondary.contrastText};
          box-shadow: ${theme.shadows.light};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.medium};
          }
        `;
      case 'outline':
        return css`
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: ${theme.colors.primary.main};
          border: 2px solid ${theme.colors.primary.main};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary.gradient};
            color: ${theme.colors.primary.contrastText};
            transform: translateY(-1px);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        `;
      case 'ghost':
        return css`
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: ${theme.colors.primary.main};
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transform: translateY(-1px);
            border-color: rgba(255, 255, 255, 0.4);
          }
        `;
      case 'gradient':
        const tierGradient = $tier ? theme.colors.subscription[$tier].gradient : theme.colors.primary.gradient;
        return css`
          background: ${tierGradient};
          color: ${theme.colors.primary.contrastText};
          box-shadow: ${theme.shadows.colored};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.02);
            box-shadow: ${theme.shadows.heavy};
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary.gradient};
          color: ${theme.colors.primary.contrastText};
        `;
    }
  }}

  /* Full width */
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}

  /* Disabled state */
  ${({ $disabled, theme }) => $disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  `}

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  /* Loading state shimmer effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left ${({ theme }) => theme.animations.duration.slow} ease;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }
`;

// Loading Spinner Component
const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Icon Container
const IconContainer = styled.span<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  order: ${({ $position }) => $position === 'left' ? -1 : 1};
`;

// Button Props Interface
export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ComponentSize;
  fullWidth?: boolean;
  tier?: SubscriptionTier;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  as?: 'button' | 'a';
}

// Main Button Component
export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  tier,
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  href,
  as = 'button',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && (
        <IconContainer $position={iconPosition}>
          {icon}
        </IconContainer>
      )}
      {children}
    </>
  );

  if (as === 'a' && href) {
    return (
      <StyledButton
        as="a"
        href={href}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $tier={tier}
        $disabled={isDisabled}
        {...(props as any)}
      >
        {content}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $tier={tier}
      $disabled={isDisabled}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </StyledButton>
  );
};

export default GradientButton;