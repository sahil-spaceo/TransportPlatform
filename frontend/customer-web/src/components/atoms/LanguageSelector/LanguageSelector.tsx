'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, isRTL } from '@/i18n/simple-config';

// Styled Components
const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: visible; /* Ensure dropdown can extend beyond container */
`;

const SelectorButton = styled.button<{ $isOpen: boolean; $compact?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal};
  min-width: ${({ $compact }) => $compact ? 'auto' : '120px'};
  justify-content: space-between;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: auto;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }

  ${({ $isOpen, theme }) => $isOpen && css`
    border-color: ${theme.colors.primary.main};
    background: ${theme.colors.background.default};
  `}
`;

const SelectedLanguage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LanguageFlag = styled.span`
  font-size: 1.2em;
  line-height: 1;
`;

const LanguageName = styled.span`
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform ${({ theme }) => theme.animations.duration.fast};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: ${({ theme }) => theme.zIndex.sticky + 100}; /* Higher than header */
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transform: translateY(${({ $isOpen }) => $isOpen ? '0' : '-10px'});
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: all ${({ theme }) => theme.animations.duration.normal};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  max-height: 300px;
  overflow-y: auto;
  min-width: 150px;
`;

const LanguageOption = styled.button<{ $isActive: boolean; $isRTL: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary.light : 'transparent'};
  border: none;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary.main : theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.bodySmall};
  text-align: left;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:first-child {
    border-radius: ${({ theme }) => theme.borderRadius.medium} ${({ theme }) => theme.borderRadius.medium} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${({ theme }) => theme.borderRadius.medium} ${({ theme }) => theme.borderRadius.medium};
  }

  &:only-child {
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`;

const LanguageDetails = styled.div<{ $isRTL: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isRTL }) => $isRTL ? 'flex-end' : 'flex-start'};
  flex: 1;
`;

const LanguageDisplayName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
`;

const LanguageNativeName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.2;
`;

const ActiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  margin-left: auto;
`;

// Component Props Interface
export interface LanguageSelectorProps {
  className?: string;
  showNativeName?: boolean;
  compact?: boolean;
}

// Main Component
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  showNativeName = true,
  compact = false,
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen && isPositioned) {
        updateDropdownPosition();
      }
    };

    const handleScroll = () => {
      if (isOpen && isPositioned) {
        updateDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, isPositioned]);

  // Handle language change
  const handleLanguageChange = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      
      // Update HTML dir attribute for RTL languages
      const htmlElement = document.documentElement;
      if (isRTL(languageCode)) {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', languageCode);
      } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', languageCode);
      }

      // Store language preference
      localStorage.setItem('language', languageCode);
      
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && supportedLanguages.some(lang => lang.code === savedLanguage)) {
      handleLanguageChange(savedLanguage);
    }
  }, []);

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (selectorRef.current) {
      const rect = selectorRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4, // Add scroll offset
        left: rect.left + window.scrollX, // Add scroll offset
        width: rect.width
      });
      setIsPositioned(true);
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      setIsPositioned(false);
      // Use requestAnimationFrame to ensure position is calculated before showing
      requestAnimationFrame(() => {
        updateDropdownPosition();
        setIsOpen(true);
      });
    } else {
      setIsOpen(false);
      setIsPositioned(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <SelectorContainer ref={selectorRef} className={className}>
      <SelectorButton
        $isOpen={isOpen}
        $compact={compact}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <SelectedLanguage>
          <LanguageFlag>{currentLanguage.flag}</LanguageFlag>
          {!compact && (
            <LanguageName>
              {showNativeName ? currentLanguage.nativeName : currentLanguage.name}
            </LanguageName>
          )}
        </SelectedLanguage>
        <ChevronIcon $isOpen={isOpen}>▼</ChevronIcon>
      </SelectorButton>

      <DropdownMenu 
        $isOpen={isOpen && isPositioned} 
        role="listbox"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`
        }}
      >
        {supportedLanguages.map((language) => (
          <LanguageOption
            key={language.code}
            $isActive={language.code === currentLanguage.code}
            $isRTL={language.dir === 'rtl'}
            onClick={() => handleLanguageChange(language.code)}
            role="option"
            aria-selected={language.code === currentLanguage.code}
          >
            <LanguageFlag>{language.flag}</LanguageFlag>
            <LanguageDetails $isRTL={language.dir === 'rtl'}>
              <LanguageDisplayName>{language.name}</LanguageDisplayName>
              {showNativeName && language.nativeName !== language.name && (
                <LanguageNativeName>{language.nativeName}</LanguageNativeName>
              )}
            </LanguageDetails>
            {language.code === currentLanguage.code && <ActiveIndicator />}
          </LanguageOption>
        ))}
      </DropdownMenu>
    </SelectorContainer>
  );
};

export default LanguageSelector;