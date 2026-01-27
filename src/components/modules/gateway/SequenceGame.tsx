// src/components/modules/gateway/SequenceGame.tsx

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_KEY = "ECHOCHAMBER";
const WIN_SEQUENCE_LENGTH = 8;

export const SequenceGame = ({ onWin }: { onWin: (key: string) => void }) => {
    const [sequence, setSequence] = useState<number[]>([]);
    const [playerSequence, setPlayerSequence] = useState<number[]>([]);
    const [status, setStatus] = useState<'watching' | 'playing' | 'idle' | 'lost'>('idle');
    const [litIndex, setLitIndex] = useState<number | null>(null);

    const startGame = () => {
        setSequence([]);
        setPlayerSequence([]);
        setStatus('watching');
        addNewToSequence();
    };
    
    const addNewToSequence = () => {
        const next = Math.floor(Math.random() * 9);
        const newSequence = [...sequence, next];
        setSequence(newSequence);
        playSequence(newSequence);
    };

    const playSequence = async (seq: number[]) => {
        await new Promise(r => setTimeout(r, 700));
        for (const index of seq) {
            setLitIndex(index);
            await new Promise(r => setTimeout(r, 400));
            setLitIndex(null);
            await new Promise(r => setTimeout(r, 200));
        }
        setStatus('playing');
        setPlayerSequence([]);
    };

    const handlePlayerInput = (index: number) => {
        if (status !== 'playing') return;

        const newPlayerSeq = [...playerSequence, index];
        
        // Check if current input is correct
        if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
            setStatus('lost');
            return;
        }

        setPlayerSequence(newPlayerSeq);

        // Check if turn is over
        if (newPlayerSeq.length === sequence.length) {
            setStatus('watching');
            // Check for win condition
            if (newPlayerSeq.length >= WIN_SEQUENCE_LENGTH) {
                onWin(SECRET_KEY);
                setStatus('idle');
                return;
            }
            addNewToSequence();
        }
    };
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white relative">
            <div className="w-full max-w-[280px] flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-mono text-[9px] uppercase tracking-widest text-white/40">Sequence</h3>
                    <p className="font-display text-4xl font-black">{sequence.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full aspect-square max-w-[280px]">
                 {[...Array(9)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePlayerInput(i)}
                        className={`relative w-full h-full border-2 transition-all duration-150 ${litIndex === i ? 'bg-white border-white' : 'border-white/20 hover:border-white/50'}`}
                    />
                ))}
            </div>

            <AnimatePresence>
                {status === 'idle' || status === 'lost' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                    <h2 className="font-display text-5xl font-black text-white">{status === 'lost' ? "BREAK" : "SEQUENCE"}</h2>
                    <button onClick={startGame} className="mt-8 px-10 py-3 bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em]">
                        {status === 'lost' ? 'RETRY' : 'BEGIN'}
                    </button>
                  </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};