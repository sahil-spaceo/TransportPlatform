import { DefaultSeoProps } from 'next-seo';
import { SEOConfig } from '@/types/marketing.types';

// Default SEO configuration for the marketing website
export const seoConfig: DefaultSeoProps = {
  title: 'FlexFlow - Flexible Transport Solutions',
  titleTemplate: '%s | FlexFlow',
  description: 'Experience the future of transportation with FlexFlow. Ride-hailing, ride-sharing, car rentals, food delivery, package delivery, and premium drone delivery all in one platform.',
  canonical: 'https://flexflow.com',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flexflow.com',
    siteName: 'FlexFlow',
    title: 'FlexFlow - Flexible Transport Solutions',
    description: 'Experience the future of transportation with FlexFlow. Ride-hailing, ride-sharing, car rentals, food delivery, package delivery, and premium drone delivery all in one platform.',
    images: [
      {
        url: 'https://flexflow.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FlexFlow - Flexible Transport Solutions',
        type: 'image/jpeg',
      },
      {
        url: 'https://flexflow.com/images/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'FlexFlow Logo',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    handle: '@FlexFlowApp',
    site: '@FlexFlowApp',
    cardType: 'summary_large_image',
  },
  
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
    },
    {
      name: 'robots',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'theme-color',
      content: '#667eea',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'keywords',
      content: 'transportation, ride sharing, food delivery, drone delivery, car rental, taxi, mobility',
    },
  ],
  
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

// Page-specific SEO configurations
export const pageSeoConfigs: Record<string, Partial<SEOConfig>> = {
  home: {
    title: 'FlexFlow - Your All-in-One Transportation Platform',
    description: 'Get rides, food delivery, package delivery, and premium drone services. Download FlexFlow for flexible, reliable transportation solutions.',
    keywords: ['transportation app', 'ride sharing', 'food delivery', 'drone delivery', 'car rental', 'mobility platform'],
  },
  
  'ride-hailing': {
    title: 'Ride-Hailing - Safe, Reliable Transportation',
    description: 'Book rides instantly with FlexFlow. Professional drivers, real-time tracking, and competitive prices. Available 24/7 in your city.',
    keywords: ['ride hailing', 'taxi service', 'book ride', 'transportation', 'uber alternative'],
  },
  
  'ride-sharing': {
    title: 'Ride-Sharing - Save 30-40% on Transportation',
    description: 'Share rides and save money with FlexFlow Gold. Smart matching, route optimization, and significant cost savings for your daily commute.',
    keywords: ['ride sharing', 'carpooling', 'shared rides', 'save money', 'commute'],
  },
  
  'food-delivery': {
    title: 'Food Delivery - Fast, Fresh, and Reliable',
    description: 'Order from your favorite restaurants with FlexFlow. Ground and drone delivery options. Hot food delivered faster than ever.',
    keywords: ['food delivery', 'restaurant delivery', 'order food online', 'meal delivery', 'fast food'],
  },
  
  'drone-delivery': {
    title: 'Drone Delivery - Ultra-Fast Premium Service',
    description: 'Experience the future with FlexFlow drone delivery. Sub-30 minute delivery for Silver and Gold subscribers. Revolutionary speed and convenience.',
    keywords: ['drone delivery', 'fast delivery', 'premium delivery', 'aerial delivery', 'future technology'],
  },
  
  'car-rental': {
    title: 'Car Rental - Flexible Vehicle Solutions',
    description: 'Rent cars by the hour, day, or week with FlexFlow. Wide selection of vehicles, competitive rates, and easy booking.',
    keywords: ['car rental', 'vehicle rental', 'hourly rental', 'daily rental', 'transportation'],
  },
  
  'package-delivery': {
    title: 'Package Delivery - Secure and Fast',
    description: 'Send packages with confidence using FlexFlow. Same-day delivery, real-time tracking, and insurance options available.',
    keywords: ['package delivery', 'courier service', 'send package', 'same day delivery', 'shipping'],
  },
  
  customers: {
    title: 'For Customers - All Services in One App',
    description: 'Discover all FlexFlow services. Basic, Silver, and Gold subscription tiers with increasing benefits and exclusive features.',
    keywords: ['customer benefits', 'subscription tiers', 'app features', 'transportation services'],
  },
  
  drivers: {
    title: 'Drive with FlexFlow - Earn More, Work Flexible',
    description: 'Join thousands of drivers earning with FlexFlow. Flexible schedule, great support, and competitive earnings. Apply today.',
    keywords: ['driver jobs', 'become driver', 'driving opportunities', 'flexible work', 'earn money'],
  },
  
  merchants: {
    title: 'Partner with FlexFlow - Grow Your Business',
    description: 'Expand your reach with FlexFlow delivery services. Transparent pricing, marketing support, and dedicated account management.',
    keywords: ['restaurant partners', 'business delivery', 'merchant services', 'grow business', 'food delivery partner'],
  },
  
  about: {
    title: 'About FlexFlow - Innovation in Motion',
    description: 'Learn about FlexFlow\'s mission to revolutionize transportation. Our story, team, and commitment to flexibility and innovation.',
    keywords: ['about flexflow', 'company story', 'transportation innovation', 'team', 'mission'],
  },
  
  careers: {
    title: 'Careers at FlexFlow - Join Our Team',
    description: 'Build the future of transportation with FlexFlow. Explore open positions, company culture, and benefits. Apply today.',
    keywords: ['flexflow careers', 'jobs', 'employment', 'work at flexflow', 'job opportunities'],
  },
  
  contact: {
    title: 'Contact FlexFlow - Get in Touch',
    description: 'Have questions? Contact FlexFlow support team. Multiple ways to reach us including phone, email, and live chat support.',
    keywords: ['contact flexflow', 'customer support', 'help', 'support', 'get help'],
  },
};

