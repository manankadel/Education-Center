// src/components/core/Header.tsx

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartNotification } from '@/hooks/useCartNotification';
import { usePathname } from 'next/navigation';

const UserIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const CartIcon = () => {
    const { cartCount } = useCartNotification();
    return ( <div className="relative"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> {cartCount > 0 && ( <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center"> {cartCount} </div> )} </div> );
};
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Check if we are on the Catalog page to switch to Dark Mode styling
    const isCatalogMain = pathname === '/catalog';

    const textColorClass = isCatalogMain ? 'text-white' : 'text-black';
    const borderColorClass = isCatalogMain ? 'border-white/10' : 'border-black/5';
    const bgColorClass = isCatalogMain ? 'bg-black/10' : 'bg-white/80';

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[110] p-4 md:p-6 pointer-events-none">
                <div className={`pointer-events-auto mx-auto max-w-[1400px] px-6 md:px-8 py-4 rounded-full backdrop-blur-md shadow-sm border transition-colors duration-300 ${borderColorClass} ${bgColorClass}`}>
                    <nav className="relative flex items-center justify-between w-full">
                        
                        {/* LEFT: Categories */}
                        <div className="flex items-center gap-8">
                            <div className={`hidden md:flex items-center gap-6 font-sans text-xs uppercase tracking-widest font-bold ${textColorClass}`}>
                                <Link href="/catalog" className="hover:opacity-60 transition-opacity">Catalog</Link>
                                <Link href="/shop/hoodies" className="hover:opacity-60 transition-opacity">Hoodies</Link>
                                <Link href="/shop/sweatpants" className="hover:opacity-60 transition-opacity">Sweatpants</Link>
                            </div>
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textColorClass}> <MenuIcon /> </button>
                            </div>
                        </div>
                        
                        {/* CENTER: WANTS AND NEEDS LOGO */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Link href="/home" className="block relative w-32 h-10">
                                <Image 
                                    src="https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Logos_35.webp?v=1767768515"
                                    alt="Wants & Needs"
                                    fill
                                    className={`object-contain transition-all duration-300 ${isCatalogMain ? 'brightness-0 invert' : ''}`}
                                    priority
                                />
                            </Link>
                        </div>

                        {/* RIGHT: Utility */}
                        <div className={`flex justify-end items-center gap-6 md:gap-8 ${textColorClass} font-sans text-xs uppercase tracking-widest font-bold`}>
                            <Link href="/track-order" className="hidden md:block hover:opacity-60 transition-opacity">Track Order</Link>
                            <Link href="/account" className="hover:opacity-60 transition-opacity"><UserIcon /></Link>
                            <Link href="/cart" className="hover:opacity-60 transition-opacity"><CartIcon /></Link>
                        </div>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl z-[120] p-6 shadow-2xl text-black"
                    >
                        
                        <nav className="flex flex-col items-start gap-4 font-sans text-lg uppercase font-bold tracking-wider">
                            <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-gray-100">Catalog</Link>
                            <Link href="/shop/hoodies" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-gray-100">Hoodies</Link>
                            <Link href="/shop/sweatpants" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-gray-100">Sweatpants</Link>
                            <Link href="/track-order" onClick={() => setIsMenuOpen(false)} className="w-full py-2 border-b border-gray-100">Track Order</Link>
                            <Link href="/reach-out" onClick={() => setIsMenuOpen(false)} className="w-full py-2">Reach Out</Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

