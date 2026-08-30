import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const CatLayer = ({ isAboutPage }) => {
  const [hoverPosition, setHoverPosition] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const catRef = useRef(null);

  const handleMouseEnter = () => {
    if (isAboutPage) return;
    if (catRef.current) {
      // Get the absolute positioning bounds
      const rect = catRef.current.getBoundingClientRect();
      const parentRect = catRef.current.offsetParent?.getBoundingClientRect();

      // Calculate scale of the offset parent dynamically (since it is width: 100% of viewport)
      const scale = (parentRect && window.innerWidth > 0) ? parentRect.width / window.innerWidth : 1.12;

      // Calculate local X relative to the absolute offset parent, corrected for parent scale
      const localX = parentRect ? (rect.left - parentRect.left) / scale : rect.left / scale;

      setHoverPosition(localX);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverPosition(null);
  };

  return (
    <motion.div
      ref={catRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        bottom: '18%', // Nestles perfectly on the foreground grass floor
        left: 0,
        // When hovered, lock the horizontal position to localX in pixels.
        // Otherwise, allow Framer Motion's loop keyframes to pace the cat.
        x: isHovered && hoverPosition !== null ? hoverPosition : undefined,
        zIndex: 25,
      }}
      animate={isHovered || isAboutPage ? {} : {
        x: ["25vw", "75vw", "75vw", "25vw", "25vw"],
        scaleX: [0.75, 0.75, -0.75, -0.75, 0.75] // Scale to 0.75x for realistic proportion
      }}
      transition={isHovered || isAboutPage ? {} : {
        x: {
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.45, 0.5, 0.95, 1]
        },
        scaleX: {
          duration: 24,
          repeat: Infinity,
          ease: "steps(1)",
          times: [0, 0.45, 0.5, 0.95, 1]
        }
      }}
      className={`w-14 h-14 select-none ${isAboutPage ? 'pointer-events-none' : 'cursor-pointer pointer-events-auto'
        }`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#0a0416] drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)]">
        <defs>
          {/* Intense yellow glow filter for cat eyes */}
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {isHovered ? (
          // ================= SITTING & STARING STATE =================
          <>
            {/* Sleek Symmetrical Sitting Cat Silhouette */}
            <path
              d="M32,90 C32,80 37,55 42,42 C40,38 39,32 40,26 L34,12 L43,20 C46,18 50,18 54,20 L63,12 L57,26 C58,32 57,38 55,42 C60,55 65,80 65,90 C65,95 62,98 58,98 C54,98 52,94 48,94 C44,94 42,98 38,98 C34,98 32,95 32,90 Z"
              fill="currentColor"
            />
            {/* Curling tail */}
            <path
              d="M63,88 C73,88 80,80 80,70 C80,66 77,63 75,63 C73,63 72,65 72,68 C72,73 68,80 60,80"
              stroke="currentColor"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Glowing Yellow Cat Eyes & Slit Pupils */}
            <motion.g
              initial={{ opacity: 0, scaleY: 0.1 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ originX: '48.5px', originY: '32px' }}
            >
              {/* Left Eye */}
              <ellipse cx="44.5" cy="32" rx="2.8" ry="1.8" fill="#facc15" filter="url(#eyeGlow)" />
              <ellipse cx="44.5" cy="32" rx="0.5" ry="1.8" fill="#000000" />

              {/* Right Eye */}
              <ellipse cx="52.5" cy="32" rx="2.8" ry="1.8" fill="#facc15" filter="url(#eyeGlow)" />
              <ellipse cx="52.5" cy="32" rx="0.5" ry="1.8" fill="#000000" />
            </motion.g>
          </>
        ) : (
          // ================= WALKING PROFILE STATE =================
          <>
            {/* Sleek Profile Walking Cat Silhouette */}
            <path
              d="M 12,32 
                 C 10,25 8,12 18,8 
                 C 22,8 20,18 22,26 
                 C 32,25 45,26 55,29 
                 C 58,26 60,20 64,15 
                 L 66,22 
                 C 68,20 72,15 74,12 
                 L 74,22 
                 C 78,24 81,28 82,32 
                 C 83,36 81,40 76,40 
                 C 73,38 72,36 70,34 
                 C 66,35 62,38 58,40 
                 L 60,65 
                 C 60,68 57,70 55,70 
                 C 53,70 52,67 52,64 
                 L 54,44 
                 C 48,44 42,46 36,48 
                 L 34,68 
                 C 34,71 31,73 29,73 
                 C 27,73 26,70 26,67 
                 L 28,49 
                 C 24,49 20,50 16,52 
                 C 14,53 12,50 12,32 Z"
              fill="currentColor"
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};
