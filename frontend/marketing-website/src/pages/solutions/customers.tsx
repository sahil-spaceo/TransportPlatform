import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { generatePageSEO } from '@/utils/seo';
import { servicesData } from '@/data/services';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CustomersPage: React.FC = () => {
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: servicesRef, controls: servicesControls } = useScrollAnimation();
  const { ref: benefitsRef, controls: benefitsControls } = useScrollAnimation();

  const seoConfig = {
    ...generatePageSEO('solutions'),
    title: 'FlexFlow for Customers - All Services in One App',
    description: 'Experience the convenience of having all your transportation and delivery needs met by one trusted platform. Six services, one app, endless possibilities.',
  };

  const customerBenefits = [
    {
      icon: '📱',
      title: 'One App for Everything',
      description: 'Access all six FlexFlow services from a single, intuitive mobile application.',
    },
    {
      icon: '💰',
      title: 'Smart Savings',
      description: 'Save money with bundled services, loyalty rewards, and exclusive customer deals.',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Book rides, order food, send packages - all with just a few taps.',
    },
    {
      icon: '🔒',
      title: 'Safe & Secure',
      description: 'All drivers and delivery partners are verified, with real-time tracking for peace of mind.',
    },
    {
      icon: '🌟',
      title: 'Premium Experience',
      description: 'Enjoy priority support, exclusive features, and premium service options.',
    },
    {
      icon: '🌍',
      title: 'Eco-Friendly Options',
      description: 'Choose sustainable transportation and delivery options to reduce your carbon footprint.',
    },
  ];

  const membershipTiers = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for occasional users',
      features: [
        'Access to all services',
        'Standard support',
        'Basic pricing',
        'Standard delivery times',
      ],
      color: '#8b95a1',
    },
    {
      name: 'Gold',
      price: '$9.99/month',
      description: 'Best value for regular users',
      features: [
        'Everything in Basic',
        'Priority support',
        'Reduced service fees',
        'Ride-sharing access',
        'Exclusive deals',
        'Faster delivery',
      ],
      color: '#fbbf24',
      popular: true,
    },
    {
      name: 'Platinum',
      price: '$19.99/month',
      description: 'Premium experience for power users',
      features: [
        'Everything in Gold',
        'VIP support',
        'Maximum discounts',
        'Drone delivery access',
        'Concierge services',
        'Premium vehicles',
        'Zero delivery fees',
      ],
      color: '#8b5fbf',
    },
  ];

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
                Your Life, <span className="gradient-text">Simplified</span>
              </HeroTitle>
              <HeroDescription>
                From quick rides across town to gourmet meals delivered to your door, FlexFlow puts all your 
                transportation and delivery needs at your fingertips. One app, six services, endless convenience.
              </HeroDescription>
              <HeroCTA>
                <Button variant="gradient" size="lg" href="/download">
                  Download FlexFlow
                </Button>
                <Button variant="outline" size="lg" href="#membership">
                  View Membership Plans
                </Button>
              </HeroCTA>
              <HeroStats>
                <StatCard>
                  <StatValue>6</StatValue>
                  <StatLabel>Services</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>5M+</StatValue>
                  <StatLabel>Happy Customers</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>4.8★</StatValue>
                  <StatLabel>App Rating</StatLabel>
                </StatCard>
              </HeroStats>
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
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <SectionHeader>
                <SectionTitle>All Your Needs, One Platform</SectionTitle>
                <SectionSubtitle>
                  Discover the convenience of having six essential services in one powerful app
                </SectionSubtitle>
              </SectionHeader>

              <ServicesGrid>
                {servicesData.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { 
                        opacity: 1, 
                        scale: 1,
                        transition: { duration: 0.5 }
                      }
                    }}
                  >
                    <Link href={`/services/${service.id}`}>
                      <ServiceCard
                        variant="elevated"
                        hover
                        clickable
                      >
                        <ServiceIcon style={{ background: service.gradient }}>
                          {service.icon}
                        </ServiceIcon>
                        <ServiceName>{service.name}</ServiceName>
                        <ServiceDescription>{service.description}</ServiceDescription>
                      </ServiceCard>
                    </Link>
                  </motion.div>
                ))}
              </ServicesGrid>
            </motion.div>
          </div>
        </ServicesSection>

        <BenefitsSection ref={benefitsRef}>
          <div className="container">
            <motion.div
              initial="hidden"
              animate={benefitsControls}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <SectionHeader>
                <SectionTitle>Why Customers Love FlexFlow</SectionTitle>
                <SectionSubtitle>
                  Join millions who have simplified their lives with our comprehensive platform
                </SectionSubtitle>
              </SectionHeader>

              <BenefitsGrid>
                {customerBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.6 }
                      }
                    }}
                  >
                    <BenefitCard variant="gradient" padding="lg">
                      <BenefitIcon>{benefit.icon}</BenefitIcon>
                      <BenefitTitle>{benefit.title}</BenefitTitle>
                      <BenefitDescription>{benefit.description}</BenefitDescription>
                    </BenefitCard>
                  </motion.div>
                ))}
              </BenefitsGrid>
            </motion.div>
          </div>
        </BenefitsSection>

        <MembershipSection id="membership">
          <div className="container">
            <SectionHeader>
              <SectionTitle>Choose Your FlexFlow Experience</SectionTitle>
              <SectionSubtitle>
                Unlock more value with our membership plans designed for every lifestyle
              </SectionSubtitle>
            </SectionHeader>

            <MembershipGrid>
              {membershipTiers.map((tier, index) => (
                <MembershipCard 
                  key={index} 
                  variant={tier.popular ? "elevated" : "bordered"}
                  $popular={tier.popular}
                >
                  {tier.popular && <PopularBadge>Most Popular</PopularBadge>}
                  <MembershipHeader>
                    <MembershipName style={{ color: tier.color }}>{tier.name}</MembershipName>
                    <MembershipPrice>{tier.price}</MembershipPrice>
                    <MembershipDescription>{tier.description}</MembershipDescription>
                  </MembershipHeader>
                  <MembershipFeatures>
                    {tier.features.map((feature, idx) => (
                      <FeatureItem key={idx}>
                        <FeatureIcon>✓</FeatureIcon>
                        {feature}
                      </FeatureItem>
                    ))}
                  </MembershipFeatures>
                  <Button 
                    variant={tier.popular ? "gradient" : "outline"} 
                    size="lg" 
                    fullWidth 
                    href="/download"
                  >
                    {tier.price === 'Free' ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </MembershipCard>
              ))}
            </MembershipGrid>
          </div>
        </MembershipSection>

        <TestimonialsSection>
          <div className="container">
            <SectionHeader>
              <SectionTitle>What Our Customers Say</SectionTitle>
            </SectionHeader>
            <TestimonialsGrid>
              <TestimonialCard variant="elevated" padding="lg">
                <TestimonialQuote>
                  "FlexFlow has completely changed how I navigate the city. Having everything in one app 
                  is incredibly convenient, and the Gold membership pays for itself!"
                </TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorAvatar>👩‍💼</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>Sarah Chen</AuthorName>
                    <AuthorTitle>Marketing Manager</AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>

              <TestimonialCard variant="elevated" padding="lg">
                <TestimonialQuote>
                  "As a busy parent, FlexFlow is a lifesaver. Food delivery, rides for the kids, 
                  package pickup - I can handle everything from one app."
                </TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorAvatar>👨‍👧‍👦</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>Mike Johnson</AuthorName>
                    <AuthorTitle>Father of Two</AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>

              <TestimonialCard variant="elevated" padding="lg">
                <TestimonialQuote>
                  "The drone delivery is amazing! Getting my coffee delivered in 15 minutes feels like 
                  living in the future. FlexFlow's Platinum membership is worth every penny."
                </TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorAvatar>👩‍💻</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>Emily Rodriguez</AuthorName>
                    <AuthorTitle>Software Developer</AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </TestimonialsGrid>
          </div>
        </TestimonialsSection>

        <CTASection>
          <div className="container">
            <CTAContent>
              <CTATitle>Ready to Simplify Your Life?</CTATitle>
              <CTADescription>
                Join millions of satisfied customers who have discovered the convenience of FlexFlow. 
                Download the app and start enjoying all six services today.
              </CTADescription>
              <CTAButtons>
                <Button variant="primary" size="xl" href="/download">
                  Download FlexFlow
                </Button>
                <Button variant="ghost" size="xl" href="/contact">
                  Have Questions?
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const ServiceCard = styled(Card)`
  text-align: center;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  margin: 0 auto ${({ theme }) => theme.spacing[4]} auto;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ServiceName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const BenefitsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background.paper};
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const BenefitCard = styled(Card)`
  text-align: center;
`;

const BenefitIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const BenefitTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const BenefitDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.inverse};
  opacity: 0.9;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const MembershipSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background.default};
`;

const MembershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  max-width: 1000px;
  margin: 0 auto;
`;

const MembershipCard = styled(Card)<{ $popular?: boolean }>`
  position: relative;
  text-align: center;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};

  ${({ $popular, theme }) => $popular && `
    transform: scale(1.05);
    border: 2px solid ${theme.colors.solid.brand.primary};
    box-shadow: ${theme.shadows.xl};
  `}

  &:hover {
    transform: ${({ $popular }) => $popular ? 'scale(1.08)' : 'scale(1.03)'};
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.gradients.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const MembershipHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const MembershipName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const MembershipPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const MembershipDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MembershipFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing[8]} 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FeatureIcon = styled.span`
  color: ${({ theme }) => theme.colors.solid.brand.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const TestimonialsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background.paper};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
`;

const TestimonialCard = styled(Card)``;

const TestimonialQuote = styled.blockquote`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-style: italic;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const AuthorAvatar = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AuthorTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
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

export default CustomersPage;