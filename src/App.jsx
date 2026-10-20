import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
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
import { UFOCatSpaceship, GlobalSVGDefs } from './components/ui/UFOCatSpaceship';
import { InteractiveSpotlight } from './components/ui/InteractiveSpotlight';
import { warmImage, runWhenIdle } from './lib/assetWarmup';
import { SAKURA_BRANCH_SRC, ROTATING_EMBLEM_SRC, ABOUT_IMAGES } from './lib/artAssets';

// ================= ROUTE-LEVEL CODE SPLITTING =================
// Each page ships in its own chunk. They are all fetched in parallel right after Home's first paint,
// then each page is "warm-rendered" once off-screen (see WarmupHost), so the FIRST visit to a page is
// as fast as a repeat visit and its content animates in together with the landscape transition.
const loadAbout = () => import('./components/ui/AboutContent');
const loadProjects = () => import('./components/ui/ProjectsContent');
const loadContact = () => import('./components/ui/ContactContent');
const loadLotus = () => import('./components/ui/LotusWaterBody');
const loadMobileLotus = () => import('./components/ui/MobileLotusWaterBody');

const AboutContent = lazy(() => loadAbout().then((m) => ({ default: m.AboutContent })));
const ProjectsContent = lazy(() => loadProjects().then((m) => ({ default: m.ProjectsContent })));
const ContactContent = lazy(() => loadContact().then((m) => ({ default: m.ContactContent })));
const LotusWaterBody = lazy(() => loadLotus().then((m) => ({ default: m.LotusWaterBody })));
const ROUTE_LOADERS = { about: loadAbout, projects: loadProjects, contact: loadContact };

