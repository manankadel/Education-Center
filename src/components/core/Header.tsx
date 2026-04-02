"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b",
        isScrolled ? "bg-white/90 backdrop-blur-md border-gray-200 py-3 shadow-sm" : "bg-transparent border-transparent py-5"
      )}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group relative z-[110]">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-brand-blue text-white flex items-center justify-center rounded-lg group-hover:bg-brand-accent transition-colors">
                  <BookOpen size={18} />
              </div>
              <div className="flex flex-col">
                  <span className="font-display font-bold text-lg md:text-xl tracking-tight text-brand-blue leading-none">
                    EDUCATION CENTRE
                  </span>
                  <span className="font-sans text-[8px] md:text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase mt-1">
                      Jaipur • Since 2008
                  </span>
              </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-gray-600 hover:text-brand-accent transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:inline-block px-5 md:px-6 py-2.5 md:py-3 bg-brand-blue text-white font-sans font-semibold text-sm rounded-lg hover:bg-brand-light transition-all">
                Contact Us
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-brand-blue z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[105] flex flex-col p-8 pt-32 lg:hidden"
          >
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-display font-bold text-brand-blue hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <p className="text-gray-400 font-sans text-sm uppercase tracking-widest mb-4">Get Started</p>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-5 bg-brand-blue text-white rounded-xl font-bold text-xl shadow-lg">
                Book a Callback
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};