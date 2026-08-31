import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useTransform, motion, AnimatePresence } from 'framer-motion';
import { useMouseParallax } from './hooks/useMouseParallax';
import { SkyLayer } from './components/environment/SkyLayer';
import { MountainLayer } from './components/environment/MountainLayer';
import { MidgroundTrees } from './components/environment/MidgroundTrees';
import { ForegroundTrees } from './components/environment/ForegroundTrees';
import { MobileMidgroundTrees } from './components/environment/MobileMidgroundTrees';
import { MobileForegroundTrees } from './components/environment/MobileForegroundTrees';
import { Navbar } from './components/ui/Navbar';
import { HeroContent } from './components/ui/HeroContent';
import { CyberDialogueBox } from './components/ui/CyberDialogueBox';
import { LotusWaterBody } from './components/ui/LotusWaterBody';
import { MobileLotusWaterBody } from './components/ui/MobileLotusWaterBody';
import { UFOCatSpaceship, GlobalSVGDefs } from './components/ui/UFOCatSpaceship';
import { InteractiveSpotlight } from './components/ui/InteractiveSpotlight';
import rotatingEmblem from './assets/rotating-emblem.svg';

import { AboutContent } from './components/ui/AboutContent';
import { ProjectsContent } from './components/ui/ProjectsContent';
import { ContactContent } from './components/ui/ContactContent';

/*
const ExperienceContent = lazy(() =>
  import('./components/ui/ExperienceContent').then((module) => ({
    default: module.ExperienceContent,
  }))
);
*/

// ================= GLOBAL FLOATING GUIDE CONTAINER WITH SPACE DRIFT =================
const getRandomBorderCoords = (w, h) => {
  const edge = Math.floor(Math.random() * 4);
  let x = 0;
  let y = 0;
  
  // Guard values for extremely small screen dimensions
  const safeW = Math.max(w, 320);
  const safeH = Math.max(h, 480);
  
  switch (edge) {
    case 0: // Top Border (below navbar)
      x = Math.floor(Math.random() * Math.max(safeW - 150, 50)) + 20;
      y = Math.floor(Math.random() * 60) + 90; // Y: 90px to 150px
      break;
    case 1: // Bottom Border (above experience pedestals, out of center cards)
      x = Math.floor(Math.random() * Math.max(safeW - 150, 50)) + 20;
      y = safeH - 180 - Math.floor(Math.random() * 60); // Y: safeH-240px to safeH-180px
      break;
    case 2: // Left Border
      x = Math.floor(Math.random() * 60) + 20; // X: 20px to 80px
      y = Math.floor(Math.random() * Math.max(safeH - 280, 50)) + 120; // Y: 120px to safeH-160px
      break;
    case 3: // Right Border
    default:
      x = safeW - 130 - Math.floor(Math.random() * 60); // X: safeW-190px to safeW-130px
      y = Math.floor(Math.random() * Math.max(safeH - 280, 50)) + 120; // Y: 120px to safeH-160px
      break;
  }
  
  // Final bounds sanity check to ensure the 110px UFO & speech bubble remain inside viewport
  x = Math.max(20, Math.min(x, w - 140));
  y = Math.max(80, Math.min(y, h - 140));
  
  return { x, y };
};

const FloatingUFOContainer = ({
  theme,
  isHovered,
  isDialogueVisible,
  dialogueText,
  onHoverEnter,
  onHoverLeave
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-8 z-50 pointer-events-auto cursor-pointer animate-hero-float"
      style={{
        width: "110px",
        height: "110px",
        overflow: "visible"
      }}
    >
      <div
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        className="relative w-full h-full flex items-center justify-center select-none pointer-events-auto"
        style={{ overflow: "visible" }}
      >
        {/* Cyber Speech Bubble Aligned Above Bottom Right UFO */}
        <AnimatePresence>
          {isDialogueVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 8 }}
              className="absolute bottom-[108px] right-0 w-[210px] sm:w-[220px] z-50 pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <CyberDialogueBox text={dialogueText} theme={theme} arrowPosition="right" />
            </motion.div>
          )}
        </AnimatePresence>

        <UFOCatSpaceship isHovered={isHovered} isActive={true} style={{ top: 0, left: 0 }} />
      </div>
    </motion.div>
  );
};

