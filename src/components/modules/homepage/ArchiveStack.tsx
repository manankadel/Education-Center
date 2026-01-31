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
    <section className="w-full bg-white text-black py-24 md:py-32 border-y border-black/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 z-10 relative">
            <div className="flex items-center gap-4">
                 <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
                    02 — The Archives
                </span>
                <div className="h-px w-20 bg-black/10" />
            </div>
           
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                Raw.<br />Texture.<br />Form.
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-black/60 max-w-md font-medium">
                Documenting the process. From the concrete textures of the city to the fabric in the studio.
            </p>
            
            <button onClick={moveCard} className="group flex items-center gap-4 mt-4 w-fit cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    Next Image
                </span>
            </button>
        </div>

        {/* Right: The Stack */}
        <div className="relative w-full h-[500px] md:h-[800px] flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-[300px] md:w-[450px] aspect-[3/4] cursor-pointer" onClick={moveCard}>
                <AnimatePresence mode="popLayout">
                    {cards.slice(0, 3).map((img, index) => {
                        return (
                            <motion.div
                                key={img}
                                layoutId={img}
                                className="absolute inset-0 origin-bottom"
                                style={{ zIndex: cards.length - index }}
                                initial={false}
                                animate={{
                                    scale: 1 - index * 0.05,
                                    y: index * 20,
                                    rotate: index % 2 === 0 ? index * 2 : index * -2,
                                    filter: `blur(${index * 2}px) brightness(${1 - index * 0.1})`,
                                    opacity: 1
                                }}
                                exit={{
                                    x: 300,
                                    rotate: 15,
                                    opacity: 0,
                                    transition: { duration: 0.4 }
                                }}
                            >
                                <div className="relative w-full h-full shadow-2xl bg-white p-2">
                                    <div className="relative w-full h-full overflow-hidden bg-gray-100">
                                        <Image src={img} alt="Archive" fill className="object-cover" draggable={false} />
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