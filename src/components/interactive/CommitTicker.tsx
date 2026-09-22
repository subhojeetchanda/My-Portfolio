import React from 'react';
import { fetchLatestCommits } from '@/lib/github';

export default async function CommitTicker() {
  const commits = await fetchLatestCommits();

  if (!commits || commits.length === 0) return null;

  return (
    <div className="w-full bg-steel/10 border-t border-b border-steel/30 py-2 overflow-hidden mt-8">
      <div className="flex whitespace-nowrap animate-marquee hover:pause-marquee">
        {commits.map((commit, i) => (
          <span key={i} className="inline-block mx-8 font-mono text-xs text-steel-light">
            LATEST FROM THE FLOOR: <span className="text-paper">{commit.message}</span> &middot; {commit.repo} &middot; {commit.date}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {commits.map((commit, i) => (
          <span key={`dup-${i}`} aria-hidden="true" className="inline-block mx-8 font-mono text-xs text-steel-light">
            LATEST FROM THE FLOOR: <span className="text-paper">{commit.message}</span> &middot; {commit.repo} &middot; {commit.date}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause-marquee:hover, .hover\\:pause-marquee:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            overflow-x: auto;
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
}
