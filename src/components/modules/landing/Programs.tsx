"use client";

import { PROGRAMS_LIST } from '@/lib/data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Programs = () => {
    return (
        <section id="programs" className="py-24 md:py-32 px-6 md:px-12 bg-white relative">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Sticky Left Column */}
                <div className="lg:col-span-5">
                    <div className="sticky top-32">
                        <span className="text-brand-gold font-bold uppercase tracking-widest text-xs md:text-sm">Academic Excellence</span>
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-navy mt-4 mb-6 leading-tight">
                            Programs Available
                        </h2>
                        <p className="text-gray-600 text-lg font-light mb-8 max-w-md">
                            From 12th pass-outs to graduates, we offer a comprehensive portfolio designed to meet industry demands and elevate your career.
                        </p>
                        <a href="#contact" className="inline-flex items-center gap-2 text-brand-navy font-bold hover:text-brand-gold transition-colors pb-1 border-b-2 border-brand-gold">
                            Download Prospectus <ArrowRight size={18} />
                        </a>
                    </div>
                </div>

                {/* Scrolling Right Column */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    {PROGRAMS_LIST.map((program, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="bg-background border border-gray-200 p-8 md:p-12 rounded-3xl hover:border-brand-gold/50 transition-colors shadow-sm hover:shadow-xl hover:shadow-brand-gold/5"
                        >
                            <h3 className="font-display text-3xl font-bold text-brand-navy mb-3">
                                {program.title}
                            </h3>
                            <p className="text-gray-500 mb-8 font-light text-lg">
                                {program.desc}
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {program.details.map((detail, dIdx) => (
                                    <div key={dIdx} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-brand-gold flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-sm font-medium text-brand-navy">{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};