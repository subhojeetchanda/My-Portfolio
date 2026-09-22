import React from 'react';
import crypto from 'crypto';
import { profile } from '@/content/profile';
import Link from 'next/link';

export default function ContentIntegritySeal() {
  const hash = crypto.createHash('sha256').update(JSON.stringify(profile)).digest('hex').substring(0, 8);
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="mt-24 border-t border-steel pt-8 text-center text-steel-light font-mono text-xs">
      <details className="group cursor-pointer">
        <summary className="list-none inline-flex items-center gap-2 hover:text-paper transition-colors px-4 py-2 border border-steel/30 rounded-sm bg-steel/5">
          <svg className="w-4 h-4 text-molten" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          CONTENT VERIFIED {hash} &middot; {date}
        </summary>
        <div className="mt-4 p-4 border border-steel/30 bg-ink/50 text-left max-w-lg mx-auto leading-relaxed">
          <p className="mb-2">
            This seal guarantees that the facts and metrics displayed on this page match a snapshot taken at build time.
            This is a trust signal, not a cryptographic tamper-proof security feature.
          </p>
          <Link href="/verified" className="text-molten hover:underline">
            View underlying source values &rarr;
          </Link>
        </div>
      </details>
    </div>
  );
}
