// src/components/core/MotionPermissionPrompt.tsx

"use client";
import { useGyroscope } from '@/hooks/useGyroscope';
import { AnimatePresence, motion } from 'framer-motion';

export const MotionPermissionPrompt = () => {
    // FIX: Changed 'requiresPermission' to 'needsPermission' to match the hook
    const { needsPermission, requestPermission } = useGyroscope();

    return (
        <AnimatePresence>
            {needsPermission && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
                >
                    <button
                        onClick={requestPermission}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl text-white font-sans text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Enable Motion Sensors
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};