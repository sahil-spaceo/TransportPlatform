import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface HeaderProps {
  transparent?: boolean;
  fixed?: boolean;
  ctaVariant?: 'primary' | 'secondary';
}

const Header: React.FC<HeaderProps> = ({ 
  transparent = false, 
  fixed = true,
  ctaVariant = 'primary' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer
        $transparent={transparent}
        $fixed={fixed}
        $scrolled={isScrolled}
      >
        <HeaderContent className="container">
          {/* Logo Section */}
          <LogoSection>
            <Link href="/" onClick={closeMenu}>
              <Logo>
                <LogoText className="gradient-text">FlexFlow</LogoText>
                <LogoTagline>Flexibility in Motion</LogoTagline>
              </Logo>
            </Link>
          </LogoSection>

          {/* Desktop Navigation */}
          <Navigation className="hidden-md">
            <NavList>
              <NavItem>
                <NavDropdown>
                  <DropdownTrigger>Services</DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link href="/services/ride-hailing">
                        <DropdownLink>
                          <ServiceIcon>🚕</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Ride-Hailing</ServiceName>
                            <ServiceDesc>On-demand rides</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/services/ride-sharing">
                        <DropdownLink>
                          <ServiceIcon>🤝</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Ride-Sharing</ServiceName>
                            <ServiceDesc>Save 30-40%</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/services/food-delivery">
                        <DropdownLink>
                          <ServiceIcon>🍕</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Food Delivery</ServiceName>
                            <ServiceDesc>Fast & fresh</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/services/drone-delivery">
                        <DropdownLink>
                          <ServiceIcon>🛸</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Drone Delivery</ServiceName>
                            <ServiceDesc>Ultra-fast premium</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/services/car-rental">
                        <DropdownLink>
                          <ServiceIcon>🚗</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Car Rental</ServiceName>
                            <ServiceDesc>Flexible rentals</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/services/package-delivery">
                        <DropdownLink>
                          <ServiceIcon>📦</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Package Delivery</ServiceName>
                            <ServiceDesc>Secure & fast</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </NavDropdown>
              </NavItem>
              
              <NavItem>
                <NavDropdown>
                  <DropdownTrigger>Solutions</DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link href="/solutions/customers">
                        <DropdownLink>
                          <ServiceIcon>👑</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>For Customers</ServiceName>
                            <ServiceDesc>All services in one app</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/solutions/drivers">
                        <DropdownLink>
                          <ServiceIcon>🚗</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>For Drivers</ServiceName>
                            <ServiceDesc>Earn more, work flexible</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/solutions/merchants">
                        <DropdownLink>
                          <ServiceIcon>🏪</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>For Merchants</ServiceName>
                            <ServiceDesc>Grow your business</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/solutions/enterprise">
                        <DropdownLink>
                          <ServiceIcon>🏢</ServiceIcon>
                          <ServiceDetails>
                            <ServiceName>Enterprise</ServiceName>
                            <ServiceDesc>Custom solutions</ServiceDesc>
                          </ServiceDetails>
                        </DropdownLink>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </NavDropdown>
              </NavItem>
              
              <NavItem>
                <Link href="/company/about">
                  <NavLink>About</NavLink>
                </Link>
              </NavItem>
              
              <NavItem>
                <Link href="/resources/help">
                  <NavLink>Help</NavLink>
                </Link>
              </NavItem>
            </NavList>
          </Navigation>

          {/* CTA Buttons */}
          <CTASection>
            <CTAButton $variant="secondary" href="/contact" className="hidden-md">
              Contact
            </CTAButton>
            <CTAButton $variant={ctaVariant} href="/download" $primary>
              Download App
            </CTAButton>
            
            {/* Mobile Menu Button */}
            <MobileMenuButton 
              onClick={toggleMenu}
              $isOpen={isMenuOpen}
              className="hidden-lg"
            >
              <MenuIconLine />
              <MenuIconLine />
              <MenuIconLine />
            </MobileMenuButton>
          </CTASection>
        </HeaderContent>
      </HeaderContainer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <MobileMenuOverlay onClick={closeMenu}>
          <MobileMenu onClick={(e) => e.stopPropagation()}>
              <MobileMenuHeader>
                <Link href="/" onClick={closeMenu}>
                  <MobileLogo className="gradient-text">FlexFlow</MobileLogo>
                </Link>
                <CloseButton onClick={closeMenu}>×</CloseButton>
              </MobileMenuHeader>

              <MobileNavigation>
                <MobileNavSection>
                  <MobileNavTitle>Services</MobileNavTitle>
                  <MobileNavList>
                    <MobileNavItem>
                      <Link href="/services/ride-hailing" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🚕</span> Ride-Hailing
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/services/ride-sharing" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🤝</span> Ride-Sharing
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/services/food-delivery" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🍕</span> Food Delivery
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/services/drone-delivery" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🛸</span> Drone Delivery
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/services/car-rental" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🚗</span> Car Rental
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/services/package-delivery" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>📦</span> Package Delivery
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                  </MobileNavList>
                </MobileNavSection>

                <MobileNavSection>
                  <MobileNavTitle>Solutions</MobileNavTitle>
                  <MobileNavList>
                    <MobileNavItem>
                      <Link href="/solutions/customers" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>👑</span> For Customers
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/solutions/drivers" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🚗</span> For Drivers
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/solutions/merchants" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🏪</span> For Merchants
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/solutions/enterprise" onClick={closeMenu}>
                        <MobileNavLink>
                          <span>🏢</span> Enterprise
                        </MobileNavLink>
                      </Link>
                    </MobileNavItem>
                  </MobileNavList>
                </MobileNavSection>

                <MobileNavSection>
                  <MobileNavList>
                    <MobileNavItem>
                      <Link href="/company/about" onClick={closeMenu}>
                        <MobileNavLink>About</MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/resources/help" onClick={closeMenu}>
                        <MobileNavLink>Help</MobileNavLink>
                      </Link>
                    </MobileNavItem>
                    <MobileNavItem>
                      <Link href="/contact" onClick={closeMenu}>
                        <MobileNavLink>Contact</MobileNavLink>
                      </Link>
                    </MobileNavItem>
                  </MobileNavList>
                </MobileNavSection>
              </MobileNavigation>

              <MobileCTASection>
                <CTAButton $variant="primary" href="/download" $fullWidth>
                  Download App
                </CTAButton>
              </MobileCTASection>
          </MobileMenu>
        </MobileMenuOverlay>
      )}
    </>
  );
};

