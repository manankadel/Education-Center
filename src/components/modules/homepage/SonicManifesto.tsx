"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const SonicManifesto = () => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights for the "Equalizer" background
    setBars(Array.from({ length: 40 }, () => Math.random()));
  }, []);

  return (
    <section className="relative py-40 px-6 md:px-12 bg-black text-white flex justify-center items-center overflow-hidden border-y border-white/5">
      
      {/* Background Equalizer Visual */}
      <div className="absolute inset-0 flex items-center justify-between opacity-10 pointer-events-none px-4 gap-1">
        {bars.map((height, i) => (
            <motion.div 
                key={i}
                className="w-full bg-tmp-amber rounded-t-sm"
                animate={{ height: [`${height * 20}%`, `${Math.random() * 80}%`, `${height * 20}%`] }}
                transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                style={{ height: `${height * 50}%` }}
            />
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="mb-8 inline-block border border-tmp-amber/30 px-4 py-1 rounded-full bg-tmp-amber/5">
            <span className="font-mono text-[10px] text-tmp-amber uppercase tracking-[0.2em] animate-pulse">● Live Input</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl mb-12 tracking-tight leading-tight">
            NOT JUST AN INSTRUMENT.<br />
            <span className="text-white/40">IT'S YOUR VOICE.</span>
        </h2>
        
        <p className="font-sans text-lg md:text-xl leading-relaxed text-gray-400 font-light max-w-2xl mx-auto">
            From the bedroom producer to the stadium headliner, The Musicians Planet provides the tools to shape your sound. 
            We curate the finest guitars, synthesisers, and pro audio gear because we know that <strong className="text-white">tone is everything.</strong>
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
            {['Gibson', 'Fender', 'Roland', 'Korg'].map((brand) => (
                <div key={brand} className="text-center">
                    <span className="font-display text-xl text-white/30 uppercase">{brand}</span>
                </div>
            ))}
        </div>
      </motion.div>
    </section>
  );
};