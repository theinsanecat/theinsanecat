import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';

// Same falloff as the former SVG maskGlow gradient (1 -> 0.6 @ 50% -> 0), as an alpha mask
const REVEAL_MASK = 'radial-gradient(circle closest-side, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)';
const REVEAL_RADIUS = 260; // in 1920x1080 sky units

// Screen geometry of a 1920x1080 viewBox drawn with preserveAspectRatio="xMidYMid slice"
const skyGeometry = () => {
  const W = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const H = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const k = Math.max(W / 1920, H / 1080);
  return { W, H, k, ox: (W - 1920 * k) / 2, oy: (H - 1080 * k) / 2, D: 2 * REVEAL_RADIUS * k };
};

export const SkyLayer = ({ style, constellationOpacity, isAboutPage, svgMouseX, svgMouseY, theme }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 1180 : false
  );

  const [geom, setGeom] = useState(skyGeometry);
  const geomRef = useRef(geom);
  useLayoutEffect(() => { geomRef.current = geom; }, [geom]);

  // Mouse position (sky units) -> top-left of the reveal window, and the counter-offset for its content
  const revealX = useTransform(svgMouseX, (v) => geomRef.current.ox + v * geomRef.current.k - geomRef.current.D / 2);
  const revealY = useTransform(svgMouseY, (v) => geomRef.current.oy + v * geomRef.current.k - geomRef.current.D / 2);
  const counterX = useTransform(revealX, (v) => -v);
  const counterY = useTransform(revealY, (v) => -v);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth <= 1180);
      setGeom(skyGeometry());
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const isLight = theme === 'light';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ ...style, willChange: 'transform' }}
    >
      {/* ========================================================================= */}
      {/* DEDICATED MOBILE & TABLET SKY SVG (<= 1180px) - GUARANTEED 100% SUN/MOON  */}
      {/* ========================================================================= */}
      {isSmallScreen ? (
        <svg viewBox="0 0 600 1080" className="w-full h-full object-cover" preserveAspectRatio="xMidYMin slice">
          <defs>
            <linearGradient id="skyGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: isLight ? "#dbeafe" : "#080211" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="40%" animate={{ stopColor: isLight ? "#e0e7ff" : "#120624" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="75%" animate={{ stopColor: isLight ? "#e9d5ff" : "#250937" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="100%" animate={{ stopColor: isLight ? "#f3e8f5" : "#46164f" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '120px', originY: '150px' }}
          >
            <circle cx="120" cy="150" r="115" fill="url(#sunCoronaMobile)" />
            <circle cx="120" cy="150" r="44" fill="url(#sunGradMobile)" filter="url(#glowFilterMobile)" opacity="0.95" />
          </motion.g>

          {/* DEDICATED MOBILE MOON */}
          <motion.g
            animate={{ opacity: isLight ? 0 : 1.0, scale: isLight ? 0.4 : 1.0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
              <motion.stop offset="0%" animate={{ stopColor: isLight ? "#dbeafe" : "#080211" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="40%" animate={{ stopColor: isLight ? "#e0e7ff" : "#120624" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="75%" animate={{ stopColor: isLight ? "#e9d5ff" : "#250937" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
              <motion.stop offset="100%" animate={{ stopColor: isLight ? "#f3e8f5" : "#46164f" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
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

            {/* Pre-computed star halos (replace the former starGlow filter) */}
              <radialGradient id="starHalo0"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.186" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.188" stopColor="#ffffff" stopOpacity="0.5407" /><stop offset="0.203" stopColor="#ffffff" stopOpacity="0.4848" /><stop offset="0.234" stopColor="#ffffff" stopOpacity="0.3762" /><stop offset="0.276" stopColor="#ffffff" stopOpacity="0.2524" /><stop offset="0.328" stopColor="#ffffff" stopOpacity="0.1497" /><stop offset="0.388" stopColor="#ffffff" stopOpacity="0.0834" /><stop offset="0.456" stopColor="#ffffff" stopOpacity="0.0443" /><stop offset="0.531" stopColor="#ffffff" stopOpacity="0.0208" /><stop offset="0.612" stopColor="#ffffff" stopOpacity="0.0081" /><stop offset="0.7" stopColor="#ffffff" stopOpacity="0.0025" /><stop offset="0.795" stopColor="#ffffff" stopOpacity="0.0006" /><stop offset="0.894" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo1"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.205" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.207" stopColor="#ffffff" stopOpacity="0.5662" /><stop offset="0.221" stopColor="#ffffff" stopOpacity="0.5095" /><stop offset="0.252" stopColor="#ffffff" stopOpacity="0.3983" /><stop offset="0.293" stopColor="#ffffff" stopOpacity="0.2699" /><stop offset="0.343" stopColor="#ffffff" stopOpacity="0.1614" /><stop offset="0.402" stopColor="#ffffff" stopOpacity="0.0903" /><stop offset="0.468" stopColor="#ffffff" stopOpacity="0.0477" /><stop offset="0.542" stopColor="#ffffff" stopOpacity="0.0223" /><stop offset="0.621" stopColor="#ffffff" stopOpacity="0.0086" /><stop offset="0.707" stopColor="#ffffff" stopOpacity="0.0026" /><stop offset="0.799" stopColor="#ffffff" stopOpacity="0.0006" /><stop offset="0.897" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo2"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.167" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.169" stopColor="#ffffff" stopOpacity="0.5084" /><stop offset="0.184" stopColor="#ffffff" stopOpacity="0.4537" /><stop offset="0.216" stopColor="#ffffff" stopOpacity="0.3487" /><stop offset="0.259" stopColor="#ffffff" stopOpacity="0.231" /><stop offset="0.312" stopColor="#ffffff" stopOpacity="0.1354" /><stop offset="0.374" stopColor="#ffffff" stopOpacity="0.0751" /><stop offset="0.443" stopColor="#ffffff" stopOpacity="0.0401" /><stop offset="0.52" stopColor="#ffffff" stopOpacity="0.0189" /><stop offset="0.603" stopColor="#ffffff" stopOpacity="0.0074" /><stop offset="0.693" stopColor="#ffffff" stopOpacity="0.0023" /><stop offset="0.79" stopColor="#ffffff" stopOpacity="0.0005" /><stop offset="0.892" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo3"><stop offset="0.0" stopColor="#ffeec7" stopOpacity="1.0" /><stop offset="0.176" stopColor="#ffeec7" stopOpacity="1.0" /><stop offset="0.178" stopColor="#ffeec7" stopOpacity="0.5249" /><stop offset="0.194" stopColor="#ffeec7" stopOpacity="0.4695" /><stop offset="0.225" stopColor="#ffeec7" stopOpacity="0.3626" /><stop offset="0.268" stopColor="#ffeec7" stopOpacity="0.2418" /><stop offset="0.32" stopColor="#ffeec7" stopOpacity="0.1426" /><stop offset="0.381" stopColor="#ffeec7" stopOpacity="0.0793" /><stop offset="0.449" stopColor="#ffeec7" stopOpacity="0.0422" /><stop offset="0.525" stopColor="#ffeec7" stopOpacity="0.0199" /><stop offset="0.608" stopColor="#ffeec7" stopOpacity="0.0077" /><stop offset="0.697" stopColor="#ffeec7" stopOpacity="0.0024" /><stop offset="0.792" stopColor="#ffeec7" stopOpacity="0.0005" /><stop offset="0.893" stopColor="#ffeec7" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffeec7" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo4"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.152" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.154" stopColor="#ffffff" stopOpacity="0.4779" /><stop offset="0.169" stopColor="#ffffff" stopOpacity="0.4249" /><stop offset="0.202" stopColor="#ffffff" stopOpacity="0.3238" /><stop offset="0.246" stopColor="#ffffff" stopOpacity="0.2119" /><stop offset="0.299" stopColor="#ffffff" stopOpacity="0.1226" /><stop offset="0.362" stopColor="#ffffff" stopOpacity="0.0678" /><stop offset="0.433" stopColor="#ffffff" stopOpacity="0.0363" /><stop offset="0.511" stopColor="#ffffff" stopOpacity="0.0173" /><stop offset="0.596" stopColor="#ffffff" stopOpacity="0.0068" /><stop offset="0.688" stopColor="#ffffff" stopOpacity="0.0021" /><stop offset="0.786" stopColor="#ffffff" stopOpacity="0.0005" /><stop offset="0.89" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo5"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.186" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.188" stopColor="#ffffff" stopOpacity="0.5407" /><stop offset="0.203" stopColor="#ffffff" stopOpacity="0.4848" /><stop offset="0.234" stopColor="#ffffff" stopOpacity="0.3762" /><stop offset="0.276" stopColor="#ffffff" stopOpacity="0.2524" /><stop offset="0.328" stopColor="#ffffff" stopOpacity="0.1497" /><stop offset="0.388" stopColor="#ffffff" stopOpacity="0.0834" /><stop offset="0.456" stopColor="#ffffff" stopOpacity="0.0443" /><stop offset="0.531" stopColor="#ffffff" stopOpacity="0.0208" /><stop offset="0.612" stopColor="#ffffff" stopOpacity="0.0081" /><stop offset="0.7" stopColor="#ffffff" stopOpacity="0.0025" /><stop offset="0.795" stopColor="#ffffff" stopOpacity="0.0006" /><stop offset="0.894" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo6"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.157" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.159" stopColor="#ffffff" stopOpacity="0.4893" /><stop offset="0.174" stopColor="#ffffff" stopOpacity="0.4356" /><stop offset="0.206" stopColor="#ffffff" stopOpacity="0.333" /><stop offset="0.25" stopColor="#ffffff" stopOpacity="0.2189" /><stop offset="0.304" stopColor="#ffffff" stopOpacity="0.1273" /><stop offset="0.366" stopColor="#ffffff" stopOpacity="0.0704" /><stop offset="0.436" stopColor="#ffffff" stopOpacity="0.0376" /><stop offset="0.514" stopColor="#ffffff" stopOpacity="0.0179" /><stop offset="0.598" stopColor="#ffffff" stopOpacity="0.007" /><stop offset="0.69" stopColor="#ffffff" stopOpacity="0.0022" /><stop offset="0.787" stopColor="#ffffff" stopOpacity="0.0005" /><stop offset="0.891" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo7"><stop offset="0.0" stopColor="#ffd1f9" stopOpacity="1.0" /><stop offset="0.176" stopColor="#ffd1f9" stopOpacity="1.0" /><stop offset="0.178" stopColor="#ffd1f9" stopOpacity="0.5249" /><stop offset="0.194" stopColor="#ffd1f9" stopOpacity="0.4695" /><stop offset="0.225" stopColor="#ffd1f9" stopOpacity="0.3626" /><stop offset="0.268" stopColor="#ffd1f9" stopOpacity="0.2418" /><stop offset="0.32" stopColor="#ffd1f9" stopOpacity="0.1426" /><stop offset="0.381" stopColor="#ffd1f9" stopOpacity="0.0793" /><stop offset="0.449" stopColor="#ffd1f9" stopOpacity="0.0422" /><stop offset="0.525" stopColor="#ffd1f9" stopOpacity="0.0199" /><stop offset="0.608" stopColor="#ffd1f9" stopOpacity="0.0077" /><stop offset="0.697" stopColor="#ffd1f9" stopOpacity="0.0024" /><stop offset="0.792" stopColor="#ffd1f9" stopOpacity="0.0005" /><stop offset="0.893" stopColor="#ffd1f9" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffd1f9" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo8"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.167" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.169" stopColor="#ffffff" stopOpacity="0.5084" /><stop offset="0.184" stopColor="#ffffff" stopOpacity="0.4537" /><stop offset="0.216" stopColor="#ffffff" stopOpacity="0.3487" /><stop offset="0.259" stopColor="#ffffff" stopOpacity="0.231" /><stop offset="0.312" stopColor="#ffffff" stopOpacity="0.1354" /><stop offset="0.374" stopColor="#ffffff" stopOpacity="0.0751" /><stop offset="0.443" stopColor="#ffffff" stopOpacity="0.0401" /><stop offset="0.52" stopColor="#ffffff" stopOpacity="0.0189" /><stop offset="0.603" stopColor="#ffffff" stopOpacity="0.0074" /><stop offset="0.693" stopColor="#ffffff" stopOpacity="0.0023" /><stop offset="0.79" stopColor="#ffffff" stopOpacity="0.0005" /><stop offset="0.892" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo9"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.186" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.188" stopColor="#ffffff" stopOpacity="0.5407" /><stop offset="0.203" stopColor="#ffffff" stopOpacity="0.4848" /><stop offset="0.234" stopColor="#ffffff" stopOpacity="0.3762" /><stop offset="0.276" stopColor="#ffffff" stopOpacity="0.2524" /><stop offset="0.328" stopColor="#ffffff" stopOpacity="0.1497" /><stop offset="0.388" stopColor="#ffffff" stopOpacity="0.0834" /><stop offset="0.456" stopColor="#ffffff" stopOpacity="0.0443" /><stop offset="0.531" stopColor="#ffffff" stopOpacity="0.0208" /><stop offset="0.612" stopColor="#ffffff" stopOpacity="0.0081" /><stop offset="0.7" stopColor="#ffffff" stopOpacity="0.0025" /><stop offset="0.795" stopColor="#ffffff" stopOpacity="0.0006" /><stop offset="0.894" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo10"><stop offset="0.0" stopColor="#ffeec7" stopOpacity="1.0" /><stop offset="0.157" stopColor="#ffeec7" stopOpacity="1.0" /><stop offset="0.159" stopColor="#ffeec7" stopOpacity="0.4893" /><stop offset="0.174" stopColor="#ffeec7" stopOpacity="0.4356" /><stop offset="0.206" stopColor="#ffeec7" stopOpacity="0.333" /><stop offset="0.25" stopColor="#ffeec7" stopOpacity="0.2189" /><stop offset="0.304" stopColor="#ffeec7" stopOpacity="0.1273" /><stop offset="0.366" stopColor="#ffeec7" stopOpacity="0.0704" /><stop offset="0.436" stopColor="#ffeec7" stopOpacity="0.0376" /><stop offset="0.514" stopColor="#ffeec7" stopOpacity="0.0179" /><stop offset="0.598" stopColor="#ffeec7" stopOpacity="0.007" /><stop offset="0.69" stopColor="#ffeec7" stopOpacity="0.0022" /><stop offset="0.787" stopColor="#ffeec7" stopOpacity="0.0005" /><stop offset="0.891" stopColor="#ffeec7" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffeec7" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo11"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.195" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.197" stopColor="#ffffff" stopOpacity="0.5541" /><stop offset="0.212" stopColor="#ffffff" stopOpacity="0.4977" /><stop offset="0.243" stopColor="#ffffff" stopOpacity="0.3878" /><stop offset="0.285" stopColor="#ffffff" stopOpacity="0.2615" /><stop offset="0.336" stopColor="#ffffff" stopOpacity="0.1558" /><stop offset="0.395" stopColor="#ffffff" stopOpacity="0.087" /><stop offset="0.462" stopColor="#ffffff" stopOpacity="0.0461" /><stop offset="0.536" stopColor="#ffffff" stopOpacity="0.0216" /><stop offset="0.617" stopColor="#ffffff" stopOpacity="0.0084" /><stop offset="0.704" stopColor="#ffffff" stopOpacity="0.0025" /><stop offset="0.797" stopColor="#ffffff" stopOpacity="0.0006" /><stop offset="0.896" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo12"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.222" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.224" stopColor="#ffffff" stopOpacity="0.5878" /><stop offset="0.239" stopColor="#ffffff" stopOpacity="0.5306" /><stop offset="0.268" stopColor="#ffffff" stopOpacity="0.4175" /><stop offset="0.309" stopColor="#ffffff" stopOpacity="0.2851" /><stop offset="0.358" stopColor="#ffffff" stopOpacity="0.1717" /><stop offset="0.415" stopColor="#ffffff" stopOpacity="0.0962" /><stop offset="0.48" stopColor="#ffffff" stopOpacity="0.0508" /><stop offset="0.552" stopColor="#ffffff" stopOpacity="0.0237" /><stop offset="0.63" stopColor="#ffffff" stopOpacity="0.0091" /><stop offset="0.714" stopColor="#ffffff" stopOpacity="0.0028" /><stop offset="0.804" stopColor="#ffffff" stopOpacity="0.0006" /><stop offset="0.899" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>
              <radialGradient id="starHalo13"><stop offset="0.0" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.152" stopColor="#ffffff" stopOpacity="1.0" /><stop offset="0.154" stopColor="#ffffff" stopOpacity="0.4779" /><stop offset="0.169" stopColor="#ffffff" stopOpacity="0.4249" /><stop offset="0.202" stopColor="#ffffff" stopOpacity="0.3238" /><stop offset="0.246" stopColor="#ffffff" stopOpacity="0.2119" /><stop offset="0.299" stopColor="#ffffff" stopOpacity="0.1226" /><stop offset="0.362" stopColor="#ffffff" stopOpacity="0.0678" /><stop offset="0.433" stopColor="#ffffff" stopOpacity="0.0363" /><stop offset="0.511" stopColor="#ffffff" stopOpacity="0.0173" /><stop offset="0.596" stopColor="#ffffff" stopOpacity="0.0068" /><stop offset="0.688" stopColor="#ffffff" stopOpacity="0.0021" /><stop offset="0.786" stopColor="#ffffff" stopOpacity="0.0005" /><stop offset="0.89" stopColor="#ffffff" stopOpacity="0.0001" /><stop offset="1.0" stopColor="#ffffff" stopOpacity="0.0" /></radialGradient>

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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Fluffy Soft Day Clouds */}
          <motion.g
            initial={false}
            animate={{ opacity: isLight ? 0.95 : 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            fill="#ffffff"
          >
            <motion.g
              initial={false}
              animate={{ x: isLight ? 0 : -900 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: '960px', originY: '540px' }}
            fill="#ffffff"
          >
            {/* Glow baked into per-star radial gradients (was a live feGaussianBlur filter over the whole group,
                re-evaluated on every sky repaint). Profile computed by design-source/scripts/star-halo-stops.py */}
            <circle cx="120" cy="100" r="17.2" opacity="0.9" fill="url(#starHalo0)" />
            <circle cx="200" cy="150" r="17.6" opacity="0.85" fill="url(#starHalo1)" />
            <circle cx="450" cy="80" r="16.8" opacity="0.75" fill="url(#starHalo2)" />
            <circle cx="550" cy="220" r="17.0" opacity="0.95" fill="url(#starHalo3)" />
            <circle cx="700" cy="120" r="16.5" opacity="0.8" fill="url(#starHalo4)" />
            <circle cx="850" cy="120" r="17.2" opacity="0.85" fill="url(#starHalo5)" />
            <circle cx="960" cy="200" r="16.6" opacity="0.7" fill="url(#starHalo6)" />
            <circle cx="1050" cy="380" r="17.0" opacity="0.9" fill="url(#starHalo7)" />
            <circle cx="1150" cy="280" r="16.8" opacity="0.85" fill="url(#starHalo8)" />
            <circle cx="1350" cy="180" r="17.2" opacity="0.75" fill="url(#starHalo9)" />
            <circle cx="1500" cy="220" r="16.6" opacity="0.8" fill="url(#starHalo10)" />
            <circle cx="1600" cy="120" r="17.4" opacity="0.9" fill="url(#starHalo11)" />
            <circle cx="1750" cy="180" r="18.0" opacity="0.95" fill="url(#starHalo12)" />
            <circle cx="1850" cy="400" r="16.5" opacity="0.75" fill="url(#starHalo13)" />
          </motion.g>

          <motion.g
            animate={{
              scale: isAboutPage ? 0.85 : 1.0,
              opacity: isLight ? 0 : (isAboutPage ? 0.75 : 1.0)
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

        </svg>
      )}

      {/* Hover-revealed constellations (desktop). The reveal used to be an SVG <mask> whose circle followed
          the mouse, forcing the WHOLE sky (incl. glows) to repaint every frame. Now: a small window with a
          static radial mask moves with the mouse (compositor transform) while its content counter-moves,
          so the lines stay put and nothing repaints. */}
      {!isSmallScreen && !isAboutPage && !isLight && (
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 pointer-events-none"
          style={{
            width: geom.D,
            height: geom.D,
            x: revealX,
            y: revealY,
            opacity: constellationOpacity,
            maskImage: REVEAL_MASK,
            WebkitMaskImage: REVEAL_MASK,
            willChange: 'transform, opacity',
          }}
        >
          <motion.div className="absolute left-0 top-0" style={{ width: geom.W, height: geom.H, x: counterX, y: counterY, willChange: 'transform' }}>
            <svg viewBox="0 0 1920 1080" width={geom.W} height={geom.H} preserveAspectRatio="xMidYMid slice">
              <polyline points="120,100 200,150 550,220 450,80 120,100" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.45" />
              <polyline points="700,120 850,120 960,200 1150,280 1050,380" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.45" />
              <polyline points="1350,180 1500,220 1600,120 1750,180 1850,400" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.45" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
