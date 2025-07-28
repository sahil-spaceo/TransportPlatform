'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Live Region Types
type LiveRegionPoliteness = 'off' | 'polite' | 'assertive';
type LiveRegionAtomic = boolean;
type LiveRegionRelevant = 'additions' | 'removals' | 'text' | 'all';

// Styled Live Region (visually hidden but accessible to screen readers)
const StyledLiveRegion = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  
  /* Ensure it's announced by screen readers */
  &[aria-live] {
    clip: auto;
    width: auto;
    height: auto;
  }
`;

// Live Region Props Interface
export interface LiveRegionProps {
  children?: React.ReactNode;
  politeness?: LiveRegionPoliteness;
  atomic?: LiveRegionAtomic;
  relevant?: LiveRegionRelevant;
  label?: string;
  id?: string;
  className?: string;
}

// Live Region Component
export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  politeness = 'polite',
  atomic = true,
  relevant = 'all',
  label,
  id,
  className,
}) => {
  const regionRef = useRef<HTMLDivElement>(null);

  return (
    <StyledLiveRegion
      ref={regionRef}
      id={id}
      className={className}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      aria-label={label}
      role="status"
    >
      {children}
    </StyledLiveRegion>
  );
};

// Status Message Component (for success/error messages)
export interface StatusMessageProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  politeness?: LiveRegionPoliteness;
  timeout?: number;
  onDismiss?: () => void;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  message,
  type = 'info',
  politeness = 'polite',
  timeout,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    if (timeout && timeout > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, onDismiss]);

  if (!isVisible) return null;

  const typeLabels = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  };

  return (
    <LiveRegion
      politeness={type === 'error' ? 'assertive' : politeness}
      label={`${typeLabels[type]} message`}
    >
      {`${typeLabels[type]}: ${message}`}
    </LiveRegion>
  );
};

// Loading Announcement Component
export interface LoadingAnnouncementProps {
  isLoading: boolean;
  loadingMessage?: string;
  completedMessage?: string;
  politeness?: LiveRegionPoliteness;
}

export const LoadingAnnouncement: React.FC<LoadingAnnouncementProps> = ({
  isLoading,
  loadingMessage = 'Loading content',
  completedMessage = 'Content loaded',
  politeness = 'polite',
}) => {
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    if (isLoading) {
      setMessage(loadingMessage);
    } else if (message === loadingMessage) {
      // Only announce completion if we were previously loading
      setMessage(completedMessage);
      
      // Clear the message after a brief delay
      setTimeout(() => setMessage(''), 1000);
    }
  }, [isLoading, loadingMessage, completedMessage, message]);

  return (
    <LiveRegion
      politeness={politeness}
      label="Loading status"
    >
      {message}
    </LiveRegion>
  );
};

// Progress Announcement Component
export interface ProgressAnnouncementProps {
  progress: number;
  total: number;
  label?: string;
  announceEvery?: number;
  politeness?: LiveRegionPoliteness;
}

export const ProgressAnnouncement: React.FC<ProgressAnnouncementProps> = ({
  progress,
  total,
  label = 'Progress',
  announceEvery = 25,
  politeness = 'polite',
}) => {
  const [lastAnnounced, setLastAnnounced] = React.useState(0);
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    const percentage = Math.round((progress / total) * 100);
    
    // Announce progress at specified intervals or at completion
    if (
      percentage >= lastAnnounced + announceEvery || 
      percentage === 100 ||
      (percentage === 0 && lastAnnounced > 0)
    ) {
      setLastAnnounced(percentage);
      setMessage(`${label}: ${percentage}% complete`);
      
      // Clear message after announcement
      setTimeout(() => setMessage(''), 1000);
    }
  }, [progress, total, label, announceEvery, lastAnnounced]);

  return (
    <LiveRegion
      politeness={politeness}
      label="Progress update"
    >
      {message}
    </LiveRegion>
  );
};

// Navigation Announcement Component
export interface NavigationAnnouncementProps {
  currentPage: string;
  totalPages?: number;
  currentStep?: number;
  totalSteps?: number;
  politeness?: LiveRegionPoliteness;
}

export const NavigationAnnouncement: React.FC<NavigationAnnouncementProps> = ({
  currentPage,
  totalPages,
  currentStep,
  totalSteps,
  politeness = 'polite',
}) => {
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    let announcement = `Navigated to ${currentPage}`;
    
    if (currentStep && totalSteps) {
      announcement += `, step ${currentStep} of ${totalSteps}`;
    } else if (totalPages) {
      announcement += `, page information available`;
    }

    setMessage(announcement);
    
    // Clear message after announcement
    setTimeout(() => setMessage(''), 2000);
  }, [currentPage, totalPages, currentStep, totalSteps]);

  return (
    <LiveRegion
      politeness={politeness}
      label="Navigation update"
    >
      {message}
    </LiveRegion>
  );
};

// Form Validation Announcement Component
export interface ValidationAnnouncementProps {
  errors: string[];
  fieldName?: string;
  politeness?: LiveRegionPoliteness;
}

export const ValidationAnnouncement: React.FC<ValidationAnnouncementProps> = ({
  errors,
  fieldName,
  politeness = 'assertive',
}) => {
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    if (errors.length > 0) {
      const errorText = errors.join('. ');
      const announcement = fieldName 
        ? `${fieldName} has errors: ${errorText}`
        : `Form validation errors: ${errorText}`;
      
      setMessage(announcement);
    } else {
      setMessage('');
    }
  }, [errors, fieldName]);

  return (
    <LiveRegion
      politeness={politeness}
      label="Form validation"
    >
      {message}
    </LiveRegion>
  );
};

export default LiveRegion;