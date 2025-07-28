// Test utilities for FlexFlow Marketing Website
import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { marketingTheme } from '@/styles/theme';

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: typeof marketingTheme;
}

function customRender(
  ui: ReactElement,
  {
    theme = marketingTheme,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Test helpers for common patterns
export const createMockRouter = (overrides = {}) => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  pop: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...overrides,
});

// Mock service data for tests
export const createMockServiceData = (overrides = {}) => ({
  id: 'ride-hailing',
  name: 'Ride-Hailing',
  tagline: 'Instant rides, anywhere',
  description: 'On-demand transportation with professional drivers at your fingertips.',
  longDescription: 'Experience seamless urban mobility with our premium ride-hailing service.',
  icon: '🚕',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8b5fbf 100%)',
  color: '#667eea',
  features: [
    'Real-time GPS tracking',
    'Professional verified drivers',
    'Multiple vehicle categories',
  ],
  benefits: [
    'Save up to 40% vs traditional taxis',
    'Average pickup time: 3 minutes',
    '99.9% reliability rate',
  ],
  pricing: {
    baseRate: '$2.50',
    perDistance: '$1.25/mile',
    perTime: '$0.35/min',
  },
  availability: ['24/7', 'All major cities', 'Airport service'],
  targetAudience: ['Urban commuters', 'Business travelers', 'Tourists'],
  useCases: [
    'Daily commuting',
    'Airport transfers',
    'Night out transportation',
    'Business meetings',
  ],
  stats: [
    { label: 'Active Drivers', value: '50,000+' },
    { label: 'Cities', value: '150+' },
    { label: 'Rides Completed', value: '10M+' },
  ],
  ...overrides,
});

// Mock analytics provider for tests
export const createMockAnalyticsProvider = () => ({
  trackEvent: jest.fn(),
  trackWebVital: jest.fn(),
});

// Mock performance metrics
export const createMockPerformanceMetrics = () => ({
  lcp: 1200,
  fid: 50,
  cls: 0.05,
  fcp: 800,
  ttfb: 400,
  timestamp: Date.now(),
  url: 'http://localhost:3000',
  userAgent: 'test-agent',
});

// Test data generators
export const generateTestServices = (count = 3) => {
  return Array.from({ length: count }, (_, i) => 
    createMockServiceData({
      id: `service-${i}`,
      name: `Service ${i + 1}`,
      tagline: `Tagline ${i + 1}`,
    })
  );
};

// Async test helpers
export const waitForElement = async (getByTestId: any, testId: string, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Element with testId "${testId}" not found within ${timeout}ms`));
    }, timeout);

    const checkElement = () => {
      try {
        const element = getByTestId(testId);
        clearTimeout(timer);
        resolve(element);
      } catch {
        setTimeout(checkElement, 100);
      }
    };

    checkElement();
  });
};

// Animation test helpers
export const mockAnimationFrame = () => {
  let callbacks: ((time: number) => void)[] = [];
  let frameId = 0;

  const mockRAF = jest.fn((callback: (time: number) => void) => {
    callbacks.push(callback);
    return ++frameId;
  });

  const mockCAF = jest.fn((id: number) => {
    callbacks = callbacks.filter((_, index) => index !== id - 1);
  });

  const flushAnimationFrames = () => {
    const currentCallbacks = [...callbacks];
    callbacks = [];
    const mockTime = performance.now();
    currentCallbacks.forEach(callback => callback(mockTime));
  };

  global.requestAnimationFrame = mockRAF as any;
  global.cancelAnimationFrame = mockCAF as any;

  return { flushAnimationFrames, mockRAF, mockCAF };
};

// SEO test helpers
export const expectValidSEO = (container: HTMLElement) => {
  if (typeof expect === 'undefined') return; // Skip during build
  
  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  expect(metaDescription).not.toBeNull();
  
  // Check for title
  expect(document.title).toBeTruthy();
  expect(document.title.length).toBeGreaterThan(0);
  expect(document.title.length).toBeLessThanOrEqual(60);
  
  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    expect(canonical.getAttribute('href')).toBeTruthy();
  }
};

// Accessibility test helpers
export const expectValidA11y = (element: HTMLElement) => {
  if (typeof expect === 'undefined') return; // Skip during build
  
  // Check for proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length > 1) {
    // Should start with h1
    expect(headings[0].tagName).toBe('H1');
  }
  
  // Check for alt text on images
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    expect(img.hasAttribute('alt')).toBe(true);
  });
  
  // Check for proper link text
  const links = element.querySelectorAll('a');
  links.forEach(link => {
    const text = link.textContent?.trim();
    expect(text).toBeTruthy();
    expect(text?.toLowerCase()).not.toBe('click here');
    expect(text?.toLowerCase()).not.toBe('read more');
  });
};

// Performance test helpers
export const expectGoodPerformance = (metrics: any) => {
  if (typeof expect === 'undefined') return; // Skip during build
  
  expect(metrics.lcp).toBeLessThanOrEqual(2500);
  expect(metrics.fid).toBeLessThanOrEqual(100);
  expect(metrics.cls).toBeLessThanOrEqual(0.1);
  expect(metrics.fcp).toBeLessThanOrEqual(1800);
  expect(metrics.ttfb).toBeLessThanOrEqual(800);
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Export our custom render as the default render
export { customRender as render };