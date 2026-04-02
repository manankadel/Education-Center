"use client";

import { ABOUT_DATA } from '@/lib/data';
import { motion } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-32"
        >
            <h2 className="font-display text-2xl md:text-4xl font-medium leading-relaxed text-brand-blue">
                "{ABOUT_DATA.proverb.split('-')[0]}"
            </h2>
            <p className="mt-6 font-sans text-brand-accent font-bold uppercase tracking-widest">
                — {ABOUT_DATA.proverb.split('-')[1]}
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
                className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease:[0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full relative"
                >
                    <Image 
                        src={ABOUT_DATA.image} 
                        alt="About Education Centre"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw" // FIXED SIZES WARNING
                        className="object-cover grayscale-[20%]"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-8">
                    About Education Centre
                </h3>
                <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                    <p>{ABOUT_DATA.text1}</p>
                    <p>{ABOUT_DATA.text2}</p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-100 pt-12">
                    <motion.div whileHover={{ y: -5 }} className="transition-transform">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-brand-blue/5 rounded-lg text-brand-blue"><Target size={24} /></div>
                            <h4 className="font-bold text-brand-blue text-xl">Our Mission</h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">To promote quality education, training, and enhance employability and entrepreneurial skills of our students.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="transition-transform">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent"><Lightbulb size={24} /></div>
                            <h4 className="font-bold text-brand-blue text-xl">Our Vision</h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">To provide excellent educational opportunities responsive to the needs of our students, empowering them to exceed challenges.</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};