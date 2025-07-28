import { DefaultTheme } from 'styled-components';

// Re-export themes from themes.ts for compatibility
export { lightTheme as customerTheme, darkTheme, lightTheme } from './themes';

// Legacy theme configuration (keeping for backwards compatibility)
const legacyCustomerTheme: DefaultTheme = {
  // Brand Identity Colors
  colors: {
    primary: {
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
      light: '#fff5f0',
      main: '#ff9a9e',
      dark: '#e8817d',
      contrastText: '#ffffff',
    },
    secondary: {
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      light: '#f0fffe',
      main: '#a8edea',
      dark: '#7dd3d8',
      contrastText: '#2c3e50',
    },
    accent: {
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
      light: '#fef9fd',
      main: '#ffd1ff',
      dark: '#e6b8ff',
    },
    // Subscription Tier Colors
    subscription: {
      basic: {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        main: '#667eea',
        light: '#e8eeff',
      },
      silver: {
        gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
        main: '#bdc3c7',
        light: '#f5f6f7',
      },
      gold: {
        gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        main: '#f7971e',
        light: '#fff8e1',
      },
    },
    // Functional Colors
    functional: {
      success: {
        gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
        main: '#43e97b',
        light: '#f0fff0',
        dark: '#2e7d32',
      },
      warning: {
        gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        main: '#ff9500',
        light: '#fff8e1',
        dark: '#f57c00',
      },
      error: {
        gradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
        main: '#ff5757',
        light: '#ffebee',
        dark: '#d32f2f',
      },
      info: {
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        main: '#4facfe',
        light: '#e3f2fd',
        dark: '#0277bd',
      },
    },
    // Neutral Colors - Light Theme
    neutral: {
      white: '#ffffff',
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    // Dark Theme Support
    dark: {
      50: '#1a1a1a',
      100: '#2d2d2d',
      200: '#404040',
      300: '#525252',
      400: '#737373',
      500: '#a3a3a3',
      600: '#d4d4d4',
      700: '#e5e5e5',
      800: '#f5f5f5',
      900: '#ffffff',
    },
    // Background Colors
    background: {
      default: '#ffffff',
      paper: '#fafafa',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #a8edea 75%, #fed6e3 100%)',
    },
    // Text Colors
    text: {
      primary: '#212121',
      secondary: '#616161',
      disabled: '#9e9e9e',
      hint: '#bdbdbd',
    },
  },

  // Typography System
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
      display: '"Space Grotesk", "Inter", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    fontSize: {
      // Display Text
      display1: '4.5rem',   // 72px
      display2: '3.75rem',  // 60px
      display3: '3rem',     // 48px
      // Headlines
      h1: '2.5rem',         // 40px
      h2: '2rem',           // 32px
      h3: '1.75rem',        // 28px
      h4: '1.5rem',         // 24px
      h5: '1.25rem',        // 20px
      h6: '1.125rem',       // 18px
      // Body Text
      bodyLarge: '1.125rem', // 18px
      body: '1rem',          // 16px
      bodySmall: '0.875rem', // 14px
      // Supporting Text
      caption: '0.75rem',    // 12px
      overline: '0.75rem',   // 12px
      button: '0.875rem',    // 14px
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },

  // Spacing System
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    small: '8px',
    medium: '12px',
    large: '20px',
    xl: '24px',
    pill: '50px',
    full: '50%',
  },

  // Shadows
  shadows: {
    none: 'none',
    light: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 8px 32px rgba(0, 0, 0, 0.15)',
    heavy: '0 20px 60px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(255, 154, 158, 0.4)',
    colored: '0 8px 32px rgba(255, 154, 158, 0.15)',
  },

  // Animation & Transitions
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',    // Small phones
    sm: '480px',    // Large phones
    md: '768px',    // Tablets
    lg: '1024px',   // Small laptops
    xl: '1280px',   // Large laptops
    '2xl': '1536px', // Desktop
    '3xl': '1920px', // Large screens
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
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
};

// CSS Custom Properties for runtime theme switching
export const cssVariables = `
  --color-primary-gradient: ${legacyCustomerTheme.colors.primary.gradient};
  --color-secondary-gradient: ${legacyCustomerTheme.colors.secondary.gradient};
  --color-accent-gradient: ${legacyCustomerTheme.colors.accent.gradient};
  
  --color-tier-basic: ${legacyCustomerTheme.colors.subscription.basic.gradient};
  --color-tier-silver: ${legacyCustomerTheme.colors.subscription.silver.gradient};
  --color-tier-gold: ${legacyCustomerTheme.colors.subscription.gold.gradient};
  
  --color-success: ${legacyCustomerTheme.colors.functional.success.main};
  --color-warning: ${legacyCustomerTheme.colors.functional.warning.main};
  --color-error: ${legacyCustomerTheme.colors.functional.error.main};
  --color-info: ${legacyCustomerTheme.colors.functional.info.main};
  
  --font-primary: ${legacyCustomerTheme.typography.fontFamily.primary};
  --font-secondary: ${legacyCustomerTheme.typography.fontFamily.secondary};
  --font-display: ${legacyCustomerTheme.typography.fontFamily.display};
  
  --animation-fast: ${legacyCustomerTheme.animations.duration.fast};
  --animation-normal: ${legacyCustomerTheme.animations.duration.normal};
  --animation-slow: ${legacyCustomerTheme.animations.duration.slow};
  
  --easing-standard: ${legacyCustomerTheme.animations.easing.standard};
  --easing-decelerate: ${legacyCustomerTheme.animations.easing.decelerate};
  --easing-accelerate: ${legacyCustomerTheme.animations.easing.accelerate};
`;

export default legacyCustomerTheme;