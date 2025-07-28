import 'styled-components';

// Extend styled-components DefaultTheme interface
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        gradient: string;
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        gradient: string;
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      accent: {
        gradient: string;
        light: string;
        main: string;
        dark: string;
      };
      subscription: {
        basic: {
          gradient: string;
          main: string;
          light: string;
        };
        silver: {
          gradient: string;
          main: string;
          light: string;
        };
        gold: {
          gradient: string;
          main: string;
          light: string;
        };
      };
      functional: {
        success: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
        warning: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
        error: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
        info: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
      };
      neutral: {
        white: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      dark: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      background: {
        default: string;
        paper: string;
        gradient: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        hint: string;
      };
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
        display: string;
        mono: string;
      };
      fontWeight: {
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
      };
      fontSize: {
        display1: string;
        display2: string;
        display3: string;
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        bodyLarge: string;
        body: string;
        bodySmall: string;
        caption: string;
        overline: string;
        button: string;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    borderRadius: {
      none: string;
      small: string;
      medium: string;
      large: string;
      xl: string;
      pill: string;
      full: string;
    };
    shadows: {
      none: string;
      light: string;
      medium: string;
      heavy: string;
      glow: string;
      colored: string;
    };
    animations: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
        slower: string;
      };
      easing: {
        standard: string;
        decelerate: string;
        accelerate: string;
        sharp: string;
      };
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    zIndex: {
      hide: number;
      base: number;
      docked: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      skipLink: number;
      toast: number;
      tooltip: number;
    };
  }
}

// Subscription Tier Types
export type SubscriptionTier = 'basic' | 'silver' | 'gold';

// Service Types
export type ServiceType = 'taxi' | 'rental' | 'delivery' | 'package' | 'drone';

// Platform Types
export type Platform = 'customer' | 'driver' | 'admin' | 'merchant' | 'marketing' | 'drone';

// Component Size Types
export type ComponentSize = 'small' | 'medium' | 'large';

// Button Variant Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';

// Color Variant Types
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Theme Mode Types
export type ThemeMode = 'light' | 'dark';

// Language Types
export type SupportedLanguage = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' 
  | 'ar' | 'zh' | 'ja' | 'ko' | 'hi' | 'nl' | 'sv' | 'he';

// Direction Types for RTL support
export type TextDirection = 'ltr' | 'rtl';

// Responsive Breakpoint Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Animation Types
export type AnimationDuration = 'fast' | 'normal' | 'slow' | 'slower';
export type AnimationEasing = 'standard' | 'decelerate' | 'accelerate' | 'sharp';

// Component Props Types
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: any;
  mode?: ThemeMode;
}

export interface ResponsiveProps {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  '2xl'?: any;
  '3xl'?: any;
}

export interface SpacingProps {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  mx?: string;
  my?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  px?: string;
  py?: string;
}