// FlexFlow Marketing Website - TypeScript Types
// Complete type definitions according to UIUX architecture

import React from 'react';

// Core Marketing Theme Types
export interface MarketingTheme {
  colors: ColorSystem;
  typography: TypographySystem;
  spacing: SpacingSystem;
  borderRadius: BorderRadiusSystem;
  shadows: ShadowSystem;
  breakpoints: BreakpointSystem;
  zIndex: ZIndexSystem;
  animations: AnimationSystem;
}

// Color System - Full Spectrum Gradients
export interface ColorSystem {
  // Solid colors
  solid: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
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
      950: string;
    };
    black: string;
    white: string;
  };
  
  // Gradient system - Innovation & Trust
  gradients: {
    // Primary marketing gradients
    primary: string; // Main gradient: #667eea → #764ba2 → #f093fb → #ffd1ff
    secondary: string; // Blue gradient: #4facfe → #00f2fe
    accent: string; // Green gradient: #43e97b → #38f9d7
    hero: string; // Full spectrum hero gradient
    
    // Service-specific gradients
    services: {
      'ride-hailing': string; // Purple spectrum
      'ride-sharing': string; // Green spectrum
      'car-rental': string; // Pink spectrum
      'food-delivery': string; // Warm spectrum
      'package-delivery': string; // Soft spectrum
      'drone-delivery': string; // Blue spectrum
    };
    
    // UI gradients
    card: string;
    button: string;
    background: string;
    overlay: string;
    text: string;
  };
  
  // Semantic colors
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
    overlay: string;
    hero: string;
  };
  
  border: {
    light: string;
    medium: string;
    dark: string;
    gradient: string;
  };
  
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// Typography System - Inter, Poppins, Space Grotesk, JetBrains Mono
export interface TypographySystem {
  fontFamily: {
    primary: string; // Inter
    secondary: string; // Poppins
    display: string; // Space Grotesk
    mono: string; // JetBrains Mono
  };
  
  fontSize: {
    xs: string; // 12px
    sm: string; // 14px
    base: string; // 16px
    lg: string; // 18px
    xl: string; // 20px
    '2xl': string; // 24px
    '3xl': string; // 30px
    '4xl': string; // 36px
    '5xl': string; // 48px
    '6xl': string; // 60px
    '7xl': string; // 72px
    '8xl': string; // 96px
    '9xl': string; // 128px
  };
  
  fontWeight: {
    thin: number; // 100
    extralight: number; // 200
    light: number; // 300
    normal: number; // 400
    medium: number; // 500
    semibold: number; // 600
    bold: number; // 700
    extrabold: number; // 800
    black: number; // 900
  };
  
  lineHeight: {
    none: number; // 1
    tight: number; // 1.25
    snug: number; // 1.375
    normal: number; // 1.5
    relaxed: number; // 1.625
    loose: number; // 2
  };
  
  letterSpacing: {
    tighter: string; // -0.05em
    tight: string; // -0.025em
    normal: string; // 0em
    wide: string; // 0.025em
    wider: string; // 0.05em
    widest: string; // 0.1em
  };
}

// Spacing System - 8-point grid
export interface SpacingSystem {
  px: string; // 1px
  0: string; // 0px
  0.5: string; // 2px
  1: string; // 4px
  1.5: string; // 6px
  2: string; // 8px
  2.5: string; // 10px
  3: string; // 12px
  3.5: string; // 14px
  4: string; // 16px
  5: string; // 20px
  6: string; // 24px
  7: string; // 28px
  8: string; // 32px
  9: string; // 36px
  10: string; // 40px
  11: string; // 44px
  12: string; // 48px
  14: string; // 56px
  16: string; // 64px
  20: string; // 80px
  24: string; // 96px
  28: string; // 112px
  32: string; // 128px
  36: string; // 144px
  40: string; // 160px
  44: string; // 176px
  48: string; // 192px
  52: string; // 208px
  56: string; // 224px
  60: string; // 240px
  64: string; // 256px
  72: string; // 288px
  80: string; // 320px
  96: string; // 384px
}

// Border Radius System
export interface BorderRadiusSystem {
  none: string; // 0px
  sm: string; // 2px
  base: string; // 4px
  md: string; // 6px
  lg: string; // 8px
  xl: string; // 12px
  '2xl': string; // 16px
  '3xl': string; // 24px
  full: string; // 9999px
}

// Shadow System with Gradient Glows
export interface ShadowSystem {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
  
