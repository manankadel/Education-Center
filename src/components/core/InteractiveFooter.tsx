// src/components/core/InteractiveFooter.tsx

"use client";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);
        return () => window.removeEventListener("mousemove", setFromEvent);
    }, []);
    return position;
};

function useFrameEffect(cb: () => void) {
  useEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      cb();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [cb]);
}

const Dot = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.2);

  useFrameEffect(() => {
    if (!dotRef.current) return;
    const rect = dotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2));

    const maxDist = 120; // Radius of interaction
    if (dist < maxDist) {
        const influence = (maxDist - dist) / maxDist;
        setScale(1 + influence * 1.5);
        setOpacity(0.2 + influence * 0.8);
    } else {
        setScale(1);
        setOpacity(0.2);
    }
  });

  return (
    <motion.div
      ref={dotRef}
      animate={{ scale, opacity }}
      className="w-1 h-1 bg-black rounded-full"
      transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.1 }}
    />
  );
};

export const InteractiveFooter = () => {
    const mousePos = useMousePosition();
    const cols = 50;
    
    return (
        <footer className="relative w-full bg-[#f5f5f5] py-20 overflow-hidden border-t border-black/5">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="grid grid-cols-50 gap-6">
                    {[...Array(cols * 5)].map((_, i) => (
                        <Dot key={i} mousePos={mousePos} />
                    ))}
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-12 flex justify-between items-center text-black">
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-50">
                    © 2026 WANTS & NEEDS
                </span>
                <div className="flex gap-6 font-mono text-[9px] uppercase tracking-widest opacity-50">
                    <Link href="/privacy" className="hover:opacity-100">Privacy</Link>
                    <Link href="/terms" className="hover:opacity-100">Terms</Link>
                    <Link href="/reach-out" className="hover:opacity-100">Contact</Link>
                </div>
            </div>
        </footer>
    );
}