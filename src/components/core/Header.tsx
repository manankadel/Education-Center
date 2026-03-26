// src/components/core/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export const Header = () => {
  const pathname = usePathname();
  const [time, setTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  },[]);

  // Hide header on the gateway/login page
  if (pathname === '/') return null;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/90 backdrop-blur-md border-b border-white/10 text-white">
      {/* Top Warning Bar */}
      <div className="w-full bg-[#FFB000] text-black text-[9px] font-bold uppercase tracking-[0.2em] py-1 text-center relative overflow-hidden">
        <span className="relative z-10">CLASSIFIED NETWORK // AUTHORIZED PERSONNEL ONLY // SPOTTED V1.0</span>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* BRANDING */}
        <Link href="/home" className="flex items-center gap-4 group">
          <div className="w-3 h-3 border border-[#FFB000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-1 h-1 bg-[#FFB000] rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tighter leading-none group-hover:text-[#FFB000] transition-colors">
              SPOTTED.
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {[
            { label: 'Command Center', href: '/home' },
            { label: 'The Atlas', href: '/atlas' },
          ].map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`font-mono text-[10px] font-bold uppercase tracking-widest transition-colors h-full flex items-center border-b-2 ${
                  isActive ? 'text-[#FFB000] border-[#FFB000]' : 'text-white/50 border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* SYSTEM STATS */}
        <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-widest text-white/50">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[#FFB000]">SYNC</span>
            <span>{time || 'LOADING...'}</span>
          </div>
          <Link href="/" className="px-4 py-2 border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors">
            DISCONNECT
          </Link>
        </div>
      </div>
    </header>
  );
};