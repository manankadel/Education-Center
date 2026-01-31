// src/components/modules/homepage/ArchiveStack.tsx

"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const IMAGES = [
  "https://wantsandneeds.com/cdn/shop/files/DSC01988.jpg?v=1758250936&width=1680",
  "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Basketball_2.webp?v=1769856523",
  "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Gray_black_Jackson_Evan_bridge_3ffac9ae-369f-4756-a770-901557f03b83.webp?v=1769856522",
  "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/IMG_7275.webp?v=1769856520",
];

export const ArchiveStack = () => {
  const [cards, setCards] = useState(IMAGES);

  const moveCard = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
  };

  return (
    <section className="relative w-full py-24 md:py-40 overflow-hidden bg-[#0a0a0a]">
      {/* 1. CONCEPTUAL BACKGROUND: Shadow Glass */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(40,40,45,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
        
        {/* Left: Text - High Contrast White on Dark */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                    Archive // 02
                </span>
                <div className="h-px w-12 bg-white/20" />
            </div>
           
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white">
                THE<br />VISUAL<br />LOG.
            </h2>
            
            <div className="space-y-6 max-w-sm">
                <p className="font-sans text-sm md:text-base leading-relaxed text-white/50 font-medium">
                    A curated timeline of design iterations, street documentation, and material studies. 
                </p>
                <div className="pt-4 flex flex-col gap-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
                        Interaction Protocol:
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 animate-pulse">
                        [ Tap Image to Cycle ]
                    </p>
                </div>
            </div>
        </div>

        {/* Right: The 3D Stack */}
        <div className="relative w-full h-[550px] md:h-[750px] flex items-center justify-center order-1 lg:order-2 perspective-[2000px]">
            <div 
                className="relative w-[85vw] h-[110vw] md:w-[480px] md:h-[640px] cursor-pointer" 
                onClick={moveCard}
            >
                <AnimatePresence mode="popLayout">
                    {cards.slice(0, 3).map((img, index) => {
                        return (
                            <motion.div
                                key={img}
                                layout
                                className="absolute inset-0 rounded-sm"
                                style={{ zIndex: 10 - index }}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{
                                    scale: 1 - index * 0.06,
                                    y: index * -30, // Stacked upwards for depth
                                    z: index * -100,
                                    rotateX: index * -2,
                                    filter: `blur(${index * 3}px) brightness(${1 - index * 0.3})`,
                                    opacity: 1 - index * 0.2,
                                }}
                                exit={{
                                    x: 400,
                                    rotate: 15,
                                    opacity: 0,
                                    scale: 0.9,
                                    filter: "blur(20px)",
                                    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    mass: 1
                                }}
                            >
                                {/* THE FRAME: High-end white gallery border */}
                                <div className="relative w-full h-full bg-white p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                                    <div className="relative w-full h-full overflow-hidden bg-[#111]">
                                        <Image 
                                            src={img}
                                            alt="W&N Archive"
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            draggable={false}
                                            sizes="(max-width: 768px) 90vw, 500px"
                                            priority={index === 0}
                                        />
                                        {/* Physical Grain Overlay */}
                                        <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay" 
                                             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
                                        />
                                    </div>
                                    
                                    {/* Tech labels on frame */}
                                    <div className="absolute bottom-6 left-6 flex justify-between w-[calc(100%-48px)] items-center pointer-events-none">
                                        <span className="font-mono text-[8px] uppercase tracking-tighter text-black/20">W&N Archive // Ref_{index + 2026}</span>
                                        <span className="font-mono text-[8px] uppercase tracking-tighter text-black/20">NYC_STUDIO_01</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>

      </div>
    </section>
  );
};