// src/components/modules/gateway/SnakeGame.tsx

"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 20;
const SECRET_KEY = "GLYPHKEY";

type Food = { x: number; y: number; special: boolean; };

// FIXED: Added onBack to the props
export const SnakeGame = ({ onWin, onBack }: { onWin: (key: string) => void; onBack: () => void; }) => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Food>({ x: 15, y: 15, special: false });
    const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const generateFood = () => {
        let newFoodPos: Food;
        do {
            newFoodPos = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
                special: Math.random() > 0.85
            };
        } while (snake.some(segment => segment.x === newFoodPos.x && segment.y === newFoodPos.y));
        setFood(newFoodPos);
    };

    const startGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection('RIGHT');
        setScore(0);
        setIsPlaying(true);
        setGameOver(false);
        generateFood();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'w': case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 's': case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'a': case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'd': case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (!isPlaying || gameOver) {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            return;
        }

        gameLoopRef.current = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { ...newSnake[0] };

                switch(direction) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                }

                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }
                
                for(let i = 1; i < newSnake.length; i++) {
                    if(head.x === newSnake[i].x && head.y === newSnake[i].y) {
                       setGameOver(true);
                       setIsPlaying(false);
                       return prevSnake;
                    }
                }
                
                newSnake.unshift(head);
                
                if (head.x === food.x && head.y === food.y) {
                    const newScore = score + (food.special ? 50 : 15);
                    setScore(newScore);
                    if (newScore >= 420) {
                        onWin(SECRET_KEY);
                        setIsPlaying(false);
                    }
                    generateFood();
                } else {
                    newSnake.pop();
                }
                
                return newSnake;
            });
        }, 100);

        return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
    }, [isPlaying, gameOver, direction, food, score, onWin]);
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white relative">
            <div className="w-full max-w-[280px] flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-mono text-[9px] uppercase tracking-widest text-white/40">Fragments</h3>
                    <p className="font-display text-4xl font-black">{score}</p>
                </div>
            </div>

            <div className="grid w-[280px] h-[280px]" style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}>
                {snake.map((seg, i) => (
                    <div key={i} className="bg-white" style={{gridColumn: seg.x + 1, gridRow: seg.y + 1}} />
                ))}
                <motion.div 
                    className={food.special ? 'bg-green-400' : 'bg-white/50'}
                    style={{gridColumn: food.x + 1, gridRow: food.y + 1}}
                    animate={{ scale: food.special ? [1, 1.5, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                />
            </div>
            
             <AnimatePresence>
                {!isPlaying && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                    <h2 className="font-display text-5xl font-black text-white">{gameOver ? "CORRUPTED" : "VOID SERPENT"}</h2>
                    <button onClick={startGame} className="mt-8 px-10 py-3 bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em]">
                        {gameOver ? 'REBOOT' : 'ENGAGE'}
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