"use client";

import { PROGRAMS_LIST } from '@/lib/data';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export const Programs = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (containerRef.current) {
                const bounds = containerRef.current.getBoundingClientRect();
                cursorX.set(e.clientX - bounds.left - 150);
                cursorY.set(e.clientY - bounds.top - 200);
            }
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <section id="programs" className="py-20 md:py-32 px-5 md:px-12 bg-white relative overflow-hidden" ref={containerRef}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-10 md:mb-16">
                    <span className="text-brand-accent font-bold uppercase tracking-widest text-xs md:text-sm">Comprehensive Portfolio</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-blue mt-4">
                        Available Programs
                    </h2>
                </div>

                <div className="relative border-t border-gray-200">
                    {PROGRAMS_LIST.map((program, idx) => (
                        <div 
                            key={idx}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-gray-200 py-10 md:py-16 flex flex-col lg:flex-row lg:items-center justify-between cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-brand-surface origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out -z-10" />
                            
                            <div className="relative z-10 lg:w-1/2">
                                <h3 className="font-display text-2xl md:text-5xl font-bold text-brand-blue group-hover:text-brand-accent transition-colors duration-300">
                                    {program.title}
                                </h3>
                                <p className="mt-2 md:mt-4 text-gray-500 text-base md:text-lg font-light group-hover:text-gray-700 transition-colors">
                                    {program.desc}
                                </p>
                            </div>

                            <div className="relative z-10 lg:w-1/2 mt-6 lg:mt-0 flex flex-wrap gap-2 lg:justify-end">
                                {program.details.map((detail, dIdx) => (
                                    <span key={dIdx} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 text-[10px] md:text-xs font-semibold text-gray-600 bg-white shadow-sm">
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    <motion.div
                        className="hidden lg:block absolute top-0 left-0 w-[300px] h-[400px] rounded-2xl overflow-hidden pointer-events-none z-50 shadow-2xl"
                        style={{ x: cursorXSpring, y: cursorYSpring }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: hoveredIndex !== null ? 1 : 0,
                            scale: hoveredIndex !== null ? 1 : 0.8,
                        }}
                    >
                        {PROGRAMS_LIST.map((program, idx) => (
                            <Image
                                key={idx}
                                src={program.image}
                                alt="Reveal"
                                fill
                                sizes="300px"
                                className={`object-cover transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};