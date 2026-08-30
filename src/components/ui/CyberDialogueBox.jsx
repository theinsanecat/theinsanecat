import { motion, AnimatePresence } from 'framer-motion';

export const CyberDialogueBox = ({ text, theme, arrowPosition = 'center' }) => {
  const isLight = theme === 'light';

  let arrowClass = 'left-1/2 -translate-x-1/2';
  if (arrowPosition === 'right') {
    arrowClass = 'right-8';
  } else if (arrowPosition === 'left') {
    arrowClass = 'left-8';
  }

  return (
    <div
      className={`relative flex flex-col justify-between p-2.5 sm:p-3 text-left select-none pointer-events-none w-full rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 ${isLight
          ? 'bg-white/95 border-pink-300 text-slate-800 shadow-pink-500/15'
          : 'bg-[#0f0921]/95 border-pink-500/50 text-purple-100 shadow-pink-500/30'
        }`}
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between pb-1 border-b border-pink-500/20 mb-1">
        <span className="text-[8px] sm:text-[8.5px] font-black tracking-wider text-pink-500 uppercase font-mono flex items-center gap-1">
          PURRITO COMM
        </span>
        <span className="text-[7px] font-mono text-purple-400 tracking-widest uppercase">
          ONLINE
        </span>
      </div>

      {/* Dialogue Message Content */}
      <div className="py-0.5 min-h-[30px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            className={`text-[10.5px] sm:text-[11px] leading-snug font-sans font-semibold ${isLight ? 'text-slate-800' : 'text-purple-100'
              }`}
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pointer Speech Bubble Arrow Stem */}
      <div
        className={`absolute -bottom-1.5 w-3 h-3 rotate-45 border-b border-r ${arrowClass} ${isLight ? 'bg-white border-pink-300' : 'bg-[#0f0921] border-pink-500/50'
          }`}
      />
    </div>
  );
};
