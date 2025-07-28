'use client';

import { useState, useEffect, useCallback } from 'react';

// Accessibility preferences interface
interface AccessibilityPreferences {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
}

// Default accessibility preferences
const defaultPreferences: AccessibilityPreferences = {
  reduceMotion: false,
  highContrast: false,
  largeText: false,
  screenReader: false,
  keyboardNavigation: false,
  focusVisible: true,
};

// Local storage key
const ACCESSIBILITY_STORAGE_KEY = 'flexflow-accessibility-preferences';

// Custom hook for accessibility management
export const useAccessibility = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage and detect system preferences
  useEffect(() => {
    const loadPreferences = () => {
      try {
        // Load saved preferences
        const savedPreferences = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
        let loadedPreferences = defaultPreferences;

        if (savedPreferences) {
          loadedPreferences = {
            ...defaultPreferences,
            ...JSON.parse(savedPreferences),
          };
        }

        // Detect system preferences
        const systemPreferences = detectSystemPreferences();
        
        // Merge with system preferences (system takes precedence if not explicitly set)
        const finalPreferences = {
          ...loadedPreferences,
          ...systemPreferences,
        };

        setPreferences(finalPreferences);
        applyAccessibilityStyles(finalPreferences);
        setIsLoaded(true);
      } catch (error) {
        console.warn('Failed to load accessibility preferences:', error);
        setPreferences(defaultPreferences);
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  // Detect system accessibility preferences
  const detectSystemPreferences = useCallback((): Partial<AccessibilityPreferences> => {
    const systemPrefs: Partial<AccessibilityPreferences> = {};

    // Detect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      systemPrefs.reduceMotion = true;
    }

    // Detect high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      systemPrefs.highContrast = true;
    }

    // Detect screen reader usage
    if (navigator.userAgent.match(/NVDA|JAWS|VoiceOver|ORCA|Dragon/i)) {
      systemPrefs.screenReader = true;
    }

    // Detect keyboard navigation preference
    if (window.matchMedia('(any-hover: none)').matches) {
      systemPrefs.keyboardNavigation = true;
    }

    return systemPrefs;
  }, []);

  // Apply accessibility styles to document
  const applyAccessibilityStyles = useCallback((prefs: AccessibilityPreferences) => {
    const root = document.documentElement;

    // Reduced motion
    if (prefs.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // High contrast
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (prefs.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Screen reader optimization
    if (prefs.screenReader) {
      root.classList.add('screen-reader-optimized');
    } else {
      root.classList.remove('screen-reader-optimized');
    }

    // Keyboard navigation
    if (prefs.keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }

    // Focus visible
    if (prefs.focusVisible) {
      root.classList.add('focus-visible-enabled');
    } else {
      root.classList.remove('focus-visible-enabled');
    }
  }, []);

  // Update specific preference
  const updatePreference = useCallback((key: keyof AccessibilityPreferences, value: boolean) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: value };
      
      // Save to localStorage
      try {
        localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(newPreferences));
      } catch (error) {
        console.warn('Failed to save accessibility preferences:', error);
      }

      // Apply styles
      applyAccessibilityStyles(newPreferences);

      return newPreferences;
    });
  }, [applyAccessibilityStyles]);

  // Reset all preferences to defaults
  const resetPreferences = useCallback(() => {
    const systemPrefs = detectSystemPreferences();
    const resetPrefs = { ...defaultPreferences, ...systemPrefs };
    
    setPreferences(resetPrefs);
    applyAccessibilityStyles(resetPrefs);
    
    try {
      localStorage.removeItem(ACCESSIBILITY_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to reset accessibility preferences:', error);
    }
  }, [detectSystemPreferences, applyAccessibilityStyles]);

  // Announce message to screen readers
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // Focus management
  const manageFocus = useCallback((element: HTMLElement | null, options?: { preventScroll?: boolean }) => {
    if (!element) return;
    
    // Set focus
    element.focus(options);
    
    // Announce focus change to screen readers if needed
    if (preferences.screenReader) {
      const label = element.getAttribute('aria-label') || 
                   element.getAttribute('alt') || 
                   element.textContent || 
                   'Element focused';
      announceToScreenReader(`Focused on ${label}`);
    }
  }, [preferences.screenReader, announceToScreenReader]);

  // Skip links management
  const createSkipLink = useCallback((targetId: string, text: string) => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = text;
    skipLink.className = 'skip-link';
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        manageFocus(target);
      }
    });
    
    return skipLink;
  }, [manageFocus]);

  // Keyboard event handlers
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent, callbacks: {
    onEscape?: () => void;
    onEnter?: () => void;
    onSpace?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onTab?: () => void;
  }) => {
    switch (event.key) {
      case 'Escape':
        callbacks.onEscape?.();
        break;
      case 'Enter':
        callbacks.onEnter?.();
        break;
      case ' ':
        event.preventDefault();
        callbacks.onSpace?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        callbacks.onArrowUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        callbacks.onArrowDown?.();
        break;
      case 'ArrowLeft':
        callbacks.onArrowLeft?.();
        break;
      case 'ArrowRight':
        callbacks.onArrowRight?.();
        break;
      case 'Tab':
        callbacks.onTab?.();
        break;
    }
  }, []);

  return {
    preferences,
    isLoaded,
    updatePreference,
    resetPreferences,
    announceToScreenReader,
    manageFocus,
    createSkipLink,
    handleKeyboardNavigation,
  };
};

export default useAccessibility;