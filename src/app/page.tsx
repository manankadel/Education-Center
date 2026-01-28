"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChromaticLiquidBackground } from '@/components/core/ChromaticLiquidBackground';
import { WaitlistForm } from '@/components/modules/WaitlistForm';
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
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      <ChromaticLiquidBackground />

      <div className="relative z-10 w-full max-w-[480px] h-[600px] perspective-[2000px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d', height: '100%', width: '100%' }}
        >
          {/* FRONT: THE VAULT */}
          <div 
            className="absolute inset-0 bg-white/10 backdrop-blur-3xl border-[0.5px] border-white/20 rounded-2xl p-12 flex flex-col items-center justify-between shadow-2xl shadow-black/20"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-40 h-12 mb-20">
                <Image src={LOGO_URL} alt="W&N" fill className="object-contain invert brightness-0 filter" priority />
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-12">
                <div className="relative group">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ACCESS KEY" className="w-full bg-transparent border-b border-white/20 py-2 text-center font-mono text-sm tracking-[0.4em] focus:outline-none focus:border-white transition-all uppercase text-white placeholder:text-white/30"/>
                  {error && <p className="absolute -bottom-6 w-full text-center text-[8px] font-bold text-red-400 tracking-widest">{error}</p>}
                </div>
                <button type="submit" className="w-full py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-gray-200 transition-all">
                  AUTHENTICATE
                </button>
              </form>
            </div>

            <div className="w-full text-center">
              <button onClick={() => setIsFlipped(true)} className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                Explore Alternate Reality &rarr;
              </button>
            </div>
          </div>

          {/* BACK: THE HOLOGRAPHIC HUB */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-3xl border-[0.5px] border-white/20 rounded-2xl overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]">
                <div className="absolute inset-[-200%] w-[400%] h-[400%] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
            </div>

            <AnimatePresence mode="wait">
                {gameMode === 'hub' && (
                    <motion.div key="hub" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full w-full flex flex-col items-center justify-center gap-4 p-8">
                        <h2 className="font-display text-4xl text-white font-black mb-4 tracking-tighter">SELECT PROTOCOL</h2>
                        <button onClick={() => setGameMode('reflex')} className="w-full py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Node Hunter</button>
                        <button onClick={() => setGameMode('snake')} className="w-full py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Void Serpent</button>
                        <button onClick={() => setGameMode('runner')} className="w-full py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Aether Runner</button>
                        <button onClick={() => setIsFlipped(false)} className="mt-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 border-b border-white/40">Return to Vault</button>
                    </motion.div>
                )}
                {gameMode === 'reflex' && <NodeHunterGame onWin={handleWin} onBack={handleBackToHub} />}
                {gameMode === 'snake' && <SnakeGame onWin={handleWin} onBack={handleBackToHub} />}
                {gameMode === 'runner' && <AetherRunnerGame onWin={handleWin} onBack={handleBackToHub} />}
            </AnimatePresence>

            <AnimatePresence>
                {showWinScreen && (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center text-white">
                      <h2 className="font-display text-4xl text-green-400 font-black">ACCESS GRANTED</h2>
                      <p className="font-mono text-xs text-white/60 mt-2">Enter your callsign to receive your key.</p>
                      <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="[ENTER CALLSIGN]" className="mt-8 bg-transparent border-b border-green-400 py-2 text-center text-green-400 placeholder:text-green-400/30 font-mono tracking-widest uppercase focus:outline-none"/>
                      {agentName && <p className="mt-8 font-mono text-2xl text-white animate-pulse">{secretKey}</p>}
                      <button onClick={() => { setShowWinScreen(false); setGameMode('hub'); }} className="mt-8 text-xs font-mono text-white/50 border-b border-white/50">RETURN</button>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}