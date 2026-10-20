// Browsers don't let a web page lock screen orientation, so on phones held sideways the site is
// covered with this notice instead (pure CSS media query: shows only on touch phones in landscape).
export const RotateNotice = ({ theme }) => {
  const isLight = theme === 'light';
  return (
    <div
      role="alert"
      className={`rotate-notice fixed inset-0 z-[100000] flex-col items-center justify-center gap-4 px-8 text-center select-none ${
        isLight ? 'bg-[#f5ecff] text-[#1e1832]' : 'bg-[#07010e] text-white'
      }`}
    >
      <svg viewBox="0 0 64 64" className="w-16 h-16 rotate-notice-phone" aria-hidden="true">
        <rect x="20" y="6" width="24" height="52" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="51" r="2" fill="currentColor" />
      </svg>
      <p className="font-mileast text-2xl tracking-tight">Please turn your phone upright</p>
      <p className={`text-sm font-questrial ${isLight ? 'text-purple-900/80' : 'text-purple-200/80'}`}>
        This portfolio is designed for portrait on phones.
      </p>
    </div>
  );
};

export default RotateNotice;
