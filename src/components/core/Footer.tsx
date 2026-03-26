// src/components/core/Footer.tsx
"use client";

import { usePathname } from 'next/navigation';

export const Footer = () => {
    const pathname = usePathname();

    if (pathname.startsWith('/atlas') || pathname === '/') {
        return null;
    }

    return (
        <footer className="relative z-50 w-full p-6 bg-[#050505] border-t border-white/10">
            <div className="max-w-[1800px] mx-auto flex justify-between items-center">
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                    <p>&copy; 2026 SPOTTED // MEMORY_GRID_INDIA</p>
                    <p>STATUS: <span className="text-green-500">OPERATIONAL</span></p>
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                    <p>SESSION ID: {(Math.random() + 1).toString(36).substring(2).toUpperCase()}</p>
                    <p>AUTHENTICATION: CLEARED</p>
                </div>
            </div>
        </footer>
    );
};