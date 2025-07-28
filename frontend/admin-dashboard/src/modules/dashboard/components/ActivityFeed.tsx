'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ActivityFeedItem } from '../types/dashboard.types';

const FeedContainer = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeedTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const LiveIndicator = styled.div<{ $isLive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme, $isLive }) => 
    $isLive ? theme.colors.functional.success : theme.colors.text.tertiary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme, $isLive }) => 
      $isLive ? theme.colors.functional.success : theme.colors.text.tertiary};
    animation: ${({ $isLive }) => $isLive ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const FeedContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 400px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.medium};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.dark};
  }
`;

const ActivityItem = styled.div<{ $isNew?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  position: relative;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  background: ${({ theme, $isNew }) => 
    $isNew ? theme.colors.functional.infoGradient : 'transparent'};
  animation: ${({ $isNew }) => $isNew ? 'fadeInSlide 0.5s ease-out' : 'none'};

  &:hover {
    background: ${({ theme }) => theme.colors.gradients.secondary};
  }

  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ActivityIcon = styled.div<{ $severity: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  background: ${({ theme, $severity }) => {
    switch ($severity) {
      case 'error': return theme.colors.functional.errorGradient;
      case 'warning': return theme.colors.functional.warningGradient;
      case 'success': return theme.colors.functional.successGradient;
      default: return theme.colors.functional.infoGradient;
    }
  }};
  color: ${({ theme, $severity }) => {
    switch ($severity) {
      case 'error': return theme.colors.functional.error;
      case 'warning': return theme.colors.functional.warning;
      case 'success': return theme.colors.functional.success;
      default: return theme.colors.functional.info;
    }
  }};
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActivityTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
`;

const ActivityDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const ActivityTime = styled.span``;

const ActivityActor = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const EmptyIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`;

const EmptyText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

// Mock data for development
const mockActivityData: ActivityFeedItem[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: 'order',
    severity: 'success',
    title: 'New ride request completed',
    description: 'John Smith completed a ride from Downtown to Airport',
    actor: { id: '1', name: 'John Smith' }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'system',
    severity: 'warning',
    title: 'High demand detected',
    description: 'Surge pricing activated in Downtown area due to high demand',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: 'driver',
    severity: 'info',
    title: 'New driver registered',
    description: 'Sarah Johnson completed registration and background check',
    actor: { id: '2', name: 'Sarah Johnson' }
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    type: 'alert',
    severity: 'error',
    title: 'Payment processing failed',
    description: 'Multiple payment failures detected - investigating issue',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    type: 'user',
    severity: 'success',
    title: '1000th user milestone',
    description: 'Platform reached 1000 active users this month',
  }
];

interface ActivityFeedProps {
  activities?: ActivityFeedItem[];
  isLive?: boolean;
  maxHeight?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities = mockActivityData,
  isLive = true,
  maxHeight = 400
}) => {
  const [newItemIds, setNewItemIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate new items being added
    if (isLive) {
      const interval = setInterval(() => {
        // Add some randomness to simulate real-time updates
        if (Math.random() > 0.7) {
          const newItem: ActivityFeedItem = {
            id: `new-${Date.now()}`,
            timestamp: new Date(),
            type: 'order',
            severity: 'info',
            title: 'Real-time update',
            description: 'This is a simulated real-time activity update',
          };
          
          setNewItemIds(prev => new Set([...prev, newItem.id]));
          
          // Remove the "new" indicator after 5 seconds
          setTimeout(() => {
            setNewItemIds(prev => {
              const updated = new Set(prev);
              updated.delete(newItem.id);
              return updated;
            });
          }, 5000);
        }
      }, 10000); // Every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getActivityIcon = (type: string, severity: string) => {
    switch (type) {
      case 'order': return '🚗';
      case 'driver': return '👤';
      case 'user': return '👥';
      case 'system': return '⚙️';
      case 'alert': return severity === 'error' ? '🚨' : '⚠️';
      default: return 'ℹ️';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedTitle>Activity Feed</FeedTitle>
        <LiveIndicator $isLive={isLive}>
          {isLive ? 'Live' : 'Offline'}
        </LiveIndicator>
      </FeedHeader>

      <FeedContent style={{ maxHeight }}>
        {activities.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyText>No recent activity</EmptyText>
          </EmptyState>
        ) : (
          activities.map((activity) => (
            <ActivityItem 
              key={activity.id}
              $isNew={newItemIds.has(activity.id)}
            >
              <ActivityIcon $severity={activity.severity}>
                {getActivityIcon(activity.type, activity.severity)}
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityDescription>{activity.description}</ActivityDescription>
                <ActivityMeta>
                  <ActivityTime>{formatTime(activity.timestamp)}</ActivityTime>
                  {activity.actor && (
                    <>
                      <span>•</span>
                      <ActivityActor>{activity.actor.name}</ActivityActor>
                    </>
                  )}
                </ActivityMeta>
              </ActivityContent>
            </ActivityItem>
          ))
        )}
      </FeedContent>
    </FeedContainer>
  );
};