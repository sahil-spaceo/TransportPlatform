'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { GradientHeading } from '@/components/atoms/Typography/GradientHeading';
import { GradientCard } from '@/components/atoms/Card/GradientCard';
import { GradientButton } from '@/components/atoms/Button/GradientButton';
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

const HistoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
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

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const HistoryItem = styled(GradientCard)<{ $status: string }>`
  cursor: pointer;
  border-left: 4px solid ${({ theme, $status }) => {
    switch ($status) {
      case 'completed': return theme.colors.functional.success.main;
      case 'in-progress': return theme.colors.functional.info.main;
      case 'cancelled': return theme.colors.functional.error.main;
      case 'scheduled': return theme.colors.functional.warning.main;
      default: return theme.colors.neutral[300];
    }
  }};
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ServiceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.main};
  flex-shrink: 0;
`;

const ServiceDetails = styled.div`
  flex: 1;
`;

const ServiceTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const ServiceDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const StatusBadge = styled.div<{ $status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $status }) => {
    switch ($status) {
      case 'completed': return theme.colors.functional.success.light;
      case 'in-progress': return theme.colors.functional.info.light;
      case 'cancelled': return theme.colors.functional.error.light;
      case 'scheduled': return theme.colors.functional.warning.light;
      default: return theme.colors.neutral[100];
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'completed': return theme.colors.functional.success.main;
      case 'in-progress': return theme.colors.functional.info.main;
      case 'cancelled': return theme.colors.functional.error.main;
      case 'scheduled': return theme.colors.functional.warning.main;
      default: return theme.colors.text.secondary;
    }
  }};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ItemMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const MetaItem = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MetaLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MetaValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ItemActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Mock Data
const serviceHistory = [
  {
    id: 'ride-001',
    type: 'ride',
    icon: '🚕',
    title: 'Ride to Downtown',
    description: 'Economy ride from Main St to Downtown Plaza',
    status: 'completed',
    date: '2024-01-20',
    time: '14:30',
    amount: '$12.50',
    from: 'Main St & 5th Ave',
    to: 'Downtown Plaza',
    duration: '18 min',
    driver: 'Mike Johnson',
    rating: 5,
    paymentMethod: 'Credit Card ****1234',
  },
  {
    id: 'food-001',
    type: 'food',
    icon: '🍕',
    title: 'Pizza Palace Order',
    description: 'Large Pepperoni Pizza + Garlic Bread',
    status: 'completed',
    date: '2024-01-19',
    time: '19:45',
    amount: '$18.99',
    restaurant: 'Tony\'s Pizza Palace',
    deliveryAddress: '123 Oak Street',
    deliveryTime: '25 min',
    driver: 'Sarah Davis',
    rating: 4,
    paymentMethod: 'Credit Card ****1234',
  },
  {
    id: 'package-001',
    type: 'package',
    icon: '📦',
    title: 'Package Delivery',
    description: 'Small package to Business District',
    status: 'in-progress',
    date: '2024-01-21',
    time: '10:15',
    amount: '$8.99',
    from: '456 Pine Ave',
    to: 'Business District Office',
    recipient: 'John Smith',
    trackingId: 'FF-PKG-789123',
    estimatedDelivery: '12:30 PM',
  },
  {
    id: 'rental-001',
    type: 'rental',
    icon: '🚗',
    title: 'Car Rental',
    description: 'Honda CR-V - 4 hour rental',
    status: 'completed',
    date: '2024-01-18',
    time: '09:00',
    amount: '$45.00',
    vehicle: 'Honda CR-V',
    pickupLocation: 'Downtown Rental Center',
    duration: '4 hours',
    mileage: '127 miles',
    rating: 5,
    paymentMethod: 'Credit Card ****1234',
  },
  {
    id: 'drone-001',
    type: 'drone',
    icon: '🛸',
    title: 'Drone Delivery',
    description: 'Express drone delivery - Electronics',
    status: 'completed',
    date: '2024-01-17',
    time: '16:20',
    amount: '$15.99',
    from: 'TechMart Store',
    to: 'Residential Complex',
    deliveryTime: '12 min',
    weight: '2.3 lbs',
    rating: 5,
    paymentMethod: 'Credit Card ****1234',
  },
  {
    id: 'ride-002',
    type: 'ride',
    icon: '🤝',
    title: 'Shared Ride',
    description: 'Gold tier ride sharing - Airport route',
    status: 'scheduled',
    date: '2024-01-22',
    time: '08:00',
    amount: '$16.80',
    originalPrice: '$28.00',
    savings: '$11.20',
    from: 'Home',
    to: 'International Airport',
    sharedWith: '2 other passengers',
    estimatedTime: '45 min',
  },
];

