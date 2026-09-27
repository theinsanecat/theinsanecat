import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberDialogueBox } from './CyberDialogueBox';
import { UFOCatSpaceship, GlobalSVGDefs } from './UFOCatSpaceship';

export { UFOCatSpaceship, GlobalSVGDefs };

// ================= DUMMY TIMELINE DATA (5 Scattered Milestones) =================
const experienceData = [
  { 
    id: 1, 
    title: 'Frontend Web Developer', 
    company: 'Infosys', 
    duration: '2021 - 2022',
    details: ['Engineered responsive UIs utilizing Angular and React.', 'Maintained type safety and scalable architecture.']
  },
  { 
    id: 2, 
    title: 'HCI Research Fellow', 
    company: 'Academic Lab', 
    duration: '2022 - 2023',
    details: ['Published research on 3D spatial user interfaces.', 'Developed immersive WebXR visualization tools.']
  },
  { 
    id: 3, 
    title: 'Technical Program Manager', 
    company: 'Google (Goal)', 
    duration: 'Future Pathway',
    details: ['Driving cross-functional engineering initiatives.', 'Managing project lifecycles and technical deliverables.']
  },
  { 
    id: 4, 
    title: 'Senior Engineer', 
    company: 'Tech Corp', 
    duration: 'Target 2028',
    details: ['Leading architecture decisions for cloud platforms.', 'Mentoring junior developers and defining best practices.']
  },
  { 
    id: 5, 
    title: 'Principal Architect', 
    company: 'Global Tech', 
    duration: 'Target 2032',
    details: ['Steering technological vision and enterprise standards.', 'Innovating with AI-augmented distributed systems.']
  }
];

// ================= THE 3 HIGH-FIDELITY PEDESTAL LAYERS =================

// 1. SlabAura: The glowing purple/blue backglow and rising vertical neon particle lines
const SlabAura = ({ isHovered, isActive }) => {
  const particles = [
    { x: 100, height: 60, delay: 0.1, duration: 2.8 },
    { x: 140, height: 90, delay: 0.8, duration: 3.2 },
    { x: 180, height: 110, delay: 0.3, duration: 2.5 },
    { x: 205, height: 120, delay: 1.2, duration: 3.0 },
    { x: 260, height: 100, delay: 0.5, duration: 2.7 },
    { x: 300, height: 80, delay: 0.9, duration: 3.4 },
    { x: 120, height: 75, delay: 1.6, duration: 3.1 },
    { x: 280, height: 95, delay: 1.4, duration: 2.9 },
    { x: 160, height: 65, delay: 0.4, duration: 3.3 },
    { x: 245, height: 115, delay: 1.8, duration: 2.6 }
  ];

  const activeOrHovered = isActive || isHovered;

  return (
    <motion.div
      animate={{
        scale: 1.0,
        opacity: activeOrHovered ? 1.0 : 0.45
      }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      style={{ overflow: "visible" }}
    >
      <svg 
        viewBox="0 0 640 350" 
        className="w-[436px] h-[238px]" 
        style={{ overflow: "visible" }}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 0)">
          <g clipPath="url(#aura-clip)">
            <motion.ellipse 
              cx="220" 
              animate={{
                cy: isActive ? 150 : 200,
                ry: isActive ? 125 : 75,
                rx: isActive ? 195 : 170
              }}
              transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.4 }}
              fill="url(#aura-radial)" 
              filter="url(#aura-blur)" 
            />
          </g>

          {/* 🌌 Rising Vertical Particles (Only emerge when spaceship lands on this pedestal slab) */}
          {isActive && (
            <g filter="url(#particle-glow)">
              {particles.map((p, i) => (
                <line
                  key={i}
                  x1={p.x}
                  y1={250}
                  x2={p.x}
                  y2={250 - p.height}
                  stroke="url(#cyan-glow)"
                  strokeWidth={activeOrHovered ? "1.8" : "1.2"}
                  strokeLinecap="round"
                  className="animate-rising-particle"
                  style={{ animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
                />
              ))}
            </g>
          )}
        </g>
      </svg>
    </motion.div>
  );
};

