// Marketing Website Theme Types
export interface MarketingTheme {
  colors: {
    gradients: {
      // Primary marketing gradients - Innovation & Trust
      primary: string;
      secondary: string;
      accent: string;
      hero: string;
      
      // Service-specific gradients
      rideHailing: string;
      rideSharing: string;
      carRental: string;
      foodDelivery: string;
      packageDelivery: string;
      droneDelivery: string;
      
      // Functional gradients
      success: string;
      warning: string;
      error: string;
      info: string;
      
      // UI element gradients
      card: string;
      button: string;
      background: string;
    };
    solid: {
      white: string;
      black: string;
      neutral: {
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
      brand: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      gradient: string;
    };
    background: {
      default: string;
      paper: string;
      elevated: string;
      overlay: string;
    };
    border: {
      light: string;
      medium: string;
      dark: string;
      gradient: string;
    };
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      display: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '7xl': string;
      '8xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
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
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    glow: string;
    gradient: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  zIndex: {
    hide: number;
    auto: number;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
      slower: string;
    };
    easing: {
      linear: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      spring: string;
      bounce: string;
    };
  };
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'gradient' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export interface ServiceCardProps {
  service: ServiceType;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  href: string;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundVideo?: string;
  backgroundImage?: string;
  ctaPrimary?: {
    text: string;
    href: string;
    external?: boolean;
  };
  ctaSecondary?: {
    text: string;
    href: string;
    external?: boolean;
  };
  showStats?: boolean;
  stats?: {
    label: string;
    value: string;
  }[];
}

// Service Types
export type ServiceType = 
  | 'ride-hailing'
  | 'ride-sharing'
  | 'car-rental'
  | 'food-delivery'
  | 'package-delivery'
  | 'drone-delivery';

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  serviceInterest?: ServiceType[];
  subscribeNewsletter?: boolean;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  interests?: string[];
}

// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
    type?: string;
  };
  twitter?: {
    cardType?: string;
    site?: string;
    creator?: string;
  };
}

// Animation Types
export interface AnimationProps {
  delay?: number;
  duration?: number;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}