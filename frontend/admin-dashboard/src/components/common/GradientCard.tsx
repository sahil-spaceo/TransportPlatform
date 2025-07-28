import React from 'react';
import styled, { css } from 'styled-components';

interface GradientCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  hover = false,
  clickable = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $hover={hover}
      $clickable={clickable}
      onClick={clickable ? onClick : undefined}
      className={className}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

const getVariantStyles = (variant: string) => {
  const variants = {
    default: css`
      background: ${({ theme }) => theme.colors.background.paper};
      border: 1px solid ${({ theme }) => theme.colors.border.light};
      box-shadow: ${({ theme }) => theme.shadows.sm};
    `,
    elevated: css`
      background: ${({ theme }) => theme.colors.background.paper};
      border: 1px solid ${({ theme }) => theme.colors.border.light};
      box-shadow: ${({ theme }) => theme.shadows.lg};
    `,
    glass: css`
      background: ${({ theme }) => theme.colors.gradients.card};
      backdrop-filter: blur(10px);
      border: 1px solid ${({ theme }) => theme.colors.border.gradient};
      box-shadow: ${({ theme }) => theme.shadows.gradient};
    `,
    gradient: css`
      background: ${({ theme }) => theme.colors.gradients.primary};
      color: ${({ theme }) => theme.colors.text.primary};
      border: none;
      box-shadow: ${({ theme }) => theme.shadows.gradient};
    `,
  };

  return variants[variant as keyof typeof variants] || variants.default;
};

const getPaddingStyles = (padding: string) => {
  const paddings = {
    none: css`
      padding: 0;
    `,
    small: css`
      padding: ${({ theme }) => theme.spacing.md};
    `,
    medium: css`
      padding: ${({ theme }) => theme.spacing.lg};
    `,
    large: css`
      padding: ${({ theme }) => theme.spacing.xl};
    `,
  };

  return paddings[padding as keyof typeof paddings] || paddings.medium;
};

const StyledCard = styled.div<{
  $variant: string;
  $padding: string;
  $hover: boolean;
  $clickable: boolean;
}>`
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  position: relative;
  overflow: hidden;
  
  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $padding }) => getPaddingStyles($padding)}
  
  ${({ $hover }) => $hover && css`
    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: ${({ theme }) => theme.shadows.xl};
    }
  `}
  
  ${({ $clickable }) => $clickable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
    
    &:active {
      transform: translateY(0);
      transition: transform ${({ theme }) => theme.animations.duration.fast};
    }
  `}
  
  /* Glass morphism effect enhancement */
  ${({ $variant }) => $variant === 'glass' && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      bottom: 0;
      background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    }
  `}
  
  /* Gradient animation for gradient variant */
  ${({ $variant }) => $variant === 'gradient' && css`
    background-size: 200% 200%;
    animation: lightGradientShift 12s ease infinite;
    
    &:hover {
      animation-duration: 6s;
    }
  `}
`;

// Card Header Component
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
  }
`;

// Card Body Component
export const CardBody = styled.div`
  flex: 1;
`;

// Card Footer Component
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  loading = false,
}) => {
  return (
    <GradientCard variant="glass" hover>
      <StatsCardContainer>
        <StatsCardHeader>
          <StatsCardTitle>{title}</StatsCardTitle>
          {icon && <StatsCardIcon>{icon}</StatsCardIcon>}
        </StatsCardHeader>
        
        <StatsCardValue $loading={loading}>
          {loading ? <LoadingSkeleton /> : value}
        </StatsCardValue>
        
        {change && !loading && (
          <StatsCardChange $changeType={changeType}>
            <ChangeIndicator $changeType={changeType} />
            {change}
          </StatsCardChange>
        )}
      </StatsCardContainer>
    </GradientCard>
  );
};

const StatsCardContainer = styled.div`
  position: relative;
`;

const StatsCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatsCardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.gradients.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatsCardValue = styled.div<{ $loading: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1;
`;

const StatsCardChange = styled.div<{ $changeType: 'positive' | 'negative' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ $changeType, theme }) => {
    switch ($changeType) {
      case 'positive': return theme.colors.functional.success;
      case 'negative': return theme.colors.functional.error;
      default: return theme.colors.text.secondary;
    }
  }};
`;

const ChangeIndicator = styled.div<{ $changeType: 'positive' | 'negative' | 'neutral' }>`
  width: 16px;
  height: 16px;
  background: currentColor;
  mask: ${({ $changeType }) => {
    switch ($changeType) {
      case 'positive': return `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m7 14 5-5 5 5' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") no-repeat center`;
      case 'negative': return `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m17 10-5 5-5-5' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") no-repeat center`;
      default: return `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 12h14' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e") no-repeat center`;
    }
  }};
  mask-size: contain;
`;

const LoadingSkeleton = styled.div`
  width: 120px;
  height: 36px;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.solid.neutral[200]} 0%, 
    ${({ theme }) => theme.colors.solid.neutral[100]} 50%, 
    ${({ theme }) => theme.colors.solid.neutral[200]} 100%
  );
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export default GradientCard;