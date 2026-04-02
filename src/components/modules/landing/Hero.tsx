/* src/components/modules/landing/Hero.tsx */
"use client";
import { motion } from "framer-motion";
import { HERO_DATA } from "@/lib/data";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Parallax Image */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={HERO_DATA.image} 
          alt="Hero" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] px-6">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-accent font-bold tracking-[0.3em] text-sm uppercase">Est. 2014 • Jaipur</span>
          </motion.div>

          <h1 className="text-[12vw] lg:text-[10vw] leading-[0.85] font-black italic tracking-tighter uppercase overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="block"
            >
              {HERO_DATA.headline.split(" ")[0]}
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="block text-stroke"
            >
              {HERO_DATA.headline.split(" ")[1]}
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="block text-accent"
            >
              {HERO_DATA.subheadline}
            </motion.span>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12 flex flex-col md:flex-row items-end gap-12 w-full justify-between"
          >
            <p className="max-w-md text-muted text-lg font-light leading-relaxed">
              We bridge the gap between academic potential and professional mastery. 
              A decade of shaping futures in the heart of Rajasthan.
            </p>
            
            <a href="#about" className="group relative flex items-center gap-4 text-white hover:text-accent transition-colors">
              <span className="text-4xl font-display font-bold uppercase">Explore</span>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                <ArrowDownRight className="group-hover:text-black transition-colors" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};