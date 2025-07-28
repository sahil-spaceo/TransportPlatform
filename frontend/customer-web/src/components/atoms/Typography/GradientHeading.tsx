'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { SubscriptionTier } from '@/types/theme.types';

// Heading Level Type
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type GradientType = 'primary' | 'secondary' | 'tier' | 'multicolor';

// Styled Heading Component
const StyledHeading = styled.h1<{
  $level: HeadingLevel;
  $gradient: GradientType;
  $tier?: SubscriptionTier;
  $align?: 'left' | 'center' | 'right';
  $glow?: boolean;
  $animated?: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin: 0;
  
  /* Font size based on heading level */
  ${({ $level, theme }) => {
    const sizes = {
      h1: theme.typography.fontSize.h1,
      h2: theme.typography.fontSize.h2,
      h3: theme.typography.fontSize.h3,
      h4: theme.typography.fontSize.h4,
      h5: theme.typography.fontSize.h5,
      h6: theme.typography.fontSize.h6,
    };
    return css`font-size: ${sizes[$level]};`;
  }}

  /* Text alignment */
  text-align: ${({ $align }) => $align || 'left'};

  /* Gradient background based on type */
  ${({ $gradient, $tier, theme }) => {
    let gradientValue;
    
    switch ($gradient) {
      case 'secondary':
        gradientValue = theme.colors.secondary.gradient;
        break;
      case 'tier':
        gradientValue = $tier ? theme.colors.subscription[$tier].gradient : theme.colors.primary.gradient;
        break;
      case 'multicolor':
        gradientValue = 'linear-gradient(45deg, #ffecd2, #fcb69f, #ff9a9e, #a8edea, #fed6e3)';
        break;
      default: // primary
        gradientValue = theme.colors.primary.gradient;
    }

    return css`
      background: ${gradientValue};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
    `;
  }}

  /* Glow effect */
  ${({ $glow, theme }) => $glow && css`
    text-shadow: 0 0 20px rgba(255, 154, 158, 0.6);
    filter: drop-shadow(0 0 10px rgba(255, 154, 158, 0.3));
  `}

  /* Animation */
  ${({ $animated }) => $animated && css`
    animation: gradientShift 8s ease infinite;
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}

  /* Responsive font sizes */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ $level, theme }) => {
      if ($level === 'h1') {
        return css`font-size: ${theme.typography.fontSize.h2};`;
      }
      if ($level === 'h2') {
        return css`font-size: ${theme.typography.fontSize.h3};`;
      }
      return '';
    }}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $level, theme }) => {
      if ($level === 'h1') {
        return css`font-size: ${theme.typography.fontSize.h3};`;
      }
      if ($level === 'h2') {
        return css`font-size: ${theme.typography.fontSize.h4};`;
      }
      if ($level === 'h3') {
        return css`font-size: ${theme.typography.fontSize.h5};`;
      }
      return '';
    }}
  }

  /* RTL Support */
  [dir="rtl"] & {
    ${({ $gradient, $tier, theme }) => {
      let gradientValue;
      
      switch ($gradient) {
        case 'secondary':
          gradientValue = 'linear-gradient(-135deg, #a8edea 0%, #fed6e3 100%)';
          break;
        case 'tier':
          if ($tier === 'basic') {
            gradientValue = 'linear-gradient(-135deg, #667eea 0%, #764ba2 100%)';
          } else if ($tier === 'silver') {
            gradientValue = 'linear-gradient(-135deg, #bdc3c7 0%, #2c3e50 100%)';
          } else if ($tier === 'gold') {
            gradientValue = 'linear-gradient(-135deg, #f7971e 0%, #ffd200 100%)';
          } else {
            gradientValue = 'linear-gradient(-135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)';
          }
          break;
        case 'multicolor':
          gradientValue = 'linear-gradient(-45deg, #ffecd2, #fcb69f, #ff9a9e, #a8edea, #fed6e3)';
          break;
        default:
          gradientValue = 'linear-gradient(-135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)';
      }

      return css`
        background: ${gradientValue};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      `;
    }}
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text.primary};
    background: none;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Print styles */
  @media print {
    -webkit-text-fill-color: #000 !important;
    background: none !important;
    color: #000 !important;
    text-shadow: none !important;
    filter: none !important;
  }
`;

// Component Props Interface
export interface GradientHeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  gradient?: GradientType;
  tier?: SubscriptionTier;
  align?: 'left' | 'center' | 'right';
  glow?: boolean;
  animated?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

// Main Component
export const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  level = 'h1',
  gradient = 'primary',
  tier,
  align = 'left',
  glow = false,
  animated = false,
  className,
  id,
  style,
}) => {
  return (
    <StyledHeading
      as={level}
      $level={level}
      $gradient={gradient}
      $tier={tier}
      $align={align}
      $glow={glow}
      $animated={animated}
      className={className}
      id={id}
      style={style}
    >
      {children}
    </StyledHeading>
  );
};

export default GradientHeading;