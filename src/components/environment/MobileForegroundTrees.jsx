import { motion } from 'framer-motion';

export const MobileForegroundTrees = ({ style, theme }) => {
  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      style={style}
    >
      <svg viewBox="0 0 600 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="foregroundGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{ stopColor: isLight ? "#457a55" : "#110520" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.stop
              offset="100%"
              animate={{ stopColor: isLight ? "#335e40" : "#05010a" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </linearGradient>

          <g id="giantPineMobile">
            <path
              d="M 0,-240 
                 L 22,-180 L 10,-180 
                 L 38,-120 L 18,-120 
                 L 55,-50 L 28,-50 
                 L 72,30 L 40,30 
                 L 90,120 L 52,120 
                 L 110,220 L -110,220 
                 L -52,120 L -90,120 
                 L -40,30 L -72,30 
                 L -28,50 L -55,-50 
                 L -18,-120 L -38,-120 
                 L -10,-180 L -22,-180 Z"
            />
          </g>

          <g id="forePineMobile">
            <path
              d="M 0,-180 
                 L 18,-135 L 8,-135 
                 L 30,-90 L 14,-90 
                 L 44,-30 L 22,-30 
                 L 58,40 L 32,40 
                 L 72,120 L -72,120 
                 L -32,40 L -58,40 
                 L -22,-30 L -44,-30 
                 L -14,-90 L -30,-90 
                 L -8,-135 L -18,-135 Z"
            />
          </g>

          <g id="grassMobile">
            <path d="M 0,0 Q -10,-20 -25,-25 Q -10,-10 0,0 Z" />
            <path d="M 0,0 Q -5,-25 -12,-35 Q -2,-15 0,0 Z" />
            <path d="M 0,0 Q 5,-30 10,-40 Q 5,-15 0,0 Z" />
            <path d="M 0,0 Q 12,-22 22,-28 Q 8,-10 0,0 Z" />
          </g>
        </defs>

        <g fill="url(#foregroundGradMobile)">
          {/* Far-left tree removed completely as requested in reference screenshots */}

          {/* Right framing trees */}
          <use href="#giantPineMobile" x="620" y="800" transform="scale(1.5)" />
          <use href="#forePineMobile" x="520" y="830" transform="scale(1.2)" />

          {/* Center-Right tree under Frontend */}
          <use href="#forePineMobile" x="380" y="865" transform="scale(0.90)" />

          {/* Deep extended ground path (-600 to 1200 in X, Y=3000) for zero edge peek */}
          <path d="M -600,920 Q 0,870 300,850 Q 600,870 1200,920 L 1200,3000 L -600,3000 Z" />

          {/* Grass details - in open meadow, clear of trees */}
          <use href="#grassMobile" x="180" y="900" transform="scale(0.85)" />
          <use href="#grassMobile" x="250" y="890" transform="scale(0.85)" />
          <use href="#grassMobile" x="460" y="890" transform="scale(0.85)" />
        </g>
      </svg>
    </motion.div>
  );
};
