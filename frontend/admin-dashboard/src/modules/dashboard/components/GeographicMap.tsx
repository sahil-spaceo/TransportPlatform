'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GeographicData } from '../types/dashboard.types';

const MapContainer = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MapTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const MapControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ControlButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $active }) => 
    $active ? theme.colors.gradients.primary : theme.colors.background.paper};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text.inverse : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast};

  &:hover {
    background: ${({ theme, $active }) => 
      $active ? theme.colors.gradients.primary : theme.colors.gradients.secondary};
    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

const MapContent = styled.div`
  flex: 1;
  position: relative;
  min-height: 300px;
  background: ${({ theme }) => theme.colors.gradients.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const MapSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const HeatmapPoint = styled.circle<{ $intensity: number; $category: string }>`
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast};

  &:hover {
    stroke: ${({ theme }) => theme.colors.text.inverse};
    stroke-width: 2;
    filter: brightness(1.2);
  }
`;

const MapLegend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Tooltip = styled.div<{ $x: number; $y: number; $visible: boolean }>`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  pointer-events: none;
  z-index: 1000;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity ${({ theme }) => theme.animations.duration.fast};
  white-space: nowrap;
`;

// Mock geographic data for demonstration
const mockGeoData: GeographicData[] = [
  { latitude: 40.7128, longitude: -74.0060, value: 150, label: 'Manhattan', category: 'active_ride', intensity: 0.9 },
  { latitude: 40.7589, longitude: -73.9851, value: 89, label: 'Central Park', category: 'hotspot', intensity: 0.6 },
  { latitude: 40.6892, longitude: -74.0445, value: 234, label: 'Brooklyn', category: 'delivery', intensity: 0.8 },
  { latitude: 40.7505, longitude: -73.9934, value: 67, label: 'Times Square', category: 'driver', intensity: 0.5 },
  { latitude: 40.7831, longitude: -73.9712, value: 123, label: 'Upper East Side', category: 'active_ride', intensity: 0.7 },
  { latitude: 40.6782, longitude: -73.9442, value: 198, label: 'Queens', category: 'delivery', intensity: 0.75 },
  { latitude: 40.7282, longitude: -73.7949, value: 45, label: 'LaGuardia', category: 'driver', intensity: 0.3 },
  { latitude: 40.6413, longitude: -74.0799, value: 176, label: 'Staten Island', category: 'hotspot', intensity: 0.65 },
];

interface GeographicMapProps {
  data?: GeographicData[];
  height?: number;
}

export const GeographicMap: React.FC<GeographicMapProps> = ({
  data = mockGeoData,
  height = 300
}) => {
  const [viewMode, setViewMode] = useState<'heatmap' | 'markers' | 'zones'>('heatmap');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({ visible: false, x: 0, y: 0, content: '' });

  const categories = {
    active_ride: { color: '#3b82f6', label: 'Active Rides' },
    delivery: { color: '#10b981', label: 'Deliveries' },
    driver: { color: '#f59e0b', label: 'Drivers' },
    hotspot: { color: '#ef4444', label: 'Hotspots' }
  };

  const filteredData = selectedCategory === 'all' 
    ? data 
    : data.filter(point => point.category === selectedCategory);

  // Convert lat/lng to SVG coordinates (simplified projection)
  const latLngToSVG = (lat: number, lng: number, width: number, height: number) => {
    // Simple mercator projection for NYC area
    const minLat = 40.4774, maxLat = 40.9176;
    const minLng = -74.2591, maxLng = -73.7004;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * width;
    const y = ((maxLat - lat) / (maxLat - minLat)) * height;
    
    return { x, y };
  };

  const handlePointHover = (event: React.MouseEvent, point: GeographicData) => {
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top - 10,
      content: `${point.label}: ${point.value} ${point.category.replace('_', ' ')}`
    });
  };

  const handlePointLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const calculateStats = () => {
    const total = filteredData.reduce((sum, point) => sum + point.value, 0);
    const avg = total / filteredData.length;
    const max = Math.max(...filteredData.map(point => point.value));
    const activeAreas = filteredData.filter(point => point.intensity && point.intensity > 0.5).length;

    return { total, avg, max, activeAreas };
  };

  const stats = calculateStats();

  return (
    <MapContainer>
      <MapHeader>
        <MapTitle>Geographic Activity</MapTitle>
        <MapControls>
          <ControlButton 
            $active={viewMode === 'heatmap'} 
            onClick={() => setViewMode('heatmap')}
          >
            Heatmap
          </ControlButton>
          <ControlButton 
            $active={viewMode === 'markers'} 
            onClick={() => setViewMode('markers')}
          >
            Markers
          </ControlButton>
          <ControlButton 
            $active={selectedCategory === 'all'} 
            onClick={() => setSelectedCategory('all')}
          >
            All
          </ControlButton>
          {Object.entries(categories).map(([key, category]) => (
            <ControlButton
              key={key}
              $active={selectedCategory === key}
              onClick={() => setSelectedCategory(key)}
            >
              {category.label}
            </ControlButton>
          ))}
        </MapControls>
      </MapHeader>

      <MapContent>
        <MapSVG viewBox="0 0 400 300">
          {/* Background map outline (simplified NYC) */}
          <rect width="400" height="300" fill="#f1f5f9" opacity="0.3" />
          
          {/* Simplified NYC boroughs outline */}
          <path
            d="M50,150 L200,120 L350,140 L380,200 L300,250 L150,280 L50,200 Z"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1"
            opacity="0.5"
          />
          
          {/* Data points */}
          {filteredData.map((point) => {
            const { x, y } = latLngToSVG(point.latitude, point.longitude, 400, 300);
            const category = categories[point.category as keyof typeof categories];
            const radius = viewMode === 'heatmap' 
              ? Math.max(3, (point.intensity || 0.5) * 15)
              : Math.max(4, Math.sqrt(point.value) / 2);

            return (
              <HeatmapPoint
                key={`${point.latitude}-${point.longitude}`}
                cx={x}
                cy={y}
                r={radius}
                fill={category.color}
                fillOpacity={viewMode === 'heatmap' ? point.intensity || 0.5 : 0.7}
                $intensity={point.intensity || 0.5}
                $category={point.category}
                onMouseEnter={(e) => handlePointHover(e, point)}
                onMouseLeave={handlePointLeave}
              />
            );
          })}
        </MapSVG>

        <Tooltip
          $x={tooltip.x}
          $y={tooltip.y}
          $visible={tooltip.visible}
        >
          {tooltip.content}
        </Tooltip>
      </MapContent>

      <MapLegend>
        {Object.entries(categories).map(([key, category]) => (
          <LegendItem key={key}>
            <LegendColor $color={category.color} />
            {category.label}
          </LegendItem>
        ))}
      </MapLegend>

      <StatsGrid>
        <StatItem>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Activity</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{Math.round(stats.avg)}</StatValue>
          <StatLabel>Average</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.max}</StatValue>
          <StatLabel>Peak Activity</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.activeAreas}</StatValue>
          <StatLabel>Hot Zones</StatLabel>
        </StatItem>
      </StatsGrid>
    </MapContainer>
  );
};