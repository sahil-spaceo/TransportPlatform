// FlexFlow Marketing Website - Services Data Layer
// Complete service definitions according to UIUX architecture

import { ServiceType } from '@/types/marketing.types';

export interface ServiceData {
  id: ServiceType;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  gradient: string;
  color: string;
  features: string[];
  benefits: string[];
  pricing: {
    baseRate: string;
    perDistance?: string;
    perTime?: string;
    commission?: string;
  };
  availability: string[];
  targetAudience: string[];
  useCases: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'ride-hailing',
    name: 'Ride-Hailing',
    tagline: 'Instant rides, anywhere',
    description: 'On-demand transportation with professional drivers at your fingertips.',
    longDescription: 'Experience seamless urban mobility with our premium ride-hailing service. Connect with verified professional drivers, enjoy real-time tracking, and arrive at your destination safely and comfortably.',
    icon: '🚕',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8b5fbf 100%)',
    color: '#667eea',
    features: [
      'Real-time GPS tracking',
      'Professional verified drivers',
      'Multiple vehicle categories',
      'Upfront pricing',
      'In-app payments',
      '24/7 customer support'
    ],
    benefits: [
      'Save up to 40% vs traditional taxis',
      'Average pickup time: 3 minutes',
      '99.9% reliability rate',
      'Carbon offset options available'
    ],
    pricing: {
      baseRate: '$2.50',
      perDistance: '$1.25/mile',
      perTime: '$0.35/min'
    },
    availability: ['24/7', 'All major cities', 'Airport service'],
    targetAudience: ['Urban commuters', 'Business travelers', 'Tourists'],
    useCases: [
      'Daily commuting',
      'Airport transfers',
      'Night out transportation',
      'Business meetings'
    ],
    stats: [
      { label: 'Active Drivers', value: '50,000+' },
      { label: 'Cities', value: '150+' },
      { label: 'Rides Completed', value: '10M+' }
    ]
  },
  {
    id: 'ride-sharing',
    name: 'Ride-Sharing',
    tagline: 'Share the journey, save together',
    description: 'Eco-friendly carpooling that saves money and reduces carbon footprint.',
    longDescription: 'Join our sustainable transportation network where passengers share rides with similar routes. Save money, meet new people, and contribute to a greener planet while enjoying comfortable travel.',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #2dd4bf 100%)',
    color: '#43e97b',
    features: [
      'Smart route matching',
      'Split fare automatically',
      'Verified co-passengers',
      'Flexible pickup points',
      'Eco-impact tracking',
      'Social travel experience'
    ],
    benefits: [
      'Save 30-50% on transportation costs',
      'Reduce CO2 emissions by 60%',
      'Meet like-minded travelers',
      'Access to HOV lanes'
    ],
    pricing: {
      baseRate: '$1.50',
      perDistance: '$0.75/mile',
      commission: '15%'
    },
    availability: ['Peak hours optimized', 'Suburban routes', 'Intercity travel'],
    targetAudience: ['Cost-conscious travelers', 'Environmental advocates', 'Social commuters'],
    useCases: [
      'Daily work commute',
      'University campus travel',
      'Event transportation',
      'Weekend trips'
    ],
    stats: [
      { label: 'CO2 Saved', value: '2.5M tons' },
      { label: 'Money Saved', value: '$50M+' },
      { label: 'Shared Rides', value: '5M+' }
    ]
  },
  {
    id: 'car-rental',
    name: 'Car Rental',
    tagline: 'Your car, your schedule',
    description: 'Flexible car rental from hours to months with premium vehicle selection.',
    longDescription: 'Access a diverse fleet of vehicles for any occasion. From compact cars for city driving to luxury SUVs for special events, rent by the hour, day, or month with full insurance coverage.',
    icon: '🚗',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ef4444 100%)',
    color: '#f093fb',
    features: [
      'Diverse vehicle fleet',
      'Hourly to monthly rentals',
      'Full insurance coverage',
      'Contactless pickup',
      'GPS navigation included',
      '24/7 roadside assistance'
    ],
    benefits: [
      'No long-term commitments',
      'Premium vehicles available',
      'Comprehensive insurance included',
      'Flexible return locations'
    ],
    pricing: {
      baseRate: '$8/hour',
      perDistance: 'Unlimited miles*',
      commission: '20%'
    },
    availability: ['Self-service kiosks', 'Airport locations', 'City hubs'],
    targetAudience: ['Occasional drivers', 'Tourists', 'Business travelers'],
    useCases: [
      'Weekend getaways',
      'Business trips',
      'Moving assistance',
      'Special occasions'
    ],
    stats: [
      { label: 'Vehicle Fleet', value: '25,000+' },
      { label: 'Locations', value: '500+' },
      { label: 'Customer Rating', value: '4.8/5' }
    ]
  },
  {
    id: 'food-delivery',
    name: 'Food Delivery',
    tagline: 'Delicious meals, delivered fast',
    description: 'Discover local restaurants and get your favorite meals delivered hot and fresh.',
    longDescription: 'Explore thousands of restaurants, from local favorites to international cuisines. Our network of delivery partners ensures your food arrives hot, fresh, and on time, every time.',
    icon: '🍕',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #fb923c 100%)',
    color: '#ffecd2',
    features: [
      'Thousands of restaurants',
      'Real-time order tracking',
      'Hot food guarantee',
      'Contactless delivery',
      'Group ordering',
      'Scheduled deliveries'
    ],
    benefits: [
      'Average delivery time: 25 minutes',
      'Hot food guarantee or refund',
      'No minimum order on premium',
      'Exclusive restaurant deals'
    ],
    pricing: {
      baseRate: '$0.99',
      perDistance: '$0.15/mile',
      commission: '25%'
    },
    availability: ['Breakfast to late night', 'Alcohol delivery', 'Grocery delivery'],
    targetAudience: ['Busy professionals', 'Families', 'Students'],
    useCases: [
      'Lunch at office',
      'Family dinner',
      'Late night cravings',
      'Party catering'
    ],
    stats: [
      { label: 'Restaurant Partners', value: '100,000+' },
      { label: 'Orders Delivered', value: '50M+' },
      { label: 'Average Rating', value: '4.7/5' }
    ]
  },
  {
    id: 'package-delivery',
    name: 'Package Delivery',
    tagline: 'Secure delivery, every time',
    description: 'Fast and secure package delivery with real-time tracking and proof of delivery.',
    longDescription: 'Send packages locally or nationwide with our reliable delivery network. From documents to large items, we provide secure handling, real-time tracking, and guaranteed delivery times.',
    icon: '📦',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #fbbf24 100%)',
    color: '#a8edea',
    features: [
      'Same-day delivery',
      'Real-time tracking',
      'Proof of delivery',
      'Secure handling',
      'Size flexibility',
      'Insurance options'
    ],
    benefits: [
      '99.8% on-time delivery rate',
      'Full package insurance available',
      'Photo proof of delivery',
      'Nationwide coverage'
    ],
    pricing: {
      baseRate: '$4.99',
      perDistance: '$0.50/mile',
      commission: '18%'
    },
    availability: ['Same-day service', 'Next-day delivery', 'Scheduled pickup'],
    targetAudience: ['Small businesses', 'E-commerce sellers', 'Individuals'],
    useCases: [
      'E-commerce fulfillment',
      'Document delivery',
      'Gift sending',
      'Return shipments'
    ],
    stats: [
      { label: 'Packages Delivered', value: '25M+' },
      { label: 'Delivery Success', value: '99.8%' },
      { label: 'Partner Businesses', value: '15,000+' }
    ]
  },
  {
    id: 'drone-delivery',
    name: 'Drone Delivery',
    tagline: 'The future of fast delivery',
    description: 'Ultra-fast autonomous drone delivery for time-sensitive packages and premium service.',
    longDescription: 'Experience the cutting edge of delivery technology. Our autonomous drone network delivers small packages in minutes, not hours, perfect for urgent deliveries and premium service.',
    icon: '🛸',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #0ea5e9 100%)',
    color: '#4facfe',
    features: [
      'Autonomous flight technology',
      'Ultra-fast delivery',
      'Weather adaptive',
      'Precision landing',
      'Live video tracking',
      'Premium service'
    ],
    benefits: [
      'Delivery in 15 minutes or less',
      'Zero traffic delays',
      'Eco-friendly electric drones',
      'Premium customer experience'
    ],
    pricing: {
      baseRate: '$9.99',
      perDistance: '$1.00/mile',
      commission: '30%'
    },
    availability: ['Select metro areas', 'Fair weather conditions', 'Daylight hours'],
    targetAudience: ['Premium customers', 'Medical facilities', 'Urgent deliveries'],
    useCases: [
      'Medical supplies',
      'Emergency deliveries',
      'Luxury items',
      'Time-critical documents'
    ],
    stats: [
      { label: 'Average Delivery', value: '12 min' },
      { label: 'Success Rate', value: '99.5%' },
      { label: 'Cities Available', value: '25+' }
    ]
  }
];

// Service utilities
export const getServiceData = (serviceId: ServiceType): ServiceData | undefined => {
  return servicesData.find(service => service.id === serviceId);
};

export const getServiceGradient = (serviceId: ServiceType): string => {
  const service = getServiceData(serviceId);
  return service?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};

export const getServicesByCategory = (category: string) => {
  // This could be expanded to categorize services
  return servicesData;
};

export const getFeaturedServices = () => {
  return servicesData.slice(0, 3); // Return first 3 as featured
};

export default servicesData;