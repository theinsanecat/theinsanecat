import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import meDarkImg from '../../assets/me.PNG';
import meLightImg from '../../assets/me_light.PNG';
import rotatingEmblem from '../../assets/rotating-emblem.svg';
import { SakuraBranch } from './SakuraBranch';
import { LotusWaterBody } from './LotusWaterBody';
import MagicalButterflies from './MagicalButterflies';
import BorderGlow from './BorderGlow';

export const ContactContent = ({ setActiveSection, theme, onAvatarTrigger }) => {
  const isLight = theme === 'light';
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const contactData = {
    category: "CONTACT",
    backTitle: "01/01",
    title: "SOUMYA DWIVEDI",
    description: "Let's connect! I am always excited to discuss full-stack engineering, immersive UI/UX designs, and collaborative opportunities.",
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/theinsanecat",
      color: "hover:text-purple-400 hover:border-purple-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/soumya-dwivedi",
      color: "hover:text-blue-400 hover:border-blue-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "Gmail",
      url: "mailto:soumya.dwivedi05@gmail.com",
      color: "hover:text-pink-400 hover:border-pink-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.298 1.458-2.051 2.507-1.263L12 11.302l9.493-7.108C22.541 3.406 24 4.159 24 5.457z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-center pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 z-30 select-none max-w-4xl px-4 pointer-events-auto">      
      {/* Swaying Sakura Branch and Falling Petals overlaying the Contact page */}
      <SakuraBranch theme={theme} />

      {/* Flying Magical Butterflies in Left Region with Lotus Perching & Pure SVG Glitter Trail */}
      <MagicalButterflies theme={theme} />
      
      {/* GLOBAL DEFINITIONS (Glows & Shadows) */}
      <svg className="hidden">
        <defs>
          <filter id="heavy-shadow-contact" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.7"/>
          </filter>
          <filter id="gem-glow-contact" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>



      {/* Back Button - Scaled down compact button positioned cleanly below git commit logo line on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-10 xs:top-12 sm:top-18 left-2 sm:left-6 md:left-16 z-40 transform-gpu"
      >
        <div className="relative">
          {/* Light Mode Back Button */}
          <div className={`transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={() => setActiveSection('home')}
              className="px-2.5 xs:px-3 sm:px-4 py-0.5 xs:py-1 sm:py-1.5 text-[8.5px] xs:text-[9.5px] sm:text-xs font-bold text-[#1e1832] bg-white/90 hover:bg-white border border-purple-200/90 shadow-sm rounded-full active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none flex items-center gap-1 sm:gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to Home</span>
            </button>
          </div>

          {/* Dark Mode Back Button */}
          <div className={`absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <BorderGlow
              borderRadius={9999}
              glowColor="270 85 70"
              colors={['#ab55f7', '#ec4899', '#3b82f6']}
              edgeSensitivity={40}
              glowRadius={16}
              glowIntensity={1.2}
              backgroundColor="#1b1235"
              className="active:scale-95 transition-all duration-300 cursor-pointer w-max"
            >
              <button
                onClick={() => setActiveSection('home')}
                className="px-2.5 xs:px-3 sm:px-4 py-0.5 xs:py-1 sm:py-1.5 text-[8.5px] xs:text-[9.5px] sm:text-xs font-bold text-white cursor-pointer focus:outline-none flex items-center gap-1 sm:gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>Back to Home</span>
              </button>
            </BorderGlow>
          </div>
        </div>
      </motion.div>

      {/* Emblem & Circular Avatar Tile Wrapper — Enters together as a synchronized unit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center justify-center mb-14 sm:mb-20 md:mb-24"
      >
        
        {/* Light Mode Soft Pink & Lavender Ambient Aura Backdrop */}
        <div className={`w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] rounded-full bg-gradient-to-r from-[#fbcfe8]/50 via-[#e9d5ff]/40 to-[#c084fc]/30 blur-3xl absolute z-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
          isLight ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Slowly Rotating SVG Emblem Background */}
        {isMobile ? (
          // On mobile: pure CSS @keyframes spin — runs on GPU compositor thread, zero JS cost
          <div
            className="absolute z-0 pointer-events-none flex items-center justify-center overflow-visible"
            style={{ animation: 'spin 70s linear infinite', willChange: 'transform' }}
          >
            <img
              src={rotatingEmblem}
              alt=""
              className={`w-[500px] h-[500px] max-w-none select-none transition-opacity duration-700 ease-in-out transform-gpu ${
                isLight
                  ? 'filter sepia(100%) hue-rotate(225deg) saturate(380%) brightness(1.18) opacity-90'
                  : 'opacity-90'
              }`}
            />
          </div>
        ) : (
          // On desktop: full Framer Motion rotation with maskImage (works perfectly)
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
            className="absolute z-0 pointer-events-none flex items-center justify-center overflow-visible transform-gpu"
            style={{
              willChange: 'transform',
              maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 16%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 42%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0) 56%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 16%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.2) 42%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0) 56%)',
            }}
          >
            {/* Light Mode Emblem */}
            <img
              src={rotatingEmblem}
              alt=""
              className={`w-[500px] h-[500px] sm:w-[660px] sm:h-[660px] md:w-[760px] md:h-[760px] max-w-none select-none transition-opacity duration-700 ease-in-out transform-gpu filter sepia(100%) hue-rotate(225deg) saturate(380%) brightness(1.18) opacity(0.9) drop-shadow(0 0 20px rgba(192,132,252,0.5)) ${
                isLight ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Dark Mode Emblem */}
            <img
              src={rotatingEmblem}
              alt=""
              className={`absolute inset-0 w-[500px] h-[500px] sm:w-[660px] sm:h-[660px] md:w-[760px] md:h-[760px] max-w-none opacity-90 select-none transition-opacity duration-700 ease-in-out transform-gpu ${
                isLight ? 'opacity-0' : 'opacity-90'
              }`}
            />
          </motion.div>
        )}

        {/* Circular Avatar Tile — Centered at Emblem Center */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 flex flex-col items-center transform-gpu"
        >
          {/* Circular Tile Badge */}
          <div 
            onClick={() => {
              if (onAvatarTrigger) onAvatarTrigger();
            }}
            className="relative w-[145px] h-[145px] sm:w-[170px] sm:h-[170px] md:w-[190px] md:h-[190px] rounded-full cursor-pointer select-none group transition-transform duration-500 hover:scale-105"
          >
            <div className="w-full h-full relative rounded-full">
              {/* ================= Avatar Image Focus ================= */}
              <div className="absolute inset-0 w-full h-full rounded-full p-1.5 backdrop-blur-xl flex flex-col items-center justify-center">
                {/* Light Mode Backdrop */}
                <div className={`absolute inset-0 rounded-full bg-white/85 border-2 border-purple-300/80 shadow-[0_0_30px_rgba(216,180,254,0.6)] group-hover:border-pink-400 group-hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] transition-opacity duration-700 ease-in-out ${
                  isLight ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Dark Mode Backdrop */}
                <div className={`absolute inset-0 rounded-full bg-[#1b1235]/95 border-2 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.35)] group-hover:border-pink-500/60 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-opacity duration-700 ease-in-out ${
                  isLight ? 'opacity-0' : 'opacity-100'
                }`} />

                {/* Outer Tech Pulse Ring */}
                <div className={`absolute inset-0 rounded-full border animate-pulse pointer-events-none transition-colors duration-700 ${isLight ? 'border-pink-400/40' : 'border-pink-400/25'}`} />

                {/* Ambient Backlight Glow */}
                <div className={`w-28 h-28 rounded-full blur-xl absolute transition-colors duration-700 ${isLight ? 'bg-[#f472b6]/30' : 'bg-[#ec4899]/20'}`} />

                {/* Light Mode Glowing Gradient Border Ring */}
                <div className={`absolute inset-0 rounded-full p-[2.5px] bg-gradient-to-tr from-[#f472b6] via-[#c084fc] to-[#818cf8] shadow-[0_0_20px_rgba(244,114,182,0.5)] transition-opacity duration-700 ease-in-out ${
                  isLight ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Dark Mode Glowing Gradient Border Ring */}
                <div className={`absolute inset-0 rounded-full p-[2.5px] bg-gradient-to-tr from-[#ec4899] via-[#a855f7] to-[#6366f1] shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-opacity duration-700 ease-in-out ${
                  isLight ? 'opacity-0' : 'opacity-100'
                }`} />

                {/* Avatar Circle Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner flex items-center justify-center">
                  {/* Light Mode Avatar Backdrop */}
                  <div className={`absolute inset-0 w-full h-full bg-gradient-to-b from-[#f3e8f5] to-[#fce4ec] transition-opacity duration-700 ease-in-out ${
                    isLight ? 'opacity-100' : 'opacity-0'
                  }`} />
                  {/* Dark Mode Avatar Backdrop */}
                  <div className={`absolute inset-0 w-full h-full bg-gradient-to-b from-[#321f66] to-[#140b28] transition-opacity duration-700 ease-in-out ${
                    isLight ? 'opacity-0' : 'opacity-100'
                  }`} />

                  {/* Dark Mode Avatar Image */}
                  <img 
                    src={meDarkImg} 
                    alt="Soumya Avatar Dark" 
                    className={`absolute inset-0 w-full h-full object-cover object-[center_25%] rounded-full select-none transition-opacity duration-700 ease-in-out ${
                      isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  />
                  {/* Light Mode Avatar Image */}
                  <img 
                    src={meLightImg} 
                    alt="Soumya Avatar Light" 
                    className={`absolute inset-0 w-full h-full object-cover object-[center_20%] scale-[1.06] rounded-full select-none transition-opacity duration-700 ease-in-out ${
                      isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Social Links Row — Scaled for mobile screens (iPhone SE) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 w-full px-2 mt-4 sm:mt-8 z-30 transform-gpu"
      >
        {socialLinks.map((link) => (
          <div key={link.name} className="relative transform-gpu">
            {/* Light Mode Social Button */}
            <div className={`transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-6 py-1.5 sm:py-3 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide text-[#1e1832] bg-white/85 hover:bg-white border border-purple-200/90 shadow-sm rounded-full hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none flex items-center justify-center gap-1.5 sm:gap-2 group whitespace-nowrap"
              >
                <span className="text-purple-600 group-hover:text-pink-600 transition-colors duration-300">
                  {link.icon}
                </span>
                <span>
                  {link.name}
                </span>
              </a>
            </div>

            {/* Dark Mode Social Button with Animated Border Glow */}
            <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <BorderGlow
                borderRadius={9999}
                glowColor="270 85 70"
                colors={['#ab55f7', '#ec4899', '#3b82f6']}
                edgeSensitivity={40}
                glowRadius={20}
                glowIntensity={1.2}
                backgroundColor="#1b1235"
                className="active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer h-full"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 sm:px-6 py-1.5 sm:py-3 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide text-white focus:outline-none flex items-center justify-center gap-1.5 sm:gap-2 group whitespace-nowrap"
                >
                  <span className={`transition-colors duration-300 ${link.color}`}>
                    {link.icon}
                  </span>
                  <span>
                    {link.name}
                  </span>
                </a>
              </BorderGlow>
            </div>
          </div>
        ))}
      </motion.div>
      
    </div>
  );
};
