import { motion } from 'framer-motion';

export const MobileMidgroundTrees = ({ style, theme }) => {
  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={style}
    >
      <svg viewBox="0 0 600 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="midgroundGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
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

          <g id="pineAMobile">
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
          </g>

          <g id="pineBMobile">
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
          </g>
        </defs>

        <g fill="url(#midgroundGradMobile)" opacity="0.95">
          {/* Midground Light Green Trees - Balanced skyline without right-edge weird spikes */}
          <use href="#pineAMobile" x="60" y="750" transform="scale(1.0)" />
          <use href="#pineAMobile" x="220" y="745" transform="scale(1.2)" />
          <use href="#pineBMobile" x="320" y="755" transform="scale(1.0)" />
          <use href="#pineAMobile" x="430" y="740" transform="scale(1.15)" />

          {/* Deep extended midground hill path (-600 to 1200 in X, Y=3000) */}
          <path d="M -600,790 Q 0,740 300,720 Q 600,740 1200,790 L 1200,3000 L -600,3000 Z" />
        </g>
      </svg>
    </motion.div>
  );
};
