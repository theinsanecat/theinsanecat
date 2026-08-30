import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';
import BorderGlow from './BorderGlow';

export const Navbar = ({ activeSection, setActiveSection, theme, setTheme }) => {
  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    // { id: 'experience', name: 'Experience' }
  ];

  const isLight = theme === 'light';

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-2 sm:px-6 md:px-16 py-3 sm:py-5 flex items-center justify-between pointer-events-auto"
    >
      {/* Logo: Glowing typography with responsive scaling */}
      <button 
        onClick={() => setActiveSection('home')} 
        className="group flex items-center gap-1 sm:gap-2 cursor-pointer focus:outline-none shrink-0 z-10"
      >
        <span className={`text-[10px] xs:text-[11px] sm:text-sm md:text-base lg:text-xl font-mileast tracking-tight transition-all duration-300 whitespace-nowrap ${
          isLight 
            ? 'text-[#1e1832] group-hover:text-pink-600' 
            : 'text-white group-hover:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
        }`}>
          git commit -m &quot;I tried&quot;
        </span>
      </button>

      {/* Nav Links: Glassmorphism pill wrapper - Visible & centered on ALL screen sizes */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
        <div className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border shadow-md transition-all duration-500 ${
          isLight
            ? 'bg-white/75 border-white/80 shadow-pink-900/5 text-slate-800'
            : 'bg-white/10 border-white/10 shadow-black/20 text-white'
        }`}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`relative px-1.5 sm:px-4 md:px-5 py-0.5 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-300 rounded-full group cursor-pointer focus:outline-none whitespace-nowrap ${
                  isActive 
                    ? (isLight ? 'text-[#1e1832] font-black' : 'text-white')
                    : (isLight ? 'text-slate-600 hover:text-pink-600' : 'text-purple-100/70 hover:text-white')
                }`}
              >
                {link.name}
                {/* Active indicator dot */}
                <span className={`absolute bottom-0.5 sm:bottom-1 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full transition-transform duration-300 ease-out ${
                  isLight ? 'bg-pink-500' : 'bg-purple-500'
                } ${
                  isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Controls: Theme Toggle & Say Hello CTA Button */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 z-10">
        {/* Theme Toggle Button (Sun / Moon) */}
        <button
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          className={`p-1.5 sm:p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center ${
            isLight
              ? 'bg-white/80 border-pink-200 text-amber-500 hover:bg-amber-50 shadow-sm'
              : 'bg-white/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 shadow-md'
          }`}
          title={isLight ? "Switch to Night Mode" : "Switch to Light Mode"}
          aria-label="Toggle Theme"
        >
          {isLight ? (
            /* Golden Sun Icon */
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM6.166 18.894a.75.75 0 0 0 1.06 1.06l1.59-1.591a.75.75 0 1 0-1.06-1.061l-1.59 1.591ZM4.5 12a.75.75 0 0 1-.75-.75H1.5a.75.75 0 0 1 0 1.5h2.25A.75.75 0 0 1 4.5 12ZM6.166 5.106a.75.75 0 0 0-1.06 1.06l1.591 1.59a.75.75 0 0 0 1.06-1.061L6.166 5.106Z" />
            </svg>
          ) : (
            /* Crescent Moon Icon */
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Say Hello CTA Button */}
        {isLight ? (
          <div className="p-[1.5px] rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 shadow-md shadow-pink-500/10 active:scale-95 transition-all duration-300 cursor-pointer w-max">
            <button
              onClick={() => setActiveSection('contact')}
              className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2 text-[10px] sm:text-xs md:text-sm font-semibold text-pink-600 bg-white/95 hover:bg-white rounded-full transition-colors duration-300 cursor-pointer focus:outline-none flex items-center justify-center whitespace-nowrap"
            >
              Say Hello
            </button>
          </div>
        ) : (
          <BorderGlow
            borderRadius={9999}
            glowColor="270 85 70"
            colors={['#ab55f7', '#ec4899', '#3b82f6']}
            edgeSensitivity={40}
            glowRadius={25}
            glowIntensity={1.2}
            backgroundColor="#1b1235"
            className="shadow-lg active:scale-95 transition-transform duration-300 group cursor-pointer w-max"
          >
            <button
              onClick={() => setActiveSection('contact')}
              className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2 text-[10px] sm:text-xs md:text-sm font-semibold text-white cursor-pointer focus:outline-none flex items-center justify-center whitespace-nowrap"
            >
              Say Hello
            </button>
          </BorderGlow>
        )}
      </div>

      {/* Mobile & Tablet Laptop Recommendation Prompt */}
      <div className="absolute top-[calc(100%+2px)] sm:top-[calc(100%+4px)] left-1/2 -translate-x-1/2 pointer-events-auto z-40 lg:hidden w-max max-w-[92vw]">
        <div className={`text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-semibold tracking-tight transition-colors duration-500 flex items-center justify-center gap-1.5 opacity-60 ${
          isLight ? 'text-pink-600' : 'text-purple-300'
        }`}>
          <span className="relative flex h-1.5 w-1.5 shrink-0 opacity-75">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
              isLight ? 'bg-pink-400' : 'bg-purple-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
              isLight ? 'bg-pink-500' : 'bg-purple-500'
            }`}></span>
          </span>
          <span>Best experienced on a laptop or desktop</span>
        </div>
      </div>
    </motion.nav>
  );
};
