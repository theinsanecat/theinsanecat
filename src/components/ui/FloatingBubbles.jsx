import React from 'react';
import { usePerformanceMode } from '../../context/PerformanceContext';

const Bubble = ({ size, type, style }) => {
  const isSolid = type === 'solid';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className="transform-gpu overflow-visible"
      style={style}
    >
      <defs>
        <filter id={`bubble-glow-${size}-${type}`} x="-40%" y="-40%" width="180%" height="180%">
          {isSolid ? (
            <>
              <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#db2777" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#a855f7" floodOpacity="0.5" />
            </>
          ) : (
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ec4899" floodOpacity="0.45" />
          )}
        </filter>

        <radialGradient id={`bubble-bg-${size}-${type}`} cx="35%" cy="35%" r="65%">
          {isSolid ? (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#f472b6" />
              <stop offset="60%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#701a75" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.08)" />
              <stop offset="85%" stopColor="rgba(168, 85, 247, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
            </>
          )}
        </radialGradient>

        <linearGradient id={`bubble-border-${size}-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="30%" stopColor="rgba(236, 72, 153, 0.5)" />
          <stop offset="70%" stopColor="rgba(168, 85, 247, 0.5)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
        </linearGradient>
      </defs>
      
      {/* Outer border & body with soft embedded SVG glow filter */}
      <circle 
        cx="50" 
        cy="50" 
        r="44" 
        stroke={isSolid ? "none" : `url(#bubble-border-${size}-${type})`} 
        strokeWidth="1.2" 
        fill={`url(#bubble-bg-${size}-${type})`} 
        filter={`url(#bubble-glow-${size}-${type})`}
      />
      
      {!isSolid && (
        <>
          {/* Specular main reflection dot */}
          <circle 
            cx="62" 
            cy="50" 
            r="2" 
            fill="#ffffff" 
            opacity="0.95"
          />
          <circle 
            cx="62" 
            cy="50" 
            r="4" 
            fill="#ffffff" 
            opacity="0.25"
          />

          {/* Secondary soft reflection */}
          <path 
            d="M 25,65 A 30,30 0 0,0 35,75" 
            stroke="rgba(255, 255, 255, 0.25)" 
            strokeWidth="1" 
            strokeLinecap="round" 
            fill="none" 
          />
        </>
      )}
    </svg>
  );
};

export const FloatingBubbles = () => {
  const { isLite } = usePerformanceMode();

  if (isLite) return null;

  const bubbles = [
    { id: 1, size: 28, x: "8%", y: "75%", type: "hollow", animName: "bubble-float-slow" },
    { id: 2, size: 45, x: "85%", y: "45%", type: "solid", animName: "bubble-float-medium" }, // solid pink/purple bubble
    { id: 3, size: 70, x: "74%", y: "15%", type: "hollow", animName: "bubble-float-fast" }, // scaled down largest bubble
    { id: 4, size: 36, x: "20%", y: "22%", type: "hollow", animName: "bubble-float-slow" },
    { id: 5, size: 55, x: "4%", y: "30%", type: "solid", animName: "bubble-float-medium" }, // solid pink/purple bubble
    { id: 6, size: 24, x: "45%", y: "78%", type: "hollow", animName: "bubble-float-fast" }, // hollow bubble near bottom
    { id: 7, size: 48, x: "64%", y: "25%", type: "hollow", animName: "bubble-float-slow" },
    { id: 8, size: 32, x: "52%", y: "82%", type: "hollow", animName: "bubble-float-medium" } // hollow bubble to avoid solid overlap near tech marquee at bottom
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-hidden select-none">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`absolute transform-gpu ${b.animName}`}
          style={{
            left: b.x,
            top: b.y,
            willChange: 'transform',
          }}
        >
          <Bubble size={b.size} type={b.type} />
        </div>
      ))}
    </div>
  );
};
