'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize state from DOM which was set by the blocking script in layout.tsx
    if (document.documentElement.classList.contains('light')) {
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  // Prevent hydration mismatch by not rendering the icon until mounted
  // We can render a placeholder with the same dimensions
  if (!mounted) {
    return <div className="w-8 h-8 opacity-0"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-paper hover:text-molten transition-colors flex items-center justify-center border border-transparent hover:border-molten/30"
      aria-label={isLight ? "Switch to Night Shift" : "Switch to Day Shift"}
      title={isLight ? "Switch to Night Shift" : "Switch to Day Shift"}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
