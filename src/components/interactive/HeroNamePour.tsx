'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface HeroNamePourProps {
  name: string;
}

export default function HeroNamePour({ name }: HeroNamePourProps) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    
    // Check if we should play the animation
    if (!prefersReducedMotion) {
      const startPour = () => {
        setShouldPlay(true);
        // Remove the data-intro flag after animation completes to allow normal interaction
        setTimeout(() => {
          document.documentElement.removeAttribute('data-intro');
        }, 2000);
      };
      
      window.addEventListener('ignition-complete', startPour, { once: true });
      
      // Safety fallback in case IgnitionSequence fails or is removed
      const fallbackTimer = setTimeout(() => {
        startPour();
      }, 4000);
      
      return () => {
        window.removeEventListener('ignition-complete', startPour);
        clearTimeout(fallbackTimer);
      };
    } else {
      document.documentElement.removeAttribute('data-intro');
    }
  }, [prefersReducedMotion]);

  if (!isMounted) {
    return (
      <div className="relative">
        {/* We use a CSS class to hide this ONLY if data-intro="play" is present on HTML */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase mb-6 text-paper leading-none tracking-tight intro-name-fallback break-words">
          {name}
        </h1>
      </div>
    );
  }

  if (!shouldPlay) {
    return (
      <div className="relative">
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase mb-6 text-paper leading-none tracking-tight break-words">
          {name}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative mb-6 pb-2 inline-block max-w-full group" aria-label={name}>
      {/* Spark weld arc container */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden pointer-events-none z-30">
        <div className="absolute top-0 left-0 h-full w-[20%] bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.8),0_0_20px_8px_rgba(255,90,31,0.6)] animate-weld-arc rounded-full"></div>
      </div>

      {/* Sparks particles */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] pointer-events-none z-30 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[5px] h-[5px] bg-white rounded-full animate-spark-1 opacity-0"></div>
        <div className="absolute bottom-0 left-[20%] w-[4px] h-[4px] bg-ember rounded-full animate-spark-2 opacity-0"></div>
        <div className="absolute bottom-0 left-[40%] w-[6px] h-[6px] bg-molten rounded-full animate-spark-3 opacity-0"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Layer 1: Base (Cooled steel/paper color) */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase text-paper leading-none tracking-tight break-words">
          {name}
        </h1>

        {/* Layer 2: Molten heat overlay */}
        <h1 
          className="absolute inset-0 font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase text-molten leading-none tracking-tight animate-cool-down pointer-events-none mix-blend-screen break-words"
          aria-hidden="true"
        >
          {name}
        </h1>

        {/* Layer 3: Glow overlay blurred */}
        <h1 
          className="absolute inset-0 font-display text-5xl sm:text-6xl md:text-8xl font-bold uppercase text-molten leading-none tracking-tight animate-cool-down-glow blur-md pointer-events-none mix-blend-screen break-words"
          aria-hidden="true"
        >
          {name}
        </h1>
      </div>

      {/* Heat Stamps */}
      <div className="absolute -top-6 -right-12 sm:-right-24 flex flex-col gap-1 z-20 pointer-events-none">
        <div className="font-mono text-[10px] text-molten border border-molten px-1 py-0.5 bg-ink animate-stamp-in opacity-0">
          HEAT NO. 0001
        </div>
        <div className="font-mono text-[10px] text-molten border border-molten px-1 py-0.5 bg-ink animate-stamp-in-delayed opacity-0">
          GRADE: SDE-2027
        </div>
      </div>
    </div>
  );
}
