"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- AUDIO ENGINE ---
// We create the context lazily to handle browser autoplay policies
let audioCtx: AudioContext | null = null;

const initAudio = () => {
    if (typeof window === 'undefined') return;
    if (!audioCtx) {
        // @ts-ignore
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    // Resume if suspended (common browser policy)
    if (audioCtx?.state === 'suspended') {
        audioCtx.resume();
    }
};

const playTone = (freq: number, type: 'triangle' | 'sawtooth' | 'square', duration: number = 0.5) => {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Envelope (Attack/Decay) so it doesn't click
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
};

// --- GUITAR STRING COMPONENT ---
const GuitarString = ({ freq, label }: { freq: number, label: string }) => {
    const [isVibrating, setIsVibrating] = useState(false);

    const strum = () => {
        setIsVibrating(true);
        playTone(freq, 'triangle', 2.0);
        setTimeout(() => setIsVibrating(false), 400); 
    };

    return (
        <div 
            className="w-full h-16 flex items-center relative cursor-crosshair group border-b border-white/5 last:border-0"
            onMouseEnter={strum}
            onClick={strum}
        >
            <span className="absolute left-4 font-mono text-xs font-bold text-white/30 group-hover:text-[#FFB000] transition-colors select-none">
                {label} <span className="text-[8px] opacity-50">{freq}Hz</span>
            </span>
            
            {/* The String Visual */}
            <motion.div 
                className="w-full h-[1px] bg-gray-400 group-hover:bg-[#FFB000] group-hover:h-[2px] transition-all shadow-[0_0_5px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_#FFB000]"
                animate={isVibrating ? { y: [0, -4, 4, -2, 2, -1, 1, 0] } : { y: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
            />
            
            {/* Visual Markers */}
            <div className="absolute right-12 w-2 h-2 rounded-full bg-[#111] border border-white/20 group-hover:border-[#FFB000] transition-colors" />
        </div>
    );
};

// --- SYNTH KEY COMPONENT ---
const SynthKey = ({ freq, note, isBlack = false }: { freq: number, note: string, isBlack?: boolean }) => {
    const play = () => playTone(freq, 'sawtooth', 0.8);

    return (
        <motion.button 
            whileTap={{ scale: 0.95, y: 5 }}
            onClick={play}
            className={`
                relative flex items-end justify-center pb-4 rounded-b-md transition-all duration-100 select-none
                ${isBlack 
                    ? 'w-10 h-32 bg-[#111] text-white/50 -mx-5 z-20 border border-white/20 shadow-xl hover:bg-black hover:border-[#FFB000]' 
                    : 'w-16 h-48 bg-white text-black/50 z-10 border border-gray-300 hover:bg-gray-100 active:bg-[#FFB000]'
                }
            `}
        >
            <span className="text-[10px] font-mono font-bold pointer-events-none">{note}</span>
            {/* LED Indicator */}
            <div className="absolute top-2 w-1 h-1 rounded-full bg-red-500 opacity-0 active:opacity-100 shadow-[0_0_10px_red]" />
        </motion.button>
    );
};

export const SonicPlayground = () => {
    return (
        <section className="py-32 bg-[#080808] border-y border-white/10 relative overflow-hidden">
            
            <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                
                {/* INTERACTIVE PANEL */}
                <div className="bg-[#0a0a0a] p-2 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="bg-[#050505] rounded-2xl border border-white/5 p-8 md:p-12 overflow-hidden relative">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                            <h3 className="font-display text-3xl text-white flex items-center gap-4">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB000] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFB000]"></span>
                                </span>
                                SONIC LAB
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-4 bg-black border border-white/20 relative overflow-hidden rounded-sm">
                                    <motion.div 
                                        className="h-full bg-green-500"
                                        animate={{ width: ["10%", "80%", "30%", "60%"] }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                                    />
                                </div>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFB000]">
                                    Output: Active
                                </span>
                            </div>
                        </div>
                        
                        {/* Guitar Section */}
                        <div className="mb-12">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4 pl-4 border-l-2 border-[#FFB000]">
                                String Response Test (Hover)
                            </p>
                            <div className="bg-[#0f0f0f] rounded-lg border border-white/10">
                                <GuitarString freq={82.41} label="E2" />
                                <GuitarString freq={110.00} label="A2" />
                                <GuitarString freq={146.83} label="D3" />
                                <GuitarString freq={196.00} label="G3" />
                                <GuitarString freq={246.94} label="B3" />
                                <GuitarString freq={329.63} label="E4" />
                            </div>
                        </div>

                        {/* Synth Section */}
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4 pl-4 border-l-2 border-[#FFB000]">
                                Oscillator Bank (Click)
                            </p>
                            <div className="flex justify-center bg-[#0f0f0f] p-6 rounded-lg border border-white/10 shadow-inner">
                                <SynthKey freq={261.63} note="C" />
                                <SynthKey freq={277.18} note="C#" isBlack />
                                <SynthKey freq={293.66} note="D" />
                                <SynthKey freq={311.13} note="D#" isBlack />
                                <SynthKey freq={329.63} note="E" />
                                <SynthKey freq={349.23} note="F" />
                                <SynthKey freq={369.99} note="F#" isBlack />
                                <SynthKey freq={392.00} note="G" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-col gap-8 order-first lg:order-last">
                    <h2 className="font-display text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                        PLAY IT<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB000] to-yellow-200">
                            BEFORE
                        </span><br/>
                        YOU BUY IT.
                    </h2>
                    
                    <div className="h-1 w-24 bg-[#FFB000]" />

                    <p className="font-sans text-xl text-gray-400 leading-relaxed max-w-lg font-light">
                        We don't just sell boxes. We sell vibration. <strong className="text-white">The Musicians Planet</strong> is the only store that lets you experience the tactile response of our premium gear directly in the browser.
                    </p>
                    
                    <div className="flex gap-4 pt-4">
                        <button className="px-10 py-4 bg-[#FFB000] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,176,0,0.3)]">
                            Start Playing
                        </button>
                        <button className="px-10 py-4 border border-white/30 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                            View Specs
                        </button>
                    </div>
                </div>

            </div>
            
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#FFB000]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        </section>
    );
};