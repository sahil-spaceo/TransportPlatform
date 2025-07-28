'use client';

import React from 'react';
import styled from 'styled-components';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { useRouter } from 'next/navigation';

// Styled Components
const AboutContainer = styled.div`
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
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ContentSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FeatureCard = styled(GradientCard)`
  text-align: center;
  height: 100%;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const FeatureDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing['3xl']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(GradientCard)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.display2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StorySection = styled.section`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const StoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const StoryText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: ${({ theme }) => theme.spacing.lg} 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CTASection = styled.section`
  text-align: center;
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
`;

const CTATitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const CTADescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

// Features data
const features = [
  {
    icon: '🚀',
    title: 'Innovation First',
    description: 'Cutting-edge technology including drone delivery and AI-powered matching for the best transportation experience.'
  },
  {
    icon: '🌍',
    title: 'Sustainability',
    description: 'Committed to reducing carbon emissions through ride sharing, electric vehicles, and eco-friendly delivery options.'
  },
  {
    icon: '🤝',
    title: 'Community Focused',
    description: 'Building stronger communities by connecting people and supporting local businesses through our platform.'
  },
  {
    icon: '🛡️',
    title: 'Safety & Security',
    description: 'Your safety is our priority with verified drivers, real-time tracking, and 24/7 customer support.'
  },
  {
    icon: '💎',
    title: 'Premium Experience',
    description: 'Flexible subscription tiers offering enhanced features, priority support, and exclusive services.'
  },
  {
    icon: '⚡',
    title: 'Speed & Reliability',
    description: 'Fast response times, reliable service, and innovative solutions like drone delivery for urgent needs.'
  }
];

// Stats data
const stats = [
  { value: '1M+', label: 'Happy Customers' },
  { value: '50+', label: 'Cities Served' },
  { value: '24/7', label: 'Support Available' },
  { value: '99.9%', label: 'Uptime Guarantee' }
];

// Main About Component
export default function AboutPage() {
  const router = useRouter();

  return (
    <Layout>
      <AboutContainer>
        {/* Hero Section */}
        <HeroSection>
          <GradientHeading level="h1" gradient="primary" align="center">
            About FlexFlow
          </GradientHeading>
          <HeroDescription>
            Revolutionizing transportation with flexibility in motion. We're building the future of 
            mobility through innovative technology, sustainable practices, and exceptional service.
          </HeroDescription>
        </HeroSection>

        {/* Features Grid */}
        <ContentSection>
          <GradientHeading level="h2" gradient="primary" align="center" style={{ marginBottom: '2rem' }}>
            Why Choose FlexFlow?
          </GradientHeading>
          
          <ContentGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index} variant="elevated" hoverable>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </ContentGrid>
        </ContentSection>

        {/* Stats Section */}
        <ContentSection>
          <GradientHeading level="h2" gradient="primary" align="center" style={{ marginBottom: '2rem' }}>
            FlexFlow by the Numbers
          </GradientHeading>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index} variant="glass">
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </ContentSection>

        {/* Our Story Section */}
        <StorySection>
          <StoryContent>
            <GradientHeading level="h2" gradient="primary" align="center" style={{ marginBottom: '2rem' }}>
              Our Story
            </GradientHeading>
            
            <StoryText>
              FlexFlow was born from a simple idea: transportation should be flexible, reliable, and accessible to everyone. 
              We started as a small team of passionate innovators who believed that technology could transform how people move 
              through their daily lives.
            </StoryText>
            
            <StoryText>
              Today, we're proud to offer a comprehensive platform that includes everything from traditional taxi services 
              to cutting-edge drone delivery. Our mission is to provide flexible mobility solutions that adapt to your needs, 
              whether you're commuting to work, ordering dinner, or sending an urgent package across town.
            </StoryText>
            
            <StoryText>
              With sustainability at our core and innovation as our driver, we're building the future of transportation 
              one ride, one delivery, and one satisfied customer at a time.
            </StoryText>
          </StoryContent>
        </StorySection>

        {/* Call to Action */}
        <CTASection>
          <CTATitle>Ready to Experience FlexFlow?</CTATitle>
          <CTADescription>
            Join millions of users who trust FlexFlow for their transportation and delivery needs. 
            Start your journey with us today.
          </CTADescription>
          
          <ButtonGroup>
            <GradientButton
              variant="primary"
              size="large"
              onClick={() => router.push('/auth/signup')}
            >
              Get Started Today
            </GradientButton>
            
            <GradientButton
              variant="outline"
              size="large"
              onClick={() => router.push('/services')}
            >
              Explore Services
            </GradientButton>
          </ButtonGroup>
        </CTASection>
      </AboutContainer>
    </Layout>
  );
}