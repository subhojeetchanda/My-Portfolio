'use client';

import { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface StockyardProps {
  data: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
  }
}

export default function Stockyard({ data }: StockyardProps) {
  const containerId = useId();
  const prefersReducedMotion = useReducedMotion();
  
  // Configuration
  const BLOCKS_PER_UNIT = 5; // 1 block = 5 problems
  
  const categories = [
    { name: 'Hard', count: data.hardSolved, color: 'fill-red-900/80 stroke-red-500/50', height: 12 },
    { name: 'Medium', count: data.mediumSolved, color: 'fill-amber-900/80 stroke-amber-500/50', height: 8 },
    { name: 'Easy', count: data.easySolved, color: 'fill-emerald-900/80 stroke-emerald-500/50', height: 4 },
  ];

  const stackVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.05,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-mono text-sm text-paper uppercase tracking-widest mb-1">Stockyard Inventory</h4>
          <p className="font-sans text-xs text-steel-light" id={containerId}>
            Problems solved on LeetCode. 
          </p>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl text-paper">{data.totalSolved}</div>
          <div className="font-mono text-[10px] text-steel-light uppercase">Total Units</div>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-mono text-[10px] text-steel-light border border-steel px-2 py-1">
          SCALE: 1 BLOCK = {BLOCKS_PER_UNIT} PROBLEMS
        </span>
      </div>

      <div className="flex flex-col gap-6" aria-describedby={containerId}>
        {categories.map((cat) => {
          const blocks = Math.max(1, Math.ceil(cat.count / BLOCKS_PER_UNIT)); // at least 1 block to show it exists, or maybe 0 if 0?
          const displayBlocks = cat.count === 0 ? 0 : blocks;
          
          return (
            <div key={cat.name} className="flex flex-col gap-2">
              <div className="flex justify-between items-end font-mono text-xs text-steel-light uppercase">
                <span>{cat.name}</span>
                <span className="text-paper">{cat.count}</span>
              </div>
              
              <div className="relative w-full h-16 bg-steel/5 border border-steel/20 rounded-sm overflow-hidden flex items-end p-2 gap-1">
                {displayBlocks === 0 ? (
                  <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-steel/50">
                    EMPTY
                  </div>
                ) : (
                  Array.from({ length: displayBlocks }).map((_, i) => (
                    <motion.svg
                      key={i}
                      custom={i}
                      variants={stackVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="flex-shrink-0"
                      width="16"
                      height={cat.height}
                      viewBox={`0 0 16 ${cat.height}`}
                      aria-hidden="true"
                    >
                      <rect width="16" height={cat.height} className={cat.color} strokeWidth="1" />
                    </motion.svg>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
