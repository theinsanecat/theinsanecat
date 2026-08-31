import { memo } from 'react';
import { motion } from 'framer-motion';

// ================= UNIFIED HOVER-BOBBING UFO SPACESHIP CAT ILLUSTRATION =================
export const UFOCatSpaceship = ({ isHovered, isActive, className = '', style = {} }) => {
  const activeOrHovered = isActive || isHovered;

  return (
    <motion.div 
      layoutId="ufo-cat-pilot" 
      className={`absolute z-40 pointer-events-none w-[110px] h-[110px] transform-gpu ${className}`}
      style={{
        top: "-60px",
        willChange: "transform",
        ...style
      }}
      transition={{ 
        type: "spring", 
        stiffness: 45, 
        damping: 18,
        mass: 1.4
      }}
    >
      <div className="relative w-full h-full" style={{ overflow: "visible" }}>
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full pointer-events-none animate-ufo-float"
          style={{ overflow: "visible" }}
        >
          {/* ================= LAYER 1: GAS THRUST ================= */}
          <motion.g 
            id="gas-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeOrHovered ? 1.0 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <path 
              d="M 80,135 Q 55,175 100,205 Q 145,175 120,135 Z" 
              fill="url(#gas-gradient)" 
              filter="url(#gas-glow)"
              className="animate-gas-thrust"
            />
            <path 
              d="M 90,135 Q 75,160 100,185 Q 125,160 110,135 Z" 
              fill="#ffffff" 
              opacity="0.65"
              filter="url(#gas-glow)"
              className="animate-gas-thrust"
            />
          </motion.g>

          {/* ================= LAYER 2: SPACESHIP BASE ================= */}
          <ellipse cx="100" cy="140" rx="36" ry="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="100" cy="146" rx="24" ry="8" fill="url(#node-glow)" stroke="#ca8a04" strokeWidth="1.2" />
          {/* Saucer — NO black border */}
          <path 
            d="M 25,124 C 25,108 55,98 100,98 C 145,98 175,108 175,124 C 175,142 145,150 100,150 C 55,150 25,142 25,124 Z" 
            fill="url(#saucer-body)"
          />
          <circle cx="50" cy="128" r="7.5" fill="url(#node-glow)" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="100" cy="134" r="8.5" fill="url(#node-glow)" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="150" cy="128" r="7.5" fill="url(#node-glow)" stroke="#ca8a04" strokeWidth="1.2" />

          {/* Cockpit rim */}
          <ellipse cx="100" cy="106" rx="46" ry="12" fill="#db2777" stroke="#9d174d" strokeWidth="1.8" />

          {/* Dome glass fill */}
          <path 
            d="M 54,106 C 54,42 146,42 146,106 Z" 
            fill="url(#dome-glass)" 
          />

          {/* Glass dome attachment bottom border */}
          <path d="M 54,106 A 46,12 0 0,1 146,106" fill="none" stroke="#38bdf8" strokeWidth="1.8" opacity="0.75" />

          {/* CAT PILOT */}
          <g id="cat-pilot" transform="translate(100, 106) scale(0.52) translate(-100, -94)">
            {/* LEFT EAR */}
            <path d="M 79,61 L 70,31 L 94,49" fill="#18181b" strokeLinejoin="round" />
            <path d="M 80,58 L 73,37 L 91,48" fill="#f472b6" />
            
            {/* RIGHT EAR */}
            <path d="M 121,61 L 130,31 L 106,49" fill="#18181b" strokeLinejoin="round" />
            <path d="M 120,58 L 127,37 L 109,48" fill="#f472b6" />

            {/* Cat Head */}
            <ellipse cx="100" cy="65" rx="27" ry="23" fill="#18181b" />

            {/* LEFT EYE */}
            <circle cx="87" cy="60" r="2.2" fill="#38bdf8" />

            {/* RIGHT EYE */}
            <circle cx="113" cy="60" r="2.2" fill="#38bdf8" />

            {/* Nose */}
            <ellipse cx="100" cy="68" rx="3" ry="2" fill="#db2777" />

            {/* Body */}
            <path d="M 80,108 C 76,100 78,88 100,88 C 122,88 124,100 120,108 C 116,114 84,114 80,108 Z" fill="#18181b" />
          </g>

          {/* DOME FRONT UPPER ARC */}
          <path 
            d="M 54,106 C 54,42 146,42 146,106" 
            stroke="#38bdf8" 
            strokeWidth="2.8" 
            strokeLinecap="round"
            fill="none"
          />

          {/* Dome bottom border */}
          <path 
            d="M 54,106 A 46,12 0 0,0 146,106" 
            stroke="#38bdf8" 
            strokeWidth="2.8" 
            fill="none" 
          />
        </svg>
      </div>
    </motion.div>
  );
};

// ================= MEMOIZED GLOBAL SVG DEFINITIONS =================
export const GlobalSVGDefs = memo(() => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* ================= SPACESHIP DEFINITIONS ================= */}
        <linearGradient id="saucer-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
        
        <linearGradient id="dome-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
        </linearGradient>

        <linearGradient id="cat-fur" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        <linearGradient id="gas-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#a855f7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
        <filter id="gas-glow">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        {/* ================= SLAB AURA DEFINITIONS ================= */}
        <radialGradient id="aura-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#a855f7" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#4f46e5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#07010e" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="cyan-glow" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>

        <filter id="aura-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>

        <filter id="particle-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <clipPath id="aura-clip">
          <path d="M -100,-100 H 540 V 203 H 400 A 180,38 0 0,0 40,203 H -100 Z" />
        </clipPath>

        {/* ================= SLAB BOTTOM DEFINITIONS ================= */}
        <linearGradient id="bottom-glass-surface" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#581c87" />
          <stop offset="50%" stopColor="#3b0764" />
          <stop offset="100%" stopColor="#2e0854" />
        </linearGradient>

        <linearGradient id="bottom-wall-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="25%" stopColor="#2e0854" />
          <stop offset="50%" stopColor="#6d28d9" />
          <stop offset="75%" stopColor="#2e0854" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>

        <linearGradient id="bottom-cylinder-aura" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e879f9" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#c084fc" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
          <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="magenta-rim-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15" />
          <stop offset="30%" stopColor="#c084fc" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#c084fc" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.15" />
        </linearGradient>
        
        <filter id="shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" />
        </filter>

        <filter id="bottom-cylinder-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>

        <filter id="border-glow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>

        <clipPath id="bottom-slab-clip">
          <path d="M -100,-200 H 540 V 118 H 400 A 180,38 0 0,0 40,118 H -100 Z" />
        </clipPath>

        <clipPath id="top-slab-clip">
          <path d="M -100,-200 H 460 V 96 H 310 A 130,28 0 0,0 50,96 H -100 Z" />
        </clipPath>

        {/* ================= SLAB TOP DEFINITIONS ================= */}
        <linearGradient id="top-glass-surface" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7e22ce" />
          <stop offset="50%" stopColor="#581c87" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>

        <linearGradient id="top-wall-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="25%" stopColor="#4c1d95" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="75%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>

        <linearGradient id="top-cylinder-aura" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#fda4af" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#f472b6" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#ec4899" stopOpacity="0.15" />
          <stop offset="75%" stopColor="#ec4899" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="pink-rim-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
          <stop offset="30%" stopColor="#f472b6" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#d946ef" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#f472b6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.15" />
        </linearGradient>

        <filter id="top-cylinder-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
    </svg>
  );
});
