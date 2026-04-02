"use client";
import { motion } from "framer-motion";
import { HERO_DATA } from "@/lib/data";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-[100svh] min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-background pt-20">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={HERO_DATA.image} 
          alt="Students learning" 
          className="w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] px-6">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <div className="h-[2px] w-8 md:w-16 bg-accent" />
            <span className="text-accent font-bold tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase">
              {HERO_DATA.est} • Jaipur
            </span>
          </motion.div>

          <h1 className="text-[14vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter uppercase overflow-hidden font-display">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease:[0.33, 1, 0.68, 1] }}
              className="block text-white"
            >
              EDUCATION
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease:[0.33, 1, 0.68, 1] }}
              className="block text-stroke"
            >
              CENTRE
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease:[0.33, 1, 0.68, 1] }}
              className="block text-accent text-[8vw] md:text-[6vw] italic mt-2 md:mt-4"
            >
              {HERO_DATA.subheadline}
            </motion.span>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12 w-full justify-between"
          >
            <p className="max-w-md text-muted text-base md:text-lg font-light leading-relaxed">
              <strong className="text-white font-medium">Destinies are not created alone.</strong> They are nurtured with the right ambience and guidance. Join Jaipur's premier institution for holistic development.
            </p>
            
            <a href="#about" className="group relative flex items-center gap-4 text-white hover:text-accent transition-colors">
              <span className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide">Explore</span>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                <ArrowDownRight className="text-white transition-colors" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};