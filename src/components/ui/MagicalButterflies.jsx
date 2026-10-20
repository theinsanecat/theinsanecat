import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceMode } from '../../context/PerformanceContext';

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

  // Glow lives on each wing's own SVG (inside the flapping, GPU-composited wing layer), so it is rasterized
  // once and then just moves with the wing. On the wrapper it had to be re-computed on every flap frame.
  // On mobile: skip drop-shadow filter entirely
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
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <div
          className="absolute right-[50%] w-[50%] h-[92%] origin-right animate-flap-left"
          style={{ transformStyle: 'preserve-3d', animationDuration: `${effectiveFlapDuration}s` }}
        >
          <svg viewBox="0 0 30 44" className="w-full h-full overflow-visible" style={{ filter: filterStyle }}>
            <path d="M 30,22 C 14,0 0,6 2,24 C 4,34 20,38 30,22 Z" fill={mainColor} />
            <path d="M 30,22 C 18,28 4,38 12,44 C 22,48 26,34 30,22 Z" fill={mainColor} />
          </svg>
        </div>

        {/* Right Wing */}
        <div
          className="absolute left-[50%] w-[50%] h-[92%] origin-left animate-flap-right"
          style={{ transformStyle: 'preserve-3d', animationDuration: `${effectiveFlapDuration}s` }}
        >
          <svg viewBox="0 0 30 44" className="w-full h-full overflow-visible" style={{ filter: filterStyle }}>
            <path d="M 0,22 C 16,0 30,6 28,24 C 26,34 10,38 0,22 Z" fill={mainColor} />
            <path d="M 0,22 C 12,28 26,38 18,44 C 8,48 4,34 0,22 Z" fill={mainColor} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const MagicalButterflies = ({ theme }) => {
  const { isLite } = usePerformanceMode();

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <motion.div
      animate={{ opacity: isLite ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden select-none ${isLite ? 'hidden' : 'block'}`}
    >
      {/* ================= BUTTERFLY 1: Purple Butterfly (Upper Left) — always shown ================= */}
      <div
        className="absolute w-7 h-7 z-25 transform-gpu butterfly-flight"
        style={{ left: 0, top: 0, animationName: 'butterflyFlight1', animationDuration: `${isMobile ? 26 : 18}s`, animationDelay: '0s' }}
      >
        <MonochromeButterfly colorTheme="purple" size={28} flapDuration={0.27} flapDelay={0.04} theme={theme} isMobile={isMobile} />
      </div>

      {/* ================= BUTTERFLY 2: Pink Butterfly (Mid Left) — always shown ================= */}
      <div
        className="absolute w-7 h-7 z-25 transform-gpu butterfly-flight"
        style={{ left: 0, top: 0, animationName: 'butterflyFlight2', animationDuration: `${isMobile ? 24 : 17}s`, animationDelay: '1.5s' }}
      >
        <MonochromeButterfly colorTheme="pink" size={28} flapDuration={0.22} flapDelay={0.08} theme={theme} isMobile={isMobile} />
      </div>

      {/* ================= BUTTERFLY 3 & 4: Desktop only ================= */}
      {!isMobile && (
        <>
          <div
            className="absolute w-6 h-6 z-25 transform-gpu butterfly-flight"
            style={{ left: 0, top: 0, animationName: 'butterflyFlight3', animationDuration: '19s', animationDelay: '0s' }}
          >
            <MonochromeButterfly colorTheme="purple" size={26} flapDuration={0.33} flapDelay={0.16} theme={theme} isMobile={false} />
          </div>

          <div
            className="absolute w-7 h-7 z-25 transform-gpu butterfly-flight"
            style={{ left: 0, top: 0, animationName: 'butterflyFlight4', animationDuration: '18.5s', animationDelay: '0.8s' }}
          >
            <MonochromeButterfly colorTheme="pink" size={28} flapDuration={0.25} flapDelay={0.12} theme={theme} isMobile={false} />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MagicalButterflies;
