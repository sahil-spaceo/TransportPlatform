'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle';
import { LanguageSelector } from '@/components/atoms/LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

// Styled Components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background.paper}F2;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  box-shadow: ${({ theme }) => theme.shadows.light};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  overflow: visible; /* Allow dropdowns to extend beyond header */
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  min-width: 0; /* Allow shrinking */
  overflow: visible; /* Allow dropdowns to extend beyond content */

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    height: 60px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoText = styled.div`
  margin-left: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Navigation = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  justify-content: center;
  min-width: 0; /* Allow shrinking */
  overflow: hidden; /* Prevent overflow */

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background.paper}FA;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.md};
    transform: translateY(${({ $isOpen }) => $isOpen ? '0' : '-100%'});
    transition: transform ${({ theme }) => theme.animations.duration.normal};
    z-index: ${({ theme }) => theme.zIndex.dropdown};
    flex: none;
    justify-content: flex-start;
    overflow: visible;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: nowrap;
  min-width: 0; /* Allow shrinking */
  overflow: hidden; /* Prevent overflow */

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => theme.spacing.md};
    overflow: visible;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $active }) => $active ? theme.colors.primary.main : theme.colors.text.secondary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal};
  position: relative;
  white-space: nowrap;
  flex-shrink: 1; /* Allow shrinking */
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.light};
  }

  ${({ $active, theme }) => $active && css`
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: ${theme.colors.primary.gradient};
      border-radius: 1px;
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    white-space: normal;
    flex-shrink: 0;
    text-overflow: initial;
    overflow: visible;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0; /* Prevent shrinking */
  overflow: visible; /* Allow dropdowns to extend */

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.md};
    border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: background ${({ theme }) => theme.animations.duration.normal};
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }
`;

const UserAvatar = styled.div<{ $tier: 'basic' | 'silver' | 'gold' }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  background: ${({ theme, $tier }) => theme.colors.subscription[$tier].gradient};
  border: 2px solid ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const UserName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const UserTier = styled.span<{ $tier: 'basic' | 'silver' | 'gold' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuIcon = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: currentColor;
    transition: all ${({ theme }) => theme.animations.duration.normal};
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translateY(8px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'};
    }
  }
`;

const SubscriptionBadge = styled.div<{ $tier: 'basic' | 'silver' | 'gold' }>`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme, $tier }) => theme.colors.subscription[$tier].gradient};
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: white;
  font-weight: bold;

  &::after {
    content: ${({ $tier }) => {
      switch ($tier) {
        case 'basic': return '"B"';
        case 'silver': return '"S"';
        case 'gold': return '"G"';
        default: return '""';
      }
    }};
  }
`;

const UserDropdown = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.background.paper}F2;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: ${({ theme }) => theme.zIndex.sticky + 100}; /* Higher than header */
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transform: translateY(${({ $isOpen }) => $isOpen ? '0' : '-10px'});
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: all ${({ theme }) => theme.animations.duration.normal};
  padding: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    min-width: auto;
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const DropdownHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DropdownUserName = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DropdownUserTier = styled.div<{ $tier: 'basic' | 'silver' | 'gold' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

// Navigation items configuration
const getNavigationItems = (user: any, t: any) => {
  const baseItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.services'), href: '/services' },
    { label: t('navigation.about'), href: '/about' },
  ];

  if (user) {
    return [
      { label: t('navigation.dashboard'), href: '/dashboard' },
      { label: t('navigation.myRides'), href: '/services/rides' },
      { label: t('navigation.foodDelivery'), href: '/services/food' },
      { label: t('navigation.packages'), href: '/services/packages' },
      { label: t('navigation.carRental'), href: '/services/rental' },
      { label: t('navigation.orderHistory'), href: '/history' },
      ...((user.subscriptionTier || 'basic') === 'gold' ? [
        { label: t('navigation.rideShare'), href: '/ride-share' },
      ] : []),
      ...((user.subscriptionTier || 'basic') !== 'basic' ? [
        { label: t('navigation.droneDelivery'), href: '/drone-delivery' },
      ] : []),
    ];
  }

  return baseItems;
};

