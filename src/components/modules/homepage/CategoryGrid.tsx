"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FEATURED_CATEGORIES } from '@/lib/tmp_data';

// Define the interface for the category items to satisfy TypeScript
interface CategoryItem {
    title: string;
    image: string;
    href: string;
}

export const CategoryGrid = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-12 flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFB000] mb-2 block">
                            Signal Path
                        </span>
                        <h2 className="font-display text-4xl text-white font-bold uppercase tracking-tight">
                            Browse Categories
                        </h2>
                    </div>
                    <Link href="/catalog" className="font-mono text-xs text-[#FFB000] uppercase tracking-widest hover:text-white transition-colors border border-[#FFB000]/30 px-4 py-2 hover:bg-[#FFB000] hover:text-black">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto md:h-[500px]">
                    {FEATURED_CATEGORIES.map((cat: CategoryItem, i: number) => (
                        <Link href={cat.href} key={cat.title} className="relative group overflow-hidden border border-white/10 rounded-sm bg-[#111] h-[300px] md:h-full">
                            
                            {/* Image Layer */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image 
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                                
                                {/* Noise Texture */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
                            </div>
                            
                            {/* Text Layer */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-10 border-t border-white/10 bg-black/80 backdrop-blur-md group-hover:bg-[#FFB000] transition-colors duration-300">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-mono text-[9px] text-white/50 group-hover:text-black/60 uppercase tracking-widest block mb-1">
                                            Channel 0{i+1}
                                        </span>
                                        <h3 className="font-display text-xl text-white group-hover:text-black font-black uppercase leading-none">
                                            {cat.title}
                                        </h3>
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center border border-white/20 group-hover:border-black group-hover:text-black rounded-full transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Rack Mount Screw Visuals */}
                            <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-white/30 bg-[#111]" />
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-white/30 bg-[#111]" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};