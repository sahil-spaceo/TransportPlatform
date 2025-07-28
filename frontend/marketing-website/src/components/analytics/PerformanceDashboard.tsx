import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPerformanceSummary, calculatePerformanceGrade, WEB_VITALS_THRESHOLDS } from '@/utils/performance';
import { CoreWebVitals } from '@/types/marketing.types';

interface PerformanceDashboardProps {
  show?: boolean;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ show = false }) => {
  const [metrics, setMetrics] = useState<CoreWebVitals | null>(null);
  const [grade, setGrade] = useState<string>('');
  const [isVisible, setIsVisible] = useState(show);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      const summary = getPerformanceSummary();
      if (summary) {
        setMetrics(summary);
        setGrade(calculatePerformanceGrade(summary));
      }
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, [isVisible]);

  // Keyboard shortcut to toggle dashboard (Ctrl/Cmd + Shift + P)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isClient || !isVisible || !metrics) return null;

  const getMetricStatus = (value: number, thresholds: { good: number; needsImprovement: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return '#10b981';
      case 'B': return '#84cc16';
      case 'C': return '#f59e0b';
      case 'D': return '#f97316';
      case 'F': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Dashboard>
      <DashboardHeader>
        <Title>Performance Monitor</Title>
        <Grade style={{ color: getGradeColor(grade) }}>{grade}</Grade>
        <CloseButton onClick={() => setIsVisible(false)}>×</CloseButton>
      </DashboardHeader>
      
      <MetricsGrid>
        <MetricCard>
          <MetricName>LCP</MetricName>
          <MetricValue status={getMetricStatus(metrics.lcp, WEB_VITALS_THRESHOLDS.LCP)}>
            {Math.round(metrics.lcp)}ms
          </MetricValue>
          <MetricThreshold>Good: &lt;{WEB_VITALS_THRESHOLDS.LCP.good}ms</MetricThreshold>
        </MetricCard>

        <MetricCard>
          <MetricName>FID</MetricName>
          <MetricValue status={getMetricStatus(metrics.fid, WEB_VITALS_THRESHOLDS.FID)}>
            {Math.round(metrics.fid)}ms
          </MetricValue>
          <MetricThreshold>Good: &lt;{WEB_VITALS_THRESHOLDS.FID.good}ms</MetricThreshold>
        </MetricCard>

        <MetricCard>
          <MetricName>CLS</MetricName>
          <MetricValue status={getMetricStatus(metrics.cls, WEB_VITALS_THRESHOLDS.CLS)}>
            {metrics.cls.toFixed(3)}
          </MetricValue>
          <MetricThreshold>Good: &lt;{WEB_VITALS_THRESHOLDS.CLS.good}</MetricThreshold>
        </MetricCard>

        <MetricCard>
          <MetricName>FCP</MetricName>
          <MetricValue status={getMetricStatus(metrics.fcp, WEB_VITALS_THRESHOLDS.FCP)}>
            {Math.round(metrics.fcp)}ms
          </MetricValue>
          <MetricThreshold>Good: &lt;{WEB_VITALS_THRESHOLDS.FCP.good}ms</MetricThreshold>
        </MetricCard>

        <MetricCard>
          <MetricName>TTFB</MetricName>
          <MetricValue status={getMetricStatus(metrics.ttfb, WEB_VITALS_THRESHOLDS.TTFB)}>
            {Math.round(metrics.ttfb)}ms
          </MetricValue>
          <MetricThreshold>Good: &lt;{WEB_VITALS_THRESHOLDS.TTFB.good}ms</MetricThreshold>
        </MetricCard>
      </MetricsGrid>

      <DashboardFooter>
        <FooterText>Press Ctrl/Cmd + Shift + P to toggle</FooterText>
      </DashboardFooter>
    </Dashboard>
  );
};

// Styled Components
const Dashboard = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  border-radius: 12px;
  padding: 16px;
  min-width: 280px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 10000;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

const Grade = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const MetricCard = styled.div`
  text-align: center;
`;

const MetricName = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
`;

const MetricValue = styled.div<{ status: string }>`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  
  ${({ status }) => {
    switch (status) {
      case 'good':
        return 'color: #10b981;';
      case 'needs-improvement':
        return 'color: #f59e0b;';
      case 'poor':
        return 'color: #ef4444;';
      default:
        return 'color: #6b7280;';
    }
  }}
`;

const MetricThreshold = styled.div`
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
`;

const DashboardFooter = styled.div`
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const FooterText = styled.div`
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`;

export default PerformanceDashboard;