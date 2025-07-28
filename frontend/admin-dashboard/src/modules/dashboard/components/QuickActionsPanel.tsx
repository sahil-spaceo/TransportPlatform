'use client';

import React from 'react';
import styled from 'styled-components';
import GradientButton from '@/components/common/GradientButton';
import { QuickAction } from '../types/dashboard.types';
import { usePermissions } from '@/modules/authentication/hooks/useAuth';

const PanelContainer = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PanelTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const ActionCard = styled.div<{ $color: string }>`
  background: ${({ theme }) => theme.colors.gradients.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme, $color }) => {
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
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

const ActionIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
  position: relative;
`;

const ActionBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${({ theme }) => theme.colors.functional.error};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const ActionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: 1.3;
`;

const ActionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

const EmergencySection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const EmergencyTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.functional.error};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '🚨';
    font-size: 16px;
  }
`;

const EmergencyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Mock quick actions data
const mockQuickActions: QuickAction[] = [
  {
    id: 'manage-users',
    title: 'Manage Users',
    description: 'View and edit user accounts',
    icon: '👥',
    color: 'primary',
    action: () => console.log('Navigate to user management'),
    permissions: ['users.view']
  },
  {
    id: 'fleet-status',
    title: 'Fleet Status',
    description: 'Monitor active vehicles',
    icon: '🚗',
    color: 'info',
    action: () => console.log('Navigate to fleet management'),
    permissions: ['fleet.view'],
    badge: '156'
  },
  {
    id: 'orders-queue',
    title: 'Orders Queue',
    description: 'Process pending orders',
    icon: '📋',
    color: 'warning',
    action: () => console.log('Navigate to orders'),
    permissions: ['orders.view'],
    badge: '23'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View performance reports',
    icon: '📊',
    color: 'success',
    action: () => console.log('Navigate to analytics'),
    permissions: ['analytics.view']
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Send platform updates',
    icon: '📢',
    color: 'secondary',
    action: () => console.log('Open notification center'),
    permissions: ['notifications.send']
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure platform',
    icon: '⚙️',
    color: 'info',
    action: () => console.log('Navigate to settings'),
    permissions: ['settings.manage']
  }
];

const emergencyActions: QuickAction[] = [
  {
    id: 'emergency-stop',
    title: 'Emergency Stop',
    description: 'Halt all operations',
    icon: '🛑',
    color: 'error',
    action: () => console.log('Emergency stop activated'),
    permissions: ['emergency.stop']
  },
  {
    id: 'incident-report',
    title: 'Report Incident',
    description: 'Log safety incident',
    icon: '📝',
    color: 'warning',
    action: () => console.log('Open incident report'),
    permissions: ['incidents.create']
  }
];

interface QuickActionsPanelProps {
  actions?: QuickAction[];
  showEmergencyActions?: boolean;
}

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  actions = mockQuickActions,
  showEmergencyActions = true
}) => {
  const { hasPermission } = usePermissions();

  const filteredActions = actions.filter(action => 
    !action.permissions || action.permissions.some(permission => hasPermission(permission))
  );

  const filteredEmergencyActions = emergencyActions.filter(action => 
    !action.permissions || action.permissions.some(permission => hasPermission(permission))
  );

  const handleActionClick = (action: QuickAction) => {
    action.action();
  };

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Quick Actions</PanelTitle>
      </PanelHeader>

      <ActionsGrid>
        {filteredActions.map((action) => (
          <ActionCard
            key={action.id}
            $color={action.color}
            onClick={() => handleActionClick(action)}
          >
            <ActionIcon $color={action.color}>
              {action.icon}
              {action.badge && (
                <ActionBadge>{action.badge}</ActionBadge>
              )}
            </ActionIcon>
            <ActionTitle>{action.title}</ActionTitle>
            <ActionDescription>{action.description}</ActionDescription>
          </ActionCard>
        ))}
      </ActionsGrid>

      {showEmergencyActions && filteredEmergencyActions.length > 0 && (
        <EmergencySection>
          <EmergencyTitle>Emergency Actions</EmergencyTitle>
          <EmergencyGrid>
            {filteredEmergencyActions.map((action) => (
              <GradientButton
                key={action.id}
                variant="error"
                size="small"
                onClick={() => handleActionClick(action)}
              >
                {action.icon} {action.title}
              </GradientButton>
            ))}
          </EmergencyGrid>
        </EmergencySection>
      )}
    </PanelContainer>
  );
};