// src/components/modules/homepage/FeaturedInstruments.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// MOCK DATA - In a real scenario, this comes from your shopify.ts getProducts()
const MOCK_INSTRUMENTS = [
    {
        id: '1',
        title: 'Fender Stratocaster American Ultra',
        handle: 'fender-strat-ultra',
        price: '₹1,85,000',
        image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800',
        category: 'GUITAR'
    },
    {
        id: '2',
        title: 'Korg Minilogue XD',
        handle: 'korg-minilogue-xd',
        price: '₹52,000',
        image: 'https://images.unsplash.com/photo-1621617789726-2598379471f4?auto=format&fit=crop&q=80&w=800',
        category: 'SYNTH'
    },
    {
        id: '3',
        title: 'Pearl Masters Maple Complete',
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
        category: 'STUDIO'
    }
];

export const FeaturedInstruments = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
                <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
                    New<br />Arrivals
                </h2>
                <Link href="/catalog" className="font-mono text-xs text-tmp-amber uppercase tracking-widest hover:text-white transition-colors">
                    View Full Catalog_
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_INSTRUMENTS.map((product) => (
                    <Link href={`/products/${product.handle}`} key={product.id}>
                        <motion.div 
                            className="group relative bg-[#111] border border-white/5 hover:border-tmp-amber/50 transition-colors"
                            whileHover={{ y: -5 }}
                        >
                            {/* Category Tag */}
                            <div className="absolute top-4 left-4 z-10 bg-black/80 px-2 py-1">
                                <span className="font-mono text-[9px] text-tmp-amber uppercase tracking-wider">{product.category}</span>
                            </div>

                            <div className="aspect-[4/5] relative overflow-hidden">
                                <Image 
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                />
                                {/* Audio Viz Overlay */}
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
                            </div>

                            <div className="p-6">
                                <h3 className="font-display text-lg text-white mb-2 leading-tight">{product.title}</h3>
                                <p className="font-mono text-sm text-white/50">{product.price}</p>
                            </div>
                            
                            {/* Hover "Play" Effect */}
                            <div className="absolute inset-0 border-2 border-tmp-amber opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
};