// Main Header Component
export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userDropdownPosition, setUserDropdownPosition] = useState({ top: 0, right: 0 });
  const [isUserDropdownPositioned, setIsUserDropdownPositioned] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigationItems = getNavigationItems(user, t);

  // Close dropdown when clicking outside and handle position updates
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (isUserDropdownOpen && isUserDropdownPositioned) {
        updateUserDropdownPosition();
      }
    };

    const handleScroll = () => {
      if (isUserDropdownOpen && isUserDropdownPositioned) {
        updateUserDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isUserDropdownOpen, isUserDropdownPositioned]);

  // Helper function to determine if a navigation item is active
  const isActiveRoute = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = () => {
    router.push(isAuthenticated ? '/dashboard' : '/');
  };

  // Calculate user dropdown position
  const updateUserDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setUserDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // Add scroll offset
        right: window.innerWidth - rect.right
      });
      setIsUserDropdownPositioned(true);
    }
  };

  const handleUserProfileClick = () => {
    if (!isUserDropdownOpen) {
      setIsUserDropdownPositioned(false);
      // Use requestAnimationFrame to ensure position is calculated before showing
      requestAnimationFrame(() => {
        updateUserDropdownPosition();
        setIsUserDropdownOpen(true);
      });
    } else {
      setIsUserDropdownOpen(false);
      setIsUserDropdownPositioned(false);
    }
    setIsMobileMenuOpen(false);
  };

  const handleProfileNavigation = () => {
    router.push('/profile');
    setIsUserDropdownOpen(false);
  };

  const handleBillingNavigation = () => {
    router.push('/billing');
    setIsUserDropdownOpen(false);
  };

  const handleDropdownLogout = async () => {
    setIsUserDropdownOpen(false);
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavLinkClick = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={handleLogoClick}>
          <LogoIcon>F</LogoIcon>
          <LogoText>FlexFlow</LogoText>
        </Logo>

        <Navigation $isOpen={isMobileMenuOpen}>
          <NavLinks>
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                $active={isActiveRoute(item.href)}
                onClick={() => handleNavLinkClick(item.href)}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <UserSection>
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {isAuthenticated && user ? (
              <UserProfile ref={dropdownRef} onClick={handleUserProfileClick}>
                <div style={{ position: 'relative' }}>
                  <UserAvatar $tier={user.subscriptionTier || 'basic'}>
                    {(user.firstName || 'U')[0]}{(user.lastName || 'U')[0]}
                  </UserAvatar>
                  <SubscriptionBadge $tier={user.subscriptionTier || 'basic'} />
                </div>
                <UserInfo>
                  <UserName>{user.firstName || 'User'} {user.lastName || ''}</UserName>
                  <UserTier $tier={user.subscriptionTier || 'basic'}>{user.subscriptionTier || 'basic'}</UserTier>
                </UserInfo>
                
                {/* Dropdown Arrow */}
                <div style={{ 
                  marginLeft: '4px',
                  transform: isUserDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  fontSize: '12px',
                  color: 'currentColor',
                  opacity: 0.6
                }}>
                  ▼
                </div>

                <UserDropdown 
                  $isOpen={isUserDropdownOpen && isUserDropdownPositioned}
                  style={{
                    top: `${userDropdownPosition.top}px`,
                    right: `${userDropdownPosition.right}px`
                  }}
                >
                  <DropdownHeader>
                    <DropdownUserName>{user.firstName || 'User'} {user.lastName || ''}</DropdownUserName>
                    <DropdownUserTier $tier={user.subscriptionTier || 'basic'}>
                      {user.subscriptionTier || 'basic'} member
                    </DropdownUserTier>
                  </DropdownHeader>

                  <DropdownItem onClick={handleProfileNavigation}>
                    <span>👤</span>
                    {t('navigation.myProfile')}
                  </DropdownItem>

                  <DropdownItem onClick={handleBillingNavigation}>
                    <span>💳</span>
                    {t('navigation.billingPlans')}
                  </DropdownItem>

                  <DropdownItem onClick={() => { router.push('/history'); setIsUserDropdownOpen(false); }}>
                    <span>📋</span>
                    {t('navigation.orderHistory')}
                  </DropdownItem>

                  <DropdownDivider />

                  <DropdownItem onClick={handleDropdownLogout}>
                    <span>🚪</span>
                    {t('navigation.signOut')}
                  </DropdownItem>
                </UserDropdown>
              </UserProfile>
            ) : (
              <>
                <GradientButton
                  variant="ghost"
                  size="small"
                  onClick={() => router.push('/auth/login')}
                >
                  {t('auth.login.title')}
                </GradientButton>
                
                <GradientButton
                  variant="primary"
                  size="small"
                  onClick={() => router.push('/auth/signup')}
                >
                  {t('auth.register.title')}
                </GradientButton>
              </>
            )}
          </UserSection>
        </Navigation>

        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          <MenuIcon $isOpen={isMobileMenuOpen}>
            <span />
            <span />
            <span />
          </MenuIcon>
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;