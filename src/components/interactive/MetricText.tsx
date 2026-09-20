'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// Individual Odometer for a single number
function OdometerNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  
  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100,
    mass: 1,
  });
  
  const display = useTransform(spring, (current) => Math.round(current));
  
  useEffect(() => {
    if (prefersReducedMotion) {
      spring.set(value);
    } else if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref} className="inline-block tabular-nums font-mono text-molten" aria-hidden="true">
      <motion.span>{display}</motion.span>
    </span>
  );
}

// Wrapper to parse text and inject Odometers
export default function MetricText({ children }: { children: string }) {
  // Regex to match numbers followed optionally by % or +
  const regex = /(\d+)(%|\+)?/g;
  
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(children)) !== null) {
    // Add text before the number
    if (match.index > lastIndex) {
      parts.push(children.substring(lastIndex, match.index));
    }
    
    // Add the number as Odometer
    const num = parseInt(match[1], 10);
    const suffix = match[2] || '';
    
    parts.push(
      <span key={match.index} className="inline-flex items-baseline">
        <OdometerNumber value={num} />
        {suffix && <span className="text-molten font-mono">{suffix}</span>}
      </span>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < children.length) {
    parts.push(children.substring(lastIndex));
  }

  if (parts.length === 1 && typeof parts[0] === 'string') {
    return <>{children}</>;
  }

  return (
    <span>
      {/* Visually hidden real text for screen readers and SEO */}
      <span className="sr-only">{children}</span>
      {/* Animated text for sighted users */}
      <span aria-hidden="true">{parts}</span>
    </span>
  );
}
