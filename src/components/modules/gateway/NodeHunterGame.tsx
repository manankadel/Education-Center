// src/components/modules/gateway/NodeHunterGame.tsx

"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REAL_ACCESS_CODE = "12345677";

export const NodeHunterGame = ({ onBack }: { onBack: () => void; }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWin] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(1500);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    setWin(false);
    speedRef.current = 1500;
    nextTurn();
  };

  const nextTurn = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = Math.floor(Math.random() * 9);
    setActiveIndex(next);
    timerRef.current = setTimeout(() => handleGameOver(), speedRef.current);
  };

  const handleClick = (index: number) => {
    if (!isPlaying || index !== activeIndex) return;
    
    const newScore = score + 30;
    setScore(newScore);

    if (newScore >= 420) {
      handleWin();
      return;
    }
    
    speedRef.current = Math.max(300, speedRef.current * 0.92);
    nextTurn();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleWin = () => {
    setWin(true);
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8 text-black relative">
      
      {/* HEADER (No Overlap now) */}
      <div className="w-full flex justify-between items-end border-b-2 border-black pb-4 mb-8">
        <div>
          <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-black/40">Score</h3>
          <p className="font-display text-4xl font-black leading-none">{score}</p>
        </div>
        <div className="text-right">
          <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-black/40">Target</h3>
          <p className="font-display text-4xl font-black leading-none text-black/20">420</p>
        </div>
      </div>

      {/* GAME GRID */}
      <div className="grid grid-cols-3 gap-4 w-full aspect-square max-w-[320px]">
        {[...Array(9)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!isPlaying}
            className={`
              relative w-full h-full rounded-lg border-2 transition-all duration-75
              ${activeIndex === i && isPlaying 
                ? 'bg-black border-black scale-95 shadow-xl' 
                : 'bg-transparent border-black/10 hover:border-black/30'
              }
              ${gameOver && activeIndex === i ? 'bg-red-500 border-red-500' : ''}
              ${won ? 'border-green-500 bg-green-50' : ''}
            `}
          />
        ))}
      </div>

      {/* FOOTER CONTROLS */}
      <div className="w-full flex justify-center mt-8">
        {!isPlaying && !won && !gameOver && (
            <button onClick={startGame} className="w-full py-4 bg-black text-white font-display text-lg uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg">
                Start Game
            </button>
        )}
        
        {gameOver && (
            <button onClick={startGame} className="w-full py-4 bg-red-600 text-white font-display text-lg uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg">
                Try Again
            </button>
        )}
      </div>

      {/* WIN OVERLAY */}
      <AnimatePresence>
        {won && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl p-8 text-center rounded-3xl"
          >
            <h2 className="font-display text-6xl font-black text-black mb-2">UNLOCKED</h2>
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-black/50 mb-8">
                Your Access Code Is:
            </p>
            
            <div className="bg-black text-white px-8 py-4 text-3xl font-mono tracking-[0.2em] mb-8 rounded-lg select-all">
                {REAL_ACCESS_CODE}
            </div>

            <button onClick={onBack} className="text-xs font-bold uppercase border-b-2 border-black pb-1 hover:opacity-50 transition-opacity">
                Go Back & Enter Code
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK BUTTON - MOVED TO BOTTOM */}
      {!isPlaying && !won && (
         <button 
            onClick={onBack} 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors"
         >
            Exit Game
         </button>
      )}
    </div>
  );
};