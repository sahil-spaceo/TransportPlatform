import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { generatePageSEO } from '@/utils/seo';
import { servicesData } from '@/data/services';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServicesPage: React.FC = () => {
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: servicesRef, controls: servicesControls } = useScrollAnimation();
  const seoConfig = generatePageSEO('services');

  return (
    <>
      <NextSeo {...seoConfig} />
      <Layout>
        <HeroSection ref={heroRef}>
          <motion.div 
            className="container"
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <HeroContent>
              <HeroTitle>
                All Your Transportation Needs
                <br />
                <span className="gradient-text">In One Platform</span>
              </HeroTitle>
              <HeroDescription>
                From quick rides across town to drone deliveries in minutes, FlexFlow brings together 
                six essential services that keep you moving forward. Choose your journey, we'll handle the rest.
              </HeroDescription>
              <HeroCTA>
                <Button variant="gradient" size="lg" href="/download">
                  Download FlexFlow
                </Button>
                <Button variant="outline" size="lg" href="/contact">
                  Business Solutions
                </Button>
              </HeroCTA>
            </HeroContent>
          </motion.div>
        </HeroSection>

        <ServicesSection ref={servicesRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={servicesControls}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <SectionHeader>
                <SectionTitle>Six Services, Infinite Possibilities</SectionTitle>
                <SectionSubtitle>
                  Whether you need a ride, want to send a package, or craving your favorite meal, 
                  we've got you covered with reliable, fast, and affordable solutions.
                </SectionSubtitle>
              </SectionHeader>

              <ServicesGrid>
                {servicesData.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }
                    }}
                  >
                    <ServiceCard
                      variant="elevated"
                      hover
                    >
                      <ServiceIcon style={{ background: service.gradient }}>
                        {service.icon}
                      </ServiceIcon>
                      <ServiceContent>
                        <ServiceName>{service.name}</ServiceName>
                        <ServiceTagline>{service.tagline}</ServiceTagline>
                        <ServiceDescription>{service.description}</ServiceDescription>
                        <ServiceFeatures>
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <FeatureItem key={idx}>
                              <FeatureIcon>✓</FeatureIcon>
                              {feature}
                            </FeatureItem>
                          ))}
                        </ServiceFeatures>
                        <ServiceStats>
                          {service.stats.slice(0, 2).map((stat, idx) => (
                            <StatItem key={idx}>
                              <StatValue>{stat.value}</StatValue>
                              <StatLabel>{stat.label}</StatLabel>
                            </StatItem>
                          ))}
                        </ServiceStats>
                        <ServiceAction>
                          <Button 
                            variant="outline" 
                            size="md" 
                            href={`/services/${service.id}`}
                            fullWidth
                          >
                            Learn More
                          </Button>
                        </ServiceAction>
                      </ServiceContent>
                    </ServiceCard>
                  </motion.div>
                ))}
              </ServicesGrid>
            </motion.div>
          </div>
        </ServicesSection>

        <CTASection>
          <div className="container">
            <CTAContent>
              <CTATitle>Ready to Experience All Six Services?</CTATitle>
              <CTADescription>
                Join millions of users who have discovered the convenience of having all their 
                transportation and delivery needs met by one trusted platform.
              </CTADescription>
              <CTAButtons>
                <Button variant="primary" size="xl" href="/download">
                  Download App
                </Button>
                <Button variant="ghost" size="xl" href="/solutions/customers">
                  See All Benefits
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
  animation: gradientShift 20s ease infinite;
  padding: ${({ theme }) => theme.spacing[20]} 0 ${({ theme }) => theme.spacing[24]} 0;
  text-align: center;
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
  max-width: 800px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text.inverse};
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

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  opacity: 0.95;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const HeroCTA = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const ServiceCard = styled(Card)`
  height: 100%;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ServiceName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ServiceTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FeatureIcon = styled.span`
  color: ${({ theme }) => theme.colors.solid.brand.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ServiceStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ServiceAction = styled.div`
  margin-top: auto;
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

export default ServicesPage;