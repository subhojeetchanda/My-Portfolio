import React from 'react';
import Link from 'next/link';
import { profile } from '@/content/profile';

export default function VerifiedPage() {
  return (
    <main className="min-h-screen bg-ink text-paper p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-molten hover:underline mb-8 inline-block">&larr; Back to Plant</Link>
        <h1 className="font-display text-4xl font-bold uppercase mb-4">Underlying Source Data</h1>
        <p className="text-steel-light mb-8">
          This is the raw, serialized data snapshot driving the site's metrics.
        </p>
        <div className="bg-steel/5 border border-steel p-6 overflow-x-auto">
          <pre className="text-xs leading-relaxed text-steel-light whitespace-pre-wrap">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
