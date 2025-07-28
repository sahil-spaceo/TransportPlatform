// FlexFlow Marketing Website - Advanced Button Component
// 8 variants according to UIUX architecture with full animation support

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ButtonProps } from '@/types/marketing.types';
import { animationVariants } from '@/styles/animations';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  href,
  external = false,
  animate = true,
  gradient,
  ...props
}) => {
  const baseProps = {
    $variant: variant,
    $size: size,
    $fullWidth: fullWidth,
    $loading: loading,
    $gradient: gradient,
    ...props,
  };

  const buttonProps = {
    ...baseProps,
    disabled: disabled || loading,
    onClick,
  };

  const linkProps = {
    ...baseProps,
  };

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && <IconWrapper $position="left">{leftIcon}</IconWrapper>}
      <ButtonText>{children}</ButtonText>
      {!loading && rightIcon && <IconWrapper $position="right">{rightIcon}</IconWrapper>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <StyledExternalLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          {content}
        </StyledExternalLink>
      );
    } else {
      return (
        <Link href={href} passHref legacyBehavior>
          <StyledLink {...linkProps}>
            {content}
          </StyledLink>
        </Link>
      );
    }
  }

  return (
    <StyledButton {...buttonProps}>
      {content}
    </StyledButton>
  );
};

// Base styled component
const BaseButton = styled.button<{
  $variant: ButtonProps['variant'];
  $size: ButtonProps['size'];
  $fullWidth: boolean;
  $loading: boolean;
  $gradient?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  outline: none;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  
  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'xs':
        return `
          padding: ${theme.spacing[1.5]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.xs};
          min-height: 28px;
        `;
      case 'sm':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 36px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[4]} ${theme.spacing[8]};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 52px;
        `;
      case 'xl':
        return `
          padding: ${theme.spacing[5]} ${theme.spacing[10]};
          font-size: ${theme.typography.fontSize.xl};
          min-height: 60px;
        `;
      default: // md
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.base};
          min-height: 44px;
        `;
    }
  }}
  
  /* 8 Button Variants according to UIUX Architecture */
  ${({ $variant, $gradient, theme }) => {
    const primaryGradient = $gradient || theme.colors.gradients.primary;
    
    switch ($variant) {
      case 'primary':
        return `
          background: ${primaryGradient};
          color: ${theme.colors.text.inverse};
          box-shadow: ${theme.shadows.md};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
            filter: brightness(1.1);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.sm};
          }
        `;
      
      case 'secondary':
        return `
          background: ${theme.colors.gradients.secondary};
          color: ${theme.colors.text.inverse};
          box-shadow: ${theme.shadows.md};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
            filter: brightness(1.1);
          }
        `;
      
      case 'gradient':
        return `
          background: ${theme.colors.gradients.hero};
          background-size: 200% 200%;
          color: ${theme.colors.text.inverse};
          animation: gradientShift 8s ease infinite;
          box-shadow: ${theme.shadows.gradient};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.02);
            box-shadow: ${theme.shadows.xl};
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
      
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.solid.brand.primary};
          border: 2px solid ${theme.colors.solid.brand.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.solid.brand.primary};
            color: ${theme.colors.text.inverse};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.solid.neutral[100]};
            transform: translateY(-1px);
          }
        `;
      
      case 'text':
        return `
          background: transparent;
          color: ${theme.colors.solid.brand.primary};
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.solid.neutral[50]};
            transform: none;
          }
        `;
      
      case 'danger':
        return `
          background: linear-gradient(135deg, ${theme.colors.status.error} 0%, #dc2626 100%);
          color: ${theme.colors.text.inverse};
          box-shadow: ${theme.shadows.md};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
            filter: brightness(1.1);
          }
        `;
      
      case 'success':
        return `
          background: linear-gradient(135deg, ${theme.colors.status.success} 0%, #059669 100%);
          color: ${theme.colors.text.inverse};
          box-shadow: ${theme.shadows.md};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
            filter: brightness(1.1);
          }
        `;
      
      default:
        return `
          background: ${primaryGradient};
          color: ${theme.colors.text.inverse};
          box-shadow: ${theme.shadows.md};
        `;
    }
  }}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    
    &:hover {
      transform: none !important;
      box-shadow: ${({ theme }) => theme.shadows.sm};
      filter: none !important;
    }
  }
  
  /* Loading state */
  ${({ $loading }) => $loading && `
    cursor: wait;
    pointer-events: none;
    
    &:hover {
      transform: none !important;
    }
  `}
  
  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solid.brand.primary};
    outline-offset: 2px;
  }
  
  /* Responsive adjustments */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $size, theme }) => {
      if ($size === 'lg') {
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.base};
          min-height: 44px;
        `;
      }
      if ($size === 'xl') {
        return `
          padding: ${theme.spacing[4]} ${theme.spacing[8]};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 52px;
        `;
      }
    }}
  }
`;

const StyledButton = styled(BaseButton)``;
const StyledLink = styled(BaseButton).attrs({ as: 'a' })``;
const StyledExternalLink = styled(BaseButton).attrs({ as: 'a' })``;

// Icon wrapper for proper spacing
const IconWrapper = styled.span<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $position }) => $position === 'left' && `
    margin-right: -4px;
  `}
  
  ${({ $position }) => $position === 'right' && `
    margin-left: -4px;
  `}
  
  svg {
    width: 1em;
    height: 1em;
  }
`;

// Button text wrapper
const ButtonText = styled.span`
  display: flex;
  align-items: center;
  line-height: 1;
`;

// Loading spinner component
const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing[2]};
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Button;