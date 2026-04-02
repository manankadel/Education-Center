"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
      isScrolled ? "bg-white/90 backdrop-blur-md border-gray-200 py-4 shadow-sm" : "bg-transparent border-transparent py-6"
    )}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center rounded-lg group-hover:bg-brand-accent transition-colors">
                <BookOpen size={20} />
            </div>
            <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-brand-blue leading-none">
                  EDUCATION CENTRE
                </span>
                <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase mt-1">
                    Jaipur • Since 2008
                </span>
            </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-gray-600 hover:text-brand-accent transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-block px-6 py-3 bg-brand-blue text-white font-sans font-semibold text-sm rounded-lg hover:bg-brand-light transition-all hover:shadow-lg hover:shadow-brand-blue/20">
            Contact Us
        </a>
      </div>
    </header>
  );
};