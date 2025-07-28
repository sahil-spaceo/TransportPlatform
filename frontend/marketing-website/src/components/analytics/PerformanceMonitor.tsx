import { useEffect } from 'react';
import { initializePerformanceMonitoring } from '@/utils/performance';

interface PerformanceMonitorProps {
  measurementId?: string;
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  measurementId, 
  enabled = true 
}) => {
  useEffect(() => {
    if (!enabled) return;

    // Initialize performance monitoring
    initializePerformanceMonitoring(measurementId);

    // Performance monitoring debug info in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 FlexFlow Performance Monitoring initialized');
      
      // Log performance summary after page load
      const timer = setTimeout(() => {
        import('@/utils/performance').then(({ getPerformanceSummary, calculatePerformanceGrade }) => {
          const summary = getPerformanceSummary();
          if (summary) {
            const grade = calculatePerformanceGrade(summary);
            console.log('📊 Performance Summary:', {
              ...summary,
              grade,
            });
          }
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [measurementId, enabled]);

  return null;
};

export default PerformanceMonitor;