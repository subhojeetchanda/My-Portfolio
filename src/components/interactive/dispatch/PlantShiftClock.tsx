'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function PlantShiftClock() {
  const [time, setTime] = useState<string>('');
  const [shift, setShift] = useState<string>('');
  const [blink, setBlink] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Initial static state for SSR/hydration matching
    setTime('00:00');
    setShift('A');

    const updateClock = () => {
      if (document.hidden) return; // Pause when tab hidden

      const now = new Date();
      // Get IST time
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes().toString().padStart(2, '0');
      
      setTime(`${hours.toString().padStart(2, '0')}:${minutes}`);
      
      // Calculate Shift
      if (hours >= 6 && hours < 14) {
        setShift('A (Morning)');
      } else if (hours >= 14 && hours < 22) {
        setShift('B (Afternoon)');
      } else {
        setShift('C (Night)');
      }
    };

    updateClock(); // run once immediately on mount
    const interval = setInterval(updateClock, 60000); // every minute
    
    let blinkInterval: NodeJS.Timeout;
    if (!prefersReducedMotion) {
      blinkInterval = setInterval(() => {
        if (!document.hidden) setBlink(b => !b);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, [prefersReducedMotion]);

  // Don't render until mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="bg-ink border border-steel px-4 py-3 w-48 animate-pulse">
        <div className="h-4 bg-steel/20 w-16 mb-2"></div>
        <div className="h-6 bg-steel/20 w-24"></div>
      </div>
    );
  }

  return (
    <div className="bg-ink border border-steel px-4 py-3 inline-flex flex-col gap-1 w-max min-w-40" aria-label="Decorative plant shift clock in IST">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-steel-light uppercase tracking-widest">IST Clock</span>
        <span className="font-mono text-[10px] text-steel-light uppercase tracking-widest">Shift {shift.charAt(0)}</span>
      </div>
      <div className="font-mono text-2xl text-paper flex items-center">
        <span>{time.split(':')[0]}</span>
        <span className={`${!blink && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'} transition-opacity mx-0.5`}>:</span>
        <span>{time.split(':')[1]}</span>
      </div>
      <div className="font-mono text-[10px] text-steel-light/70 uppercase">
        {shift} Shift Active
      </div>
    </div>
  );
}
