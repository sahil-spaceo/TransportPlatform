// FlexFlow Marketing Website - Parallax Hook
// Custom hook for parallax scrolling effects

import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  disabled?: boolean;
  offset?: any;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const {
    speed = 0.5,
    direction = 'up',
    disabled = false,
    offset = ['start end', 'end start']
  } = options;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  // Transform scroll progress to parallax values
  const getTransformRange = (): [number, number] => {
    const range = 100 * speed;
    switch (direction) {
      case 'up':
        return [range, -range];
      case 'down':
        return [-range, range];
      case 'left':
        return [range, -range];
      case 'right':
        return [-range, range];
      default:
        return [range, -range];
    }
  };

  const transformRange = getTransformRange();
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' || direction === 'down' ? transformRange : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' || direction === 'right' ? transformRange : [0, 0]
  );

  return {
    ref,
    style: disabled ? {} : {
      y: direction === 'up' || direction === 'down' ? y : 0,
      x: direction === 'left' || direction === 'right' ? x : 0
    },
    scrollYProgress
  };
};

export default useParallax;