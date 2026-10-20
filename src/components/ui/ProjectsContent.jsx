import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoLoop } from './LogoLoop';
import { getPageFit } from '../../lib/pageFit';
import { FloatingBubbles } from './FloatingBubbles';
import angularLogo from '../../assets/tech/angular.svg';
import css3Logo from '../../assets/tech/css3.svg';
import html5Logo from '../../assets/tech/html5.svg';
import javascriptLogo from '../../assets/tech/javascript.svg';
import reactLogo from '../../assets/tech/react.svg';
import tailwindLogo from '../../assets/tech/tailwindcss.svg';
import typescriptLogo from '../../assets/tech/typescript.svg';
import viteLogo from '../../assets/tech/vitejs.svg';

// Self-hosted devicon logos (MIT, devicon@2.17.0): no external CDN requests
const logoImgProps = { width: 20, height: 20, decoding: 'async', draggable: false };

// ─── Interactive Project Details Modal Overlay ─────────────────────────────────
const ProjectDetailsModal = ({ project, onClose, theme }) => {
  const isLight = theme === 'light';
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop Overlay: no backdrop-blur on mobile (forces full-page GPU rasterization layer on WebKit) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 sm:backdrop-blur-xs transition-opacity duration-300 z-0"
          />

          {/* Modal Card Container (Expanded Card View) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative max-w-lg sm:max-w-xl w-full rounded-3xl p-5 sm:p-6 z-10 overflow-hidden border-2 ${isLight
              ? 'bg-white/95 border-pink-300 text-slate-900'
              : 'bg-[#0f0921]/95 border-purple-500/50 text-purple-100'
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
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Subtitle Badge & Title */}
            <div className="flex flex-col items-start mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border mb-1.5 ${isLight ? 'border-pink-400 bg-pink-100 text-pink-700' : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
                }`}>
                {project.subtitle}
              </span>
              <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${isLight ? 'text-[#1e1832]' : 'text-white'}`}>
                {project.title}
              </h2>
            </div>

            {/* Details Content Section */}
            <div className={`space-y-2.5 text-xs sm:text-[12.5px] leading-relaxed font-questrial font-medium text-left max-h-[58vh] overflow-y-auto pr-1.5 custom-scrollbar ${isLight ? 'text-slate-800' : 'text-purple-200/90'
              }`}>
              <p className="leading-relaxed">{project.description}</p>

              {project.fullDetails?.recognition && (
                <p className={`text-[10px] sm:text-[11px] font-bold leading-tight transition-colors duration-300 ${isLight ? 'text-amber-600' : 'text-yellow-400'
                  }`}>
                  {project.fullDetails.recognition}
                </p>
              )}

              {project.fullDetails?.purpose && (
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-pink-50/80 border-pink-200' : 'bg-pink-950/20 border-pink-500/20'}`}>
                  <h4 className="font-black text-[10px] uppercase tracking-wider text-pink-400 mb-1">Core Objectives & Focus</h4>
                  <p className="text-xs">{project.fullDetails.purpose}</p>
                </div>
              )}

              {project.fullDetails?.hardware && (
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-cyan-50/80 border-cyan-200' : 'bg-cyan-950/20 border-cyan-500/20'}`}>
                  <h4 className="font-black text-[10px] uppercase tracking-wider text-cyan-400 mb-1">Hardware & Power Efficiency</h4>
                  <p className="text-xs">{project.fullDetails.hardware}</p>
                </div>
              )}

              {project.fullDetails?.architecture && (
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/20'}`}>
                  <h4 className="font-black text-[10px] uppercase tracking-wider text-emerald-500 mb-1">System Architecture & IoT Telemetry</h4>
                  <p className="text-xs">{project.fullDetails.architecture}</p>
                </div>
              )}

              {project.fullDetails?.extensibility && (
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-indigo-50/80 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/20'}`}>
                  <h4 className="font-black text-[10px] uppercase tracking-wider text-indigo-400 mb-1">Extensibility & Commercial Applications</h4>
                  <p className="text-xs">{project.fullDetails.extensibility}</p>
                </div>
              )}

              {/* Case-study sections (frontend work) */}
              {project.sections?.map((sec, i) => {
                const tone = SECTION_TONES[i % SECTION_TONES.length];
                return (
                  <div key={sec.label} className={`p-3 rounded-xl border ${isLight ? tone.light : tone.dark}`}>
                    <h4 className={`font-black text-[10px] uppercase tracking-wider mb-1 ${tone.heading}`}>{sec.label}</h4>
                    <p className="text-xs">{sec.text}</p>
                  </div>
                );
              })}

              {/* Tech Badges */}
              <div className="pt-1">
                <h4 className="font-black text-[9.5px] uppercase tracking-wider text-slate-400 mb-1.5">{project.techLabel || 'Tech Stack & Frameworks'}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded border ${isLight ? 'border-pink-300 bg-pink-50 text-pink-800' : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                      }`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlay Footer Actions */}
            <div className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2.5 ${isLight ? 'border-purple-100' : 'border-white/10'}`}>
              <div className="flex items-center gap-2">
                {project.fullDetails?.githubUrl && (
                  <a
                    href={project.fullDetails.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 active:scale-95 cursor-pointer ${isLight
                      ? 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800 shadow-sm'
                      : 'bg-purple-950/80 text-cyan-300 border-cyan-500/40 hover:bg-purple-900 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                      }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub Repo</span>
                    <span>↗</span>
                  </a>
                )}
                {project.fullDetails?.liveUrl && (
                  <a
                    href={project.fullDetails.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <span>{project.fullDetails.liveLabel || 'Play Online'}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 cursor-pointer focus:outline-none active:scale-95 ${isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-purple-950/60 hover:bg-purple-900 border-purple-500/30 text-purple-200'
                  }`}
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ─── Visual Hero Image / Graphic Preview Component for Project Cards ───────────
const ProjectCardPreview = ({ projectId, isLight }) => {
  if (projectId === 1) {
    // 1. Automation of Farm Irrigation & Security (BE Capstone RAIT)
    return (
      <div className={`w-full h-full relative p-3 flex flex-col items-center justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200 text-emerald-950 border border-emerald-300'
        : 'bg-gradient-to-br from-emerald-950/80 via-teal-950/60 to-slate-950/80 text-emerald-200 border-none'
        }`}>
        <div className={`w-full flex items-center justify-between border-b pb-1 ${isLight ? 'border-emerald-300' : 'border-emerald-500/30'}`}>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
            <span className={`text-[7.5px] font-mono font-bold uppercase tracking-widest ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>IoT TELEMETRY</span>
          </div>
          <span className={`text-[7px] font-mono font-bold ${isLight ? 'text-emerald-800' : 'text-teal-300'}`}>RAIT CAPSTONE</span>
        </div>

        <div className="w-full flex-1 flex items-center justify-around relative z-10 my-1">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center ${isLight ? 'border-emerald-400 bg-white/90 shadow-sm' : 'border-emerald-400/60 bg-emerald-500/20'}`}>
              <svg className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18" />
              </svg>
            </div>
            <span className={`text-[7.5px] font-mono font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-200'}`}>Soil Moisture</span>
          </div>

          <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${isLight ? 'border-emerald-400' : 'border-teal-400/60'}`}>
            <div className={`w-3 h-3 rounded-full animate-pulse ${isLight ? 'bg-emerald-500' : 'bg-teal-400/60'}`} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center ${isLight ? 'border-emerald-400 bg-white/90 shadow-sm' : 'border-teal-400/60 bg-teal-500/20'}`}>
              <svg className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-teal-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className={`text-[7.5px] font-mono font-bold ${isLight ? 'text-emerald-900' : 'text-teal-200'}`}>ML Security</span>
          </div>
        </div>

        <div className={`w-full flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${isLight ? 'border-emerald-300 text-emerald-950' : 'border-emerald-500/20 text-emerald-300/90'}`}>
          <span>IRRIGATION: AUTOMATED</span>
          <span className={`font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>STATUS: ACTIVE</span>
        </div>
      </div>
    );
  }

  if (projectId === 2) {
    // 2. Smart Mirror & Daily Assistant (60-Hr IoT Workshop RAIT)
    return (
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 text-sky-950 border border-sky-300'
        : 'bg-gradient-to-br from-sky-950/80 via-slate-900/70 to-blue-950/80 text-sky-200 border-none'
        }`}>
        <div className={`flex items-center justify-between border-b pb-1 ${isLight ? 'border-sky-300' : 'border-sky-500/30'}`}>
          <span className={`text-[7.5px] font-mono font-bold tracking-wider uppercase ${isLight ? 'text-sky-900' : 'text-cyan-300'}`}>08:45 AM • MON</span>
          <span className={`text-[7.5px] font-mono font-bold ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>28°C Sunny</span>
        </div>

        <div className={`my-auto text-center px-2 py-1.5 rounded-lg border backdrop-blur-sm ${isLight ? 'bg-white/90 border-sky-300 shadow-sm' : 'bg-sky-500/15 border-sky-400/40'
          }`}>
          <p className={`text-[9px] font-bold tracking-tight leading-tight ${isLight ? 'text-sky-950' : 'text-cyan-100'}`}>
            "You Look Radiant Today ✨"
          </p>
        </div>

        <div className={`flex items-center justify-between text-[7.5px] font-mono pt-1 border-t ${isLight ? 'border-sky-300 text-sky-950' : 'border-sky-500/20 text-sky-300/90'}`}>
          <span>PIR MOTION DETECTOR</span>
          <span className={`font-bold ${isLight ? 'text-sky-800' : 'text-cyan-400'}`}>2-MIN POWER SAVER</span>
        </div>
      </div>
    );
  }

  if (projectId === 3) {
    // 3. Square-Up Game Logo & Real-time Grid
    return (
      <div className={`w-full h-full relative p-2.5 flex flex-col items-center justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 text-purple-950 border border-pink-300'
        : 'bg-gradient-to-br from-pink-950/80 via-purple-950/70 to-slate-950/80 text-purple-200 border-none'
        }`}>
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${isLight ? 'bg-white/90 border-pink-300 shadow-sm' : 'bg-pink-500/20 border-pink-400/40'
          }`}>
          <div className="w-2 h-2 rounded bg-pink-500 shadow-[0_0_6px_rgba(236,72,153,0.8)]" />
          <span className={`text-[8px] font-mono font-black tracking-widest uppercase ${isLight ? 'text-pink-950' : 'text-pink-200'}`}>SQUARE-UP</span>
          <div className="w-2 h-2 rounded-full bg-purple-500" />
        </div>

        <div className={`relative w-32 h-14 border rounded-lg p-1.5 flex items-center justify-around ${isLight ? 'bg-white/90 border-pink-300 shadow-sm' : 'bg-purple-950/40 border-purple-500/40'
          }`}>
          <div className={`absolute inset-[8px] border rounded ${isLight ? 'border-pink-400 bg-pink-100/60' : 'border-cyan-400/70 bg-cyan-500/15'
            }`} />

          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.9)] z-10" />
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.9)] z-10" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.9)] z-10" />
        </div>

        <div className={`w-full flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${isLight ? 'border-pink-300 text-purple-950' : 'border-purple-500/20 text-purple-300/90'
          }`}>
          <span>DELAUNAY TRIANGULATION</span>
          <span className={`font-bold ${isLight ? 'text-pink-800' : 'text-pink-400'}`}>2-PLAYER REALTIME</span>
        </div>
      </div>
    );
  }

  if (projectId === 4) {
    // 4. Indian ALPR & RTSP Vision Pipeline (BITS Pilani Dissertation)
    return (
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 text-amber-950 border border-amber-300'
        : 'bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 text-amber-200 border-none'
        }`}>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-b pb-1 ${isLight ? 'border-amber-300 text-amber-950' : 'border-amber-500/30 text-amber-300'
          }`}>
          <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>RTSP STREAM CAM #01</span>
          <span className={`font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>98% DETECTION</span>
        </div>

        <div className={`my-auto p-1.5 rounded border relative flex items-center justify-between ${isLight ? 'bg-white/90 border-amber-400 shadow-sm' : 'bg-emerald-500/15 border-emerald-400/80'
          }`}>
          <div className="flex items-center gap-1">
            <span className={`text-[7.5px] font-mono font-black px-1.5 py-0.5 rounded border ${isLight ? 'bg-amber-100 text-amber-950 border-amber-400' : 'bg-black/70 text-amber-300 border-amber-400/40'
              }`}>
              MH 12 AB 1234
            </span>
            <span className={`text-[7px] font-mono font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>[YOLOv8: 98%]</span>
          </div>
          <span className={`text-[7px] font-mono font-bold ${isLight ? 'text-sky-900' : 'text-cyan-300'}`}>[OCR: 95.2%]</span>
        </div>

        <div className={`flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${isLight ? 'border-amber-300 text-amber-950' : 'border-amber-500/20 text-amber-200/90'
          }`}>
          <span>BITS PILANI DISSERTATION</span>
          <span className={`font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>INDIAN PLATES</span>
        </div>
      </div>
    );
  }

  if (projectId === 101) {
    // JET Designs component library (Jio Platforms)
    return (
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-violet-100 via-fuchsia-50 to-violet-200 text-violet-950 border border-violet-300'
        : 'bg-gradient-to-br from-violet-950/80 via-fuchsia-950/50 to-slate-950/80 text-violet-200 border-none'
        }`}>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-b pb-1 ${isLight ? 'border-violet-300' : 'border-violet-500/30'}`}>
          <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-violet-900' : 'text-violet-300'}`}>JET DESIGNS</span>
          <span className={`font-bold ${isLight ? 'text-fuchsia-800' : 'text-fuchsia-300'}`}>UI LIBRARY</span>
        </div>
        <div className="my-auto flex items-center justify-center gap-2">
          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${isLight ? 'bg-violet-600 text-white' : 'bg-violet-600 text-white'}`}>Button</span>
          <span className={`flex items-center gap-1 text-[7.5px] font-mono font-bold ${isLight ? 'text-violet-950' : 'text-violet-100'}`}>
            <span className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center text-[6px] ${isLight ? 'border-violet-600 bg-violet-600 text-white' : 'border-violet-400 bg-violet-500 text-white'}`}>✓</span>
            Check
          </span>
          <span className={`text-[7.5px] font-mono px-1.5 py-0.5 rounded border ${isLight ? 'bg-white/90 border-violet-300 text-violet-900' : 'bg-white/5 border-violet-400/40 text-violet-200'}`}>Select ▾</span>
        </div>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${isLight ? 'border-violet-300 text-violet-950' : 'border-violet-500/20 text-violet-200/90'}`}>
          <span className="flex items-center gap-1">
            THEMES
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
            <span className="w-2 h-2 rounded-full bg-sky-500" />
          </span>
          <span className={`font-bold ${isLight ? 'text-fuchsia-800' : 'text-fuchsia-300'}`}>30% FASTER</span>
        </div>
      </div>
    );
  }

  if (projectId === 102) {
    // Forex banking platform (Infosys, client anonymised)
    return (
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 text-indigo-950 border border-indigo-300'
        : 'bg-gradient-to-br from-indigo-950/80 via-slate-900/70 to-blue-950/80 text-indigo-200 border-none'
        }`}>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-b pb-1 ${isLight ? 'border-indigo-300' : 'border-indigo-500/30'}`}>
          <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-indigo-900' : 'text-indigo-300'}`}>FX PORTAL</span>
          <span className={`font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>● LIVE</span>
        </div>
        <div className="my-auto grid grid-cols-3 gap-1">
          {['LAYOUT', 'MODULE', 'MODULE'].map((t, i) => (
            <span key={i} className={`text-[6.5px] font-mono font-bold text-center py-1.5 rounded border ${isLight ? 'bg-white/90 border-indigo-300 text-indigo-900' : 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200'} ${i === 0 ? 'row-span-2 flex items-center justify-center' : ''}`}>{t}</span>
          ))}
          <span className={`col-span-2 text-[6.5px] font-mono font-bold text-center py-1 rounded border border-dashed ${isLight ? 'border-indigo-400 text-indigo-800' : 'border-indigo-400/50 text-indigo-300'}`}>RENDERED AT RUNTIME</span>
        </div>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${isLight ? 'border-indigo-300 text-indigo-950' : 'border-indigo-500/20 text-indigo-200/90'}`}>
          <span>DYNAMIC RENDERING</span>
          <span className={`font-bold ${isLight ? 'text-indigo-800' : 'text-indigo-300'}`}>HIGH AVAILABILITY</span>
        </div>
      </div>
    );
  }

  if (projectId === 103) {
    // This portfolio's performance work
    return (
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isLight
        ? 'bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 text-rose-950 border border-rose-300'
        : 'bg-gradient-to-br from-rose-950/80 via-purple-950/60 to-slate-950/80 text-rose-200 border-none'
        }`}>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-b pb-1 ${isLight ? 'border-rose-300' : 'border-rose-500/30'}`}>
          <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>PERF BENCH</span>
          <span className={`font-bold ${isLight ? 'text-rose-800' : 'text-rose-300'}`}>6× CPU · NO GPU</span>
        </div>
        <div className="my-auto flex flex-col gap-1">
          {[['BEFORE', '4 fps', '9%', isLight ? 'bg-rose-300' : 'bg-rose-400/50'], ['AFTER', '42 fps', '100%', isLight ? 'bg-emerald-500' : 'bg-emerald-400']].map(([k, v, w, c]) => (
            <div key={k} className="flex items-center gap-1.5 text-[7px] font-mono font-bold">
              <span className="w-9 shrink-0">{k}</span>
              <span className={`h-1.5 rounded-full ${c}`} style={{ width: w, maxWidth: '62%' }} />
              <span className="shrink-0">{v}</span>
            </div>
          ))}
        </div>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${isLight ? 'border-rose-300 text-rose-950' : 'border-rose-500/20 text-rose-200/90'}`}>
          <span>4.2 MB → 1.4 MB</span>
          <span className={`font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>0 CDN CALLS</span>
        </div>
      </div>
    );
  }

  return null;
};

// Colours for the case-study sections in the details modal
const SECTION_TONES = [
  { light: 'bg-pink-50/80 border-pink-200', dark: 'bg-pink-950/20 border-pink-500/20', heading: 'text-pink-400' },
  { light: 'bg-cyan-50/80 border-cyan-200', dark: 'bg-cyan-950/20 border-cyan-500/20', heading: 'text-cyan-500' },
  { light: 'bg-emerald-50/80 border-emerald-200', dark: 'bg-emerald-950/20 border-emerald-500/20', heading: 'text-emerald-500' },
  { light: 'bg-indigo-50/80 border-indigo-200', dark: 'bg-indigo-950/20 border-indigo-500/20', heading: 'text-indigo-400' },
  { light: 'bg-amber-50/80 border-amber-200', dark: 'bg-amber-950/20 border-amber-500/20', heading: 'text-amber-500' },
];

// Frontend work: case studies from my day job, plus this site's performance story
const workData = [
  {
    id: 101,
    title: "JET Designs: Jio's Enterprise UI Library",
    subtitle: "Frontend Team Lead, Jio Platforms",
    shortTitle: "JET Designs UI Library",
    shortSubtitle: "Jio Platforms",
    description: "A unified UI library I built and published at Jio. It is used across Jio's enterprise applications, including JioWorks, JioCampaigns, JioFace and JioMiddleware.",
    sections: [
      { label: "The Goal", text: "Give Jio's enterprise products one shared, consistent set of UI building blocks, so teams could build screens faster instead of each rebuilding the same inputs, dropdowns and headers." },
      { label: "What I Built", text: "The initial setup took three months and covers the basics you'd expect from a library like Material UI. Inputs: text fields, textareas, checkboxes, radios, toggle switches, dropdowns, multi-selects, search, date pickers and sliders. Feedback: modals, toasts, tooltips and loaders. Data display: tables, cards, chips and badges. Plus buttons, headers, icons and custom scrollbars." },
      { label: "How Teams Use It", text: "Components are built with HTML, CSS and JavaScript. Developers integrate one by adding the code and APIs documented on the library's website." },
      { label: "Design Decisions", text: "Three themes, primary, secondary and tertiary, are built into every component, so every product stays visually consistent." },
      { label: "Adoption & Impact", text: "Hosted internally at Jio and consumed by its enterprise applications, including JioWorks, JioCampaigns, JioFace and JioMiddleware. Feature delivery became 30% faster. jioworks.io is built with it." },
    ],
    fullDetails: { liveUrl: "https://www.jioworks.io", liveLabel: "See JioWorks" },
    tech: ["HTML", "CSS", "JavaScript", "Theming", "Angular", "React"],
    glow: "from-violet-500 to-fuchsia-600",
    metrics: "30% Faster",
    lightBg: "bg-gradient-to-b from-[#ddd6fe] via-[#ede9fe] to-[#ddd6fe] border border-violet-400 shadow-md shadow-violet-900/10 group-hover:border-violet-500 group-hover:shadow-violet-400/20",
    lightPreviewBg: "bg-white/80 border border-violet-300",
    lightSubtitle: "text-violet-800",
    lightBadge: "bg-white/90 border border-violet-300 text-violet-950 font-black",
    lightMetrics: "bg-white border border-violet-300 text-violet-950 font-black",
    lightAccent: "border-violet-300"
  },
  {
    id: 102,
    title: "Forex Platform for a Leading Indian Bank",
    subtitle: "Senior Software Developer, Infosys",
    shortTitle: "Enterprise Forex Banking",
    shortSubtitle: "Infosys",
    description: "Frontend work on a high-availability forex banking portal: dynamic rendering, ownership of production issues, and FX trading features shipped within strict financial compliance.",
    sections: [
      { label: "The Challenge", text: "A high-availability banking portal with hard-coded layout dependencies, intermittent production bugs that were hard to pin down, and strict financial web compliance on every release." },
      { label: "What I Did", text: "Architected dynamic rendering patterns across the portal, decoupling the hard-coded layout dependencies and making it far more modular." },
      { label: "Ownership", text: "I lead cross-functional triage of complex, intermittent production bugs, reducing time to recovery and improving availability for enterprise clients." },
      { label: "Delivery", text: "I ship enterprise FX trading features with product managers and distributed engineering teams, while keeping to strict financial compliance." },
    ],
    techLabel: "Focus Areas",
    tech: ["Dynamic Rendering", "Modular Layouts", "Production Triage", "FX Trading", "Compliance"],
    glow: "from-indigo-500 to-blue-600",
    metrics: "High Availability",
    lightBg: "bg-gradient-to-b from-[#c7d2fe] via-[#e0e7ff] to-[#c7d2fe] border border-indigo-400 shadow-md shadow-indigo-900/10 group-hover:border-indigo-500 group-hover:shadow-indigo-400/20",
    lightPreviewBg: "bg-white/80 border border-indigo-300",
    lightSubtitle: "text-indigo-800",
    lightBadge: "bg-white/90 border border-indigo-300 text-indigo-950 font-black",
    lightMetrics: "bg-white border border-indigo-300 text-indigo-950 font-black",
    lightAccent: "border-indigo-300"
  },
  {
    id: 103,
    title: "Making This Portfolio Smooth on Low-End Laptops",
    subtitle: "This Website",
    shortTitle: "This Portfolio's Performance",
    shortSubtitle: "This Website",
    description: "This animated scene ran smoothly on a MacBook but stuttered on an office laptop with integrated graphics. I made it smooth without redesigning or removing a single element.",
    sections: [
      { label: "The Problem", text: "Images loaded late, the emblem glitched and the sakura branch popped in. With the mouse moving, the home page ran at 4 fps, because SVG masks, live filters and animations inside SVGs forced large repaints on every frame." },
      { label: "What I Changed", text: "Re-encoded the heaviest artwork (a 2.2 MB SVG branch became a 51 KB WebP, pixel-checked against the original), decoded images in idle time, split the code per page and pre-rendered pages invisibly, and moved animation onto GPU layers instead of repainting SVG." },
      { label: "Performance Tiers", text: "The site picks Cinematic, Balanced or Lite from what the device's graphics can really do, with a frame-rate safety net. Lite keeps every element on screen and only stops continuous background motion." },
      { label: "Results", text: "Measured with the CPU slowed 6× and no GPU: Home with the mouse moving went from 4 to 42 fps, Contact from 3 to 44 fps. A full tour of the site went from 4.2 MB to 1.4 MB, with no external CDN requests left. Size budgets and a frame-rate bench guard it on every push." },
    ],
    fullDetails: { liveUrl: "https://github.com/theinsanecat/theinsanecat/blob/main/PERFORMANCE.md", liveLabel: "Full write-up" },
    tech: ["React", "Framer Motion", "Vite", "Web Performance", "GPU Compositing", "Playwright"],
    glow: "from-rose-500 to-pink-600",
    metrics: "4 → 42 fps",
    lightBg: "bg-gradient-to-b from-[#fecdd3] via-[#ffe4e6] to-[#fecdd3] border border-rose-400 shadow-md shadow-rose-900/10 group-hover:border-rose-500 group-hover:shadow-rose-400/20",
    lightPreviewBg: "bg-white/80 border border-rose-300",
    lightSubtitle: "text-rose-800",
    lightBadge: "bg-white/90 border border-rose-300 text-rose-950 font-black",
    lightMetrics: "bg-white border border-rose-300 text-rose-950 font-black",
    lightAccent: "border-rose-300"
  },
];

const projectsData = [
  {
    id: 1,
    title: "Automation of Irrigation and Security of Farm by using IoT and Machine Learning",
    subtitle: "B.E. Final Year Capstone Project (RAIT)",
    // Card face uses the short versions (no truncation); the details modal shows the full title
    shortTitle: "Smart Irrigation & Farm Security",
    shortSubtitle: "B.E. Capstone (RAIT)",
    description: "An IoT and Machine Learning system engineered to modernize agricultural practices, automate smart sensor-driven crop irrigation, and enforce field intrusion security.",
    fullDetails: {
      purpose: "Modernizing agricultural practices, eliminating manual labor for farmers, and securing agricultural fields through automated sensor telemetry and Machine Learning models.",
      architecture: "Soil moisture and environmental IoT sensor arrays connected to field controllers, processing real-time telemetry for automated water valve control and ML-driven motion/intrusion detection."
    },
    tech: ["IoT Sensors", "Machine Learning", "Python", "Raspberry Pi", "Embedded AI"],
    glow: "from-emerald-500 to-teal-600",
    metrics: "B.E. Capstone",
    lightBg: "bg-gradient-to-b from-[#a7f3d0] via-[#d1fae5] to-[#a7f3d0] border border-emerald-400 shadow-md shadow-emerald-900/10 group-hover:border-emerald-500 group-hover:shadow-emerald-400/20",
    lightPreviewBg: "bg-white/80 border border-emerald-300",
    lightSubtitle: "text-emerald-800",
    lightBadge: "bg-white/90 border border-emerald-300 text-emerald-950 font-black",
    lightMetrics: "bg-white border border-emerald-300 text-emerald-950 font-black",
    lightAccent: "border-emerald-300"
  },
  {
    id: 2,
    title: "Smart Mirror & Daily Assistant",
    subtitle: "60-Hour Intensive IoT Workshop (RAIT)",
    // Card face uses the short versions (no truncation); the details modal shows the full title
    shortTitle: "Smart Mirror & Daily Assistant",
    shortSubtitle: "IoT Workshop (RAIT)",
    description: "A Raspberry Pi-powered two-way glass mirror displaying real-time weather forecasts via OpenWeatherMap API, news, schedules, self-esteem compliments, and PIR motion power saving.",
    fullDetails: {
      recognition: "Recognized as a potential campus-wide upgrade to college mirrors by Principal Sir at RAIT.",
      purpose: "Provide essential daily information: time, date, weather, news, and calendar schedules at a single location to simplify daily routines while boosting user self-esteem with personalized compliments.",
      hardware: "Raspberry Pi, 2-Way Glass Mirror, Monitor encased in a custom wooden frame, PIR Motion Sensor interfaced via a relay unit for 2-minute auto power-down energy efficiency.",
      extensibility: "125+ module integrations available including Google Assistant, touchscreen display upgrades, and commercial retail/coffee shop client engagement."
    },
    tech: ["Raspberry Pi", "PIR Motion Sensor", "Python API", "OpenWeatherMap", "Relay Control"],
    glow: "from-cyan-500 to-blue-600",
    metrics: "60-Hr Workshop",
    lightBg: "bg-gradient-to-b from-[#bae6fd] via-[#e0f2fe] to-[#bae6fd] border border-sky-400 shadow-md shadow-sky-900/10 group-hover:border-sky-500 group-hover:shadow-sky-400/20",
    lightPreviewBg: "bg-white/80 border border-sky-300",
    lightSubtitle: "text-sky-700",
    lightBadge: "bg-white/90 border border-sky-300 text-sky-950 font-black",
    lightMetrics: "bg-white border border-sky-300 text-sky-950 font-black",
    lightAccent: "border-sky-300"
  },
  {
    id: 3,
    title: "Square-Up",
    subtitle: "Real-Time 2-Player Web Game",
    description: "A real-time, two-player online web game where players compete to connect dots, complete enclosed shapes (squares or triangles), and claim the board with personal stamps.",
    fullDetails: {
      githubUrl: "https://github.com/theinsanecat/square-up",
      purpose: "A modern, real-time multiplayer twist on classic dot-connection games. Players join via a generated 6-letter room code, select custom player markers & color palettes (purple, pink, yellow, blue, green) and custom stamp icons (heart, star, flower, diamond).",
      modes: "Square Mode (structured grid for 4-sided squares) and Triangle Mode (dynamic random dot pattern connected via Delaunay triangulation). Features Small, Medium, and Big board sizes with bonus turns awarded for closing shapes."
    },
    tech: ["React", "WebSockets", "Delaunay Triangulation", "TailwindCSS", "Vercel"],
    glow: "from-pink-500 to-purple-600",
    metrics: "GitHub Repo",
    lightBg: "bg-gradient-to-b from-[#fbcfe8] via-[#fce7f3] to-[#fbcfe8] border border-pink-400 shadow-md shadow-pink-900/10 group-hover:border-pink-500 group-hover:shadow-pink-400/20",
    lightPreviewBg: "bg-white/80 border border-pink-300",
    lightSubtitle: "text-pink-700",
    lightBadge: "bg-white/90 border border-pink-300 text-pink-950 font-black",
    lightMetrics: "bg-white border border-pink-300 text-pink-950 font-black",
    lightAccent: "border-pink-300"
  },
  {
    id: 4,
    title: "Real-Time Automatic License Plate Recognition System for Indian Vehicles",
    subtitle: "Dissertation Project (BITS Pilani)",
    // Card face uses the short versions (no truncation); the details modal shows the full title
    shortTitle: "Licence Plate Recognition (ALPR)",
    shortSubtitle: "Dissertation (BITS Pilani)",
    description: "A custom real-time Automatic License Plate Recognition (ALPR) system optimized for Indian road complexities, non-standard scripts/fonts, YOLOv8 Nano detection, and custom OCR pipeline.",
    fullDetails: {
      institution: "BITS Pilani (M.Tech / M.S. Dissertation)",
      purpose: "Overcoming limitations of commercial ALPR systems (like OpenALPR) which struggle on Indian license plate formats, diverse regional scripts, BH series/diplomatic plates, non-standard fonts, and harsh lighting/weather.",
      architecture: "Fine-tuned YOLOv8 Nano model achieving 98% license plate detection accuracy, coupled with a custom OCR model achieving 95.2% character recognition accuracy (93.3% overall pipeline performance on in-the-wild RTSP streams).",
      extensibility: "Designed for real-time law enforcement, automated parking management, toll automation, and intelligent traffic telemetry across India."
    },
    tech: ["YOLOv8 Nano", "PyTorch", "Computer Vision", "OCR / OpenCV", "RTSP Streaming", "Python"],
    glow: "from-amber-500 to-orange-600",
    metrics: "BITS Dissertation",
    lightBg: "bg-gradient-to-b from-[#fef08a] via-[#fef9c3] to-[#fef08a] border border-amber-400 shadow-md shadow-amber-900/10 group-hover:border-amber-500 group-hover:shadow-amber-400/20",
    lightPreviewBg: "bg-white/80 border border-amber-300",
    lightSubtitle: "text-amber-800",
    lightBadge: "bg-white/90 border border-amber-300 text-amber-950 font-black",
    lightMetrics: "bg-white border border-amber-300 text-amber-950 font-black",
    lightAccent: "border-amber-300"
  }
];

const getTechLogos = (isLight) => [
  {
    name: "REACT",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={reactLogo}
          alt="React"
          className="w-5 h-5 shrink-0 object-contain"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>REACT</span>
      </div>
    )
  },
  {
    name: "JAVASCRIPT",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={javascriptLogo}
          alt="JavaScript"
          className="w-5 h-5 shrink-0 object-contain rounded-sm"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>JAVASCRIPT</span>
      </div>
    )
  },
  {
    name: "TYPESCRIPT",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={typescriptLogo}
          alt="TypeScript"
          className="w-5 h-5 shrink-0 object-contain rounded-sm"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>TYPESCRIPT</span>
      </div>
    )
  },
  {
    name: "ANGULAR",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={angularLogo}
          alt="Angular"
          className="w-5 h-5 shrink-0 object-contain"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>ANGULAR</span>
      </div>
    )
  },
  {
    name: "HTML5",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={html5Logo}
          alt="HTML5"
          className="w-5 h-5 shrink-0 object-contain"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>HTML5</span>
      </div>
    )
  },
  {
    name: "CSS3",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={css3Logo}
          alt="CSS3"
          className="w-5 h-5 shrink-0 object-contain"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>CSS3</span>
      </div>
    )
  },
  {
    name: "TAILWIND",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={tailwindLogo}
          alt="TailwindCSS"
          className="w-5 h-5 shrink-0 object-contain"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>TAILWIND</span>
      </div>
    )
  },
  {
    name: "VITE",
    node: (
      <div className="flex items-center gap-2 shrink-0">
        <img
          {...logoImgProps} src={viteLogo}
          alt="Vite"
          className="w-5 h-5 shrink-0 object-contain"
        />
        <span className={`text-[10px] font-mono font-black tracking-wider transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-purple-200'}`}>VITE</span>
      </div>
    )
  }
];

