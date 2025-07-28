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

const RentalContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.light};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const VehicleCard = styled(GradientCard)`
  height: 100%;
  cursor: pointer;
  position: relative;
  z-index: 0;
`;

const VehicleImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05)), 
              url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 1;
  overflow: hidden;
`;

const VehicleBadge = styled.div<{ $type: string }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'premium': return theme.colors.subscription.gold.gradient;
      case 'luxury': return 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)';
      case 'eco': return theme.colors.functional.success.gradient;
      default: return theme.colors.primary.gradient;
    }
  }};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

const VehicleInfo = styled.div`
  flex: 1;
`;

const VehicleName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const VehicleSpecs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const VehicleFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const FeatureBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const PricingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const PriceDisplay = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const PriceUnit = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, $active }) => 
    $active ? theme.colors.primary.main : theme.colors.neutral[300]};
  background: ${({ theme, $active }) => 
    $active ? theme.colors.primary.light : theme.colors.neutral.white};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary.main : theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.light};
  }
`;

// Vehicle Data
const vehicles = [
  {
    id: 1,
    name: 'Toyota Camry',
    type: 'standard',
    category: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    mpg: 32,
    features: ['GPS', 'Bluetooth', 'A/C', 'Backup Camera'],
    pricePerHour: 12,
    pricePerDay: 89,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzQ0OTVFIi8+Cjx0ZXh0IHg9IjE3NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+8J+ahiBTZWRhbjwvdGV4dD4KPC9zdmc+Cg==',
    available: true,
  },
  {
    id: 2,
    name: 'Honda CR-V',
    type: 'standard',
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    mpg: 28,
    features: ['GPS', 'Bluetooth', 'A/C', 'AWD', 'Roof Rack'],
    pricePerHour: 15,
    pricePerDay: 109,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEM3MjVBIi8+Cjx0ZXh0IHg9IjE3NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+8J+ahyBTVVY8L3RleHQ+Cjwvc3ZnPgo=',
    available: true,
  },
  {
    id: 3,
    name: 'Tesla Model 3',
    type: 'eco',
    category: 'Electric',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    mpg: 130, // MPGe
    features: ['Autopilot', 'Premium Audio', 'Supercharging', 'Mobile Connector'],
    pricePerHour: 18,
    pricePerDay: 129,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDBCQ0Q0Ii8+Cjx0ZXh0IHg9IjE3NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+4pqhIEVsZWN0cmljPC90ZXh0Pgo8L3N2Zz4K',
    available: true,
  },
  {
    id: 4,
    name: 'BMW 5 Series',
    type: 'premium',
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    mpg: 26,
    features: ['Premium Audio', 'Leather Seats', 'Navigation', 'Heated Seats', 'Sunroof'],
    pricePerHour: 25,
    pricePerDay: 189,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjc5NzFFIi8+Cjx0ZXh0IHg9IjE3NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+8J+RkSBQcmVtaXVtPC90ZXh0Pgo8L3N2Zz4K',
    available: true,
  },
  {
    id: 5,
    name: 'Mercedes S-Class',
    type: 'luxury',
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    mpg: 23,
    features: ['Chauffeur Service', 'Massage Seats', 'Premium Audio', 'Mini Bar', 'Privacy Glass'],
    pricePerHour: 45,
    pricePerDay: 329,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjE3NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+8J+SjiBMdXh1cnk8L3RleHQ+Cjwvc3ZnPgo=',
    available: true,
  },
  {
    id: 6,
    name: 'Ford Transit Van',
    type: 'standard',
    category: 'Van',
    seats: 12,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    mpg: 18,
    features: ['GPS', 'A/C', 'Multiple Seats', 'Cargo Space'],
    pricePerHour: 20,
    pricePerDay: 149,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDM1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjY3RUVBIi8+Cjx0ZXh0IHg9IjE3NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+8J+agiBWYW48L3RleHQ+Cjwvc3ZnPgo=',
    available: true,
  },
];

const vehicleCategories = ['All', 'Sedan', 'SUV', 'Electric', 'Luxury Sedan', 'Van'];

