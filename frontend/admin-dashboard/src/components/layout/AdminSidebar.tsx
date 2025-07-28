import React, { useState } from 'react';
import styled from 'styled-components';
import { AdminPermission } from '@/modules/authentication/types/auth.types';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string | number;
  children?: MenuItem[];
  permissions?: string[];
}

interface AdminSidebarProps {
  currentModule: string;
  permissions: AdminPermission[];
  isCollapsed: boolean;
  onItemClick: (item: MenuItem) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    href: '/',
    permissions: ['dashboard.read'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'analytics',
    href: '/analytics',
    permissions: ['analytics.read'],
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'users',
    href: '/users',
    permissions: ['users.read'],
    children: [
      { id: 'customers', label: 'Customers', icon: 'customer', href: '/users/customers', permissions: ['users.customers.read'] },
      { id: 'drivers', label: 'Drivers', icon: 'driver', href: '/users/drivers', permissions: ['users.drivers.read'] },
      { id: 'merchants', label: 'Merchants', icon: 'merchant', href: '/users/merchants', permissions: ['users.merchants.read'] },
      { id: 'admins', label: 'Admins', icon: 'admin', href: '/users/admins', permissions: ['users.admins.read'] },
    ],
  },
  {
    id: 'fleet',
    label: 'Fleet Management',
    icon: 'fleet',
    href: '/fleet',
    permissions: ['fleet.read'],
    children: [
      { id: 'vehicles', label: 'Vehicles', icon: 'vehicle', href: '/fleet/vehicles', permissions: ['fleet.vehicles.read'] },
      { id: 'tracking', label: 'GPS Tracking', icon: 'tracking', href: '/fleet/tracking', permissions: ['fleet.tracking.read'] },
      { id: 'maintenance', label: 'Maintenance', icon: 'maintenance', href: '/fleet/maintenance', permissions: ['fleet.maintenance.read'] },
    ],
  },
  {
    id: 'orders',
    label: 'Order Management',
    icon: 'orders',
    href: '/orders',
    badge: '24',
    permissions: ['orders.read'],
    children: [
      { id: 'rides', label: 'Rides', icon: 'ride', href: '/orders/rides', permissions: ['orders.rides.read'] },
      { id: 'deliveries', label: 'Deliveries', icon: 'delivery', href: '/orders/deliveries', permissions: ['orders.deliveries.read'] },
      { id: 'drone-orders', label: 'Drone Orders', icon: 'drone', href: '/orders/drone', permissions: ['orders.drone.read'] },
      { id: 'ride-share', label: 'Ride Sharing', icon: 'rideshare', href: '/orders/rideshare', permissions: ['orders.rideshare.read'] },
    ],
  },
  {
    id: 'financial',
    label: 'Financial',
    icon: 'financial',
    href: '/financial',
    permissions: ['financial.read'],
    children: [
      { id: 'transactions', label: 'Transactions', icon: 'transaction', href: '/financial/transactions', permissions: ['financial.transactions.read'] },
      { id: 'payouts', label: 'Payouts', icon: 'payout', href: '/financial/payouts', permissions: ['financial.payouts.read'] },
      { id: 'reports', label: 'Reports', icon: 'report', href: '/financial/reports', permissions: ['financial.reports.read'] },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: 'operations',
    href: '/operations',
    permissions: ['operations.read'],
    children: [
      { id: 'emergency', label: 'Emergency', icon: 'emergency', href: '/operations/emergency', permissions: ['operations.emergency.read'] },
      { id: 'quality', label: 'Quality Control', icon: 'quality', href: '/operations/quality', permissions: ['operations.quality.read'] },
      { id: 'monitoring', label: 'Monitoring', icon: 'monitor', href: '/operations/monitoring', permissions: ['operations.monitoring.read'] },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: 'marketing',
    href: '/marketing',
    permissions: ['marketing.read'],
    children: [
      { id: 'campaigns', label: 'Campaigns', icon: 'campaign', href: '/marketing/campaigns', permissions: ['marketing.campaigns.read'] },
      { id: 'promotions', label: 'Promotions', icon: 'promotion', href: '/marketing/promotions', permissions: ['marketing.promotions.read'] },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    href: '/settings',
    permissions: ['settings.read'],
    children: [
      { id: 'system', label: 'System', icon: 'system', href: '/settings/system', permissions: ['settings.system.read'] },
      { id: 'security', label: 'Security', icon: 'security', href: '/settings/security', permissions: ['settings.security.read'] },
      { id: 'integrations', label: 'Integrations', icon: 'integration', href: '/settings/integrations', permissions: ['settings.integrations.read'] },
    ],
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentModule,
  permissions,
  isCollapsed,
  onItemClick,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['users', 'fleet', 'orders']);

  const hasPermission = (requiredPermissions?: string[]) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    return requiredPermissions.some(permission =>
      permissions.some(p => p.actions.includes(permission))
    );
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (!hasPermission(item.permissions)) return null;

    const isActive = currentModule === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <MenuItemContainer key={item.id}>
        <MenuItemButton
          $level={level}
          $isActive={isActive}
          $isCollapsed={isCollapsed}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onItemClick(item);
            }
          }}
        >
          <MenuItemIcon $icon={item.icon} />
          {!isCollapsed && (
            <>
              <MenuItemLabel>{item.label}</MenuItemLabel>
              {item.badge && (
                <MenuItemBadge>{item.badge}</MenuItemBadge>
              )}
              {hasChildren && (
                <ChevronIcon $isExpanded={isExpanded} />
              )}
            </>
          )}
        </MenuItemButton>

