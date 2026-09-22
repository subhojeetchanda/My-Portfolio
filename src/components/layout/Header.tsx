'use client';

import Link from 'next/link';
import { profile } from '@/content/profile';
import StandardViewToggle from './StandardViewToggle';
import ThemeToggle from './ThemeToggle';
import CommandPaletteTrigger from '../interactive/CommandPaletteTrigger';
import { track } from '@vercel/analytics';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-steel bg-ink/90 backdrop-blur-sm no-print">
      <div className="max-w-7xl mx-auto px-4 md:pl-[144px] h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold uppercase tracking-wider text-paper whitespace-nowrap flex-shrink-0">
          {profile.name}
        </Link>

        <nav className="hidden lg:flex gap-4 xl:gap-6 font-mono text-sm text-steel-light whitespace-nowrap">
          <Link href="/#raw-material" className="hover:text-paper transition-colors">01 Material</Link>
          <Link href="/#furnace" className="hover:text-paper transition-colors">02 Furnace</Link>
          <Link href="/#rolling-mill" className="hover:text-paper transition-colors">03 Mill</Link>
          <Link href="/#quality-lab" className="hover:text-paper transition-colors">04 Lab</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <CommandPaletteTrigger />
          <ThemeToggle />
          <Link href="#contact" className="hidden lg:inline font-mono text-sm text-molten hover:text-ember transition-colors whitespace-nowrap">
            Contact
          </Link>
          {/* Standard View Toggle */}
          <div onClick={() => track('Toggle Standard View')}>
            <StandardViewToggle />
          </div>
          <div className="flex border border-steel hover:border-steel-light transition-colors group">
            <a
              href="https://drive.google.com/file/d/17ml297sXWrK8GxLu5FuVsAwTuUhW6Ut-/view"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('View Resume')}
              className="text-paper px-3 py-1.5 text-sm font-mono hover:bg-steel/20 transition-colors whitespace-nowrap"
            >
              Resume PDF
            </a>
            <div className="w-px bg-steel group-hover:bg-steel-light transition-colors"></div>
            <a
              href="https://drive.google.com/uc?export=download&id=17ml297sXWrK8GxLu5FuVsAwTuUhW6Ut-"
              onClick={() => track('Download Resume')}
              className="text-paper px-2 py-1.5 text-sm font-mono flex items-center justify-center hover:bg-steel/20 transition-colors"
              aria-label="Download Resume"
              title="Download Resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
