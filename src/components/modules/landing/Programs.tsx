"use client";
import { PROGRAMS_LIST } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

export const Programs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="programs" className="py-24 md:py-32 bg-background border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <span className="text-accent font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">After 12th & Graduation</span>
        <h2 className="text-4xl md:text-7xl font-display font-black mb-16 md:mb-24 tracking-tighter uppercase">Available Programs</h2>
        
        <div className="flex flex-col border-t border-white/10">
          {PROGRAMS_LIST.map((program, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              className="group relative border-b border-white/10 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer transition-all"
            >
              <div className="relative z-10 flex items-center gap-6 md:gap-12 w-full md:w-auto">
                <span className="text-lg md:text-2xl font-display text-muted/50 group-hover:text-accent transition-colors">
                  0{idx + 1}
                </span>
                <h3 className="text-2xl md:text-5xl font-display font-bold group-hover:pl-4 transition-all duration-300">
                  {program.title}
                </h3>
                {/* Mobile Icon */}
                <Plus className="ml-auto md:hidden text-muted group-hover:text-accent transition-colors" />
              </div>

              {/* Desktop Subtitle */}
              <div className="relative z-10 hidden md:block max-w-sm text-muted text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                <p>{program.desc}</p>
              </div>

              {/* Mobile Expanded View */}
              <AnimatePresence>
                {activeIndex === idx && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden w-full overflow-hidden"
                    >
                        <p className="pt-4 text-muted text-sm">{program.desc}</p>
                    </motion.div>
                )}
              </AnimatePresence>

              {/* Background Reveal (Desktop) */}
              <div className={`absolute inset-0 bg-accent/[0.03] -z-0 transition-opacity duration-300 hidden md:block ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};