export const ProjectsContent = ({ theme }) => {
  const isLight = theme === 'light';
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [tab, setTab] = useState('work'); // 'work' = frontend case studies, 'side' = side projects
  const list = tab === 'work' ? workData : projectsData;
  const switchTab = (next) => { if (next !== tab) { setTab(next); setActiveMobileIndex(0); setDirection(1); } };
  const [direction, setDirection] = useState(1);
  // page height after any short-screen fit (see lib/pageFit)
  const [viewportHeight, setViewportHeight] = useState(() => getPageFit().h);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? (window.innerWidth < 768 || window.innerHeight < 520) : false
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewportHeight(getPageFit().h);
      setIsMobile(w < 768 || h < 520);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute dynamic scale style to guarantee cards rearrange/scale inside viewport without y-axis scroll
  const getScaleStyle = () => {
    if (typeof window === 'undefined') return {};
    const w = window.innerWidth;
    const h = viewportHeight;

    let targetHeight = 780;
    let staticHeight = 200;

    if (isMobile) {
      targetHeight = 540;
      staticHeight = 140;
    } else if (w >= 1024) {
      // 4 cards in 1 single row + bottom infinite moving tech loop
      targetHeight = 560;
      staticHeight = 160;
    } else {
      // 2x2 grid mode on tablet portrait (768px - 1023px)
      targetHeight = 780;
      staticHeight = 200;
    }

    if (h < targetHeight) {
      const scale = Math.max(0.55, (h - staticHeight) / (targetHeight - staticHeight));
      return {
        transform: `scale(${scale.toFixed(3)})`,
        transformOrigin: 'center center',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      };
    }
    return {
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  const handleNext = () => {
    setDirection(1);
    setActiveMobileIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveMobileIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleDotClick = (idx) => {
    setDirection(idx > activeMobileIndex ? 1 : -1);
    setActiveMobileIndex(idx);
  };

  const currentProject = list[activeMobileIndex] || list[0];

  return (
    <div className="w-[var(--page-w,100vw)] h-[var(--page-h,100vh)] max-h-[var(--page-h,100vh)] flex flex-col justify-between items-center select-none pointer-events-auto relative overflow-hidden py-2 sm:py-4 px-3 sm:px-6">

      {/* Floating Bubbles Backdrop */}
      <FloatingBubbles />

      {/* Title Header */}
      <div className="text-center mb-1 sm:mb-2 max-w-2xl z-10 mt-16 xs:mt-18 sm:mt-20 md:mt-24 lg:mt-16 shrink-0">
        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase transition-colors duration-500 ease-in-out ${isLight ? 'text-pink-600' : 'text-pink-400'
          }`}>
          Ideas In Motion
        </span>
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mt-0.5 mb-0.5 sm:mb-1 tracking-tight leading-none transition-colors duration-500 ease-in-out ${isLight ? 'text-[#1e1832]' : 'text-white'
          }`}>
          Projects & Experiments
        </h2>
        <p className={`text-[10px] sm:text-xs leading-relaxed font-questrial px-2 max-w-md mx-auto transition-colors duration-500 ease-in-out ${isLight ? 'text-slate-700 font-medium' : 'text-purple-200/60'
          }`}>
          A few ideas brought to life
        </p>

        {/* Frontend work / side projects switch */}
        <div
          role="group"
          aria-label="Show projects"
          className={`inline-flex items-center gap-0.5 p-0.5 mt-2 sm:mt-3 rounded-full border pointer-events-auto transition-colors duration-500 ${isLight ? 'bg-white/80 border-pink-200 shadow-sm' : 'bg-white/5 border-purple-500/30'}`}
        >
          {[['work', 'Frontend Work'], ['side', 'Side Projects']].map(([id, label]) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => switchTab(id)}
                aria-pressed={active}
                className={`px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  active
                    ? (isLight ? 'bg-pink-600 text-white focus-visible:ring-pink-300' : 'bg-purple-600 text-white focus-visible:ring-purple-300')
                    : (isLight ? 'text-slate-700 hover:text-pink-600 focus-visible:ring-pink-300' : 'text-purple-100/80 hover:text-white focus-visible:ring-purple-300')
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE VIEW: Single Prominent Card Carousel with Left/Right Arrows & Dots */}
      {isMobile ? (
        <div className="relative w-full flex-1 flex flex-col items-center justify-center z-20 min-h-0 my-auto py-2" style={getScaleStyle()}>
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex items-center justify-center">
            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrev}
              className={`absolute -left-4 z-30 p-2 rounded-full border active:scale-95 transition-all duration-500 ease-in-out shadow-lg cursor-pointer focus:outline-none ${isLight
                ? 'bg-white/90 border-purple-200 text-purple-900 shadow-purple-900/10'
                : 'bg-purple-950/80 border-purple-500/30 text-white'
                }`}
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Main Featured Mobile Card */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentProject.id}
                onClick={() => setSelectedProject(currentProject)}
                initial={{ opacity: 0, x: direction * 45, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -45, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full rounded-2xl p-[1px] overflow-hidden flex flex-col transform-gpu shadow-xl cursor-pointer ${isLight
                  ? currentProject.lightBg
                  : 'glass-surface glass-surface-hoverable border border-white/10 group-hover:border-pink-500/50 shadow-black/40'
                  }`}
              >
                {/* Dynamic glowing background trail */}
                <div className={`absolute -inset-10 bg-gradient-to-r ${currentProject.glow} ${isLight ? 'opacity-15' : 'opacity-0 group-hover:opacity-30'} blur-2xl transition-opacity duration-700 ease-in-out`} />

                {/* Main Standard Card Body */}
                <div className="relative z-10 p-4 sm:p-5 flex-1 flex flex-col justify-between bg-transparent rounded-2xl">
                  <div className="flex flex-col flex-1">
                    {/* 1. Visual Hero Image / Graphic Preview at the Top */}
                    <div className={`w-full h-28 sm:h-32 mb-3 rounded-lg overflow-hidden border flex items-center justify-center relative shrink-0 transition-all duration-500 ease-in-out ${isLight ? currentProject.lightPreviewBg : 'border-white/10 bg-white/[0.04] backdrop-blur-md'
                      }`}>
                      <ProjectCardPreview projectId={currentProject.id} isLight={isLight} />
                    </div>

                    {/* 2. Category Subtitle & Performance Metrics Row */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`text-[8.5px] sm:text-[9px] font-black tracking-wider uppercase truncate transition-colors duration-500 ease-in-out ${isLight ? currentProject.lightSubtitle : 'text-cyan-400'
                        }`}>
                        {currentProject.shortSubtitle || currentProject.subtitle}
                      </span>
                      <span className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded border whitespace-nowrap shrink-0 transition-all duration-500 ease-in-out ${isLight ? currentProject.lightMetrics : 'border-white/10 bg-white/[0.06] text-white/80'
                        }`}>
                        {currentProject.metrics}
                      </span>
                    </div>

                    {/* 3. Title */}
                    <h3 className={`text-xs sm:text-sm md:text-base font-black mb-1.5 leading-snug line-clamp-1 tracking-tight transition-colors duration-500 ease-in-out ${isLight ? 'text-[#1e1832]' : 'text-white'
                      }`}>
                      {currentProject.shortTitle || currentProject.title}
                    </h3>

                    {/* 4. Description */}
                    <div className="mb-3">
                      <p className={`text-[10px] sm:text-[11px] leading-relaxed font-medium line-clamp-3 transition-colors duration-500 ease-in-out ${isLight ? 'text-slate-800' : 'text-purple-200/80'
                        }`}>
                        {currentProject.description}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(currentProject);
                        }}
                        className={`inline-flex items-center gap-1 mt-1 text-[9px] sm:text-[9.5px] font-black tracking-wider uppercase transition-all duration-300 group-hover:translate-x-0.5 cursor-pointer focus:outline-none ${isLight ? 'text-pink-600 hover:text-pink-700' : 'text-pink-400 hover:text-pink-300'
                          }`}
                      >
                        <span>Know More</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>

                  {/* 5. Tech Stack Badges Footer */}
                  <div className={`flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t transition-colors duration-500 ease-in-out ${isLight ? 'border-purple-100' : 'border-white/10'
                    }`}>
                    {currentProject.tech.map((t) => (
                      <span key={t} className={`text-[7.5px] sm:text-[8px] font-mono font-black px-1.5 sm:px-2 py-0.5 rounded border transition-all duration-500 ease-in-out ${isLight
                        ? currentProject.lightBadge
                        : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                        }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNext}
              className={`absolute -right-4 z-30 p-2 rounded-full border active:scale-95 transition-all duration-500 ease-in-out shadow-lg cursor-pointer focus:outline-none ${isLight
                ? 'bg-white/90 border-purple-200 text-purple-900 shadow-purple-900/10'
                : 'bg-purple-950/80 border-purple-500/30 text-white'
                }`}
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators for Mobile */}
          <div className="flex items-center gap-2 mt-3 z-20">
            {list.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-500 ease-in-out rounded-full cursor-pointer focus:outline-none ${activeMobileIndex === idx
                  ? 'w-5 h-1.5 bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]'
                  : isLight ? 'w-1.5 h-1.5 bg-purple-300 hover:bg-purple-500' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* DESKTOP / TABLET VIEW: Responsive Grid */
        <div className="relative w-full max-w-6xl flex-1 flex flex-col justify-center items-center my-auto z-20 py-2 sm:py-3" style={getScaleStyle()}>
          <div key={tab} className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 justify-center items-stretch ${list.length === 3 ? 'lg:grid-cols-3 max-w-5xl' : 'lg:grid-cols-4'}`}>
            {list.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative w-full rounded-xl sm:rounded-2xl p-[1px] overflow-hidden flex flex-col group cursor-pointer ${list.length % 2 === 1 && index === list.length - 1 ? 'sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.5rem)] lg:col-span-1 lg:w-full' : ''} transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu ${isLight
                    ? project.lightBg
                    : 'glass-surface glass-surface-hoverable border border-white/10 group-hover:border-pink-500/50 shadow-lg shadow-black/30'
                    }`}
                >
                  {/* Dynamic glowing background trail */}
                  <div className={`absolute -inset-10 bg-gradient-to-r ${project.glow} ${isLight ? 'opacity-25 group-hover:opacity-40' : 'opacity-0 group-hover:opacity-30'} blur-2xl transition-opacity duration-700 ease-in-out`} />

                  {/* Main Standard Card Body */}
                  <div className="relative z-10 w-full p-4 sm:p-5 flex-1 flex flex-col justify-between bg-transparent rounded-xl sm:rounded-2xl">
                    <div className="flex flex-col flex-1">
                      {/* 1. Visual Hero Image / Graphic Preview at the Top */}
                      <div className={`w-full h-28 sm:h-32 mb-3 rounded-lg overflow-hidden border flex items-center justify-center relative shrink-0 transition-all duration-500 ease-in-out ${isLight ? project.lightPreviewBg : 'border-white/10 bg-white/[0.04] backdrop-blur-md group-hover:border-white/20'
                        }`}>
                        <ProjectCardPreview projectId={project.id} isLight={isLight} />
                      </div>

                      {/* 2. Category Subtitle & Performance Metrics Row */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`text-[8.5px] sm:text-[9px] font-black tracking-wider uppercase truncate transition-colors duration-500 ease-in-out ${isLight ? project.lightSubtitle : 'text-cyan-400'
                          }`}>
                          {project.shortSubtitle || project.subtitle}
                        </span>
                        <span className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded border whitespace-nowrap shrink-0 transition-all duration-500 ease-in-out ${isLight ? project.lightMetrics : 'border-white/10 bg-white/[0.06] text-white/80'
                          }`}>
                          {project.metrics}
                        </span>
                      </div>

                      {/* 3. Title */}
                      <h3 className={`text-xs sm:text-sm md:text-base font-black group-hover:text-pink-500 transition-colors duration-500 ease-in-out mb-1.5 leading-snug line-clamp-1 tracking-tight ${isLight ? 'text-[#1e1832]' : 'text-white'
                        }`}>
                        {project.shortTitle || project.title}
                      </h3>

                      {/* 4. Description */}
                      <div className="mb-3">
                        <p className={`text-[10px] sm:text-[11px] leading-relaxed font-medium line-clamp-3 transition-colors duration-500 ease-in-out ${isLight ? 'text-slate-800' : 'text-purple-200/80'
                          }`}>
                          {project.description}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className={`inline-flex items-center gap-1 mt-1 text-[9px] sm:text-[9.5px] font-black tracking-wider uppercase transition-all duration-300 group-hover:translate-x-0.5 cursor-pointer focus:outline-none ${isLight ? 'text-pink-600 hover:text-pink-700' : 'text-pink-400 hover:text-pink-300'
                            }`}
                        >
                          <span>Know More</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {/* 5. Tech Stack Badges Footer */}
                    <div className={`flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t transition-colors duration-500 ease-in-out ${isLight ? 'border-purple-100' : 'border-white/10'
                      }`}>
                      {project.tech.map((t) => (
                        <span key={t} className={`text-[7.5px] sm:text-[8px] font-mono font-black px-1.5 sm:px-2 py-0.5 rounded border transition-all duration-500 ease-in-out ${isLight
                          ? project.lightBadge
                          : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300 group-hover:border-cyan-400/50'
                          }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tech Stack Loop (ReactBits LogoLoop Component) at the bottom ── */}
      <div className={`w-full mt-1 sm:mt-4 mb-16 lg:mb-0 max-w-5xl z-20 border-t pt-2 sm:pt-3 flex flex-col items-center shrink-0 pointer-events-none select-none transition-colors duration-500 ease-in-out ${isLight ? 'border-purple-200' : 'border-purple-500/10'
        }`}>
        <span className={`text-[8px] sm:text-[9px] font-black tracking-widest uppercase mb-1.5 sm:mb-3 transition-colors duration-500 ease-in-out ${isLight ? 'text-pink-600' : 'text-cyan-400'
          }`}>
          Core Technologies & Frameworks
        </span>
        <LogoLoop
          logos={getTechLogos(isLight)}
          speed={45}
          logoHeight={26}
          gap={18}
          scaleOnHover={false}
          pauseOnHover={false}
          fadeOut={true}
        />
      </div>

      {/* Project Details Modal Overlay */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
      />

    </div>
  );
};
