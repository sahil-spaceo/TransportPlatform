'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import GradientButton from '@/components/common/GradientButton';
import { useAuth } from '../hooks/useAuth';

const ModalOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.overlay};
  display: ${({ $isVisible }) => $isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  backdrop-filter: blur(8px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing['2xl']};
  max-width: 480px;
  width: 90%;
  text-align: center;
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.8;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CountdownContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CountdownText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.functional.warning};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CountdownBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const CountdownProgress = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ theme }) => theme.colors.functional.warningGradient};
  transition: width 1s linear;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

interface SessionTimeoutProps {
  warningTime?: number; // Time in minutes before session expires to show warning
  sessionDuration?: number; // Total session duration in minutes
}

export const SessionTimeout: React.FC<SessionTimeoutProps> = ({
  warningTime = 5, // Show warning 5 minutes before expiry
  sessionDuration = 60, // 1 hour session
}) => {
  const { logout, refreshToken, state } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(warningTime * 60); // Convert to seconds
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Track user activity
  const resetActivity = useCallback(() => {
    setLastActivity(Date.now());
    if (showWarning) {
      setShowWarning(false);
      setCountdown(warningTime * 60);
    }
  }, [showWarning, warningTime]);

  // Activity event listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => resetActivity();
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [resetActivity]);

  // Session timeout timer
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const checkSession = () => {
      const now = Date.now();
      const timeSinceActivity = (now - lastActivity) / 1000 / 60; // Convert to minutes
      const timeUntilExpiry = sessionDuration - timeSinceActivity;

      if (timeUntilExpiry <= 0) {
        // Session expired
        logout();
        return;
      }

      if (timeUntilExpiry <= warningTime && !showWarning) {
        // Show warning
        setShowWarning(true);
        setCountdown(timeUntilExpiry * 60); // Convert to seconds
      }
    };

    const interval = setInterval(checkSession, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [state.isAuthenticated, lastActivity, sessionDuration, warningTime, showWarning, logout]);

  // Countdown timer
  useEffect(() => {
    if (!showWarning) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showWarning, logout]);

  const handleExtendSession = async () => {
    try {
      await refreshToken();
      resetActivity();
    } catch (error) {
      console.error('Failed to extend session:', error);
      logout();
    }
  };

  const handleLogoutNow = () => {
    logout();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalSeconds = warningTime * 60;
    return (countdown / totalSeconds) * 100;
  };

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <ModalOverlay $isVisible={showWarning}>
      <ModalContent>
        <Icon>⏰</Icon>
        <Title>Session Timeout Warning</Title>
        <Message>
          Your session is about to expire due to inactivity. You will be automatically 
          logged out unless you choose to extend your session.
        </Message>

        <CountdownContainer>
          <CountdownText>
            Time remaining: {formatTime(countdown)}
          </CountdownText>
          <CountdownBar>
            <CountdownProgress $progress={getProgressPercentage()} />
          </CountdownBar>
        </CountdownContainer>

        <ButtonContainer>
          <GradientButton
            variant="secondary"
            size="medium"
            onClick={handleLogoutNow}
          >
            Logout Now
          </GradientButton>
          <GradientButton
            variant="primary"
            size="medium"
            onClick={handleExtendSession}
          >
            Extend Session
          </GradientButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};