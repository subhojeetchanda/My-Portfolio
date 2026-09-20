'use client';

import { MouseEvent, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PointerSheenProps {
  children: React.ReactNode;
  className?: string;
}

export default function PointerSheen({ children, className = '' }: PointerSheenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    
    // Use requestAnimationFrame for performance
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* The content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* The pointer sheen overlay */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
      )}
    </div>
  );
}
