"use client";

import { motion } from 'framer-motion';

export const Manifesto = () => {
  return (
    <section id="about" className="relative py-32 bg-neutral-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-4xl md:text-6xl font-extrabold leading-tight"
        >
          We don't just teach. <br />
          <span className="text-gold">We build futures.</span>
        </motion.h2>
        <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-lg text-neutral-500 mt-8 max-w-2xl mx-auto"
        >
          Aura Academy was founded on a simple belief: every student in Jaipur deserves a clear, strategic path to success. We bridge the gap between academic potential and professional achievement, transforming ambition into reality.
        </motion.p>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(191,161,129,0.1)_0%,_transparent_50%)] z-0" />
    </section>
  );
};