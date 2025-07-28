import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import StructuredData from '@/components/seo/StructuredData';
import { generatePageSEO, generateHomepageSchema } from '@/utils/seo';

const HomePage: React.FC = () => {
  const seoConfig = generatePageSEO('home');
  const structuredData = generateHomepageSchema();

  return (
    <>
      <NextSeo {...seoConfig} />
      <StructuredData data={structuredData} />
      <Layout headerTransparent={true}>
        <HeroSection>
          <HeroContent className="container">
            <HeroText>
              <HeroTitle>
                Experience the Future of <span className="gradient-text">Transportation</span>
              </HeroTitle>
              <HeroSubtitle>
                From ride-hailing to drone delivery, FlexFlow brings all your mobility needs into one powerful platform. 
                Flexibility in motion, innovation in service.
              </HeroSubtitle>
              <HeroCTAGroup>
                <Button variant="gradient" size="lg" href="/download">
                  Download FlexFlow
                </Button>
                <Button variant="outline" size="lg" href="/services">
                  Explore Services
                </Button>
              </HeroCTAGroup>
            </HeroText>
          </HeroContent>
        </HeroSection>

        <ServicesPreview>
          <div className="container">
            <SectionTitle>All Your Transportation Needs</SectionTitle>
            <SectionSubtitle>
              Six powerful services, one integrated platform
            </SectionSubtitle>
            
            <ServicesGrid>
              <ServiceCard variant="gradient" hover>
                <ServiceIcon>🚕</ServiceIcon>
                <ServiceName>Ride-Hailing</ServiceName>
                <ServiceDescription>
                  On-demand rides with professional drivers. Safe, reliable, and always available.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard variant="gradient" hover>
                <ServiceIcon>🤝</ServiceIcon>
                <ServiceName>Ride-Sharing</ServiceName>
                <ServiceDescription>
                  Save 30-40% by sharing rides with others. Exclusive to Gold-tier subscribers.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard variant="gradient" hover>
                <ServiceIcon>🚗</ServiceIcon>
                <ServiceName>Car Rental</ServiceName>
                <ServiceDescription>
                  Flexible vehicle rentals by the hour, day, or week. Perfect for any journey.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard variant="gradient" hover>
                <ServiceIcon>🍕</ServiceIcon>
                <ServiceName>Food Delivery</ServiceName>
                <ServiceDescription>
                  Fresh meals from your favorite restaurants. Ground and drone delivery options.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard variant="gradient" hover>
                <ServiceIcon>📦</ServiceIcon>
                <ServiceName>Package Delivery</ServiceName>
                <ServiceDescription>
                  Same-day package delivery with real-time tracking and insurance options.
                </ServiceDescription>
              </ServiceCard>

              <ServiceCard variant="gradient" hover>
                <ServiceIcon>🛸</ServiceIcon>
                <ServiceName>Drone Delivery</ServiceName>
                <ServiceDescription>
                  Ultra-fast premium delivery in under 30 minutes. The future is here.
                </ServiceDescription>
              </ServiceCard>
            </ServicesGrid>
          </div>
        </ServicesPreview>

        <CTASection>
          <div className="container">
            <CTAContent>
              <CTATitle>Ready to Transform Your Transportation?</CTATitle>
              <CTADescription>
                Join millions of users who have already discovered the flexibility and convenience of FlexFlow.
              </CTADescription>
              <CTAButtons>
                <Button variant="primary" size="xl" href="/download">
                  Get Started Today
                </Button>
                <Button variant="ghost" size="xl" href="/contact">
                  Contact Sales
                </Button>
              </CTAButtons>
            </CTAContent>
          </div>
        </CTASection>
      </Layout>
    </>
  );
};

// Styled Components
const HeroSection = styled.section`
  background: ${({ theme }) => theme.colors.gradients.hero};
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1px);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const HeroText = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  opacity: 0.95;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const HeroCTAGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ServicesPreview = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
  }
`;

const ServiceIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: 1;
`;

const ServiceName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const CTASection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background: ${({ theme }) => theme.colors.gradients.background};
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const CTAButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

export default HomePage;