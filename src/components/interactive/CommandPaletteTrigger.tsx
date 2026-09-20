'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';

// Lazy load the actual modal content
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });

export default function CommandPaletteTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border border-steel bg-ink text-steel-light px-3 py-1.5 hover:border-molten hover:text-paper transition-colors font-mono text-xs sm:text-sm"
        aria-label="Search or Jump"
      >
        <Search size={14} />
        <span className="hidden sm:inline">Search / Jump</span>
        <span className="hidden sm:inline border border-steel px-1 text-[10px] ml-1 bg-steel/10 rounded">⌘K</span>
      </button>
      
      {isOpen && (
        <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
