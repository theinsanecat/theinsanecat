import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoLoop } from './LogoLoop';
import { FloatingBubbles } from './FloatingBubbles';

// ─── Interactive Project Details Modal Overlay ─────────────────────────────────
const ProjectDetailsModal = ({ project, onClose, theme }) => {
  const isLight = theme === 'light';
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Subtle Backdrop Overlay (Outside clicks blocked - close button required) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 z-0"
          />

          {/* Modal Card Container (Expanded Card View) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative max-w-lg sm:max-w-xl w-full rounded-3xl p-5 sm:p-6 z-10 overflow-hidden border-2 shadow-2xl ${isLight
                ? 'bg-white/95 border-pink-300 text-slate-900 shadow-pink-500/20'
                : 'bg-[#0f0921]/95 border-purple-500/50 text-purple-100 shadow-purple-500/30'
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
                <p className={`text-[10px] sm:text-[11px] font-bold leading-tight transition-colors duration-300 ${
                  isLight ? 'text-amber-600' : 'text-yellow-400'
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

              {/* Tech Badges */}
              <div className="pt-1">
                <h4 className="font-black text-[9.5px] uppercase tracking-wider text-slate-400 mb-1.5">Tech Stack & Frameworks</h4>
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
                    <span>Play Online</span>
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
      <div className={`w-full h-full relative p-3 flex flex-col items-center justify-between overflow-hidden transition-colors duration-500 ${
        isLight
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
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
        isLight
          ? 'bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 text-sky-950 border border-sky-300'
          : 'bg-gradient-to-br from-sky-950/80 via-slate-900/70 to-blue-950/80 text-sky-200 border-none'
      }`}>
        <div className={`flex items-center justify-between border-b pb-1 ${isLight ? 'border-sky-300' : 'border-sky-500/30'}`}>
          <span className={`text-[7.5px] font-mono font-bold tracking-wider uppercase ${isLight ? 'text-sky-900' : 'text-cyan-300'}`}>08:45 AM • MON</span>
          <span className={`text-[7.5px] font-mono font-bold ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>28°C Sunny</span>
        </div>

        <div className={`my-auto text-center px-2 py-1.5 rounded-lg border backdrop-blur-sm ${
          isLight ? 'bg-white/90 border-sky-300 shadow-sm' : 'bg-sky-500/15 border-sky-400/40'
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
      <div className={`w-full h-full relative p-2.5 flex flex-col items-center justify-between overflow-hidden transition-colors duration-500 ${
        isLight
          ? 'bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 text-purple-950 border border-pink-300'
          : 'bg-gradient-to-br from-pink-950/80 via-purple-950/70 to-slate-950/80 text-purple-200 border-none'
      }`}>
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${
          isLight ? 'bg-white/90 border-pink-300 shadow-sm' : 'bg-pink-500/20 border-pink-400/40'
        }`}>
          <div className="w-2 h-2 rounded bg-pink-500 shadow-[0_0_6px_rgba(236,72,153,0.8)]" />
          <span className={`text-[8px] font-mono font-black tracking-widest uppercase ${isLight ? 'text-pink-950' : 'text-pink-200'}`}>SQUARE-UP</span>
          <div className="w-2 h-2 rounded-full bg-purple-500" />
        </div>

        <div className={`relative w-32 h-14 border rounded-lg p-1.5 flex items-center justify-around ${
          isLight ? 'bg-white/90 border-pink-300 shadow-sm' : 'bg-purple-950/40 border-purple-500/40'
        }`}>
          <div className={`absolute inset-[8px] border rounded ${
            isLight ? 'border-pink-400 bg-pink-100/60' : 'border-cyan-400/70 bg-cyan-500/15'
          }`} />

          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.9)] z-10" />
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.9)] z-10" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.9)] z-10" />
        </div>

        <div className={`w-full flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${
          isLight ? 'border-pink-300 text-purple-950' : 'border-purple-500/20 text-purple-300/90'
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
      <div className={`w-full h-full relative p-2.5 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
        isLight
          ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 text-amber-950 border border-amber-300'
          : 'bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 text-amber-200 border-none'
      }`}>
        <div className={`flex items-center justify-between text-[7.5px] font-mono border-b pb-1 ${
          isLight ? 'border-amber-300 text-amber-950' : 'border-amber-500/30 text-amber-300'
        }`}>
          <span className={`font-bold uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>RTSP STREAM CAM #01</span>
          <span className={`font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>93.3% ACCURACY</span>
        </div>

        <div className={`my-auto p-1.5 rounded border relative flex items-center justify-between ${
          isLight ? 'bg-white/90 border-amber-400 shadow-sm' : 'bg-emerald-500/15 border-emerald-400/80'
        }`}>
          <div className="flex items-center gap-1">
            <span className={`text-[7.5px] font-mono font-black px-1.5 py-0.5 rounded border ${
              isLight ? 'bg-amber-100 text-amber-950 border-amber-400' : 'bg-black/70 text-amber-300 border-amber-400/40'
            }`}>
              MH 12 AB 1234
            </span>
            <span className={`text-[7px] font-mono font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>[YOLOv8: 98%]</span>
          </div>
          <span className={`text-[7px] font-mono font-bold ${isLight ? 'text-sky-900' : 'text-cyan-300'}`}>[OCR: 95.2%]</span>
        </div>

        <div className={`flex items-center justify-between text-[7.5px] font-mono border-t pt-1 ${
          isLight ? 'border-amber-300 text-amber-950' : 'border-amber-500/20 text-amber-200/90'
        }`}>
          <span>BITS PILANI DISSERTATION</span>
          <span className={`font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>INDIAN PLATES</span>
        </div>
      </div>
    );
  }

  return null;
};

const projectsData = [
  {
    id: 1,
    title: "Automation of Irrigation and Security of Farm by using IoT and Machine Learning",
    subtitle: "B.E. Final Year Capstone Project (RAIT)",
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
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
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"
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
  const [direction, setDirection] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? (window.innerWidth < 768 || window.innerHeight < 520) : false
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewportHeight(h);
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
    setActiveMobileIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveMobileIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const handleDotClick = (idx) => {
    setDirection(idx > activeMobileIndex ? 1 : -1);
    setActiveMobileIndex(idx);
  };

  const currentProject = projectsData[activeMobileIndex];

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col justify-between items-center select-none pointer-events-auto relative overflow-hidden py-2 sm:py-4 px-3 sm:px-6">

      {/* Floating Bubbles Backdrop */}
      <FloatingBubbles />

      {/* Title Header */}
      <div className="text-center mb-1 sm:mb-2 max-w-2xl z-10 mt-10 sm:mt-14 md:mt-16 shrink-0">
        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase transition-colors duration-500 ease-in-out ${isLight ? 'text-pink-600' : 'text-pink-400'
          }`}>
          Stellar Showcase
        </span>
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mt-0.5 mb-0.5 sm:mb-1 tracking-tight leading-none transition-colors duration-500 ease-in-out ${isLight ? 'text-[#1e1832]' : 'text-white'
          }`}>
          Stellar Creations
        </h2>
        <p className={`text-[10px] sm:text-xs leading-relaxed font-questrial px-2 max-w-md mx-auto transition-colors duration-500 ease-in-out ${isLight ? 'text-slate-700 font-medium' : 'text-purple-200/60'
          }`}>
          Explore Soumya's orbital creations, featuring advanced WebGL mechanics, design aesthetics, and distributed architectures!
        </p>
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
                        {currentProject.subtitle}
                      </span>
                      <span className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded border whitespace-nowrap shrink-0 transition-all duration-500 ease-in-out ${isLight ? currentProject.lightMetrics : 'border-white/10 bg-white/[0.06] text-white/80'
                        }`}>
                        {currentProject.metrics}
                      </span>
                    </div>

                    {/* 3. Title */}
                    <h3 className={`text-xs sm:text-sm md:text-base font-black mb-1.5 leading-snug line-clamp-1 tracking-tight transition-colors duration-500 ease-in-out ${isLight ? 'text-[#1e1832]' : 'text-white'
                      }`}>
                      {currentProject.title}
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
            {projectsData.map((p, idx) => (
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 justify-center items-stretch">
            {projectsData.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative w-full rounded-xl sm:rounded-2xl p-[1px] overflow-hidden flex flex-col group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu ${isLight
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
                          {project.subtitle}
                        </span>
                        <span className={`text-[7.5px] sm:text-[8px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded border whitespace-nowrap shrink-0 transition-all duration-500 ease-in-out ${isLight ? project.lightMetrics : 'border-white/10 bg-white/[0.06] text-white/80'
                          }`}>
                          {project.metrics}
                        </span>
                      </div>

                      {/* 3. Title */}
                      <h3 className={`text-xs sm:text-sm md:text-base font-black group-hover:text-pink-500 transition-colors duration-500 ease-in-out mb-1.5 leading-snug line-clamp-1 tracking-tight ${isLight ? 'text-[#1e1832]' : 'text-white'
                        }`}>
                        {project.title}
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
      <div className={`w-full mt-1 sm:mt-4 max-w-5xl z-20 border-t pt-2 sm:pt-3 flex flex-col items-center shrink-0 pointer-events-none select-none transition-colors duration-500 ease-in-out ${isLight ? 'border-purple-200' : 'border-purple-500/10'
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
