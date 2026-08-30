import React from 'react';
import { motion } from 'framer-motion';
import { LotusDefinitions, LotusElement } from './LotusWaterBody';

export const MobileLotusWaterBody = ({ theme }) => {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className="fixed bottom-0 left-0 right-0 w-full h-[145px] sm:h-[165px] pointer-events-none z-40 overflow-hidden select-none transform-gpu"
    >
      {/* SVG Definitions (Shared with desktop for exact visual fidelity) */}
      <LotusDefinitions theme={theme} />

      {/* Main Composite SVG Scene for Mobile */}
      <svg
        className="w-full h-full"
        viewBox="0 0 600 180"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* ================= 1. WATER BACKGROUND WAVES ================= */}
        <g id="water-background-waves-mob">
          {/* Layer 1: Back Wave */}
          <motion.path
            animate={{
              d: [
                "M -400,25 Q 150,10 300,25 T 1000,25 L 1000,600 L -400,600 Z",
                "M -400,15 Q 150,35 300,15 T 1000,20 L 1000,600 L -400,600 Z",
                "M -400,25 Q 150,10 300,25 T 1000,25 L 1000,600 L -400,600 Z",
              ]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#backWaterGrad)"
          />

          {/* Layer 2: Mid Wave */}
          <motion.path
            animate={{
              d: [
                "M -400,55 Q 150,75 300,50 T 1000,60 L 1000,600 L -400,600 Z",
                "M -400,45 Q 150,35 300,65 T 1000,50 L 1000,600 L -400,600 Z",
                "M -400,55 Q 150,75 300,50 T 1000,60 L 1000,600 L -400,600 Z",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#midWaterGrad)"
          />

          {/* Layer 3: Foreground Wave */}
          <motion.path
            animate={{
              d: [
                "M -400,85 Q 150,65 300,90 T 1000,80 L 1000,600 L -400,600 Z",
                "M -400,95 Q 150,105 300,75 T 1000,90 L 1000,600 L -400,600 Z",
                "M -400,85 Q 150,65 300,90 T 1000,80 L 1000,600 L -400,600 Z",
              ]
            }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#frontWaterGrad)"
          />
        </g>

        {/* ================= 2. EXACT VECTOR LOTUSES (Bud, Budding, Blooming) ================= */}
        <g id="lotus-elements-foreground-mob">
          {/* Back Tier Lotuses (y ~ 40) - Bud & Blooming mix */}
          <LotusElement x={50} y={40} scale={0.46} stage="blooming" swayDuration={6.5} swayDelay={0.2} theme={theme} />
          <LotusElement x={160} y={38} scale={0.40} stage="bud" swayDuration={7.2} swayDelay={1.5} theme={theme} />
          <LotusElement x={300} y={42} scale={0.45} stage="budding" swayDuration={6.8} swayDelay={0.8} theme={theme} />
          <LotusElement x={440} y={36} scale={0.40} stage="bud" swayDuration={7.5} swayDelay={2.1} theme={theme} />
          <LotusElement x={550} y={41} scale={0.46} stage="blooming" swayDuration={6.2} swayDelay={1.0} theme={theme} />

          {/* Midground Tier Lotuses (y ~ 70) - Budding & Blooming */}
          <LotusElement x={100} y={70} scale={0.62} stage="budding" swayDuration={6.0} swayDelay={0.6} theme={theme} />
          <LotusElement x={240} y={67} scale={0.68} stage="blooming" swayDuration={5.5} swayDelay={1.2} theme={theme} />
          <LotusElement x={380} y={71} scale={0.60} stage="budding" swayDuration={6.4} swayDelay={1.8} theme={theme} />
          <LotusElement x={500} y={69} scale={0.62} stage="bud" swayDuration={5.8} swayDelay={0.3} theme={theme} />

          {/* Foreground Hero Tier Lotuses (y ~ 98) - Blooming & Budding */}
          <LotusElement x={70} y={98} scale={0.82} stage="blooming" swayDuration={5.2} swayDelay={0.1} theme={theme} />
          <LotusElement x={200} y={102} scale={0.76} stage="budding" swayDuration={5.6} swayDelay={1.3} theme={theme} />
          <LotusElement x={330} y={100} scale={0.88} stage="blooming" swayDuration={4.9} swayDelay={0.5} theme={theme} />
          <LotusElement x={460} y={99} scale={0.80} stage="blooming" swayDuration={5.4} swayDelay={1.7} theme={theme} />
          <LotusElement x={540} y={103} scale={0.74} stage="budding" swayDuration={5.0} swayDelay={0.9} theme={theme} />
        </g>
      </svg>
    </motion.div>
  );
};

export default MobileLotusWaterBody;
