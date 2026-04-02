"use client";
import { COURSES } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const CourseDirectory = () => {
  const[openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="courses" className="py-32 bg-background relative border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter">
            Academic <br/> <span className="font-serif italic text-accent font-normal">Directory</span>
            </h2>
            <p className="max-w-xs font-sans text-muted text-sm uppercase tracking-widest">
                Comprehensive degrees and certifications matching your career trajectory.
            </p>
        </div>

        <div className="w-full border-t-2 border-foreground">
            {COURSES.map((course, idx) => (
                <div key={idx} className="border-b border-foreground/20">
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between py-8 md:py-12 group text-left"
                    >
                        <div className="flex gap-8 md:gap-16 items-center">
                            <span className="font-sans text-sm font-bold text-muted group-hover:text-accent transition-colors">
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="font-serif text-3xl md:text-5xl group-hover:pl-4 transition-all duration-300">
                                {course.category}
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
                                <div className="pb-12 pl-12 md:pl-28">
                                    <p className="font-sans text-lg text-foreground/50 mb-10 max-w-xl">{course.desc}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                        {course.items.map((item, i) => (
                                            <div key={i} className="flex flex-col">
                                                <h4 className="font-sans font-black text-xl md:text-2xl mb-4 text-foreground uppercase">{item.name}</h4>
                                                <ul className="space-y-2">
                                                    {item.specializations.map((spec, sIdx) => (
                                                        <li key={sIdx} className="font-sans text-sm text-muted flex items-center gap-3">
                                                            <span className="w-1 h-1 rounded-full bg-accent" />
                                                            {spec}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
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