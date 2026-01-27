"use client";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Simplified hook to track mouse position
const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);
        return () => window.removeEventListener("mousemove", setFromEvent);
    }, []);
    return position;
};

export const ZenGame = () => {
  const rows = 12;
  const cols = 12;
  const mousePos = useMousePosition();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 overflow-hidden relative">
      <div className="absolute top-8 left-8">
        <p className="font-heading text-[10px] uppercase tracking-[0.4em] text-black/40">Simulation 01 // Magnetism</p>
      </div>

      <div className="grid grid-cols-12 gap-6 relative">
        {[...Array(rows * cols)].map((_, i) => (
          <Dot key={i} mousePos={mousePos} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="font-heading text-sm uppercase tracking-[0.3em] text-black">Take Action</h3>
        <p className="font-sans text-[9px] uppercase tracking-widest text-black/30 mt-2">The environment reacts to your intent.</p>
      </div>
    </div>
  );
};

// SIMPLIFIED DOT COMPONENT
const Dot = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.2);

  useEffect(() => {
    const calculateDistance = () => {
        if (!dotRef.current) return;
        
        const rect = dotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2));

        const maxDist = 150;
        if (dist < maxDist) {
            const influence = (maxDist - dist) / maxDist; // 1 at center, 0 at edge
            setScale(1 + influence * 2); // Max scale of 3
            setOpacity(0.2 + influence * 0.8); // Max opacity of 1
        } else {
            setScale(1);
            setOpacity(0.2);
        }
    };
    
    // Use requestAnimationFrame for smooth updates
    let animationFrameId: number;
    const update = () => {
        calculateDistance();
        animationFrameId = requestAnimationFrame(update);
    };
    update();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <motion.div
      ref={dotRef}
      animate={{ scale, opacity }}
      className="w-1 h-1 bg-black rounded-full"
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    />
  );
};