        {hasChildren && isExpanded && !isCollapsed && (
          <SubMenuContainer>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </SubMenuContainer>
        )}
      </MenuItemContainer>
    );
  };

  return (
    <SidebarContainer $isCollapsed={isCollapsed}>
      <SidebarHeader $isCollapsed={isCollapsed}>
        {!isCollapsed && (
          <HeaderContent>
            <HeaderTitle className="gradient-text">Control Center</HeaderTitle>
            <HeaderSubtitle>Platform Management</HeaderSubtitle>
          </HeaderContent>
        )}
      </SidebarHeader>

      <MenuContainer>
        {menuItems.map(item => renderMenuItem(item))}
      </MenuContainer>

      <SidebarFooter $isCollapsed={isCollapsed}>
        {!isCollapsed && (
          <FooterContent>
            <SystemStatus>
              <StatusIndicator $status="online" />
              <StatusText>All Systems Online</StatusText>
            </SystemStatus>
            <FooterStats>
              <StatItem>
                <StatLabel>Uptime</StatLabel>
                <StatValue>99.9%</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Response</StatLabel>
                <StatValue>120ms</StatValue>
              </StatItem>
            </FooterStats>
          </FooterContent>
        )}
      </SidebarFooter>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.nav<{ $isCollapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 72px;
  bottom: 0;
  width: ${({ $isCollapsed }) => $isCollapsed ? '80px' : '280px'};
  background: ${({ theme }) => theme.colors.gradients.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: width ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  z-index: ${({ theme }) => theme.zIndex.docked};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    transform: ${({ $isCollapsed }) => $isCollapsed ? 'translateX(-100%)' : 'translateX(0)'};
    width: 280px;
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const SidebarHeader = styled.div<{ $isCollapsed: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  text-align: center;
`;

const HeaderTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const HeaderSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const MenuContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border.medium} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.medium};
    border-radius: 2px;
  }
`;

const MenuItemContainer = styled.div``;

const MenuItemButton = styled.button<{
  $level: number;
  $isActive: boolean;
  $isCollapsed: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-left: ${({ $level, $isCollapsed, theme }) => 
    $isCollapsed ? theme.spacing.lg : `calc(${theme.spacing.lg} + ${$level * 16}px)`};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  background: ${({ $isActive, theme }) => 
    $isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
  border-left: ${({ $isActive, theme }) => 
    $isActive ? `3px solid ${theme.colors.functional.info}` : '3px solid transparent'};
  font-weight: ${({ $isActive, theme }) => 
    $isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  position: relative;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: ${({ theme }) => theme.colors.text.primary};
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }
`;

const MenuItemIcon = styled.div<{ $icon: string }>`
  width: 20px;
  height: 20px;
  background: currentColor;
  mask: ${({ $icon }) => `url("/icons/${$icon}.svg") no-repeat center`};
  mask-size: contain;
  flex-shrink: 0;
`;

const MenuItemLabel = styled.span`
  margin-left: ${({ theme }) => theme.spacing.md};
  flex: 1;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const MenuItemBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: ${({ theme }) => theme.colors.functional.error};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const ChevronIcon = styled.div<{ $isExpanded: boolean }>`
  width: 16px;
  height: 16px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m9 18 6-6-6-6' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") no-repeat center;
  mask-size: contain;
  margin-left: ${({ theme }) => theme.spacing.sm};
  transition: transform ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  transform: ${({ $isExpanded }) => $isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const SubMenuContainer = styled.div`
  background: rgba(59, 130, 246, 0.05);
  border-left: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-left: ${({ theme }) => theme.spacing.lg};
`;

const SidebarFooter = styled.div<{ $isCollapsed: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  background: rgba(59, 130, 246, 0.05);
`;

const FooterContent = styled.div``;

const SystemStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatusIndicator = styled.div<{ $status: 'online' | 'offline' | 'warning' }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'online': return theme.colors.functional.success;
      case 'warning': return theme.colors.functional.warning;
      case 'offline': return theme.colors.functional.error;
      default: return theme.colors.functional.success;
    }
  }};
  animation: ${({ $status }) => $status === 'online' ? 'subtleGlow 2s infinite' : 'none'};
`;

const StatusText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const FooterStats = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export default AdminSidebar;