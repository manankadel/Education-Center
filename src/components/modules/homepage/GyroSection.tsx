// src/components/modules/homepage/GyroSection.tsx

"use client";

import { useRef } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useGyroscope } from '@/hooks/useGyroscope';
import Link from 'next/link';
import Image from 'next/image';
import { MotionPermissionPrompt } from '@/components/core/MotionPermissionPrompt';

export const GyroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x } = useGyroscope(); // Get the raw MotionValue
  
  // Smooth out the raw sensor data
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });

  // Map -1 to 1 (Tilt) directly to CSS Clip Path percentages
  // 0% is full left, 100% is full right
  const splitPercent = useTransform(smoothX, [-1, 1], [30, 70]); 
  
  // Create strings for clip-path
  const clipPathLeft = useTransform(splitPercent, (v) => `inset(0 ${100 - v}% 0 0)`);
  const clipPathRight = useTransform(splitPercent, (v) => `inset(0 0 0 ${v}%)`);
  
  // Parallax Text Movement (Opposite to tilt)
  const textX = useTransform(smoothX, [-1, 1], [30, -30]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[85vh] w-full overflow-hidden flex bg-black"
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
             />
        </div>
        
        <motion.div style={{ x: textX }} className="relative z-10 text-center px-4 mix-blend-hard-light">
            {/* Responsive Text Sizes */}
            <h2 className="font-display text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">
                WANT
            </h2>
            <p className="font-sans text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] mb-8">
                Desire. Impulse.
            </p>
            <Link href="/shop/hoodies">
                <button className="px-8 py-3 md:px-10 md:py-4 border border-white text-white font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Shop The Heat
                </button>
            </Link>
        </motion.div>
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
             />
             <div className="absolute inset-0 bg-white/30 mix-blend-lighten" />
        </div>
        
        <motion.div style={{ x: textX }} className="relative z-10 text-center px-4">
            <h2 className="font-display text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">
                NEED
            </h2>
            <p className="font-sans text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] mb-8 text-black">
                Utility. Comfort.
            </p>
            <Link href="/shop/sweatpants">
                <button className="px-8 py-3 md:px-10 md:py-4 border border-black text-black font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    Shop Essentials
                </button>
            </Link>
        </motion.div>
      </motion.div>

      {/* === SPLIT LINE === */}
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white z-30 mix-blend-difference pointer-events-none"
        style={{ left: useTransform(splitPercent, v => `${v}%`) }}
      />
      
      <div className="absolute bottom-8 left-0 w-full text-center z-40 pointer-events-none mix-blend-difference text-white">
        <p className="font-mono text-[9px] uppercase tracking-widest opacity-50">
            &lt; Tilt Device &gt;
        </p>
      </div>
    </section>
  );
};