import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BorderGlow from './BorderGlow';

// ─── Card Data ─────────────────────────────────────────────────────────────────
const GEM = {
  gemBase: "#4d1234", gemTop: "#ec4899", gemRight: "#a21caf",
  gemBottom: "#4a044e", gemLeft: "#c084fc", gemBottomLeft: "#701a75",
  gemCenter: "#f472b6", gemGlare: "#ffffff",
};

const cardsData = [
  {
    id: 1,
    heading: "Infosys Limited",
    title: "Technology Analyst",
    category: "ENTERPRISE FRONTEND",
    backTitle: "01/05",
    date: "Jan 2025 - Present",
    image: `${import.meta.env.BASE_URL}images/infosys-building.jpg`,
    description: "Jan 2025 - Present",
    longDescription:
      "I moved to Bangalore. For someone who had spent most of her life close to home, it was one of the most courageous and nerve-wracking decisions I had ever made, yes, EVER MADE. Not every brave decision feels brave while you're living it. Sometimes it just feels scary, but I am glad I did it, because I learned so much about myself and the people who love me. Somewhere along this journey, I also stopped thinking that good engineering meant making everything perfect, there's much more to it. Today, I care just as much about the people, the problem, and what happens beyond the code. At Infosys, I work on high-stakes banking applications, take ownership of messy production problems, work across teams, and build systems that can grow without becoming harder to live with. I’m still the girl who loves solving problems but I’ve also learned that the best solutions come from curiosity, consistency, empathy, and the courage to keep moving.",
    skills: [
      "Production",
      "Bank Application",
      "Angular & React",
      "Enterprise Scalability",
      "Optimisation",
      "Core Mathematics",
      "Problem Solving"
    ],
    ...GEM,
  },

  {
    id: 2,
    heading: "Jio Platforms Limited",
    title: "Software Developer & Team Lead",
    category: "FRONTEND DEVELOPER",
    backTitle: "02/05",
    date: "Oct 2020 - Dec 2024",
    image: `${import.meta.env.BASE_URL}images/jio-building.jpg`,
    description: "Oct 2020 - Dec 2024",
    longDescription:
      "Jio was where I grew into the developer I am today. It wasn't just my first job; it was my college placement, my first company, and the place where my professional journey truly began. That makes this chapter especially dear to my heart. Over four years I went from writing code to leading projects, building products from scratch, creating reusable systems, and eventually becoming someone others could come to when they were stuck. I met some incredibly talented people here, learned what ownership really felt like, and discovered that I didn't just enjoy building things, I deeply enjoyed making things easier for the people building alongside me. Leaving was bittersweet. I wasn't leaving because I had stopped loving the place; I was leaving because I had started to outgrow it.",
    skills: [
      "Team Lead",
      "Web Development",
      "Agile",
      "Angular & React",
      "Custom Component Library",
      "Custom Wi-Fi Portals",
      "Core Mathematics"
    ],
    ...GEM,
  },

  {
    id: 3,
    heading: "BITS Pilani",
    title: "M.Tech - Data Science & Eng.",
    category: "POSTGRADUATE STUDIES",
    backTitle: "03/05",
    date: "2022 - 2024",
    image: `${import.meta.env.BASE_URL}images/bits-pilani-building.jpg`,
    description: "2022 - 2024",
    longDescription:
      "Apparently, having a full-time career wasn't enough to satisfy my curiosity. While working, I went back to being a student and pursued my Master's in Data Science & Engineering at BITS Pilani. I dove into machine learning, deep learning, statistics, AI and the mathematics behind intelligent systems not because I needed another line on my résumé, but because I genuinely wanted to understand more. I've always enjoyed learning for the simple joy of understanding something I didn't understand before. Balancing a full-time career, academics, and everything in between demanded discipline, consistency, and the ability to keep showing up. It was one of the most demanding chapters of my life but also the one I'm incredibly proud of. Curiosity, I've learned, doesn't really care how busy you are.",
    skills: [
      "M.Tech Data Science",
      "7.5 CGPA",
      "Data Engineering",
      "Machine Learning",
      "Algorithmic Design",
      "Python",
      "Core Mathematics"
    ],
    ...GEM,
  },

  {
    id: 4,
    heading: "University of Mumbai (RAIT)",
    title: "B.E. Electronics & Telecomm.",
    category: "UNDERGRADUATE STUDIES",
    backTitle: "04/05",
    date: "2016 - 2020",
    image: `${import.meta.env.BASE_URL}images/mumbai-university-building.jpg`,
    description: "2016 - 2020",
    longDescription:
      "Well honestly?! Engineering wasn't the path I had originally imagined for myself, but circumstances changed the plan and I'm thankful they did. I chose PCMCS, discovered Computer Science and fell in love with the feeling of turning logic into something real and expressing ideas beyond words. I eventually studied Electronics & Telecommunication, and somewhere between learning aboutcircuits, signal processing, image processing, machine vision and mathematics, I realised I didn't need the 'perfect' branch to find something I loved. I could make a path my own and I did. College also gave me the space to discover more about myself beyond academics. I explored different interests, organised workshops alongside my professors for juniors, headed my very first event at our tech-fest, became an active member of the Social Wing, took on the role of Summer Internship Student Coordinator, and proudly became part of the college dance crew. Looking back, I think I simply tried to make the most of the opportunities and interests that came my way and discovered a little more about myself too.",
    skills: [
      "8.6 CGPA",
      "10 grade point in subjects",
      "Tech-Fest Head (Best Event)",
      "IoT", "Arduino", "Raspberry Pi",
      "Core Mathematics", "Social Wing Volunteer", "Student Coordinator", "Dance Crew"
    ],
    ...GEM,
  },

  {
    id: 5,
    heading: "D.A.V. International School",
    title: "HSC (92%) & SSC (93%)",
    category: "ACADEMICS & HONORS",
    backTitle: "05/05",
    date: "2014 - 2016",
    image: `${import.meta.env.BASE_URL}images/dav-school-building.jpg`,
    description: "2014 - 2016",
    longDescription:
      "I was the studious kid. The one who usually came first or second, loved Mathematics and Science, had a soft spot for English Literature and Computer Science, and somehow managed to have a good rapport with her teachers. But studying was never the only thing I wanted to do. I played Handball, Throwball and Kho-Kho, ran Marathons, was a Choir Member, danced, debated, sketched, painted, wrote small plays/stories, competed in SpellBee and Olympiads, and even brought home medals in all of the above. Looking back, I think school revealed something that has stayed with me ever since: I have always desired to create, explore and pour myself into things, whether that thing was a mathematical problem, a dance floor, or eventually, a piece of code.",
    skills: [
      "95% PCM in HSC",
      "10 CGPA SSC",
      "Math Olympiad Bronze",
      "Bharatanatyam (6 Yrs)",
      "Taekwondo Green 1",
      "Marathon Silver",
      "Core Mathematics"
    ],
    ...GEM,
  },
];