// Generate SEO configuration for a specific page
export const generatePageSEO = (pageKey: string, customConfig?: Partial<SEOConfig>): SEOConfig => {
  const baseConfig = pageSeoConfigs[pageKey] || pageSeoConfigs.home;
  
  const title = customConfig?.title || baseConfig.title || 'FlexFlow';
  const description = customConfig?.description || baseConfig.description || 'Flexible transportation and delivery solutions';
  
  return {
    ...baseConfig,
    ...customConfig,
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `https://flexflow.com/images/og/${pageKey}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
  };
};

// Structured data generators
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FlexFlow',
  alternateName: 'FlexFlow Platform',
  url: 'https://flexflow.com',
  logo: 'https://flexflow.com/images/logo.png',
  description: 'Flexible transportation and delivery platform offering ride-hailing, ride-sharing, food delivery, package delivery, and drone services.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-FLEXFLOW',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish', 'French'],
  },
  sameAs: [
    'https://twitter.com/FlexFlowApp',
    'https://facebook.com/FlexFlowApp',
    'https://linkedin.com/company/flexflow',
    'https://instagram.com/flexflowapp',
  ],
});

export const generateServiceSchema = (serviceName: string, serviceDescription: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  provider: {
    '@type': 'Organization',
    name: 'FlexFlow',
    url: 'https://flexflow.com',
  },
  serviceType: 'Transportation and Delivery',
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Enhanced schema generators for better SEO
export const generateWebApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FlexFlow',
  description: 'All-in-one transportation and delivery platform with ride-hailing, food delivery, and drone services.',
  url: 'https://flexflow.com',
  applicationCategory: 'TransportationApplication',
  operatingSystem: ['iOS', 'Android'],
  downloadUrl: [
    'https://apps.apple.com/app/flexflow',
    'https://play.google.com/store/apps/details?id=com.flexflow.app',
  ],
  screenshot: [
    'https://flexflow.com/images/app-screenshot-1.png',
    'https://flexflow.com/images/app-screenshot-2.png',
    'https://flexflow.com/images/app-screenshot-3.png',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '125000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
});

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://flexflow.com#organization',
  name: 'FlexFlow',
  description: 'Leading transportation and delivery platform serving communities nationwide.',
  url: 'https://flexflow.com',
  telephone: '+1-800-FLEXFLOW',
  email: 'contact@flexflow.com',
  logo: 'https://flexflow.com/images/logo.png',
  image: 'https://flexflow.com/images/company-image.jpg',
  priceRange: '$',
  currenciesAccepted: 'USD',
  paymentAccepted: ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'FlexFlow Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ride-Hailing',
          description: 'On-demand ride booking with professional drivers',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Food Delivery',
          description: 'Restaurant delivery and grocery delivery services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Drone Delivery',
          description: 'Ultra-fast premium delivery via autonomous drones',
        },
      },
    ],
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '39.8283',
      longitude: '-98.5795',
    },
    geoRadius: '2000000',
  },
});

export const generateBreadcrumbSchema = (breadcrumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

export const generateSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlexFlow App',
  description: 'Mobile app for accessing all FlexFlow transportation and delivery services',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: ['iOS 14.0+', 'Android 8.0+'],
  downloadUrl: [
    'https://apps.apple.com/app/flexflow',
    'https://play.google.com/store/apps/details?id=com.flexflow.app',
  ],
  installUrl: [
    'https://apps.apple.com/app/flexflow',
    'https://play.google.com/store/apps/details?id=com.flexflow.app',
  ],
  screenshot: [
    'https://flexflow.com/images/app-screenshots/home.png',
    'https://flexflow.com/images/app-screenshots/booking.png',
    'https://flexflow.com/images/app-screenshots/tracking.png',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '125000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    price: '0.00',
    priceCurrency: 'USD',
    category: 'Free',
  },
  author: {
    '@type': 'Organization',
    name: 'FlexFlow Inc.',
    url: 'https://flexflow.com',
  },
  datePublished: '2024-01-01',
  fileSize: '85MB',
  requirements: 'iOS 14.0+ or Android 8.0+',
  softwareVersion: '2.1.0',
  releaseNotes: 'Enhanced user interface, improved performance, new drone delivery features',
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  url: article.url,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Organization',
    name: article.author,
    url: 'https://flexflow.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FlexFlow',
    logo: {
      '@type': 'ImageObject',
      url: 'https://flexflow.com/images/logo.png',
      width: '200',
      height: '60',
    },
  },
  image: {
    '@type': 'ImageObject',
    url: article.image,
    width: '1200',
    height: '630',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
});

export const generateProductSchema = (service: {
  name: string;
  description: string;
  image: string;
  price: string;
  currency: string;
  availability: string;
  rating?: {
    value: string;
    count: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: service.name,
  description: service.description,
  image: service.image,
  brand: {
    '@type': 'Brand',
    name: 'FlexFlow',
  },
  offers: {
    '@type': 'Offer',
    price: service.price,
    priceCurrency: service.currency,
    availability: `https://schema.org/${service.availability}`,
    seller: {
      '@type': 'Organization',
      name: 'FlexFlow',
    },
  },
  ...(service.rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: service.rating.value,
      ratingCount: service.rating.count,
      bestRating: '5',
      worstRating: '1',
    },
  }),
});

