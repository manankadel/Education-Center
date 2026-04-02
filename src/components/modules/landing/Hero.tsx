"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HERO_DATA } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-brand-navy">
            {/* Background Image with Dark Overlay for Text Readability */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={HERO_DATA.image} 
                    alt="Education Centre Jaipur"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
            </div>
            
            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                {/* Left: Massive Value Proposition */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8 self-start backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                        <span className="text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-widest">Est. 2008 in Jaipur</span>
                    </div>
                    
                    <h1 className="font-display text-5xl md:text-6xl lg:text-[5rem] font-bold text-white leading-[1.05] tracking-tight mb-6">
                        DESTINIES ARE NOT CREATED <span className="text-brand-gold">ALONE.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl border-l-4 border-brand-gold pl-5">
                        {HERO_DATA.subheadline}
                    </p>
                </motion.div>

                {/* Right: Direct Lead Capture Form (High Conversion) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-md ml-auto bg-white rounded-2xl p-8 shadow-2xl shadow-black/50"
                >
                    <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Request a Call Back</h3>
                    <p className="text-sm text-gray-500 mb-8">Get expert counselling for college admissions and programs.</p>
                    
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                            <input type="text" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-brand-gold transition-colors text-brand-navy font-medium" placeholder="Student Name" required />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
                            <input type="tel" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-brand-gold transition-colors text-brand-navy font-medium" placeholder="+91" required />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Course of Interest</label>
                            <select className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-brand-gold transition-colors text-brand-navy font-medium bg-transparent cursor-pointer">
                                <option>Admission Counselling</option>
                                <option>UG / PG Programs</option>
                                <option>Industry Training (ISTP)</option>
                                <option>Distance Education</option>
                            </select>
                        </div>
                        <button className="w-full mt-6 bg-brand-navy text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-light transition-colors group">
                            Submit Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};