import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceMode } from '../../context/PerformanceContext';

export const InteractiveSpotlight = ({ mouseXpx, mouseYpx, theme }) => {
  const { isLite, isBalanced } = usePerformanceMode();
  const isLight = theme === 'light';

  // In Balanced mode, bypass mix-blend-screen which is GPU-heavy on integrated graphics
  const mixBlendStyle = isBalanced || isLite ? 'normal' : 'mix-blend-screen';

  return (
    <motion.div
      className={`fixed pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] z-8 ${mixBlendStyle} transition-opacity duration-500`}
      style={{
        x: mouseXpx,
        y: mouseYpx,
        opacity: isLight || isLite ? 0 : isBalanced ? 0.45 : 0.9,
        background: 'radial-gradient(circle, rgba(255, 117, 143, 0.18) 0%, rgba(138, 60, 93, 0.06) 50%, rgba(0, 0, 0, 0) 70%)',
      }}
    />
  );
};
