// src/hooks/useTacticalAudio.ts
"use client";
import { useCallback } from 'react';

export const useTacticalAudio = () => {
  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Snappy envelope for UI sounds
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  },[]);

  return {
    playRadar: () => playTone(880, 'sine', 0.4, 0.05), // High soft ping
    playLock: () => playTone(150, 'square', 0.15, 0.1), // Deep mechanical thud
    playConfirm: () => {
      playTone(440, 'triangle', 0.1, 0.1);
      setTimeout(() => playTone(880, 'triangle', 0.2, 0.1), 100); // Double positive chirp
    },
    playError: () => playTone(100, 'sawtooth', 0.3, 0.15), // Harsh buzz
  };
};