// ─── Arc Transform Helper ───────────────────────────────────────────────────────
const getArc = (index, activeIndex, total, isLight = false) => {
  const diff = ((index - activeIndex) % total + total) % total;
  const offset = diff > Math.floor(total / 2) ? diff - total : diff;
  const R = 670, rad = (offset * 20 * Math.PI) / 180;
  return {
    x: R * Math.sin(rad),
    y: R * (1 - Math.cos(rad)),
    rotateZ: offset * -7,
    scale: Math.max(0.62, 1 - Math.abs(offset) * 0.15),
    opacity: offset === 0 ? 1 : (isLight ? (Math.abs(offset) === 1 ? 0.28 : 0.08) : (Math.abs(offset) === 1 ? 0.45 : 0.18)),
    zIndex: 10 - Math.abs(offset) * 2,
    offset,
  };
};

// ─── Shared Card Frame (corners + border) ──────────────────────────────────────
const CardFrame = ({ gid, theme }) => {
  const isLight = theme === 'light';
  return (
    <div className="absolute inset-0 w-full h-full z-40 pointer-events-none transform-gpu">
      {/* Light Mode Card Frame */}
      <svg className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 320 480">
        <rect x="0" y="0" width="320" height="480" fill="none" stroke="#a78bfa" strokeWidth="24" />
        <rect x="12" y="12" width="296" height="456" fill="none" stroke="#7c3aed" strokeWidth="8" />
        <rect x="20" y="20" width="280" height="440" fill="none" stroke="#ddd6fe" strokeWidth="6" />
        <rect x="23" y="23" width="274" height="434" fill="none" stroke="#6d28d9" strokeWidth="1" />
        <defs>
          <linearGradient id={`l-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        {["translate(0,0)", "translate(320,0) scale(-1,1)", "translate(0,480) scale(1,-1)", "translate(320,480) scale(-1,-1)"].map((t, i) => (
          <g key={i} transform={t}>
            <polygon points="0,0 55,0 0,55" fill="#a78bfa" stroke="#6d28d9" strokeWidth="2" />
            <polygon points="4,4 40,4 4,40" fill="#c4b5fd" />
            <polygon points="10,10 26,10 10,26" fill={`url(#l-${gid})`} />
            <polygon points="10,10 26,10 16,16" fill="#fde68a" fillOpacity="0.8" />
            <polygon points="10,10 16,16 10,26" fill="#b45309" />
            <polygon points="13,13 20,13 13,20" fill="#fef3c7" fillOpacity="0.8" />
          </g>
        ))}
      </svg>

      {/* Dark Mode Card Frame */}
      <svg className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 320 480">
        <rect x="0" y="0" width="320" height="480" fill="none" stroke="#251744" strokeWidth="24" />
        <rect x="12" y="12" width="296" height="456" fill="none" stroke="#4a2e85" strokeWidth="8" />
        <rect x="20" y="20" width="280" height="440" fill="none" stroke="#130b24" strokeWidth="6" />
        <rect x="23" y="23" width="274" height="434" fill="none" stroke="#7952c2" strokeWidth="1" />
        <defs>
          <linearGradient id={`d-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e89838" />
            <stop offset="100%" stopColor="#8a5311" />
          </linearGradient>
        </defs>
        {["translate(0,0)", "translate(320,0) scale(-1,1)", "translate(0,480) scale(1,-1)", "translate(320,480) scale(-1,-1)"].map((t, i) => (
          <g key={i} transform={t}>
            <polygon points="0,0 55,0 0,55" fill="#231545" stroke="#4a2e85" strokeWidth="2" />
            <polygon points="4,4 40,4 4,40" fill="#0b0616" />
            <polygon points="10,10 26,10 10,26" fill={`url(#d-${gid})`} />
            <polygon points="10,10 26,10 16,16" fill="#fde68a" fillOpacity="0.8" />
            <polygon points="10,10 16,16 10,26" fill="#b45309" />
            <polygon points="13,13 20,13 13,20" fill="#fef3c7" fillOpacity="0.8" />
          </g>
        ))}
      </svg>
    </div>
  );
};

