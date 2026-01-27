// src/components/modules/gateway/ReflexGame.tsx

"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const ReflexGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(1000);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    speedRef.current = 1000;
    nextTurn();
  };

  const stopGame = () => {
    setIsPlaying(false);
    setActiveIndex(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const nextTurn = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = Math.floor(Math.random() * 9);
    setActiveIndex(next);
    timerRef.current = setTimeout(() => { handleGameOver(); }, speedRef.current);
  };

  const handleClick = (index: number) => {
    if (!isPlaying) return;
    if (index === activeIndex) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
      speedRef.current = Math.max(200, speedRef.current * 0.95);
      nextTurn();
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    stopGame();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white">
      
      {/* HUD */}
      <div className="w-full flex justify-between items-end border-b border-white/20 pb-2 mb-6">
        <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">Status</span>
            <span className={`font-sans text-xs font-bold uppercase tracking-widest ${isPlaying ? 'text-green-400' : 'text-white'}`}>
                {isPlaying ? 'ACTIVE' : gameOver ? 'FAILED' : 'READY'}
            </span>
        </div>
        <div className="flex flex-col text-right">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">Score</span>
            <span className="font-display text-2xl font-black text-white leading-none">{score.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-2 w-full aspect-square max-w-[240px]">
        {[...Array(9)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!isPlaying && !gameOver}
            className={`
              relative w-full h-full border border-white/20 rounded-sm transition-all duration-75
              ${activeIndex === i && isPlaying 
                ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-95' 
                : 'bg-transparent hover:bg-white/5'
              }
              ${gameOver && activeIndex === i ? 'bg-red-500 border-red-500' : ''}
            `}
          />
        ))}
      </div>

      {/* START BUTTON */}
      {!isPlaying && (
        <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 shadow-lg"
        >
            {gameOver ? 'RETRY' : 'START GAME'}
        </motion.button>
      )}
    </div>
  );
};