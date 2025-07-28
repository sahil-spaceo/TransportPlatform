'use client';

import React from 'react';
import styled from 'styled-components';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';

// Styled Components
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary.gradient};
  color: black;
  margin-top: auto;
  border-top: none;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.h6};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const FooterLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  transition: color ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    color: rgba(0, 0, 0, 1);
    text-decoration: underline;
  }
`;

const FooterDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: rgba(0, 0, 0, 0.8);
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const FooterBrand = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  font-size: 1.2rem;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 1);
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const LegalLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;

  &:hover {
    color: rgba(0, 0, 0, 1);
    text-decoration: underline;
  }
`;

// Footer data
const footerData = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  services: {
    title: 'Services',
    links: [
      { label: 'Ride Booking', href: '/services/rides' },
      { label: 'Food Delivery', href: '/services/food' },
      { label: 'Package Delivery', href: '/services/packages' },
      { label: 'Car Rental', href: '/services/rental' },
      { label: 'Drone Delivery', href: '/services/drone' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety', href: '/safety' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Community Guidelines', href: '/guidelines' },
      { label: 'Report Issue', href: '/report' },
    ],
  },
};

const socialLinks = [
  { platform: 'Facebook', icon: '📘', url: 'https://facebook.com/flexflow' },
  { platform: 'Twitter', icon: '🐦', url: 'https://twitter.com/flexflow' },
  { platform: 'Instagram', icon: '📷', url: 'https://instagram.com/flexflow' },
  { platform: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/flexflow' },
];

// Main Footer Component
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer id="footer">
      <FooterContent>
        <FooterGrid>
          {/* Brand Section */}
          <FooterSection>
            <FooterBrand>
              <GradientHeading
                level="h3"
                style={{ 
                  color: 'black', 
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem' 
                }}
              >
                FlexFlow
              </GradientHeading>
              <FooterDescription>
                Your all-in-one transportation platform offering flexibility in motion. 
                From taxi rides to drone delivery, we're revolutionizing how you move 
                and receive services.
              </FooterDescription>
            </FooterBrand>
            
            <SocialLinks>
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterSection>

          {/* Company Links */}
          <FooterSection>
            <FooterTitle>{footerData.company.title}</FooterTitle>
            {footerData.company.links.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>

          {/* Services Links */}
          <FooterSection>
            <FooterTitle>{footerData.services.title}</FooterTitle>
            {footerData.services.links.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>

          {/* Support Links */}
          <FooterSection>
            <FooterTitle>{footerData.support.title}</FooterTitle>
            {footerData.support.links.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {currentYear} FlexFlow. All rights reserved. | Flexibility in Motion
          </Copyright>
          
          <LegalLinks>
            <LegalLink href="/legal/privacy">Privacy Policy</LegalLink>
            <LegalLink href="/legal/terms">Terms of Service</LegalLink>
            <LegalLink href="/legal/cookies">Cookie Policy</LegalLink>
            <LegalLink href="/legal/accessibility">Accessibility</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;