// 2. SlabBottom: The wider, flat circular disc with a glowing magenta/pink rim (thinned down)
const SlabBottom = ({ isHovered, isActive }) => {
  const bottomDots = [
    { cx: 220 + 176 * Math.cos(0.3), cy: 106 + 36 * Math.sin(0.3), r: 2.5, delay: 0.1, duration: 3.4 },
    { cx: 220 + 176 * Math.cos(0.8), cy: 106 + 36 * Math.sin(0.8), r: 2.5, delay: 0.9, duration: 3.0 },
    { cx: 220 + 176 * Math.cos(1.4), cy: 106 + 36 * Math.sin(1.4), r: 2.5, delay: 0.3, duration: 3.6 },
    { cx: 220 + 176 * Math.cos(2.0), cy: 106 + 36 * Math.sin(2.0), r: 2.5, delay: 1.4, duration: 3.2 },
    { cx: 220 + 176 * Math.cos(2.6), cy: 106 + 36 * Math.sin(2.6), r: 2.5, delay: 0.5, duration: 2.9 },
    { cx: 220 + 176 * Math.cos(1.1), cy: 106 + 36 * Math.sin(1.1), r: 2.5, delay: 1.8, duration: 3.3 },
    { cx: 220 + 176 * Math.cos(2.3), cy: 106 + 36 * Math.sin(2.3), r: 2.5, delay: 1.2, duration: 3.1 },
    { cx: 220 + 176 * Math.cos(0.5), cy: 106 + 36 * Math.sin(0.5), r: 2.5, delay: 2.1, duration: 3.5 }
  ];

  const activeOrHovered = isActive || isHovered;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center" style={{ overflow: "visible" }}>
      <svg 
        viewBox="0 0 640 180" 
        className="w-[436px] h-[123px]" 
        style={{ overflow: "visible" }}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 0)">
          <ellipse cx="220" cy="132" rx="175" ry="24" fill="#000000" opacity="0.8" filter="url(#shadow-blur)" />

          <g clipPath="url(#bottom-slab-clip)">
            <motion.path 
              d="M 40,106 L 40,-100 A 180,38 0 0,1 400,-100 L 400,106 A 180,38 0 0,0 40,106 Z" 
              fill="url(#bottom-cylinder-aura)" 
              filter="url(#bottom-cylinder-blur)"
              animate={{ 
                opacity: activeOrHovered ? 0.75 : 0.35,
                scaleY: isActive ? 2.3 : isHovered ? 1.25 : 1.0
              }}
              style={{ 
                willChange: "opacity, transform",
                transformOrigin: "220px 106px"
              }}
              transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.4 }}
            />
          </g>

          <path 
            d="M 40,106 L 40,118 A 180,38 0 0,0 400,118 L 400,106 A 180,38 0 0,1 40,106 Z" 
            fill="url(#bottom-wall-glow)" 
            stroke="none"
          />
          
          {/* Thickness bottom rim stroke (thinned to 1.2, softly blurred and blended) */}
          <path 
            d="M 40,106 L 40,118 A 180,38 0 0,0 400,118 L 400,106" 
            stroke="url(#magenta-rim-glow)" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none" 
            opacity="0.8" 
            filter="url(#border-glow-blur)"
          />
          
          {/* Top Surface Disc face (thinned to 1.2, softly blurred and blended) */}
          <ellipse 
            cx="220" 
            cy="106" 
            rx="180" 
            ry="38" 
            fill="url(#bottom-glass-surface)" 
            stroke="url(#magenta-rim-glow)" 
            strokeWidth="1.2"
            filter="url(#border-glow-blur)"
          />
          
          {/* 🌌 Rising Outer Glow Particle Dots (Only emerge when spaceship lands on this pedestal slab) */}
          {isActive && (
            <g filter="url(#particle-glow)">
              {bottomDots.map((d, i) => (
                <circle
                  key={i}
                  cx={d.cx}
                  cy={d.cy}
                  r={d.r}
                  fill="#e879f9"
                  className="animate-rising-dot"
                  style={{ animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s` }}
                />
              ))}
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

// 3. SlabTop: The slightly smaller elevated circular/elliptical pedestal disc (thinned down, redundant z-index 40 overlay removed)
const SlabTop = ({ isHovered, isActive, children }) => {

  const topDots = [
    { cx: 180 + 126 * Math.cos(0.4), cy: 84 + 26 * Math.sin(0.4), r: 2.2, delay: 0.2, duration: 3.1 },
    { cx: 180 + 126 * Math.cos(0.9), cy: 84 + 26 * Math.sin(0.9), r: 2.2, delay: 1.0, duration: 2.7 },
    { cx: 180 + 126 * Math.cos(1.5), cy: 84 + 26 * Math.sin(1.5), r: 2.2, delay: 0.4, duration: 3.4 },
    { cx: 180 + 126 * Math.cos(2.1), cy: 84 + 26 * Math.sin(2.1), r: 2.2, delay: 1.3, duration: 2.9 },
    { cx: 180 + 126 * Math.cos(2.7), cy: 84 + 26 * Math.sin(2.7), r: 2.2, delay: 0.6, duration: 3.2 },
    { cx: 180 + 126 * Math.cos(1.2), cy: 84 + 26 * Math.sin(1.2), r: 2.2, delay: 1.6, duration: 2.8 },
    { cx: 180 + 126 * Math.cos(2.3), cy: 84 + 26 * Math.sin(2.3), r: 2.2, delay: 1.1, duration: 3.3 },
    { cx: 180 + 126 * Math.cos(0.6), cy: 84 + 26 * Math.sin(0.6), r: 2.2, delay: 2.3, duration: 3.0 }
  ];

  const activeOrHovered = isActive || isHovered;

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer animate-pedestal-float"
      style={{ overflow: "visible" }}
    >
      <div className="relative w-[245px] h-[109px] flex items-center justify-center" style={{ overflow: "visible" }}>
        <svg 
          viewBox="0 0 560 160" 
          className="absolute w-[381px] h-[109px] left-1/2 -translate-x-1/2"
          style={{ overflow: "visible" }}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(100, 0)">
            <ellipse cx="180" cy="115" rx="120" ry="24" fill="#000" opacity="0.65" filter="url(#shadow-blur)" />

            <g clipPath="url(#top-slab-clip)">
              <motion.path 
                d="M 50,84 L 50,-120 A 130,28 0 0,1 310,-120 L 310,84 A 130,28 0 0,0 50,84 Z" 
                fill="url(#top-cylinder-aura)"
                filter="url(#top-cylinder-blur)"
                animate={{ 
                  opacity: activeOrHovered ? 0.95 : 0.55,
                  scaleY: isActive ? 2.3 : isHovered ? 1.25 : 1.0
                }}
                style={{ 
                  willChange: "opacity, transform",
                  transformOrigin: "180px 84px"
                }}
                transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.4 }}
              />
            </g>

            <path 
              d="M 50,82 L 50,96 A 130,28 0 0,0 310,96 L 310,82 A 130,28 0 0,1 50,82 Z" 
              fill="url(#top-wall-glow)" 
              stroke="none"
            />
            
            {/* Thickness bottom rim stroke (thinned to 1.4, softly blurred and blended) */}
            <path 
              d="M 50,82 L 50,96 A 130,28 0 0,0 310,96 L 310,82" 
              stroke="url(#pink-rim-glow)" 
              strokeWidth="1.4" 
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none" 
              opacity="0.8" 
              filter="url(#border-glow-blur)"
            />
            
            {/* Top Surface Disc face (thinned to 1.4, softly blurred and blended) */}
            <ellipse 
              cx="180" 
              cy="84" 
              rx="130" 
              ry="28" 
              fill="url(#top-glass-surface)" 
              stroke="url(#pink-rim-glow)" 
              strokeWidth="1.4"
              filter="url(#border-glow-blur)"
            />

            {/* 🌌 Rising Inner Glow Particle Dots (Only emerge when spaceship lands on this pedestal slab) */}
            {isActive && (
              <g filter="url(#particle-glow)">
                {topDots.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.cx}
                    cy={d.cy}
                    r={d.r}
                    fill="#fda4af"
                    className="animate-rising-dot"
                    style={{ animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s` }}
                  />
                ))}
              </g>
            )}

            {/* Inner Glowing Decorative Ring (thinned to 0.7) */}
            <ellipse 
              cx="180" 
              cy="84" 
              rx="114" 
              ry="24" 
              stroke="#f43f5e" 
              strokeWidth="0.7" 
              opacity={activeOrHovered ? 0.95 : 0.55} 
              style={{ transition: "opacity 0.3s ease" }}
              fill="none"
            />
          </g>
        </svg>

        {/* Nested Content Layer */}
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-20 h-20 flex items-center justify-center pointer-events-none z-30">
          {children}
        </div>
      </div>
    </div>
  );
};



