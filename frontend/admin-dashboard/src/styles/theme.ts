import { AdminTheme } from '@/types/theme.types';

// Admin Panel Theme - Professional & Approachable (Light Theme)
export const adminTheme: AdminTheme = {
  colors: {
    gradients: {
      // Primary admin gradients - Light & Professional
      primary: 'linear-gradient(135deg, #E8F4FD 0%, #D1E9FF 100%)',
      secondary: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
      accent: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
      background: 'linear-gradient(180deg, #FEFEFE 0%, #F8FAFC 50%, #F1F5F9 100%)',
      card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      sidebar: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
    },
    solid: {
      white: '#ffffff',
      black: '#000000',
      neutral: {
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
    },
    functional: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      successGradient: 'linear-gradient(135deg, #ECFDF5 0%, #BBF7D0 100%)',
      warningGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FED7AA 100%)',
      errorGradient: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%)',
      infoGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
    },
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      tertiary: '#64748b',
      inverse: '#ffffff',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      elevated: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.4)',
    },
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%)',
    },
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      secondary: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
      display: "'Space Grotesk', 'Inter', sans-serif",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '4rem',    // 64px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
    '4xl': '4rem',   // 64px
    '5xl': '5rem',   // 80px
    '6xl': '6rem',   // 96px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem', // 20px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 25px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    gradient: '0 4px 12px rgba(59, 130, 246, 0.15)',
    glow: '0 0 10px rgba(59, 130, 246, 0.3)',
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    hide: -1,
    auto: 0,
    base: 1,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// CSS Variables for runtime theme switching - Light Theme
export const generateCSSVariables = (theme: AdminTheme) => `
  :root {
    /* Light Gradients */
    --gradient-primary: ${theme.colors.gradients.primary};
    --gradient-secondary: ${theme.colors.gradients.secondary};
    --gradient-accent: ${theme.colors.gradients.accent};
    --gradient-background: ${theme.colors.gradients.background};
    --gradient-card: ${theme.colors.gradients.card};
    --gradient-sidebar: ${theme.colors.gradients.sidebar};
    
    /* Light Functional Colors */
    --success-gradient: ${theme.colors.functional.successGradient};
    --warning-gradient: ${theme.colors.functional.warningGradient};
    --error-gradient: ${theme.colors.functional.errorGradient};
    --info-gradient: ${theme.colors.functional.infoGradient};
    --success-solid: ${theme.colors.functional.success};
    --warning-solid: ${theme.colors.functional.warning};
    --error-solid: ${theme.colors.functional.error};
    --info-solid: ${theme.colors.functional.info};
    
    /* High Contrast Text Colors */
    --text-primary: ${theme.colors.text.primary};
    --text-secondary: ${theme.colors.text.secondary};
    --text-tertiary: ${theme.colors.text.tertiary};
    --text-inverse: ${theme.colors.text.inverse};
    --text-gradient: ${theme.colors.text.gradient};
    
    /* Light Background Colors */
    --bg-default: ${theme.colors.background.default};
    --bg-paper: ${theme.colors.background.paper};
    --bg-elevated: ${theme.colors.background.elevated};
    --bg-overlay: ${theme.colors.background.overlay};
    
    /* Light Borders */
    --border-light: ${theme.colors.border.light};
    --border-medium: ${theme.colors.border.medium};
    --border-dark: ${theme.colors.border.dark};
    --border-gradient: ${theme.colors.border.gradient};
    
    /* Light Shadows */
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-gradient: ${theme.shadows.gradient};
    --shadow-glow: ${theme.shadows.glow};
    
    /* Animations */
    --animation-fast: ${theme.animations.duration.fast};
    --animation-normal: ${theme.animations.duration.normal};
    --animation-slow: ${theme.animations.duration.slow};
    --easing-standard: ${theme.animations.easing.easeInOut};
  }
`;