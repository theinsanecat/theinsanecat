import { motion } from 'framer-motion';

export const ForegroundTrees = ({ style, theme }) => {
  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      style={style}
    >
      <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Foreground meadow morphing gradient (Nearest grass layer - Darker green in Light Mode) */}
          <linearGradient id="foregroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
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

          {/* Large, highly detailed foreground pine tree */}
          <g id="giantPine">
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
            {/* Thick trunk */}
            <rect x="-10" y="220" width="20" height="80" opacity="0.8" />
          </g>

          {/* Standard foreground pine tree */}
          <g id="forePine">
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
            <rect x="-8" y="120" width="16" height="40" opacity="0.8" />
          </g>

          {/* Detailed grass tuft */}
          <g id="grass">
            <path d="M 0,0 Q -10,-20 -25,-25 Q -10,-10 0,0 Z" />
            <path d="M 0,0 Q -5,-25 -12,-35 Q -2,-15 0,0 Z" />
            <path d="M 0,0 Q 5,-30 10,-40 Q 5,-15 0,0 Z" />
            <path d="M 0,0 Q 12,-22 22,-28 Q 8,-10 0,0 Z" />
          </g>

          {/* Flat-laying 4-Petal Soft White Clover Flower */}
          <g id="flower">
            <circle cx="-3.2" cy="0" r="2.6" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="3.2" cy="0" r="2.6" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="0" cy="-3.2" r="2.6" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="0" cy="3.2" r="2.6" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="0" cy="0" r="1.6" fill="#ffe28a" />
          </g>

          {/* Tiny White Meadow Dot Specks */}
          <circle id="flowerDot" cx="0" cy="0" r="2.2" fill="#ffffff" fillOpacity="0.8" />
        </defs>

        {/* Foreground Group - Solid near-black silhouette or soft meadow green */}
        <g fill="url(#foregroundGrad)">
          {/* Far Left framing trees (very large to frame the viewport) */}
          <use href="#giantPine" x="120" y="800" transform="scale(1.5)" />
          <use href="#forePine" x="280" y="850" transform="scale(1.2)" />

          {/* Far Right framing trees */}
          <use href="#giantPine" x="1800" y="800" transform="scale(1.6)" />
          <use href="#forePine" x="1620" y="830" transform="scale(1.3)" />

          {/* Center-left/center-right smaller foreground trees to maintain balance */}
          <use href="#forePine" x="480" y="900" transform="scale(0.9)" />
          <use href="#forePine" x="1440" y="890" transform="scale(0.95)" />

          {/* Foreground Wavy Ground Profile (extending beyond screen bounds -400 to 2320, deep bottom Y=1600 for mobile/tablet overscan) */}
          <path d="M -400,940 Q 0,900 400,860 Q 960,950 1920,920 L 2320,940 L 2320,1600 L -400,1600 Z" />

          {/* Grass details positioned safely on the ground slope */}
          <use href="#grass" x="150" y="955" transform="scale(1.1)" />
          <use href="#grass" x="320" y="948" transform="scale(0.9)" />
          <use href="#grass" x="650" y="960" transform="scale(0.85)" />
          <use href="#grass" x="880" y="965" transform="scale(1.0)" />
          <use href="#grass" x="1050" y="965" transform="scale(0.95)" />
          <use href="#grass" x="1280" y="955" transform="scale(0.85)" />
          <use href="#grass" x="1520" y="950" transform="scale(1.0)" />
          <use href="#grass" x="1750" y="945" transform="scale(1.2)" />
        </g>
      </svg>
    </motion.div>
  );
};
