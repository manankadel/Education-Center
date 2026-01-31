// src/components/modules/homepage/HeroSection.tsx

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-white">
      {/* IMAGE */}
      <Image 
        src="https://wantsandneeds.com/cdn/shop/files/DSC01988.jpg?v=1758250936&width=1680"
        alt="Wants and Needs Hero"
        fill
        className="object-cover z-0"
        priority
        quality={90}
        sizes="100vw" // FIX: Performance
      />
      
      <div className="absolute inset-0 bg-black/10 z-0" />
      
      <motion.div 
        className="relative z-10 text-center flex flex-col items-center p-4 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-white font-bold tracking-tighter shadow-sm drop-shadow-lg leading-none">
          WANTS & NEEDS
        </h1>
        <p className="font-sans text-[10px] md:text-sm text-white uppercase tracking-[0.3em] mt-4 mb-8 max-w-xs md:max-w-md drop-shadow-md">
          Not for everyone.
        </p>
        <Link href="/catalog" passHref>
          <motion.button 
            className="px-8 py-3 md:px-10 md:py-4 bg-white text-black font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Collection
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};