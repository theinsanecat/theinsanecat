import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Single place to change the résumé file: drop the PDF at public/files/<RESUME_FILE>
export const RESUME_FILE = 'Soumya-Dwivedi-Resume.pdf';
export const RESUME_URL = `${import.meta.env.BASE_URL}files/${RESUME_FILE}`;

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

/**
 * Full-screen résumé viewer: inline PDF preview (desktop) + download / open-in-new-tab actions.
 * Phones get the actions only, since inline PDF viewers are unreliable on mobile browsers.
 */
export const ResumeViewer = ({ isOpen, onClose, theme }) => {
  const isLight = theme === 'light';
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  const btn = `inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 focus:outline-none focus-visible:ring-2 ${
    isLight ? 'focus-visible:ring-pink-400' : 'focus-visible:ring-purple-400'
  }`;
  const primary = isLight
    ? 'text-white bg-gradient-to-r from-[#ff5e97] to-[#ec4899] hover:from-[#ff4887] hover:to-[#db2777] shadow-md shadow-pink-500/20'
    : 'text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-900/40';
  const secondary = isLight
    ? 'text-[#231942] bg-white/90 hover:bg-white border border-purple-200'
    : 'text-purple-100 bg-white/10 hover:bg-white/15 border border-purple-400/30';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 pointer-events-auto" role="dialog" aria-modal="true" aria-label="Résumé">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={`absolute inset-0 ${isLight ? 'bg-[#2e1065]/40' : 'bg-black/75'}`}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 flex flex-col w-full max-w-4xl h-[min(92vh,1100px)] rounded-2xl sm:rounded-3xl overflow-hidden border-2 shadow-2xl ${
              isLight ? 'bg-[#fcf8ff] border-purple-200' : 'bg-[#140b28] border-purple-500/30'
            }`}
          >
            {/* Header */}
            <div className={`flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b ${isLight ? 'border-purple-200' : 'border-purple-500/20'}`}>
              <div>
                <p className={`text-[10px] font-black tracking-widest uppercase ${isLight ? 'text-pink-600' : 'text-pink-400'}`}>Résumé</p>
                <h2 className={`text-lg sm:text-xl font-black leading-tight ${isLight ? 'text-[#1e1832]' : 'text-white'}`}>Soumya Dwivedi</h2>
              </div>
              <div className="flex items-center gap-2">
                <a href={RESUME_URL} download={RESUME_FILE} className={`${btn} ${primary}`}>
                  <DownloadIcon /> Download PDF
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={`${btn} ${secondary} hidden sm:inline-flex`}>
                  <ExternalIcon /> Open
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close résumé"
                  className={`${btn} ${secondary} px-3`}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body: inline viewer on larger screens, actions-only on phones */}
            <div className="relative flex-1 min-h-0">
              <iframe
                src={`${RESUME_URL}#view=FitH`}
                title="Soumya Dwivedi, résumé (PDF)"
                className="hidden sm:block absolute inset-0 w-full h-full bg-white"
              />
              <div className={`sm:hidden flex flex-col items-center justify-center h-full gap-4 p-6 text-center ${isLight ? 'text-slate-700' : 'text-purple-100/85'}`}>
                <p className="text-sm">Open or download the PDF to view my résumé.</p>
                <div className="flex gap-2">
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={`${btn} ${secondary}`}>
                    <ExternalIcon /> Open
                  </a>
                  <a href={RESUME_URL} download={RESUME_FILE} className={`${btn} ${primary}`}>
                    <DownloadIcon /> Download
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResumeViewer;