  // Gradient shadow effects
  gradient: string;
  glow: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Breakpoint System
export interface BreakpointSystem {
  xs: string; // 475px
  sm: string; // 640px
  md: string; // 768px
  lg: string; // 1024px
  xl: string; // 1280px
  '2xl': string; // 1536px
}

// Z-Index System
export interface ZIndexSystem {
  hide: number; // -1
  auto: string; // auto
  base: number; // 0
  docked: number; // 10
  dropdown: number; // 1000
  sticky: number; // 1100
  banner: number; // 1200
  overlay: number; // 1300
  modal: number; // 1400
  popover: number; // 1500
  skipLink: number; // 1600
  toast: number; // 1700
  tooltip: number; // 1800
}

// Animation System - 4 Duration Levels
export interface AnimationSystem {
  duration: {
    instant: string; // 75ms
    fast: string; // 150ms
    normal: string; // 300ms
    slow: string; // 500ms
    slower: string; // 800ms
  };
  
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
    bounce: string;
  };
  
  // Framer Motion variants
  variants: {
    fadeIn: any;
    slideUp: any;
    slideDown: any;
    slideLeft: any;
    slideRight: any;
    scaleIn: any;
    scaleOut: any;
    rotate: any;
    bounce: any;
    elastic: any;
  };
}

// Service Types
export type ServiceType = 
  | 'ride-hailing'
  | 'ride-sharing' 
  | 'car-rental'
  | 'food-delivery'
  | 'package-delivery'
  | 'drone-delivery';

// Component Prop Types

// Button Component - 8 Variants
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost' | 'text' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?:  (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  external?: boolean;
  animate?: boolean;
  gradient?: string;
}

// Card Component - 6 Variants  
export interface CardProps {
  variant?: 'default' | 'gradient' | 'elevated' | 'flat' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  gradient?: string;
  animated?: boolean;
}

// Hero Component Types
export interface HeroProps {
  variant?: 'main' | 'service' | 'video' | 'interactive';
  title: string;
  subtitle?: string;
  description?: string;
  backgroundVideo?: string;
  backgroundImage?: string;
  gradient?: string;
  animated?: boolean;
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
  stats?: {
    label: string;
    value: string | number;
    suffix?: string;
    prefix?: string;
  }[];
  features?: string[];
}

// Service Card Props
export interface ServiceCardProps {
  service: ServiceType;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  href: string;
  animated?: boolean;
  interactive?: boolean;
}

// Testimonial Props
export interface TestimonialProps {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: number;
  service: ServiceType;
  verified?: boolean;
  featured?: boolean;
}

// Pricing Props
export interface PricingTierProps {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    period?: string;
  };
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  buttonText: string;
  buttonHref: string;
  service?: ServiceType;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: ServiceType;
  budget?: string;
  timeline?: string;
}

export interface DriverApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Vehicle Information
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  
  // Documents
  driverLicense: File | string;
  insurance: File | string;
  registration: File | string;
  
  // Service Preferences
  services: ServiceType[];
  availability: string[];
  preferredAreas: string[];
}

export interface MerchantApplicationData {
  // Business Information
  businessName: string;
  businessType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Address
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Business Details
  cuisine?: string; // For restaurants
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  averageOrderValue: string;
  monthlyVolume: string;
  
  // Services
  services: ServiceType[];
  
  // Documents
  businessLicense: File | string;
  taxId: File | string;
  menuOrCatalog?: File | string;
}

// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    image?: string;
    images?: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
    url?: string;
    siteName?: string;
  };
  
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  
  structuredData?: {
    '@context': string;
    '@type': string;
    [key: string]: any;
  }[];
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

// Performance Types
export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

// Content Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  readingTime: number;
  seo: SEOConfig;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  service?: ServiceType;
  featured?: boolean;
  order: number;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  service?: ServiceType;
  category: string;
  highlighted?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Hook Types
export interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  disabled?: boolean;
}

export interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  loop?: boolean;
}

// State Management Types
export interface UIState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  modalOpen: boolean;
  loading: boolean;
  theme: 'light' | 'dark' | 'auto';
  reducedMotion: boolean;
}

export interface FormState<T> {
  data: Partial<T>;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
  touched: Record<keyof T, boolean>;
}

export interface ContentState {
  blog: {
    posts: BlogPost[];
    categories: string[];
    tags: string[];
    loading: boolean;
  };
  faqs: {
    items: FAQ[];
    categories: string[];
    loading: boolean;
  };
  testimonials: {
    items: TestimonialProps[];
    loading: boolean;
  };
}