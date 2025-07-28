import { WebSocketMessage, RealTimeUpdate, KPIMetric, ActivityFeedItem } from '../types/dashboard.types';

class RealTimeService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // In development, use mock WebSocket
      if (process.env.NODE_ENV === 'development') {
        this.setupMockWebSocket();
        return;
      }

      // Production WebSocket connection
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit('connection', { status: 'connected' });
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
        this.emit('connection', { status: 'disconnected' });
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', { error });
      };

    } catch (error) {
      console.error('WebSocket connection failed:', error);
      this.handleReconnect();
    }
  }

  private setupMockWebSocket() {
    // Mock WebSocket for development
    this.isConnected = true;
    console.log('Mock WebSocket connected');
    this.emit('connection', { status: 'connected' });

    // Simulate real-time updates
    this.startMockUpdates();
  }

  private startMockUpdates() {
    // Mock KPI updates every 5 seconds
    setInterval(() => {
      const mockKPIUpdate: RealTimeUpdate = {
        type: 'kpi',
        timestamp: new Date(),
        data: this.generateMockKPIData()
      };
      this.handleMessage({
        type: 'dashboard_update',
        timestamp: new Date(),
        data: mockKPIUpdate
      });
    }, 5000);

    // Mock activity feed updates every 10 seconds
    setInterval(() => {
      const mockActivityUpdate: RealTimeUpdate = {
        type: 'activity',
        timestamp: new Date(),
        data: this.generateMockActivityData()
      };
      this.handleMessage({
        type: 'activity_feed',
        timestamp: new Date(),
        data: mockActivityUpdate
      });
    }, 10000);

    // Mock system alerts every 30 seconds (randomly)
    setInterval(() => {
      if (Math.random() > 0.7) {
        const mockAlert: RealTimeUpdate = {
          type: 'alert',
          timestamp: new Date(),
          data: this.generateMockAlert()
        };
        this.handleMessage({
          type: 'system_alert',
          timestamp: new Date(),
          data: mockAlert
        });
      }
    }, 30000);
  }

  private generateMockKPIData(): KPIMetric[] {
    const baseMetrics = [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: Math.floor(Math.random() * 50000) + 100000,
        change: (Math.random() * 20 - 10).toFixed(1) + '%',
        changeType: Math.random() > 0.5 ? 'positive' : 'negative' as 'positive' | 'negative',
        icon: '💰',
        color: 'success' as const,
        trend: Array.from({ length: 10 }, () => Math.random() * 100),
        unit: 'currency'
      },
      {
        id: 'users',
        title: 'Active Users',
        value: Math.floor(Math.random() * 1000) + 2000,
        change: (Math.random() * 15 - 5).toFixed(1) + '%',
        changeType: Math.random() > 0.6 ? 'positive' : 'negative' as 'positive' | 'negative',
        icon: '👥',
        color: 'info' as const,
        trend: Array.from({ length: 10 }, () => Math.random() * 100)
      },
      {
        id: 'rides',
        title: 'Active Rides',
        value: Math.floor(Math.random() * 50) + 100,
        change: (Math.random() * 25 - 12).toFixed(1) + '%',
        changeType: Math.random() > 0.4 ? 'positive' : 'negative' as 'positive' | 'negative',
        icon: '🚗',
        color: 'primary' as const,
        trend: Array.from({ length: 10 }, () => Math.random() * 100)
      },
      {
        id: 'health',
        title: 'System Health',
        value: (Math.random() * 5 + 95).toFixed(1),
        change: 'Stable',
        changeType: 'neutral' as const,
        icon: '⚡',
        color: 'success' as const,
        trend: Array.from({ length: 10 }, () => Math.random() * 100),
        unit: 'percentage'
      }
    ];

    return baseMetrics;
  }

  private generateMockActivityData(): ActivityFeedItem {
    const activities = [
      {
        type: 'order' as const,
        severity: 'success' as const,
        title: 'New ride completed',
        description: 'User completed a ride from Downtown to Airport'
      },
      {
        type: 'system' as const,
        severity: 'info' as const,
        title: 'System update deployed',
        description: 'New features deployed successfully'
      },
      {
        type: 'driver' as const,
        severity: 'success' as const,
        title: 'New driver registered',
        description: 'Driver completed registration and verification'
      },
      {
        type: 'alert' as const,
        severity: 'warning' as const,
        title: 'High demand detected',
        description: 'Surge pricing activated in downtown area'
      }
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    return {
      id: `activity-${Date.now()}`,
      timestamp: new Date(),
      ...randomActivity,
      actor: Math.random() > 0.5 ? {
        id: 'user-123',
        name: 'John Doe'
      } : undefined
    };
  }

  private generateMockAlert() {
    const alerts = [
      {
        severity: 'warning' as const,
        message: 'High server load detected'
      },
      {
        severity: 'info' as const,
        message: 'Scheduled maintenance starting soon'
      },
      {
        severity: 'error' as const,
        message: 'Payment service temporarily unavailable'
      }
    ];

    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    
    return {
      id: `alert-${Date.now()}`,
      timestamp: new Date(),
      ...randomAlert
    };
  }

  private handleMessage(message: WebSocketMessage) {
    console.log('Received WebSocket message:', message.type);
    this.emit(message.type, message.data);
    this.emit('message', message);
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('connection', { status: 'failed' });
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Public API
  public subscribe(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
        if (eventListeners.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  }

  public unsubscribe(event: string, callback: (data: any) => void) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  public send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public getConnectionStatus() {
    return this.isConnected;
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.listeners.clear();
  }

  // Dashboard specific methods
  public subscribeToKPIUpdates(callback: (metrics: KPIMetric[]) => void) {
    return this.subscribe('kpi_update', callback);
  }

  public subscribeToActivityFeed(callback: (activity: ActivityFeedItem) => void) {
    return this.subscribe('activity_feed', callback);
  }

  public subscribeToSystemAlerts(callback: (alert: any) => void) {
    return this.subscribe('system_alert', callback);
  }

  public subscribeToConnection(callback: (status: { status: string }) => void) {
    return this.subscribe('connection', callback);
  }

  // Request specific data
  public requestDashboardData() {
    this.send({
      type: 'request_dashboard_data',
      timestamp: new Date()
    });
  }

  public requestKPIUpdate() {
    this.send({
      type: 'request_kpi_update',
      timestamp: new Date()
    });
  }
}

// Singleton instance
export const realTimeService = new RealTimeService();