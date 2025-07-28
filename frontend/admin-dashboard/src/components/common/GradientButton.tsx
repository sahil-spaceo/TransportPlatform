import React from 'react';
import styled, { css } from 'styled-components';

interface GradientButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
}

const GradientButton: React.FC<GradientButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <IconContainer $position="left">{icon}</IconContainer>
      )}
      <ButtonText $loading={loading}>{children}</ButtonText>
      {!loading && icon && iconPosition === 'right' && (
        <IconContainer $position="right">{icon}</IconContainer>
      )}
    </StyledButton>
  );
};

const getVariantStyles = (variant: string) => {
  const variants = {
    primary: css`
      background: ${({ theme }) => theme.colors.gradients.primary};
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.gradients.secondary};
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.lg};
      }
    `,
    secondary: css`
      background: ${({ theme }) => theme.colors.gradients.secondary};
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.gradients.primary};
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.lg};
      }
    `,
    accent: css`
      background: ${({ theme }) => theme.colors.gradients.accent};
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.gradients.primary};
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.lg};
      }
    `,
    success: css`
      background: ${({ theme }) => theme.colors.functional.successGradient};
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      
      &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25);
      }
    `,
    warning: css`
      background: ${({ theme }) => theme.colors.functional.warningGradient};
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      
      &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(245, 158, 11, 0.25);
      }
    `,
    error: css`
      background: ${({ theme }) => theme.colors.functional.errorGradient};
      color: ${({ theme }) => theme.colors.text.inverse};
      
      &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25);
      }
    `,
    info: css`
      background: ${({ theme }) => theme.colors.functional.infoGradient};
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      
      &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25);
      }
    `,
  };

  return variants[variant as keyof typeof variants] || variants.primary;
};

const getSizeStyles = (size: string) => {
  const sizes = {
    small: css`
      padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
      min-height: 36px;
    `,
    medium: css`
      padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      border-radius: ${({ theme }) => theme.borderRadius.xl};
      min-height: 44px;
    `,
    large: css`
      padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      border-radius: ${({ theme }) => theme.borderRadius.xl};
      min-height: 52px;
    `,
  };

  return sizes[size as keyof typeof sizes] || sizes.medium;
};

const StyledButton = styled.button<{
  $variant: string;
  $size: string;
  $fullWidth: boolean;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  position: relative;
  overflow: hidden;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  background-size: 200% 200%;
  
  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}
  
  &:active:not(:disabled) {
    transform: translateY(0);
    transition: transform ${({ theme }) => theme.animations.duration.fast};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.functional.info};
    outline-offset: 2px;
  }

  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }
`;

const ButtonText = styled.span<{ $loading: boolean }>`
  opacity: ${({ $loading }) => $loading ? 0 : 1};
  transition: opacity ${({ theme }) => theme.animations.duration.normal};
`;

const IconContainer = styled.div<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default GradientButton;