const serviceTypes = ['All', 'Rides', 'Food', 'Packages', 'Rentals', 'Drone'];
const statusTypes = ['All', 'Completed', 'In Progress', 'Scheduled', 'Cancelled'];

// Main Component
function ServiceHistoryContent() {
  const { user } = useAuth();
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  if (!user) return null;

  const filteredHistory = serviceHistory.filter(item => {
    const typeMatch = selectedType === 'All' || 
      (selectedType === 'Rides' && item.type === 'ride') ||
      (selectedType === 'Food' && item.type === 'food') ||
      (selectedType === 'Packages' && item.type === 'package') ||
      (selectedType === 'Rentals' && item.type === 'rental') ||
      (selectedType === 'Drone' && item.type === 'drone');
    
    const statusMatch = selectedStatus === 'All' || 
      item.status.toLowerCase() === selectedStatus.toLowerCase().replace(' ', '-');
    
    return typeMatch && statusMatch;
  });

  const handleViewDetails = (item: typeof serviceHistory[0]) => {
    console.log('View details for:', item.id);
    // TODO: Navigate to detailed view or show modal
    alert(`Viewing details for ${item.title}`);
  };

  const handleRateService = (item: typeof serviceHistory[0]) => {
    console.log('Rate service:', item.id);
    // TODO: Open rating modal
    alert(`Rate ${item.title}`);
  };

  const handleReorder = (item: typeof serviceHistory[0]) => {
    console.log('Reorder service:', item.id);
    // TODO: Navigate to service booking with pre-filled data
    alert(`Reordering ${item.title}`);
  };

  const handleTrackService = (item: typeof serviceHistory[0]) => {
    console.log('Track service:', item.id);
    // TODO: Navigate to tracking page
    alert(`Tracking ${item.title}`);
  };

  return (
    <PageContainer>
      <Layout noPadding maxWidth="none" transparent>
        <HistoryContainer>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GradientHeading level="h1" gradient="primary" align="center">
            Service History
          </GradientHeading>
          <p style={{ 
            fontSize: '1.125rem',
            color: theme.colors.text.secondary,
            margin: '1rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Track your past and current services, view receipts, and reorder your favorites
          </p>
        </div>

        {/* Service Type Filter */}
        <div style={{ marginBottom: '1rem' }}>
          <GradientHeading level="h3" gradient="secondary" align="center">
            Filter by Service Type
          </GradientHeading>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '0.875rem', 
            color: theme.colors.text.secondary, 
            margin: '0.5rem 0 1rem 0' 
          }}>
            Choose which services to display (rides, food delivery, packages, etc.)
          </p>
        </div>
        <FilterSection>
          {serviceTypes.map((type) => (
            <FilterButton
              key={type}
              $active={selectedType === type}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </FilterButton>
          ))}
        </FilterSection>

        {/* Status Filter */}
        <div style={{ marginBottom: '1rem', marginTop: '2rem' }}>
          <GradientHeading level="h3" gradient="secondary" align="center">
            Filter by Order Status
          </GradientHeading>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '0.875rem', 
            color: theme.colors.text.secondary, 
            margin: '0.5rem 0 1rem 0' 
          }}>
            View orders based on their current status (completed, in progress, scheduled, etc.)
          </p>
        </div>
        <FilterSection>
          {statusTypes.map((status) => (
            <FilterButton
              key={status}
              $active={selectedStatus === status}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </FilterButton>
          ))}
        </FilterSection>

        {/* History List */}
        <HistoryList>
          {filteredHistory.map((item) => (
            <HistoryItem
              key={item.id}
              variant="elevated"
              hoverable
              clickable
              $status={item.status}
              onClick={() => handleViewDetails(item)}
            >
              <ItemHeader>
                <ServiceInfo>
                  <ServiceIcon>{item.icon}</ServiceIcon>
                  <ServiceDetails>
                    <ServiceTitle>{item.title}</ServiceTitle>
                    <ServiceDescription>{item.description}</ServiceDescription>
                  </ServiceDetails>
                </ServiceInfo>
                <div style={{ textAlign: 'right' }}>
                  <StatusBadge $status={item.status}>{item.status}</StatusBadge>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    color: '#ff9a9e',
                    marginTop: '0.5rem'
                  }}>
                    {item.amount}
                  </div>
                  {item.originalPrice && (
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: '#4CAF50',
                      textDecoration: 'line-through'
                    }}>
                      {item.originalPrice}
                    </div>
                  )}
                </div>
              </ItemHeader>

              <ItemMeta>
                <MetaItem>
                  <MetaLabel>📅 Date & Time</MetaLabel>
                  <MetaValue>{item.date} at {item.time}</MetaValue>
                </MetaItem>
                
                {item.from && item.to && (
                  <MetaItem>
                    <MetaLabel>📍 Route</MetaLabel>
                    <MetaValue>{item.from} → {item.to}</MetaValue>
                  </MetaItem>
                )}
                
                {item.restaurant && (
                  <MetaItem>
                    <MetaLabel>🏪 Restaurant</MetaLabel>
                    <MetaValue>{item.restaurant}</MetaValue>
                  </MetaItem>
                )}
                
                {item.vehicle && (
                  <MetaItem>
                    <MetaLabel>🚗 Vehicle</MetaLabel>
                    <MetaValue>{item.vehicle}</MetaValue>
                  </MetaItem>
                )}
                
                {item.duration && (
                  <MetaItem>
                    <MetaLabel>⏱️ Duration</MetaLabel>
                    <MetaValue>{item.duration}</MetaValue>
                  </MetaItem>
                )}
                
                {item.trackingId && (
                  <MetaItem>
                    <MetaLabel>📋 Tracking ID</MetaLabel>
                    <MetaValue>{item.trackingId}</MetaValue>
                  </MetaItem>
                )}
                
                {item.savings && (
                  <MetaItem>
                    <MetaLabel>💰 Savings</MetaLabel>
                    <MetaValue style={{ color: '#4CAF50' }}>{item.savings}</MetaValue>
                  </MetaItem>
                )}
              </ItemMeta>

              <ItemActions>
                {item.status === 'in-progress' && (
                  <GradientButton
                    variant="primary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackService(item);
                    }}
                  >
                    Track Live
                  </GradientButton>
                )}
                
                {item.status === 'completed' && !item.rating && (
                  <GradientButton
                    variant="secondary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRateService(item);
                    }}
                  >
                    Rate Service
                  </GradientButton>
                )}
                
                {(item.type === 'food' || item.type === 'ride') && item.status === 'completed' && (
                  <GradientButton
                    variant="outline"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorder(item);
                    }}
                  >
                    Reorder
                  </GradientButton>
                )}
                
                <GradientButton
                  variant="ghost"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(item);
                  }}
                >
                  View Details
                </GradientButton>
              </ItemActions>
            </HistoryItem>
          ))}
        </HistoryList>

        {filteredHistory.length === 0 && (
          <EmptyState>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3>No services found</h3>
            <p>
              {selectedType !== 'All' || selectedStatus !== 'All' 
                ? 'Try adjusting your filters to see more results.'
                : 'You haven\'t used any services yet. Start by booking a ride or ordering food!'
              }
            </p>
            {selectedType === 'All' && selectedStatus === 'All' && (
              <div style={{ marginTop: '2rem' }}>
                <GradientButton
                  variant="primary"
                  size="large"
                  onClick={() => window.location.href = '/services/rides'}
                >
                  Book Your First Ride
                </GradientButton>
              </div>
            )}
          </EmptyState>
        )}
        </HistoryContainer>
      </Layout>
    </PageContainer>
  );
}

// Protected Page
export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <ServiceHistoryContent />
    </ProtectedRoute>
  );
}