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
      className="text-sm font-mono text-steel-light hover:text-paper transition-colors"
      aria-pressed={isStandard}
    >
      {isStandard ? 'Interactive View' : 'Standard View'}
    </button>
  );
}
