import React from 'react';
import snapshot from '@/content/lighthouse-snapshot.json';

export default function SelfAuditCertificate() {
  if (!snapshot || !snapshot.scores) return null;

  const getStatus = (score: number) => score >= 90 ? 'PASS' : 'FAIL';
  
  const metrics = [
    { label: 'Performance', score: snapshot.scores.performance },
    { label: 'Accessibility', score: snapshot.scores.accessibility },
    { label: 'Best Practices', score: snapshot.scores.bestPractices },
    { label: 'SEO', score: snapshot.scores.seo },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-2">
        <div>
          <h4 className="font-mono text-xs text-steel-light uppercase mb-1">Audit Record</h4>
          <h3 className="font-display text-2xl font-bold text-paper uppercase">Site Quality Certificate</h3>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-steel-light">CERT. NO: {snapshot.buildId || 'LOCAL'}</p>
          <p className="font-mono text-xs text-steel-light">DATE: {new Date(snapshot.timestamp).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-steel bg-steel/10 font-mono text-xs text-steel-light uppercase tracking-wider">
              <th className="py-3 px-4 font-normal">Metric</th>
              <th className="py-3 px-4 font-normal text-right">Score</th>
              <th className="py-3 px-4 font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm text-paper">
            {metrics.map((m, i) => {
              const status = getStatus(m.score);
              return (
                <tr key={i} className="border-b border-steel/50 hover:bg-steel/5 transition-colors">
                  <td className="py-3 px-4">{m.label}</td>
                  <td className="py-3 px-4 text-right">{m.score}/100</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-block px-2 py-1 text-xs tracking-wider border ${
                      status === 'PASS' 
                        ? 'border-molten text-molten bg-molten/10' 
                        : 'border-steel-light text-steel-light bg-steel/10'
                    }`}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-[10px] text-steel-light mt-4 text-right uppercase">
        Automated snapshot. Regenerated on deploy.
      </p>
    </div>
  );
}