// Main Component
function CarRentalContent() {
  const theme = useTheme();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  if (!user) return null;

  const filteredVehicles = selectedCategory === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.category === selectedCategory);

  const handleRentVehicle = (vehicle: typeof vehicles[0]) => {
    if (!pickupDate || !returnDate || !pickupLocation) {
      alert('Please fill in pickup date, return date, and pickup location');
      return;
    }
    
    // TODO: Implement actual rental booking logic
    console.log('Renting vehicle:', {
      vehicle: vehicle.name,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      user: user.email,
    });
    
    alert(`${vehicle.name} rental booked successfully! You will receive confirmation details shortly.`);
  };

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <RentalContainer>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GradientHeading level="h1" gradient="primary" align="center">
            Car Rental
          </GradientHeading>
          <p style={{ 
            fontSize: '1.125rem',
            color: theme.colors.text.secondary,
            margin: '1rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Choose from our fleet of well-maintained vehicles for short-term and long-term rentals
          </p>
        </div>

        {/* Search Form */}
        <SearchForm>
          <TextInput
            label="Pickup Date"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
          <TextInput
            label="Pickup Time"
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
          <TextInput
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
          <TextInput
            label="Return Time"
            type="time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
          />
          <div style={{ gridColumn: 'span 2' }}>
            <TextInput
              label="Pickup Location"
              placeholder="Enter pickup address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            />
          </div>
        </SearchForm>

        {/* Category Filter */}
        <FilterSection>
          {vehicleCategories.map((category) => (
            <FilterButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterSection>

        {/* Vehicles Grid */}
        <VehicleGrid>
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              variant="elevated"
              hoverable
              clickable
            >
              <VehicleBadge $type={vehicle.type}>
                {vehicle.type}
              </VehicleBadge>
              
              <VehicleImage $image={vehicle.image} />
              
              <VehicleInfo>
                <VehicleName>{vehicle.name}</VehicleName>
                <p style={{ 
                  margin: '0 0 1rem', 
                  color: theme.colors.text.secondary, 
                  fontSize: '0.875rem' 
                }}>
                  {vehicle.category}
                </p>

                <VehicleSpecs>
                  <SpecItem>
                    <span>👥</span>
                    <span>{vehicle.seats} seats</span>
                  </SpecItem>
                  <SpecItem>
                    <span>⚙️</span>
                    <span>{vehicle.transmission}</span>
                  </SpecItem>
                  <SpecItem>
                    <span>⛽</span>
                    <span>{vehicle.fuel}</span>
                  </SpecItem>
                  <SpecItem>
                    <span>📊</span>
                    <span>{vehicle.mpg} {vehicle.fuel === 'Electric' ? 'MPGe' : 'MPG'}</span>
                  </SpecItem>
                </VehicleSpecs>

                <VehicleFeatures>
                  {vehicle.features.map((feature, index) => (
                    <FeatureBadge key={index}>{feature}</FeatureBadge>
                  ))}
                </VehicleFeatures>

                <PricingInfo>
                  <div>
                    <GradientButton
                      variant="primary"
                      size="medium"
                      disabled={!vehicle.available}
                      onClick={() => handleRentVehicle(vehicle)}
                    >
                      {vehicle.available ? 'Rent Now' : 'Unavailable'}
                    </GradientButton>
                  </div>
                  <PriceDisplay>
                    <Price>${vehicle.pricePerHour}/hr</Price>
                    <PriceUnit>${vehicle.pricePerDay}/day</PriceUnit>
                  </PriceDisplay>
                </PricingInfo>
              </VehicleInfo>
            </VehicleCard>
          ))}
        </VehicleGrid>

        {filteredVehicles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: theme.colors.text.secondary }}>
            <h3>No vehicles found</h3>
            <p>Try selecting a different category or adjust your search criteria.</p>
          </div>
        )}
        </RentalContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Page
export default function RentalPage() {
  return (
    <ProtectedRoute>
      <CarRentalContent />
    </ProtectedRoute>
  );
}