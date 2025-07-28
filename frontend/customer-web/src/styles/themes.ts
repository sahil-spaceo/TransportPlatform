import { DefaultTheme } from 'styled-components';

// Base theme configuration (shared between light and dark)
const baseTheme = {
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

// Light Theme
export const lightTheme: DefaultTheme = {
  ...baseTheme,
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
    background: {
      default: '#ffffff',
      paper: '#fafafa',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #a8edea 75%, #fed6e3 100%)',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
      disabled: '#9e9e9e',
      hint: '#bdbdbd',
    },
  },
  shadows: {
    none: 'none',
    light: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 8px 32px rgba(0, 0, 0, 0.15)',
    heavy: '0 20px 60px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(255, 154, 158, 0.4)',
    colored: '0 8px 32px rgba(255, 154, 158, 0.15)',
  },
};

// Dark Theme
export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    primary: {
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff3838 100%)',
      light: '#4a1a1a',
      main: '#ff6b6b',
      dark: '#ff5252',
      contrastText: '#ffffff',
    },
    secondary: {
      gradient: 'linear-gradient(135deg, #4834d4 0%, #686de0 100%)',
      light: '#1a1a4a',
      main: '#4834d4',
      dark: '#3742fa',
      contrastText: '#ffffff',
    },
    accent: {
      gradient: 'linear-gradient(135deg, #be2edd 0%, #9c88ff 100%)',
      light: '#2d1b4a',
      main: '#be2edd',
      dark: '#9c88ff',
    },
    subscription: {
      basic: {
        gradient: 'linear-gradient(135deg, #4834d4 0%, #686de0 100%)',
        main: '#4834d4',
        light: '#1a1a4a',
      },
      silver: {
        gradient: 'linear-gradient(135deg, #747d8c 0%, #57606f 100%)',
        main: '#747d8c',
        light: '#2c2c2c',
      },
      gold: {
        gradient: 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)',
        main: '#ffa502',
        light: '#4a2a00',
      },
    },
    functional: {
      success: {
        gradient: 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)',
        main: '#2ed573',
        light: '#0d2818',
        dark: '#26de81',
      },
      warning: {
        gradient: 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)',
        main: '#ffa502',
        light: '#4a2a00',
        dark: '#ff9f43',
      },
      error: {
        gradient: 'linear-gradient(135deg, #ff3838 0%, #ff4757 100%)',
        main: '#ff3838',
        light: '#4a0d0d',
        dark: '#ff4757',
      },
      info: {
        gradient: 'linear-gradient(135deg, #3742fa 0%, #2f3542 100%)',
        main: '#3742fa',
        light: '#0a0d4a',
        dark: '#5352ed',
      },
    },
    neutral: {
      white: '#1a1a1a',
      50: '#2d2d2d',
      100: '#404040',
      200: '#525252',
      300: '#737373',
      400: '#a3a3a3',
      500: '#d4d4d4',
      600: '#e5e5e5',
      700: '#f5f5f5',
      800: '#fafafa',
      900: '#ffffff',
    },
    dark: {
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
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
      gradient: 'linear-gradient(135deg, #2c1810 0%, #3d2917 25%, #4a1a1a 50%, #1a1a4a 75%, #2d1b4a 100%)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e5e5e5',
      disabled: '#a3a3a3',
      hint: '#737373',
    },
  },
  shadows: {
    none: 'none',
    light: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 8px 32px rgba(0, 0, 0, 0.4)',
    heavy: '0 20px 60px rgba(0, 0, 0, 0.6)',
    glow: '0 0 20px rgba(255, 107, 107, 0.3)',
    colored: '0 8px 32px rgba(255, 107, 107, 0.2)',
  },
};

// Export legacy theme for backwards compatibility
export const customerTheme = lightTheme;
export default lightTheme;