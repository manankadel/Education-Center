"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';

export const Header = () => {
  const[scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-foreground/10" : "py-8 bg-transparent"}`}>
      <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-serif font-black text-2xl tracking-tighter text-foreground uppercase flex items-center gap-2">
          Edu<span className="font-sans font-light italic text-accent">Centre</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/70 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="#contact" className="relative group overflow-hidden bg-foreground text-background px-8 py-3 rounded-full font-sans text-[11px] font-black uppercase tracking-[0.2em]">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Inquire</span>
          <div className="absolute inset-0 h-full w-full bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        </a>
      </div>
    </header>
  );
};