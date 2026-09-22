'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function StandardViewToggle() {
  const [isStandard, setIsStandard] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('standardView') === 'true';
    // eslint-disable-next-line
    setIsStandard(stored);
    
    if (pathname === '/standard' && !stored) {
      localStorage.setItem('standardView', 'true');
      // eslint-disable-next-line
      setIsStandard(true);
      document.documentElement.setAttribute('data-view', 'standard');
    }
  }, [pathname]);

  const toggleView = () => {
    const nextState = !isStandard;
    setIsStandard(nextState);
    localStorage.setItem('standardView', String(nextState));
    
    if (nextState) {
      document.documentElement.setAttribute('data-view', 'standard');
      router.push('/standard');
    } else {
      document.documentElement.removeAttribute('data-view');
      router.push('/');
    }
  };

  return (
    <button
      onClick={toggleView}
      className="text-sm font-mono text-steel-light hover:text-paper transition-colors flex items-center justify-center p-1 sm:p-0"
      aria-pressed={isStandard}
      title={isStandard ? 'Interactive View' : 'Standard View'}
    >
      <span className="hidden sm:inline">{isStandard ? 'Interactive View' : 'Standard View'}</span>
      <svg className="sm:hidden w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isStandard ? "M13 10V3L4 14h7v7l9-11h-7z" : "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"} />
      </svg>
    </button>
  );
}
