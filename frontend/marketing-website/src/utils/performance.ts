// FlexFlow Marketing Website - Performance Monitoring & Core Web Vitals
// Real-time performance tracking and analytics integration

import { CoreWebVitals } from '@/types/marketing.types';

// Core Web Vitals thresholds (Google's recommended values)
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
};

// Performance metrics interface
export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  timestamp: number;
  url: string;
  userAgent: string;
  connectionType?: string;
}

// Analytics providers
export interface AnalyticsProvider {
  trackEvent: (eventName: string, data: Record<string, any>) => void;
  trackWebVital: (metric: PerformanceMetrics) => void;
}

// Store for performance metrics
let performanceMetrics: PerformanceMetrics[] = [];
let analyticsProvider: AnalyticsProvider | null = null;

// Initialize analytics provider
export const initializeAnalytics = (provider: AnalyticsProvider) => {
  analyticsProvider = provider;
};

// Core Web Vitals measurement
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  const metrics: Partial<PerformanceMetrics> = {
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // Get connection information if available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    metrics.connectionType = connection?.effectiveType || 'unknown';
  }

  // Measure TTFB (Time to First Byte)
  const measureTTFB = () => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }
  };

  // Measure FCP (First Contentful Paint)
  const measureFCP = () => {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
    }
  };

  // Measure LCP (Largest Contentful Paint)
  const measureLCP = () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
        reportMetric({ ...metrics, lcp: lastEntry.startTime } as PerformanceMetrics);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  };

  // Measure FID (First Input Delay)
  const measureFID = () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as PerformanceEventTiming;
          metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          reportMetric({ ...metrics, fid: metrics.fid } as PerformanceMetrics);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  };

  // Measure CLS (Cumulative Layout Shift)
  const measureCLS = () => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });
        metrics.cls = clsValue;
      });
      observer.observe({ entryTypes: ['layout-shift'] });

      // Report CLS on page unload
      window.addEventListener('beforeunload', () => {
        reportMetric({ ...metrics, cls: clsValue } as PerformanceMetrics);
      });
    }
  };

  // Initialize measurements
  measureTTFB();
  measureFCP();
  measureLCP();
  measureFID();
  measureCLS();
};

// Report metric to analytics
const reportMetric = (metric: PerformanceMetrics) => {
  // Store locally
  performanceMetrics.push(metric);

  // Send to analytics provider
  if (analyticsProvider) {
    analyticsProvider.trackWebVital(metric);
  }

  // Log performance issues
  checkPerformanceThresholds(metric);
};

// Check if metrics meet performance thresholds
const checkPerformanceThresholds = (metric: PerformanceMetrics) => {
  const issues: string[] = [];

  if (metric.lcp && metric.lcp > WEB_VITALS_THRESHOLDS.LCP.needsImprovement) {
    issues.push(`LCP is poor: ${metric.lcp}ms (should be < ${WEB_VITALS_THRESHOLDS.LCP.good}ms)`);
  }

  if (metric.fid && metric.fid > WEB_VITALS_THRESHOLDS.FID.needsImprovement) {
    issues.push(`FID is poor: ${metric.fid}ms (should be < ${WEB_VITALS_THRESHOLDS.FID.good}ms)`);
  }

  if (metric.cls && metric.cls > WEB_VITALS_THRESHOLDS.CLS.needsImprovement) {
    issues.push(`CLS is poor: ${metric.cls} (should be < ${WEB_VITALS_THRESHOLDS.CLS.good})`);
  }

  if (metric.fcp && metric.fcp > WEB_VITALS_THRESHOLDS.FCP.needsImprovement) {
    issues.push(`FCP is poor: ${metric.fcp}ms (should be < ${WEB_VITALS_THRESHOLDS.FCP.good}ms)`);
  }

  if (metric.ttfb && metric.ttfb > WEB_VITALS_THRESHOLDS.TTFB.needsImprovement) {
    issues.push(`TTFB is poor: ${metric.ttfb}ms (should be < ${WEB_VITALS_THRESHOLDS.TTFB.good}ms)`);
  }

  if (issues.length > 0) {
    console.warn('Performance issues detected:', issues);
    
    // Report to analytics as performance issue
    if (analyticsProvider) {
      analyticsProvider.trackEvent('performance_issue', {
        issues,
        url: metric.url,
        timestamp: metric.timestamp,
      });
    }
  }
};

