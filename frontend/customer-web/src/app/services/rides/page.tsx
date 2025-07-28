'use client';

import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { useSearchParams } from 'next/navigation';
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

const RidesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const BookingSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const LocationInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const VehicleCard = styled(GradientCard)<{ $selected?: boolean }>`
  cursor: pointer;
  border: 2px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary.main : 'transparent'};
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const VehicleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const VehicleIcon = styled.div`
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const VehicleDetails = styled.div`
  flex: 1;
`;

const VehicleName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const VehicleDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const PriceEstimate = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const EstimatedTime = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const RideShareBanner = styled.div<{ $available: boolean }>`
  background: ${({ theme, $available }) => 
    $available 
      ? `linear-gradient(135deg, ${theme.colors.subscription.gold.light} 0%, ${theme.colors.background.paper} 100%)`
      : theme.colors.neutral[100]
  };
  border: 2px solid ${({ theme, $available }) => 
    $available ? theme.colors.subscription.gold.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
  opacity: ${({ $available }) => $available ? 1 : 0.6};
`;

const BookingActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
`;

// Vehicle Types
const vehicleTypes = [
  {
    id: 'economy',
    name: 'Economy',
    icon: '🚗',
    description: 'Affordable rides with reliable cars',
    basePrice: 8.50,
    estimatedTime: '3-5 min',
    available: true,
  },
  {
    id: 'comfort',
    name: 'Comfort',
    icon: '🚙',
    description: 'More space and premium vehicles',
    basePrice: 12.00,
    estimatedTime: '4-6 min',
    available: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: '🚘',
    description: 'Luxury vehicles with professional service',
    basePrice: 18.50,
    estimatedTime: '5-8 min',
    available: true,
  },
  {
    id: 'xl',
    name: 'FlexFlow XL',
    icon: '🚐',
    description: 'Large vehicles for groups up to 6 people',
    basePrice: 15.00,
    estimatedTime: '6-10 min',
    available: true,
  },
];

// Main Component
function RideBookingContent() {
  const theme = useTheme();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isRideShare, setIsRideShare] = useState(false);

  // Check for rideshare parameter from dashboard navigation
  useEffect(() => {
    const rideshareParam = searchParams.get('rideshare');
    if (rideshareParam === 'true' && user?.subscriptionTier === 'gold') {
      setIsRideShare(true);
    }
  }, [searchParams, user?.subscriptionTier]);

  if (!user) return null;

  const canUseRideShare = user.subscriptionTier === 'gold';
  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
  
  const calculatePrice = () => {
    if (!selectedVehicleData) return 0;
    const basePrice = selectedVehicleData.basePrice;
    const shareDiscount = isRideShare && canUseRideShare ? 0.35 : 0; // 35% discount
    return basePrice * (1 - shareDiscount);
  };

  const handleBookRide = () => {
    if (!pickup || !destination || !selectedVehicle) {
      alert('Please fill in all fields and select a vehicle type');
      return;
    }
    
    // TODO: Implement actual booking logic
    console.log('Booking ride:', {
      pickup,
      destination,
      vehicleType: selectedVehicle,
      isRideShare,
      estimatedPrice: calculatePrice(),
      user: user.email,
    });
    
    alert('Ride booked successfully! Driver will be assigned shortly.');
  };

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <RidesContainer>
        {/* Header */}
        <BookingSection>
          <GradientHeading level="h1" gradient="primary" align="center">
            Book a Ride
          </GradientHeading>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.125rem',
            color: theme.colors.text.secondary,
            margin: '1rem 0 2rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Choose your destination and vehicle type for a comfortable journey
          </p>

          {/* Location Inputs */}
          <LocationInputs>
            <TextInput
              label="Pickup Location"
              placeholder="Enter pickup address or use current location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              icon="📍"
            />
            <TextInput
              label="Destination"
              placeholder="Where would you like to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              icon="🎯"
            />
          </LocationInputs>

          {/* Ride Share Banner for Gold Members */}
          {canUseRideShare && (
            <RideShareBanner $available={true}>
              <h3 style={{ margin: '0 0 0.5rem', color: '#f7971e' }}>
                🤝 Gold Member Exclusive: Ride Sharing
              </h3>
              <p style={{ margin: '0 0 1rem', color: theme.colors.text.secondary }}>
                Save 30-40% by sharing your ride with fellow Gold members
              </p>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={isRideShare}
                  onChange={(e) => setIsRideShare(e.target.checked)}
                />
                <span>Enable Ride Sharing</span>
              </label>
            </RideShareBanner>
          )}

          {/* Vehicle Selection */}
          <VehicleGrid>
            {vehicleTypes.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                variant="elevated"
                hoverable
                clickable
                $selected={selectedVehicle === vehicle.id}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <VehicleInfo>
                  <VehicleIcon>{vehicle.icon}</VehicleIcon>
                  <VehicleDetails>
                    <VehicleName>{vehicle.name}</VehicleName>
                    <VehicleDescription>{vehicle.description}</VehicleDescription>
                  </VehicleDetails>
                  <PriceEstimate>
                    <Price>
                      ${selectedVehicle === vehicle.id && isRideShare && canUseRideShare
                        ? (vehicle.basePrice * 0.65).toFixed(2)
                        : vehicle.basePrice.toFixed(2)}
                    </Price>
                    <EstimatedTime>{vehicle.estimatedTime}</EstimatedTime>
                  </PriceEstimate>
                </VehicleInfo>
                
                {selectedVehicle === vehicle.id && isRideShare && canUseRideShare && (
                  <div style={{ 
                    padding: '0.5rem', 
                    background: theme.colors.subscription.gold.light, 
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginTop: '0.5rem'
                  }}>
                    <small style={{ color: '#f7971e', fontWeight: '600' }}>
                      💰 Ride Share Savings: ${(vehicle.basePrice * 0.35).toFixed(2)}
                    </small>
                  </div>
                )}
              </VehicleCard>
            ))}
          </VehicleGrid>

          {/* Booking Actions */}
          <BookingActions>
            {selectedVehicle && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <p style={{ margin: '0', color: theme.colors.text.secondary }}>
                  Estimated total: <strong>${calculatePrice().toFixed(2)}</strong>
                  {isRideShare && canUseRideShare && (
                    <span style={{ color: '#f7971e', display: 'block', fontSize: '0.875rem' }}>
                      🎉 You're saving with Ride Share!
                    </span>
                  )}
                </p>
              </div>
            )}
            
            <GradientButton
              variant="primary"
              size="large"
              fullWidth
              disabled={!pickup || !destination || !selectedVehicle}
              onClick={handleBookRide}
            >
              Book Ride Now
            </GradientButton>
            
            <GradientButton
              variant="outline"
              size="large"
              fullWidth
              onClick={() => console.log('Schedule ride for later')}
            >
              Schedule for Later
            </GradientButton>
          </BookingActions>
        </BookingSection>
        </RidesContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Page
export default function RidesPage() {
  return (
    <ProtectedRoute>
      <RideBookingContent />
    </ProtectedRoute>
  );
}