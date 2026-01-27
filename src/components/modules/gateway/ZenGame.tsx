// src/components/modules/gateway/ZenGame.tsx

"use client";
import { motion } from 'framer-motion';
// FIXED: Added useRef to imports
import { useState, useEffect, useRef } from 'react';

export const ZenGame = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rows = 12;
  const cols = 12;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 overflow-hidden bg-white/10 backdrop-blur-sm relative">
      <div className="absolute top-8 left-8">
        <p className="font-heading text-[10px] uppercase tracking-[0.4em] text-black/40">Simulation 01 // Magnetism</p>
      </div>

      <div className="grid grid-cols-12 gap-6 relative">
        {[...Array(rows * cols)].map((_, i) => {
          return (
            <Dot key={i} mousePos={mousePos} />
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <h3 className="font-heading text-sm uppercase tracking-[0.3em] text-black">Take Action</h3>
        <p className="font-sans text-[9px] uppercase tracking-widest text-black/30 mt-2">The environment reacts to your intent.</p>
      </div>
    </div>
  );
};

const Dot = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useFrameEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const d = Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2));
    setDistance(d);
  });

  const maxDist = 150;
  const scale = distance < maxDist ? 1 + (maxDist - distance) / 50 : 1;
  const opacity = distance < maxDist ? 1 : 0.2;

  return (
    <motion.div
      ref={ref}
      animate={{ scale, opacity }}
      className="w-1 h-1 bg-black rounded-full"
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
};

// Internal lightweight hook for performance
function useFrameEffect(cb: () => void) {
  useEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      cb();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [cb]);
}