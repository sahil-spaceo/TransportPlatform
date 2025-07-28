import { useState, useEffect, useCallback } from 'react';
import { KPIMetric, ActivityFeedItem, DashboardState } from '../types/dashboard.types';
import { realTimeService } from '../services/realTimeService';

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    isLoading: true,
    error: null,
    lastUpdated: null,
    currentLayout: null,
    availableLayouts: [],
    realTimeEnabled: true,
    refreshInterval: 30,
    kpiMetrics: [],
    recentActivity: [],
    quickActions: []
  });

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting' | 'failed'>('connecting');

  // Initialize dashboard data
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Load initial dashboard data
        const initialData = await loadDashboardData();
        setState(prev => ({
          ...prev,
          ...initialData,
          isLoading: false,
          lastUpdated: new Date()
        }));

      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load dashboard'
        }));
      }
    };

    initializeDashboard();
  }, []);

  // Setup real-time subscriptions
  useEffect(() => {
    if (!state.realTimeEnabled) return;

    // Subscribe to connection status
    const unsubscribeConnection = realTimeService.subscribeToConnection((status) => {
      setConnectionStatus(status.status as any);
    });

    // Subscribe to KPI updates
    const unsubscribeKPI = realTimeService.subscribeToKPIUpdates((metrics) => {
      setState(prev => ({
        ...prev,
        kpiMetrics: metrics,
        lastUpdated: new Date()
      }));
    });

    // Subscribe to activity feed updates
    const unsubscribeActivity = realTimeService.subscribeToActivityFeed((activity) => {
      setState(prev => ({
        ...prev,
        recentActivity: [activity, ...prev.recentActivity.slice(0, 49)], // Keep last 50 items
        lastUpdated: new Date()
      }));
    });

    // Subscribe to system alerts
    const unsubscribeAlerts = realTimeService.subscribeToSystemAlerts((alert) => {
      console.log('System alert received:', alert);
      // Handle system alerts (could show notifications, update UI, etc.)
    });

    // Request initial data
    realTimeService.requestDashboardData();

    return () => {
      unsubscribeConnection();
      unsubscribeKPI();
      unsubscribeActivity();
      unsubscribeAlerts();
    };
  }, [state.realTimeEnabled]);

  // Load dashboard data (mock implementation)
  const loadDashboardData = useCallback(async (): Promise<Partial<DashboardState>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      kpiMetrics: [
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: 124560,
          change: '+12.5%',
          changeType: 'positive',
          icon: '💰',
          color: 'success',
          trend: [80, 85, 78, 92, 88, 95, 87, 90, 93, 89],
          unit: 'currency'
        },
        {
          id: 'users',
          title: 'Active Users',
          value: 2847,
          change: '+8.2%',
          changeType: 'positive',
          icon: '👥',
          color: 'info',
          trend: [65, 70, 68, 75, 72, 78, 74, 76, 79, 77]
        },
        {
          id: 'rides',
          title: 'Active Rides',
          value: 156,
          change: '-2.1%',
          changeType: 'negative',
          icon: '🚗',
          color: 'primary',
          trend: [45, 48, 42, 50, 46, 44, 47, 43, 41, 45]
        },
        {
          id: 'health',
          title: 'System Health',
          value: '99.9%',
          change: 'Stable',
          changeType: 'neutral',
          icon: '⚡',
          color: 'success',
          trend: [95, 96, 98, 97, 99, 98, 99, 97, 99, 99],
          unit: 'percentage'
        }
      ],
      recentActivity: [
        {
          id: '1',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          type: 'order',
          severity: 'success',
          title: 'New ride request completed',
          description: 'John Smith completed a ride from Downtown to Airport',
          actor: { id: '1', name: 'John Smith' }
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          type: 'system',
          severity: 'warning',
          title: 'High demand detected',
          description: 'Surge pricing activated in Downtown area due to high demand',
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          type: 'driver',
          severity: 'info',
          title: 'New driver registered',
          description: 'Sarah Johnson completed registration and background check',
          actor: { id: '2', name: 'Sarah Johnson' }
        }
      ]
    };
  }, []);

  // Refresh dashboard data
  const refreshDashboard = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const newData = await loadDashboardData();
      setState(prev => ({
        ...prev,
        ...newData,
        isLoading: false,
        lastUpdated: new Date()
      }));

      // Also request real-time update
      if (state.realTimeEnabled) {
        realTimeService.requestDashboardData();
      }

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh dashboard'
      }));
    }
  }, [state.realTimeEnabled]);

  // Toggle real-time updates
  const toggleRealTime = useCallback(() => {
    setState(prev => ({
      ...prev,
      realTimeEnabled: !prev.realTimeEnabled
    }));
  }, []);

  // Update specific KPI metric
  const updateKPIMetric = useCallback((metricId: string, updates: Partial<KPIMetric>) => {
    setState(prev => ({
      ...prev,
      kpiMetrics: prev.kpiMetrics.map(metric =>
        metric.id === metricId ? { ...metric, ...updates } : metric
      ),
      lastUpdated: new Date()
    }));
  }, []);

  // Add activity item
  const addActivity = useCallback((activity: ActivityFeedItem) => {
    setState(prev => ({
      ...prev,
      recentActivity: [activity, ...prev.recentActivity.slice(0, 49)],
      lastUpdated: new Date()
    }));
  }, []);

  // Set refresh interval
  const setRefreshInterval = useCallback((interval: number) => {
    setState(prev => ({
      ...prev,
      refreshInterval: interval
    }));
  }, []);

  // Get specific metric by ID
  const getMetric = useCallback((metricId: string) => {
    return state.kpiMetrics.find(metric => metric.id === metricId);
  }, [state.kpiMetrics]);

  // Get metrics by color/type
  const getMetricsByColor = useCallback((color: KPIMetric['color']) => {
    return state.kpiMetrics.filter(metric => metric.color === color);
  }, [state.kpiMetrics]);

  // Calculate dashboard summary
  const getDashboardSummary = useCallback(() => {
    const totalPositiveChanges = state.kpiMetrics.filter(m => m.changeType === 'positive').length;
    const totalNegativeChanges = state.kpiMetrics.filter(m => m.changeType === 'negative').length;
    const totalMetrics = state.kpiMetrics.length;
    
    const recentAlerts = state.recentActivity.filter(
      activity => activity.severity === 'error' || activity.severity === 'warning'
    ).length;

    return {
      totalMetrics,
      positiveChanges: totalPositiveChanges,
      negativeChanges: totalNegativeChanges,
      neutralChanges: totalMetrics - totalPositiveChanges - totalNegativeChanges,
      recentAlerts,
      totalActivities: state.recentActivity.length,
      healthScore: totalPositiveChanges > totalNegativeChanges ? 'good' : 
                  totalPositiveChanges === totalNegativeChanges ? 'fair' : 'poor'
    };
  }, [state.kpiMetrics, state.recentActivity]);

  return {
    // State
    state,
    connectionStatus,
    
    // Actions
    refreshDashboard,
    toggleRealTime,
    updateKPIMetric,
    addActivity,
    setRefreshInterval,
    
    // Selectors
    getMetric,
    getMetricsByColor,
    getDashboardSummary,
    
    // Computed
    isLoading: state.isLoading,
    hasError: !!state.error,
    isRealTimeEnabled: state.realTimeEnabled,
    lastUpdated: state.lastUpdated,
    kpiMetrics: state.kpiMetrics,
    recentActivity: state.recentActivity
  };
};