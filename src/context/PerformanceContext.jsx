import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const PerformanceContext = createContext({
  performanceMode: 'full', // 'full' | 'balanced' | 'lite'
  setPerformanceMode: () => {},
  isFull: true,
  isBalanced: false,
  isLite: false,
  detectedGpu: '',
});

// Detect GPU capabilities using WebGL context
const detectHardwareCapabilities = () => {
  if (typeof window === 'undefined') return { mode: 'full', renderer: '' };

  // 1. Auto-detect reduced motion preference -> default to lite
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return { mode: 'lite', renderer: 'prefers-reduced-motion' };

  // 2. Query WebGL renderer info for ThinkPads & integrated graphics
  let renderer = '';
  let isIntegratedGpu = false;
  let isSoftwareRenderer = false;
  let isDedicatedGpu = false;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      }
    }
  } catch (e) {
    // WebGL disabled or blocked
    isIntegratedGpu = true;
  }

  const rLower = renderer.toLowerCase();

  // Check for software renderers or fallback drivers
  if (rLower.includes('swiftshader') || rLower.includes('llvmpipe') || rLower.includes('software') || rLower.includes('basic render')) {
    isSoftwareRenderer = true;
  }

  // Check for dedicated GPUs (Nvidia RTX/GTX, AMD Radeon RX, Apple Silicon dGPUs)
  if (rLower.includes('nvidia') || rLower.includes('geforce') || rLower.includes('rtx') || rLower.includes('gtx') || rLower.includes('quadro') || (rLower.includes('radeon') && (rLower.includes('rx') || rLower.includes('pro')))) {
    isDedicatedGpu = true;
  }

  // Check for integrated graphics (Intel HD/UHD/Iris/Xe, AMD Radeon Graphics on ThinkPads & laptops)
  if (rLower.includes('intel') || rLower.includes('hd graphics') || rLower.includes('uhd') || rLower.includes('iris') || (rLower.includes('radeon') && !isDedicatedGpu)) {
    isIntegratedGpu = true;
  }

  // 3. Hardware metrics: Logical CPU cores, device RAM, screen viewport
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8; // GB RAM
  const isSmallScreen = window.innerWidth < 1024;
  const isHighDpi = window.devicePixelRatio > 1.5;

  // Software renderer or extreme low memory -> Lite Mode
  if (isSoftwareRenderer || memory <= 2 || cores <= 2) {
    return { mode: 'lite', renderer };
  }

  // ThinkPad / Laptop Integrated GPU (Intel UHD/Iris, AMD Radeon) or Mobile/Tablet screen -> Balanced Mode
  if ((isIntegratedGpu && !isDedicatedGpu) || isSmallScreen || memory <= 4 || cores <= 4 || (isIntegratedGpu && isHighDpi)) {
    return { mode: 'balanced', renderer };
  }

  // Dedicated GPU & Desktop -> Cinematic (Full) Mode
  return { mode: 'full', renderer };
};

export const PerformanceProvider = ({ children }) => {
  const [performanceMode, setPerformanceModeState] = useState(() => {
    if (typeof window === 'undefined') return 'full';

    // Only load saved preference if user explicitly clicked the mode switcher pill
    const userOverridden = localStorage.getItem('portfolio_user_set_mode');
    const saved = localStorage.getItem('portfolio_perf_mode');
    if (userOverridden === 'true' && saved && ['full', 'balanced', 'lite'].includes(saved)) {
      return saved;
    }

    // Run hardware detection
    const { mode } = detectHardwareCapabilities();
    return mode;
  });

  const [detectedGpu] = useState(() => {
    const { renderer } = detectHardwareCapabilities();
    return renderer;
  });

  const setPerformanceMode = (mode) => {
    if (['full', 'balanced', 'lite'].includes(mode)) {
      setPerformanceModeState(mode);
      localStorage.setItem('portfolio_perf_mode', mode);
      localStorage.setItem('portfolio_user_set_mode', 'true');
    }
  };

  // Dynamic FPS Monitoring: Step down automatically if FPS drops below threshold on ThinkPads
  const fpsWindowRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only monitor FPS if user has not manually set a mode preference
    const userOverridden = localStorage.getItem('portfolio_user_set_mode') === 'true';
    if (userOverridden) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const checkFps = (now) => {
      const delta = now - lastTime;
      frameCount++;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / delta);
        fpsWindowRef.current.push(currentFps);

        // Keep last 3 seconds
        if (fpsWindowRef.current.length > 3) {
          fpsWindowRef.current.shift();
        }

        const avgFps = fpsWindowRef.current.reduce((a, b) => a + b, 0) / fpsWindowRef.current.length;

        // Auto step down if average FPS drops on laptop hardware
        if (performanceMode === 'full' && avgFps < 38) {
          setPerformanceModeState('balanced');
          localStorage.setItem('portfolio_perf_mode', 'balanced');
        } else if (performanceMode === 'balanced' && avgFps < 24) {
          setPerformanceModeState('lite');
          localStorage.setItem('portfolio_perf_mode', 'lite');
        }

        frameCount = 0;
        lastTime = now;
      }

      animFrameRef.current = requestAnimationFrame(checkFps);
    };

    animFrameRef.current = requestAnimationFrame(checkFps);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [performanceMode]);

  const isFull = performanceMode === 'full';
  const isBalanced = performanceMode === 'balanced';
  const isLite = performanceMode === 'lite';

  return (
    <PerformanceContext.Provider
      value={{
        performanceMode,
        setPerformanceMode,
        isFull,
        isBalanced,
        isLite,
        detectedGpu,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformanceMode = () => useContext(PerformanceContext);
