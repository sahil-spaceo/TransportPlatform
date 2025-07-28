'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { SubscriptionTier } from '@/types/theme.types';

// Card Variants
type CardVariant = 'elevated' | 'outlined' | 'gradient' | 'glass';
type CardPadding = 'none' | 'small' | 'medium' | 'large';

// Styled Card Component
const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $tier?: SubscriptionTier;
  $hoverable?: boolean;
  $clickable?: boolean;
}>`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.standard};
  overflow: hidden;
  
  /* Padding variants */
  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'none':
        return css`padding: 0;`;
      case 'small':
        return css`padding: ${theme.spacing.md};`;
      case 'large':
        return css`padding: ${theme.spacing.xl};`;
      default: // medium
        return css`padding: ${theme.spacing.lg};`;
    }
  }}

  /* Card variants */
  ${({ $variant, theme, $tier }) => {
    switch ($variant) {
      case 'outlined':
        return css`
          background: ${theme.colors.background.paper};
          border: 2px solid ${theme.colors.neutral[200]};
          box-shadow: none;
        `;
      case 'gradient':
        const gradientBg = $tier ? theme.colors.subscription[$tier].gradient : theme.colors.primary.gradient;
        return css`
          background: ${gradientBg};
          color: ${theme.colors.neutral.white};
          border: none;
          box-shadow: ${theme.shadows.colored};
        `;
      case 'glass':
        return css`
          background: ${theme.colors.background.paper}95;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid ${theme.colors.neutral[200]};
          box-shadow: ${theme.shadows.light};
        `;
      default: // elevated
        return css`
          background: ${theme.colors.background.paper};
          border: none;
          box-shadow: ${theme.shadows.light};
        `;
    }
  }}

  /* Hover effects */
  ${({ $hoverable, $clickable, theme }) => ($hoverable || $clickable) && css`
    cursor: ${$clickable ? 'pointer' : 'default'};
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: ${theme.shadows.medium};
      
      ${$clickable && css`
        cursor: pointer;
      `}
    }

    &:active {
      transform: translateY(-2px) scale(1.005);
      transition: all ${({ theme }) => theme.animations.duration.fast};
    }
  `}

  /* Tier border indicator */
  ${({ $tier, theme }) => $tier && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${theme.colors.subscription[$tier].gradient};
      border-radius: ${theme.borderRadius.large} ${theme.borderRadius.large} 0 0;
    }
  `}

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  /* Responsive padding adjustments */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $padding, theme }) => {
      if ($padding === 'large') {
        return css`padding: ${theme.spacing.lg};`;
      }
      if ($padding === 'medium') {
        return css`padding: ${theme.spacing.md};`;
      }
    }}
  }
`;

// Card Header
const CardHeader = styled.div<{
  $borderBottom?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  ${({ $borderBottom, theme }) => $borderBottom && css`
    padding-bottom: ${theme.spacing.lg};
    border-bottom: 1px solid ${theme.colors.neutral[200]};
  `}
`;

// Card Title
const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: inherit;
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

// Card Subtitle
const CardSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

// Card Content
const CardContent = styled.div`
  flex: 1;
  
  /* Ensure proper text color inheritance */
  color: inherit;
`;

// Card Actions
const CardActions = styled.div<{
  $justify?: 'start' | 'center' | 'end' | 'between';
  $spacing?: 'small' | 'medium' | 'large';
}>`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  /* Justify content */
  ${({ $justify }) => {
    switch ($justify) {
      case 'center':
        return css`justify-content: center;`;
      case 'end':
        return css`justify-content: flex-end;`;
      case 'between':
        return css`justify-content: space-between;`;
      default:
        return css`justify-content: flex-start;`;
    }
  }}

  /* Gap between action items */
  ${({ $spacing, theme }) => {
    switch ($spacing) {
      case 'small':
        return css`gap: ${theme.spacing.sm};`;
      case 'large':
        return css`gap: ${theme.spacing.lg};`;
      default:
        return css`gap: ${theme.spacing.md};`;
    }
  }}
`;

// Tier Badge
const TierBadge = styled.div<{
  $tier: SubscriptionTier;
  $isRTL?: boolean;
}>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ $isRTL, theme }) => $isRTL ? 'auto' : theme.spacing.md};
  left: ${({ $isRTL, theme }) => $isRTL ? theme.spacing.md : 'auto'};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $tier }) => theme.colors.subscription[$tier].gradient};
  color: ${({ theme }) => theme.colors.neutral.white};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${({ theme }) => theme.shadows.light};
  z-index: 10;
  
  /* Ensure RTL language text direction */
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

// Component Props Interface
export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  tier?: SubscriptionTier;
  hoverable?: boolean;
  clickable?: boolean;
  showTierBadge?: boolean;
  isRTL?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    borderBottom?: boolean;
  };
  actions?: {
    children: React.ReactNode;
    justify?: 'start' | 'center' | 'end' | 'between';
    spacing?: 'small' | 'medium' | 'large';
  };
}

// Main Component
export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  tier,
  hoverable = false,
  clickable = false,
  showTierBadge = false,
  isRTL = false,
  header,
  actions,
  className,
  ...props
}) => {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $tier={tier}
      $hoverable={hoverable}
      $clickable={clickable}
      className={className}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      {...props}
    >
      {/* Tier Badge */}
      {showTierBadge && tier && (
        <TierBadge $tier={tier} $isRTL={isRTL}>
          {tier}
        </TierBadge>
      )}

      {/* Header Section */}
      {header && (
        <CardHeader $borderBottom={header.borderBottom}>
          <div>
            {header.title && <CardTitle>{header.title}</CardTitle>}
            {header.subtitle && <CardSubtitle>{header.subtitle}</CardSubtitle>}
          </div>
          {header.action && <div>{header.action}</div>}
        </CardHeader>
      )}

      {/* Content Section */}
      <CardContent>{children}</CardContent>

      {/* Actions Section */}
      {actions && (
        <CardActions 
          $justify={actions.justify} 
          $spacing={actions.spacing}
        >
          {actions.children}
        </CardActions>
      )}
    </StyledCard>
  );
};

export default GradientCard;