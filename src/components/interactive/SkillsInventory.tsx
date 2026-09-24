'use client';

import { useState } from 'react';
import { profile } from '@/content/profile';
import { FadeIn } from './Animations';

export default function SkillsInventory() {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <div className="lg:col-span-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h3 className="font-display text-3xl font-bold uppercase text-paper">Skills Inventory</h3>
        
        {/* View Toggle */}
        <div className="flex border border-steel p-1 bg-ink">
          <button 
            onClick={() => setView('grid')}
            className={`font-mono text-xs px-4 py-2 transition-colors ${view === 'grid' ? 'bg-steel/20 text-paper border border-steel/50' : 'text-steel-light hover:text-paper border border-transparent'}`}
          >
            GRID VIEW
          </button>
          <button 
            onClick={() => setView('map')}
            className={`font-mono text-xs px-4 py-2 transition-colors ${view === 'map' ? 'bg-steel/20 text-paper border border-steel/50' : 'text-steel-light hover:text-paper border border-transparent'}`}
          >
            MAP VIEW
          </button>
        </div>
      </div>
      
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.skills.map((group, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border border-steel p-6 bg-steel/10 transition-all duration-300 hover:-translate-y-1 hover:border-steel-light hover:shadow-[0_0_15px_rgba(255,87,34,0.15)] h-full">
                <h4 className="font-mono text-xs text-steel-light uppercase mb-3 border-b border-steel pb-2">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span key={j} className="font-sans text-sm text-paper bg-ink border border-steel px-2 py-1">{skill}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="border border-steel bg-steel/5 p-8 overflow-x-auto">
          <div className="min-w-[600px] flex flex-col gap-12 relative pb-8">
            {profile.skills.map((group, i) => {
              // Map layer positions somewhat organically
              return (
                <div key={i} className="flex flex-col relative z-10">
                  <div className="font-mono text-[10px] text-molten uppercase tracking-widest mb-4 opacity-80">{group.category}</div>
                  <div className="flex flex-wrap gap-4">
                    {group.skills.map((skill, j) => {
                      const projectsUsingSkill = profile.projects.filter(p => p.stack.includes(skill));
                      return (
                        <div key={j} className="group relative">
                          <div className="font-mono text-sm px-4 py-2 bg-ink border border-steel text-paper cursor-default transition-all group-hover:border-molten group-hover:text-molten shadow-md">
                            {skill}
                          </div>
                          
                          {/* Tooltip for projects */}
                          {projectsUsingSkill.length > 0 && (
                            <div className="absolute top-full left-0 mt-2 p-3 bg-ink border border-molten shadow-[0_0_15px_rgba(255,90,31,0.2)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-48 text-left">
                              <span className="block font-mono text-[9px] text-molten uppercase mb-2">Used In</span>
                              <ul className="flex flex-col gap-1">
                                {projectsUsingSkill.map(p => (
                                  <li key={p.id} className="font-sans text-xs text-paper truncate block before:content-['-'] before:mr-1 before:text-steel-light">{p.title}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* SVG Connectors Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
              <path d="M50 50 L50 400" stroke="var(--steel)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              <path d="M150 150 L150 400" stroke="var(--molten)" strokeWidth="1" strokeDasharray="2 6" fill="none" />
              <path d="M250 250 L250 400" stroke="var(--steel-light)" strokeWidth="1" strokeDasharray="1 3" fill="none" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
