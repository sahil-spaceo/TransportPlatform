'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { useTranslation } from 'react-i18next';
import { isRTL } from '@/i18n/simple-config';

// Styled Components
const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const HeroDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const ServiceCard = styled(GradientCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.heavy};
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const ServiceTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const ServiceDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  flex: 1;
`;

const ServiceFeatures = styled.ul<{ $isRTL?: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};

  li {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    position: relative;
    padding-left: ${({ $isRTL }) => $isRTL ? '0' : ({ theme }) => theme.spacing.lg};
    padding-right: ${({ $isRTL }) => $isRTL ? ({ theme }) => theme.spacing.lg : '0'};
    text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};

    &::before {
      content: '✓';
      position: absolute;
      left: ${({ $isRTL }) => $isRTL ? 'auto' : '0'};
      right: ${({ $isRTL }) => $isRTL ? '0' : 'auto'};
      color: ${({ theme }) => theme.colors.functional.success.main};
      font-weight: bold;
    }
  }
`;

const ServiceBadge = styled.div<{ $type: 'premium' | 'gold' | null }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $type, theme }) => {
    if ($type === 'gold') {
      return `
        background: ${theme.colors.subscription.gold.gradient};
        color: white;
      `;
    }
    if ($type === 'premium') {
      return `
        background: ${theme.colors.subscription.silver.gradient};
        color: white;
      `;
    }
    return '';
  }}
`;

// Services data
const services = [
  {
    id: 'rides',
    icon: '🚕',
    title: 'Taxi & Rides',
    description: 'Quick and reliable transportation with professional drivers',
    features: [
      'Professional drivers',
      'Real-time tracking', 
      'Multiple vehicle types',
      'Instant booking'
    ],
    href: '/services/rides',
    badge: null
  },
  {
    id: 'food',
    icon: '🍕',
    title: 'Food Delivery',
    description: 'Order from your favorite restaurants with fast delivery',
    features: [
      'Wide restaurant selection',
      'Hot food guarantee',
      'Live order tracking',
      'Contactless delivery'
    ],
    href: '/services/food',
    badge: null
  },
  {
    id: 'packages',
    icon: '📦',
    title: 'Package Delivery',
    description: 'Secure and fast package delivery service',
    features: [
      'Same-day delivery',
      'Package insurance',
      'Signature confirmation',
      'Fragile item handling'
    ],
    href: '/services/packages',
    badge: null
  },
  {
    id: 'rental',
    icon: '🚗',
    title: 'Car Rental',
    description: 'Rent vehicles for hours, days, or longer periods',
    features: [
      'Flexible rental periods',
      'Various vehicle types',
      'Full insurance coverage',
      'Fuel included options'
    ],
    href: '/services/rental',
    badge: null
  },
  {
    id: 'drone',
    icon: '🛸',
    title: 'Drone Delivery',
    description: 'Ultra-fast aerial delivery for urgent items',
    features: [
      'Sub-30 minute delivery',
      'Eco-friendly transport',
      'Weather monitoring',
      'Premium packaging'
    ],
    href: '/services/packages?type=drone',
    badge: 'premium' as const
  },
  {
    id: 'rideshare',
    icon: '🤝',
    title: 'Ride Share',
    description: 'Share rides and save 30-40% on transportation costs',
    features: [
      '30-40% cost savings',
      'Verified co-passengers',
      'Flexible matching',
      'Environmental impact'
    ],
    href: '/services/rides?type=share',
    badge: 'gold' as const
  }
];

// Main Services Component
export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLang = i18n.language;
  const isCurrentRTL = isRTL(currentLang);

  const handleServiceClick = (href: string) => {
    router.push(href);
  };

  return (
    <Layout>
      <ServicesContainer>
        {/* Hero Section */}
        <HeroSection>
          <GradientHeading level="h1" gradient="primary" align="center">
            Our Services
          </GradientHeading>
          <HeroDescription>
            Discover our comprehensive range of transportation and delivery services. 
            From quick rides to drone delivery, we've got all your mobility needs covered.
          </HeroDescription>
        </HeroSection>

        {/* Services Grid */}
        <ServicesGrid>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              variant="elevated"
              hoverable
              clickable
              onClick={() => handleServiceClick(service.href)}
              style={{ position: 'relative' }}
            >
              {service.badge && (
                <ServiceBadge $type={service.badge}>
                  {service.badge === 'gold' ? 'Gold Only' : 'Premium'}
                </ServiceBadge>
              )}
              
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              
              <ServiceFeatures $isRTL={isCurrentRTL}>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContainer>
    </Layout>
  );
}