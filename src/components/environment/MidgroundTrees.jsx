import { motion } from 'framer-motion';

export const MidgroundTrees = ({ style, theme }) => {
  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={style}
    >
      <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Midground hill morphing gradient (Farthest hill layer - Lighter green in Light Mode) */}
          <linearGradient id="midgroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{ stopColor: isLight ? "#8ebf9b" : "#2c0e3e" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.stop
              offset="100%"
              animate={{ stopColor: isLight ? "#74a380" : "#14061e" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </linearGradient>

          {/* Pine Tree Type A (Tall and Jagged) */}
          <g id="pineA">
            <path
              d="M 0,-160 
                 L 15,-120 L 7,-120 
                 L 28,-75 L 12,-75 
                 L 40,-25 L 20,-25 
                 L 52,35 L 30,35 
                 L 65,100 L -65,100 
                 L -30,35 L -52,35 
                 L -20,-25 L -40,-25 
                 L -12,-75 L -28,-75 
                 L -7,-120 L -15,-120 Z"
            />
            {/* Small trunk */}
            <rect x="-6" y="100" width="12" height="30" opacity="0.8" />
          </g>

          {/* Pine Tree Type B (Medium and Full) */}
          <g id="pineB">
            <path
              d="M 0,-120 
                 L 18,-90 L 8,-90 
                 L 32,-50 L 15,-50 
                 L 45,-2 L 22,-2 
                 L 58,55 L -58,55 
                 L -22,-2 L -45,-2 
                 L -15,-50 L -32,-50 
                 L -8,-90 L -18,-90 Z"
            />
            <rect x="-5" y="55" width="10" height="20" opacity="0.8" />
          </g>
        </defs>

        {/* Midground Group with rich twilight or soft pastel day tone */}
        <g fill="url(#midgroundGrad)" opacity="0.95">


          {/* Front layer of midground trees (larger, crisper, sitting on the hill) */}
          <use href="#pineA" x="80" y="760" transform="scale(1.2)" />
          <use href="#pineB" x="220" y="780" transform="scale(1.0)" />
          <use href="#pineA" x="380" y="750" transform="scale(1.3)" />
          <use href="#pineB" x="520" y="770" transform="scale(1.15)" />
          <use href="#pineA" x="600" y="760" transform="scale(1.05)" />
          <use href="#pineB" x="750" y="740" transform="scale(1.25)" />

          <use href="#pineA" x="930" y="755" transform="scale(1.35)" />
          <use href="#pineB" x="1080" y="770" transform="scale(1.1)" />
          <use href="#pineA" x="1200" y="760" transform="scale(1.2)" />
          <use href="#pineB" x="1320" y="780" transform="scale(1.0)" />
          <use href="#pineA" x="1480" y="750" transform="scale(1.3)" />
          <use href="#pineB" x="1620" y="770" transform="scale(1.15)" />
          <use href="#pineA" x="1760" y="755" transform="scale(1.25)" />
          <use href="#pineB" x="1880" y="780" transform="scale(1.05)" />

          {/* Front-midground Hill Outline (extending beyond screen bounds -400 to 2320, deep bottom Y=1600 for mobile/tablet overscan) */}
          <path d="M -400,820 Q 0,780 500,740 Q 1020,810 1920,780 L 2320,810 L 2320,1600 L -400,1600 Z" />
        </g>
      </svg>
    </motion.div>
  );
};
