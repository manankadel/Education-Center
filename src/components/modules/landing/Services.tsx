"use client";

import { SERVICES_DATA } from '@/lib/data';
import { motion } from 'framer-motion';

export const Services = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-brand-blue text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 max-w-2xl">
            <span className="text-brand-accent font-bold uppercase tracking-widest text-sm">Our Core Pillars</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
                Empowering your educational journey.
            </h2>
            <p className="text-gray-400 text-lg font-light">
                From choosing the right college to landing your first corporate job, we provide end-to-end guidance.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_DATA.map((service, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="group bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors cursor-default"
                >
                    <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <service.icon size={32} className="text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-light">{service.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};