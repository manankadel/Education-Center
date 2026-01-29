// src/components/modules/homepage/StaticInterlude.tsx

"use client";
import Image from 'next/image';

export const StaticInterlude = () => {
  return (
    <section className="w-full bg-white text-black py-24 md:py-32 border-y border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
                02 — Static Break
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                Silence<br />In The<br />Noise.
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-black/70 max-w-md">
                In a world of constant motion, we value the pause. Structure meets fluidity. 
                Our garments are engineered for the moments between the chaos.
            </p>
        </div>

        {/* Right: Static Image */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
            {/* Replace this URL with a clean product shot or lifestyle image */}
            <Image 
                src="https://wantsandneeds.com/cdn/shop/files/DSC01988.jpg?v=1758250936&width=1680"
                alt="Editorial"
                fill
                className="object-cover grayscale contrast-125"
            />
            
            {/* Static Graphic Overlay */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white uppercase tracking-widest bg-black px-2 py-1">
                Fig. A — Archival
            </div>
        </div>

      </div>
    </section>
  );
};