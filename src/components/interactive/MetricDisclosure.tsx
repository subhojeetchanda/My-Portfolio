'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MetricDisclosureProps = {
  value: React.ReactNode;
  label?: string;
  source: string;
};

export default function MetricDisclosure({ value, label, source }: MetricDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span ref={containerRef} className="inline-block relative">
      <span className="inline-block align-bottom whitespace-nowrap">
        {value}
        <button
          onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
          className="inline-block align-middle relative -top-[1px] ml-1 w-4 h-4 rounded-full border border-steel hover:border-molten hover:text-molten text-steel-light text-[9px] font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-molten bg-ink cursor-pointer leading-[14px] text-center"
          aria-expanded={isOpen}
          aria-label="Metric source disclosure"
          title="View Source"
        >
          i
        </button>
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 left-0 bottom-full mb-2 w-64 p-3 bg-ink border border-steel shadow-xl text-left"
          >
            {label && <span className="block font-mono text-[10px] text-molten uppercase mb-1">{label}</span>}
            <span className="block font-sans text-xs text-steel-light leading-relaxed">
              "{source}"
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
