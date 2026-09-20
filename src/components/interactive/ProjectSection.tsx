'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/content/profile';
import { Weights, rankProjects } from '@/lib/score';
import Link from 'next/link';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { track } from '@vercel/analytics';
import PointerSheen from './PointerSheen';
import MetricText from './MetricText';

const INITIAL_WEIGHTS: Weights = {
  ml: 0,
  fullStack: 0,
  realTime: 0,
  impact: 0,
  research: 0,
};

const PRESETS = [
  { name: 'ML Engineer', weights: { ml: 10, fullStack: 2, realTime: 3, impact: 8, research: 6 } },
  { name: 'Full-Stack', weights: { ml: 2, fullStack: 10, realTime: 8, impact: 7, research: 1 } },
  { name: 'Research', weights: { ml: 8, fullStack: 1, realTime: 2, impact: 5, research: 10 } },
];

export default function ProjectSection({ projects }: { projects: Project[] }) {
  const [weights, setWeights] = useState<Weights>(INITIAL_WEIGHTS);
  const [showFormula, setShowFormula] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const rankedProjects = rankProjects(projects, weights);
  const isAllZero = Object.values(weights).every((w) => w === 0);
  const topMatch = isAllZero ? null : rankedProjects[0].project.title;

  const handleSliderChange = (axis: keyof Weights, value: number) => {
    setWeights((prev) => ({ ...prev, [axis]: value }));
  };

  const handlePreset = (presetWeights: Weights) => {
    setWeights(presetWeights);
  };

  const handleReset = () => {
    setWeights(INITIAL_WEIGHTS);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Accessibility Announcement Region */}
      <div aria-live="polite" className="sr-only">
        {topMatch ? `Top match: ${topMatch}` : 'Projects in default order'}
      </div>

      {/* CONTROL ROOM */}
      <div className="border border-steel bg-ink p-0 md:p-8">
        {/* Mobile Accordion Header */}
        <button 
          className="w-full flex md:hidden items-center justify-between p-4 min-h-[44px] border-b border-steel font-mono text-sm uppercase font-bold"
          onClick={() => setMobileExpanded(!mobileExpanded)}
        >
          <span>Control Room</span>
          {mobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <div className={`${mobileExpanded ? 'block' : 'hidden'} md:block p-6 md:p-0`}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left: Sliders */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display text-xl uppercase text-paper">Attribute Weights</h4>
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 font-mono text-xs text-steel-light hover:text-molten transition-colors min-h-[44px]"
                  title="Reset all weights to 0"
                >
                  <RotateCcw size={14} /> RESET
                </button>
              </div>

              {(Object.keys(INITIAL_WEIGHTS) as (keyof Weights)[]).map((axis) => (
                <div key={axis} className="flex items-center gap-4">
                  <label htmlFor={`slider-${axis}`} className="font-mono text-xs text-steel-light uppercase w-24 flex-shrink-0">
                    {axis}
                  </label>
                  <input
                    id={`slider-${axis}`}
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={weights[axis]}
                    onChange={(e) => handleSliderChange(axis, parseInt(e.target.value))}
                    className="w-full h-1 bg-steel appearance-none cursor-pointer accent-molten"
                  />
                  <span className="font-mono text-xs text-paper w-4 text-right">
                    {weights[axis]}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Presets & Info */}
            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-6">
              <div>
                <h4 className="font-mono text-xs text-steel-light uppercase mb-3 border-b border-steel pb-2">Presets</h4>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        handlePreset(preset.weights);
                        track('Control Room Preset', { preset: preset.name });
                      }}
                      className="font-mono text-xs bg-steel/10 border border-steel px-3 py-2 min-h-[44px] hover:bg-molten hover:text-ink hover:border-molten transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <button 
                  onClick={() => setShowFormula(!showFormula)}
                  className="font-mono text-xs text-steel-light hover:text-paper min-h-[44px] flex items-center gap-2 border-b border-steel pb-2 w-full justify-between"
                >
                  <span>How is this calculated?</span>
                  {showFormula ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                
                <AnimatePresence>
                  {showFormula && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 font-mono text-[10px] text-steel-light leading-relaxed">
                        <p className="mb-2"><strong>Score = Σ(weight * attribute) / Σ(weight)</strong></p>
                        <p className="mb-2">Project attributes are normalized to [0, 1]. All weights are defined by the sliders (0-10).</p>
                        <p className="italic text-molten/80 border-l border-molten pl-2">
                          Note: Attribute values are my self-assessment, editable in /content/profile.ts
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="flex flex-col gap-12">
        {rankedProjects.map(({ project, totalScore, contributions }, i) => (
          <PointerSheen key={project.id} className="border border-steel bg-steel/5 relative group">
            <motion.div
              layout
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                type: 'tween', 
                ease: 'easeOut',
                duration: 0.5
              }}
              className="relative overflow-hidden w-full h-full"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-molten"></div>
              <div className="p-6 md:p-8 pl-8 md:pl-10 flex flex-col lg:flex-row gap-8">
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-display text-2xl md:text-3xl font-bold text-paper uppercase">
                    {project.title}
                  </h4>
                  <span className="font-mono text-6xl text-steel/20 font-bold leading-none select-none">
                    0{i + 1}
                  </span>
                </div>
                
                {/* Score & Breakdown (Only visible if weights > 0) */}
                {!isAllZero && (
                  <div className="mb-6 p-4 border border-steel bg-ink">
                    <div className="flex items-end justify-between mb-4 border-b border-steel pb-2">
                      <span className="font-mono text-xs text-steel-light uppercase">Match Score</span>
                      <span className="font-mono text-xl text-molten font-bold">
                        {(totalScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex gap-1 h-6">
                      {contributions.map((c) => {
                        const totalW = Object.values(weights).reduce((a, b) => a + b, 0);
                        const width = totalW === 0 ? 0 : (c.maxContribution / totalW) * 100;
                        const fill = c.maxContribution === 0 ? 0 : (c.contribution / c.maxContribution) * 100;
                        
                        if (width === 0) return null;
                        
                        return (
                          <div 
                            key={c.axis} 
                            style={{ width: `${width}%` }} 
                            className="h-full bg-steel/20 relative group/bar cursor-default"
                          >
                            <div 
                              className="absolute bottom-0 left-0 h-full bg-molten transition-all duration-300"
                              style={{ width: `${fill}%` }}
                            ></div>
                            
                            {/* Tooltip */}
                            <div className="absolute opacity-0 group-hover/bar:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ink border border-steel px-2 py-1 font-mono text-[10px] text-paper whitespace-nowrap z-20 pointer-events-none transition-opacity">
                              {c.axis.toUpperCase()}: {(project.attributes[c.axis] * 10).toFixed(1)} / 10
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <ul className="flex flex-col gap-2 mb-6 mt-auto">
                  {project.bulletPoints.map((bp, j) => (
                    <li key={j} className="font-sans text-paper/90 leading-relaxed text-sm">
                      <MetricText>{bp}</MetricText>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/projects/${project.slug || project.id}`} 
                  onClick={() => track('Project View', { project: project.title })}
                  className="font-mono text-sm text-molten hover:text-ember transition-colors inline-flex items-center gap-2"
                >
                  VIEW CASE STUDY <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              
              {/* SPEC TABLE */}
              <div className="lg:w-72 flex-shrink-0 bg-ink border border-steel h-fit">
                <div className="p-3 border-b border-steel font-mono text-xs text-steel-light uppercase tracking-wider">
                  COIL SPECIFICATIONS
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <div>
                    <div className="font-mono text-[10px] text-steel-light mb-1 uppercase">Stack</div>
                    <div className="font-mono text-sm text-paper break-words leading-tight">{project.stack.join(' / ')}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-mono text-[10px] text-steel-light mb-1 uppercase">GitHub</div>
                      <a href={project.links.github !== 'TODO' ? project.links.github : '#'} className="font-mono text-sm text-molten hover:underline truncate block min-h-[44px] flex items-center">
                        {project.links.github === 'TODO' ? 'TODO' : 'Repo'}
                      </a>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-steel-light mb-1 uppercase">Live Link</div>
                      <a href={project.links.live !== 'TODO' ? project.links.live : '#'} className="font-mono text-sm text-molten hover:underline truncate block min-h-[44px] flex items-center">
                        {project.links.live === 'TODO' ? 'TODO' : 'Visit'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </PointerSheen>
        ))}
      </div>
    </div>
  );
}
