import { motion } from 'framer-motion';

export const MountainLayer = ({ style, theme }) => {
  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-5 pointer-events-none"
      style={style}
    >
      <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Back mountains morphing gradient */}
          <linearGradient id="backMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#e4d5f2" : "#1a0b35"} stopOpacity={isLight ? 0.95 : 0.85} />
            <stop offset="100%" stopColor={isLight ? "#d9c8eb" : "#0b0314"} stopOpacity={isLight ? 0.9 : 0.1} />
          </linearGradient>

          {/* Front mountains morphing gradient */}
          <linearGradient id="frontMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#d5c4e8" : "#130726"} />
            <stop offset="100%" stopColor={isLight ? "#c5b0df" : "#080210"} />
          </linearGradient>

          {/* Intermediate Ridge Mist */}
          <linearGradient id="ridgeMist" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#eee5f6" : "#250937"} stopOpacity={0.0} />
            <stop offset="100%" stopColor={isLight ? "#eee5f6" : "#250937"} stopOpacity={isLight ? 0.6 : 0.4} />
          </linearGradient>
        </defs>

        {/* 1. Back Taller Mountains (Majestic pointed peaks at X=250 Y=530, X=980 Y=490, X=1650 Y=580) */}
        <path
          d="M -400,750 
             L -200,680
             L 250,530 
             L 600,710 
             L 980,490 
             L 1380,690 
             L 1650,580 
             L 1980,680 
             L 2320,580
             L 2320,1600 L -400,1600 Z"
          fill="url(#backMountainGrad)"
        />

        {/* Intermediate Ridge Mist */}
        <rect x="-400" y="500" width="2720" height="1100" fill="url(#ridgeMist)" />

        {/* 2. Front Shorter Mountains (Darker layer - raised peak at X=750 Y=575 for crisp definition) */}
        <path
          d="M -400,800 
             L -150,720
             L 180,630 
             L 480,750 
             L 750,575 
             L 1080,710
             L 1420,600 
             L 1680,720 
             L 1980,640 
             L 2320,710
             L 2320,1600 L -400,1600 Z"
          fill="url(#frontMountainGrad)"
        />
      </svg>
    </motion.div>
  );
};
