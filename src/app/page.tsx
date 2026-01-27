"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LiquidGlassArt } from '@/components/core/LiquidGlassArt';
import { WaitlistForm } from '@/components/modules/WaitlistForm';
import { ZenGame } from '@/components/modules/gateway/ZenGame';

const LOGO_URL = "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Logos_35.webp?v=1767768515";

export default function GatewayPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) router.replace('/home');
    else setError('ACCESS_KEY_INVALID');
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <LiquidGlassArt />

      <div className="relative z-10 w-full max-w-[480px] h-[580px] perspective-[2000px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d', height: '100%', width: '100%' }}
        >
          {/* FRONT: THE FORM */}
          <div 
            className="absolute inset-0 bg-white/40 backdrop-blur-3xl border-[0.5px] border-black/10 rounded-sm p-12 flex flex-col items-center justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-32 h-10 mb-20">
                <Image src={LOGO_URL} alt="W&N" fill className="object-contain" priority />
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-12">
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PRIVATE_KEY"
                    className="w-full bg-transparent border-b border-black/10 py-2 text-center font-heading text-xs tracking-[0.5em] focus:outline-none focus:border-black transition-all uppercase"
                  />
                  {error && <p className="absolute -bottom-6 w-full text-center text-[8px] font-bold text-red-500 tracking-widest">{error}</p>}
                </div>
                
                <button type="submit" className="w-full py-4 bg-black text-white font-heading text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all">
                  Validate
                </button>
              </form>
            </div>

            <div className="w-full text-center">
              <div className="h-px w-8 bg-black/10 mx-auto mb-8" />
              <button 
                onClick={() => setIsFlipped(true)}
                className="font-heading text-[9px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors"
              >
                Access Simulation &rarr;
              </button>
            </div>
          </div>

          {/* BACK: THE GAME */}
          <div 
            className="absolute inset-0 bg-white border-[0.5px] border-black/10 rounded-sm overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <ZenGame />
            <button 
              onClick={() => setIsFlipped(false)}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-heading text-[9px] uppercase tracking-[0.3em] text-black border-b border-black"
            >
              Return to Vault
            </button>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-8 left-8 flex gap-8 font-heading text-[8px] uppercase tracking-[0.4em] text-black/20">
        <span>34.0522° N, 118.2437° W</span>
        <span>Est. 2026</span>
      </div>
    </main>
  );
}