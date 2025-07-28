'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Layout } from '@/components/layout/Layout';
import { Footer } from '@/components/layout/Footer';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { useTranslation } from 'react-i18next';
import { isRTL } from '@/i18n/simple-config';

// Styled Components
const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.gradient};
  width: 100%;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SubscriptionSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const TierGrid = styled.div<{ $isRTL?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  
  /* RTL support for card ordering */
  ${({ $isRTL }) => $isRTL && `
    > *:nth-child(1) { order: 3; }
    > *:nth-child(2) { order: 2; }
    > *:nth-child(3) { order: 1; }
  `}
`;

const FeatureList = styled.ul<{ $isRTL?: boolean }>`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
`;

const FeatureItem = styled.li<{ $isRTL?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  position: relative;
  padding-left: ${({ $isRTL }) => $isRTL ? 0 : ({ theme }) => theme.spacing.lg};
  padding-right: ${({ $isRTL }) => $isRTL ? ({ theme }) => theme.spacing.lg : 0};
  
  &::before {
    content: '✓';
    position: absolute;
    left: ${({ $isRTL }) => $isRTL ? 'auto' : '0'};
    right: ${({ $isRTL }) => $isRTL ? '0' : 'auto'};
    color: ${({ theme }) => theme.colors.functional.success.main};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CTASection = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  backdrop-filter: blur(20px);
  margin: ${({ theme }) => theme.spacing['3xl']} 0 0 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;


// Main Page Component
export default function HomePage() {
  const router = useRouter();
  const { t, ready, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isCurrentRTL = isRTL(currentLang);
  
  // Fallback function for missing translations
  const safeT = (key: string, fallback?: string) => {
    if (!ready) return 'Loading...';
    const translation = t(key);
    return translation === key ? (fallback || key) : translation;
  };
  
  const services = [
    {
      title: safeT('homepage.services.taxi.title', '🚕 Taxi & Rides'),
      description: safeT('homepage.services.taxi.description', 'On-demand transportation with professional drivers. Quick, reliable, and available 24/7.'),
      url: '/services/rides',
    },
    {
      title: safeT('homepage.services.rideshare.title', '🤝 Ride Sharing'),
      description: safeT('homepage.services.rideshare.description', 'Save 30-40% by sharing rides with verified passengers. Exclusive to Gold members.'),
      url: '/services/rides?rideshare=true',
    },
    {
      title: safeT('homepage.services.rental.title', '🚗 Car Rental'),
      description: safeT('homepage.services.rental.description', 'Flexible car rentals by the hour, day, or week. Perfect for longer trips and adventures.'),
      url: '/services/rental',
    },
    {
      title: safeT('homepage.services.food.title', '🍕 Food Delivery'),
      description: safeT('homepage.services.food.description', 'Delicious meals from your favorite restaurants delivered hot and fresh to your door.'),
      url: '/services/food',
    },
    {
      title: safeT('homepage.services.packages.title', '📦 Package Delivery'),
      description: safeT('homepage.services.packages.description', 'Secure package delivery with real-time tracking. Same-day delivery available.'),
      url: '/services/packages',
    },
    {
      title: safeT('homepage.services.drone.title', '🛸 Drone Delivery'),
      description: safeT('homepage.services.drone.description', 'Ultra-fast aerial delivery for urgent items. Premium feature for Silver/Gold members.'),
      url: '/services/food',
    },
  ];

  const getSubscriptionFeatures = (tier: string) => {
    const features = t(`subscription.benefits.${tier}.features`, { returnObjects: true });
    if (Array.isArray(features)) return features;
    
    // Fallback features
    const fallbackFeatures = {
      basic: ['Standard ride booking', 'Basic delivery services', '60-second free cancellation', 'Standard customer support', 'Mobile app access'],
      silver: ['All Basic features', 'Drone delivery access', '5-minute free cancellation', 'Priority booking', 'Extended customer support', 'Exclusive offers'],
      gold: ['All Silver features', 'Exclusive ride sharing (30-40% savings)', '15-minute free cancellation', 'Concierge support', 'Premium vehicle access', 'VIP treatment', 'Early feature access']
    };
    return fallbackFeatures[tier as keyof typeof fallbackFeatures] || [];
  };

  const subscriptionTiers = [
    {
      name: safeT('subscription.tiers.basic', 'Basic'),
      tier: 'basic' as const,
      price: 'Free',
      description: safeT('subscription.benefits.basic.description', 'Essential features for everyday transportation'),
      features: getSubscriptionFeatures('basic'),
    },
    {
      name: safeT('subscription.tiers.silver', 'Silver'),
      tier: 'silver' as const,
      price: '$9.99/mo',
      description: safeT('subscription.benefits.silver.description', 'Enhanced features with drone delivery access'),
      features: getSubscriptionFeatures('silver'),
    },
    {
      name: safeT('subscription.tiers.gold', 'Gold'),
      tier: 'gold' as const,
      price: '$19.99/mo',
      description: safeT('subscription.benefits.gold.description', 'Premium experience with exclusive ride sharing'),
      features: getSubscriptionFeatures('gold'),
    },
  ];

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" noFooter transparent>
        <ContentWrapper>
        {/* Hero Section */}
        <HeroSection id="main-content">
          <GradientHeading 
            level="h1" 
            gradient="multicolor" 
            animated 
            glow
            align="center"
          >
            {safeT('homepage.hero.title', 'Welcome to FlexFlow')}
          </GradientHeading>
          
          <GradientHeading 
            level="h2" 
            gradient="secondary" 
            align="center"
          >
            {safeT('homepage.hero.subtitle', 'Flexibility in Motion')}
          </GradientHeading>
          
          <Subtitle>
            {safeT('homepage.hero.description', 'Your all-in-one transportation platform offering taxi services, ride sharing, car rentals, and premium delivery services including drone delivery. Experience the future of flexible transportation.')}
          </Subtitle>
          
          <ButtonGroup>
            <GradientButton 
              variant="primary" 
              size="large"
              onClick={() => router.push('/auth/signup')}
            >
              {safeT('homepage.hero.getStarted', 'Get Started')}
            </GradientButton>
            <GradientButton 
              variant="outline" 
              size="large"
              onClick={() => console.log('Learn more clicked')}
            >
              {safeT('homepage.hero.learnMore', 'Learn More')}
            </GradientButton>
          </ButtonGroup>
        </HeroSection>

        {/* Services Section */}
        <section>
          <GradientHeading level="h2" align="center" gradient="primary">
            {safeT('homepage.services.title', 'Our Services')}
          </GradientHeading>
          
          <ServicesGrid>
            {services.map((service, index) => (
              <GradientCard
                key={index}
                variant="glass"
                hoverable
                clickable
                header={{
                  title: service.title,
                  subtitle: service.description,
                }}
                onClick={() => router.push(service.url)}
              >
                <GradientButton variant="ghost" fullWidth>
                  {safeT('homepage.services.explore', 'Explore Service')}
                </GradientButton>
              </GradientCard>
            ))}
          </ServicesGrid>
        </section>

        {/* Subscription Tiers Section */}
        <SubscriptionSection>
          <GradientHeading level="h2" align="center" gradient="primary">
            {safeT('homepage.plans.title', 'Choose Your Plan')}
          </GradientHeading>
          
          <TierGrid $isRTL={isCurrentRTL}>
            {subscriptionTiers.map((tier, index) => (
              <GradientCard
                key={index}
                variant="elevated"
                tier={tier.tier}
                showTierBadge
                isRTL={isCurrentRTL}
                hoverable
                clickable
                header={{
                  title: tier.name,
                  subtitle: tier.price,
                  borderBottom: true,
                }}
                actions={{
                  children: (
                    <GradientButton 
                      variant="gradient" 
                      tier={tier.tier}
                      fullWidth
                      onClick={() => router.push('/billing')}
                    >
                      {safeT(`homepage.plans.choose${tier.tier.charAt(0).toUpperCase() + tier.tier.slice(1)}`, `Choose ${tier.name}`)}
                    </GradientButton>
                  ),
                  justify: 'center',
                }}
              >
                <p style={{ marginBottom: '1rem', textAlign: 'center' }}>
                  {tier.description}
                </p>
                
                <FeatureList $isRTL={isCurrentRTL}>
                  {tier.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex} $isRTL={isCurrentRTL}>
                      {feature}
                    </FeatureItem>
                  ))}
                </FeatureList>
              </GradientCard>
            ))}
          </TierGrid>
        </SubscriptionSection>

        {/* Call to Action Section */}
        <CTASection>
          <GradientHeading level="h2" align="center" gradient="primary">
            {safeT('homepage.cta.title', 'Ready to Experience FlexFlow?')}
          </GradientHeading>
          
          <Subtitle>
            {safeT('homepage.cta.description', 'Join thousands of satisfied customers who have made FlexFlow their go-to transportation platform. Start your journey today.')}
          </Subtitle>
          
          <ButtonGroup>
            <GradientButton 
              variant="primary" 
              size="large"
              onClick={() => router.push('/auth/signup')}
            >
              {safeT('homepage.cta.signUp', 'Sign Up Now')}
            </GradientButton>
            <GradientButton 
              variant="secondary" 
              size="large"
              onClick={() => console.log('Download app clicked')}
            >
              {safeT('homepage.cta.downloadApp', 'Download App')}
            </GradientButton>
          </ButtonGroup>
        </CTASection>
        </ContentWrapper>
      </Layout>
      <Footer />
    </PageContainer>
  );
}