'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function HeroEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check constraints
    if (prefersReducedMotion) return;
    
    const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    // @ts-expect-error - non-standard API
    const isSaveData = navigator.connection?.saveData;
    
    if (isLowEnd || isSaveData) return;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldRender(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;
    let isVisible = true;

    // Resize handler
    const handleResize = () => {
      // Get parent container dimensions
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle system
    const maxParticles = 40;
    const particles: Array<{ x: number, y: number, r: number, vx: number, vy: number, alpha: number, fadeRate: number }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * width,
        y: height + 10,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() * -1) - 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        fadeRate: Math.random() * 0.01 + 0.005
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        ...createParticle(),
        y: Math.random() * height // distribute initially
      });
    }

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.fadeRate;

        if (p.alpha <= 0 || p.y < -10) {
          particles[i] = createParticle();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 176, 32, ${Math.max(0, p.alpha)})`; // ember color
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Intersection Observer to pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting && document.visibilityState === 'visible';
      });
    });
    observer.observe(canvas);

    // Page visibility API
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-50 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
