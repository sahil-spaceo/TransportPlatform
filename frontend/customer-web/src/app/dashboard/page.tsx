'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

// Force client-side rendering
export const dynamic = 'force-dynamic';

// Styled Components
const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.gradient};
  width: 100%;
  min-height: 100vh;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const WelcomeSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
`;

const WelcomeMessage = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(GradientCard)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.display3};
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
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatChange = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const QuickActionsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(GradientCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ActionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const ActionButton = styled(GradientButton)`
  margin-top: auto;
`;

const RecentActivitySection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ActivityItem = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
    box-shadow: ${({ theme }) => theme.shadows.light};
    transform: translateY(-1px);
  }
`;

const ActivityIcon = styled.div<{ $type: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'ride': return theme.colors.functional.info.light;
      case 'order': return theme.colors.functional.success.light;
      case 'rental': return theme.colors.functional.warning.light;
      default: return theme.colors.neutral[100];
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'ride': return theme.colors.functional.info.main;
      case 'order': return theme.colors.functional.success.main;
      case 'rental': return theme.colors.functional.warning.main;
      default: return theme.colors.text.secondary;
    }
  }};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const ActivityDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const ActivityTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
`;

const SubscriptionBanner = styled.div<{ $tier: string }>`
  background: ${({ theme, $tier }) => {
    const validTier = (['basic', 'silver', 'gold'].includes($tier as any)) ? $tier as 'basic' | 'silver' | 'gold' : 'basic';
    const baseColor = theme.colors.subscription[validTier].light;
    return `linear-gradient(135deg, ${baseColor} 0%, ${theme.colors.background.paper} 100%)`;
  }};
  border: 2px solid ${({ theme, $tier }) => {
    const validTier = (['basic', 'silver', 'gold'].includes($tier as any)) ? $tier as 'basic' | 'silver' | 'gold' : 'basic';
    return theme.colors.subscription[validTier].main;
  }};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme, $tier }) => {
      const validTier = (['basic', 'silver', 'gold'].includes($tier as any)) ? $tier as 'basic' | 'silver' | 'gold' : 'basic';
      return theme.colors.subscription[validTier].gradient;
    }};
  }
