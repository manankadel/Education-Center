"use client";
import { PROGRAMS_LIST } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const ProgramsList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="programs" className="py-32 bg-background relative border-t border-foreground/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter mb-20 text-center">
          Academic <br/> <span className="font-serif italic text-accent font-normal">Syllabus</span>
        </h2>

        <div className="w-full border-t-2 border-foreground">
            {PROGRAMS_LIST.map((prog, idx) => (
                <div key={idx} className="border-b border-foreground/20">
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between py-8 md:py-12 group text-left"
                    >
                        <div className="flex gap-8 md:gap-16 items-baseline">
                            <span className="font-sans text-sm font-bold text-muted group-hover:text-accent transition-colors">
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="font-serif text-3xl md:text-5xl group-hover:pl-4 transition-all duration-300">
                                {prog.title}
                            </span>
                        </div>
                        <span className="font-sans text-3xl font-light text-muted group-hover:text-accent">
                            {openIndex === idx ? '−' : '+'}
                        </span>
                    </button>
                    
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pb-12 pl-12 md:pl-28 font-sans text-lg text-foreground/70 flex justify-between items-end">
                                    <p className="max-w-md">{prog.desc}</p>
                                    <a href="#contact" className="hidden md:inline-block font-sans text-xs font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors border-b border-accent pb-1">
                                        Inquire Now
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};