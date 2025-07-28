// FlexFlow Marketing Website - Scroll Animation Hook
// Custom hook for scroll-triggered animations with Framer Motion

import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '-10% 0px -10% 0px',
    triggerOnce = true
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold as any,
    margin: rootMargin,
    once: triggerOnce
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [isInView, controls, triggerOnce]);

  return { ref, controls, isInView };
};

export default useScrollAnimation;