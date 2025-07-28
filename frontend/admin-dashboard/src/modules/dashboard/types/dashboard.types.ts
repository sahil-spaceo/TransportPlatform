// Dashboard Types for Admin Panel
export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  trend: number[]; // Array of values for sparkline
  unit?: string;
  precision?: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  timestamp?: Date;
  category?: string;
  color?: string;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
  category?: string;
}

export interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  growth: number;
}

export interface GeographicData {
  latitude: number;
  longitude: number;
  value: number;
  label: string;
  category: 'active_ride' | 'delivery' | 'driver' | 'hotspot';
  intensity?: number;
}

export interface ActivityFeedItem {
  id: string;
  timestamp: Date;
  type: 'order' | 'driver' | 'user' | 'system' | 'alert';
  severity: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description: string;
  actor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  action: () => void;
  permissions?: string[];
  badge?: string | number;
}

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'map' | 'feed' | 'actions' | 'table';
  title: string;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: Record<string, any>;
  data?: any;
  refreshInterval?: number; // in seconds
  permissions?: string[];
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  currentLayout: DashboardLayout | null;
  availableLayouts: DashboardLayout[];
  realTimeEnabled: boolean;
  refreshInterval: number;
  kpiMetrics: KPIMetric[];
  recentActivity: ActivityFeedItem[];
  quickActions: QuickAction[];
}

export interface DashboardFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  region?: string;
  serviceType?: 'rides' | 'delivery' | 'drone' | 'all';
  status?: string;
  customFilters?: Record<string, any>;
}

export interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  services: {
    api: 'online' | 'offline' | 'degraded';
    database: 'online' | 'offline' | 'degraded';
    cache: 'online' | 'offline' | 'degraded';
    queue: 'online' | 'offline' | 'degraded';
    storage: 'online' | 'offline' | 'degraded';
  };
  metrics: {
    responseTime: number;
    errorRate: number;
    uptime: number;
    throughput: number;
  };
  alerts: Array<{
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: Date;
  }>;
}

export interface RealTimeUpdate {
  type: 'kpi' | 'activity' | 'alert' | 'system' | 'chart_data';
  timestamp: Date;
  data: any;
  widget_id?: string;
}

// Chart configuration types
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'heatmap';
  title: string;
  data: ChartDataPoint[];
  options?: {
    colors?: string[];
    gradient?: boolean;
    responsive?: boolean;
    legend?: boolean;
    tooltip?: boolean;
    animation?: boolean;
    grid?: boolean;
    axes?: {
      x?: { label?: string; format?: string };
      y?: { label?: string; format?: string };
    };
  };
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'dashboard_update' | 'kpi_update' | 'activity_feed' | 'system_alert';
  timestamp: Date;
  data: any;
  target?: string; // widget ID or 'all'
}

// Dashboard context types
export interface DashboardContextType {
  state: DashboardState;
  filters: DashboardFilters;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  refreshDashboard: () => Promise<void>;
  toggleRealTime: () => void;
  updateWidget: (widgetId: string, data: any) => void;
  addWidget: (widget: DashboardWidget) => void;
  removeWidget: (widgetId: string) => void;
  saveLayout: (layout: DashboardLayout) => Promise<void>;
  loadLayout: (layoutId: string) => Promise<void>;
}