// src/components/modules/homepage/GyroSection.tsx

"use client";

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useGyroscope } from '@/hooks/useGyroscope';
import Link from 'next/link';
import Image from 'next/image';
import { MotionPermissionPrompt } from '@/components/core/MotionPermissionPrompt';

export const GyroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x } = useGyroscope(); // Gyro Input (-1 to 1)
  const mouseX = useMotionValue(0); // Mouse Input (-1 to 1)

  const smoothGyro = useSpring(x, { stiffness: 50, damping: 20 });
  const smoothMouse = useSpring(mouseX, { stiffness: 50, damping: 20 });

  const splitFromGyro = useTransform(smoothGyro, [-1, 1], [10, 90]);
  const splitFromMouse = useTransform(smoothMouse, [-1, 1], [10, 90]);

  // Combine inputs safely
  const currentSplit = useTransform(() => {
    if (Math.abs(smoothGyro.get()) > 0.05) return splitFromGyro.get();
    return splitFromMouse.get();
  });

  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

  // FIX: Replaced the buggy useTransform side-effect with useMotionValueEvent
  // This prevents the infinite re-render loop
  useMotionValueEvent(currentSplit, "change", (latest) => {
      const newSide = latest < 50 ? 'left' : 'right';
      // Only update state if it actually changed
      if (newSide !== hoverSide) {
          setHoverSide(newSide);
      }
  });

  const clipPathLeft = useTransform(currentSplit, (v) => `inset(0 ${100 - v}% 0 0)`);
  const clipPathRight = useTransform(currentSplit, (v) => `inset(0 0 0 ${v}%)`);
  const linePos = useTransform(currentSplit, (v) => `${v}%`);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const norm = ((event.clientX - left) / width) * 2 - 1;
    mouseX.set(norm);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-[85vh] w-full overflow-hidden flex bg-black cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MotionPermissionPrompt />

      {/* === LEFT: WANTS === */}
      <motion.div 
        className="absolute inset-0 z-20 bg-black text-white flex flex-col justify-center items-center overflow-hidden border-r border-white/20"
        style={{ clipPath: clipPathLeft }}
      >
        <div className="absolute inset-0 opacity-60">
             <Image 
                src="https://wantsandneeds.com/cdn/shop/files/DSC01988.jpg?v=1758250936&width=1680" 
                alt="Wants" 
                fill 
                className="object-cover grayscale brightness-75"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
             />
        </div>
        
        <div className="relative z-10 text-center px-4 mix-blend-hard-light">
            <h2 className="font-display text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">
                WANT
            </h2>
            <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-8">
                Desire. Impulse.
            </p>
            <Link href="/shop/hoodies">
                <button 
                    className={`px-10 py-4 border border-white font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 ${hoverSide === 'left' ? 'bg-white text-black scale-105' : 'text-white hover:bg-white hover:text-black'}`}
                >
                    Shop The Heat
                </button>
            </Link>
        </div>
      </motion.div>

      {/* === RIGHT: NEEDS === */}
      <motion.div 
        className="absolute inset-0 z-10 bg-white text-black flex flex-col justify-center items-center overflow-hidden"
        style={{ clipPath: clipPathRight }}
      >
        <div className="absolute inset-0 opacity-80">
             <Image 
                src="https://cdn.shopify.com/s/files/1/0975/8736/4138/files/IMG_7275.webp?v=1769856520" 
                alt="Needs" 
                fill 
                className="object-cover grayscale contrast-125"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
             />
             <div className="absolute inset-0 bg-white/30 mix-blend-lighten" />
        </div>
        
        <div className="relative z-10 text-center px-4">
            <h2 className="font-display text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">
                NEED
            </h2>
            <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-8 text-black">
                Utility. Comfort.
            </p>
            <Link href="/shop/sweatpants">
                <button 
                    className={`px-10 py-4 border border-black font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 ${hoverSide === 'right' ? 'bg-black text-white scale-105' : 'text-black hover:bg-black hover:text-white'}`}
                >
                    Shop Essentials
                </button>
            </Link>
        </div>
      </motion.div>

      {/* === SPLIT LINE === */}
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white z-30 mix-blend-difference pointer-events-none"
        style={{ left: linePos }}
      />
      
      <div className="absolute bottom-8 left-0 w-full text-center z-40 pointer-events-none mix-blend-difference text-white">
        <p className="font-mono text-[9px] uppercase tracking-widest opacity-50">
            &lt; Tilt Device &gt;
        </p>
      </div>
    </section>
  );
};