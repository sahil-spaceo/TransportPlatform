'use client';

import React from 'react';
import styled from 'styled-components';
import { KPIMetric } from '../types/dashboard.types';

const CardContainer = styled.div<{ $color: string }>`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.animations.duration.normal} 
              ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme, $color }) => {
      switch ($color) {
        case 'success': return theme.colors.functional.success;
        case 'warning': return theme.colors.functional.warning;
        case 'error': return theme.colors.functional.error;
        case 'info': return theme.colors.functional.info;
        case 'secondary': return theme.colors.gradients.secondary;
        default: return theme.colors.gradients.primary;
      }
    }};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const IconContainer = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${({ theme, $color }) => {
    switch ($color) {
      case 'success': return theme.colors.functional.successGradient;
      case 'warning': return theme.colors.functional.warningGradient;
      case 'error': return theme.colors.functional.errorGradient;
      case 'info': return theme.colors.functional.infoGradient;
      case 'secondary': return theme.colors.gradients.secondary;
      default: return theme.colors.gradients.primary;
    }
  }};
  color: ${({ theme, $color }) => {
    switch ($color) {
      case 'success': return theme.colors.functional.success;
      case 'warning': return theme.colors.functional.warning;
      case 'error': return theme.colors.functional.error;
      case 'info': return theme.colors.functional.info;
      default: return theme.colors.text.inverse;
    }
  }};
  margin-left: auto;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  line-height: 1.1;
`;

const ChangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ChangeValue = styled.span<{ $type: 'positive' | 'negative' | 'neutral' }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'positive': return theme.colors.functional.success;
      case 'negative': return theme.colors.functional.error;
      default: return theme.colors.text.secondary;
    }
  }};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: ${({ $type }) => {
      switch ($type) {
        case 'positive': return '"↗"';
        case 'negative': return '"↘"';
        default: return '"→"';
      }
    }};
    font-size: 16px;
  }
`;

const ChangeLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const SparklineContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  height: 32px;
  width: 100%;
  position: relative;
`;

const SparklineSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const SparklinePath = styled.path<{ $color: string }>`
  fill: none;
  stroke: ${({ theme, $color }) => {
    switch ($color) {
      case 'success': return theme.colors.functional.success;
      case 'warning': return theme.colors.functional.warning;
      case 'error': return theme.colors.functional.error;
      case 'info': return theme.colors.functional.info;
      default: return theme.colors.text.primary;
    }
  }};
  stroke-width: 2;
  opacity: 0.7;
`;

const SparklineArea = styled.path<{ $color: string }>`
  fill: ${({ theme, $color }) => {
    switch ($color) {
      case 'success': return `${theme.colors.functional.success}20`;
      case 'warning': return `${theme.colors.functional.warning}20`;
      case 'error': return `${theme.colors.functional.error}20`;
      case 'info': return `${theme.colors.functional.info}20`;
      default: return `${theme.colors.text.primary}10`;
    }
  }};
  opacity: 0.3;
`;

interface KPICardProps {
  metric: KPIMetric;
  showSparkline?: boolean;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  metric, 
  showSparkline = true,
  onClick 
}) => {
  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      if (metric.unit === 'currency') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: metric.precision || 0,
        }).format(value);
      } else if (metric.unit === 'percentage') {
        return `${value.toFixed(metric.precision || 1)}%`;
      } else {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: metric.precision || 0,
        }).format(value);
      }
    }
    return value;
  };

  const generateSparklinePath = (data: number[], width: number, height: number) => {
    if (!data || data.length < 2) return '';
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const generateSparklineArea = (data: number[], width: number, height: number) => {
    if (!data || data.length < 2) return '';
    
    const path = generateSparklinePath(data, width, height);
    const lastPoint = data.length - 1;
    const lastX = (lastPoint / (data.length - 1)) * width;
    
    return `${path} L ${lastX},${height} L 0,${height} Z`;
  };

  return (
    <CardContainer 
      $color={metric.color} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <CardHeader>
        <CardContent>
          <Title>{metric.title}</Title>
          <Value>{formatValue(metric.value)}</Value>
          <ChangeContainer>
            <ChangeValue $type={metric.changeType}>
              {metric.change}
            </ChangeValue>
            <ChangeLabel>vs last period</ChangeLabel>
          </ChangeContainer>
        </CardContent>
        <IconContainer $color={metric.color}>
          {metric.icon}
        </IconContainer>
      </CardHeader>

      {showSparkline && metric.trend && metric.trend.length > 1 && (
        <SparklineContainer>
          <SparklineSVG viewBox="0 0 200 32">
            <SparklineArea
              $color={metric.color}
              d={generateSparklineArea(metric.trend, 200, 32)}
            />
            <SparklinePath
              $color={metric.color}
              d={generateSparklinePath(metric.trend, 200, 32)}
            />
          </SparklineSVG>
        </SparklineContainer>
      )}
    </CardContainer>
  );
};