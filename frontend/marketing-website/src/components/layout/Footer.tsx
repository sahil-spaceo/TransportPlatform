import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent className="container">
        {/* Main Footer Content */}
        <FooterMain>
          {/* Company Section */}
          <FooterSection>
            <FooterLogo>
              <LogoText className="gradient-text">FlexFlow</LogoText>
              <LogoTagline>Flexibility in Motion</LogoTagline>
            </FooterLogo>
            <FooterDescription>
              Experience the future of transportation with our comprehensive platform. 
              From ride-hailing to drone delivery, we're transforming how people move and 
              how goods are delivered.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="https://twitter.com/flexflowapp" target="_blank" rel="noopener noreferrer">
                <SocialIcon>𝕏</SocialIcon>
              </SocialLink>
              <SocialLink href="https://facebook.com/flexflowapp" target="_blank" rel="noopener noreferrer">
                <SocialIcon>📘</SocialIcon>
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/flexflow" target="_blank" rel="noopener noreferrer">
                <SocialIcon>💼</SocialIcon>
              </SocialLink>
              <SocialLink href="https://instagram.com/flexflowapp" target="_blank" rel="noopener noreferrer">
                <SocialIcon>📷</SocialIcon>
              </SocialLink>
              <SocialLink href="https://youtube.com/flexflow" target="_blank" rel="noopener noreferrer">
                <SocialIcon>📺</SocialIcon>
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          {/* Services Section */}
          <FooterSection>
            <FooterTitle>Services</FooterTitle>
            <FooterLinks>
              <FooterLinkItem>
                <Link href="/services/ride-hailing">
                  <FooterLink>🚕 Ride-Hailing</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/services/ride-sharing">
                  <FooterLink>🤝 Ride-Sharing</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/services/car-rental">
                  <FooterLink>🚗 Car Rental</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/services/food-delivery">
                  <FooterLink>🍕 Food Delivery</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/services/package-delivery">
                  <FooterLink>📦 Package Delivery</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/services/drone-delivery">
                  <FooterLink>🛸 Drone Delivery</FooterLink>
                </Link>
              </FooterLinkItem>
            </FooterLinks>
          </FooterSection>

          {/* Solutions Section */}
          <FooterSection>
            <FooterTitle>Solutions</FooterTitle>
            <FooterLinks>
              <FooterLinkItem>
                <Link href="/solutions/customers">
                  <FooterLink>👑 For Customers</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/solutions/drivers">
                  <FooterLink>🚗 For Drivers</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/solutions/merchants">
                  <FooterLink>🏪 For Merchants</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/solutions/enterprise">
                  <FooterLink>🏢 Enterprise</FooterLink>
                </Link>
              </FooterLinkItem>
            </FooterLinks>
          </FooterSection>

          {/* Company Section */}
          <FooterSection>
            <FooterTitle>Company</FooterTitle>
            <FooterLinks>
              <FooterLinkItem>
                <Link href="/company/about">
                  <FooterLink>About Us</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/company/careers">
                  <FooterLink>Careers</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/company/press">
                  <FooterLink>Press & Media</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/company/investors">
                  <FooterLink>Investors</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/resources/blog">
                  <FooterLink>Blog</FooterLink>
                </Link>
              </FooterLinkItem>
            </FooterLinks>
          </FooterSection>

          {/* Support Section */}
          <FooterSection>
            <FooterTitle>Support</FooterTitle>
            <FooterLinks>
              <FooterLinkItem>
                <Link href="/resources/help">
                  <FooterLink>Help Center</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/resources/safety">
                  <FooterLink>Safety</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/contact">
                  <FooterLink>Contact Us</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <Link href="/resources/sustainability">
                  <FooterLink>Sustainability</FooterLink>
                </Link>
              </FooterLinkItem>
            </FooterLinks>
          </FooterSection>

          {/* Newsletter Section */}
          <FooterSection $newsletter>
            <FooterTitle>Stay Updated</FooterTitle>
            <NewsletterForm>
              <NewsletterDescription>
                Get the latest news and updates about FlexFlow services and features.
              </NewsletterDescription>
              <NewsletterInputGroup>
                <NewsletterInput
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <NewsletterButton type="submit">
                  Subscribe
                </NewsletterButton>
              </NewsletterInputGroup>
              <NewsletterDisclaimer>
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </NewsletterDisclaimer>
            </NewsletterForm>
          </FooterSection>
        </FooterMain>

        {/* App Download Section */}
        <AppDownloadSection>
          <AppDownloadContent>
            <AppDownloadText>
              <AppDownloadTitle>Download FlexFlow</AppDownloadTitle>
              <AppDownloadDescription>
                Available on iOS and Android. Get all services in one app.
              </AppDownloadDescription>
            </AppDownloadText>
            <AppDownloadButtons>
              <AppStoreButton href="/download/ios" target="_blank">
                <AppStoreIcon>📱</AppStoreIcon>
                <AppStoreText>
                  <AppStoreLabel>Download on the</AppStoreLabel>
                  <AppStoreName>App Store</AppStoreName>
                </AppStoreText>
              </AppStoreButton>
              <AppStoreButton href="/download/android" target="_blank">
                <AppStoreIcon>🤖</AppStoreIcon>
                <AppStoreText>
                  <AppStoreLabel>Get it on</AppStoreLabel>
                  <AppStoreName>Google Play</AppStoreName>
                </AppStoreText>
              </AppStoreButton>
            </AppDownloadButtons>
          </AppDownloadContent>
        </AppDownloadSection>

        {/* Footer Bottom */}
        <FooterBottom>
          <FooterBottomLeft>
            <Copyright>
              © {currentYear} FlexFlow. All rights reserved.
            </Copyright>
            <LegalLinks>
              <LegalLink href="/legal/privacy">Privacy Policy</LegalLink>
              <LegalLink href="/legal/terms">Terms of Service</LegalLink>
              <LegalLink href="/legal/cookies">Cookie Policy</LegalLink>
            </LegalLinks>
          </FooterBottomLeft>
          <FooterBottomRight>
            <LanguageSelector>
              <LanguageIcon>🌐</LanguageIcon>
              <LanguageText>English (US)</LanguageText>
            </LanguageSelector>
          </FooterBottomRight>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.gradients.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: auto;
