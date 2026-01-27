// src/components/modules/gateway/KineticTypography.tsx

"use client";

import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const KineticTypography = () => {
  const x = useSpring(0, { stiffness: 50, damping: 20 });
  const y = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize -1 to 1
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;
      
      x.set(xPos);
      y.set(yPos);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  // Movement ranges
  const moveX = useTransform(x, [-1, 1], [50, -50]); // Move 50px left/right
  const moveY = useTransform(y, [-1, 1], [50, -50]);
  const rotate = useTransform(x, [-1, 1], [-5, 5]); // Slight rotation tilt

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      
      {/* LAYER 1: "WANTS" (Top Left) */}
      <motion.div 
        style={{ x: moveX, y: moveY, rotate }}
        className="absolute top-[-10%] left-[-10%] opacity-10 whitespace-nowrap"
      >
        <h1 className="font-display font-black text-[25vw] leading-none text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
          WANTS
        </h1>
      </motion.div>

      {/* LAYER 2: "NEEDS" (Bottom Right) */}
      <motion.div 
        style={{ x: useTransform(moveX, v => -v), y: useTransform(moveY, v => -v), rotate: useTransform(rotate, v => -v) }}
        className="absolute bottom-[-5%] right-[-10%] opacity-10 whitespace-nowrap"
      >
        <h1 className="font-display font-black text-[25vw] leading-none text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
          NEEDS
        </h1>
      </motion.div>

      {/* LAYER 3: "2026" (Center, Huge) */}
      <motion.div 
        style={{ scale: useTransform(x, [-1, 1], [0.95, 1.05]) }}
        className="absolute opacity-[0.03] mix-blend-overlay"
      >
        <h1 className="font-mono font-bold text-[40vw] leading-none text-white tracking-tighter">
          26
        </h1>
      </motion.div>

    </div>
  );
};