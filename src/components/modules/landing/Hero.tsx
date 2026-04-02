"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { HERO_DATA } from '@/lib/data';
import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';

export const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset:["start start", "end start"]
    });

    // Parallax effects
    const yImage = useTransform(scrollYProgress,[0, 1], ["0%", "30%"]);
    const yText = useTransform(scrollYProgress,[0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress,[0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[100vh] pt-32 pb-16 px-6 md:px-12 flex items-center bg-brand-surface overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] bg-[size:40px_40px]" />
            
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
                <motion.div 
                    className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-12"
                    style={{ y: yText, opacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease:[0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-blue/5 border border-brand-blue/10 mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">More than 10 Years in Education</span>
                        </div>
                        
                        <div className="overflow-hidden pb-2">
                            <motion.h1 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease:[0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-brand-blue leading-[1.05] tracking-tight mb-8"
                            >
                                DESTINIES ARE NOT CREATED <span className="text-brand-accent italic font-light">ALONE.</span>
                            </motion.h1>
                        </div>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl border-l-4 border-brand-accent pl-6"
                        >
                            {HERO_DATA.subheadline}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="mt-12 flex flex-wrap items-center gap-6"
                        >
                            <a href="#programs" className="group flex items-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-light transition-all hover:shadow-xl hover:shadow-brand-blue/20">
                                View Programs
                                <ArrowDownRight className="group-hover:rotate-[-45deg] transition-transform" size={20} />
                            </a>
                            <a href="#about" className="text-brand-blue font-semibold hover:text-brand-accent transition-colors underline underline-offset-4 decoration-2 decoration-brand-blue/20 hover:decoration-brand-accent">
                                Discover Our Legacy
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <div className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] min-h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-blue/10">
                    <motion.div 
                        className="absolute inset-0 w-full h-[120%]"
                        style={{ y: yImage }}
                    >
                        <Image 
                            src={HERO_DATA.image} 
                            alt="Students collaborating"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};