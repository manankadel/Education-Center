// src/components/modules/homepage/ArchiveStack.tsx

"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const IMAGES = [
  "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Basketball_2.webp?v=1769856523",
  "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Gray_black_Jackson_Evan_bridge_3ffac9ae-369f-4756-a770-901557f03b83.webp?v=1769856522",
  "https://wantsandneeds.com/cdn/shop/files/DSC01988.jpg?v=1758250936&width=1680",
];

export const ArchiveStack = () => {
  // We double the array to make the stack feel infinite for a while
  const [cards, setCards] = useState([...IMAGES, ...IMAGES]);

  const moveCard = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const movedCard = newCards.shift(); // Remove top
      if (movedCard) newCards.push(movedCard); // Add to bottom
      return newCards;
    });
  };

  return (
    <section className="w-full bg-white text-black py-24 md:py-32 border-y border-black/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Editorial Text */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
            <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
                    02 — The Archives
                </span>
                <div className="h-px flex-grow bg-black/10" />
            </div>
           
            <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                Raw.<br />Unfiltered.<br />Process.
            </h2>
            <p className="font-sans text-sm leading-relaxed text-black/70 max-w-md">
                We document the journey. From the streets of NYC to the quiet of the studio. 
                This isn't just clothing; it's a catalog of moments, textures, and grit.
            </p>
            <div className="mt-4">
                 <p className="font-mono text-[9px] uppercase tracking-widest text-black/40 animate-pulse">
                    [ Tap photos to cycle ]
                </p>
            </div>
        </div>

        {/* Right: The Interactive Stack */}
        <div className="relative w-full aspect-[4/5] md:aspect-square flex items-center justify-center order-1 md:order-2">
            <div className="relative w-64 h-80 md:w-80 md:h-96 cursor-pointer" onClick={moveCard}>
                <AnimatePresence>
                    {cards.slice(0, 3).map((img, index) => {
                        // Top card is index 0
                        const isTop = index === 0;
                        return (
                            <motion.div
                                key={`${img}-${index}`} // Composite key to ensure uniqueness in mapping
                                className="absolute inset-0 bg-gray-100 shadow-2xl border-4 border-white"
                                style={{ 
                                    zIndex: cards.length - index,
                                }}
                                initial={{ scale: 1, x: 0, y: 0, rotate: (Math.random() * 6) - 3 }} // Random slight rotation
                                animate={{ 
                                    scale: 1 - index * 0.05, // Cards behind get smaller
                                    y: index * 15, // Cards behind move down
                                    rotate: isTop ? 0 : (index % 2 === 0 ? 3 : -3), // Messy stack look
                                }}
                                exit={{ 
                                    x: 300, 
                                    opacity: 0, 
                                    rotate: 20,
                                    transition: { duration: 0.4 } 
                                }}
                                whileHover={isTop ? { scale: 1.05, rotate: 0 } : {}}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={img}
                                        alt="Archive"
                                        fill
                                        className="object-cover"
                                        draggable={false}
                                    />
                                    {/* Texture Overlay for 'Film' look */}
                                    <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
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