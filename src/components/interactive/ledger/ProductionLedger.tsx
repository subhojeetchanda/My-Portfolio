import { getGithubStats } from '@/lib/github';
import { getLeetcodeStats } from '@/lib/leetcode';
import StageBadge from '../StageBadge';
import dynamic from 'next/dynamic';
import AlloyComposition from './AlloyComposition';

// We can just use standard imports since they are Client Components
import StripChartRecorder from './StripChartRecorder';
import Stockyard from './Stockyard';

export default async function ProductionLedger() {
  const [github, leetcode] = await Promise.all([
    getGithubStats("subhojeetchanda"),
    getLeetcodeStats("subhojeetchanda18")
  ]);

  const isLive = !github.isSnapshot && !leetcode.isSnapshot;
  const timestampStr = new Date(github.timestamp).toISOString().slice(0, 16).replace('T', ' ') + ' UTC';

  return (
    <section id="production-ledger" className="py-24 border-t border-steel relative mt-12">
      <StageBadge text="03b PRODUCTION LEDGER" />
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-paper mb-4">LIVE PROOF & METRICS</h2>
          <p className="font-sans text-sm text-steel-light mt-1 max-w-lg">
            PRODUCTION LEDGER, live from GitHub and LeetCode, cached hourly.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse-slow' : 'bg-amber-500'}`} aria-hidden="true"></div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-steel-light">
              {isLive ? 'SYS.ONLINE' : 'SYS.SNAPSHOT'}
            </span>
          </div>
          <span className="font-mono text-xs text-steel-light/70">
            Data as of {timestampStr}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Strip Chart */}
        <div className="border border-steel bg-ink p-4 md:p-6 flex flex-col gap-4">
          <StripChartRecorder data={github.weeks} total={github.totalContributions} />
        </div>

        {/* Right Column: Stacked items */}
        <div className="flex flex-col gap-8">
          <div className="border border-steel bg-ink p-4 md:p-6">
            <Stockyard data={leetcode} />
          </div>
          <div className="border border-steel bg-ink p-4 md:p-6">
            <AlloyComposition data={github.languageBytes} />
          </div>
        </div>
      </div>
    </section>
  );
}
