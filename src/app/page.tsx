"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LiquidGlassArt } from '@/components/core/LiquidGlassArt';
import { AetherRunnerGame } from '@/components/modules/gateway/AetherRunnerGame';
import { NodeHunterGame } from '@/components/modules/gateway/NodeHunterGame';
import { SnakeGame } from '@/components/modules/gateway/SnakeGame';

const LOGO_URL = "https://cdn.shopify.com/s/files/1/0975/8736/4138/files/Logos_35.webp?v=1767768515";
type GameMode = 'hub' | 'reflex' | 'snake' | 'runner';

export default function GatewayPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [agentName, setAgentName] = useState('');
  const router = useRouter();
  
  const [gameMode, setGameMode] = useState<GameMode>('hub');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) router.replace('/home');
    else setError('AUTH_KEY_INVALID');
  };

  const handleWin = (key: string) => {
    setSecretKey(key);
    setShowWinScreen(true);
  };
  
  const handleBackToHub = () => setGameMode('hub');

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
            className="absolute inset-0 bg-white/50 backdrop-blur-3xl border-[0.5px] border-black/10 rounded-sm p-12 flex flex-col items-center justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-32 h-10 mb-20">
                <Image src={LOGO_URL} alt="W&N" fill className="object-contain" priority />
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-12">
                <div className="relative group">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PRIVATE_KEY" className="w-full bg-transparent border-b border-black/10 py-2 text-center font-heading text-xs tracking-[0.5em] focus:outline-none focus:border-black transition-all uppercase"/>
                  {error && <p className="absolute -bottom-6 w-full text-center text-[8px] font-bold text-red-500 tracking-widest">{error}</p>}
                </div>
                <button type="submit" className="w-full py-4 bg-black text-white font-heading text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all">
                  Validate
                </button>
              </form>
            </div>

            <div className="w-full text-center">
              <div className="h-px w-8 bg-black/10 mx-auto mb-8" />
              <button onClick={() => setIsFlipped(true)} className="font-heading text-[9px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors">
                Access Simulation &rarr;
              </button>
            </div>
          </div>

          {/* BACK: THE GAME HUB */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-[0.5px] border-white/10 rounded-sm overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <AnimatePresence mode="wait">
                {gameMode === 'hub' && (
                    <motion.div key="hub" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full w-full flex flex-col items-center justify-center gap-4 p-8">
                        <h2 className="font-display text-3xl text-white font-black mb-4">SIMULATION HUB</h2>
                        <button onClick={() => setGameMode('reflex')} className="w-full py-3 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Node Hunter</button>
                        <button onClick={() => setGameMode('snake')} className="w-full py-3 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Void Serpent</button>
                        {/* THE FIX: Changed 'runner' to 'aether' to match component name */}
                        <button onClick={() => setGameMode('runner')} className="w-full py-3 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Aether Runner</button>
                        <button onClick={() => setIsFlipped(false)} className="mt-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 border-b border-white/40">Return to Vault</button>
                    </motion.div>
                )}
                {gameMode === 'reflex' && <NodeHunterGame onWin={handleWin} onBack={handleBackToHub} />}
                {gameMode === 'snake' && <SnakeGame onWin={handleWin} onBack={handleBackToHub} />}
                {/* THE FIX: Added the missing onBack prop */}
                {gameMode === 'runner' && <AetherRunnerGame onWin={handleWin} onBack={handleBackToHub} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      {/* WIN SCREEN */}
       <AnimatePresence>
        {showWinScreen && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center text-white">
              <h2 className="font-display text-4xl text-green-400 font-black">ACCESS GRANTED</h2>
              <p className="font-mono text-xs text-white/60 mt-2">Enter your callsign to receive your key.</p>
              <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="[ENTER CALLSIGN]" className="mt-8 bg-transparent border-b border-green-400 py-2 text-center text-green-400 placeholder:text-green-400/30 font-mono tracking-widest uppercase focus:outline-none"/>
              {agentName && <p className="mt-8 font-mono text-2xl text-white animate-pulse">{secretKey}</p>}
              <button onClick={() => { setShowWinScreen(false); setGameMode('hub'); }} className="mt-8 text-xs font-mono text-white/50 border-b border-white/50">RETURN</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}