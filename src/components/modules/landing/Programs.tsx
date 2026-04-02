"use client";

import { PROGRAMS_LIST } from '@/lib/data';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export const Programs = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Smooth cursor tracking
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (containerRef.current) {
                const bounds = containerRef.current.getBoundingClientRect();
                cursorX.set(e.clientX - bounds.left - 150); // 150 is half the image width to center it
                cursorY.set(e.clientY - bounds.top - 200);  // 200 is half the image height
            }
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <section id="programs" className="py-32 px-6 md:px-12 bg-white relative" ref={containerRef}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <span className="text-brand-accent font-bold uppercase tracking-widest text-sm">After 12th & Graduation</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-blue mt-4 leading-tight">
                        Programs Available
                    </h2>
                </div>

                <div className="relative border-t border-gray-200">
                    {PROGRAMS_LIST.map((program, idx) => (
                        <div 
                            key={idx}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-gray-200 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                        >
                            {/* Hover Background Fill */}
                            <div className="absolute inset-0 bg-brand-surface origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out -z-10" />
                            
                            <div className="relative z-10 md:w-1/2">
                                <h3 className="font-display text-3xl md:text-5xl font-bold text-brand-blue group-hover:text-brand-accent transition-colors duration-300">
                                    {program.title}
                                </h3>
                                <p className="mt-4 text-gray-500 text-lg font-light group-hover:text-gray-700 transition-colors">
                                    {program.desc}
                                </p>
                            </div>

                            <div className="relative z-10 md:w-1/2 mt-8 md:mt-0 flex flex-wrap gap-2 md:justify-end">
                                {program.details.map((detail, dIdx) => (
                                    <span key={dIdx} className="px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 bg-white group-hover:border-brand-accent/30 transition-colors">
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Floating Hover Image Reveal (Hidden on Mobile) */}
                    <motion.div
                        className="hidden lg:block absolute top-0 left-0 w-[300px] h-[400px] rounded-2xl overflow-hidden pointer-events-none z-50 shadow-2xl"
                        style={{ x: cursorXSpring, y: cursorYSpring }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: hoveredIndex !== null ? 1 : 0,
                            scale: hoveredIndex !== null ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {PROGRAMS_LIST.map((program, idx) => (
                            <Image
                                key={idx}
                                src={program.image}
                                alt={program.title}
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