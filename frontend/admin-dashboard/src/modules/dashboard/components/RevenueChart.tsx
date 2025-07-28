'use client';

import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { RevenueData } from '../types/dashboard.types';

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ChartControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ControlButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $active }) => 
    $active ? theme.colors.gradients.primary : theme.colors.background.paper};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text.inverse : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast};

  &:hover {
    background: ${({ theme, $active }) => 
      $active ? theme.colors.gradients.primary : theme.colors.gradients.secondary};
    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

const ChartContent = styled.div`
  flex: 1;
  min-height: 300px;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Mock data for development
const mockRevenueData: RevenueData[] = [
  { period: 'Jan', revenue: 124560, orders: 1234, avgOrderValue: 100.89, growth: 12.5 },
  { period: 'Feb', revenue: 138740, orders: 1456, avgOrderValue: 95.23, growth: 11.4 },
  { period: 'Mar', revenue: 156890, orders: 1678, avgOrderValue: 93.47, growth: 13.1 },
  { period: 'Apr', revenue: 142350, orders: 1523, avgOrderValue: 93.42, growth: -9.3 },
  { period: 'May', revenue: 178920, orders: 1890, avgOrderValue: 94.70, growth: 25.7 },
  { period: 'Jun', revenue: 195640, orders: 2012, avgOrderValue: 97.33, growth: 9.3 },
  { period: 'Jul', revenue: 212830, orders: 2156, avgOrderValue: 98.72, growth: 8.8 },
  { period: 'Aug', revenue: 198760, orders: 2034, avgOrderValue: 97.73, growth: -6.6 },
  { period: 'Sep', revenue: 234510, orders: 2387, avgOrderValue: 98.28, growth: 18.0 },
  { period: 'Oct', revenue: 256780, orders: 2543, avgOrderValue: 101.02, growth: 9.5 },
  { period: 'Nov', revenue: 278940, orders: 2689, avgOrderValue: 103.75, growth: 8.6 },
  { period: 'Dec', revenue: 301250, orders: 2876, avgOrderValue: 104.73, growth: 8.0 },
];

interface RevenueChartProps {
  data?: RevenueData[];
  height?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data = mockRevenueData,
  height = 300 
}) => {
  const [chartType, setChartType] = React.useState<'area' | 'line' | 'bar'>('area');
  const [timeRange, setTimeRange] = React.useState<'7d' | '30d' | '90d' | '1y'>('1y');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Calculate summary statistics
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const avgGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '12px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: '4px 0', color: '#3b82f6' }}>
            Revenue: {formatCurrency(data.revenue)}
          </p>
          <p style={{ margin: '4px 0', color: '#10b981' }}>
            Orders: {formatNumber(data.orders)}
          </p>
          <p style={{ margin: '4px 0', color: '#f59e0b' }}>
            Avg Order: {formatCurrency(data.avgOrderValue)}
          </p>
          <p style={{ margin: '4px 0 0 0', color: data.growth >= 0 ? '#10b981' : '#ef4444' }}>
            Growth: {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={customTooltip} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={customTooltip} />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Revenue Analytics</ChartTitle>
        <ChartControls>
          <ControlButton 
            $active={chartType === 'area'} 
            onClick={() => setChartType('area')}
          >
            Area
          </ControlButton>
          <ControlButton 
            $active={chartType === 'line'} 
            onClick={() => setChartType('line')}
          >
            Line
          </ControlButton>
          <ControlButton 
            $active={chartType === 'bar'} 
            onClick={() => setChartType('bar')}
          >
            Bar
          </ControlButton>
        </ChartControls>
      </ChartHeader>

      <ChartContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </ChartContent>

      <StatsRow>
        <StatItem>
          <StatValue>{formatCurrency(totalRevenue)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{formatNumber(totalOrders)}</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{formatCurrency(avgOrderValue)}</StatValue>
          <StatLabel>Avg Order Value</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue style={{ color: avgGrowth >= 0 ? '#10b981' : '#ef4444' }}>
            {avgGrowth >= 0 ? '+' : ''}{avgGrowth.toFixed(1)}%
          </StatValue>
          <StatLabel>Avg Growth</StatLabel>
        </StatItem>
      </StatsRow>
    </ChartContainer>
  );
};