// Renders its children once (invisibly), waits two frames so React commits + the browser computes
// style/layout for them, then reports done. Pays the one-time "first mount" cost (JS compilation,
// lazy-component init, style resolution) while the user is still on Home.
const WarmupHost = ({ onDone, children }) => {
  useEffect(() => {
    let r2;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(onDone); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [onDone]);
  return children;
};

const MobileLotusWaterBody = lazy(() => loadMobileLotus().then((m) => ({ default: m.MobileLotusWaterBody })));


const FOREST_TRANSITION = { duration: 0.45, ease: [0.16, 1, 0.3, 1] };

// ================= GLOBAL FLOATING GUIDE CONTAINER =================
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

  // ---------- First-visit warm-up ----------
  // 1. ~300 ms after first paint: fetch every page chunk IN PARALLEL (tiny files, no idle waiting).
  // 2. Then, in idle slots: decode the heavy artwork and warm-render each page once, off-screen.
  const [warmPage, setWarmPage] = useState(null);
  const warmDoneRef = useRef(null);
  const visitedRef = useRef(new Set());
  useEffect(() => { visitedRef.current.add(activeSection); }, [activeSection]);

  const warmRender = useCallback((name) => new Promise((resolve) => {
    if (visitedRef.current.has(name) || window.innerWidth < 1024) { resolve(); return; }
    warmDoneRef.current = resolve;
    setWarmPage(name);
  }), []);

  const finishWarm = useCallback(() => {
    setWarmPage(null);
    const resolve = warmDoneRef.current;
    warmDoneRef.current = null;
    if (resolve) requestAnimationFrame(() => resolve());
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let cancelIdle = () => {};
    const t = setTimeout(() => {
      Promise.all([loadContact(), loadAbout(), loadProjects(), isMobile ? loadMobileLotus() : loadLotus()])
        .catch(() => {})
        .then(() => {
          cancelIdle = runWhenIdle([
            () => warmImage(ROTATING_EMBLEM_SRC),
            () => warmImage(SAKURA_BRANCH_SRC),
            () => warmRender('contact'),
            ...Object.values(ABOUT_IMAGES).map((src) => () => warmImage(src)),
            () => warmRender('about'),
            () => warmRender('projects'),
          ], 0);
        });
    }, 300);
    return () => { clearTimeout(t); cancelIdle(); };
  }, [warmRender]);

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
    const path = newSection === 'home' ? '/' : `/${newSection}`;
    const loader = ROUTE_LOADERS[newSection];
    // Make sure the page's code is there BEFORE switching, so the page content and the landscape
    // transition start in the same frame (instead of the landscape moving and the content popping in later).
    if (!loader) navigate(path);
    else loader().then(() => navigate(path), () => navigate(path));
  }, [isSmallViewport, navigate]);

  const showRecededLandscape = activeSection === 'about' || activeSection === 'contact' || activeSection === 'projects';

  // State for the global floating guide spaceship cat
  const [isSpaceshipSpawned, setIsSpaceshipSpawned] = useState(false);
  const [dialogueText, setDialogueText] = useState('');
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [isUFOHovered, setIsUFOHovered] = useState(false);
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

  // Spring-smoothed mouse positions (spotlight + constellation reveal)
  const { mouseX, mouseY, mouseXpx, mouseYpx } = useMouseParallax();

  // Mouse parallax on the landscape layers was removed (design decision, perf/optimization Phase 5).
  // The layers keep their original over-scale, so the composition at rest is unchanged.
  // The mouse still drives the pink spotlight and the constellation reveal.

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
            scale: 1.08
          }} 
          theme={theme}
        />
      </motion.div>

      {/* 3. Middle Layer Forest
          Kept mounted (not unmounted via AnimatePresence) so returning to Home reuses the already-rasterized
          layer instead of rebuilding + redrawing both full-screen forest SVGs in one frame (the About -> Home stall). */}
      <motion.div
        initial={false}
        animate={showRecededLandscape ? { opacity: 0, y: 350 } : { opacity: 1, y: 0 }}
        transition={FOREST_TRANSITION}
        aria-hidden={showRecededLandscape}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        {isMobileViewport ? (
          <MobileMidgroundTrees style={{ scale: 1.18 }} theme={theme} />
        ) : (
          <MidgroundTrees 
            style={{ 
              scale: 1.14
            }} 
            theme={theme}
          />
        )}
      </motion.div>
      
      {/* 4. Foreground Forest Floor (kept mounted, same reason as above) */}
      <motion.div
        initial={false}
        animate={showRecededLandscape ? { opacity: 0, y: 450 } : { opacity: 1, y: 0 }}
        transition={FOREST_TRANSITION}
        aria-hidden={showRecededLandscape}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        {isMobileViewport ? (
          <MobileForegroundTrees style={{ scale: 1.20 }} theme={theme} />
        ) : (
          <ForegroundTrees 
            style={{ 
              scale: 1.18
            }} 
            theme={theme}
          />
        )}
      </motion.div>

      {/* 5. Interactive Pink Spotlight (Performance-aware) */}
      <InteractiveSpotlight mouseXpx={mouseXpx} mouseYpx={mouseYpx} theme={theme} />

      {/* Serene Lotus Lake (Pops UP on Contact section, slides DOWN on return to Home) */}
      <AnimatePresence>
        {activeSection === 'contact' && (
          <Suspense key={isMobileViewport ? 'lotus-lake-mob' : 'lotus-lake'} fallback={null}>
            {isMobileViewport ? <MobileLotusWaterBody theme={theme} /> : <LotusWaterBody theme={theme} />}
          </Suspense>
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
                    <Suspense fallback={null}><AboutContent theme={theme} /></Suspense>
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
                    <Suspense fallback={null}><ProjectsContent theme={theme} /></Suspense>
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
                    <Suspense fallback={null}><ContactContent setActiveSection={handleSectionChange} theme={theme} onAvatarTrigger={handleAvatarTrigger} /></Suspense>
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

      {/* Off-screen, invisible one-time warm render of a page (see WarmupHost) */}
      {warmPage && (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ visibility: 'hidden', zIndex: -1, contain: 'strict' }}>
          <Suspense fallback={null}>
            <WarmupHost onDone={finishWarm}>
              {warmPage === 'about' && <AboutContent theme={theme} />}
              {warmPage === 'projects' && <ProjectsContent theme={theme} />}
              {warmPage === 'contact' && <ContactContent setActiveSection={() => {}} theme={theme} onAvatarTrigger={() => {}} />}
            </WarmupHost>
          </Suspense>
        </div>
      )}

      {/* 7. Global Floating Guide Spaceship Cat */}
      {isSpaceshipSpawned && activeSection !== 'experience' && (
        <FloatingUFOContainer
          activeSection={activeSection}
          isHovered={isUFOHovered}
          theme={theme}
          isDialogueVisible={isDialogueVisible}
          dialogueText={dialogueText}
          onHoverEnter={handleSpaceshipHoverEnter}
          onHoverLeave={handleSpaceshipHoverLeave}
        />
      )}

    </main>
  );
}

export default App;
