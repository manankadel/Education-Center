"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const[mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md border-gray-200 py-3 shadow-sm" : "bg-transparent border-transparent py-5"
      )}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 relative z-[110]">
              <div className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                  isScrolled ? "bg-brand-navy text-white" : "bg-brand-gold text-brand-navy"
              )}>
                  <BookOpen size={20} />
              </div>
              <div className="flex flex-col">
                  <span className={cn("font-display font-bold text-xl tracking-tight leading-none", isScrolled ? "text-brand-navy" : "text-white")}>
                    EDUCATION CENTRE
                  </span>
              </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={cn("text-sm font-semibold transition-colors hover:text-brand-gold", isScrolled ? "text-gray-600" : "text-gray-300")}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className={cn(
                "hidden sm:inline-block px-6 py-2.5 font-sans font-bold text-sm rounded-lg transition-all",
                isScrolled ? "bg-brand-navy text-white hover:bg-brand-light" : "bg-white text-brand-navy hover:bg-gray-100"
            )}>
                Contact Us
            </a>
            
            <button className={cn("lg:hidden p-2 z-[110]", isScrolled ? "text-brand-navy" : "text-white")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} className="text-brand-navy" /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[105] flex flex-col p-8 pt-32 lg:hidden">
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold text-brand-navy hover:text-brand-gold transition-colors">
                    {link.label}
                  </Link>
              ))}
            </nav>
        </div>
      )}
    </>
  );
};