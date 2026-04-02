"use client";
import { INSIGHTS } from "@/lib/data";
import { motion } from "framer-motion";

export const InsightsGallery = () => {
  return (
    <section id="insights" className="py-32 bg-[#080808] border-t border-foreground/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-20">
        <p className="font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4">
            Critical Insights
        </p>
        <h2 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter">
            Before You Enroll
        </h2>
      </div>

      <div className="w-full flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {INSIGHTS.map((insight, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[300px] md:min-w-[450px] aspect-square relative group overflow-hidden rounded-2xl snap-center flex-shrink-0 cursor-pointer"
            >
                <img src={insight.image} alt="Insight" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
                        {insight.category}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight group-hover:italic transition-all">
                        {insight.title}
                    </h3>
                </div>
            </motion.div>
        ))}
      </div>
    </section>
  );
};