// src/app/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// Updated Background
import { LiquidMeshBackground } from '@/components/core/LiquidMeshBackground';
import { WaitlistForm } from '@/components/modules/WaitlistForm';
import { ReflexGame } from '@/components/modules/gateway/ReflexGame';

const LOGO_URL = "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Logos_35.webp?v=1767768515";

const PasswordAccess = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.replace('/home');
      } else {
        setError('Incorrect Key');
        setIsLoading(false);
      }
    } catch (e) {
      setError('Connection Error');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="relative group">
            <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="ENTER PASSWORD"
                autoFocus
                className="w-full bg-transparent border-b border-black/10 py-3 text-center font-sans text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/50 transition-colors tracking-widest"
            />
        </div>
        
        {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-500 text-center tracking-wide font-medium">
                {error}
            </motion.p>
        )}

        <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-black text-white rounded-md font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-all disabled:opacity-50 shadow-lg shadow-black/5"
        >
            {isLoading ? 'Verifying...' : 'Enter Site'}
        </button>
    </form>
  );
};

export default function GatewayPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'password' | 'waitlist'>('password');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-black overflow-hidden perspective-[1000px]">
      
      {/* 1. LAYER: Clean, Subtle Liquid Mesh */}
      <LiquidMeshBackground />

      {/* 2. LAYER: The 3D Flip Container */}
      <motion.div 
        className="relative z-10 w-full max-w-[420px] h-[600px] p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* === FRONT SIDE (Login/Waitlist) === */}
        <div 
            className="absolute inset-0 bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-2xl p-10 flex flex-col items-center overflow-hidden backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
        >
            {/* Minimal Logo */}
            <div className="relative w-40 h-16 mb-10">
                <Image src={LOGO_URL} alt="WANTS AND NEEDS" fill className="object-contain" priority />
            </div>

            {/* Toggle */}
            <div className="flex gap-8 mb-10 border-b border-black/5 pb-1 z-10">
                <button 
                    onClick={() => setMode('password')}
                    className={`text-[10px] uppercase tracking-[0.15em] pb-2 border-b transition-all ${mode === 'password' ? 'text-black border-black font-semibold' : 'text-black/40 border-transparent hover:text-black/60'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setMode('waitlist')}
                    className={`text-[10px] uppercase tracking-[0.15em] pb-2 border-b transition-all ${mode === 'waitlist' ? 'text-black border-black font-semibold' : 'text-black/40 border-transparent hover:text-black/60'}`}
                >
                    Waitlist
                </button>
            </div>

            {/* Forms */}
            <div className="w-full flex-grow flex items-start justify-center z-10">
                <AnimatePresence mode="wait">
                    {mode === 'password' ? (
                        <motion.div key="p" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="w-full">
                            <PasswordAccess />
                        </motion.div>
                    ) : (
                        <motion.div key="w" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="w-full">
                            <WaitlistForm />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-4 opacity-30 z-10">
                <span className="font-mono text-[8px] uppercase tracking-widest font-medium">Restricted Access</span>
            </div>
        </div>

        {/* === BACK SIDE (Reflex Game) === */}
        <div 
            className="absolute inset-0 bg-white/95 backdrop-blur-3xl border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
            <ReflexGame />
        </div>

      </motion.div>

      {/* 3. SIMULATION TRIGGER (Bottom) */}
      <motion.button
        onClick={() => setIsFlipped(!isFlipped)}
        className="fixed bottom-12 z-20 flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-white/50 shadow-sm hover:bg-white hover:scale-105 transition-all group"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-2 h-2 rounded-full bg-black group-hover:animate-ping" />
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
            {isFlipped ? 'Exit Simulation' : 'Enter Simulation'}
        </span>
      </motion.button>

    </main>
  );
}