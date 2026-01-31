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
    // Move the first item to the end of the array
    setCards((prev) => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
  };

  return (
    <section className="w-full bg-white text-black py-32 border-y border-black/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Editorial Text */}
        <div className="flex flex-col gap-8 order-2 lg:order-1 z-10 relative">
            <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
                    02 — The Archives
                </span>
                <div className="h-px w-20 bg-black/10" />
            </div>
           
            <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                Raw.<br />Texture.<br />Form.
            </h2>
            <p className="font-sans text-base leading-relaxed text-black/60 max-w-md font-medium">
                Documenting the process. From the concrete textures of the city to the fabric in the studio. 
                This is a living collection of our visual language.
            </p>
            
            <button 
                onClick={moveCard}
                className="group flex items-center gap-4 mt-4 w-fit cursor-pointer"
            >
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    Next Image
                </span>
            </button>
        </div>

        {/* Right: The GIANT Stack */}
        <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center order-1 lg:order-2 perspective-[1000px]">
            
            {/* The Click Area */}
            <div 
                className="relative w-[350px] md:w-[450px] aspect-[3/4] cursor-pointer group" 
                onClick={moveCard}
            >
                <AnimatePresence mode="popLayout">
                    {cards.slice(0, 3).map((img, index) => {
                        return (
                            <motion.div
                                key={img}
                                layoutId={img} // Magic layout animation
                                className="absolute inset-0 origin-bottom"
                                style={{
                                    zIndex: cards.length - index,
                                }}
                                initial={false}
                                animate={{
                                    scale: 1 - index * 0.05,        // 1, 0.95, 0.9
                                    y: index * 30,                  // 0, 30, 60
                                    rotate: index % 2 === 0 ? index * 2 : index * -2, // Alternating tilt
                                    filter: `blur(${index * 2}px) brightness(${1 - index * 0.1})`, // Depth of field
                                    opacity: 1
                                }}
                                exit={{
                                    x: 400,            // Fly Right
                                    y: 100,            // Fly Down slightly
                                    rotate: 20,        // Tilt
                                    opacity: 0,        // Fade
                                    scale: 0.9,
                                    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 25,
                                    mass: 1
                                }}
                            >
                                <div className="relative w-full h-full shadow-2xl bg-white p-2">
                                    <div className="relative w-full h-full overflow-hidden bg-gray-100">
                                        <Image 
                                            src={img}
                                            alt="Archive"
                                            fill
                                            className="object-cover"
                                            draggable={false}
                                            sizes="(max-width: 768px) 100vw, 500px"
                                        />
                                        
                                        {/* Glossy Texture Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none mix-blend-overlay" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            
            {/* Background decorative graphic */}
            <div className="absolute -z-10 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl opacity-50" />
            
        </div>

      </div>
    </section>
  );
};