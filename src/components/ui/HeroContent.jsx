import { motion } from 'framer-motion';
import meDarkImg from '../../assets/me.PNG';
import meLightImg from '../../assets/me_light.PNG';
import GlassSurface from './GlassSurface';
import BorderGlow from './BorderGlow';

export const HeroContent = ({ setActiveSection, onAvatarTrigger, theme }) => {
  const isLight = theme === 'light';

  return (
    <div className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center select-none pointer-events-none">
      
      {/* Premium Interactive Profile Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -6, 0]
        }}
        transition={{ 
          opacity: { delay: 0.1, duration: 0.6 },
          scale: { delay: 0.1, duration: 0.6 },
          y: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }
        }}
        onClick={() => {
          if (onAvatarTrigger) onAvatarTrigger();
        }}
        className="relative mb-6 pointer-events-auto group cursor-pointer"
      >
        {/* Glow Halo behind the avatar */}
        <div className={`absolute -inset-2 rounded-full blur-md opacity-80 transition-all duration-700 animate-pulse ${
          isLight
            ? 'bg-gradient-to-r from-[#fbcfe8] via-[#e9d5ff] to-[#c7d2fe]'
            : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600'
        }`} />
        
        {/* Glowing Gradient Border Ring */}
        <div className={`absolute -inset-1 rounded-full p-[3px] transition-all duration-700 ${
          isLight
            ? 'bg-gradient-to-tr from-[#f472b6] via-[#c084fc] to-[#818cf8] shadow-[0_0_20px_rgba(244,114,182,0.5)]'
            : 'bg-gradient-to-tr from-[#ec4899] via-[#a855f7] to-[#6366f1] shadow-[0_0_25px_rgba(236,72,153,0.6)]'
        }`} />

        {/* Inner container with backdrop */}
        <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full backdrop-blur-md overflow-hidden flex items-center justify-center transition-colors duration-700 ${
          isLight ? 'bg-white/70 shadow-inner' : 'bg-black/40'
        }`}>
          {/* Dark Mode Avatar Image */}
          <img 
            src={meDarkImg} 
            alt="Soumya Dwivedi Avatar Dark" 
            className={`absolute inset-0 w-full h-full rounded-full object-cover object-[center_25%] select-none transition-opacity duration-700 ease-in-out ${
              isLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
          {/* Light Mode Avatar Image (Zoomed out a tiny bit to scale-[1.06] while preserving eye level alignment) */}
          <img 
            src={meLightImg} 
            alt="Soumya Dwivedi Avatar Light" 
            className={`absolute inset-0 w-full h-full rounded-full object-cover object-[center_20%] scale-[1.06] select-none transition-opacity duration-700 ease-in-out ${
              isLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        </div>
      </motion.div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md mb-8 text-xs md:text-sm font-semibold tracking-wide pointer-events-auto transition-all duration-500 ${
          isLight
            ? 'bg-white/80 border-pink-300/70 text-pink-700 shadow-sm'
            : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isLight ? 'bg-pink-400' : 'bg-purple-400'
          }`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            isLight ? 'bg-pink-500' : 'bg-purple-500'
          }`}></span>
        </span>
        Open for opportunities
      </motion.div>

      {/* Headings with gradient typography */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`text-4xl md:text-7xl font-extrabold tracking-tight mb-12 leading-tight pointer-events-auto transition-colors duration-500 ${
          isLight ? 'text-[#1e1832]' : 'text-white'
        }`}
      >
        Soumya Dwivedi
        <span className={`block mt-2 bg-clip-text text-transparent ${
          isLight
            ? 'bg-gradient-to-r from-[#ff5592] via-[#ec4899] to-[#8b5cf6]'
            : 'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400'
        }`}>
          Frontend Web Developer
        </span>
      </motion.h1>

      {/* Interactive Call to Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pointer-events-auto"
      >
        {isLight ? (
          <button
            onClick={() => setActiveSection('projects')}
            className="w-full sm:w-auto px-8 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#ff5e97] to-[#ec4899] hover:from-[#ff4887] hover:to-[#db2777] shadow-lg shadow-pink-500/25 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center gap-2 whitespace-nowrap"
          >
            View My Projects
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        ) : (
          <BorderGlow
            borderRadius={9999}
            glowColor="270 85 70"
            colors={['#ab55f7', '#ec4899', '#3b82f6']}
            edgeSensitivity={40}
            glowRadius={25}
            glowIntensity={1.2}
            backgroundColor="#1b1235"
            className="w-full sm:w-auto active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center whitespace-nowrap"
          >
            <button
              onClick={() => setActiveSection('projects')}
              className="w-full px-8 py-2.5 font-bold text-sm text-white cursor-pointer focus:outline-none flex items-center justify-center gap-2 whitespace-nowrap"
            >
              View My Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </BorderGlow>
        )}
        
        {isLight ? (
          <button
            onClick={() => setActiveSection('about')}
            className="w-full sm:w-auto px-8 py-2.5 rounded-full font-bold text-sm text-[#231942] bg-white/85 hover:bg-white border border-purple-200/90 shadow-sm active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center whitespace-nowrap"
          >
            Learn More About Me
          </button>
        ) : (
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={9999}
            backgroundOpacity={0.08}
            className="sm:w-auto hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <button
              onClick={() => setActiveSection('about')}
              className="w-full px-8 py-2.5 font-bold text-sm text-white cursor-pointer focus:outline-none flex items-center justify-center"
            >
              Learn More About Me
            </button>
          </GlassSurface>
        )}
      </motion.div>
    </div>
  );
};
