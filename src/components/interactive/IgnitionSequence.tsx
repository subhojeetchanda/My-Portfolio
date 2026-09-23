'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: 'INITIALIZING FURNACE...', status: 'OK' },
  { text: 'COMPILING PROFILE.TSX...', status: 'OK' },
  { text: 'LOADING SKILLS.JSON...', status: 'OK' },
  { text: 'AUTH: STEEL CITY, BOKARO...', status: 'OK' },
  { text: 'SYSTEM ONLINE', status: '' }
];

export default function IgnitionSequence() {
  const [stage, setStage] = useState<'boot' | 'terminal' | 'flash' | 'done'>('boot');
  const [visibleLines, setVisibleLines] = useState(0);

  const completeSequence = useCallback(() => {
    localStorage.setItem('forged:intro:v2', 'true');
    setStage('done');
    window.dispatchEvent(new Event('ignition-complete'));
  }, []);

  useEffect(() => {
    // 1. Check if we should play
    if (typeof window === 'undefined') return;

    const hasPlayed = localStorage.getItem('forged:intro:v2');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = (navigator.hardwareConcurrency || 4) <= 4;
    
    // We only play if it hasn't played AND device is capable
    if (hasPlayed || prefersReducedMotion || isLowEnd) {
      completeSequence();
      return;
    }

    setStage('terminal');

    // 2. Safety timeout
    const safetyTimeout = setTimeout(() => {
      completeSequence();
    }, 3000);

    // 3. Skip listeners
    const handleSkip = () => {
      clearTimeout(safetyTimeout);
      completeSequence();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('mousedown', handleSkip);
    window.addEventListener('touchstart', handleSkip);
    window.addEventListener('wheel', handleSkip);

    return () => {
      clearTimeout(safetyTimeout);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('mousedown', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
      window.removeEventListener('wheel', handleSkip);
    };
  }, [completeSequence]);

  // Terminal Sequence Timing
  useEffect(() => {
    if (stage !== 'terminal') return;

    let timers: NodeJS.Timeout[] = [];
    
    // Reveal lines quickly
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
      }, i * 150)); // 150ms per line
    });

    // Trigger flash out
    timers.push(setTimeout(() => {
      setStage('flash');
    }, LINES.length * 150 + 200));

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // Flash Timing
  useEffect(() => {
    if (stage !== 'flash') return;
    const timer = setTimeout(() => {
      completeSequence();
    }, 400); // Wait for flash out animation
    return () => clearTimeout(timer);
  }, [stage, completeSequence]);

  if (stage === 'boot' || stage === 'done') return null;

  return (
    <AnimatePresence>
      {(stage === 'terminal' || stage === 'flash') && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex flex-col pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} // Quick fade out if skipped
        >
          {/* TERMINAL CONTENT */}
          {stage === 'terminal' && (
            <div className="absolute top-8 left-8 flex flex-col gap-1 font-mono text-xs sm:text-sm text-steel-light">
              {LINES.map((line, i) => (
                <div 
                  key={i} 
                  className={`transition-opacity duration-75 flex gap-2 ${i < visibleLines ? 'opacity-100' : 'opacity-0'}`}
                >
                  <span>{line.text}</span>
                  {line.status && (
                    <span className="text-molten font-bold">{line.status}</span>
                  )}
                </div>
              ))}
              
              {/* Heat progress line */}
              <div className="w-48 h-px bg-steel mt-4 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-molten transition-all ease-linear"
                  style={{ 
                    width: `${Math.min((visibleLines / LINES.length) * 100, 100)}%`,
                    transitionDuration: '150ms'
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* FLASH OUT OVERLAY */}
          {stage === 'flash' && (
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--molten),var(--ink))]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 2] }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
