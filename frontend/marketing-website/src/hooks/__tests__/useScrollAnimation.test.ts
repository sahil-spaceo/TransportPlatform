import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from '../useScrollAnimation';

// Mock framer-motion
const mockStart = jest.fn();
const mockControls = {
  start: mockStart,
  stop: jest.fn(),
  set: jest.fn(),
};

jest.mock('framer-motion', () => ({
  useAnimation: () => mockControls,
  useInView: jest.fn(),
}));

// Mock useInView to control when elements are in view
const mockUseInView = require('framer-motion').useInView as jest.Mock;

describe('useScrollAnimation Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    it('returns ref and controls objects', () => {
      mockUseInView.mockReturnValue([jest.fn(), false]);
      
      const { result } = renderHook(() => useScrollAnimation());
      
      expect(result.current.ref).toBeDefined();
      expect(result.current.controls).toBeDefined();
      expect(typeof result.current.ref).toBe('function');
      expect(result.current.controls).toBe(mockControls);
    });

    it('does not start animation when element is not in view', () => {
      mockUseInView.mockReturnValue([jest.fn(), false]);
      
      renderHook(() => useScrollAnimation());
      
      expect(mockStart).not.toHaveBeenCalled();
    });

    it('starts animation when element comes into view', () => {
      mockUseInView.mockReturnValue([jest.fn(), true]);
      
      renderHook(() => useScrollAnimation());
      
      expect(mockStart).toHaveBeenCalledWith('visible');
    });
  });

  describe('Animation Trigger Options', () => {
    it('uses default trigger threshold', () => {
      const mockRef = jest.fn();
      mockUseInView.mockReturnValue([mockRef, false]);
      
      renderHook(() => useScrollAnimation());
      
      expect(mockUseInView).toHaveBeenCalledWith({
        threshold: 0.1,
        triggerOnce: true,
      });
    });

    it('accepts custom threshold', () => {
      const mockRef = jest.fn();
      mockUseInView.mockReturnValue([mockRef, false]);
      
      renderHook(() => useScrollAnimation({ threshold: 0.5 }));
      
      expect(mockUseInView).toHaveBeenCalledWith({
        threshold: 0.5,
        triggerOnce: true,
      });
    });

    it('accepts custom triggerOnce setting', () => {
      const mockRef = jest.fn();
      mockUseInView.mockReturnValue([mockRef, false]);
      
      renderHook(() => useScrollAnimation({ triggerOnce: false }));
      
      expect(mockUseInView).toHaveBeenCalledWith({
        threshold: 0.1,
        triggerOnce: false,
      });
    });

    it('accepts both custom threshold and triggerOnce', () => {
      const mockRef = jest.fn();
      mockUseInView.mockReturnValue([mockRef, false]);
      
      renderHook(() => useScrollAnimation({ 
        threshold: 0.3, 
        triggerOnce: false 
      }));
      
      expect(mockUseInView).toHaveBeenCalledWith({
        threshold: 0.3,
        triggerOnce: false,
      });
    });
  });

  describe('Custom Animation Target', () => {
    it('uses default "visible" animation target', () => {
      mockUseInView.mockReturnValue([jest.fn(), true]);
      
      renderHook(() => useScrollAnimation());
      
      expect(mockStart).toHaveBeenCalledWith('visible');
    });

    it('accepts custom animation target', () => {
      mockUseInView.mockReturnValue([jest.fn(), true]);
      
      renderHook(() => useScrollAnimation({ 
        animationTarget: 'customAnimation' 
      }));
      
      expect(mockStart).toHaveBeenCalledWith('customAnimation');
    });
  });

  describe('Lifecycle Behavior', () => {
    it('only starts animation once when triggerOnce is true', () => {
      const mockRef = jest.fn();
      let inView = false;
      
      mockUseInView.mockImplementation(() => [mockRef, inView]);
      
      const { rerender } = renderHook(() => useScrollAnimation());
      
      // Element comes into view
      inView = true;
      rerender();
      
      expect(mockStart).toHaveBeenCalledTimes(1);
      expect(mockStart).toHaveBeenCalledWith('visible');
      
      // Element goes out of view and comes back
      inView = false;
      rerender();
      inView = true;
      rerender();
      
      // Should still only be called once due to triggerOnce: true
      expect(mockStart).toHaveBeenCalledTimes(1);
    });

    it('starts animation multiple times when triggerOnce is false', () => {
      const mockRef = jest.fn();
      let inView = false;
      
      mockUseInView.mockImplementation(() => [mockRef, inView]);
      
      const { rerender } = renderHook(() => 
        useScrollAnimation({ triggerOnce: false })
      );
      
      // Element comes into view first time
      inView = true;
      rerender();
      
      expect(mockStart).toHaveBeenCalledTimes(1);
      
      // Element goes out of view
      inView = false;
      rerender();
      
      // Element comes into view again
      inView = true;
      rerender();
      
      // Should be called again since triggerOnce is false
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
  });

  describe('Error Handling', () => {
    it('handles missing animation controls gracefully', () => {
      mockUseInView.mockReturnValue([jest.fn(), true]);
      
      // Mock useAnimation to return undefined
      const originalUseAnimation = require('framer-motion').useAnimation;
      require('framer-motion').useAnimation = jest.fn(() => undefined);
      
      expect(() => {
        renderHook(() => useScrollAnimation());
      }).not.toThrow();
      
      // Restore original mock
      require('framer-motion').useAnimation = originalUseAnimation;
    });

    it('handles useInView hook errors', () => {
      mockUseInView.mockImplementation(() => {
        throw new Error('useInView error');
      });
      
      expect(() => {
        renderHook(() => useScrollAnimation());
      }).toThrow('useInView error');
    });
  });

  describe('Performance', () => {
    it('does not create new controls on every render', () => {
      mockUseInView.mockReturnValue([jest.fn(), false]);
      
      const { result, rerender } = renderHook(() => useScrollAnimation());
      
      const firstControls = result.current.controls;
      
      rerender();
      
      const secondControls = result.current.controls;
      
      expect(firstControls).toBe(secondControls);
    });

    it('maintains stable ref callback', () => {
      mockUseInView.mockReturnValue([jest.fn(), false]);
      
      const { result, rerender } = renderHook(() => useScrollAnimation());
      
      const firstRef = result.current.ref;
      
      rerender();
      
      const secondRef = result.current.ref;
      
      // The ref callback should be stable
      expect(firstRef).toBe(secondRef);
    });
  });

  describe('Integration Scenarios', () => {
    it('works with multiple hook instances', () => {
      mockUseInView.mockReturnValue([jest.fn(), true]);
      
      const { result: result1 } = renderHook(() => useScrollAnimation());
      const { result: result2 } = renderHook(() => useScrollAnimation());
      
      expect(result1.current.controls).not.toBe(result2.current.controls);
      expect(result1.current.ref).not.toBe(result2.current.ref);
      
      expect(mockStart).toHaveBeenCalledTimes(2);
    });

    it('supports different animation targets for multiple instances', () => {
      mockUseInView.mockReturnValue([jest.fn(), true]);
      
      renderHook(() => useScrollAnimation({ animationTarget: 'fadeIn' }));
      renderHook(() => useScrollAnimation({ animationTarget: 'slideUp' }));
      
      expect(mockStart).toHaveBeenCalledWith('fadeIn');
      expect(mockStart).toHaveBeenCalledWith('slideUp');
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
  });
});