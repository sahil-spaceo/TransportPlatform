import React, { useState } from 'react';
import styled from 'styled-components';
import { AdminUser } from '@/modules/authentication/types/auth.types';
import { Notification } from '@/types/theme.types';

interface AdminHeaderProps {
  user: AdminUser;
  notifications: Notification[];
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  user,
  notifications,
  onMenuToggle,
  isMenuOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onMenuToggle} $isOpen={isMenuOpen}>
          <MenuIcon />
        </MenuButton>
        <Logo>
          <LogoText className="gradient-text">FlexFlow</LogoText>
          <LogoSubtext>Admin</LogoSubtext>
        </Logo>
      </LeftSection>

      <CenterSection>
        <LiveStats>
          <StatItem>
            <StatLabel>Active Users</StatLabel>
            <StatValue>2,847</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Active Rides</StatLabel>
            <StatValue>156</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Revenue Today</StatLabel>
            <StatValue>$12,450</StatValue>
          </StatItem>
        </LiveStats>
      </CenterSection>

      <RightSection>
        <NotificationButton 
          onClick={() => setShowNotifications(!showNotifications)}
          $hasUnread={unreadCount > 0}
        >
          <NotificationIcon />
          {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
        </NotificationButton>

        <ProfileButton onClick={() => setShowProfile(!showProfile)}>
          <ProfileAvatar src={user.avatar || '/default-avatar.png'} alt={`${user.firstName} ${user.lastName}`} />
          <ProfileInfo>
            <ProfileName>{user.firstName} {user.lastName}</ProfileName>
            <ProfileRole>{user.role.name}</ProfileRole>
          </ProfileInfo>
          <ChevronIcon $isOpen={showProfile} />
        </ProfileButton>

        {showNotifications && (
          <NotificationDropdown>
            <DropdownHeader>
              <DropdownTitle>Notifications</DropdownTitle>
              <MarkAllRead>Mark all read</MarkAllRead>
            </DropdownHeader>
            <NotificationList>
              {notifications.slice(0, 5).map(notification => (
                <NotificationItem key={notification.id} $unread={!notification.read}>
                  <NotificationIcon />
                  <NotificationContent>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    <NotificationTime>
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </NotificationTime>
                  </NotificationContent>
                </NotificationItem>
              ))}
            </NotificationList>
            <DropdownFooter>
              <ViewAllButton>View All Notifications</ViewAllButton>
            </DropdownFooter>
          </NotificationDropdown>
        )}

        {showProfile && (
          <ProfileDropdown>
            <ProfileDropdownHeader>
              <ProfileDropdownAvatar src={user.avatar || '/default-avatar.png'} alt={`${user.firstName} ${user.lastName}`} />
              <ProfileDropdownInfo>
                <ProfileDropdownName>{user.firstName} {user.lastName}</ProfileDropdownName>
                <ProfileDropdownEmail>{user.email}</ProfileDropdownEmail>
              </ProfileDropdownInfo>
            </ProfileDropdownHeader>
            <ProfileDropdownMenu>
              <MenuItemButton>Profile Settings</MenuItemButton>
              <MenuItemButton>Account Security</MenuItemButton>
              <MenuItemButton>Preferences</MenuItemButton>
              <MenuItemDivider />
              <MenuItemButton $danger>Sign Out</MenuItemButton>
            </ProfileDropdownMenu>
          </ProfileDropdown>
        )}
      </RightSection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradients.primary};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: ${({ theme }) => theme.shadows.gradient};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(59, 130, 246, 0.1);
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};

  &:hover {
    background: rgba(59, 130, 246, 0.15);
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1.1)'};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 12h18M3 6h18M3 18h18' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e") no-repeat center;
  mask-size: contain;
`;

const Logo = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
`;

const LogoSubtext = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.8;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CenterSection = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
  }
`;

const LiveStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

const NotificationButton = styled.button<{ $hasUnread: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(59, 130, 246, ${({ $hasUnread }) => $hasUnread ? '0.15' : '0.1'});
  color: ${({ theme }) => theme.colors.functional.info};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  animation: ${({ $hasUnread }) => $hasUnread ? 'subtleGlow 2s infinite' : 'none'};

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: scale(1.1);
  }
`;

const NotificationIcon = styled.div`
  width: 20px;
  height: 20px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0' stroke='currentColor' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e") no-repeat center;
  mask-size: contain;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: ${({ theme }) => theme.colors.functional.error};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transform: translateY(-2px);
  }
`;

const ProfileAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
`;

const ProfileInfo = styled.div`
  text-align: left;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const ProfileName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
`;

const ProfileRole = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.8;
  line-height: 1.2;
`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  width: 16px;
  height: 16px;
  background: currentColor;
  mask: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m6 9 6 6 6-6' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e") no-repeat center;
  mask-size: contain;
  transition: transform ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const NotificationDropdown = styled.div`
  position: fixed;
  top: 72px;
  right: 16px;
  width: 360px;
  max-height: calc(100vh - 100px);
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  overflow: hidden;
  animation: slideInDown ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.spring};
  z-index: ${({ theme }) => theme.zIndex.banner};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100vw - 32px);
    right: 16px;
    left: 16px;
  }
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const DropdownTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const MarkAllRead = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.functional.info};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const NotificationList = styled.div`
  max-height: 280px;
  overflow-y: auto;
`;

const NotificationItem = styled.div<{ $unread: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ $unread, theme }) => $unread ? 'rgba(79, 172, 254, 0.05)' : 'transparent'};
  transition: background ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.solid.neutral[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const NotificationMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const DropdownFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ViewAllButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ProfileDropdown = styled.div`
  position: fixed;
  top: 72px;
  right: 16px;
  width: 280px;
  max-height: calc(100vh - 100px);
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  overflow: hidden;
  animation: slideInDown ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.spring};
  z-index: ${({ theme }) => theme.zIndex.banner};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100vw - 32px);
    right: 16px;
    left: 16px;
  }
`;

const ProfileDropdownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProfileDropdownAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
`;

const ProfileDropdownInfo = styled.div`
  flex: 1;
`;

const ProfileDropdownName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProfileDropdownEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.9;
`;

const ProfileDropdownMenu = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
`;

const MenuItemButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ $danger, theme }) => $danger ? theme.colors.functional.error : theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ $danger, theme }) => 
      $danger ? 'rgba(255, 87, 87, 0.1)' : theme.colors.solid.neutral[50]};
    transform: translateX(4px);
  }
`;

const MenuItemDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export default AdminHeader;