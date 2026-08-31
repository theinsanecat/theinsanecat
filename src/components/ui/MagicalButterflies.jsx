import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Solid Monochrome Wing Butterfly Component (Pastel Pink & Pastel Lavender in Light Mode)
const MonochromeButterfly = ({
  colorTheme = 'pink',
  size = 28,
  flapDuration = 0.24,
  flapDelay = 0,
  theme = 'dark',
  isMobile = false,
}) => {
  const isPink = colorTheme === 'pink';
  const isLight = theme === 'light';

  const mainColor = isPink 
    ? (isLight ? '#f472b6' : '#ec4899') 
    : (isLight ? '#c084fc' : '#a855f7');
    
  const glowColor = isPink 
    ? (isLight ? 'rgba(244,114,182,0.7)' : 'rgba(236,72,153,0.9)') 
    : (isLight ? 'rgba(192,132,252,0.7)' : 'rgba(168,85,247,0.9)');

  // On mobile: skip drop-shadow filter — it forces GPU re-rasterization on every flap frame
  const filterStyle = isMobile
    ? undefined
    : `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 3px ${mainColor})`;

  // On mobile: slower flap duration reduces frames calculated per second significantly
  const effectiveFlapDuration = isMobile ? Math.max(flapDuration * 1.8, 0.45) : flapDuration;

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none transition-all duration-500"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: filterStyle,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <div
          className="absolute right-[50%] w-[50%] h-[92%] origin-right animate-flap-left"
          style={{ transformStyle: 'preserve-3d', animationDuration: `${effectiveFlapDuration}s` }}
        >
          <svg viewBox="0 0 30 44" className="w-full h-full overflow-visible">
            <path d="M 30,22 C 14,0 0,6 2,24 C 4,34 20,38 30,22 Z" fill={mainColor} />
            <path d="M 30,22 C 18,28 4,38 12,44 C 22,48 26,34 30,22 Z" fill={mainColor} />
          </svg>
        </div>

        {/* Right Wing */}
        <div
          className="absolute left-[50%] w-[50%] h-[92%] origin-left animate-flap-right"
          style={{ transformStyle: 'preserve-3d', animationDuration: `${effectiveFlapDuration}s` }}
        >
          <svg viewBox="0 0 30 44" className="w-full h-full overflow-visible">
            <path d="M 0,22 C 16,0 30,6 28,24 C 26,34 10,38 0,22 Z" fill={mainColor} />
            <path d="M 0,22 C 12,28 26,38 18,44 C 8,48 4,34 0,22 Z" fill={mainColor} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const MagicalButterflies = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden select-none">
      {/* ================= BUTTERFLY 1: Purple Butterfly (Upper Left) — always shown ================= */}
      <motion.div
        animate={{
          x: ['0vw', '16vw', '2vw', '22vw', '8vw', '0vw'],
          y: ['12vh', '32vh', '52vh', '28vh', '42vh', '12vh'],
          rotate: [12, -15, 20, -10, 15, 12],
        }}
        transition={{ duration: isMobile ? 26 : 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-7 h-7 z-25 transform-gpu"
        style={{ left: 0, top: 0, willChange: 'transform' }}
      >
        <MonochromeButterfly colorTheme="purple" size={28} flapDuration={0.27} flapDelay={0.04} theme={theme} isMobile={isMobile} />
      </motion.div>

      {/* ================= BUTTERFLY 2: Pink Butterfly (Mid Left) — always shown ================= */}
      <motion.div
        animate={{
          x: ['18vw', '1vw', '25vw', '5vw', '20vw', '18vw'],
          y: ['20vh', '40vh', '64vh', '78vh', '36vh', '20vh'],
          rotate: [-18, 12, -22, 15, -8, -18],
        }}
        transition={{ duration: isMobile ? 24 : 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute w-7 h-7 z-25 transform-gpu"
        style={{ left: 0, top: 0, willChange: 'transform' }}
      >
        <MonochromeButterfly colorTheme="pink" size={28} flapDuration={0.22} flapDelay={0.08} theme={theme} isMobile={isMobile} />
      </motion.div>

      {/* ================= BUTTERFLY 3 & 4: Desktop only ================= */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              x: ['-0.5vw', '12vw', '1vw', '20vw', '6vw', '-0.5vw'],
              y: ['42vh', '65vh', '82vh', '54vh', '34vh', '42vh'],
              rotate: [-10, 18, -12, 16, -22, -10],
            }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-6 h-6 z-25 transform-gpu"
            style={{ left: 0, top: 0, willChange: 'transform' }}
          >
            <MonochromeButterfly colorTheme="purple" size={26} flapDuration={0.33} flapDelay={0.16} theme={theme} isMobile={false} />
          </motion.div>

          <motion.div
            animate={{
              x: ['75vw', '92vw', '78vw', '95vw', '84vw', '75vw'],
              y: ['15vh', '32vh', '54vh', '26vh', '42vh', '15vh'],
              rotate: [10, -14, 18, -12, 14, 10],
            }}
            transition={{ duration: 18.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute w-7 h-7 z-25 transform-gpu"
            style={{ left: 0, top: 0, willChange: 'transform' }}
          >
            <MonochromeButterfly colorTheme="pink" size={28} flapDuration={0.25} flapDelay={0.12} theme={theme} isMobile={false} />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MagicalButterflies;
