"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HERO_SLIDES } from '@/lib/tmp_data';

export const HeroSection = () => {
    const [current, setCurrent] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={HERO_SLIDES[current].image}
                        alt={HERO_SLIDES[current].title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
                </motion.div>
            </AnimatePresence>

            {/* TEXT CONTENT */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
                <motion.div
                    key={`text-${current}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="font-mono text-xs md:text-sm text-[#FFB000] uppercase tracking-[0.4em] mb-4 bg-black/50 backdrop-blur-md inline-block px-4 py-2 border border-[#FFB000]/30">
                        {HERO_SLIDES[current].subtitle}
                    </p>
                    <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-8 drop-shadow-[0_0_30px_rgba(255,176,0,0.3)]">
                        {HERO_SLIDES[current].title.split(' ')[0]}<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                            {HERO_SLIDES[current].title.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>
                    
                    <Link href={HERO_SLIDES[current].link}>
                        <button className="group relative px-10 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest overflow-hidden hover:text-white transition-colors duration-300">
                            <div className="absolute inset-0 w-full h-full bg-[#FFB000] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10">{HERO_SLIDES[current].cta}</span>
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* NAVIGATION */}
            <div className="absolute bottom-12 left-0 w-full flex justify-between px-12 z-20">
                <div className="flex gap-2">
                    {HERO_SLIDES.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-1 transition-all duration-300 ${current === index ? 'w-12 bg-[#FFB000]' : 'w-4 bg-white/30 hover:bg-white'}`} 
                        />
                    ))}
                </div>
                <div className="flex gap-4">
                    <button onClick={prevSlide} className="text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest">Prev</button>
                    <span className="text-white/20">/</span>
                    <button onClick={nextSlide} className="text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest">Next</button>
                </div>
            </div>
        </section>
    );
};