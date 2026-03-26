// src/app/(main)/atlas/page.tsx
"use client";

import dynamic from 'next/dynamic';
import { GlitchTextureBackground } from '@/components/core/GlitchTextureBackground';

const GlobalMap = dynamic(
  () => import('@/components/modules/atlas/GlobalMap').then((mod) => mod.GlobalMap),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#FFB000] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-[10px] text-[#FFB000] uppercase tracking-[0.3em] animate-pulse">
            INITIALIZING ATLAS UPLINK...
          </span>
        </div>
      </div>
    )
  }
);

export default function AtlasPage() {
  return (
    // Changed pt-20 to pt-16 (to match header height) and ensuring flex layout
    <main className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col pt-16">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <GlitchTextureBackground intensity={0.15} />
      </div>
      
      {/* flex-1 ensures this div takes exactly the remaining height, fixing the cutoff */}
      <div className="relative z-10 w-full flex-1">
        <GlobalMap />
      </div>

    </main>
  );
}