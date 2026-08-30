import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Custom hook to track:
 * 1. Normalized mouse coordinates (range [-1, 1]) for parallax effects.
 * 2. Raw mouse pixel coordinates (clientX/Y) with spring physics for follow-spotlight effects.
 */
export const useMouseParallax = () => {
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Normalize coordinates to a range of [-1, 1] relative to center of viewport
      const x = (clientX / windowWidth) * 2 - 1;
      const y = (clientY / windowHeight) * 2 - 1;

      rawX.set(x);
      rawY.set(y);

      // Track actual pixel positions
      rawXpx.set(clientX);
      rawYpx.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY, rawXpx, rawYpx]);

  return { mouseX, mouseY, mouseXpx, mouseYpx };
};
