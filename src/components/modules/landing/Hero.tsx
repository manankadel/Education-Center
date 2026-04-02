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
        offset: ["start start", "end start"]
    });

    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center bg-brand-surface overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] md:opacity-[0.4] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
            
            <div className="max-w-[1400px] mx-auto w-full px-5 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-28 pb-12 relative z-10">
                <motion.div 
                    className="lg:col-span-7 flex flex-col justify-center"
                    style={{ opacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-brand-blue/5 border border-brand-blue/10 mb-6 md:mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                            <span className="text-[10px] md:text-xs font-bold text-brand-blue uppercase tracking-widest">10+ Years Excellence</span>
                        </div>
                        
                        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-brand-blue leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8">
                            DESTINIES ARE NOT CREATED <span className="text-brand-accent italic font-light">ALONE.</span>
                        </h1>
                        
                        <p className="text-base md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl border-l-4 border-brand-accent pl-5 md:pl-6">
                            {HERO_DATA.subheadline}
                        </p>

                        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                            <a href="#programs" className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-light transition-all shadow-lg shadow-brand-blue/20">
                                View Programs
                                <ArrowDownRight className="group-hover:rotate-[-45deg] transition-transform" size={20} />
                            </a>
                            <a href="#about" className="w-full sm:w-auto text-center text-brand-blue font-semibold hover:text-brand-accent transition-colors underline underline-offset-4 decoration-2 decoration-brand-blue/20 hover:decoration-brand-accent py-2">
                                Discover Our Legacy
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="lg:col-span-5 relative h-[40vh] sm:h-[50vh] lg:h-[75vh] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <motion.div className="absolute inset-0 w-full h-[120%]" style={{ y: yImage }}>
                        <Image 
                            src={HERO_DATA.image} 
                            alt="Students"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-blue/5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};