// src/components/modules/gateway/NodeHunterGame.tsx

"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_KEY = "VOIDWALKER";

// FIXED: Added onBack to the props
export const NodeHunterGame = ({ onWin, onBack }: { onWin: (key: string) => void; onBack: () => void; }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(2500);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    speedRef.current = 2500;
    nextTurn();
  };

  const nextTurn = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = Math.floor(Math.random() * 9);
    setActiveIndex(next);
    timerRef.current = setTimeout(() => handleGameOver(score), speedRef.current);
  };

  const handleClick = (index: number) => {
    if (!isPlaying || index !== activeIndex) return;
    const newScore = score + 30;
    setScore(newScore);
    if (newScore >= 420) {
      handleGameOver(420);
      return;
    }
    speedRef.current = Math.max(200, speedRef.current * 0.95);
    nextTurn();
  };

  const handleGameOver = (finalScore: number) => {
    setGameOver(true);
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (finalScore >= 420) {
      onWin(SECRET_KEY);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white relative">
       <div className="w-full max-w-[280px] flex justify-between items-center mb-8">
        <div>
          <h3 className="font-mono text-[9px] uppercase tracking-widest text-white/40">Score</h3>
          <p className="font-display text-4xl font-black">{score}</p>
        </div>
        <div>
          <h3 className="font-mono text-[9px] uppercase tracking-widest text-white/40">Status</h3>
          <p className={`font-mono text-sm font-bold uppercase tracking-widest ${isPlaying ? 'text-green-400' : 'text-white'}`}>
            {isPlaying ? 'ACTIVE' : gameOver ? 'TERMINATED' : 'STANDBY'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full aspect-square max-w-[280px]">
        {[...Array(9)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`relative w-full h-full border border-white/10 transition-all duration-100 ${activeIndex === i && isPlaying ? 'bg-white' : 'bg-transparent hover:bg-white/5'} ${gameOver ? 'bg-red-500/20 border-red-500' : ''}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <h2 className="font-display text-5xl font-black text-white">{gameOver ? "GAME OVER" : "NODE HUNTER"}</h2>
            <button onClick={startGame} className="mt-8 px-10 py-3 bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em]">
                {gameOver ? 'RETRY' : 'INITIALIZE'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK BUTTON */}
      <button onClick={onBack} className="absolute bottom-8 left-8 font-mono text-xs uppercase text-white/50 hover:text-white">
        &larr; Return to Hub
      </button>
    </div>
  );
};