`;

const FooterContent = styled.div`
  padding: ${({ theme }) => theme.spacing[20]} 0 ${({ theme }) => theme.spacing[6]} 0;
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr) 1.5fr;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing[6]};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
    text-align: center;
  }
`;

const FooterSection = styled.div<{ $newsletter?: boolean }>`
  ${({ $newsletter }) => $newsletter && `
    @media (max-width: 1024px) {
      grid-column: 1 / -1;
    }
  `}
`;

const FooterLogo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const LogoText = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  margin: 0 0 ${({ theme }) => theme.spacing[1]} 0;
`;

const LogoTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0;
`;

const FooterDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.solid.neutral[100]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  transition: all 300ms ease-out;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.gradients.primary};
    transform: translateY(-4px) scale(1.05);
  }
`;

const SocialIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
`;

const FooterLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  transition: color 300ms ease-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.solid.brand.primary};
    transform: translateX(4px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const NewsletterForm = styled.form`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const NewsletterDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const NewsletterInputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all 300ms ease-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.solid.brand.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const NewsletterButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  white-space: nowrap;
  transition: all 300ms ease-out;
  
  &:active {
    transform: scale(0.95);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    filter: brightness(1.1);
  }
`;

const NewsletterDisclaimer = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0;
`;

const AppDownloadSection = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const AppDownloadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const AppDownloadText = styled.div`
  flex: 1;
`;

const AppDownloadTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
`;

const AppDownloadDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin: 0;
`;

const AppDownloadButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
  }
`;

const AppStoreButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.solid.black};
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-decoration: none;
  min-width: 160px;
  transition: all 300ms ease-out;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const AppStoreIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const AppStoreText = styled.div`
  text-align: left;
`;

const AppStoreLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.8;
  line-height: 1;
`;

const AppStoreName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: 1.2;
  margin-top: 2px;
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    text-align: center;
  }
`;

const FooterBottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const LegalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  transition: color 300ms ease-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.solid.brand.primary};
  }
`;

const FooterBottomRight = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageSelector = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 300ms ease-out;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.solid.brand.primary};
    color: ${({ theme }) => theme.colors.solid.brand.primary};
  }
`;

const LanguageIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const LanguageText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export default Footer;