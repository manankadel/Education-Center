// src/app/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LiquidGlassArt } from '@/components/core/LiquidGlassArt';
import { WaitlistForm } from '@/components/modules/WaitlistForm';
import { NodeHunterGame } from '@/components/modules/gateway/NodeHunterGame';

const LOGO_URL = "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Logos_35.webp?v=1767768515";

export default function GatewayPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!password) return;
    setIsLoading(true);
    
    const res = await fetch('/api/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    
    if (res.ok) router.replace('/home');
    else {
        setError('WRONG CODE');
        setIsLoading(false);
    }
  };

  const handleWin = () => {
    // If they win, we could auto-fill the code or show it.
    // NodeHunterGame handles its own win state display.
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-white text-black perspective-[2000px]">
      
      {/* 1. BACKGROUND */}
      <LiquidGlassArt />

      {/* 2. THE CARD CONTAINER (Mobile Optimized) */}
      <motion.div 
        className="relative z-10 w-[90vw] max-w-[450px] h-[600px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* === FRONT SIDE (Login) === */}
        <div 
            className={`
                absolute inset-0 bg-white/40 backdrop-blur-3xl border-[0.5px] border-black/10 rounded-sm p-8 md:p-12 flex flex-col items-center justify-between shadow-2xl
                ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}
            `}
            style={{ backfaceVisibility: 'hidden' }}
        >
            <div className="relative w-40 h-16 mb-12">
                <Image src={LOGO_URL} alt="W&N" fill className="object-contain" priority />
            </div>

            <div className="w-full flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {!showWaitlist ? (
                        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-10">
                            <div className="text-center">
                                <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Restricted</h2>
                                <p className="font-sans text-xs font-bold text-black/40 uppercase tracking-widest">Members Only</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-8">
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => { setPassword(e.target.value); setError(''); }} 
                                        placeholder="ENTER CODE" 
                                        className="w-full bg-transparent border-b-2 border-black/10 py-4 text-center font-display text-2xl md:text-3xl font-black focus:outline-none focus:border-black transition-all uppercase placeholder:text-black/10"
                                        autoFocus
                                    />
                                    {error && <p className="absolute -bottom-8 w-full text-center text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</p>}
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full py-5 bg-black text-white font-display text-lg uppercase tracking-wider hover:scale-[1.02] transition-transform">
                                    {isLoading ? 'Checking...' : 'Enter'}
                                </button>
                            </form>
                            
                            <div className="flex justify-center">
                                <button onClick={() => setShowWaitlist(true)} className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black border-b border-transparent hover:border-black transition-all">
                                    No Access? Join Waitlist
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="waitlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                            <WaitlistForm />
                            <button onClick={() => setShowWaitlist(false)} className="w-full mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black">
                                &larr; Back to Login
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="w-full pt-8 border-t border-black/5 flex justify-center">
                 <button onClick={() => setIsFlipped(true)} className="group flex items-center gap-3">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-colors group-hover:text-red-500">
                        Play To Unlock
                    </span>
                    <div className="w-2 h-2 bg-black rounded-full group-hover:bg-red-500 transition-colors animate-pulse" />
                 </button>
            </div>
        </div>

        {/* === BACK SIDE (Game) === */}
        <div 
            className={`
                absolute inset-0 bg-white/80 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden
                ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}
            `}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
            <NodeHunterGame onBack={() => setIsFlipped(false)} />
        </div>

      </motion.div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[10px] font-bold uppercase tracking-widest text-black/20">
        Wants & Needs © 2026
      </div>

    </main>
  );
}