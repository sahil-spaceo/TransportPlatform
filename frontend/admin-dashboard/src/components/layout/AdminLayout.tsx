import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { adminTheme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { Notification, BreadcrumbItem } from '@/types/theme.types';
import { useAuth } from '@/modules/authentication/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentModule: string;
  pageTitle: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

// Mock notifications - replace with actual data from context/API

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Emergency Alert',
    message: 'Multiple drivers reporting traffic issue on Highway 101',
    type: 'error',
    priority: 'urgent',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: false,
    actionUrl: '/operations/emergency',
  },
  {
    id: '2',
    title: 'Revenue Milestone',
    message: 'Daily revenue target of $50k achieved!',
    type: 'success',
    priority: 'medium',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    read: false,
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Scheduled maintenance in 2 hours',
    type: 'warning',
    priority: 'medium',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    read: true,
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentModule,
  pageTitle,
  breadcrumbs,
  actions,
}) => {
  const { state } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = (item: any) => {
    console.log('Navigate to:', item.href);
    // Replace with actual navigation logic
  };

  // Don't render if user is not authenticated
  if (!state.user) {
    return null;
  }

  return (
    <ThemeProvider theme={adminTheme}>
      <GlobalStyles />
      <LayoutContainer>
        <AdminHeader
          user={state.user}
          notifications={mockNotifications}
          onMenuToggle={toggleSidebar}
          isMenuOpen={!isSidebarCollapsed}
        />
        
        <AdminSidebar
          currentModule={currentModule}
          permissions={state.user.permissions}
          isCollapsed={isSidebarCollapsed}
          onItemClick={handleMenuClick}
        />
        
        <MainContentArea $sidebarCollapsed={isSidebarCollapsed}>
          {children}
        </MainContentArea>

        {/* Mobile overlay */}
        {isMobile && !isSidebarCollapsed && (
          <MobileOverlay onClick={toggleSidebar} />
        )}
      </LayoutContainer>
    </ThemeProvider>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
`;

const MainContentArea = styled.div<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${({ $sidebarCollapsed }) => $sidebarCollapsed ? '80px' : '280px'};
  margin-top: 72px;
  transition: margin-left ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.overlay};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  backdrop-filter: blur(4px);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export default AdminLayout;