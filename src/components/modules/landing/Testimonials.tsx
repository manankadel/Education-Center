"use client";

import { TESTIMONIALS } from '@/lib/data';
import Image from 'next/image';

export const Testimonials = () => {
    // We duplicate the array here to create that seamless, infinite scrolling marquee effect
    const extendedTestimonials =[...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <section id="reviews" className="py-32 bg-brand-surface overflow-hidden border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-16">
                <span className="text-brand-accent font-bold uppercase tracking-widest text-sm">Student Voices</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mt-4">
                    "We All Have Ability. The Difference Is How We Use It."
                </h2>
                <p className="mt-4 text-gray-500 font-semibold uppercase tracking-widest">— Stevie Wonder</p>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div className="animate-background-pan flex w-max gap-8 px-4">
                    {extendedTestimonials.map((t, idx) => (
                        <div key={idx} className="w-[400px] bg-white p-10 rounded-3xl shadow-xl shadow-brand-blue/5 border border-gray-100 flex flex-col flex-shrink-0 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 text-lg font-light leading-relaxed italic flex-grow mb-8">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-accent">
                                    <Image 
                                        src={t.image} 
                                        alt={t.name} 
                                        fill 
                                        sizes="56px" 
                                        className="object-cover" 
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-blue">{t.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Alumni</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};