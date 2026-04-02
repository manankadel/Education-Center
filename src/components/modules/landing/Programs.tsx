/* src/components/modules/landing/Programs.tsx */
"use client";
import { PROGRAMS_LIST } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";

export const Programs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="programs" className="py-32 bg-background border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <span className="text-accent font-bold tracking-widest text-sm uppercase">Curriculum</span>
        <h2 className="text-5xl md:text-7xl font-black mt-4 mb-20 tracking-tighter">OFFERINGS</h2>
        
        <div className="flex flex-col">
          {PROGRAMS_LIST.map((program, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative border-b border-white/10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer transition-all hover:px-8"
            >
              <div className="relative z-10 flex items-center gap-8">
                <span className="text-xl font-display text-muted">0{idx + 1}</span>
                <h3 className="text-4xl md:text-6xl font-bold group-hover:italic transition-all">
                  {program.title}
                </h3>
              </div>

              <div className="relative z-10 mt-4 md:mt-0 max-w-xs text-muted text-right">
                <p>{program.desc}</p>
              </div>

              {/* Reveal Image on Hover */}
              {activeIndex === idx && (
                <motion.div
                  layoutId="hoverBg"
                  className="absolute inset-0 bg-accent/5 -z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};