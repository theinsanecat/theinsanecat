import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const PerformanceContext = createContext({
  performanceMode: 'full', // 'full' (Cinematic) | 'balanced' | 'lite'
  setPerformanceMode: () => {},
  isFull: true,
  isBalanced: false,
  isLite: false,
  detectedGpu: '',
});

const MODES = ['full', 'balanced', 'lite'];

/*
 * One-time hardware probe.
 *  - `failIfMajorPerformanceCaveat: true` makes the browser refuse a WebGL context when it would be
 *    software-rendered (GPU blocklisted, hardware acceleration switched off, VMs / remote desktops).
 *    If that fails but a normal context works, the machine is drawing in software -> Lite.
 *  - No WebGL at all almost always means hardware acceleration is off -> Lite.
 *    (Previously this case produced an empty renderer string and could end up in Cinematic.)
 */
const detectHardwareCapabilities = () => {
  if (typeof window === 'undefined') return { mode: 'full', renderer: '' };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { mode: 'lite', renderer: 'prefers-reduced-motion' };
  }

  let renderer = '';
  let softwareRendering = false;
  let noWebGL = false;

  try {
    const fastGl = document.createElement('canvas').getContext('webgl', { failIfMajorPerformanceCaveat: true });
    let gl = fastGl;
    if (!fastGl) {
      const c = document.createElement('canvas');
      gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl) softwareRendering = true;
      else noWebGL = true;
    }
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      gl.getExtension('WEBGL_lose_context')?.loseContext(); // free the probe context right away
    }
  } catch {
    noWebGL = true;
  }

  const r = renderer.toLowerCase();
  if (/swiftshader|llvmpipe|software|basic render|microsoft basic/.test(r)) softwareRendering = true;

  const isDedicatedGpu = /nvidia|geforce|rtx|gtx|quadro/.test(r) || (r.includes('radeon') && /\brx\b|\bpro\b/.test(r));
  const isIntegratedGpu = !isDedicatedGpu && /intel|hd graphics|uhd|iris|radeon|vega/.test(r);

  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8; // GB (Chromium only; capped at 8)
  const isSmallScreen = window.innerWidth < 1024;
  const isHighDpi = window.devicePixelRatio > 1.5;

  // No GPU acceleration, or very weak hardware -> Lite
  if (noWebGL || softwareRendering || memory <= 2 || cores <= 2) {
    return { mode: 'lite', renderer: renderer || (noWebGL ? 'no-webgl' : 'software') };
  }

  // Integrated graphics (ThinkPads, office laptops), tablets, 4-core / 4 GB machines -> Balanced
  if (isIntegratedGpu || isSmallScreen || memory <= 4 || cores <= 4 || (isIntegratedGpu && isHighDpi)) {
    return { mode: 'balanced', renderer };
  }

  // Dedicated GPUs and Apple Silicon -> Cinematic
  return { mode: 'full', renderer };
};

let cachedDetection = null;
const getDetection = () => (cachedDetection ??= detectHardwareCapabilities());

const readStoredMode = () => {
  try {
    const userOverridden = localStorage.getItem('portfolio_user_set_mode') === 'true';
    const saved = localStorage.getItem('portfolio_perf_mode');
    if (userOverridden && MODES.includes(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return null;
};

export const PerformanceProvider = ({ children }) => {
  const [performanceMode, setPerformanceModeState] = useState(() =>
    typeof window === 'undefined' ? 'full' : readStoredMode() || getDetection().mode
  );
  const [detectedGpu] = useState(() => (typeof window === 'undefined' ? '' : getDetection().renderer));

  const setPerformanceMode = useCallback((mode) => {
    if (!MODES.includes(mode)) return;
    setPerformanceModeState(mode);
    try {
      localStorage.setItem('portfolio_perf_mode', mode);
      localStorage.setItem('portfolio_user_set_mode', 'true');
    } catch {
      /* ignore */
    }
  }, []);

  // Expose the tier to CSS: html[data-perf="lite"] / "balanced" / "full" gates the heavy ambient animations.
  useEffect(() => {
    document.documentElement.dataset.perf = performanceMode;
  }, [performanceMode]);

  // Safety net: step DOWN (never up) if the device can't keep up in practice.
  // Guarded against false alarms: starts 2.5 s after load, ignores the 1.5 s after a page switch or tab
  // switch, discards samples after the tab was hidden, and needs 3 consecutive slow seconds.
  useEffect(() => {
    if (typeof window === 'undefined' || performanceMode === 'lite') return undefined;
    if (readStoredMode()) return undefined; // user chose a mode explicitly

    let raf = 0;
    let lastTime = 0;
    let frames = 0;
    let quietUntil = performance.now() + 2500;
    const samples = [];
    const quiet = () => { quietUntil = performance.now() + 1500; lastTime = 0; samples.length = 0; };
    window.addEventListener('hashchange', quiet);
    document.addEventListener('visibilitychange', quiet);

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now < quietUntil || document.hidden) return;
      if (!lastTime) { lastTime = now; frames = 0; return; }
      frames++;
      const delta = now - lastTime;
      if (delta < 1000) return;
      if (delta < 2000) samples.push((frames * 1000) / delta); // longer gap = throttled/background, skip
      frames = 0;
      lastTime = now;
      if (samples.length > 3) samples.shift();
      if (samples.length < 3) return;
      const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
      if (performanceMode === 'full' && avg < 38) setPerformanceModeState('balanced');
      else if (performanceMode === 'balanced' && avg < 24) setPerformanceModeState('lite');
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', quiet);
      document.removeEventListener('visibilitychange', quiet);
    };
  }, [performanceMode]);

  const value = useMemo(() => ({
    performanceMode,
    setPerformanceMode,
    isFull: performanceMode === 'full',
    isBalanced: performanceMode === 'balanced',
    isLite: performanceMode === 'lite',
    detectedGpu,
  }), [performanceMode, setPerformanceMode, detectedGpu]);

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};

export const usePerformanceMode = () => useContext(PerformanceContext);
