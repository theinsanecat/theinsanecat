import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// SVG Definitions for Gradients, Glows, and Blur Filters
export const LotusDefinitions = ({ theme }) => {
  const isLight = theme === 'light';
  return (
    <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <defs>
        {/* Core Bloom Light Filter */}
        <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Water Reflection Blur */}
        <filter id="waterReflectionBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>

        {/* Water Layer Gradients (Serene Blueish Water in Light Mode, Dark Night Water in Night Mode) */}
        <linearGradient id="backWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <motion.stop offset="0%" animate={{ stopColor: isLight ? "#c7d2fe" : "#120c2e", stopOpacity: isLight ? 0.95 : 0.92 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="100%" animate={{ stopColor: isLight ? "#b4c6fc" : "#080417", stopOpacity: isLight ? 0.98 : 0.99 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </linearGradient>

        <linearGradient id="midWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <motion.stop offset="0%" animate={{ stopColor: isLight ? "#dbeafe" : "#1a1042", stopOpacity: isLight ? 0.92 : 0.88 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="100%" animate={{ stopColor: isLight ? "#bfdbfe" : "#0a051d", stopOpacity: isLight ? 0.98 : 0.99 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </linearGradient>

        <linearGradient id="frontWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <motion.stop offset="0%" animate={{ stopColor: isLight ? "#e0e7ff" : "#25145c", stopOpacity: isLight ? 0.90 : 0.85 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="100%" animate={{ stopColor: isLight ? "#c7d2fe" : "#0b0524", stopOpacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </linearGradient>

        {/* Lotus Petal Gradients (Soft Glowing Baby Pink in Light Mode) */}
        <linearGradient id="lotusPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <motion.stop offset="0%" animate={{ stopColor: isLight ? "#f472b6" : "#be185d" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="45%" animate={{ stopColor: isLight ? "#fb7185" : "#f43f5e" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="85%" animate={{ stopColor: isLight ? "#fbcfe8" : "#f472b6" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="100%" animate={{ stopColor: isLight ? "#fce7f3" : "#fbcfe8" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </linearGradient>

        <linearGradient id="lotusInnerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <motion.stop offset="0%" animate={{ stopColor: isLight ? "#fb7185" : "#e11d48" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="50%" animate={{ stopColor: isLight ? "#fbcfe8" : "#fb7185" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="85%" animate={{ stopColor: isLight ? "#fce7f3" : "#fce7f3" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="100%" animate={{ stopColor: "#ffffff" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </linearGradient>

        <linearGradient id="budPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <motion.stop offset="0%" animate={{ stopColor: isLight ? "#f472b6" : "#9f1239" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="60%" animate={{ stopColor: isLight ? "#fb7185" : "#e11d48" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          <motion.stop offset="100%" animate={{ stopColor: isLight ? "#fbcfe8" : "#f472b6" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
        </linearGradient>

        {/* Radiant Glowing Baby Pink Water Reflection Gradient */}
        <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#f472b6" : "#ff4da6"} stopOpacity={isLight ? 0.75 : 0.85} />
          <stop offset="50%" stopColor={isLight ? "#fb7185" : "#e11d48"} stopOpacity={isLight ? 0.5 : 0.65} />
          <stop offset="100%" stopColor={isLight ? "#fbcfe8" : "#9f1239"} stopOpacity={0.1} />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Vector Lotus Flower Component supporting 3 growth stages: "blooming", "budding", and "bud"
// Pure lotus artwork in local coordinates (origin = waterline centre). Shared by the desktop
// layered lake and the mobile single-SVG lake.
const LotusGraphic = ({ stage, theme }) => {
  const isLight = theme === 'light';
  const strokeColor1 = isLight ? "#f472b6" : "#9f1239";
  const strokeColor2 = isLight ? "#f472b6" : "#be185d";
  const strokeColor3 = isLight ? "#fb7185" : "#e11d48";
  const strokeOpacityVal = isLight ? 0.25 : 0.8;

  return (
    <>

        {/* ================= 1. VIBRANT UPSIDE-DOWN WATER REFLECTION ================= */}
        <g opacity={isLight ? "0.65" : "0.85"} filter="url(#waterReflectionBlur)">
          <g transform="scale(1, -0.75) translate(0, -4)">
            {stage === "bud" ? (
              /* Bud Reflection */
              <path d="M 0,0 C -16,-10 -20,-36 0,-50 C 20,-36 16,-10 0,0 Z" fill="url(#reflectionGrad)" />
            ) : stage === "budding" ? (
              /* Budding Reflection */
              <g>
                <path d="M 0,0 C -26,-6 -40,-26 -28,-38 C -12,-26 0,-4 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C 26,-6 40,-26 28,-38 C 12,-26 0,-4 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C -18,-12 -30,-38 -20,-48 C -6,-34 0,-6 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C 18,-12 30,-38 20,-48 C 6,-34 0,-6 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C -10,-16 -15,-46 0,-56 C 15,-46 10,-16 0,0 Z" fill="#ff77bc" opacity="0.7" />
              </g>
            ) : (
              /* Full Blooming Reflection */
              <g>
                <path d="M 0,0 C -35,5 -65,2 -80,-8 C -55,-16 -25,-8 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C 35,5 65,2 80,-8 C 55,-16 25,-8 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C -30,8 -58,-5 -72,-16 C -50,-20 -20,-10 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C 30,8 58,-5 72,-16 C 50,-20 20,-10 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C -25,-10 -50,-28 -62,-38 C -42,-35 -15,-18 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C 25,-10 50,-28 62,-38 C 42,-35 15,-18 0,0 Z" fill="url(#reflectionGrad)" />
                <path d="M 0,0 C -15,-20 -26,-48 -32,-60 C -16,-50 -6,-25 0,0 Z" fill="#ff77bc" opacity="0.75" />
                <path d="M 0,0 C 15,-20 26,-48 32,-60 C 16,-50 6,-25 0,0 Z" fill="#ff77bc" opacity="0.75" />
              </g>
            )}
          </g>

          {/* Shimmering Horizontal Water Ripples crossing the reflection */}
          <line x1="-35" y1="12" x2="35" y2="12" stroke="#ff77bc" strokeWidth="1.2" opacity="0.7" />
          <line x1="-24" y1="22" x2="24" y2="22" stroke="#f472b6" strokeWidth="1.2" opacity="0.6" />
          <line x1="-15" y1="30" x2="15" y2="30" stroke="#f43f5e" strokeWidth="1.2" opacity="0.5" />
        </g>

        {/* Waterline Base Glow Ring */}
        <ellipse
          cx="0"
          cy="2"
          rx={stage === "bud" ? 18 : stage === "budding" ? 28 : 40}
          ry="5"
          fill="none"
          stroke="#f472b6"
          strokeWidth="1"
          strokeOpacity="0.6"
          filter="drop-shadow(0 0 5px #f43f5e)"
        />

        {/* ================= 2. REAL LOTUS VECTOR BLOSSOM ================= */}
        <g filter={isLight ? "drop-shadow(0 0 8px rgba(244,114,182,0.4))" : "drop-shadow(0 0 10px rgba(244,63,94,0.35))"}>
          {stage === "bud" ? (
            /* ================= STAGE A: CLOSED LOTUS BUD ================= */
            <g>
              <path
                d="M 0,0 C -16,-10 -20,-36 0,-50 C 20,-36 16,-10 0,0 Z"
                fill="url(#budPetalGrad)"
                stroke={isLight ? "#f472b6" : "#881337"}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C -10,-12 -12,-34 0,-45 C 12,-34 10,-12 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.7"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C -4,-12 -6,-30 0,-40 C 6,-30 4,-12 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
              />
            </g>
          ) : stage === "budding" ? (
            /* ================= STAGE B: PARTIALLY OPENING BUDDING LOTUS ================= */
            <g>
              {/* Outer Unfolding Petals */}
              <path
                d="M 0,0 C -26,-6 -40,-26 -28,-38 C -12,-26 0,-4 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 26,-6 40,-26 28,-38 C 12,-26 0,-4 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C -18,-12 -30,-38 -20,-48 C -6,-34 0,-6 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor2}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 18,-12 30,-38 20,-48 C 6,-34 0,-6 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor2}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              {/* Inner Cup & Emerging Core */}
              <path
                d="M 0,0 C -10,-16 -15,-46 0,-56 C 15,-46 10,-16 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
                stroke={strokeColor3}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <circle cx="0" cy="-24" r="5.5" fill="#fef08a" opacity="0.9" filter="url(#coreGlow)" />
            </g>
          ) : (
            /* ================= STAGE C: FULL BLOOMING LOTUS ================= */
            <g>
              {/* TIER 1: Outer Horizontal Spreading Petals */}
              <path
                d="M 0,0 C -35,5 -65,2 -80,-8 C -55,-16 -25,-8 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 35,5 65,2 80,-8 C 55,-16 25,-8 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C -30,8 -58,-5 -72,-16 C -50,-20 -20,-10 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 30,8 58,-5 72,-16 C 50,-20 20,-10 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor1}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />

              {/* TIER 2: Mid-Tier Angled Petals (45 degrees outward) */}
              <path
                d="M 0,0 C -25,-10 -50,-28 -62,-38 C -42,-35 -15,-18 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor2}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 25,-10 50,-28 62,-38 C 42,-35 15,-18 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor2}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C -20,-15 -38,-38 -48,-50 C -30,-42 -10,-22 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor2}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 20,-15 38,-38 48,-50 C 30,-42 10,-22 0,0 Z"
                fill="url(#lotusPetalGrad)"
                stroke={strokeColor2}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />

              {/* TIER 3: Upper Inner Standing Petals */}
              <path
                d="M 0,0 C -15,-20 -26,-48 -32,-60 C -16,-50 -6,-25 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
                stroke={strokeColor3}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 15,-20 26,-48 32,-60 C 16,-50 6,-25 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
                stroke={strokeColor3}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C -8,-25 -12,-55 0,-68 C 12,-55 8,-25 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
                stroke={strokeColor3}
                strokeWidth="0.8"
                strokeOpacity={strokeOpacityVal}
              />

              {/* TIER 4: Innermost Glowing Cup & Core Light */}
              <path
                d="M 0,0 C -8,-18 -12,-42 -14,-52 C -4,-42 0,-20 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
                stroke={isLight ? "#f472b6" : "#f43f5e"}
                strokeWidth="0.7"
                strokeOpacity={strokeOpacityVal}
              />
              <path
                d="M 0,0 C 8,-18 12,-42 14,-52 C 4,-42 0,-20 0,0 Z"
                fill="url(#lotusInnerPetalGrad)"
                stroke={isLight ? "#f472b6" : "#f43f5e"}
                strokeWidth="0.7"
                strokeOpacity={strokeOpacityVal}
              />

              {/* Glowing Golden Core */}
              <circle cx="0" cy="-30" r="9" fill="#fef08a" opacity="0.9" filter="url(#coreGlow)" />
              <circle cx="0" cy="-30" r="5" fill="#ffffff" />
            </g>
          )}
        </g>
    </>
  );
};

// Legacy single-SVG lotus (used by MobileLotusWaterBody) — unchanged behaviour.
export const LotusElement = ({ x, y, scale = 1, stage = "blooming", swayDuration = 6, swayDelay = 0, theme }) => (
  <motion.g
    animate={{
      y: [y - 2, y + 3, y - 2],
      rotate: [-1.2, 1.5, -1.2],
      x: [x - 2, x + 2, x - 2],
    }}
    transition={{
      duration: swayDuration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: swayDelay,
    }}
    className="origin-bottom"
  >
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <LotusGraphic stage={stage} theme={theme} />
    </g>
  </motion.g>
);

// ─── Desktop lake data (identical to the former inline <LotusElement> props) ───
const WAVES = [
  { cls: 'lake-wave-1', d: 'M -400,35 Q 360,20 720,35 T 1840,35 L 1840,600 L -400,600 Z', fill: 'url(#backWaterGrad)' },
  { cls: 'lake-wave-2', d: 'M -400,65 Q 360,85 720,60 T 1840,70 L 1840,600 L -400,600 Z', fill: 'url(#midWaterGrad)' },
  { cls: 'lake-wave-3', d: 'M -400,95 Q 360,75 720,100 T 1840,90 L 1840,600 L -400,600 Z', fill: 'url(#frontWaterGrad)' },
];
const BACK_LOTUSES = [
  { x: 100, y: 40, scale: 0.48, stage: 'blooming', dur: 6.5, delay: 0.2 },
  { x: 360, y: 38, scale: 0.40, stage: 'bud', dur: 7.2, delay: 1.5 },
  { x: 680, y: 42, scale: 0.45, stage: 'budding', dur: 6.8, delay: 0.8 },
  { x: 1020, y: 36, scale: 0.40, stage: 'bud', dur: 7.5, delay: 2.1 },
  { x: 1340, y: 41, scale: 0.46, stage: 'blooming', dur: 6.2, delay: 1.0 },
];
const FRONT_LOTUSES = [ // desktop only
  { x: 240, y: 70, scale: 0.62, stage: 'budding', dur: 6.0, delay: 0.6 },
  { x: 560, y: 67, scale: 0.68, stage: 'blooming', dur: 5.5, delay: 1.2 },
  { x: 880, y: 71, scale: 0.60, stage: 'budding', dur: 6.4, delay: 1.8 },
  { x: 1180, y: 69, scale: 0.62, stage: 'bud', dur: 5.8, delay: 0.3 },
  { x: 160, y: 98, scale: 0.82, stage: 'blooming', dur: 5.2, delay: 0.1 },
  { x: 460, y: 102, scale: 0.76, stage: 'budding', dur: 5.6, delay: 1.3 },
  { x: 760, y: 100, scale: 0.88, stage: 'blooming', dur: 4.9, delay: 0.5 },
  { x: 1080, y: 99, scale: 0.80, stage: 'blooming', dur: 5.4, delay: 1.7 },
  { x: 1360, y: 103, scale: 0.74, stage: 'budding', dur: 5.0, delay: 0.9 },
];

// Rotation pivot ≈ centre of the lotus artwork's bounding box (Framer's default for SVG), in local units
const PIVOT_Y = -7;

/*
 * Rendering strategy (performance):
 * Previously the whole lake was ONE SVG whose lotus <g>s were swayed by Framer Motion and whose wave <path>s
 * had CSS animations. Transforms on elements *inside* an SVG can't be GPU-composited, so every frame the entire
 * strip (14 lotuses x blur/drop-shadow/glow filters) was repainted on the CPU.
 * Now every wave and every lotus is its own small SVG in its own compositor layer, animated with CSS transforms:
 * each is drawn once, then only moved by the GPU. Positions reproduce the old on-screen placement exactly,
 * including the old Framer behaviour where the sway's x/y keyframes (x±2, y-2..y+3) were applied ON TOP of the
 * inner translate(x, y) — i.e. lotuses sit at (2x, 2y) in lake units. Lotuses that fall completely outside the
 * lake on the current screen are simply not rendered (they were invisible anyway).
 */
const useLakeGeometry = (ref) => {
  const [geo, setGeo] = useState(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const s = Math.max(W / 1440, H / 180); // preserveAspectRatio="xMidYMax slice"
      setGeo({ W, H, s, ox: (W - 1440 * s) / 2, oy: H - 180 * s });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return geo;
};

const LotusLayer = ({ lotus, geo, theme }) => {
  const { s, ox, oy, W, H } = geo;
  const k = lotus.scale * s; // local lotus unit -> CSS px
  const X = ox + 2 * lotus.x * s;
  const Y = oy + 2 * lotus.y * s;
  // cull lotuses that are entirely off-screen (incl. glow + sway margin)
  if (X + 100 * k < 0 || X - 100 * k > W || Y - 90 * k > H) return null;
  return (
    <div
      className="absolute lotus-sway"
      style={{
        left: X,
        top: Y,
        width: 0,
        height: 0,
        '--s': s,
        transformOrigin: `0px ${PIVOT_Y * k}px`,
        animationDuration: `${lotus.dur}s`,
        animationDelay: `${lotus.delay}s`,
      }}
    >
      <svg
        viewBox="-110 -100 220 180"
        overflow="visible"
        style={{ position: 'absolute', left: -110 * k, top: -100 * k, width: 220 * k, height: 180 * k, overflow: 'visible' }}
      >
        <LotusGraphic stage={lotus.stage} theme={theme} />
      </svg>
    </div>
  );
};

export const LotusWaterBody = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const lakeRef = useRef(null);
  const geo = useLakeGeometry(lakeRef);
  const lotuses = isMobile ? BACK_LOTUSES : [...BACK_LOTUSES, ...FRONT_LOTUSES];

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
      className="fixed bottom-0 left-0 right-0 w-full h-[65px] xs:h-[85px] sm:h-[130px] md:h-[165px] pointer-events-none z-40 overflow-hidden select-none transform-gpu"
    >
      {/* SVG Definitions (gradients + filters referenced by every wave/lotus SVG) */}
      <LotusDefinitions theme={theme} />

      <div ref={lakeRef} className="absolute inset-0" style={{ '--s': geo ? geo.s : 1 }}>
        {/* 1. Water waves — each its own layer, drawn once and slid by the compositor */}
        {WAVES.map((w) => (
          <svg
            key={w.cls}
            className={`absolute inset-0 w-full h-full ${w.cls}`}
            viewBox="0 0 1440 180"
            preserveAspectRatio="xMidYMax slice"
            overflow="visible"
            style={{ overflow: 'visible' }}
          >
            <path d={w.d} fill={w.fill} />
          </svg>
        ))}

        {/* 2. Lotuses — back row first, then front rows (same paint order as before) */}
        {geo && lotuses.map((l) => <LotusLayer key={`${l.x}-${l.y}`} lotus={l} geo={geo} theme={theme} />)}
      </div>
    </motion.div>
  );
};

export default LotusWaterBody;