// ─── Card Back Face ─────────────────────────────────────────────────────────────
const CardBack = ({ card, isHovered, theme }) => {
  const isLight = theme === 'light';
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-between shadow-2xl backface-hidden transform-gpu">
      {/* Background Gradient Face - Light Mode */}
      <div className={`absolute inset-0 w-full h-full bg-gradient-to-b from-[#e9d5ff] via-[#f5d0fe] to-[#fbcfe8] transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0'}`} />

      {/* Background Gradient Face - Dark Mode */}
      <div className={`absolute inset-0 w-full h-full bg-[#170e2b] transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0' : 'opacity-100'}`} />

      {/* Background Honeycomb Patterns */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 320 480">
        <defs>
          <pattern id={`hex-light-${card.id}`} width="30" height="51.9" patternUnits="userSpaceOnUse" patternTransform="scale(0.6)">
            <path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.35" />
          </pattern>
          <pattern id={`hex-dark-${card.id}`} width="30" height="51.9" patternUnits="userSpaceOnUse" patternTransform="scale(0.6)">
            <path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z" fill="none" stroke="#251744" strokeWidth="1.5" strokeOpacity="1" />
          </pattern>
          <radialGradient id={`hex-fade-${card.id}`} cx="50%" cy="50%" r="70%">
            <stop offset="15%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <mask id={`hex-mask-${card.id}`}>
            <rect width="100%" height="100%" fill={`url(#hex-fade-${card.id})`} />
          </mask>
          <radialGradient id={`vig-${card.id}`} cx="50%" cy="50%" r="75%">
            <stop offset="30%" stopColor="transparent" />
            <stop offset="100%" stopColor="#0b0616" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Light Mode Honeycomb Grid (Fade opacity 700ms) */}
        <g className="transition-opacity duration-700 ease-in-out" style={{ opacity: isLight ? 1 : 0 }}>
          <rect width="100%" height="100%" fill={`url(#hex-light-${card.id})`} mask={`url(#hex-mask-${card.id})`} />
        </g>

        {/* Dark Mode Honeycomb Grid & Vignette (Fade opacity 700ms) */}
        <g className="transition-opacity duration-700 ease-in-out" style={{ opacity: isLight ? 0 : 1 }}>
          <rect width="100%" height="100%" fill={`url(#hex-dark-${card.id})`} />
          <rect width="100%" height="100%" fill={`url(#vig-${card.id})`} />
        </g>
      </svg>

      {/* Middle Layer: Shield & Contours - Light Mode */}
      <svg className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 320 480" filter="url(#heavy-shadow)">
        <g transform="translate(160,240)">
          <path d="M 0 -130 L 35 -80 L 100 -20 L 70 50 L 0 110 L -70 50 L -100 -20 L -35 -80 Z" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="4" strokeLinejoin="round" />
          <path d="M 0 -100 L 25 -60 L 70 -15 L 50 35 L 0 80 L -50 35 L -70 -15 L -25 -60 Z" fill="#ddd6fe" stroke="#a855f7" strokeWidth="2" />
          <polygon points="0,-75 62,-36 62,36 0,75 -62,36 -62,-36" fill="#fbcfe8" stroke="#f472b6" strokeWidth="6" />
          <motion.polygon points="0,-70 56,-32 56,32 0,70 -56,32 -56,-32" fill="#ec4899" animate={{ opacity: isLight ? 0.48 : (isHovered ? 0.48 : 0.25) }} transition={{ duration: 0.3 }} filter="url(#gem-glow)" />
        </g>
      </svg>

      {/* Middle Layer: Shield & Contours - Dark Mode */}
      <svg className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 320 480" filter="url(#heavy-shadow)">
        <g transform="translate(160,240)">
          <path d="M 0 -130 L 35 -80 L 100 -20 L 70 50 L 0 110 L -70 50 L -100 -20 L -35 -80 Z" fill="#18102e" stroke="#5b399c" strokeWidth="4" strokeLinejoin="round" />
          <path d="M 0 -100 L 25 -60 L 70 -15 L 50 35 L 0 80 L -50 35 L -70 -15 L -25 -60 Z" fill="#231545" stroke="#3b226e" strokeWidth="2" />
          <polygon points="0,-75 62,-36 62,36 0,75 -62,36 -62,-36" fill="#0b0616" stroke="#130b24" strokeWidth="6" />
          <motion.polygon points="0,-70 56,-32 56,32 0,70 -56,32 -56,-32" fill="#ff1493" animate={{ opacity: isHovered ? 0.48 : 0.2 }} transition={{ duration: 0.3 }} filter="url(#gem-glow)" />
        </g>
      </svg>

      {/* Dual Blades Layer - Light Mode */}
      <svg className={`absolute inset-0 w-full h-full z-20 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 320 480" filter="url(#heavy-shadow)">
        <defs>
          <linearGradient id={`blade-l-${card.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbcfe8" /><stop offset="40%" stopColor="#c084fc" /><stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id={`hilt-l-${card.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" /><stop offset="50%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
        </defs>
        <g transform="translate(160,240) rotate(-40)">
          <path d="M -8,-25 Q -15,-100 0,-180 Q 5,-100 2,-25 Z" fill={`url(#blade-l-${card.id})`} />
          <rect x="-20" y="-25" width="40" height="10" rx="3" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="2" />
          <rect x="-8" y="-15" width="16" height="80" fill={`url(#hilt-l-${card.id})`} />
          <path d="M-8,-5 L8,5 M-8,15 L8,25 M-8,35 L8,45 M-8,55 L8,65" stroke="#c084fc" strokeWidth="2" />
          <rect x="-10" y="65" width="20" height="8" rx="2" fill="#fbbf24" />
        </g>
        <g transform="translate(160,240) rotate(40)">
          <path d="M -2,-25 Q -5,-100 0,-180 Q 15,-100 8,-25 Z" fill={`url(#blade-l-${card.id})`} />
          <rect x="-20" y="-25" width="40" height="10" rx="3" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="2" />
          <rect x="-8" y="-15" width="16" height="80" fill={`url(#hilt-l-${card.id})`} />
          <path d="M-8,-5 L8,5 M-8,15 L8,25 M-8,35 L8,45 M-8,55 L8,65" stroke="#c084fc" strokeWidth="2" />
          <rect x="-10" y="65" width="20" height="8" rx="2" fill="#fbbf24" />
        </g>
      </svg>

      {/* Dual Blades Layer - Dark Mode */}
      <svg className={`absolute inset-0 w-full h-full z-20 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 320 480" filter="url(#heavy-shadow)">
        <defs>
          <linearGradient id={`blade-d-${card.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d5ccf0" /><stop offset="40%" stopColor="#8771cc" /><stop offset="100%" stopColor="#372170" />
          </linearGradient>
          <linearGradient id={`hilt-d-${card.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#871a5b" /><stop offset="50%" stopColor="#590d39" /><stop offset="100%" stopColor="#30061e" />
          </linearGradient>
        </defs>
        <g transform="translate(160,240) rotate(-40)">
          <path d="M -8,-25 Q -15,-100 0,-180 Q 5,-100 2,-25 Z" fill={`url(#blade-d-${card.id})`} />
          <rect x="-20" y="-25" width="40" height="10" rx="3" fill="#1b1235" stroke="#7952c2" strokeWidth="2" />
          <rect x="-8" y="-15" width="16" height="80" fill={`url(#hilt-d-${card.id})`} />
          <path d="M-8,-5 L8,5 M-8,15 L8,25 M-8,35 L8,45 M-8,55 L8,65" stroke="#130b24" strokeWidth="2" />
          <rect x="-10" y="65" width="20" height="8" rx="2" fill="#5b399c" />
        </g>
        <g transform="translate(160,240) rotate(40)">
          <path d="M -2,-25 Q -5,-100 0,-180 Q 15,-100 8,-25 Z" fill={`url(#blade-d-${card.id})`} />
          <rect x="-20" y="-25" width="40" height="10" rx="3" fill="#1b1235" stroke="#7952c2" strokeWidth="2" />
          <rect x="-8" y="-15" width="16" height="80" fill={`url(#hilt-d-${card.id})`} />
          <path d="M-8,-5 L8,5 M-8,15 L8,25 M-8,35 L8,45 M-8,55 L8,65" stroke="#130b24" strokeWidth="2" />
          <rect x="-10" y="65" width="20" height="8" rx="2" fill="#5b399c" />
        </g>
      </svg>

      {/* Top Layer: Center 3D Isometric Hexagon Gem - Light Mode */}
      <svg className={`absolute inset-0 w-full h-full z-30 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 320 480" filter="url(#heavy-shadow)">
        <g transform="translate(160,240)">
          <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="4" />
          <polygon points="0,-52 46,-27 46,27 0,52 -46,27 -46,-27" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
          <g filter="url(#gem-glow)">
            <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" fill={card.gemBase} />
            <polygon points="0,-46 40,-23 0,0 -40,-23" fill={card.gemTop} />
            <polygon points="40,-23 40,23 0,15 0,0" fill={card.gemRight} />
            <polygon points="40,23 0,46 0,15" fill={card.gemBottom} />
            <polygon points="-40,-23 0,0 0,15 -40,23" fill={card.gemLeft} />
            <polygon points="-40,23 0,46 0,15" fill={card.gemBottomLeft} />
            <polygon points="0,-23 18,-9 18,9 0,23 -18,9 -18,-9" fill={card.gemCenter} opacity="0.9" />
            <polygon points="0,-23 18,-9 0,0 -18,-9" fill={card.gemGlare} opacity="0.8" />
          </g>
        </g>
        {/* Top Vector Crest Card Number Index - Light Mode */}
        <g transform="translate(160, 68)">
          <polygon points="0,-16 32,-8 32,8 0,16 -32,8 -32,-8" fill="#fbcfe8" stroke="#7c3aed" strokeWidth="2" />
          <polygon points="0,-12 26,-6 26,6 0,12 -26,6 -26,-6" fill="#ffffff" opacity="0.9" />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="#581c87"
            fontSize="10"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            {card.backTitle}
          </text>
        </g>
      </svg>

      {/* Top Layer: Center 3D Isometric Hexagon Gem - Dark Mode */}
      <svg className={`absolute inset-0 w-full h-full z-30 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 320 480" filter="url(#heavy-shadow)">
        <g transform="translate(160,240)">
          <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#251744" stroke="#4a2e85" strokeWidth="4" />
          <polygon points="0,-52 46,-27 46,27 0,52 -46,27 -46,-27" fill="#1b1235" stroke="#7952c2" strokeWidth="2" />
          <g filter="url(#gem-glow)">
            <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" fill={card.gemBase} />
            <polygon points="0,-46 40,-23 0,0 -40,-23" fill={card.gemTop} />
            <polygon points="40,-23 40,23 0,15 0,0" fill={card.gemRight} />
            <polygon points="40,23 0,46 0,15" fill={card.gemBottom} />
            <polygon points="-40,-23 0,0 0,15 -40,23" fill={card.gemLeft} />
            <polygon points="-40,23 0,46 0,15" fill={card.gemBottomLeft} />
            <polygon points="0,-23 18,-9 18,9 0,23 -18,9 -18,-9" fill={card.gemCenter} opacity="0.9" />
            <polygon points="0,-23 18,-9 0,0 -18,-9" fill={card.gemGlare} opacity="0.8" />
          </g>
        </g>

        {/* Top Vector Crest Card Number Index - Dark Mode */}
        <g transform="translate(160, 68)">
          <polygon points="0,-16 32,-8 32,8 0,16 -32,8 -32,-8" fill="#1b1235" stroke="#7952c2" strokeWidth="2" />
          <polygon points="0,-12 26,-6 26,6 0,12 -26,6 -26,-6" fill="#251744" opacity="0.9" />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="#f3e8f5"
            fontSize="10"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            {card.backTitle}
          </text>
        </g>
      </svg>

      <CardFrame gid={`gb-${card.id}`} theme={theme} />
    </div>
  );
};

// ─── Card Front Face ────────────────────────────────────────────────────────────
const CardFront = ({ card, theme }) => {
  const isLight = theme === 'light';
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col backface-hidden shadow-2xl p-6" style={{ transform: 'rotateY(180deg)' }}>
      {/* Light Mode Front Face Background */}
      <div className={`absolute inset-0 w-full h-full bg-[#fcf8ff] shadow-purple-900/25 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0'}`} />

      {/* Dark Mode Front Face Background */}
      <div className={`absolute inset-0 w-full h-full bg-[#2a1b4d] shadow-purple-950/60 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0' : 'opacity-100'}`} />

      <div className={`h-[40px] flex justify-between items-center px-4 font-bold text-xs rounded-t-sm z-10 relative transition-all duration-700 ${isLight ? 'bg-[#c4b5fd] text-[#2e1065]' : 'bg-[#684ba8] text-white'
        }`}>
        <span>{card.category}</span>
        <span className={`px-2 py-1 rounded transition-colors duration-700 ${isLight ? 'bg-[#f3e8f5] text-[#581c87]' : 'bg-[#1b1235]'}`}>{card.backTitle}</span>
      </div>
      <div className={`flex-1 relative p-2.5 flex items-center justify-center overflow-hidden rounded-b-sm border-b transition-all duration-700 ${isLight ? 'bg-gradient-to-b from-[#f3e8f5] to-[#fce4ec] border-purple-200' : 'bg-gradient-to-b from-[#321f66] to-[#140b28] border-white/5'
        }`}>
        <div className="w-48 h-48 rounded-full bg-[#ec4899]/15 blur-3xl absolute" />
        <div className="w-24 h-24 rounded-full bg-[#a855f7]/25 blur-xl absolute" />
        {card.image ? (
          <div className="w-full h-full relative z-10 rounded-lg overflow-hidden border border-purple-400/30 shadow-md">
            <img
              src={card.image}
              alt={card.heading}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="w-36 h-36 relative z-10 flex items-center justify-center">{card.avatar}</div>
        )}
      </div>
      <div className={`h-[140px] mt-3 p-4 rounded-sm border-2 flex flex-col justify-center items-center z-10 relative transition-all duration-700 ${isLight ? 'bg-white border-[#c4b5fd]' : 'bg-[#d3cbf0] border-[#684ba8]'
        }`}>
        <h3 className={`text-center font-black tracking-tight text-base border-b pb-1 mb-1 w-full transition-all duration-700 ${isLight ? 'text-[#2e1065] border-purple-200' : 'text-[#2a1b4d] border-[#684ba8]/60'
          }`}>{card.heading}</h3>
        <h4 className={`text-center font-bold text-xs uppercase tracking-wider mb-1.5 transition-colors duration-700 ${isLight ? 'text-[#6b21a8]' : 'text-[#4a2d8c]'
          }`}>{card.title}</h4>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-700 ${isLight ? 'bg-purple-100/90 text-purple-950 border border-purple-300' : 'bg-[#1b1235] text-pink-300 border border-purple-500/40'
          }`}>
          <span>{card.date}</span>
        </div>
      </div>
      <CardFrame gid={`gf-${card.id}`} theme={theme} />
    </div>
  );
};

// ─── Full Card (flipper wrapper with standalone perspective camera) ─────────────
const CardVisual = ({ card, isSelected, isHovered, isCenterUnturned, theme }) => (
  <div className="w-full h-full relative perspective-[1500px] transform-gpu">
    {/* Deep Ambient Contrast Drop Shadow Disk - Light Mode */}
    <div
      className={`absolute -inset-4 rounded-[2.5rem] blur-2xl pointer-events-none z-0 bg-[#5b21b6]/25 shadow-2xl transition-opacity duration-700 ease-in-out ${isCenterUnturned && theme === 'light' ? 'opacity-90' : 'opacity-0'
        }`}
    />

    {/* Deep Ambient Contrast Drop Shadow Disk - Dark Mode */}
    <div
      className={`absolute -inset-4 rounded-[2.5rem] blur-2xl pointer-events-none z-0 bg-black/60 transition-opacity duration-700 ease-in-out ${isCenterUnturned && theme === 'dark' ? 'opacity-90' : 'opacity-0'
        }`}
    />

    {/* Radiant Glowing Aura Disk - Light Mode (Blue in bottom area: Sky Blue -> Lavender -> Pink) */}
    <div
      className={`absolute -inset-6 rounded-[2.5rem] blur-3xl pointer-events-none z-0 bg-gradient-to-tr from-[#38bdf8]/85 via-[#c084fc]/85 to-[#f472b6]/85 transition-opacity duration-700 ease-in-out ${isCenterUnturned && theme === 'light' ? 'opacity-85' : 'opacity-0'
        }`}
    />

    {/* Radiant Glowing Aura Disk - Dark Mode */}
    <div
      className={`absolute -inset-6 rounded-[2.5rem] blur-3xl pointer-events-none z-0 bg-gradient-to-tr from-[#ec4899] via-[#a855f7] to-[#f59e0b] transition-opacity duration-700 ease-in-out ${isCenterUnturned && theme === 'dark' ? 'opacity-85' : 'opacity-0'
        }`}
    />

    {/* Glowing Outer Card Frame Halo - Light Mode */}
    <div
      className={`absolute inset-0 rounded-[2rem] blur-xl pointer-events-none z-0 bg-[#c084fc]/45 transition-opacity duration-700 ease-in-out ${isCenterUnturned && theme === 'light' ? 'opacity-90' : 'opacity-0'
        }`}
    />

    {/* Glowing Outer Card Frame Halo - Dark Mode */}
    <div
      className={`absolute inset-0 rounded-[2rem] blur-xl pointer-events-none z-0 bg-[#ec4899]/35 transition-opacity duration-700 ease-in-out ${isCenterUnturned && theme === 'dark' ? 'opacity-90' : 'opacity-0'
        }`}
    />

    {/* Smooth Floating Container (Pure GPU translateY, zero filter stutter) */}
    <motion.div
      animate={{
        y: isCenterUnturned ? [0, -18, 0] : 0,
        rotateZ: isCenterUnturned ? [-1.2, 1.2, -1.2] : 0,
      }}
      transition={
        isCenterUnturned
          ? { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
          : { duration: 0.4, ease: "easeInOut" }
      }
      className="w-full h-full relative preserve-3d transform-gpu"
    >
      <motion.div
        animate={{ rotateY: isSelected ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full h-full relative preserve-3d"
      >
        <CardBack card={card} isHovered={isHovered} theme={theme} />
        <CardFront card={card} theme={theme} />
      </motion.div>
    </motion.div>
  </div>
);

// ─── Solid Vector SVG Heart Icon for Floating Animations ──────────────────────
const MiniSvgHeart = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// ─── Special Glowing Floating Pill for Core Mathematics (Vector SVG Hearts, No Emojis) ───────
const CoreMathematicsPill = ({ onOpen, isLight }) => {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      animate={{ y: [0, -3.5, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      className={`relative px-2 sm:px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[11px] font-semibold tracking-wide border border-pink-500 text-pink-500 bg-pink-500/10 shadow-[0_0_10px_rgba(236,72,153,0.7)] hover:shadow-[0_0_16px_rgba(236,72,153,0.9)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 overflow-visible select-none transition-all duration-300 ${isLight ? 'bg-pink-100/90 text-pink-700 border-pink-400' : 'bg-pink-950/40 text-pink-300 border-pink-500'
        }`}
    >
      <span>Core Mathematics</span>

      {/* Floating emitting mini vector SVG glowing hearts */}
      <motion.div
        initial={{ opacity: 0, y: 0, scale: 0.4 }}
        animate={{ opacity: [0, 1, 0], y: [-2, -16], scale: [0.4, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut" }}
        className="absolute -top-2.5 left-1.5 text-pink-400 pointer-events-none drop-shadow-[0_0_6px_rgba(236,72,153,0.9)]"
      >
        <MiniSvgHeart className="w-2.5 h-2.5 fill-pink-500" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 0, scale: 0.4 }}
        animate={{ opacity: [0, 1, 0], y: [-2, -20], scale: [0.4, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.4, delay: 0.8, ease: "easeOut" }}
        className="absolute -top-2.5 right-1.5 text-pink-400 pointer-events-none drop-shadow-[0_0_6px_rgba(236,72,153,0.9)]"
      >
        <MiniSvgHeart className="w-2 h-2 fill-pink-400" />
      </motion.div>
    </motion.button>
  );
};

// ─── Interactive Pretty Overlay Modal for "Why I Love Maths" (Landscape 2-Column Layout) ───
const MathReflectionModal = ({ isOpen, onClose, theme }) => {
  const isLight = theme === 'light';
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop (Outside clicks blocked - close button required) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 z-0"
          />

          {/* Modal Card Container (Landscape Layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative max-w-2xl sm:max-w-3xl w-full rounded-3xl p-5 sm:p-6 z-10 overflow-hidden border-2 shadow-2xl ${isLight
              ? 'bg-white/95 border-pink-300 text-slate-900 shadow-pink-500/20'
              : 'bg-[#0f0921]/95 border-pink-500/50 text-purple-100 shadow-pink-500/30'
              }`}
          >
            {/* Background Glow Orbs */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Cross Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-1.5 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none z-20 ${isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-purple-950/80 hover:bg-purple-900 border-purple-500/30 text-purple-200'
                }`}
              aria-label="Close reflection"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 2-Column Landscape Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">

              {/* Left Column: Side Header & Action */}
              <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-500/20 pb-4 md:pb-0 md:pr-5">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest uppercase border border-pink-500/40 bg-pink-500/10 text-pink-500 mb-2">
                    Personal Reflection
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight mb-2 ${isLight ? 'text-[#1e1832]' : 'text-white'}`}>
                    Why I Love Mathematics
                  </h2>
                  <p className={`text-xs italic leading-relaxed ${isLight ? 'text-purple-700' : 'text-purple-300/80'}`}>
                    "A subject where the rules were clear and the challenge was simply to understand."
                  </p>
                </div>

                <div className="hidden md:flex mt-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-md shadow-pink-500/25 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
                  >
                    Close Reflection
                  </button>
                </div>
              </div>

              {/* Right Column: Paragraph Content (No Inner Scrollbar) */}
              <div className={`md:col-span-7 space-y-2 text-[11px] sm:text-xs leading-relaxed font-questrial font-medium text-left ${isLight ? 'text-slate-700' : 'text-purple-200/90'
                }`}>
                <p>I think I loved Mathematics for a slightly strange reason.</p>
                <p className="font-bold text-pink-500 text-xs sm:text-sm">It never pretended to be something it wasn't.</p>
                <p>A problem could be complicated, intricate and almost impossible to crack, but it never had a hidden agenda. No facade. No mind games(Maybe some mind games). No pretending. You worked through it, understood it, and eventually it gave you exactly what it was.</p>
                <p className="italic font-semibold text-purple-600 dark:text-purple-300">Maybe that honesty felt familiar.</p>
                <p>I have always been drawn to things that are genuine. I don't particularly enjoy operating from strategy or playing games with people. So there was something comforting about a subject where the rules were clear and the challenge was simply to understand.</p>
                <p>And then there was the thrill of finally solving something that had refused to make sense few minutes earlier.</p>
                <p className="font-bold text-pink-500 dark:text-pink-400">That part was addictive.</p>
                <p>Maybe Mathematics wasn't just something I enjoyed.</p>
                <p className="font-bold text-pink-500 text-xs sm:text-sm">Maybe it was one of my earliest ways of expressing who I was.</p>
              </div>

            </div>

            {/* Mobile Bottom Action */}
            <div className="md:hidden mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-md shadow-pink-500/25 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
              >
                Close Reflection
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const AboutContent = ({ theme }) => {
  const isLight = theme === 'light';
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isTablet, setIsTablet] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth <= 1180 : false
  );
  const [isSmallScreen, setIsSmallScreen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const [isCompactHeight, setIsCompactHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight <= 700 : false
  );

  const isLocked = useRef(false);

  const selectedCard = selectedCardId ? cardsData.find(c => c.id === selectedCardId) : null;
  const total = cardsData.length;

  useEffect(() => {
    const checkResponsive = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w <= 1180);
      setIsSmallScreen(w < 640);
    };
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Listen to Keypad arrow scrolls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCardId !== null) return;
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCardId, activeIndex]);

  const navigate = (dir) => {
    if (isLocked.current || selectedCardId !== null) return;
    setActiveIndex(i => (i + dir + total) % total);
  };

  // Touch Swipe Gesture for mobile / tablet deck navigation
  const handlePanEnd = (e, info) => {
    if (selectedCardId !== null || isLocked.current) return;
    const threshold = 20;
    if (Math.abs(info.offset.x) > threshold && Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      if (info.offset.x < 0) {
        navigate(1);
      } else {
        navigate(-1);
      }
    }
  };

  const handleCardClick = (card, index) => {
    if (isLocked.current) return;
    if (selectedCardId === null) {
      if (index !== activeIndex) {
        setActiveIndex(index);
        return;
      }
      isLocked.current = true;
      setSelectedCardId(card.id);
      setTimeout(() => {
        isLocked.current = false;
      }, 700);
    } else {
      if (card.id === selectedCardId) {
        collapse();
      }
    }
  };

  const collapse = () => {
    if (isLocked.current) return;
    isLocked.current = true;
    setSelectedCardId(null);
    setTimeout(() => {
      isLocked.current = false;
    }, 700);
  };

  return (
    <div className={`relative w-screen min-h-screen flex flex-col justify-between items-center select-none pointer-events-auto pb-4 sm:pb-6 ${
      selectedCardId && isMobile ? 'overflow-y-auto' : 'overflow-hidden max-h-screen'
    }`}>

      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="aurora-blob-1" /><div className="aurora-blob-2" /><div className="aurora-blob-3" />
      </div>

      {/* Global SVG Filters */}
      <svg className="hidden">
        <defs>
          <filter id="heavy-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.7" />
          </filter>
          <filter id="gem-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Section Header */}
      <div
        className="text-center transition-all duration-700 z-20 flex flex-col items-center pointer-events-none mt-20 sm:mt-24 md:mt-28 mb-2"
        style={{
          opacity: selectedCardId ? 0 : 1,
          transform: selectedCardId ? 'translateY(-12px)' : 'none',
          pointerEvents: selectedCardId ? 'none' : 'auto'
        }}
      >
        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase transition-colors duration-700 ${isLight ? 'text-purple-600' : 'text-purple-400'
          }`}>About Me</span>
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mt-0.5 mb-0.5 tracking-tight transition-colors duration-700 ${isLight ? 'text-[#1e1832]' : 'text-white'
          }`}>My Journey</h2>
        <p className={`text-[10px] sm:text-xs font-questrial transition-colors duration-700 ${isLight ? 'text-purple-900/80' : 'text-purple-200/60'
          }`}>Rotate the deck and click a card to explore my journey.</p>
      </div>

      {/* ── Main Interactive Section (Deck + Title linked together for CONSTANT spacing across all devices) ── */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 px-4 sm:px-8">
        {/* ── Unified Layout Container with Touch Swipe Gesture ── */}
        <motion.div
          onPanEnd={handlePanEnd}
          className={`relative w-full flex flex-col items-center justify-center transition-all duration-700 ${selectedCardId
            ? (isMobile ? 'h-[650px] sm:h-[690px]' : (isTablet ? 'h-[440px]' : 'h-[480px]'))
            : 'h-[360px] sm:h-[420px] md:h-[460px]'
            }`}
        >
          {/* Circular Plate Disc */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 rounded-full border pointer-events-none transition-all duration-700 ${isLight
              ? 'border-purple-300/40 bg-gradient-to-t from-purple-200/20 to-transparent'
              : 'border-purple-500/25 bg-gradient-to-t from-purple-950/30 to-transparent'
              }`}
            style={{ width: '1100px', height: '1100px', bottom: '-830px', opacity: selectedCardId ? 0 : 1 }}
          />

          {/* Cards mapping - stays entirely mounted to morph dynamically */}
          {cardsData.map((card, index) => {
            const isSelected = selectedCardId === card.id;
            const isAnySelected = selectedCardId !== null;
            const isHovered = index === activeIndex;
            const isCenterUnturned = index === activeIndex && !isAnySelected;

            const arc = getArc(index, activeIndex, total, isLight);

            // Proportional card scaling based on screen size
            let baseScale = isSmallScreen ? arc.scale * 0.72 : (isMobile ? arc.scale * 0.82 : (isTablet ? arc.scale * 0.85 : arc.scale));

            // Position targets
            let targetX = arc.x * (isSmallScreen ? 0.65 : (isMobile ? 0.8 : (isTablet ? 0.72 : 1)));
            let targetY = arc.y;
            let rotateZ = arc.rotateZ;
            let scale = baseScale;
            let opacity = arc.opacity;
            let zIndex = arc.zIndex;

            if (isAnySelected) {
              if (isSelected) {
                if (isMobile) {
                  // Mobile screens: card centered at top, details text BELOW card with clean gap
                  targetX = 0;
                  targetY = isCompactHeight ? -200 : (isSmallScreen ? -180 : -190);
                  rotateZ = 0;
                  scale = isCompactHeight ? 0.38 : (isSmallScreen ? 0.42 : 0.46);
                  opacity = 1;
                  zIndex = 50;
                } else {
                  // Rest of devices (Tablets, Laptops, Desktops): card shifted LEFT, details text SIDE-BY-SIDE on right
                  targetX = isTablet ? -135 : -200;
                  targetY = 0;
                  rotateZ = 0;
                  scale = isTablet ? 0.80 : 0.92;
                  opacity = 1;
                  zIndex = 50;
                }
              } else {
                // Other cards fly/fade out smoothly
                targetX = arc.x;
                targetY = arc.y + 180;
                rotateZ = arc.rotateZ * 1.5;
                scale = 0.35;
                opacity = 0;
                zIndex = 0;
              }
            }

            return (
              <motion.div
                key={card.id}
                initial={{
                  x: 0,
                  y: 0,
                  rotateZ: 0,
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
                  rotateZ: rotateZ,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 16,
                  mass: 0.8,
                }}
                onClick={() => handleCardClick(card, index)}
                className="absolute w-[300px] h-[450px]"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-225px',
                  marginLeft: '-150px',
                  filter: arc.offset !== 0 && isLight ? 'brightness(0.92) saturate(0.9)' : 'none',
                  cursor: isLocked.current ? 'default' : (!isAnySelected || isSelected) ? 'pointer' : 'default',
                  pointerEvents: (!isAnySelected || isSelected) ? 'auto' : 'none',
                }}
              >
                <CardVisual
                  card={card}
                  isSelected={isSelected}
                  isHovered={isHovered && !isAnySelected}
                  isCenterUnturned={isCenterUnturned}
                  theme={theme}
                />
              </motion.div>
            );
          })}

          {/* Details Description Panel (Below card on mobile with clean 50px vertical gap, side-by-side on tablet/desktop matching EXACT card height) */}
          <AnimatePresence>
            {selectedCard && (
              <motion.div
                key={`details-${selectedCard.id}`}
                initial={{ opacity: 0, x: isMobile ? '-50%' : '30px', y: isMobile ? '15px' : '-50%' }}
                animate={{ opacity: 1, x: isMobile ? '-50%' : '0px', y: isMobile ? '0px' : '-50%' }}
                exit={{ opacity: 0, x: isMobile ? '-50%' : '20px', y: isMobile ? '10px' : '-50%' }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`absolute flex flex-col text-left px-3 sm:px-4 z-30 pointer-events-auto items-start ${isMobile ? 'justify-start' : 'justify-between py-1'
                  }`}
                style={{
                  left: '50%',
                  top: isMobile ? (isCompactHeight ? '195px' : (isSmallScreen ? '240px' : '285px')) : '50%',
                  marginLeft: isMobile ? '0px' : (isTablet ? '20px' : '40px'),
                  width: isMobile ? (isSmallScreen ? '94%' : '88%') : (isTablet ? '340px' : '440px'),
                  height: isMobile ? 'auto' : (isTablet ? '360px' : '414px'),
                  maxHeight: isMobile ? (isCompactHeight ? 'calc(100vh - 210px)' : '360px') : 'none',
                }}
              >
                {/* Header Info */}
                <div className="w-full shrink-0 flex flex-col items-start mb-1">
                  <span className={`text-[9.5px] sm:text-xs font-black tracking-widest uppercase transition-colors duration-700 ${isLight ? 'text-purple-600' : 'text-purple-400'
                    }`}>
                    {selectedCard.category} FOCUS
                  </span>
                  <h2 className={`text-lg sm:text-2xl md:text-3xl font-black tracking-tight leading-none my-0.5 transition-colors duration-700 ${isLight ? 'text-[#1e1832]' : 'text-white'
                    }`}>
                    {selectedCard.heading}
                  </h2>
                  <h3 className={`text-[11px] sm:text-sm font-bold transition-colors duration-700 ${isLight ? 'text-pink-600' : 'text-purple-300'
                    }`}>
                    {selectedCard.title}
                  </h3>
                </div>

                {/* Long Description Body - Scrollable if text exceeds card height */}
                <div className={`w-full my-1 leading-relaxed text-[11px] sm:text-xs font-medium transition-colors duration-700 ${isMobile ? (isCompactHeight ? 'max-h-[90px] overflow-y-auto pr-1 custom-scrollbar' : 'max-h-[140px] overflow-y-auto pr-1 custom-scrollbar') : 'flex-1 overflow-y-auto pr-2 custom-scrollbar'
                  } ${isLight ? 'text-slate-700' : 'text-purple-200/85'}`}>
                  <p>{selectedCard.longDescription}</p>
                </div>

                {/* Bottom Section: Skills & Close Button */}
                <div className="w-full shrink-0 flex flex-col items-start pt-1">
                  <h4 className={`text-[9.5px] sm:text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-700 ${isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                    Key Stacks & Disciplines
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
                    {selectedCard.skills.map((skill, idx) => (
                      skill === "Core Mathematics" ? (
                        <CoreMathematicsPill
                          key={`${skill}-${idx}`}
                          isLight={isLight}
                          onOpen={() => setIsMathModalOpen(true)}
                        />
                      ) : (
                        <span key={`${skill}-${idx}`} className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[11px] font-semibold transition-all duration-700 ${isLight
                          ? 'bg-white/80 border border-purple-200 text-purple-900 shadow-sm'
                          : 'bg-white/5 border border-purple-500/20 text-purple-200'
                          }`}>
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                  {isLight ? (
                    <button
                      onClick={() => setSelectedCardId(null)}
                      className="self-start px-4 sm:px-5 py-1.5 text-[11px] sm:text-xs font-bold text-white bg-gradient-to-r from-[#ff5e97] to-[#ec4899] hover:from-[#ff4887] hover:to-[#db2777] rounded-full shadow-md active:scale-95 transition-all duration-700 cursor-pointer focus:outline-none flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                      Close Expanded Card
                    </button>
                  ) : (
                    <BorderGlow
                      borderRadius={9999}
                      glowColor="270 85 70"
                      colors={['#ab55f7', '#ec4899', '#3b82f6']}
                      edgeSensitivity={40}
                      glowRadius={25}
                      glowIntensity={1.2}
                      backgroundColor="#1b1235"
                      className="self-start active:scale-95 transition-all duration-700 cursor-pointer w-max"
                    >
                      <button
                        onClick={() => setSelectedCardId(null)}
                        className="px-4 sm:px-5 py-1.5 text-[11px] sm:text-xs font-bold text-white cursor-pointer focus:outline-none flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Close Expanded Card
                      </button>
                    </BorderGlow>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Arrow Navigation - Guaranteed inside screen on iPad Pro (1024px) & all tablet viewports */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous card"
            className={`absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:-left-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-700 flex items-center justify-center focus:outline-none group cursor-pointer ${isLight
              ? 'bg-white/90 border-purple-200 text-purple-900 shadow-lg shadow-purple-900/15 hover:border-pink-300 hover:text-pink-600'
              : 'bg-[#18102e]/90 border-purple-500/50 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-600/50 hover:border-purple-300 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.7)]'
              }`}
            style={{
              opacity: selectedCardId ? 0 : 1,
              pointerEvents: selectedCardId ? 'none' : 'auto'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow Navigation - Guaranteed inside screen on iPad Pro (1024px) & all tablet viewports */}
          <button
            onClick={() => navigate(1)}
            aria-label="Next card"
            className={`absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:-right-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-700 flex items-center justify-center focus:outline-none group cursor-pointer ${isLight
              ? 'bg-white/90 border-purple-200 text-purple-900 shadow-lg shadow-purple-900/15 hover:border-pink-300 hover:text-pink-600'
              : 'bg-[#18102e]/90 border-purple-500/50 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-600/50 hover:border-purple-300 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.7)]'
              }`}
            style={{
              opacity: selectedCardId ? 0 : 1,
              pointerEvents: selectedCardId ? 'none' : 'auto'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

        </motion.div>

        {/* ── Single-Line Title Heading for Focused Card (Tightly attached right below card deck with CONSTANT mt-3 sm:mt-4 spacing) ── */}
        <div
          className="text-center z-20 mt-3 sm:mt-4 px-4 transition-all duration-700 pointer-events-none shrink-0"
          style={{
            opacity: selectedCardId ? 0 : 1,
            transform: selectedCardId ? 'translateY(8px)' : 'none',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.h3
              key={cardsData[activeIndex].id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`text-base sm:text-lg md:text-xl font-black tracking-tight transition-colors duration-700 ${isLight
                ? 'text-[#1e1832] drop-shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                : 'text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                }`}
            >
              {cardsData[activeIndex].heading}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Pretty Overlay Modal for Math Reflection ── */}
      <MathReflectionModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        theme={theme}
      />

    </div>
  );
};
