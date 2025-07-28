'use client';

import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext';

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: visible; /* Allow tooltip to extend beyond button */
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const ThemeIcon = styled.div<{ $mode: string }>`
  font-size: 1.25rem;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  transform: ${({ $mode }) => {
    switch ($mode) {
      case 'light': return 'rotate(0deg)';
      case 'dark': return 'rotate(180deg)';
      case 'system': return 'rotate(90deg)';
      default: return 'rotate(0deg)';
    }
  }};
`;

const TooltipText = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral.white};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  white-space: nowrap;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  visibility: ${({ $visible }) => $visible ? 'visible' : 'hidden'};
  transition: all ${({ theme }) => theme.animations.duration.normal};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-bottom-color: ${({ theme }) => theme.colors.neutral[900]};
  }
`;

export const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = React.useState(false);

  const getThemeIcon = (mode: string) => {
    switch (mode) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '🌓';
      default:
        return '☀️';
    }
  };

  const getThemeLabel = (mode: string) => {
    switch (mode) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System theme';
      default:
        return 'Light mode';
    }
  };

  return (
    <ToggleContainer
      onClick={toggleTheme}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      aria-label={`Current theme: ${getThemeLabel(themeMode)}. Click to cycle themes.`}
      title={getThemeLabel(themeMode)}
    >
      <ThemeIcon $mode={themeMode}>
        {getThemeIcon(themeMode)}
      </ThemeIcon>
      
      <TooltipText $visible={showTooltip}>
        {getThemeLabel(themeMode)}
      </TooltipText>
    </ToggleContainer>
  );
};

export default ThemeToggle;