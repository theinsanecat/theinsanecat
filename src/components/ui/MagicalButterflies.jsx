import React from 'react';
import { motion } from 'framer-motion';

// Solid Monochrome Wing Butterfly Component (Pastel Pink & Pastel Lavender in Light Mode)
const MonochromeButterfly = ({
  colorTheme = 'pink',
  size = 28,
  flapDuration = 0.24,
  flapDelay = 0,
  theme = 'dark',
}) => {
  const isPink = colorTheme === 'pink';
  const isLight = theme === 'light';

  // High-contrast vibrant pink & lavender color palette definitions for Light Mode vs Night Mode
  const mainColor = isPink 
    ? (isLight ? '#f472b6' : '#ec4899') 
    : (isLight ? '#c084fc' : '#a855f7');
    
  const glowColor = isPink 
    ? (isLight ? 'rgba(244,114,182,0.7)' : 'rgba(236,72,153,0.9)') 
    : (isLight ? 'rgba(192,132,252,0.7)' : 'rgba(168,85,247,0.9)');

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none transition-all duration-500"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 3px ${mainColor})`,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          animate={{ rotateY: [0, 66, 0] }}
          transition={{
            duration: flapDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: flapDelay,
          }}
          className="absolute right-[50%] w-[50%] h-[92%] origin-right"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg viewBox="0 0 30 44" className="w-full h-full overflow-visible">
            <path
              d="M 30,22 C 14,0 0,6 2,24 C 4,34 20,38 30,22 Z"
              fill={mainColor}
            />
            <path
              d="M 30,22 C 18,28 4,38 12,44 C 22,48 26,34 30,22 Z"
              fill={mainColor}
            />
          </svg>
        </motion.div>

        {/* Right Wing */}
        <motion.div
          animate={{ rotateY: [0, -66, 0] }}
          transition={{
            duration: flapDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: flapDelay,
          }}
          className="absolute left-[50%] w-[50%] h-[92%] origin-left"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg viewBox="0 0 30 44" className="w-full h-full overflow-visible">
            <path
              d="M 0,22 C 16,0 30,6 28,24 C 26,34 10,38 0,22 Z"
              fill={mainColor}
            />
            <path
              d="M 0,22 C 12,28 26,38 18,44 C 8,48 4,34 0,22 Z"
              fill={mainColor}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export const MagicalButterflies = ({ theme }) => {
  return (
    // fixed inset-0 ensures viewport-wide coverage covering the extreme left edge
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden select-none">
      {/* ================= BUTTERFLY 1: Purple Butterfly (Upper Left) ================= */}
      <motion.div
        animate={{
          left: ['0%', '16%', '2%', '22%', '8%', '0%'],
          top: ['12%', '32%', '52%', '28%', '42%', '12%'],
          rotate: [12, -15, 20, -10, 15, 12],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-7 h-7 z-25"
        style={{ left: '0%', top: '12%' }}
      >
        <MonochromeButterfly colorTheme="purple" size={28} flapDuration={0.27} flapDelay={0.04} theme={theme} />
      </motion.div>

      {/* ================= BUTTERFLY 2: Purple Butterfly (Lower Left) ================= */}
      <motion.div
        animate={{
          left: ['-0.5%', '12%', '1%', '20%', '6%', '-0.5%'],
          top: ['42%', '65%', '82%', '54%', '34%', '42%'],
          rotate: [-10, 18, -12, 16, -22, -10],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-6 h-6 z-25"
        style={{ left: '-0.5%', top: '42%' }}
      >
        <MonochromeButterfly colorTheme="purple" size={26} flapDuration={0.33} flapDelay={0.16} theme={theme} />
      </motion.div>

      {/* ================= BUTTERFLY 3: Pink Butterfly (Mid Left) ================= */}
      <motion.div
        animate={{
          left: ['18%', '1%', '25%', '5%', '20%', '18%'],
          top: ['20%', '40%', '64%', '78%', '36%', '20%'],
          rotate: [-18, 12, -22, 15, -8, -18],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute w-7 h-7 z-25"
        style={{ left: '18%', top: '20%' }}
      >
        <MonochromeButterfly colorTheme="pink" size={28} flapDuration={0.22} flapDelay={0.08} theme={theme} />
      </motion.div>

      {/* ================= BUTTERFLY 4: Solid Pink Butterfly (Right Region) ================= */}
      <motion.div
        animate={{
          left: ['75%', '92%', '78%', '95%', '84%', '75%'],
          top: ['15%', '32%', '54%', '26%', '42%', '15%'],
          rotate: [10, -14, 18, -12, 14, 10],
        }}
        transition={{
          duration: 18.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="absolute w-7 h-7 z-25"
        style={{ left: '75%', top: '15%' }}
      >
        <MonochromeButterfly colorTheme="pink" size={28} flapDuration={0.25} flapDelay={0.12} theme={theme} />
      </motion.div>
    </div>
  );
};

export default MagicalButterflies;