// ================= THE HOLOGRAPHIC PROJECTION SCREEN COMPONENT =================

const HolographicScreen = ({ activeExp }) => {
  const [hoveredHeading, setHoveredHeading] = useState('focus'); // 'focus', 'impact', 'tech'
  const [timeStr, setTimeStr] = useState('00:00:00:00');

  // Fast-ticking stopwatch effect for high-tech cyberpunk hacking aesthetic
  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      const centiseconds = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds}:${centiseconds}`);
    }, 30);
    return () => clearInterval(interval);
  }, [activeExp]);

  // Define role-specific fun facts
  const funFacts = {
    1: { // Infosys
      focus: "I fell in love with React here after starting with Angular.",
      impact: "My optimizations cut bundle size by 40% using lazy loading!",
      tech: "We migrated a legacy project from jQuery to React in just 3 weeks!"
    },
    2: { // Academic Lab
      focus: "Got to test early VR haptic glove prototypes in the lab!",
      impact: "Built a virtual museum in WebXR used by 500+ students!",
      tech: "Wrote WebGL shaders that generated real-time star clusters!"
    },
    3: { // Google
      focus: "I love orchestrating high-scale cloud events and pathways.",
      impact: "Goal is to manage cross-functional projects with 10M+ users.",
      tech: "Developing retro terminal system utilities in Go in my free time!"
    },
    4: { // Senior Engineer
      focus: "Aiming to lead architectural decisions for cloud-first platforms.",
      impact: "Mentoring junior developers is what I look forward to most.",
      tech: "Planning to master Rust and decentralized system architectures."
    },
    5: { // Principal Architect
      focus: "Steering long-term technological vision for enterprise apps.",
      impact: "Innovating with AI-augmented distributed system layers.",
      tech: "Designing an AI-orchestrated micro-frontend framework!"
    }
  };

  const activeFunFacts = funFacts[activeExp.id] || { focus: '', impact: '', tech: '' };
  const currentFunFact = activeFunFacts[hoveredHeading];

  return (
    <motion.div
      key={activeExp.id}
      initial={{ opacity: 0, y: 30, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.88 }}
      transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.1 }}
      className="relative w-full max-w-[600px] h-[360px] pointer-events-auto"
      style={{ overflow: 'visible' }}
    >
      <svg
        viewBox="0 0 600 480"
        className="w-full h-full filter drop-shadow-[0_0_25px_rgba(139,92,246,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <pattern id="holo-dot-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.8" fill="#22d3ee" opacity="0.15" />
          </pattern>

          <linearGradient id="screen-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="glow-bar-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="25%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="75%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="specular-reflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id="screen-clip">
            <path d="M 70,100 L 120,50 L 250,50 L 280,80 L 390,80 L 420,50 L 520,50 L 570,100 L 570,380 L 520,430 L 120,430 L 70,380 Z" />
          </clipPath>
        </defs>

        {/* ═══════════ SCREEN LAYERS ═══════════ */}

        {/* 1. Dark Translucent Glass Body */}
        <path
          d="M 70,100 L 120,50 L 250,50 L 280,80 L 390,80 L 420,50 L 520,50 L 570,100 L 570,380 L 520,430 L 120,430 L 70,380 Z"
          fill="rgba(10, 5, 24, 0.84)"
          stroke="url(#screen-border-gradient)"
          strokeWidth="1.6"
        />

        {/* 2. Dotted Grid Overlay */}
        <rect x="70" y="50" width="500" height="380" fill="url(#holo-dot-pattern)" clipPath="url(#screen-clip)" />

        {/* 3. Symmetrical Specular Glare Reflections */}
        <path d="M 220,50 L 310,50 L 170,430 L 80,430 Z" fill="url(#specular-reflection)" clipPath="url(#screen-clip)" />
        <path d="M 400,50 L 460,50 L 330,430 L 270,430 Z" fill="url(#specular-reflection)" clipPath="url(#screen-clip)" />

        {/* 4. Glowing Horizontal Accent Bevels */}
        <line x1="280" y1="80" x2="390" y2="80" stroke="url(#glow-bar-gradient)" strokeWidth="3" filter="url(#neon-glow)" />
        <line x1="230" y1="410" x2="410" y2="410" stroke="url(#glow-bar-gradient)" strokeWidth="3" filter="url(#neon-glow)" />

        {/* 5. Cyber Protrusion Foot base */}
        <path d="M 210,430 L 230,410 L 410,410 L 430,430 Z" fill="rgba(24, 18, 43, 0.9)" stroke="url(#screen-border-gradient)" strokeWidth="1.2" />

        {/* 6. Symmetrical tech dashes at the right bottom edge */}
        <rect x="548" y="358" width="6" height="6" fill="#22d3ee" opacity="0.8" />
        <rect x="548" y="368" width="6" height="6" fill="#f472b6" opacity="0.8" />

        {/* 7. Active Dynamic Callout Line & Circular Node */}
        {/* Circle Node on left center */}
        <circle cx="70" cy="220" r="4.5" fill="#ffffff" stroke="#22d3ee" strokeWidth="2.0" filter="url(#neon-glow)" />
        {/* Dynamic Glowing Callout Path */}
        <path
          d="M 66,220 L 25,220 L 5,160"
          fill="none"
          stroke={hoveredHeading ? "#db2777" : "#22d3ee"}
          strokeWidth="1.8"
          strokeDasharray="200"
          strokeDashoffset="0"
          filter="url(#neon-glow)"
          style={{ transition: "stroke 0.3s ease" }}
        />

        {/* ═══════════ LEFT SIDE CALLOUT DIGITAL BADGE ═══════════ */}
        {/* Timer Capsule Badge in the left */}
        <g transform="translate(-140, 20)">
          {/* Capsule Border & Fill */}
          <rect x="5" y="110" width="105" height="24" rx="12" fill="rgba(10, 5, 20, 0.9)" stroke="#22d3ee" strokeWidth="1.2" />
          {/* Holographic Ticking stopwatch text */}
          <text x="18" y="126" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
            {timeStr.slice(3, 11)} {/* Display MM:SS:CC */}
          </text>
          {/* Chevrons >>>> */}
          <text x="116" y="126" fill="#f472b6" fontSize="11" fontWeight="black" letterSpacing="1" filter="url(#neon-glow)">
            &gt;&gt;&gt;&gt;
          </text>

          {/* Interactive Info capsule display background */}
          <path
            d="M 5,142 L 135,142 L 135,270 L 15,270 L 5,250 Z"
            fill="rgba(15, 10, 30, 0.88)"
            stroke="url(#screen-border-gradient)"
            strokeWidth="1.2"
          />
          
          {/* Cyber accents on the info box */}
          <line x1="15" y1="270" x2="5" y2="250" stroke="#db2777" strokeWidth="2" filter="url(#neon-glow)" />
          
          {/* Dotted Grid inside info capsule */}
          <rect x="10" y="147" width="120" height="118" fill="url(#holo-dot-pattern)" opacity="0.4" />

          {/* Holographic Title header */}
          <text x="15" y="160" fill="#f472b6" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
            FUN FACT MODULE
          </text>
          <line x1="15" y1="166" x2="125" y2="166" stroke="rgba(244, 114, 182, 0.3)" strokeWidth="0.8" />

          {/* Dynamic text injector */}
          <foreignObject x="14" y="174" width="112" height="90">
            <p className="text-[10px] leading-[1.3] text-purple-200/90 font-sans font-medium">
              {currentFunFact || "Hover over any section heading to reveal a fun fact!"}
            </p>
          </foreignObject>
        </g>

        {/* ═══════════ MAIN CONTENT FOREIGN OBJECT ═══════════ */}
        <foreignObject x="90" y="90" width="460" height="320">
          <div className="text-white p-4 font-sans select-none pointer-events-auto h-full flex flex-col justify-between" style={{ overflow: "visible" }}>
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-3">
                <div>
                  <h3 className="text-[16px] font-black tracking-tight text-white leading-none">
                    {activeExp.title}
                  </h3>
                  <span className="text-[11px] font-bold text-pink-400 mt-1 block">
                    {activeExp.company}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono">
                  {activeExp.duration}
                </span>
              </div>

              {/* Interactive Sections */}
              <div className="space-y-3">
                {/* 1. Milestone Focus */}
                <div 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredHeading('focus')}
                >
                  <h4 className="text-[11px] font-black tracking-wider text-cyan-400 uppercase flex items-center space-x-1.5 transition-colors duration-200 group-hover:text-pink-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-pink-400 animate-pulse" />
                    <span>Role Focus</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[8px] font-mono text-purple-400 ml-2">
                      [HOVERED]
                    </span>
                  </h4>
                  <p className="text-[11px] text-purple-200/80 leading-relaxed pl-3 mt-0.5">
                    {activeExp.id === 1 && "Spearheading modern modular framework practices and standardizing component catalogs."}
                    {activeExp.id === 2 && "Exploring novel human-computer interactive paradigms in immersive 3D space environments."}
                    {activeExp.id === 3 && "Coordinating large enterprise technical resources and optimizing product lifecycle loops."}
                    {activeExp.id === 4 && "Making cloud-first architecture decisions, container scaling, and system integration guides."}
                    {activeExp.id === 5 && "Formulating high-scale technical standards, system designs, and microservice grids."}
                  </p>
                </div>

                {/* 2. Key Contributions */}
                <div 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredHeading('impact')}
                >
                  <h4 className="text-[11px] font-black tracking-wider text-cyan-400 uppercase flex items-center space-x-1.5 transition-colors duration-200 group-hover:text-pink-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-pink-400 animate-pulse" />
                    <span>Core Impact</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[8px] font-mono text-purple-400 ml-2">
                      [HOVERED]
                    </span>
                  </h4>
                  <ul className="text-[11px] text-purple-200/80 space-y-1 pl-3 mt-0.5 list-disc list-outside">
                    {activeExp.details.map((detail, idx) => (
                      <li key={idx} className="leading-tight">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Tech Stack */}
                <div 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredHeading('tech')}
                >
                  <h4 className="text-[11px] font-black tracking-wider text-cyan-400 uppercase flex items-center space-x-1.5 transition-colors duration-200 group-hover:text-pink-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-pink-400 animate-pulse" />
                    <span>Tech Architecture</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[8px] font-mono text-purple-400 ml-2">
                      [HOVERED]
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pl-3 mt-1">
                    {activeExp.id === 1 && ['React', 'Angular', 'SCSS', 'Webpack', 'Jest'].map(t => (
                      <span key={t} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                    {activeExp.id === 2 && ['Three.js', 'A-Frame', 'WebXR', 'GLSL Shaders', 'React Three Fiber'].map(t => (
                      <span key={t} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                    {activeExp.id === 3 && ['PM Methodologies', 'Cloud Orchestration', 'Jira Systems', 'SQL', 'Python'].map(t => (
                      <span key={t} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                    {activeExp.id === 4 && ['Kubernetes', 'Docker', 'Go', 'AWS Infrastructure', 'Terraform'].map(t => (
                      <span key={t} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                    {activeExp.id === 5 && ['Distributed Systems', 'gRPC', 'Rust Services', 'Event Sourcing', 'Next.js Arch'].map(t => (
                      <span key={t} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            
            {/* Projector instruction foot label */}
            <span className="text-[8.5px] font-black tracking-widest text-purple-400/50 uppercase text-center block select-none">
              Holographic Projection active — hover headings to extract personal telemetry
            </span>
          </div>
        </foreignObject>
      </svg>
    </motion.div>
  );
};

const HolographicScreenMemo = memo(HolographicScreen);

// ================= CHEVRON NAVIGATION ARROWS COMPONENT =================

const ChevronArrow = ({ onClick, direction = 'next' }) => {
  return (
    <div 
      onClick={onClick}
      className="w-[80px] h-[60px] flex-shrink-0 flex items-center justify-center cursor-pointer group select-none pointer-events-auto"
    >
      <svg 
        viewBox="0 0 80 40" 
        className="w-16 h-8 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)] transition-transform duration-300 group-hover:scale-110"
      >
        {/* Loop animated chevrons pointing in designated direction */}
        {[0, 1, 2, 3].map((c) => (
          <path
            key={c}
            d={direction === 'next' 
              ? `M ${18 + c * 13},10 L ${28 + c * 13},20 L ${18 + c * 13},30`
              : `M ${62 - c * 13},10 L ${52 - c * 13},20 L ${62 - c * 13},30`
            }
            stroke="url(#magenta-rim-glow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="animate-chevron-pulse"
            style={{ animationDelay: `${c * 0.18}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// ================= MAIN INTERACTIVE EXPERIENCE CAROUSEL COMPONENT =================

