// FlexFlow Marketing Website - Complete Theme System
// Innovation & Trust Design Philosophy with Full Spectrum Gradients

import type { MarketingTheme } from '@/types/marketing.types';

// Full Spectrum Marketing Theme - According to UIUX Architecture
export const marketingTheme: MarketingTheme = {
  colors: {
    solid: {
      brand: {
        primary: '#8b9bef', // Lighter version of #667eea
        secondary: '#73c1ff', // Lighter version of #4facfe  
        accent: '#6df099', // Lighter version of #43e97b
      },
      neutral: {
        50: '#fafbfc',
        100: '#f7f8fa',
        200: '#edf0f2',
        300: '#e1e5e9',
        400: '#b8c1cc',
        500: '#8b95a1',
        600: '#697384',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
        950: '#0f1419',
      },
      black: '#2d3748', // Softer black
      white: '#ffffff',
    },
    
    // Full Spectrum Gradient System - Innovation & Trust (Lighter Contrasts)
    gradients: {
      // Primary marketing gradients (lighter, softer contrasts)
      primary: 'linear-gradient(135deg, #8b9bef 0%, #9d7ec4 25%, #f5a6fd 50%, #ffe8ff 100%)',
      secondary: 'linear-gradient(135deg, #73c1ff 0%, #5de8ff 100%)',
      accent: 'linear-gradient(135deg, #6df099 0%, #6ffae8 100%)',
      hero: 'linear-gradient(135deg, #8b9bef 0%, #9d7ec4 20%, #f5a6fd 40%, #6df099 60%, #73c1ff 80%, #ffe8ff 100%)',
      
      // Service-specific gradients (lighter, more accessible)
      services: {
        'ride-hailing': 'linear-gradient(135deg, #8b9bef 0%, #9d7ec4 50%, #b084d1 100%)',
        'ride-sharing': 'linear-gradient(135deg, #6df099 0%, #6ffae8 50%, #5dedb7 100%)',
        'car-rental': 'linear-gradient(135deg, #f5a6fd 0%, #ff8ca3 50%, #ff7b7b 100%)',
        'food-delivery': 'linear-gradient(135deg, #fff5e6 0%, #ffe0c4 50%, #ffb574 100%)',
        'package-delivery': 'linear-gradient(135deg, #c4f5f2 0%, #ffeaf0 50%, #ffd666 100%)',
        'drone-delivery': 'linear-gradient(135deg, #73c1ff 0%, #5de8ff 50%, #4dc7f5 100%)',
      },
      
      // UI gradients (softer, lighter)
      card: 'linear-gradient(135deg, rgba(250, 251, 252, 0.95) 0%, rgba(247, 248, 250, 0.85) 100%)',
      button: 'linear-gradient(135deg, #8b9bef 0%, #9d7ec4 100%)',
      background: 'linear-gradient(135deg, #fafbfc 0%, #f7f8fa 100%)',
      overlay: 'linear-gradient(135deg, rgba(45, 55, 72, 0.6) 0%, rgba(45, 55, 72, 0.2) 100%)',
      text: 'linear-gradient(135deg, #8b9bef 0%, #f5a6fd 50%, #6df099 100%)',
    },
    
    text: {
      primary: '#1a202c', // Softer than pure black
      secondary: '#697384', // Lighter contrast
      tertiary: '#b8c1cc', // Much lighter for better contrast
      inverse: '#ffffff',
      gradient: 'linear-gradient(135deg, #8b9bef 0%, #f5a6fd 50%, #6df099 100%)',
    },
    
    background: {
      default: '#ffffff',
      paper: '#fafbfc', // Slightly warmer white
      overlay: 'rgba(45, 55, 72, 0.4)', // Softer overlay
      hero: 'linear-gradient(135deg, #8b9bef 0%, #9d7ec4 20%, #f5a6fd 40%, #6df099 60%, #73c1ff 80%, #ffe8ff 100%)',
    },
    
    border: {
      light: '#edf0f2', // Lighter border
      medium: '#e1e5e9', // Softer medium border
      dark: '#b8c1cc', // Much lighter dark border
      gradient: 'linear-gradient(135deg, #8b9bef 0%, #f5a6fd 100%)',
    },
    
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  
  // Typography System - Inter, Poppins, Space Grotesk, JetBrains Mono
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
    },
    
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem', // 72px
      '8xl': '6rem', // 96px
      '9xl': '8rem', // 128px
    },
    
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // Spacing System - 8-point grid
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    11: '2.75rem', // 44px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    28: '7rem', // 112px
    32: '8rem', // 128px
    36: '9rem', // 144px
    40: '10rem', // 160px
    44: '11rem', // 176px
    48: '12rem', // 192px
    52: '13rem', // 208px
    56: '14rem', // 224px
    60: '15rem', // 240px
    64: '16rem', // 256px
    72: '18rem', // 288px
    80: '20rem', // 320px
    96: '24rem', // 384px
  },
  
  // Border Radius System
  borderRadius: {
    none: '0px',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadow System with Gradient Glows
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    
    // Gradient shadow effects
    gradient: '0 10px 40px -10px rgba(102, 126, 234, 0.3), 0 0 20px rgba(240, 147, 251, 0.2)',
    glow: {
      primary: '0 0 30px rgba(102, 126, 234, 0.5)',
      secondary: '0 0 30px rgba(79, 172, 254, 0.5)',
      accent: '0 0 30px rgba(67, 233, 123, 0.5)',
    },
  },
  
  // Breakpoint System
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-Index System
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Animation System - 4 Duration Levels with Spring/Bounce Easing
  animations: {
    duration: {
      instant: '75ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    
    // Framer Motion variants
    variants: {
      fadeIn: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      },
      slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      },
      slideDown: {
        hidden: { opacity: 0, y: -30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      },
      slideLeft: {
        hidden: { opacity: 0, x: 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      },
      slideRight: {
        hidden: { opacity: 0, x: -30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      },
      scaleIn: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, ease: 'spring' }
        }
      },
      scaleOut: {
        hidden: { opacity: 1, scale: 1 },
        visible: {
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.3, ease: 'easeOut' }
        }
      },
      rotate: {
        hidden: { opacity: 0, rotate: -10 },
        visible: {
          opacity: 1,
          rotate: 0,
          transition: { duration: 0.5, ease: 'spring' }
        }
      },
      bounce: {
        hidden: { opacity: 0, scale: 0.3 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: 'bounce' }
        }
      },
      elastic: {
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: 'spring', bounce: 0.4 }
        }
      },
    },
  },
};

// Service-specific theme variants
export const getServiceTheme = (service: string) => {
  const serviceGradients = marketingTheme.colors.gradients.services;
  const baseTheme = { ...marketingTheme };
  
  if (service in serviceGradients) {
    baseTheme.colors.gradients.primary = serviceGradients[service as keyof typeof serviceGradients];
    baseTheme.colors.gradients.button = serviceGradients[service as keyof typeof serviceGradients];
  }
  
  return baseTheme;
};

// Utility functions for theme manipulation
export const getServiceGradient = (service: string): string => {
  return marketingTheme.colors.gradients.services[service as keyof typeof marketingTheme.colors.gradients.services] || marketingTheme.colors.gradients.primary;
};

export const lightenGradient = (gradient: string, amount: number = 0.1): string => {
  // This would implement gradient lightening logic
  return gradient;
};

export const darkenGradient = (gradient: string, amount: number = 0.1): string => {
  // This would implement gradient darkening logic
  return gradient;
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
};

export default marketingTheme;