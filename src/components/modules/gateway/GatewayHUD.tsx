// src/components/modules/gateway/GatewayHUD.tsx

"use client";
import { motion } from 'framer-motion';

export const GatewayHUD = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-start">
        {/* Top Left Corner */}
        <div className="flex flex-col gap-2">
            <div className="w-4 h-4 border-t-2 border-l-2 border-white/40" />
            <div className="flex gap-4 font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>Sys.Ready</span>
                <span className="animate-pulse">● Live</span>
            </div>
        </div>

        {/* Top Center Ticker */}
        <div className="hidden md:block overflow-hidden w-64 h-4 mask-linear-fade">
            <motion.div 
                animate={{ x: [-200, 200] }} 
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="font-mono text-[9px] text-white/20 whitespace-nowrap uppercase"
            >
                Defining New Luxuries — Protocol V.1 — Access Restricted —
            </motion.div>
        </div>

        {/* Top Right Corner */}
        <div className="flex flex-col gap-2 items-end">
            <div className="w-4 h-4 border-t-2 border-r-2 border-white/40" />
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Lat: 34.05 / Lon: 118.24
            </span>
        </div>
      </div>

      {/* CENTER CROSSHAIRS */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-4 h-px bg-white/20" />
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-4 h-px bg-white/20" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-8 w-px bg-white/20" />

      {/* BOTTOM BAR */}
      <div className="flex justify-between items-end">
        {/* Bottom Left */}
        <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Ref: W&N-2026
            </span>
            <div className="w-4 h-4 border-b-2 border-l-2 border-white/40" />
        </div>

        {/* Bottom Right */}
        <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-2">
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <div className="w-1 h-1 bg-white/10 rounded-full" />
            </div>
            <div className="w-4 h-4 border-b-2 border-r-2 border-white/40" />
        </div>
      </div>

    </div>
  );
};