'use client';

import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
import { TextInput } from '@/components/atoms/Input/TextInput';
import { useAuth } from '@/contexts/AuthContext';

// Force client-side rendering
export const dynamic = 'force-dynamic';

// Styled Components
const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.gradient};
  width: 100%;
  min-height: 100vh;
`;

const PackagesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const DeliveryForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PackageTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const PackageTypeCard = styled(GradientCard)<{ $selected?: boolean }>`
  cursor: pointer;
  text-align: center;
  border: 2px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary.main : 'transparent'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const PackageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PackageTypeName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const PackageDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const PackageSpecs = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.neutral[50]};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const DeliverySpeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const SpeedCard = styled(GradientCard)<{ $selected?: boolean; $available?: boolean }>`
  cursor: ${({ $available }) => $available ? 'pointer' : 'not-allowed'};
  opacity: ${({ $available }) => $available ? 1 : 0.5};
  text-align: center;
  border: 2px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary.main : 'transparent'};
  
  &:hover {
    border-color: ${({ theme, $available }) => 
      $available ? theme.colors.primary.light : 'transparent'};
  }
`;

const PriceEstimate = styled.div`
  background: ${({ theme }) => theme.colors.primary.light};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
`;

const PriceBreakdown = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TotalPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

// Package Types
const packageTypes = [
  {
    id: 'envelope',
    name: 'Envelope',
    icon: '📄',
    description: 'Documents, letters, small items',
    maxWeight: '1 lb',
    maxSize: '9" x 12"',
    basePrice: 5.99,
  },
  {
    id: 'small',
    name: 'Small Package',
    icon: '📦',
    description: 'Small boxes, electronics, gifts',
    maxWeight: '5 lbs',
    maxSize: '12" x 12" x 12"',
    basePrice: 8.99,
  },
  {
    id: 'medium',
    name: 'Medium Package',
    icon: '📫',
    description: 'Clothing, books, medium items',
    maxWeight: '15 lbs',
    maxSize: '18" x 18" x 18"',
    basePrice: 12.99,
  },
  {
    id: 'large',
    name: 'Large Package',
    icon: '📮',
    description: 'Large items, multiple packages',
    maxWeight: '50 lbs',
    maxSize: '24" x 24" x 24"',
    basePrice: 18.99,
  },
];

// Delivery Speeds
const deliverySpeeds = [
  {
    id: 'standard',
    name: 'Standard',
    icon: '🚚',
    time: '1-2 days',
    priceMultiplier: 1.0,
    description: 'Regular ground delivery',
    available: true,
  },
  {
    id: 'express',
    name: 'Express',
    icon: '⚡',
    time: '4-6 hours',
    priceMultiplier: 2.0,
    description: 'Same-day delivery',
    available: true,
  },
  {
    id: 'priority',
    name: 'Priority',
    icon: '🚀',
    time: '2-4 hours',
    priceMultiplier: 3.0,
    description: 'Urgent delivery',
    available: true,
  },
  {
    id: 'drone',
    name: 'Drone',
    icon: '🛸',
    time: '15-30 min',
    priceMultiplier: 4.0,
    description: 'Ultra-fast aerial delivery',
    available: false, // Will be set based on subscription
  },
];

