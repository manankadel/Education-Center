// src/components/core/Header.tsx

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartNotification } from '@/hooks/useCartNotification';
import { usePathname } from 'next/navigation';

// Icons that inherit currentColor
const UserIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const CartIcon = () => {
    const { cartCount } = useCartNotification();
    return ( <div className="relative"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> {cartCount > 0 && ( <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"> {cartCount} </div> )} </div> );
};
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Determine if we are in "Dark Mode" territory (The Catalog)
    const isCatalogMain = pathname.startsWith('/catalog');

    // === LIQUID GLASS STYLES ===
    // Text Color
    const textColorClass = isCatalogMain ? 'text-white' : 'text-black';
    
    // Glass Background: 
    // - Light Mode: 30% White (Very clear water look)
    // - Dark Mode: 20% Black (Tinted glass look)
    const glassBgClass = isCatalogMain ? 'bg-black/20' : 'bg-white/30';
    
    // Glass Border:
    // - Light Mode: 40% White border + shadow for "thick glass" feel
    // - Dark Mode: 10% White border for subtle edge
    const glassBorderClass = isCatalogMain 
        ? 'border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
        : 'border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.07)]';

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[110] p-4 md:p-6 pointer-events-none">
                <div 
                    className={`
                        pointer-events-auto mx-auto max-w-[1400px] px-6 md:px-8 py-4 
                        rounded-full 
                        backdrop-blur-2xl 
                        border 
                        transition-all duration-500 ease-out
                        ${glassBgClass} 
                        ${glassBorderClass}
                    `}
                >
                    <nav className="relative flex items-center justify-between w-full">
                        
                        {/* LEFT: Categories */}
                        <div className="flex items-center gap-8">
                            <div className={`hidden md:flex items-center gap-6 font-sans text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${textColorClass}`}>
                                <Link href="/catalog" className="hover:opacity-50 transition-opacity">Catalog</Link>
                                <Link href="/shop/hoodies" className="hover:opacity-50 transition-opacity">Hoodies</Link>
                                <Link href="/shop/sweatpants" className="hover:opacity-50 transition-opacity">Sweatpants</Link>
                            </div>
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textColorClass}> <MenuIcon /> </button>
                            </div>
                        </div>
                        
                        {/* CENTER: LOGO */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Link href="/home" className="block relative w-32 h-10">
                                <Image 
                                    src="https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Logos_35.webp?v=1767768515"
                                    alt="Wants & Needs"
                                    fill
                                    // Invert logo color based on background darkness
                                    className={`object-contain transition-all duration-300 ${isCatalogMain ? 'brightness-0 invert' : ''}`}
                                    priority
                                />
                            </Link>
                        </div>

                        {/* RIGHT: Utility */}
                        <div className={`flex justify-end items-center gap-6 md:gap-8 font-sans text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${textColorClass}`}>
                            <Link href="/track-order" className="hidden md:block hover:opacity-50 transition-opacity">Track Order</Link>
                            <Link href="/account" className="hover:opacity-50 transition-opacity"><UserIcon /></Link>
                            <Link href="/cart" className="hover:opacity-50 transition-opacity"><CartIcon /></Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, y: 0, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, y: -20, backdropFilter: 'blur(0px)' }}
                        className={`
                            md:hidden fixed top-24 left-4 right-4 
                            rounded-3xl border z-[120] p-8 shadow-2xl
                            ${isCatalogMain 
                                ? 'bg-black/80 border-white/10 text-white' 
                                : 'bg-white/80 border-white/40 text-black'
                            }
                        `}
                    >
                        <nav className="flex flex-col items-start gap-6 font-sans text-lg uppercase font-bold tracking-wider">
                            <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-current/10">Catalog</Link>
                            <Link href="/shop/hoodies" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-current/10">Hoodies</Link>
                            <Link href="/shop/sweatpants" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-current/10">Sweatpants</Link>
                            <Link href="/track-order" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-current/10">Track Order</Link>
                            <Link href="/reach-out" onClick={() => setIsMenuOpen(false)} className="w-full py-2">Reach Out</Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};