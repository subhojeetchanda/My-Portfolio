'use client';

import Link from 'next/link';
import { profile } from '@/content/profile';
import StandardViewToggle from './StandardViewToggle';
import { track } from '@vercel/analytics';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-steel bg-ink/90 backdrop-blur-sm no-print">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold uppercase tracking-wider text-paper">
          {profile.name}
        </Link>

        <nav className="hidden md:flex gap-6 font-mono text-sm text-steel-light">
          <Link href="/#raw-material" className="hover:text-paper transition-colors">01 Material</Link>
          <Link href="/#furnace" className="hover:text-paper transition-colors">02 Furnace</Link>
          <Link href="/#rolling-mill" className="hover:text-paper transition-colors">03 Mill</Link>
          <Link href="/#quality-lab" className="hover:text-paper transition-colors">04 Lab</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#contact" className="font-mono text-sm text-molten hover:text-ember transition-colors">
            Contact
          </Link>
          {/* Standard View Toggle */}
          <div onClick={() => track('Toggle Standard View')}>
            <StandardViewToggle />
          </div>
          <a
            href="/Subhojeet_Chanda_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('Download Resume')}
            className="border border-steel hover:border-steel-light text-paper px-3 py-1.5 text-sm font-mono transition-colors"
          >
            Resume PDF
          </a>
        </div>
      </div>
    </header>
  );
}
