// FlexFlow Marketing Website - Advanced Card Component
// 6 variants according to UIUX architecture with full animation support

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CardProps } from '@/types/marketing.types';
import { animationVariants } from '@/styles/animations';

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'lg',
  children,
  hover = false,
  clickable = false,
  onClick,
  gradient,
  animated = true,
  ...props
}) => {
  const MotionComponent = animated ? motion.div : 'div';
  
  const animationProps = animated ? {
    variants: animationVariants.fadeInUp,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-10%' },
    ...(hover && {
      whileHover: {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' }
      }
    })
  } : {};

  return (
    <StyledCard
      as={MotionComponent}
      $variant={variant}
      $padding={padding}
      $hover={hover}
      $clickable={clickable}
      $gradient={gradient}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<{
  $variant: CardProps['variant'];
  $padding: CardProps['padding'];
  $hover: boolean;
  $clickable: boolean;
  $gradient?: string;
}>`
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  
  /* Padding variants */
  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'none':
        return `padding: 0;`;
      case 'sm':
        return `padding: ${theme.spacing[4]};`;
      case 'md':
        return `padding: ${theme.spacing[6]};`;
      case 'xl':
        return `padding: ${theme.spacing[8]};`;
      default: // lg
        return `padding: ${theme.spacing[6]};`;
    }
  }}
  
  /* 6 Card Variants according to UIUX Architecture */
  ${({ $variant, $gradient, theme }) => {
    switch ($variant) {
      case 'default':
        return `
          background: ${theme.colors.background.paper};
          border: 1px solid ${theme.colors.border.light};
          box-shadow: ${theme.shadows.sm};
          border-radius: ${theme.borderRadius['2xl']};
        `;
      
      case 'gradient':
        return `
          background: ${$gradient || theme.colors.gradients.card};
          border: 1px solid ${theme.colors.border.gradient};
          box-shadow: ${theme.shadows.md};
          backdrop-filter: blur(10px);
          border-radius: ${theme.borderRadius['2xl']};
          
          /* Gradient border effect */
          &::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: ${$gradient || theme.colors.gradients.primary};
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
          }
        `;
      
      case 'elevated':
        return `
          background: ${theme.colors.background.paper};
          border: 1px solid ${theme.colors.border.light};
          box-shadow: ${theme.shadows.lg};
          border-radius: ${theme.borderRadius['2xl']};
          transform: translateY(0);
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, ${theme.colors.border.light}, transparent);
          }
        `;
      
      case 'flat':
        return `
          background: ${theme.colors.background.paper};
          border: none;
          box-shadow: none;
          border-radius: ${theme.borderRadius.lg};
        `;
      
      case 'bordered':
        return `
          background: ${theme.colors.background.default};
          border: 2px solid ${theme.colors.border.medium};
          box-shadow: none;
          border-radius: ${theme.borderRadius['2xl']};
          
          &:hover {
            border-color: ${theme.colors.solid.brand.primary};
          }
        `;
      
      case 'interactive':
        return `
          background: ${theme.colors.background.paper};
          border: 1px solid ${theme.colors.border.light};
          box-shadow: ${theme.shadows.sm};
          border-radius: ${theme.borderRadius['2xl']};
          cursor: pointer;
          position: relative;
          
          /* Interactive glow effect */
          &::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: ${theme.colors.gradients.primary};
            border-radius: inherit;
            opacity: 0;
            transition: opacity ${theme.animations.duration.normal} ease;
            z-index: -1;
            filter: blur(8px);
          }
          
          &:hover::before {
            opacity: 0.3;
          }
          
          &:hover {
            transform: translateY(-4px);
            box-shadow: ${theme.shadows.xl};
            border-color: transparent;
          }
        `;
      
      default:
        return `
          background: ${theme.colors.background.paper};
          border: 1px solid ${theme.colors.border.light};
          box-shadow: ${theme.shadows.sm};
          border-radius: ${theme.borderRadius['2xl']};
        `;
    }
  }}
  
  /* Hover effects */
  ${({ $hover, $clickable, theme }) => ($hover || $clickable) && `
    cursor: ${$clickable ? 'pointer' : 'default'};
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.xl};
    }
  `}
  
  /* Clickable styles */
  ${({ $clickable, theme }) => $clickable && `
    cursor: pointer;
    user-select: none;
    
    &:active {
      transform: translateY(-2px) scale(0.98);
    }
    
    &:focus-visible {
      outline: 2px solid ${theme.colors.solid.brand.primary};
      outline-offset: 2px;
    }
  `}
  
  /* Glass morphism effect for gradient variant */
  ${({ $variant }) => $variant === 'gradient' && `
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    
    /* iOS Safari fix */
    @supports (-webkit-backdrop-filter: blur(20px)) {
      backdrop-filter: blur(20px);
    }
  `}
  
  /* Responsive adjustments */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ $padding, theme }) => {
      switch ($padding) {
        case 'sm':
          return `padding: ${theme.spacing[3]};`;
        case 'md':
          return `padding: ${theme.spacing[4]};`;
        case 'xl':
          return `padding: ${theme.spacing[6]};`;
        default: // lg
          return `padding: ${theme.spacing[5]};`;
      }
    }}
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    
    ${({ $padding, theme }) => {
      switch ($padding) {
        case 'sm':
          return `padding: ${theme.spacing[2]};`;
        case 'md':
          return `padding: ${theme.spacing[3]};`;
        case 'xl':
          return `padding: ${theme.spacing[5]};`;
        default: // lg
          return `padding: ${theme.spacing[4]};`;
      }
    }}
  }
  
  /* Print styles */
  @media print {
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.colors.border.medium};
    transform: none !important;
    
    &::before {
      display: none;
    }
  }
`;

export default Card;