import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext({
  performanceMode: 'full', // 'full' | 'balanced' | 'lite'
  setPerformanceMode: () => {},
  isFull: true,
  isBalanced: false,
  isLite: false,
});

export const PerformanceProvider = ({ children }) => {
  const [performanceMode, setPerformanceModeState] = useState(() => {
    if (typeof window === 'undefined') return 'full';
    
    // Check saved user preference
    const saved = localStorage.getItem('portfolio_perf_mode');
    if (saved && ['full', 'balanced', 'lite'].includes(saved)) {
      return saved;
    }

    // Auto-detect reduced motion preference -> default to lite
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return 'lite';

    // Auto-detect low hardware concurrency (e.g. <= 4 logical CPU cores) or small mobile screen -> default to balanced/lite
    const concurrency = navigator.hardwareConcurrency || 4;
    const isSmallScreen = window.innerWidth < 768;

    if (concurrency <= 2) return 'lite';
    if (concurrency <= 4 || isSmallScreen) return 'balanced';

    return 'full';
  });

  const setPerformanceMode = (mode) => {
    if (['full', 'balanced', 'lite'].includes(mode)) {
      setPerformanceModeState(mode);
      localStorage.setItem('portfolio_perf_mode', mode);
    }
  };

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
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformanceMode = () => useContext(PerformanceContext);
