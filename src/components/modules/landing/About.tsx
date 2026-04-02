"use client";
import { ABOUT_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-40 bg-background relative z-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-24 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-accent pl-6 md:pl-10 max-w-4xl"
          >
            <p className="text-xl md:text-3xl lg:text-4xl font-display text-white/90 leading-tight italic mb-8">
              "{ABOUT_DATA.proverb.split('-')[0].trim()}"
            </p>
            <p className="text-accent font-bold tracking-widest uppercase text-sm">
              — {ABOUT_DATA.proverb.split('-')[1].trim()}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-8 leading-[0.9]">
              Over 10 Years <br/> <span className="text-stroke">In Education</span>
            </h2>
            <div className="space-y-6 text-muted text-lg font-light leading-relaxed">
              <p className="text-white font-medium">{ABOUT_DATA.experience}</p>
              <p>{ABOUT_DATA.description}</p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6 text-accent">
                <Target size={32} />
                <h3 className="text-2xl font-display font-bold uppercase tracking-wider">Our Mission</h3>
              </div>
              <p className="text-muted leading-relaxed">{ABOUT_DATA.mission}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card p-8 md:p-10 rounded-3xl border-t-accent/50"
            >
              <div className="flex items-center gap-4 mb-6 text-white">
                <Lightbulb size={32} />
                <h3 className="text-2xl font-display font-bold uppercase tracking-wider">Our Vision</h3>
              </div>
              <p className="text-muted leading-relaxed">{ABOUT_DATA.vision}</p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};