// Main Component
function PackageDeliveryContent() {
  const theme = useTheme();
  const { user } = useAuth();
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [selectedSpeed, setSelectedSpeed] = useState('standard');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!user) return null;

  const canUseDrone = user.subscriptionTier === 'silver' || user.subscriptionTier === 'gold';
  
  // Update drone availability based on subscription
  const availableSpeeds = deliverySpeeds.map(speed => ({
    ...speed,
    available: speed.id === 'drone' ? canUseDrone : speed.available
  }));

  const calculatePrice = () => {
    const packageType = packageTypes.find(p => p.id === selectedPackageType);
    const speed = deliverySpeeds.find(s => s.id === selectedSpeed);
    
    if (!packageType || !speed) return 0;
    
    return packageType.basePrice * speed.priceMultiplier;
  };

  const handleBookDelivery = () => {
    if (!selectedPackageType || !pickupAddress || !deliveryAddress || !recipientName) {
      alert('Please fill in all required fields');
      return;
    }
    
    // TODO: Implement actual booking logic
    console.log('Booking package delivery:', {
      packageType: selectedPackageType,
      speed: selectedSpeed,
      pickupAddress,
      deliveryAddress,
      recipientName,
      recipientPhone,
      packageDescription,
      specialInstructions,
      estimatedPrice: calculatePrice(),
      user: user.email,
    });
    
    alert('Package delivery booked successfully! You will receive tracking information shortly.');
  };

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <PackagesContainer>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GradientHeading level="h1" gradient="primary" align="center">
            Package Delivery
          </GradientHeading>
          <p style={{ 
            fontSize: '1.125rem',
            color: theme.colors.text.secondary,
            margin: '1rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Send packages safely and securely to any destination with real-time tracking
          </p>
        </div>

        {/* Package Types */}
        <GradientHeading level="h2" gradient="secondary" align="center">
          Select Package Type
        </GradientHeading>
        <PackageTypesGrid>
          {packageTypes.map((packageType) => (
            <PackageTypeCard
              key={packageType.id}
              variant="elevated"
              hoverable
              clickable
              $selected={selectedPackageType === packageType.id}
              onClick={() => setSelectedPackageType(packageType.id)}
            >
              <PackageIcon>{packageType.icon}</PackageIcon>
              <PackageTypeName>{packageType.name}</PackageTypeName>
              <PackageDescription>{packageType.description}</PackageDescription>
              <PackageSpecs>
                Max: {packageType.maxWeight} • {packageType.maxSize}
                <br />
                Starting at ${packageType.basePrice}
              </PackageSpecs>
            </PackageTypeCard>
          ))}
        </PackageTypesGrid>

        {/* Delivery Speed */}
        <GradientHeading level="h2" gradient="secondary" align="center">
          Choose Delivery Speed
        </GradientHeading>
        <DeliverySpeedGrid>
          {availableSpeeds.map((speed) => (
            <SpeedCard
              key={speed.id}
              variant="elevated"
              hoverable={speed.available}
              clickable={speed.available}
              $selected={selectedSpeed === speed.id}
              $available={speed.available}
              onClick={() => speed.available && setSelectedSpeed(speed.id)}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{speed.icon}</div>
              <h3 style={{ margin: '0 0 0.25rem', color: theme.colors.text.primary }}>{speed.name}</h3>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: theme.colors.text.secondary }}>
                {speed.time}
              </p>
              <p style={{ margin: '0', fontSize: '0.75rem', color: theme.colors.text.secondary }}>
                {speed.description}
              </p>
              
              {!speed.available && speed.id === 'drone' && (
                <div style={{ 
                  padding: '0.5rem', 
                  background: theme.colors.functional.warning.light, 
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  color: '#f57c00',
                  marginTop: '0.5rem'
                }}>
                  Upgrade to Silver/Gold
                </div>
              )}
            </SpeedCard>
          ))}
        </DeliverySpeedGrid>

        {/* Delivery Form */}
        <GradientHeading level="h2" gradient="secondary" align="center">
          Delivery Details
        </GradientHeading>
        <DeliveryForm>
          <FormSection>
            <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>📍 Pickup Information</h3>
            <TextInput
              label="Pickup Address *"
              placeholder="Enter pickup address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              required
            />
            <TextInput
              label="Package Description"
              placeholder="Describe the package contents"
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
            />
          </FormSection>

          <FormSection>
            <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>📦 Delivery Information</h3>
            <TextInput
              label="Delivery Address *"
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
            <TextInput
              label="Recipient Name *"
              placeholder="Full name of recipient"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
            <TextInput
              label="Recipient Phone"
              placeholder="Phone number for delivery"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          </FormSection>
        </DeliveryForm>

        {/* Special Instructions - Full Width */}
        <div style={{ 
          maxWidth: '1000px', 
          margin: `${theme.spacing.xl} auto`, 
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme.spacing.lg
        }}>
          <TextInput
            label="Special Instructions"
            placeholder="Any special delivery instructions..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </div>

        {/* Price Estimate */}
        {selectedPackageType && (
          <PriceEstimate>
            <h3 style={{ margin: '0 0 1rem', color: theme.colors.text.primary }}>💰 Price Estimate</h3>
            <PriceBreakdown>
              <span>Base Price:</span>
              <span>${packageTypes.find(p => p.id === selectedPackageType)?.basePrice.toFixed(2)}</span>
            </PriceBreakdown>
            <PriceBreakdown>
              <span>Speed Modifier:</span>
              <span>x{deliverySpeeds.find(s => s.id === selectedSpeed)?.priceMultiplier}</span>
            </PriceBreakdown>
            <TotalPrice>
              Total: ${calculatePrice().toFixed(2)}
            </TotalPrice>
          </PriceEstimate>
        )}

        {/* Actions */}
        <FormActions>
          <GradientButton
            variant="primary"
            size="large"
            disabled={!selectedPackageType || !pickupAddress || !deliveryAddress || !recipientName}
            onClick={handleBookDelivery}
          >
            Book Delivery
          </GradientButton>
          <GradientButton
            variant="outline"
            size="large"
            onClick={() => console.log('Schedule delivery for later')}
          >
            Schedule Later
          </GradientButton>
        </FormActions>
        </PackagesContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Page
export default function PackagesPage() {
  return (
    <ProtectedRoute>
      <PackageDeliveryContent />
    </ProtectedRoute>
  );
}