// Styled Components
const HeaderContainer = styled.header<{
  $transparent: boolean;
  $fixed: boolean;
  $scrolled: boolean;
}>`
  position: ${({ $fixed }) => $fixed ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ $transparent, $scrolled, theme }) => 
    $transparent && !$scrolled 
      ? 'rgba(255, 255, 255, 0.1)' 
      : theme.colors.background.paper
  };
  backdrop-filter: ${({ $transparent, $scrolled }) => 
    $transparent && !$scrolled ? 'blur(10px)' : 'blur(20px)'
  };
  border-bottom: 1px solid ${({ $transparent, $scrolled, theme }) => 
    $transparent && !$scrolled 
      ? 'rgba(255, 255, 255, 0.1)' 
      : theme.colors.border.light
  };
  box-shadow: ${({ $transparent, $scrolled, theme }) => 
    $transparent && !$scrolled ? 'none' : theme.shadows.sm
  };
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
  height: 80px;
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoSection = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: color 300ms ease-out;
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  line-height: 1;
  margin: 0;
`;

const LogoTagline = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: 2px;
`;

const Navigation = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 600px;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavDropdown = styled.div`
  position: relative;
  
  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const NavLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: color 300ms ease-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.solid.brand.primary};
    background: ${({ theme }) => theme.colors.solid.neutral[50]};
  }
`;

const DropdownTrigger = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: color 300ms ease-out;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.solid.brand.primary};
    background: ${({ theme }) => theme.colors.solid.neutral[50]};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.solid.brand.primary};
    outline-offset: 2px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing[3]};
  min-width: 280px;
  opacity: 0;
  visibility: hidden;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const DropdownItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DropdownLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  transition: all 300ms ease-out;
  
  &:hover {
    background: ${({ theme }) => theme.colors.solid.neutral[50]};
    transform: translateX(4px);
  }
`;

const ServiceIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  flex-shrink: 0;
`;

const ServiceDetails = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2px;
`;

const ServiceDesc = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const CTASection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-shrink: 0;
`;

const CTAButton = styled.a<{
  $variant: 'primary' | 'secondary';
  $primary?: boolean;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  white-space: nowrap;
  transition: all 300ms ease-out;
  
  &:active {
    transform: scale(0.95);
  }
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  
  ${({ $variant, theme }) => $variant === 'primary' && `
    background: ${theme.colors.gradients.primary};
    color: ${theme.colors.text.inverse};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
      filter: brightness(1.1);
    }
  `}
  
  ${({ $variant, theme }) => $variant === 'secondary' && `
    background: transparent;
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.medium};
    
    &:hover {
      background: ${theme.colors.solid.neutral[50]};
      border-color: ${theme.colors.solid.brand.primary};
      color: ${theme.colors.solid.brand.primary};
    }
  `}
`;

const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: ${({ theme }) => theme.spacing[3]};
  
  &:focus {
    outline: none;
  }
`;

const MenuIconLine = styled.span<{ $isOpen?: boolean }>`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.text.primary};
  border-radius: 1px;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  transform-origin: center;
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.overlay};
  z-index: ${({ theme }) => theme.zIndex.modal};
  backdrop-filter: blur(4px);
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.background.paper};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const MobileLogo = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  margin: 0;
`;

const CloseButton = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.tertiary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 300ms ease-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MobileNavigation = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const MobileNavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileNavTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 ${({ theme }) => theme.spacing[3]} 0;
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileNavLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  transition: all 300ms ease-out;
  
  span {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.solid.neutral[50]};
    transform: translateX(4px);
  }
`;

const MobileCTASection = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export default Header;