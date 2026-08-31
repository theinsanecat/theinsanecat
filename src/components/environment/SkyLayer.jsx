import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const SkyLayer = ({ style, constellationOpacity, isAboutPage, svgMouseX, svgMouseY, theme }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 1180 : false
  );

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth <= 1180);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={style}
    >
      {/* ========================================================================= */}
      {/* DEDICATED MOBILE & TABLET SKY SVG (<= 1180px) - GUARANTEED 100% SUN/MOON  */}
      {/* ========================================================================= */}
      {isSmallScreen ? (
        <svg viewBox="0 0 600 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMin slice">
          <defs>
            <linearGradient id="skyGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: isLight ? "#dbeafe" : "#080211" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="40%" animate={{ stopColor: isLight ? "#e0e7ff" : "#120624" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="75%" animate={{ stopColor: isLight ? "#e9d5ff" : "#250937" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="100%" animate={{ stopColor: isLight ? "#f3e8f5" : "#46164f" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
            </linearGradient>

            <linearGradient id="moonGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffaec" />
              <stop offset="40%" stopColor="#ffeebc" />
              <stop offset="100%" stopColor="#f3ce8a" />
            </linearGradient>

            <radialGradient id="sunGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff9e6" />
              <stop offset="45%" stopColor="#ffe49e" />
              <stop offset="100%" stopColor="#ffd166" />
            </radialGradient>

            <radialGradient id="sunCoronaMobile" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe49e" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ffd166" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#faf5f0" stopOpacity="0.0" />
            </radialGradient>

            <radialGradient id="lunarGlowMobile" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffaec" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#ffeebc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#250937" stopOpacity="0.0" />
            </radialGradient>

            {/* Intense Glow Filter for Mobile Sun & Moon Body */}
            <filter id="glowFilterMobile" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Magical Glowing Star Filter for Mobile & Tablet Night Sky (Matches Desktop Dual Halo Glow) */}
            <filter id="starGlowMobile" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.6" result="blur1" />
              <feGaussianBlur stdDeviation="0.7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sky background fill */}
          <rect width="600" height="1080" fill="url(#skyGradMobile)" />

          {/* Mobile & Tablet Scaled Soft Day Clouds */}
          <motion.g
            animate={{ opacity: isLight ? 0.85 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            fill="#ffffff"
          >
            {/* Left Upper Sky Cloud */}
            <g transform="translate(15, 60) scale(0.40)" opacity="0.8">
              <rect x="0" y="40" width="240" height="65" rx="32.5" ry="32.5" />
              <circle cx="60" cy="25" r="48" />
              <circle cx="120" cy="10" r="58" />
              <circle cx="180" cy="40" r="42" />
            </g>

            {/* Right Upper Sky Cloud */}
            <g transform="translate(420, 85) scale(0.35)" opacity="0.7">
              <rect x="0" y="40" width="240" height="65" rx="32.5" ry="32.5" />
              <circle cx="60" cy="25" r="48" />
              <circle cx="120" cy="10" r="58" />
              <circle cx="180" cy="40" r="42" />
            </g>
          </motion.g>

          {/* DEDICATED MOBILE SUN */}
          <motion.g
            animate={{ opacity: isLight ? 1.0 : 0, scale: isLight ? 1.0 : 0.4 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '120px', originY: '150px' }}
          >
            <circle cx="120" cy="150" r="115" fill="url(#sunCoronaMobile)" />
            <circle cx="120" cy="150" r="44" fill="url(#sunGradMobile)" filter="url(#glowFilterMobile)" opacity="0.95" />
          </motion.g>

          {/* DEDICATED MOBILE MOON */}
          <motion.g
            animate={{ opacity: isLight ? 0 : 1.0, scale: isLight ? 0.4 : 1.0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '450px', originY: '150px' }}
          >
            <circle cx="450" cy="150" r="110" fill="url(#lunarGlowMobile)" />
            <circle cx="450" cy="150" r="40" fill="url(#moonGradMobile)" filter="url(#glowFilterMobile)" opacity="0.95" />
          </motion.g>

          {/* ================= MAGICAL GLOWING MOBILE STARFIELD (Matches Desktop Radiance) ================= */}
          {/* Luminous Glowing Hero Stars */}
          <motion.g
            animate={{ opacity: isLight ? 0 : 1.0 }}
            transition={{ duration: 1.2 }}
            fill="#ffffff"
            filter="url(#starGlowMobile)"
          >
            <circle cx="40" cy="80" r="1.6" opacity="0.95" />
            <circle cx="110" cy="120" r="1.9" opacity="0.9" fill="#ffeec7" />
            <circle cx="180" cy="55" r="1.5" opacity="0.85" />
            <circle cx="260" cy="100" r="1.8" opacity="0.95" fill="#ffd1f9" />
            <circle cx="340" cy="50" r="1.6" opacity="0.9" />
            <circle cx="420" cy="105" r="1.9" opacity="0.95" fill="#ffeec7" />
            <circle cx="510" cy="70" r="1.5" opacity="0.85" />
            <circle cx="60" cy="240" r="1.4" opacity="0.8" />
            <circle cx="150" cy="280" r="1.6" opacity="0.9" fill="#ffd1f9" />
            <circle cx="230" cy="210" r="1.3" opacity="0.75" />
            <circle cx="380" cy="260" r="1.7" opacity="0.85" fill="#ffeec7" />
            <circle cx="490" cy="250" r="1.5" opacity="0.8" fill="#ffd1f9" />
            <circle cx="550" cy="300" r="1.4" opacity="0.7" />
          </motion.g>

          {/* Crisp Multi-colored Ambient Mobile Stars */}
          <motion.g
            animate={{ opacity: isLight ? 0 : 0.9 }}
            transition={{ duration: 1.2 }}
            fill="#ffffff"
          >
            <circle cx="25" cy="140" r="1.0" opacity="0.7" />
            <circle cx="85" cy="190" r="1.2" opacity="0.8" fill="#ffeec7" />
            <circle cx="140" cy="75" r="0.9" opacity="0.65" />
            <circle cx="175" cy="165" r="1.1" opacity="0.7" />
            <circle cx="225" cy="115" r="0.9" opacity="0.6" fill="#ffd1f9" />
            <circle cx="300" cy="70" r="1.2" opacity="0.8" />
            <circle cx="330" cy="155" r="1.0" opacity="0.6" />
            <circle cx="395" cy="130" r="1.1" opacity="0.7" fill="#ffeec7" />
            <circle cx="465" cy="180" r="1.0" opacity="0.75" />
            <circle cx="535" cy="140" r="1.2" opacity="0.8" fill="#ffd1f9" />
            <circle cx="95" cy="320" r="1.0" opacity="0.65" />
            <circle cx="280" cy="310" r="1.1" opacity="0.7" />
            <circle cx="430" cy="330" r="0.9" opacity="0.6" />
            <circle cx="570" cy="230" r="1.1" opacity="0.75" fill="#ffeec7" />
          </motion.g>
        </svg>
      ) : (
        /* ========================================================================= */
        /* DESKTOP SKY SVG (> 1180px) - ORIGINAL TRANSITIONS & TIMINGS 100% INTACT   */
        /* ========================================================================= */
        <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Deep cosmic & day morphing sky gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: isLight ? "#dbeafe" : "#080211" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="40%" animate={{ stopColor: isLight ? "#e0e7ff" : "#120624" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="75%" animate={{ stopColor: isLight ? "#e9d5ff" : "#250937" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="100%" animate={{ stopColor: isLight ? "#f3e8f5" : "#46164f" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
            </linearGradient>

            <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffaec" />
              <stop offset="40%" stopColor="#ffeebc" />
              <stop offset="100%" stopColor="#f3ce8a" />
            </linearGradient>

            <radialGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff9e6" />
              <stop offset="45%" stopColor="#ffe49e" />
              <stop offset="100%" stopColor="#ffd166" />
            </radialGradient>

            <radialGradient id="sunCorona" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe49e" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#ffd166" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#faf5f0" stopOpacity="0.0" />
            </radialGradient>

            <radialGradient id="purpleNebula" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6d1e80" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#6d1e80" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#6d1e80" stopOpacity="0.0" />
            </radialGradient>

            <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#df816b" stopOpacity="0.18" />
              <stop offset="55%" stopColor="#df816b" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#df816b" stopOpacity="0.0" />
            </radialGradient>

            <radialGradient id="lunarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffaec" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#ffeebc" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#250937" stopOpacity="0.0" />
            </radialGradient>

            <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="maskGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            <mask id="constellationMask">
              <rect width="1920" height="1080" fill="black" />
              <motion.circle cx={svgMouseX} cy={svgMouseY} r="260" fill="url(#maskGlow)" />
            </mask>
          </defs>

          {/* Sky Background */}
          <rect width="1920" height="1080" fill="url(#skyGrad)" />

          {/* Distant Cosmic Nebula */}
          <motion.circle
            initial={false}
            cx="960"
            cy="540"
            r="750"
            fill="url(#purpleNebula)"
            animate={{ opacity: isLight ? 0 : 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Fluffy Soft Day Clouds */}
          <motion.g
            initial={false}
            animate={{ opacity: isLight ? 0.95 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            fill="#ffffff"
          >
            <motion.g
              initial={false}
              animate={{ x: isLight ? 0 : -900 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              opacity="0.85"
            >
              <rect x="130" y="240" width="280" height="75" rx="37.5" ry="37.5" />
              <circle cx="200" cy="225" r="55" />
              <circle cx="275" cy="205" r="70" />
              <circle cx="345" cy="240" r="50" />
            </motion.g>

            <motion.g
              initial={false}
              animate={{ x: isLight ? 0 : 900 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              opacity="0.75"
            >
              <rect x="1420" y="190" width="310" height="80" rx="40" ry="40" />
              <circle cx="1500" cy="175" r="60" />
              <circle cx="1585" cy="155" r="75" />
              <circle cx="1660" cy="185" r="55" />
            </motion.g>

            <motion.g
              initial={false}
              animate={{ x: isLight ? 0 : 400, y: isLight ? 0 : -300 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              opacity="0.6"
            >
              <rect x="740" y="270" width="230" height="60" rx="30" ry="30" />
              <circle cx="800" cy="260" r="42" />
              <circle cx="865" cy="245" r="52" />
              <circle cx="920" cy="270" r="38" />
            </motion.g>
          </motion.g>

          {/* DESKTOP MOON */}
          <motion.g
            initial={false}
            animate={{
              scale: isAboutPage ? 0.45 : (isLight ? 0.35 : 1.0),
              x: isAboutPage ? 320 : (isLight ? -1200 : 0),
              y: isAboutPage ? -140 : 0,
              opacity: isAboutPage ? 0 : (isLight ? 0 : 1.0),
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '1400px', originY: '320px' }}
          >
            <circle cx="1400" cy="320" r="500" fill="url(#orangeGlow)" />
            <circle cx="1400" cy="320" r="280" fill="url(#lunarGlow)" />
            <circle cx="1400" cy="320" r="110" fill="url(#moonGrad)" filter="url(#moonGlow)" opacity="0.95" />
          </motion.g>

          {/* DESKTOP SUN */}
          <motion.g
            initial={false}
            animate={{
              scale: isLight ? (isAboutPage ? 0.50 : 1.0) : 0.35,
              x: isLight ? (isAboutPage ? -100 : 0) : -900,
              y: isLight ? (isAboutPage ? -60 : 0) : 250,
              opacity: isLight ? 1.0 : 0,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '480px', originY: '320px' }}
          >
            <circle cx="480" cy="320" r="450" fill="url(#sunCorona)" />
            <circle cx="480" cy="320" r="115" fill="url(#sunGrad)" filter="url(#moonGlow)" opacity="0.95" />
          </motion.g>

          {/* DESKTOP STARFIELD */}
          <motion.g
            initial={false}
            animate={{
              scale: isAboutPage ? 0.75 : 1.0,
              opacity: isLight ? 0 : 1.0
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '960px', originY: '540px' }}
            fill="#ffffff"
            filter="url(#starGlow)"
          >
            <circle cx="120" cy="100" r="3.2" opacity="0.9" />
            <circle cx="200" cy="150" r="3.6" opacity="0.85" />
            <circle cx="450" cy="80" r="2.8" opacity="0.75" />
            <circle cx="550" cy="220" r="3.0" opacity="0.95" fill="#ffeec7" />
            <circle cx="700" cy="120" r="2.5" opacity="0.8" />
            <circle cx="850" cy="120" r="3.2" opacity="0.85" />
            <circle cx="960" cy="200" r="2.6" opacity="0.7" />
            <circle cx="1050" cy="80" r="3.0" opacity="0.9" fill="#ffd1f9" />
            <circle cx="1150" cy="280" r="2.8" opacity="0.85" />
            <circle cx="1350" cy="180" r="3.2" opacity="0.75" />
            <circle cx="1500" cy="220" r="2.6" opacity="0.8" fill="#ffeec7" />
            <circle cx="1600" cy="120" r="3.4" opacity="0.9" />
            <circle cx="1750" cy="180" r="4.0" opacity="0.95" />
            <circle cx="1850" cy="400" r="2.5" opacity="0.75" />
          </motion.g>

          <motion.g
            animate={{
              scale: isAboutPage ? 0.85 : 1.0,
              opacity: isLight ? 0 : (isAboutPage ? 0.75 : 1.0)
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '960px', originY: '540px' }}
            fill="#ffffff"
          >
            <circle cx="80" cy="250" r="1.4" opacity="0.45" />
            <circle cx="100" cy="300" r="1.6" opacity="0.5" />
            <circle cx="150" cy="450" r="1.2" opacity="0.6" />
            <circle cx="230" cy="80" r="1.3" opacity="0.35" />
            <circle cx="270" cy="220" r="1.5" opacity="0.55" />
            <circle cx="320" cy="280" r="1.1" opacity="0.4" />
            <circle cx="380" cy="150" r="1.7" opacity="0.65" />
            <circle cx="400" cy="100" r="1.5" opacity="0.7" />
            <circle cx="430" cy="320" r="1.3" opacity="0.45" />
            <circle cx="480" cy="350" r="1.2" opacity="0.5" />
            <circle cx="510" cy="180" r="1.4" opacity="0.4" />
            <circle cx="610" cy="130" r="1.6" opacity="0.6" />
            <circle cx="650" cy="180" r="1.6" opacity="0.55" fill="#ffeec7" />
            <circle cx="690" cy="290" r="1.2" opacity="0.3" />
            <circle cx="720" cy="480" r="1.0" opacity="0.4" />
            <circle cx="780" cy="80" r="1.5" opacity="0.65" />
            <circle cx="800" cy="300" r="1.6" opacity="0.7" />
            <circle cx="830" cy="220" r="1.3" opacity="0.35" />
            <circle cx="890" cy="160" r="1.4" opacity="0.5" />
            <circle cx="920" cy="200" r="1.3" opacity="0.55" />
            <circle cx="1000" cy="280" r="1.5" opacity="0.4" />
            <circle cx="1020" cy="140" r="1.8" opacity="0.6" />
            <circle cx="1070" cy="360" r="1.1" opacity="0.35" />
            <circle cx="1100" cy="420" r="1.2" opacity="0.4" />
            <circle cx="1130" cy="110" r="1.6" opacity="0.7" fill="#ffd1f9" />
            <circle cx="1210" cy="250" r="1.4" opacity="0.5" />
            <circle cx="1250" cy="220" r="1.5" opacity="0.65" />
            <circle cx="1280" cy="90" r="1.3" opacity="0.4" />
            <circle cx="1300" cy="480" r="1.2" opacity="0.5" />
            <circle cx="1320" cy="320" r="1.5" opacity="0.55" />
            <circle cx="1450" cy="100" r="1.4" opacity="0.4" />
            <circle cx="1490" cy="460" r="1.2" opacity="0.45" />
            <circle cx="1550" cy="150" r="1.6" opacity="0.6" />
            <circle cx="1600" cy="250" r="1.5" opacity="0.55" fill="#ffeec7" />
            <circle cx="1650" cy="90" r="1.3" opacity="0.35" />
            <circle cx="1680" cy="350" r="1.1" opacity="0.4" />
            <circle cx="1720" cy="270" r="1.4" opacity="0.5" />
            <circle cx="1800" cy="100" r="1.6" opacity="0.7" />
            <circle cx="1820" cy="220" r="1.2" opacity="0.3" />
            <circle cx="1900" cy="250" r="1.5" opacity="0.65" />
          </motion.g>

          {!isAboutPage && !isLight && (
            <motion.g mask="url(#constellationMask)" style={{ opacity: constellationOpacity }}>
              <polyline points="120,100 200,150 550,220 450,80 120,100" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.45" />
              <polyline points="700,120 850,120 960,200 1150,280 1050,80" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.45" />
              <polyline points="1350,180 1500,220 1600,120 1750,180 1850,400" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.45" />
            </motion.g>
          )}
        </svg>
      )}
    </motion.div>
  );
};