export const ExperienceContent = ({ setActiveSection }) => {
  const [activeSlab, setActiveSlab] = useState(0);
  const [hoveredSlab, setHoveredSlab] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLocalDialogueVisible, setIsLocalDialogueVisible] = useState(false);

  // Resize listener to adapt mobile/desktop spacing dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-visible font-sans py-12 md:py-16 text-white select-none">
      
      {/* Title section (Clean Title & Subtitle floating over stars background) */}
      <div className="text-center mb-8 max-w-2xl z-10 select-none">
        <span className="text-xs font-black tracking-widest text-pink-400 uppercase">
          Interactive Constellation
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-1 mb-3 tracking-tight leading-none">
          Holographic Journey
        </h2>
        <p className="text-xs md:text-sm text-purple-200/60 leading-relaxed font-questrial px-4">
          Click on any floating pedestal or navigate using chevrons to project the holographic experience screen!
        </p>
      </div>

      {/* 1. Holographic Projection Screen (floating upper section) */}
      <div className="relative z-30 h-[380px] w-full max-w-5xl flex items-center justify-center mb-[-130px] select-none">
        <AnimatePresence mode="wait">
          <HolographicScreenMemo activeExp={experienceData[activeSlab]} />
        </AnimatePresence>
      </div>

      {/* 2. Horizontal Carousel (interactive lower section, softly masked to fade out edge clipping) */}
      <div 
        className="relative z-10 w-full max-w-[1060px] h-[320px] overflow-hidden flex items-center justify-start pointer-events-auto select-none px-4"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)'
        }}
      >
        {/* Sliding track container */}
        <motion.div
          animate={{ x: -activeSlab * 380 }}
          transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.4 }}
          className="flex items-end pb-6 justify-start flex-nowrap h-full"
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-150px', // Center of Platform 0 aligned with center of viewport
            overflow: 'visible'
          }}
        >
          {experienceData.map((exp, i) => (
            <div key={exp.id} className="flex items-center flex-nowrap" style={{ overflow: "visible" }}>
              {/* Platform wrapper */}
              <div 
                className="w-[300px] h-[220px] flex-shrink-0 flex items-center justify-center relative"
                style={{
                  zIndex: activeSlab === i ? 30 : hoveredSlab === i ? 25 : 10,
                  overflow: "visible"
                }}
              >
                <motion.div 
                  onClick={() => {
                    setActiveSlab(i);
                    setIsLocalDialogueVisible(false);
                  }}
                  onMouseEnter={() => setHoveredSlab(i)}
                  onMouseLeave={() => setHoveredSlab(null)}
                  className="relative w-full h-full flex items-center justify-center cursor-pointer group scale-[0.62] md:scale-[0.82] lg:scale-100 transition-transform duration-300"
                >
                  {/* Layer 1: Background Aura Glow & Particles */}
                  <SlabAura isHovered={hoveredSlab === i} isActive={activeSlab === i} />

                  {/* Layer 2: Base Slab */}
                  <SlabBottom isHovered={hoveredSlab === i} isActive={activeSlab === i} />

                  {/* Layer 3: Floating Top Slab */}
                  <SlabTop isHovered={hoveredSlab === i} isActive={activeSlab === i}>
                    {/* UFO Spaceship Cat: Rendered only when active, bobbing inside the volumetric column */}
                    {activeSlab === i && (
                      <div 
                        onMouseEnter={() => setIsLocalDialogueVisible(true)}
                        onMouseLeave={() => setIsLocalDialogueVisible(false)}
                        className="relative w-full h-full pointer-events-auto flex items-center justify-center animate-none"
                        style={{ overflow: "visible" }}
                      >
                        {/* Speech Bubble */}
                        <AnimatePresence>
                          {isLocalDialogueVisible && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: 15 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85, y: 10 }}
                              className="absolute bottom-[115px] left-1/2 -translate-x-1/2 w-[280px] z-50 pointer-events-none"
                              style={{ overflow: "visible" }}
                            >
                              <CyberDialogueBox 
                                text="Career timeline active. Navigate milestones using the horizontal chevrons, or hover card headings to unlock system telemetry."
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <UFOCatSpaceship isHovered={hoveredSlab === i || isLocalDialogueVisible} isActive={activeSlab === i} />
                      </div>
                    )}
                  </SlabTop>
                </motion.div>
              </div>

              {/* Traversal Arrow Chevrons: rendered in between platforms */}
              {i < experienceData.length - 1 && (
                <ChevronArrow 
                  onClick={() => setActiveSlab(i + 1)}
                  direction="next"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};
