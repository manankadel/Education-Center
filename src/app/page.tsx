"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GatewayAnimation } from '@/components/modules/GatewayAnimation';
import { WaitlistForm } from '@/components/modules/WaitlistForm';
import CountdownTimer from '@/components/modules/CountdownTimer';
import { InteractiveLiquidBackground } from '@/components/core/InteractiveLiquidBackground';
import { useSound } from '@/hooks/useSound';

const ANIMATION_CONFIG = {
  CONTENT_DELAY: 2500,
  MOTION_DURATION: 1.0,
  MOTION_EASE: 'easeInOut',
  FADE_DELAY: 0.5,
} as const;

const MOTION_VARIANTS = {
  content: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: ANIMATION_CONFIG.MOTION_DURATION, 
      ease: ANIMATION_CONFIG.MOTION_EASE, 
      delay: ANIMATION_CONFIG.FADE_DELAY 
    }
  },
  layout: {
    transition: { 
      duration: ANIMATION_CONFIG.MOTION_DURATION, 
      ease: ANIMATION_CONFIG.MOTION_EASE 
    }
  }
} as const;

const STYLES = {
  main: {
    height: 'calc(var(--app-height, 100vh))',
    contain: 'layout style paint',
    willChange: 'auto'
  },
  input: {
    contain: 'layout style'
  },
  button: {
    contain: 'layout style',
    willChange: 'color, opacity'
  }
} as const;

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const PasswordAccess = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const playHoverSound = useSound('/audio/hover.mp3', 0.3);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setIsLoading(true);
    setError('');
    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        signal: abortControllerRef.current.signal,
      });
      if (response.ok) {
        router.replace('/home');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid access code.');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [password, isLoading, router]);

  const handleMouseEnter = useCallback(() => {
    if (!isLoading) playHoverSound();
  }, [playHoverSound, isLoading]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const formContent = useMemo(() => (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter Access Code"
        className="font-sans w-full max-w-[240px] bg-transparent border-b-2 border-black/50 focus:border-black text-center text-lg focus:outline-none transition-colors duration-300 disabled:opacity-50 text-black placeholder:text-gray-400"
        disabled={isLoading}
        autoComplete="current-password"
        style={STYLES.input}
      />
      <button
        type="submit"
        disabled={isLoading || !password.trim()}
        className="text-black/80 hover:text-black transition-colors disabled:opacity-50"
        onMouseEnter={handleMouseEnter}
        style={STYLES.button}
        aria-label="Submit access code"
      >
        <ArrowIcon />
      </button>
    </form>
  ), [password, isLoading, handleSubmit, handlePasswordChange, handleMouseEnter]);

  return (
    <div className="mt-8 flex flex-col items-center">
      {formContent}
      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default function GatewayPage() {
  const [showContent, setShowContent] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setShowContent(true);
    }, ANIMATION_CONFIG.CONTENT_DELAY);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const contentSection = useMemo(() => (
    <AnimatePresence mode="wait">
      {showContent && (
        <motion.div
          className="flex w-full max-w-sm flex-col items-center text-center"
          {...MOTION_VARIANTS.content}
        >
          <p className="font-sans text-sm md:text-xl mt-3 mb-4 md:mt-6 md:mb-6 text-black/80 px-2">
            Join the waitlist for exclusive access.
          </p>
          
          <div className="mb-4 md:mb-6">
            <CountdownTimer />
          </div>
          
          <div className="w-full flex justify-center px-2">
            <WaitlistForm />
          </div>
          
          <div className="mt-4 md:mt-8 mb-4 md:mb-0">
            <PasswordAccess />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ), [showContent]);

  return (
    <div className="min-h-screen bg-white text-black">
      <InteractiveLiquidBackground />
      <main 
        style={STYLES.main}
        className="relative flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          <motion.div layout {...MOTION_VARIANTS.layout} className="mb-4 md:mb-8">
            <GatewayAnimation />
          </motion.div>
          {contentSection}
        </div>
      </main>
    </div>
  );
}