"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const MOCK_INSTRUMENTS = [
    {
        id: '1',
        title: 'Fender Stratocaster Ultra',
        handle: 'fender-strat-ultra',
        price: '₹1,85,000',
        image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800',
        category: 'GUITARS'
    },
    {
        id: '2',
        title: 'Korg Minilogue XD',
        handle: 'korg-minilogue-xd',
        price: '₹52,000',
        image: 'https://images.unsplash.com/photo-1621617789726-2598379471f4?auto=format&fit=crop&q=80&w=800',
        category: 'SYNTHS'
    },
    {
        id: '3',
        title: 'Pearl Masters Maple',
        handle: 'pearl-masters',
        price: '₹2,10,000',
        image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=800',
        category: 'DRUMS'
    },
    {
        id: '4',
        title: 'Neumann U87 Ai',
        handle: 'neumann-u87',
        price: '₹3,20,000',
        image: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?auto=format&fit=crop&q=80&w=800',
        category: 'PRO AUDIO'
    }
];

export const FeaturedInstruments = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-black/50 relative z-10 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
                <div>
                    <span className="font-mono text-[10px] text-tmp-amber uppercase tracking-widest block mb-2">High Fidelity</span>
                    <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
                        New<br />Arrivals
                    </h2>
                </div>
                <Link href="/catalog" className="group flex items-center gap-2 font-mono text-xs text-white/50 uppercase tracking-widest hover:text-tmp-amber transition-colors mt-8 md:mt-0">
                    View Full Catalog
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_INSTRUMENTS.map((product, i) => (
                    <Link href={`/catalog`} key={product.id}>
                        <motion.div 
                            className="group relative bg-[#0a0a0a] border border-white/5 hover:border-tmp-amber/50 transition-colors h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Category Tag */}
                            <div className="absolute top-0 left-0 z-20 bg-tmp-amber text-black px-3 py-1">
                                <span className="font-mono text-[9px] font-bold uppercase tracking-wider">{product.category}</span>
                            </div>

                            <div className="aspect-[4/5] relative overflow-hidden bg-[#111]">
                                <Image 
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                />
                                {/* Audio Viz Overlay */}
                                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent opacity-80" />
                            </div>

                            <div className="p-6 relative">
                                <h3 className="font-display text-lg text-white mb-2 leading-tight group-hover:text-tmp-amber transition-colors">{product.title}</h3>
                                <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                                    <p className="font-mono text-sm text-white">{product.price}</p>
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
};