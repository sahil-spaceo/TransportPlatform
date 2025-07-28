'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { TextInput } from '@/components/atoms/Input/TextInput';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'styled-components';

// Force client-side rendering
export const dynamic = 'force-dynamic';

// Styled Components
const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.gradient};
  width: 100%;
  min-height: 100vh;
`;

const BillingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const BillingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin: ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PaymentMethodCard = styled(GradientCard)<{ $primary?: boolean }>`
  border: 2px solid ${({ theme, $primary }) => 
    $primary ? theme.colors.primary.main : 'transparent'};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CardIcon = styled.div`
  font-size: 2rem;
`;

const CardDetails = styled.div``;

const CardNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardType = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PrimaryBadge = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary.gradient};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  text-transform: uppercase;
`;

const SubscriptionCard = styled(GradientCard)<{ $tier: 'basic' | 'silver' | 'gold' }>`
  background: ${({ theme, $tier }) => {
    const baseColor = theme.colors.subscription[$tier].light;
    return `linear-gradient(135deg, ${baseColor} 0%, rgba(255, 255, 255, 0.9) 100%)`;
  }};
  border: 2px solid ${({ theme, $tier }) => theme.colors.subscription[$tier].main};
`;

const BillingHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BillingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const ItemInfo = styled.div``;

const ItemDate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ItemDescription = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ItemAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const AddCardForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

// Mock Data
const paymentMethods = [
  {
    id: 1,
    type: 'Visa',
    icon: '💳',
    number: '**** **** **** 1234',
    expiry: '12/26',
    isPrimary: true,
  },
  {
    id: 2,
    type: 'Mastercard',
    icon: '💳',
    number: '**** **** **** 5678',
    expiry: '08/25',
    isPrimary: false,
  },
];

const billingHistory = [
  {
    id: 1,
    date: '2024-01-20',
    description: 'Ride to Downtown',
    amount: '$12.50',
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-01-19',
    description: 'Food Delivery - Pizza Palace',
    amount: '$18.99',
    status: 'completed',
  },
  {
    id: 3,
    date: '2024-01-18',
    description: 'Car Rental - Honda CR-V',
    amount: '$45.00',
    status: 'completed',
  },
  {
    id: 4,
    date: '2024-01-17',
    description: 'Drone Delivery',
    amount: '$15.99',
    status: 'completed',
  },
  {
    id: 5,
    date: '2024-01-15',
    description: 'Gold Subscription - Monthly',
    amount: '$19.99',
    status: 'completed',
  },
];

// Main Component
function BillingContent() {
  const { user } = useAuth();
  const theme = useTheme();
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVC, setNewCardCVC] = useState('');
  const [newCardName, setNewCardName] = useState('');

  if (!user) return null;

  // Ensure user has valid subscription tier with default fallback
  const subscriptionTier = user.subscriptionTier || 'basic';
  const validTier = (['basic', 'silver', 'gold'].includes(subscriptionTier)) 
    ? subscriptionTier as 'basic' | 'silver' | 'gold' 
    : 'basic';

  const handleAddCard = () => {
    console.log('Adding new card:', {
      number: newCardNumber,
      expiry: newCardExpiry,
      cvc: newCardCVC,
      name: newCardName,
    });
    
    // TODO: Implement actual card addition logic
    alert('Payment method added successfully!');
    setShowAddCard(false);
    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCVC('');
    setNewCardName('');
  };

  const handleSetPrimary = (cardId: number) => {
    console.log('Setting primary card:', cardId);
    // TODO: Implement set primary logic
    alert('Primary payment method updated!');
  };

  const handleRemoveCard = (cardId: number) => {
    console.log('Removing card:', cardId);
    // TODO: Implement card removal logic
    if (confirm('Are you sure you want to remove this payment method?')) {
      alert('Payment method removed!');
    }
  };

  const getSubscriptionInfo = () => {
    switch (validTier) {
      case 'silver':
        return {
          name: 'Silver Plan',
          price: '$9.99/month',
          nextBilling: '2024-02-15',
          features: ['Drone delivery access', 'Priority booking', 'Extended support'],
        };
      case 'gold':
        return {
          name: 'Gold Plan',
          price: '$19.99/month',
          nextBilling: '2024-02-15',
          features: ['All Silver features', 'Ride sharing', 'Concierge support', 'VIP treatment'],
        };
      default:
        return {
          name: 'Basic Plan',
          price: 'Free',
          nextBilling: null,
          features: ['Standard ride booking', 'Basic delivery', 'Standard support'],
        };
    }
  };

  const subscriptionInfo = getSubscriptionInfo();

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <BillingContainer>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GradientHeading level="h1" gradient="primary" align="center">
            Billing & Payments
          </GradientHeading>
          <p style={{ 
            fontSize: '1.125rem',
            color: theme.colors.text.secondary,
            margin: '1rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Manage your payment methods, subscription, and view billing history
          </p>
        </div>

        <BillingGrid>
          {/* Payment Methods & Subscription */}
          <Section>
            {/* Current Subscription */}
            <GradientHeading level="h2" gradient="secondary">
              Current Subscription
            </GradientHeading>
            <SubscriptionCard variant="elevated" $tier={validTier}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', color: theme.colors.text.primary }}>
                  {subscriptionInfo.name}
                </h3>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#f7971e',
                  marginBottom: '1rem'
                }}>
                  {subscriptionInfo.price}
                </div>
                {subscriptionInfo.nextBilling && (
                  <p style={{ margin: '0 0 1rem', color: theme.colors.text.secondary, fontSize: '0.875rem' }}>
                    Next billing: {subscriptionInfo.nextBilling}
                  </p>
                )}
                <ul style={{ margin: '0', paddingLeft: '1.25rem', color: theme.colors.text.secondary }}>
                  {subscriptionInfo.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                  ))}
                </ul>
              </div>
              {validTier !== 'gold' && (
                <GradientButton 
                  variant="gradient" 
                  tier={validTier === 'silver' ? 'gold' : 'silver'} 
                  fullWidth
                >
                  Upgrade Subscription
                </GradientButton>
              )}
            </SubscriptionCard>

            {/* Payment Methods */}
            <GradientHeading level="h2" gradient="secondary">
              Payment Methods
            </GradientHeading>
            
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                variant="elevated"
                $primary={method.isPrimary}
              >
                <CardHeader>
                  <CardInfo>
                    <CardIcon>{method.icon}</CardIcon>
                    <CardDetails>
                      <CardNumber>{method.number}</CardNumber>
                      <CardType>{method.type} • Expires {method.expiry}</CardType>
                    </CardDetails>
                  </CardInfo>
                  {method.isPrimary && <PrimaryBadge>Primary</PrimaryBadge>}
                </CardHeader>
                
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {!method.isPrimary && (
                    <GradientButton
                      variant="outline"
                      size="small"
                      onClick={() => handleSetPrimary(method.id)}
                    >
                      Set as Primary
                    </GradientButton>
                  )}
                  <GradientButton
                    variant="ghost"
                    size="small"
                    onClick={() => handleRemoveCard(method.id)}
                  >
                    Remove
                  </GradientButton>
                </div>
              </PaymentMethodCard>
            ))}

            {/* Add New Card */}
            {!showAddCard ? (
              <GradientButton
                variant="outline"
                fullWidth
                onClick={() => setShowAddCard(true)}
              >
                + Add New Payment Method
              </GradientButton>
            ) : (
              <GradientCard variant="outlined">
                <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>Add New Card</h3>
                <AddCardForm>
                  <div style={{ gridColumn: 'span 2' }}>
                    <TextInput
                      label="Cardholder Name"
                      placeholder="Full name on card"
                      value={newCardName}
                      onChange={(e) => setNewCardName(e.target.value)}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <TextInput
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                    />
                  </div>
                  <TextInput
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                  />
                  <TextInput
                    label="CVC"
                    placeholder="123"
                    value={newCardCVC}
                    onChange={(e) => setNewCardCVC(e.target.value)}
                  />
                </AddCardForm>
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginTop: '1rem',
                  justifyContent: 'flex-end'
                }}>
                  <GradientButton
                    variant="ghost"
                    onClick={() => setShowAddCard(false)}
                  >
                    Cancel
                  </GradientButton>
                  <GradientButton
                    variant="primary"
                    onClick={handleAddCard}
                    disabled={!newCardNumber || !newCardExpiry || !newCardCVC || !newCardName}
                  >
                    Add Card
                  </GradientButton>
                </div>
              </GradientCard>
            )}
          </Section>

          {/* Billing History */}
          <Section>
            <GradientHeading level="h2" gradient="secondary">
              Recent Transactions
            </GradientHeading>
            
            <BillingHistoryList>
              {billingHistory.map((item) => (
                <BillingItem key={item.id}>
                  <ItemInfo>
                    <ItemDate>{item.date}</ItemDate>
                    <ItemDescription>{item.description}</ItemDescription>
                  </ItemInfo>
                  <ItemAmount>{item.amount}</ItemAmount>
                </BillingItem>
              ))}
            </BillingHistoryList>

            <GradientButton variant="outline" fullWidth>
              View All Transactions
            </GradientButton>

            {/* Billing Summary */}
            <GradientCard variant="glass">
              <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>This Month's Summary</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Total Spent</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff9a9e' }}>
                    $112.47
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Services Used</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff9a9e' }}>
                    8
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#4CAF50', textAlign: 'center' }}>
                {validTier === 'gold' 
                  ? '🎉 You saved $23.40 with Gold ride sharing this month!'
                  : 'Upgrade to Gold to start saving with ride sharing!'
                }
              </div>
            </GradientCard>
          </Section>
        </BillingGrid>
        </BillingContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Page
export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}