'use client';

import React from 'react';
import { ProtectedRoute } from '@/modules/authentication/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import MainContent from '@/components/layout/MainContent';
import { KPICard } from '@/modules/dashboard/components/KPICard';
import { RevenueChart } from '@/modules/dashboard/components/RevenueChart';
import { ActivityFeed } from '@/modules/dashboard/components/ActivityFeed';
import { GeographicMap } from '@/modules/dashboard/components/GeographicMap';
import { QuickActionsPanel } from '@/modules/dashboard/components/QuickActionsPanel';
import { useDashboard } from '@/modules/dashboard/hooks/useDashboard';
import styled from 'styled-components';

const DashboardPage = () => {
  const {
    kpiMetrics,
    recentActivity,
    refreshDashboard,
    toggleRealTime,
    isLoading,
    hasError,
    isRealTimeEnabled,
    lastUpdated,
    connectionStatus
  } = useDashboard();

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Dashboard', icon: 'dashboard' },
  ];

  return (
    <ProtectedRoute requiredPermissions={['dashboard.view']}>
      <AdminLayout
        currentModule="dashboard"
        pageTitle="Dashboard Overview"
        breadcrumbs={breadcrumbs}
      >
        <MainContent
          title="Dashboard Overview"
          breadcrumbs={breadcrumbs}
          autoRefresh={isRealTimeEnabled}
          lastUpdated={lastUpdated || undefined}
        >
          <DashboardHeader>
            <HeaderInfo>
              <StatusIndicator $status={connectionStatus}>
                <StatusDot $status={connectionStatus} />
                {connectionStatus === 'connected' && isRealTimeEnabled ? 'Live Updates' : 
                 connectionStatus === 'connected' ? 'Connected' : 'Offline'}
              </StatusIndicator>
              {lastUpdated && (
                <LastUpdated>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </LastUpdated>
              )}
            </HeaderInfo>
            <HeaderActions>
              <ActionButton onClick={toggleRealTime}>
                {isRealTimeEnabled ? '⏸️ Pause' : '▶️ Resume'} Live Updates
              </ActionButton>
              <ActionButton onClick={refreshDashboard} disabled={isLoading}>
                🔄 {isLoading ? 'Refreshing...' : 'Refresh'}
              </ActionButton>
            </HeaderActions>
          </DashboardHeader>

          {hasError && (
            <ErrorBanner>
              ⚠️ {hasError}
            </ErrorBanner>
          )}

          <DashboardGrid>
            {/* KPI Metrics Row */}
            <MetricsSection>
              {kpiMetrics.map((metric) => (
                <KPICard 
                  key={metric.id} 
                  metric={metric}
                  showSparkline={true}
                />
              ))}
            </MetricsSection>

            {/* Charts Row */}
            <ChartsSection>
              <ChartContainer>
                <RevenueChart height={350} />
              </ChartContainer>
              <ChartContainer>
                <GeographicMap height={350} />
              </ChartContainer>
            </ChartsSection>

            {/* Activity and Actions Row */}
            <BottomSection>
              <ActivityContainer>
                <ActivityFeed 
                  activities={recentActivity} 
                  isLive={isRealTimeEnabled}
                  maxHeight={400}
                />
              </ActivityContainer>
              <ActionsContainer>
                <QuickActionsPanel />
              </ActionsContainer>
            </BottomSection>
          </DashboardGrid>
        </MainContent>
      </AdminLayout>
    </ProtectedRoute>
  );
};

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StatusIndicator = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'connected': return theme.colors.functional.success;
      case 'connecting': return theme.colors.functional.warning;
      case 'disconnected': return theme.colors.text.secondary;
      case 'failed': return theme.colors.functional.error;
      default: return theme.colors.text.secondary;
    }
  }};
`;

const StatusDot = styled.div<{ $status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, $status }) => {
    switch ($status) {
      case 'connected': return theme.colors.functional.success;
      case 'connecting': return theme.colors.functional.warning;
      case 'disconnected': return theme.colors.text.secondary;
      case 'failed': return theme.colors.functional.error;
      default: return theme.colors.text.secondary;
    }
  }};
  animation: ${({ $status }) => $status === 'connected' ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const LastUpdated = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gradients.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.functional.errorGradient};
  color: ${({ theme }) => theme.colors.functional.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.functional.error}20;
`;

const DashboardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const MetricsSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartsSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ChartContainer = styled.div`
  min-height: 400px;
`;

const BottomSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const ActivityContainer = styled.div`
  min-height: 450px;
`;

const ActionsContainer = styled.div`
  min-height: 450px;
`;


export default DashboardPage;