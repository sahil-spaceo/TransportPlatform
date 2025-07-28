import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import StructuredData from '@/components/seo/StructuredData';
import { generatePageSEO, generateServicePageSchema, generateBreadcrumbSchema } from '@/utils/seo';
import { servicesData, ServiceData, getServiceData } from '@/data/services';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ServiceType } from '@/types/marketing.types';

interface ServicePageProps {
  service: ServiceData;
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: featuresRef, controls: featuresControls } = useScrollAnimation();
  const { ref: pricingRef, controls: pricingControls } = useScrollAnimation();

  const seoConfig = {
    ...generatePageSEO('services'),
    title: `${service.name} - ${service.tagline} | FlexFlow`,
    description: service.longDescription,
  };

  const serviceSchema = generateServicePageSchema({
    name: service.name,
    description: service.longDescription,
    price: service.pricing.baseRate,
    image: `https://flexflow.com/images/services/${service.id}.jpg`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://flexflow.com' },
    { name: 'Services', url: 'https://flexflow.com/services' },
    { name: service.name, url: `https://flexflow.com/services/${service.id}` },
  ]);

  return (
    <>
      <NextSeo {...seoConfig} />
      <StructuredData data={[...serviceSchema, breadcrumbSchema]} />
      <Layout>
        <HeroSection style={{ background: service.gradient }} ref={heroRef}>
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
              <ServiceIcon>{service.icon}</ServiceIcon>
              <HeroTitle>{service.name}</HeroTitle>
              <HeroTagline>{service.tagline}</HeroTagline>
              <HeroDescription>{service.longDescription}</HeroDescription>
              <HeroCTA>
                <Button variant="primary" size="lg" href="/download">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" href="/contact">
                  Learn More
                </Button>
              </HeroCTA>
              <HeroStats>
                {service.stats.map((stat, index) => (
                  <StatCard key={index}>
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                ))}
              </HeroStats>
            </HeroContent>
          </motion.div>
        </HeroSection>

        <FeaturesSection ref={featuresRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={featuresControls}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <SectionHeader>
                <SectionTitle>Key Features</SectionTitle>
                <SectionSubtitle>
                  Discover what makes our {service.name.toLowerCase()} service exceptional
                </SectionSubtitle>
              </SectionHeader>

              <FeaturesGrid>
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <FeatureCard variant="elevated">
                      <FeatureIcon>✨</FeatureIcon>
                      <FeatureName>{feature}</FeatureName>
                    </FeatureCard>
                  </motion.div>
                ))}
              </FeaturesGrid>
            </motion.div>
          </div>
        </FeaturesSection>

        <BenefitsSection>
          <div className="container">
            <BenefitsContent>
              <BenefitsText>
                <BenefitsTitle>Why Choose {service.name}?</BenefitsTitle>
                <BenefitsList>
                  {service.benefits.map((benefit, index) => (
                    <BenefitItem key={index}>
                      <BenefitIcon>🚀</BenefitIcon>
                      <BenefitText>{benefit}</BenefitText>
                    </BenefitItem>
                  ))}
                </BenefitsList>
                <Button variant="gradient" size="lg" href="/download">
                  Experience the Benefits
                </Button>
              </BenefitsText>
              <BenefitsImage>
                <Card variant="gradient" padding="xl">
                  <ImagePlaceholder>
                    <span>{service.icon}</span>
                    <p>{service.name} in Action</p>
                  </ImagePlaceholder>
                </Card>
              </BenefitsImage>
            </BenefitsContent>
          </div>
        </BenefitsSection>

        <PricingSection ref={pricingRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={pricingControls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <SectionHeader>
                <SectionTitle>Transparent Pricing</SectionTitle>
                <SectionSubtitle>
                  Fair, transparent pricing with no hidden fees
                </SectionSubtitle>
              </SectionHeader>

              <PricingCard variant="elevated" padding="xl">
                <PricingHeader>
                  <PricingTitle>{service.name} Rates</PricingTitle>
                  <PricingSubtitle>Simple, straightforward pricing</PricingSubtitle>
                </PricingHeader>
                <PricingDetails>
                  <PriceItem>
                    <PriceLabel>Base Rate</PriceLabel>
                    <PriceValue>{service.pricing.baseRate}</PriceValue>
                  </PriceItem>
                  {service.pricing.perDistance && (
                    <PriceItem>
                      <PriceLabel>Per Distance</PriceLabel>
                      <PriceValue>{service.pricing.perDistance}</PriceValue>
                    </PriceItem>
                  )}
                  {service.pricing.perTime && (
                    <PriceItem>
                      <PriceLabel>Per Time</PriceLabel>
                      <PriceValue>{service.pricing.perTime}</PriceValue>
                    </PriceItem>
                  )}
                  {service.pricing.commission && (
                    <PriceItem>
                      <PriceLabel>Service Fee</PriceLabel>
                      <PriceValue>{service.pricing.commission}</PriceValue>
                    </PriceItem>
                  )}
                </PricingDetails>
                <PricingNote>
                  *Prices may vary based on demand, location, and other factors. 
                  Final pricing will be shown before confirmation.
                </PricingNote>
                <Button variant="primary" size="lg" fullWidth href="/download">
                  Get Started
                </Button>
              </PricingCard>
            </motion.div>
          </div>
        </PricingSection>

        <UseCasesSection>
          <div className="container">
            <SectionHeader>
              <SectionTitle>Perfect For</SectionTitle>
            </SectionHeader>
            <UseCasesGrid>
              {service.useCases.map((useCase, index) => (
                <UseCaseCard key={index} variant="bordered">
                  <UseCaseIcon>🎯</UseCaseIcon>
                  <UseCaseName>{useCase}</UseCaseName>
                </UseCaseCard>
              ))}
            </UseCasesGrid>
          </div>
        </UseCasesSection>

        <TargetAudienceSection>
          <div className="container">
            <SectionHeader>
              <SectionTitle>Who Uses {service.name}?</SectionTitle>
            </SectionHeader>
            <AudienceGrid>
              {service.targetAudience.map((audience, index) => (
                <AudienceCard key={index} variant="gradient" padding="lg">
                  <AudienceIcon>👥</AudienceIcon>
                  <AudienceName>{audience}</AudienceName>
                </AudienceCard>
              ))}
            </AudienceGrid>
          </div>
        </TargetAudienceSection>

        <CTASection>
          <div className="container">
            <CTAContent>
              <CTATitle>Ready to Get Started?</CTATitle>
              <CTADescription>
                Join thousands of satisfied customers who rely on FlexFlow for their {service.name.toLowerCase()} needs.
              </CTADescription>
              <CTAButtons>
                <Button variant="primary" size="xl" href="/download">
                  Download App
                </Button>
                <Button variant="ghost" size="xl" href="/services">
                  View All Services
                </Button>
              </CTAButtons>
            </CTAContent>
          </div>
        </CTASection>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = servicesData.map((service) => ({
    params: { service: service.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const serviceId = params?.service as ServiceType;
  const service = getServiceData(serviceId);

  if (!service) {
    return { notFound: true };
  }

  return {
    props: { service },
  };
};

// Styled Components (reusing most from ride-hailing page)
const HeroSection = styled.section`
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

const ServiceIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: 1;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const HeroTagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  opacity: 0.95;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const StatCard = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.8;
`;

const FeaturesSection = styled.section`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const FeatureCard = styled(Card)`
  text-align: center;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};

  &:hover {
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const FeatureName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BenefitsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background.paper};
`;

const BenefitsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const BenefitsText = styled.div``;

const BenefitsTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing[8]} 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const BenefitIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const BenefitText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const BenefitsImage = styled.div``;

const ImagePlaceholder = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[6]};

  span {
    font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.inverse};
    margin: 0;
  }
`;

const PricingSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;

const PricingCard = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const PricingHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const PricingTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const PricingSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PricingDetails = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

const PriceLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PriceValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PricingNote = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const UseCasesSection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background: ${({ theme }) => theme.colors.background.paper};
`;

const UseCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const UseCaseCard = styled(Card)`
  text-align: center;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.solid.brand.primary};
  }
`;

const UseCaseIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const UseCaseName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TargetAudienceSection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;

const AudienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const AudienceCard = styled(Card)`
  text-align: center;
`;

const AudienceIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const AudienceName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.inverse};
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

export default ServicePage;