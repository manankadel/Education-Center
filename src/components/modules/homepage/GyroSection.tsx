// src/components/modules/homepage/GyroSection.tsx

"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useGyroscope } from '@/hooks/useGyroscope';
import Link from 'next/link';
import Image from 'next/image';

export const GyroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { smoothedGyroData } = useGyroscope();
  
  // Spring physics for smooth slider movement
  const xParams = useSpring(50, { stiffness: 200, damping: 30 }); // Start at 50%
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const percentage = (x / width) * 100;
    
    xParams.set(percentage);
    
    if (percentage < 50) setHoverSide('left');
    else setHoverSide('right');
  };

  // Gyro fallback for mobile
  useEffect(() => {
    if (smoothedGyroData.x !== 0) {
      // Map gyro tilt (-1 to 1) to percentage (0 to 100)
      const gyroPercent = 50 + (smoothedGyroData.x * 40); 
      xParams.set(gyroPercent);
    }
  }, [smoothedGyroData, xParams]);

  // Transform percentage into clip-path values
  const clipPathLeft = useTransform(xParams, (val) => `inset(0 ${100 - val}% 0 0)`);
  const clipPathRight = useTransform(xParams, (val) => `inset(0 0 0 ${val}%)`);

  return (
    <section 
      ref={containerRef}
      className="relative h-[80vh] w-full overflow-hidden flex bg-black cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => xParams.set(50)} // Reset to center on leave
    >
      {/* === LEFT SIDE: WANTS (Desire/Dark) === */}
      <motion.div 
        className="absolute inset-0 z-20 bg-black text-white flex flex-col justify-center items-center overflow-hidden border-r border-white/20"
        style={{ clipPath: clipPathLeft }}
      >
        <div className="absolute inset-0 opacity-40">
             {/* Replace with a "Hype" or "Dark" product image */}
             <Image 
                src="https://wantsandneeds.com/cdn/shop/files/DSC01988.jpg?v=1758250936&width=1680" 
                alt="Wants" 
                fill 
                className="object-cover grayscale brightness-50"
             />
        </div>
        
        <div className="relative z-10 text-center px-4">
            <h2 className="font-display text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">
                WANT
            </h2>
            <p className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-8">
                Desire. Impulse. Statement.
            </p>
            <Link href="/shop/hoodies">
                <button className={`px-10 py-4 border border-white text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 ${hoverSide === 'left' ? 'scale-110 bg-white text-black' : ''}`}>
                    Shop The Heat
                </button>
            </Link>
        </div>
      </motion.div>

      {/* === RIGHT SIDE: NEEDS (Utility/Light) === */}
      <motion.div 
        className="absolute inset-0 z-10 bg-white text-black flex flex-col justify-center items-center overflow-hidden"
        style={{ clipPath: clipPathRight }} // Technically visible underneath, but we clip it for safety
      >
        {/* Replace with a "Clean" or "White" product image */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200 to-white"></div>
        
        <div className="relative z-10 text-center px-4">
            <h2 className="font-display text-8xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">
                NEED
            </h2>
            <p className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-8 text-black/60">
                Utility. Comfort. Essential.
            </p>
            <Link href="/shop/sweatpants">
                <button className={`px-10 py-4 border border-black text-black font-sans text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 ${hoverSide === 'right' ? 'scale-110 bg-black text-white' : ''}`}>
                    Shop Essentials
                </button>
            </Link>
        </div>
      </motion.div>

      {/* === THE SPLIT LINE === */}
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white z-30 mix-blend-difference pointer-events-none"
        style={{ left: xParams }}
      />
      
      {/* === INSTRUCTION === */}
      <div className="absolute bottom-8 left-0 w-full text-center z-40 pointer-events-none mix-blend-difference text-white">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">
            &lt; Define Your Reality &gt;
        </p>
      </div>
    </section>
  );
};