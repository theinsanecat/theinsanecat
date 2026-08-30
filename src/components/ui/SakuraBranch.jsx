import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Falling Sakura Petal Component originating from Right branch
const SakuraPetal = ({ id, delay, theme }) => {
  const isLight = theme === 'light';
  const [randomConfig, setRandomConfig] = useState(null);

  useEffect(() => {
    // Generate organic wind path from top-right branch
    const xStart = Math.random() * 200 - 150; // offset from top-right corner
    const xDrift = 150 + Math.random() * 220;
    const xEnd = xStart - xDrift;
    const yEnd = 450 + Math.random() * 350; // fall distance
    const duration = 7 + Math.random() * 6; // wind speed
    const scale = 0.45 + Math.random() * 0.55;
    const swayRange = 25 + Math.random() * 40;

    setRandomConfig({
      xStart,
      xEnd,
      yEnd,
      duration,
      scale,
      swayRange,
    });
  }, []);

  if (!randomConfig) return null;

  const { xStart, xEnd, yEnd, duration, scale, swayRange } = randomConfig;

  return (
    <motion.div
      initial={{ x: xStart, y: -20, opacity: 0, rotate: 0 }}
      animate={{
        x: [
          xStart,
          xStart - swayRange,
          xStart - swayRange / 2,
          xEnd
        ],
        y: [0, yEnd * 0.4, yEnd * 0.7, yEnd],
        opacity: [0, 1.0, 1.0, 0],
        rotate: [0, 120, 240, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      className="absolute top-0 right-10 pointer-events-none z-5 select-none"
      style={{
        width: `${16 * scale}px`,
        height: `${24 * scale}px`,
      }}
    >
      <svg viewBox="0 0 24 24" className={`w-full h-full ${isLight ? 'text-pink-400 drop-shadow(0 0 6px rgba(244,114,182,0.6))' : 'text-pink-300 drop-shadow(0 0 5px rgba(244,63,94,0.45))'}`} fill="currentColor">
        <path d="M12,2C11,5 6,10 6,14C6,18 9,21 12,21C15,21 18,18 18,14C18,10 13,5 12,2Z" />
      </svg>
    </motion.div>
  );
};

export const SakuraBranch = ({ theme }) => {
  const isLight = theme === 'light';
  // Generate falling petals from right branch
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 1.2
  }));

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          rotate: [-2, -5.5, -2],
          y: [0, 6, 0],
          x: [0, -4, 0]
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute top-0 right-0 w-[240px] md:w-[390px] origin-top-right opacity-100"
        style={{
          transform: 'rotate(-5deg) translate(8%, -8%)',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}sakura-branch.svg`}
          alt="Right Sakura Branch"
          className={`w-full h-auto opacity-100 transition-all duration-500 ${isLight
              ? 'filter brightness-[1.1] contrast-[1.05] saturate-[1.25] drop-shadow(0 0 20px rgba(244,114,182,0.4))'
              : 'filter brightness-[0.88] contrast-[1.5] saturate-[1.15] drop-shadow(0 0 25px rgba(244,63,94,0.5)) drop-shadow(0 0 10px rgba(15,23,42,0.8))'
            }`}
        />
      </motion.div>

      {/* Ambient Falling Sakura Petals */}
      {petals.map((p) => (
        <SakuraPetal key={p.id} id={p.id} delay={p.delay} theme={theme} />
      ))}
    </div>
  );
};

export default SakuraBranch;

