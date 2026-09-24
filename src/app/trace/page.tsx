import Link from 'next/link';
import { profile } from '@/content/profile';
import ContentIntegritySeal from '@/components/static/ContentIntegritySeal';
import StageBadge from '@/components/interactive/StageBadge';

export const metadata = {
  title: 'System Trace - Subhojeet Chanda',
  description: 'Traceability page for Subhojeet Chanda portfolio.',
};

export default function TracePage() {
  const buildDate = new Date().toISOString().split('T')[0]; // Current date on build
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 md:py-32 min-h-screen flex flex-col justify-center">
      <Link href="/" className="font-mono text-sm text-steel-light hover:text-molten transition-colors mb-12 inline-block">
        &larr; Return to Main System
      </Link>
      
      <StageBadge text="TRACE LOG" />
      <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8 text-paper mt-8">System Traceability</h1>
      
      <div className="bg-steel/5 border border-steel p-8 flex flex-col gap-8 mb-12">
        <div>
          <span className="font-mono text-[10px] text-steel-light uppercase tracking-widest block mb-1">Build Timestamp</span>
          <span className="font-mono text-sm text-molten">{buildDate}</span>
        </div>
        
        <div>
          <span className="font-mono text-[10px] text-steel-light uppercase tracking-widest block mb-4 border-b border-steel/30 pb-2">Verified Endpoints</span>
          <ul className="flex flex-col gap-3 font-mono text-sm">
            {profile.links.github !== 'TODO' && (
              <li><a href={profile.links.github} className="text-paper hover:text-molten underline underline-offset-2">GitHub Profile</a></li>
            )}
            {profile.links.linkedin !== 'TODO' && (
              <li><a href={profile.links.linkedin} className="text-paper hover:text-molten underline underline-offset-2">LinkedIn Profile</a></li>
            )}
            {profile.links.leetcode !== 'TODO' && (
              <li><a href={profile.links.leetcode} className="text-paper hover:text-molten underline underline-offset-2">LeetCode Profile</a></li>
            )}
            <li>
              <a href="/Subhojeet_Chanda_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-paper hover:text-molten underline underline-offset-2">
                Download Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <ContentIntegritySeal />
    </div>
  );
}