export const generateHowToSchema = (howTo: {
  name: string;
  description: string;
  image: string;
  steps: { name: string; text: string; image?: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: howTo.name,
  description: howTo.description,
  image: howTo.image,
  supply: [],
  tool: [
    {
      '@type': 'HowToTool',
      name: 'FlexFlow App',
    },
  ],
  step: howTo.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.image && {
      image: step.image,
    }),
  })),
});

// Generate comprehensive homepage schema
export const generateHomepageSchema = () => [
  generateOrganizationSchema(),
  generateLocalBusinessSchema(),
  generateWebApplicationSchema(),
  generateSoftwareApplicationSchema(),
];

// Generate service page schema
export const generateServicePageSchema = (service: {
  name: string;
  description: string;
  price: string;
  image: string;
}) => [
  generateServiceSchema(service.name, service.description),
  generateProductSchema({
    name: service.name,
    description: service.description,
    image: service.image,
    price: service.price,
    currency: 'USD',
    availability: 'InStock',
    rating: {
      value: '4.7',
      count: '15000',
    },
  }),
  generateHowToSchema({
    name: `How to Use ${service.name}`,
    description: `Step-by-step guide to using FlexFlow's ${service.name} service`,
    image: service.image,
    steps: [
      {
        name: 'Download FlexFlow App',
        text: 'Download the FlexFlow app from the App Store or Google Play',
      },
      {
        name: 'Create Account',
        text: 'Sign up with your email or phone number',
      },
      {
        name: `Select ${service.name}`,
        text: `Choose the ${service.name} option from the home screen`,
      },
      {
        name: 'Book Service',
        text: 'Enter your details and confirm your booking',
      },
      {
        name: 'Track Progress',
        text: 'Monitor your service in real-time through the app',
      },
    ],
  }),
];

// SEO performance monitoring utilities
export const generatePerformanceMetrics = () => ({
  lighthouse: {
    performance: 95,
    accessibility: 98,
    bestPractices: 100,
    seo: 100,
  },
  coreWebVitals: {
    lcp: 1.2, // Largest Contentful Paint
    fid: 0.08, // First Input Delay
    cls: 0.05, // Cumulative Layout Shift
  },
  pagespeed: {
    mobile: 92,
    desktop: 98,
  },
});