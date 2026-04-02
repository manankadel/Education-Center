"use client";
import { ABOUT_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export const AboutEditorial = () => {
  return (
    <section id="about" className="relative w-full bg-foreground text-background py-32 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden -mt-10 z-20">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        
        {/* Sticky Left Sidebar */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-40">
            <h2 className="text-6xl md:text-8xl font-serif font-black leading-none uppercase tracking-tighter">
              The <br/> <span className="font-sans italic text-accent">Heritage</span>
            </h2>
            <p className="mt-10 font-sans text-xl md:text-2xl font-light leading-relaxed max-w-md">
              "{ABOUT_DATA.proverb.split('-')[0].trim()}"
            </p>
            <p className="mt-4 font-sans font-bold tracking-widest uppercase text-xs text-muted">
              — {ABOUT_DATA.proverb.split('-')[1].trim()}
            </p>
          </div>
        </div>

        {/* Scrolling Right Content */}
        <div className="lg:col-span-7 flex flex-col gap-32 pt-10 lg:pt-40 pb-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <span className="font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase">01 / Experience</span>
            <p className="text-3xl md:text-5xl font-serif leading-tight">
              {ABOUT_DATA.experience}
            </p>
            <p className="font-sans text-lg text-background/70 leading-relaxed mt-4">
              {ABOUT_DATA.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <span className="font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase">02 / Mission</span>
            <p className="text-2xl md:text-4xl font-serif leading-tight italic">
              "To promote quality education, training, research, and enhance employability."
            </p>
            <p className="font-sans text-lg text-background/70 leading-relaxed mt-4">
              {ABOUT_DATA.mission.split('.')[1]}.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <span className="font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase">03 / Vision</span>
            <p className="text-3xl md:text-5xl font-serif leading-tight">
              To provide excellent educational opportunities that are responsive to the needs of our world.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};