"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-6 md:py-8"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <nav className="glass-card rounded-2xl md:rounded-full px-6 py-4 flex items-center justify-between shadow-2xl shadow-accent/5">
          <Link href="/" className="font-display font-black text-lg md:text-xl tracking-tighter text-white">
            EDU<span className="text-accent">CENTRE</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a href="#contact" className="bg-accent text-white px-5 md:px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-accent/20">
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};