// Resource loading performance
export const measureResourcePerformance = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      const resourceEntry = entry as PerformanceResourceTiming;
      
      // Track slow resources (> 2 seconds)
      if (resourceEntry.duration > 2000) {
        if (analyticsProvider) {
          analyticsProvider.trackEvent('slow_resource', {
            name: resourceEntry.name,
            duration: resourceEntry.duration,
            size: resourceEntry.transferSize,
            type: resourceEntry.initiatorType,
          });
        }
      }

      // Track large resources (> 1MB)
      if (resourceEntry.transferSize > 1024 * 1024) {
        if (analyticsProvider) {
          analyticsProvider.trackEvent('large_resource', {
            name: resourceEntry.name,
            size: resourceEntry.transferSize,
            type: resourceEntry.initiatorType,
          });
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

// Page load performance summary
export const getPerformanceSummary = (): CoreWebVitals | null => {
  if (performanceMetrics.length === 0) return null;

  const latest = performanceMetrics[performanceMetrics.length - 1];
  
  return {
    lcp: latest.lcp || 0,
    fid: latest.fid || 0,
    cls: latest.cls || 0,
    fcp: latest.fcp || 0,
    ttfb: latest.ttfb || 0,
  };
};

// Performance grade calculation
export const calculatePerformanceGrade = (metrics: CoreWebVitals): string => {
  let score = 0;
  let total = 0;

  // LCP scoring
  if (metrics.lcp <= WEB_VITALS_THRESHOLDS.LCP.good) score += 100;
  else if (metrics.lcp <= WEB_VITALS_THRESHOLDS.LCP.needsImprovement) score += 50;
  total += 100;

  // FID scoring
  if (metrics.fid <= WEB_VITALS_THRESHOLDS.FID.good) score += 100;
  else if (metrics.fid <= WEB_VITALS_THRESHOLDS.FID.needsImprovement) score += 50;
  total += 100;

  // CLS scoring
  if (metrics.cls <= WEB_VITALS_THRESHOLDS.CLS.good) score += 100;
  else if (metrics.cls <= WEB_VITALS_THRESHOLDS.CLS.needsImprovement) score += 50;
  total += 100;

  // FCP scoring
  if (metrics.fcp <= WEB_VITALS_THRESHOLDS.FCP.good) score += 100;
  else if (metrics.fcp <= WEB_VITALS_THRESHOLDS.FCP.needsImprovement) score += 50;
  total += 100;

  // TTFB scoring
  if (metrics.ttfb <= WEB_VITALS_THRESHOLDS.TTFB.good) score += 100;
  else if (metrics.ttfb <= WEB_VITALS_THRESHOLDS.TTFB.needsImprovement) score += 50;
  total += 100;

  const percentage = (score / total) * 100;

  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

// Google Analytics 4 implementation
export const createGA4Provider = (measurementId: string): AnalyticsProvider => {
  // Load gtag
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => (window as any).dataLayer.push(args);
    gtag('js', new Date());
    gtag('config', measurementId);
    (window as any).gtag = gtag;
  }

  return {
    trackEvent: (eventName: string, data: Record<string, any>) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
          custom_map: data,
          event_category: 'performance',
          event_label: data.url,
        });
      }
    },
    trackWebVital: (metric: PerformanceMetrics) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        Object.entries(metric).forEach(([key, value]) => {
          if (typeof value === 'number' && ['lcp', 'fid', 'cls', 'fcp', 'ttfb'].includes(key)) {
            (window as any).gtag('event', key, {
              value: Math.round(value),
              metric_id: key.toUpperCase(),
              metric_value: value,
              custom_map: {
                page_url: metric.url,
                user_agent: metric.userAgent,
                connection_type: metric.connectionType,
              },
            });
          }
        });
      }
    },
  };
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = (measurementId?: string) => {
  if (typeof window === 'undefined') return;

  // Initialize analytics if measurement ID provided
  if (measurementId) {
    const provider = createGA4Provider(measurementId);
    initializeAnalytics(provider);
  }

  // Start measuring web vitals
  measureWebVitals();
  measureResourcePerformance();

  // Report final metrics on page unload
  window.addEventListener('beforeunload', () => {
    const summary = getPerformanceSummary();
    if (summary && analyticsProvider) {
      const grade = calculatePerformanceGrade(summary);
      analyticsProvider.trackEvent('page_performance_summary', {
        ...summary,
        grade,
        url: window.location.href,
      });
    }
  });
};

// Export performance metrics for debugging
export const getPerformanceMetrics = () => performanceMetrics;

// Clear metrics (useful for SPA navigation)
export const clearPerformanceMetrics = () => {
  performanceMetrics = [];
};