function App() {
  // State to track theme ('dark' or 'light')
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
  };

  // Detect mobile & tablet viewport (< 1024px)
  const [isSmallViewport, setIsSmallViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  });

  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Sync activeSection with react-router-dom path
  const getSectionFromPath = (path) => {
    const cleanPath = path.replace(/^\//, '').toLowerCase();
    if (!cleanPath || cleanPath === 'home') return 'home';
    if (cleanPath === 'about') return 'about';
    if (cleanPath === 'projects') return 'projects';
    if (cleanPath === 'contact' || cleanPath === 'say-hello') return 'contact';
    return 'home';
  };

  const activeSection = getSectionFromPath(location.pathname);

  // Preload heavy SVG emblem upfront so navigating to Contact page is instant
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = rotatingEmblem;
    }
  }, []);

  // Block route navigation on mobile & tablet viewport (< 1024px)
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1024;
      setIsSmallViewport(isSmall);
      setIsMobileViewport(window.innerWidth < 768);
      if (isSmall && location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (isSmallViewport && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [isSmallViewport, location.pathname, navigate]);

  // Section navigation handler using react-router-dom navigate
  const handleSectionChange = useCallback((newSection) => {
    if (isSmallViewport) {
      navigate('/');
      return;
    }
    if (newSection === 'home') navigate('/');
    else if (newSection === 'about') navigate('/about');
    else if (newSection === 'projects') navigate('/projects');
    else if (newSection === 'contact') navigate('/contact');
  }, [isSmallViewport, navigate]);

  const isAboutPage = activeSection === 'about';
  const showRecededLandscape = activeSection === 'about' || activeSection === 'contact' || activeSection === 'projects';

  // State for the global floating guide spaceship cat
  const [isSpaceshipSpawned, setIsSpaceshipSpawned] = useState(false);
  const [dialogueText, setDialogueText] = useState('');
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [isUFOHovered, setIsUFOHovered] = useState(false);
  const [flightMode, setFlightMode] = useState('orbit'); // Default: Border Patrol (Orbit)
  const [hoverCount, setHoverCount] = useState(0);

  const getPageDisplayName = (section) => {
    switch (section) {
      case 'home': return 'Home';
      case 'about': return 'About';
      case 'projects': return 'Projects';
      case 'experience': return 'Experience';
      case 'contact': return 'Contact';
      default: return 'Home';
    }
  };

  // Spaceship vanishes instantly behind the avatar whenever returning to the Home page
  useEffect(() => {
    if (activeSection === 'home') {
      setIsSpaceshipSpawned(false);
      setIsDialogueVisible(false);
      setIsUFOHovered(false);
      setHoverCount(0);
    }
  }, [activeSection]);

  const handleAvatarTrigger = () => {
    if (isSpaceshipSpawned) return;
    setIsSpaceshipSpawned(true);
  };

  const handleSpaceshipHoverEnter = () => {
    setIsUFOHovered(true);
    setIsDialogueVisible(true);

    const pageName = getPageDisplayName(activeSection);
    const messages = [
      `Hey, I am Purrito, you are in ${pageName} page`,
      "Meow"
    ];

    setDialogueText(messages[hoverCount % 2]);
    setHoverCount((prev) => prev + 1);
  };

  const handleSpaceshipHoverLeave = () => {
    setIsUFOHovered(false);
    setIsDialogueVisible(false);
  };

  // 1. Get the spring-smoothed mouse positions
  const { mouseX, mouseY, mouseXpx, mouseYpx } = useMouseParallax();

  // 2. Create parallax transforms (desktop exact original multipliers vs mobile subtle shifts)
  const maxForeX = isMobileViewport ? 12 : 68;
  const maxForeY = isMobileViewport ? 8 : 35;
  const maxMidX = isMobileViewport ? 8 : 40;
  const maxMidY = isMobileViewport ? 5 : 22;
  const maxMountX = isMobileViewport ? 5 : 24;
  const maxMountY = isMobileViewport ? 3 : 14;

  const skyX = useTransform(mouseX, [-1, 1], isMobileViewport ? [-6, 6] : [-12, 12]);
  const skyY = useTransform(mouseY, [-1, 1], isMobileViewport ? [-4, 4] : [-8, 8]);

  const mountX = useTransform(mouseX, [-1, 1], [-maxMountX, maxMountX]);
  const mountY = useTransform(mouseY, [-1, 1], [-maxMountY, maxMountY]);

  const midX = useTransform(mouseX, [-1, 1], [-maxMidX, maxMidX]);
  const midY = useTransform(mouseY, [-1, 1], [-maxMidY, maxMidY]);

  const foreX = useTransform(mouseX, [-1, 1], [-maxForeX, maxForeX]);
  const foreY = useTransform(mouseY, [-1, 1], [-maxForeY, maxForeY]);

  const houseFarX = useTransform(mouseX, [-1, 1], [-16, 16]);
  const houseFarY = useTransform(mouseY, [-1, 1], [-9, 9]);

  const houseNearX = useTransform(mouseX, [-1, 1], [-36, 36]);
  const houseNearY = useTransform(mouseY, [-1, 1], [-20, 20]);

  // 3. Map the spring-smoothed mouse coordinates to the 1920x1080 SVG coordinate space
  const svgMouseX = useTransform(mouseX, [-1, 1], [0, 1920]);
  const svgMouseY = useTransform(mouseY, [-1, 1], [0, 1080]);

  // 4. Hover-activated constellation opacity based on mouseY height [-1, 0.4] -> [0.95, 0]
  const constellationOpacity = useTransform(mouseY, [-1, -0.1, 0.4], [0.95, 0.5, 0]);

  return (
    <main className={`relative w-screen h-screen overflow-hidden theme-transition ${theme === 'light' ? 'bg-[#faf5f0]' : 'bg-[#07010e]'}`}>
      <GlobalSVGDefs />
      {/* 0. Header Navigation Overlay with Theme Switch */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={handleSectionChange} 
        theme={theme} 
        setTheme={setTheme} 
      />

      {/* 1. Deepest Cosmic / Day Sky Layer */}
      <SkyLayer 
        style={{ 
          x: skyX, 
          y: skyY,
          scale: 1.04
        }} 
        isAboutPage={showRecededLandscape}
        constellationOpacity={showRecededLandscape ? 0 : constellationOpacity}
        svgMouseX={svgMouseX}
        svgMouseY={svgMouseY}
        theme={theme}
      />

      {/* 2. Distant Majestic Mountain Ridges */}
      <motion.div
        animate={{ y: showRecededLandscape ? 40 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full"
      >
        <MountainLayer 
          style={{ 
            x: mountX, 
            y: mountY,
            scale: 1.08
          }} 
          theme={theme}
        />
      </motion.div>

      {/* 3. Middle Layer Forest */}
      <AnimatePresence>
        {!showRecededLandscape && (
          <motion.div
            key="midground-forest"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 350 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          >
            {isMobileViewport ? (
              <MobileMidgroundTrees style={{ x: midX, y: midY, scale: 1.18 }} theme={theme} />
            ) : (
              <MidgroundTrees 
                style={{ 
                  x: midX, 
                  y: midY,
                  scale: 1.14
                }} 
                theme={theme}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 4. Foreground Forest Floor */}
      <AnimatePresence>
        {!showRecededLandscape && (
          <motion.div
            key="foreground-forest"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 450 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          >
            {isMobileViewport ? (
              <MobileForegroundTrees style={{ x: foreX, y: foreY, scale: 1.20 }} theme={theme} />
            ) : (
              <ForegroundTrees 
                style={{ 
                  x: foreX, 
                  y: foreY,
                  scale: 1.18
                }} 
                theme={theme}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Interactive Pink Spotlight (Performance-aware) */}
      <InteractiveSpotlight mouseXpx={mouseXpx} mouseYpx={mouseYpx} theme={theme} />

      {/* Serene Lotus Lake (Pops UP on Contact section, slides DOWN on return to Home) */}
      <AnimatePresence>
        {activeSection === 'contact' && (
          isMobileViewport ? (
            <MobileLotusWaterBody key="lotus-lake-mob" theme={theme} />
          ) : (
            <LotusWaterBody key="lotus-lake" theme={theme} />
          )
        )}
      </AnimatePresence>

      {/* 6. UI Content Layer */}
      <div className="relative z-30 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="w-full h-full flex items-center justify-center relative">
          <AnimatePresence mode="popLayout">
            <Routes location={location} key={activeSection}>
              <Route
                path="/"
                element={
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="absolute w-full flex items-center justify-center pointer-events-auto"
                  >
                    <HeroContent setActiveSection={handleSectionChange} onAvatarTrigger={handleAvatarTrigger} theme={theme} />
                  </motion.div>
                }
              />
              <Route
                path="/about"
                element={
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="absolute w-full flex items-center justify-center pointer-events-auto"
                  >
                    <AboutContent theme={theme} />
                  </motion.div>
                }
              />
              <Route
                path="/projects"
                element={
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="absolute w-full flex items-center justify-center pointer-events-auto"
                  >
                    <ProjectsContent theme={theme} />
                  </motion.div>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="absolute w-full h-full flex items-center justify-center pointer-events-auto"
                  >
                    <ContactContent setActiveSection={handleSectionChange} theme={theme} onAvatarTrigger={handleAvatarTrigger} />
                  </motion.div>
                }
              />
              <Route path="/say-hello" element={<Navigate to="/contact" replace />} />
              <Route path="/experience" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>

      {/* 7. Global Floating Guide Spaceship Cat */}
      {isSpaceshipSpawned && activeSection !== 'experience' && (
        <FloatingUFOContainer
          activeSection={activeSection}
          flightMode={flightMode}
          isHovered={isUFOHovered}
          theme={theme}
          isDialogueVisible={isDialogueVisible}
          dialogueText={dialogueText}
          onHoverEnter={handleSpaceshipHoverEnter}
          onHoverLeave={handleSpaceshipHoverLeave}
        />
      )}

      {/* UFO Flight Controller Widget (Commented out as requested - can be un-commented to enable mode switcher UI)
      {isSpaceshipSpawned && activeSection !== 'experience' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40 p-2 glass-surface rounded-lg pointer-events-auto"
        >
          <div className="flex items-center space-x-3 select-none">
            <span className="text-[7.5px] font-black tracking-widest text-cyan-400 uppercase font-mono border-r border-cyan-500/15 pr-2.5">
              FLIGHT CORE
            </span>
            <div className="flex items-center space-x-1">
              {[
                { id: 'glide', label: 'Border Drift' },
                { id: 'orbit', label: 'Border Patrol' },
                { id: 'stationary', label: 'Stationary' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setFlightMode(m.id)}
                  className={`px-2 py-0.5 text-[7px] font-mono font-black uppercase rounded tracking-wider border transition-all duration-200 ${
                    flightMode === m.id
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/60 shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                      : 'text-purple-300/60 border-transparent hover:text-purple-200 hover:bg-purple-950/20'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      */}
    </main>
  );
}

export default App;
