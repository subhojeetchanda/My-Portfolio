'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeatLine() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Custom hook to detect if we have poured (Easter egg)
  const [isPoured, setIsPoured] = useState(false);

  useEffect(() => {
    const handlePour = () => setIsPoured(true);
    window.addEventListener('heat-pour', handlePour);
    return () => window.removeEventListener('heat-pour', handlePour);
  }, []);

  // Map scroll progress to temperature (25 to 1600)
  const tempValue = useTransform(scrollYProgress, [0, 1], [25, 1600]);
  const [currentTemp, setCurrentTemp] = useState(25);

  useEffect(() => {
    return tempValue.on("change", (latest) => {
      setCurrentTemp(Math.round(latest));
    });
  }, [tempValue]);

  // If reduced motion, always fully filled visually, or top only.
  // The brief says "Static (fully filled or top-only) under prefers-reduced-motion".
  // Let's do a static 50% fill to represent the line.
  const scaleY = prefersReducedMotion ? 1 : scrollYProgress;
  const displayTemp = isPoured ? "1,600°C – POUR" : `${currentTemp}°C`;
  const boxShadowRaw = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px rgba(255, 90, 31, 0)', '0px 0px 20px rgba(255, 90, 31, 0.4)']);
  const boxShadow = prefersReducedMotion ? 'none' : boxShadowRaw;

  return (
    <div className="hidden md:flex w-24 flex-col items-center border-r border-steel absolute top-0 left-0 h-full no-print z-0" aria-hidden="true">
      {/* Background line */}
      <div className="w-px bg-steel h-full absolute left-1/2 -translate-x-1/2"></div>
      
      {/* Molten fill overlay */}
      <motion.div 
        className="w-px bg-gradient-to-b from-molten to-ember h-full absolute left-1/2 -translate-x-1/2 origin-top"
        style={{ scaleY }}
      ></motion.div>

      {/* Temperature Readout Tracker */}
      <motion.div 
        className="sticky top-24 mt-32 bg-ink z-10 px-2 py-4 flex flex-col gap-4 text-center border-y border-steel"
        style={{ 
          // Slight glow effect based on temp
          boxShadow
        }}
      >
        <div className="font-mono text-xs text-molten font-bold rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          TEMP: {displayTemp}
        </div>
      </motion.div>
    </div>
  );
}
