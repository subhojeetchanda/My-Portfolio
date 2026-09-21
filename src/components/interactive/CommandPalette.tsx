'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sun, Moon, FileText, Mail, Monitor } from 'lucide-react';
import { profile } from '@/content/profile';
import { track } from '@vercel/analytics';

type Action = {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
};

// Hand-written fuzzy filter
function fuzzyMatch(pattern: string, text: string) {
  if (pattern.length === 0) return true;
  pattern = pattern.toLowerCase();
  text = text.toLowerCase();
  let patternIdx = 0;
  let textIdx = 0;
  while (patternIdx < pattern.length && textIdx < text.length) {
    if (pattern[patternIdx] === text[textIdx]) {
      patternIdx++;
    }
    textIdx++;
  }
  return patternIdx === pattern.length;
}

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Define all possible actions
  const actions: Action[] = [
    {
      id: 'jump-material',
      title: 'Jump to Raw Material (Skills)',
      icon: <ArrowRight size={16} />,
      onSelect: () => { router.push('/#raw-material'); onClose(); }
    },
    {
      id: 'jump-furnace',
      title: 'Jump to The Furnace (Experience)',
      icon: <ArrowRight size={16} />,
      onSelect: () => { router.push('/#furnace'); onClose(); }
    },
    {
      id: 'jump-mill',
      title: 'Jump to Rolling Mill (Projects)',
      icon: <ArrowRight size={16} />,
      onSelect: () => { router.push('/#rolling-mill'); onClose(); }
    },
    {
      id: 'jump-lab',
      title: 'Jump to Quality Lab (Education)',
      icon: <ArrowRight size={16} />,
      onSelect: () => { router.push('/#quality-lab'); onClose(); }
    },
    {
      id: 'jump-dispatch',
      title: 'Jump to Dispatch (Contact)',
      icon: <ArrowRight size={16} />,
      onSelect: () => { router.push('/#dispatch'); onClose(); }
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      icon: <FileText size={16} />,
      onSelect: () => { window.open('/Subhojeet_Chanda_Resume.pdf', '_blank'); onClose(); }
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      description: profile.email,
      icon: <Mail size={16} />,
      onSelect: () => {
        navigator.clipboard.writeText(profile.email);
        alert('Email copied to clipboard');
        onClose();
      }
    },
    {
      id: 'toggle-view',
      title: 'Toggle Standard / Interactive View',
      icon: <Monitor size={16} />,
      onSelect: () => {
        const isStandard = localStorage.getItem('standardView') === 'true';
        if (isStandard) {
          localStorage.removeItem('standardView');
          window.location.href = '/';
        } else {
          localStorage.setItem('standardView', 'true');
          window.location.href = '/standard';
        }
      }
    },
    {
      id: 'toggle-theme',
      title: 'Toggle Day / Night Shift (Theme)',
      icon: <Sun size={16} />,
      onSelect: () => {
        const isLight = document.documentElement.classList.contains('light');
        if (isLight) {
          document.documentElement.classList.remove('light');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.add('light');
          localStorage.setItem('theme', 'light');
        }
        onClose();
      }
    },
    {
      id: 'replay-intro',
      title: 'Replay Signature Intro',
      description: 'Run the molten name pour animation again',
      icon: <FileText size={16} />,
      onSelect: () => {
        localStorage.removeItem('forged:intro:v1');
        window.location.reload();
      }
    },
    ...profile.projects.map(p => ({
      id: `project-${p.slug}`,
      title: `View Project: ${p.title}`,
      icon: <ArrowRight size={16} />,
      onSelect: () => { router.push(`/projects/${p.slug || p.id}`); onClose(); }
    }))
  ];

  // Filter actions based on query
  const filteredActions = query === '' 
    ? actions 
    : actions.filter(action => fuzzyMatch(query, action.title) || (action.description && fuzzyMatch(query, action.description)));

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      track('Command Palette Opened');
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onSelect();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div 
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div className="relative bg-ink border border-steel shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[60vh] sm:max-h-[50vh]">
        
        {/* Input */}
        <div className="flex items-center border-b border-steel px-4 py-3">
          <Search size={18} className="text-steel-light mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none font-mono text-paper placeholder-steel-light text-sm"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-autocomplete="list"
            aria-controls="command-palette-results"
            aria-activedescendant={filteredActions.length > 0 ? `action-${filteredActions[selectedIndex].id}` : undefined}
          />
          <div className="font-mono text-[10px] text-steel-light border border-steel px-1.5 py-0.5 rounded ml-2 hidden sm:block">ESC</div>
        </div>

        {/* Results */}
        <ul 
          id="command-palette-results"
          className="overflow-y-auto flex-1 p-2 focus:outline-none"
          role="listbox"
        >
          {filteredActions.length === 0 ? (
            <li className="px-4 py-8 text-center font-mono text-steel-light text-sm">
              No results found for &quot;{query}&quot;
            </li>
          ) : (
            filteredActions.map((action, index) => {
              const isSelected = index === selectedIndex;
              return (
                <li
                  key={action.id}
                  id={`action-${action.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={action.onSelect}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`
                    flex items-center gap-3 px-3 py-3 font-mono text-sm cursor-pointer border-l-2 transition-colors
                    ${isSelected ? 'bg-steel/20 border-molten text-paper' : 'border-transparent text-steel-light hover:text-paper'}
                  `}
                >
                  <span className={isSelected ? 'text-molten' : 'text-steel-light'}>
                    {action.icon}
                  </span>
                  <div className="flex flex-col">
                    <span>{action.title}</span>
                    {action.description && (
                      <span className="text-[10px] text-steel-light/70 mt-0.5">{action.description}</span>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>

        {/* Screen reader announcement for results */}
        <div aria-live="polite" className="sr-only">
          {filteredActions.length} results found.
        </div>
        
      </div>
    </div>
  );
}
