import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { usePerformanceMode } from '../context/PerformanceContext';

/**
 * Custom hook to track:
 * 1. Normalized mouse coordinates (range [-1, 1]) for parallax effects.
 * 2. Raw mouse pixel coordinates (clientX/Y) with spring physics for follow-spotlight effects.
 *
 * Performance Features:
 * - RAF throttling to limit mouse processing to screen refresh rate.
 * - Pauses event listener when tab is inactive (`document.hidden`).
 * - Completely disables tracking in 'lite' performance mode.
 */
export const useMouseParallax = (options = {}) => {
  const { isLite } = usePerformanceMode();
  const isDisabled = options.disabled || isLite;

  // 1. Normalized values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // 2. Pixel coordinates (initialized to screen center to prevent jumps)
  const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960;
  const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540;
  const rawXpx = useMotionValue(initialX);
  const rawYpx = useMotionValue(initialY);

  // Spring physics for parallax layers (soft, graceful lag)
  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  
  // Spring physics for mouse follow spotlight (ultra-fast, snappy, highly responsive)
  const spotlightConfig = { damping: 22, stiffness: 450, mass: 0.25 };

  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  const mouseXpx = useSpring(rawXpx, spotlightConfig);
  const mouseYpx = useSpring(rawYpx, spotlightConfig);

  const rafIdRef = useRef(null);

  useEffect(() => {
    if (isDisabled || typeof window === 'undefined') return;

    let pendingX = 0;
    let pendingY = 0;
    let pendingClientX = initialX;
    let pendingClientY = initialY;

    const handleMouseMove = (e) => {
      if (document.hidden) return;

      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      pendingX = (clientX / windowWidth) * 2 - 1;
      pendingY = (clientY / windowHeight) * 2 - 1;
      pendingClientX = clientX;
      pendingClientY = clientY;

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          rawX.set(pendingX);
          rawY.set(pendingY);
          rawXpx.set(pendingClientX);
          rawYpx.set(pendingClientY);
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isDisabled, rawX, rawY, rawXpx, rawYpx, initialX, initialY]);

  return { mouseX, mouseY, mouseXpx, mouseYpx };
};
