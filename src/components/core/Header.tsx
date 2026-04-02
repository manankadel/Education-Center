/* src/components/core/Header.tsx */
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <nav className="glass-card rounded-full px-8 py-4 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-xl tracking-tighter">
            EDU<span className="text-accent">CENTRE</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-xs font-black uppercase tracking-[0.2em] hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-accent transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};