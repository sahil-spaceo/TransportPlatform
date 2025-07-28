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

const FoodContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const DeliveryOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const DeliveryCard = styled(GradientCard)<{ $selected?: boolean; $available?: boolean }>`
  cursor: ${({ $available }) => $available ? 'pointer' : 'not-allowed'};
  opacity: ${({ $available }) => $available ? 1 : 0.5};
  border: 2px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary.main : 'transparent'};
  text-align: center;
  
  &:hover {
    border-color: ${({ theme, $available }) => 
      $available ? theme.colors.primary.light : 'transparent'};
  }
`;

const DeliveryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DeliveryType = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const DeliveryDetails = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const RestaurantCard = styled(GradientCard)`
  height: 100%;
  cursor: pointer;
`;

const RestaurantImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 160px;
  background: linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), 
              url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

const RestaurantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RestaurantName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const RestaurantRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const RestaurantMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, $active }) => 
    $active ? theme.colors.primary.main : theme.colors.neutral[300]};
  background: ${({ theme, $active }) => 
    $active ? theme.colors.primary.light : theme.colors.background.paper};
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

// Mock Data
const deliveryTypes = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    icon: '🚗',
    time: '25-35 min',
    fee: '$2.99',
    description: 'Regular ground delivery',
    available: true,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    icon: '⚡',
    time: '15-25 min',
    fee: '$4.99',
    description: 'Priority ground delivery',
    available: true,
  },
  {
    id: 'drone',
    name: 'Drone Delivery',
    icon: '🛸',
    time: '8-12 min',
    fee: '$6.99',
    description: 'Ultra-fast aerial delivery',
    available: false, // Will be set based on subscription
  },
];

const foodCategories = [
  'All', 'Pizza', 'Burgers', 'Asian', 'Mexican', 'Italian', 'Healthy', 'Desserts', 'Coffee'
];

const restaurants = [
  {
    id: 1,
    name: 'Tony\'s Pizza Palace',
    cuisine: 'Pizza',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 'Free',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRkY2MzQ3Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj7wn42VIFBpenphPC90ZXh0Pgo8L3N2Zz4K',
    specialOffer: '20% off orders over $25',
  },
  {
    id: 2,
    name: 'Dragon Wok',
    cuisine: 'Asian',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: '$1.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRkY4RjAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj7wn42cIEFzaWFuPC90ZXh0Pgo8L3N2Zz4K',
  },
  {
    id: 3,
    name: 'Burger Junction',
    cuisine: 'Burgers',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 'Free',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjOEJCQjNFIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj7wn42UIEJ1cmdlcjwvdGV4dD4KPC9zdmc+Cg==',
    specialOffer: 'Buy 2 get 1 free',
  },
  {
    id: 4,
    name: 'Green Bowl',
    cuisine: 'Healthy',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.49',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjNENBRjUwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj7wn42WIEhlYWx0aHk8L3RleHQ+Cjwvc3ZnPgo=',
  },
  {
    id: 5,
    name: 'Mama\'s Italian',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: '$1.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj7wn42dIEl0YWxpYW48L3RleHQ+Cjwvc3ZnPgo=',
  },
  {
    id: 6,
    name: 'Sweet Dreams Bakery',
    cuisine: 'Desserts',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: 'Free',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDMwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRTkxRTYzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj7wn42wIERlc3NlcnRzPC90ZXh0Pgo8L3N2Zz4K',
  },
];

// Main Component
function FoodDeliveryContent() {
  const theme = useTheme();
  const { user } = useAuth();
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!user) return null;

  const canUseDrone = user.subscriptionTier === 'silver' || user.subscriptionTier === 'gold';
  
  // Update drone availability based on subscription
  const availableDeliveryTypes = deliveryTypes.map(type => ({
    ...type,
    available: type.id === 'drone' ? canUseDrone : type.available
  }));

  const filteredRestaurants = selectedCategory === 'All' 
    ? restaurants 
    : restaurants.filter(r => r.cuisine === selectedCategory);

  const handleRestaurantClick = (restaurant: typeof restaurants[0]) => {
    console.log('Opening restaurant:', restaurant.name);
    // TODO: Navigate to restaurant menu page
    alert(`Opening ${restaurant.name} menu...`);
  };

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <FoodContainer>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GradientHeading level="h1" gradient="primary" align="center">
            Food Delivery
          </GradientHeading>
          <p style={{ 
            fontSize: '1.125rem',
            color: theme.colors.text.secondary,
            margin: '1rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Delicious meals delivered to your doorstep from your favorite restaurants
          </p>

          {/* Delivery Address */}
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <TextInput
              label="Delivery Address"
              placeholder="Enter your delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              icon="📍"
            />
          </div>
        </div>

        {/* Delivery Options */}
        <DeliveryOptions>
          {availableDeliveryTypes.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              variant="elevated"
              hoverable={delivery.available}
              clickable={delivery.available}
              $selected={selectedDelivery === delivery.id}
              $available={delivery.available}
              onClick={() => delivery.available && setSelectedDelivery(delivery.id)}
            >
              <DeliveryIcon>{delivery.icon}</DeliveryIcon>
              <DeliveryType>{delivery.name}</DeliveryType>
              <DeliveryDetails>
                <div>{delivery.time}</div>
                <div style={{ fontWeight: '600', color: '#ff9a9e' }}>{delivery.fee}</div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {delivery.description}
                </div>
              </DeliveryDetails>
              
              {!delivery.available && delivery.id === 'drone' && (
                <div style={{ 
                  padding: '0.5rem', 
                  background: theme.colors.functional.warning.light, 
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  color: '#f57c00'
                }}>
                  Upgrade to Silver/Gold for drone delivery
                </div>
              )}
            </DeliveryCard>
          ))}
        </DeliveryOptions>

        {/* Category Filter */}
        <CategoryFilter>
          {foodCategories.map((category) => (
            <CategoryButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        {/* Restaurants Grid */}
        <RestaurantGrid>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              variant="elevated"
              hoverable
              clickable
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <RestaurantImage $image={restaurant.image} />
              
              <RestaurantInfo>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantRating>
                  <span>⭐</span>
                  <span>{restaurant.rating}</span>
                </RestaurantRating>
              </RestaurantInfo>

              <RestaurantMeta>
                <span>{restaurant.deliveryTime}</span>
                <span style={{ color: restaurant.deliveryFee === 'Free' ? '#4CAF50' : theme.colors.text.secondary }}>
                  {restaurant.deliveryFee}
                </span>
              </RestaurantMeta>

              {restaurant.specialOffer && (
                <div style={{
                  background: theme.colors.functional.warning.light,
                  padding: '0.5rem',
                  borderRadius: '8px',
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#f57c00',
                  textAlign: 'center'
                }}>
                  🎉 {restaurant.specialOffer}
                </div>
              )}
            </RestaurantCard>
          ))}
        </RestaurantGrid>

        {filteredRestaurants.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: theme.colors.text.secondary }}>
            <h3>No restaurants found</h3>
            <p>Try selecting a different category or check back later for new options.</p>
          </div>
        )}
        </FoodContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Page
export default function FoodPage() {
  return (
    <ProtectedRoute>
      <FoodDeliveryContent />
    </ProtectedRoute>
  );
}