`;

const SubscriptionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const SubscriptionDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

// Mock data
const getUserStats = (tier: string) => [
  { label: 'Total Rides', value: '24', change: '+3 this month' },
  { label: 'Total Orders', value: '12', change: '+5 this month' },
  { 
    label: 'Money Saved', 
    value: tier === 'gold' ? '$156' : '$0', 
    change: tier === 'gold' ? 'From ride sharing' : 'Upgrade for savings' 
  },
  { label: 'CO2 Reduced', value: '2.4 kg', change: 'This month' },
];

const getQuickActions = (tier: string) => [
  {
    icon: '🚕',
    title: 'Book a Ride',
    description: 'Quick ride booking with professional drivers',
    action: 'Book Now',
    available: true,
  },
  {
    icon: '🍕',
    title: 'Order Food',
    description: 'Delivery from your favorite restaurants',
    action: 'Order Now',
    available: true,
  },
  {
    icon: '🛸',
    title: 'Drone Delivery',
    description: 'Ultra-fast aerial delivery service',
    action: (tier === 'silver' || tier === 'gold') ? 'Use Drone' : 'Upgrade to Access',
    available: tier === 'silver' || tier === 'gold',
  },
  {
    icon: '🤝',
    title: 'Ride Share',
    description: 'Save 30-40% by sharing rides',
    action: tier === 'gold' ? 'Share Ride' : 'Upgrade to Gold',
    available: tier === 'gold',
  },
];

const recentActivity = [
  {
    type: 'ride',
    icon: '🚕',
    title: 'Ride to Downtown',
    description: 'Trip completed • $12.50',
    time: '2 hours ago',
  },
  {
    type: 'order',
    icon: '🍕',
    title: 'Pizza Palace Order',
    description: 'Delivered • $18.99',
    time: '1 day ago',
  },
  {
    type: 'rental',
    icon: '🚗',
    title: 'Car Rental',
    description: '4-hour rental completed • $45.00',
    time: '3 days ago',
  },
  {
    type: 'order',
    icon: '📦',
    title: 'Package Delivery',
    description: 'Documents delivered • $8.50',
    time: '2 days ago',
  },
];

// Main Dashboard Component
function DashboardContent() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  if (!user) return null;

  // Ensure user has required properties with defaults
  const subscriptionTier = user.subscriptionTier || 'basic';
  const firstName = user.firstName || 'User';

  const userStats = getUserStats(subscriptionTier);
  const quickActions = getQuickActions(subscriptionTier);

  // Quick Action Handlers
  const handleBookRide = () => {
    console.log('Book Ride clicked');
    router.push('/services/rides');
  };

  const handleOrderFood = () => {
    console.log('Order Food clicked');
    router.push('/services/food');
  };

  const handleDroneDelivery = () => {
    console.log('Drone Delivery clicked, tier:', subscriptionTier);
    if (subscriptionTier === 'silver' || subscriptionTier === 'gold') {
      router.push('/services/packages');
    } else {
      alert('Upgrade to Silver or Gold to access drone delivery!');
      // Optionally redirect to billing page
      setTimeout(() => router.push('/billing'), 1000);
    }
  };

  const handleRideShare = () => {
    console.log('Ride Share clicked, tier:', subscriptionTier);
    if (subscriptionTier === 'gold') {
      router.push('/services/rides?rideshare=true');
    } else {
      alert('Upgrade to Gold membership to access ride sharing and save 30-40%!');
      // Optionally redirect to billing page
      setTimeout(() => router.push('/billing'), 1000);
    }
  };

  const handleSubscriptionAction = () => {
    console.log('Subscription action clicked, tier:', subscriptionTier);
    console.log('User:', user);
    console.log('Router available:', !!router);
    
    let targetUrl: string;
    switch (subscriptionTier) {
      case 'gold':
        targetUrl = '/profile';
        break;
      case 'basic':
      case 'silver':
      default:
        targetUrl = '/billing';
        break;
    }
    
    console.log('Target URL:', targetUrl);
    console.log('Current pathname:', window.location.pathname);
    
    // Use window.location for more reliable navigation
    console.log('Using direct navigation to:', targetUrl);
    window.location.href = targetUrl;
  };

  const getQuickActionHandler = (title: string) => {
    switch (title) {
      case 'Book a Ride':
        return handleBookRide;
      case 'Order Food':
        return handleOrderFood;
      case 'Drone Delivery':
        return handleDroneDelivery;
      case 'Ride Share':
        return handleRideShare;
      default:
        return () => console.log(`${title} clicked`);
    }
  };

  const getSubscriptionBanner = () => {
    switch (subscriptionTier) {
      case 'basic':
        return {
          title: '🌟 Upgrade to Silver or Gold',
          description: 'Unlock drone delivery, ride sharing, and premium features to enhance your FlexFlow experience',
          action: 'View Plans',
        };
      case 'silver':
        return {
          title: '💎 Upgrade to Gold',
          description: 'Get exclusive ride sharing with 30-40% savings and access to all premium features',
          action: 'Upgrade Now',
        };
      case 'gold':
        return {
          title: '👑 Gold Member Benefits',
          description: 'You have access to all premium features including ride sharing and priority support',
          action: 'Manage Plan',
        };
      default:
        return {
          title: '🌟 Welcome to FlexFlow',
          description: 'Choose a subscription plan to unlock premium features and enhanced transportation services',
          action: 'Choose Plan',
        };
    }
  };

  const subscriptionInfo = getSubscriptionBanner();

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <DashboardContainer>
        {/* Welcome Section */}
        <WelcomeSection>
          <GradientHeading level="h1" gradient="primary" align="center">
            {t('dashboard.welcome.title', { name: firstName })}!
          </GradientHeading>
          <WelcomeMessage>
            {t('dashboard.welcome.message', { tier: subscriptionTier })}
          </WelcomeMessage>
        </WelcomeSection>

        {/* Subscription Banner */}
        <SubscriptionBanner $tier={subscriptionTier}>
          <SubscriptionTitle>{subscriptionInfo.title}</SubscriptionTitle>
          <SubscriptionDescription>{subscriptionInfo.description}</SubscriptionDescription>
          <GradientButton
            variant="gradient"
            tier={subscriptionTier as 'basic' | 'silver' | 'gold'}
            size="large"
            onClick={handleSubscriptionAction}
          >
            {subscriptionInfo.action}
          </GradientButton>
        </SubscriptionBanner>

        {/* Stats Grid */}
        <StatsGrid>
          {userStats.map((stat, index) => (
            <StatCard
              key={index}
              variant="elevated"
              hoverable
            >
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
              <StatChange>{stat.change}</StatChange>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Quick Actions */}
        <QuickActionsSection>
          <GradientHeading level="h2" gradient="primary">
            {t('dashboard.quickActions')}
          </GradientHeading>
          
          <ActionsGrid>
            {quickActions.map((action, index) => {
              const actionHandler = getQuickActionHandler(action.title);
              return (
                <ActionCard
                  key={index}
                  variant="glass"
                  hoverable
                  clickable
                  onClick={actionHandler}
                >
                  <ActionHeader>
                    <ActionTitle>
                      <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                      {action.title}
                    </ActionTitle>
                    <ActionDescription>{action.description}</ActionDescription>
                  </ActionHeader>
                  
                  <ActionButton
                    variant={action.available ? "primary" : "outline"}
                    fullWidth
                    disabled={!action.available}
                    onClick={(e) => {
                      e.stopPropagation();
                      actionHandler();
                    }}
                  >
                    {action.action}
                  </ActionButton>
                </ActionCard>
              );
            })}
          </ActionsGrid>
        </QuickActionsSection>

        {/* Recent Activity */}
        <RecentActivitySection>
          <GradientHeading level="h2" gradient="primary">
            {t('dashboard.recentActivity')}
          </GradientHeading>
          
          <ActivityList>
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon $type={activity.type}>
                  {activity.icon}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityContent>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivitySection>
        </DashboardContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Dashboard Page
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}