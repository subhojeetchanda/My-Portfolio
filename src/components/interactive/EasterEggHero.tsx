'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEggHero() {
  const [clickCount, setClickCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    if (revealed) return;
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      triggerEasterEgg();
    }
  };

  const triggerEasterEgg = () => {
    setRevealed(true);
    // Dispatch event to HeatLine to show "1,600°C - POUR"
    window.dispatchEvent(new Event('heat-pour'));
  };

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button 
        onClick={handleClick}
        className="absolute top-8 right-0 font-mono text-xs text-steel-light border border-steel px-2 py-1 select-none hover:bg-steel/10 transition-colors cursor-pointer text-right z-20"
        aria-label="Heat Number. Click 5 times for a secret."
      >
        HEAT NO. 0001
      </button>
      <div className="absolute top-16 right-0 font-mono text-xs text-steel-light border border-steel px-2 py-1 select-none mt-2 text-right">
        GRADE: SDE-2027
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-28 right-0 max-w-sm bg-ink border border-molten p-4 shadow-lg shadow-molten/20 z-50 text-left"
          >
            <h4 className="font-mono text-sm font-bold text-molten mb-2">BONUS: HOW THIS SITE WAS BUILT</h4>
            <div className="font-sans text-xs text-paper space-y-2 leading-relaxed">
              <p><strong>Stack:</strong> Next.js 15 (App Router), Tailwind CSS v4, Framer Motion.</p>
              <p><strong>Mechanic:</strong> The Control Room uses a pure scoring function mapping 5 project attributes against user weights.</p>
              <p className="font-mono text-[10px] text-steel-light border-l border-steel pl-2 mt-2">
                score = Σ(w_i * a_i) / Σ(w_i)
              </p>
            </div>
            <button 
              onClick={() => setRevealed(false)}
              className="mt-4 font-mono text-xs text-steel-light hover:text-paper"
            >
              [ CLOSE ]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
