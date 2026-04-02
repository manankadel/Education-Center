"use client";
import { TESTIMONIALS } from "@/lib/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ManifestoQuote = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] bg-accent text-background flex items-center justify-center overflow-hidden cursor-none">
      <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1400px] px-6 text-center flex flex-col items-center">
        <span className="font-sans text-xs font-black uppercase tracking-[0.3em] mb-12 opacity-50">
          Voices of the Alumni
        </span>
        
        <div className="h-[40vh] md:h-[30vh] flex items-center justify-center relative w-full">
            <AnimatePresence mode="wait">
                <motion.p 
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="absolute text-2xl md:text-6xl font-serif font-black leading-tight max-w-5xl"
                >
                    "{TESTIMONIALS[index].quote}"
                </motion.p>
            </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background/20">
                <img src={TESTIMONIALS[index].image} alt="Student" className="w-full h-full object-cover grayscale" />
            </div>
            <p className="font-sans font-bold uppercase tracking-widest text-sm">
                — {TESTIMONIALS[index].name}
            </p>
        </div>
      </div>
    </section>
  );
};