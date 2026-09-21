'use client';

import { useId, useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface StripChartProps {
  data: {
    contributionDays: { contributionCount: number; date: string }[];
  }[];
  total: number;
}

export default function StripChartRecorder({ data, total }: StripChartProps) {
  const chartId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG dimensions
  const width = 800;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 20, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Process data (flatten weeks to get weekly totals)
  // We expect up to 53 weeks.
  const weeklyTotals = data.map(week => ({
    total: week.contributionDays.reduce((acc, day) => acc + day.contributionCount, 0),
    date: week.contributionDays[0]?.date || ''
  }));

  const maxContributions = Math.max(1, ...weeklyTotals.map(w => w.total));

  const maxWeeks = Math.max(52, weeklyTotals.length);
  const dx = chartWidth / Math.max(1, maxWeeks - 1);
  const startOffset = padding.left + (maxWeeks - weeklyTotals.length) * dx;

  const pathData = weeklyTotals.map((week, i) => {
    const x = startOffset + i * dx;
    const y = padding.top + chartHeight - (week.total / maxContributions) * chartHeight;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Grid lines (horizontal)
  const gridLines = Array.from({ length: 4 }).map((_, i) => {
    const y = padding.top + (i * chartHeight) / 3;
    return y;
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setHoveredWeek(prev => (prev === null ? 0 : Math.min(prev + 1, weeklyTotals.length - 1)));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setHoveredWeek(prev => (prev === null ? weeklyTotals.length - 1 : Math.max(prev - 1, 0)));
    } else if (e.key === 'Escape') {
      setHoveredWeek(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const x = svgX - startOffset;
    if (x < -dx/2 || x > chartWidth + dx/2) {
      setHoveredWeek(null);
      return;
    }
    const index = Math.round(x / dx);
    setHoveredWeek(Math.max(0, Math.min(index, weeklyTotals.length - 1)));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-mono text-sm text-paper uppercase tracking-widest mb-1">Strip-Chart Recorder</h4>
          <div className="font-mono text-[10px] text-red-500 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            PEN 1: COMMITS & PRS (52 WEEKS)
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-3xl text-paper">{total}</div>
          <div className="font-mono text-[10px] text-steel-light uppercase">Total Events</div>
        </div>
      </div>

      <div className="relative w-full flex-1 overflow-hidden border border-steel/50 bg-[#e8e4db] rounded-sm p-2 flex flex-col justify-center" aria-labelledby={`${chartId}-title`}>
        <div className="sr-only" id={`${chartId}-title`}>
          Line chart showing GitHub contributions over the last 12 months. Total {total} contributions. 
          Use left and right arrow keys to explore weekly data.
        </div>
        
        {/* SVG Chart */}
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto cursor-crosshair outline-none focus-visible:ring-2 focus-visible:ring-ink"
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredWeek(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="application"
          aria-roledescription="interactive chart"
        >
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d1cdc4" strokeWidth="0.5" />
            </pattern>
          </defs>
          
          {/* Background grid */}
          <rect width={width} height={height} fill="url(#grid)" />
          
          {/* Horizontal dividers */}
          {gridLines.map((y, i) => (
            <line key={i} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#c3bead" strokeWidth="1" strokeDasharray="4 4" />
          ))}

          {/* Pen Trace */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#ef4444" // red-500
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Hover Cursor */}
          {hoveredWeek !== null && weeklyTotals[hoveredWeek] && (
            <g transform={`translate(${startOffset + hoveredWeek * dx}, 0)`}>
              <line 
                x1="0" y1={padding.top} 
                x2="0" y2={height - padding.bottom} 
                stroke="#1f2937" 
                strokeWidth="1" 
                strokeDasharray="2 2"
              />
              <circle 
                cx="0" 
                cy={padding.top + chartHeight - (weeklyTotals[hoveredWeek].total / maxContributions) * chartHeight} 
                r="4" 
                fill="#ef4444" 
                stroke="#e8e4db"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Readout overlay */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="bg-ink text-paper font-mono text-[10px] px-2 py-1 shadow-sm border border-steel">
            CHART NO. 0001
          </div>
        </div>
        
        {hoveredWeek !== null && weeklyTotals[hoveredWeek] && (
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <div className="bg-ink text-paper font-mono text-xs px-3 py-2 shadow-sm border border-steel flex flex-col items-end">
              <span className="text-steel-light text-[10px] uppercase mb-1">
                Week of {new Date(weeklyTotals[hoveredWeek].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-red-400 font-bold">{weeklyTotals[hoveredWeek].total} EVENTS</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Fallback accessible table */}
      <details className="mt-4">
        <summary className="font-mono text-xs text-steel-light cursor-pointer hover:text-paper transition-colors w-max">
          [View Data Table]
        </summary>
        <div className="mt-2 max-h-48 overflow-y-auto border border-steel p-2 bg-ink/50">
          <table className="w-full text-left font-mono text-xs text-steel-light">
            <thead>
              <tr>
                <th className="font-normal py-1 border-b border-steel">Week Starting</th>
                <th className="font-normal py-1 border-b border-steel text-right">Contributions</th>
              </tr>
            </thead>
            <tbody>
              {weeklyTotals.map((w, i) => (
                <tr key={i} className="hover:bg-steel/10">
                  <td className="py-1">{w.date}</td>
                  <td className="py-1 text-right">{w.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      
      {/* Peak week static content */}
      <div className="mt-auto pt-4 flex justify-between text-steel-light font-mono text-[10px] uppercase">
        <span>MAX: {maxContributions} EVENTS/WK</span>
        <span>{weeklyTotals.length} WEEKS RECORDED</span>
      </div>
    </div>
  );
}
