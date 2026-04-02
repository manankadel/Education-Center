// src/components/modules/atlas/MapHUD.tsx
"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { SpotCategory, SpotEnvironment } from '@/types/atlas';

interface MapHUDProps {
  totalNodes: number;
  isScoutMode: boolean;
  mapStyle: 'dark' | 'satellite';
  activeFilter: string | null;
  infiltrationTime: string | null;
  distance: string | null;
  searchQuery: string; // <- Added missing prop
  setMapStyle: (style: 'dark' | 'satellite') => void;
  setActiveFilter: (filter: string | null) => void;
  onSearchChange: (q: string) => void; // <- Added missing prop
  onToggleScoutMode: () => void;
  onLockCoordinates: () => void;
}

const CATEGORIES: SpotCategory[] = ['Risky', 'Fun', 'Safe', 'Chill'];
const ENVIRONMENTS: SpotEnvironment[] = ['Mountain', 'Water', 'Urban', 'Forest', 'Indoor'];

export const MapHUD = ({ 
  totalNodes, isScoutMode, mapStyle, activeFilter, infiltrationTime, distance, searchQuery,
  setMapStyle, setActiveFilter, onSearchChange, onToggleScoutMode, onLockCoordinates
}: MapHUDProps) => {

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-6 pb-8 md:pb-8">
      
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Left: Branding & Filters */}
        <div className="flex flex-col gap-4 pointer-events-auto w-full md:w-auto max-w-md">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-signal rounded-full animate-pulse shadow-[0_0_10px_#FFB000]" />
            <span className="font-display text-3xl tracking-widest leading-none text-white">SPOTTED.</span>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveFilter(null)} className={`px-3 py-1 font-system text-[10px] uppercase border transition-all ${!activeFilter ? 'bg-signal text-void border-signal' : 'bg-surface text-text-muted border-line hover:border-text-secondary'}`}>ALL</button>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-3 py-1 font-system text-[10px] uppercase border transition-all ${activeFilter === cat ? 'bg-alert text-white border-alert' : 'bg-surface text-text-muted border-line hover:border-text-secondary'}`}>{cat}</button>
            ))}
            {ENVIRONMENTS.map(env => (
              <button key={env} onClick={() => setActiveFilter(env)} className={`px-3 py-1 font-system text-[10px] uppercase border transition-all ${activeFilter === env ? 'bg-intel text-white border-intel' : 'bg-surface text-text-muted border-line hover:border-text-secondary'}`}>{env}</button>
            ))}
          </div>
        </div>

        {/* Right: Search, Layers & Intel */}
        <div className="flex flex-col items-end gap-3 pointer-events-auto w-full md:w-auto">
          
          {/* Text Search Bar */}
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH SPOTS..." 
            className="w-full md:w-56 bg-surface/80 backdrop-blur-md border border-line p-2 font-mono text-[10px] text-white placeholder:text-text-muted focus:outline-none focus:border-signal transition-colors uppercase tracking-widest"
          />

          {/* Layer Toggles */}
          <div className="flex bg-surface border border-line rounded-sm p-1 w-full md:w-auto justify-end">
            <button onClick={() => setMapStyle('dark')} className={`px-4 py-1.5 font-system text-[9px] uppercase transition-colors ${mapStyle === 'dark' ? 'bg-line text-white' : 'text-text-muted hover:text-text-secondary'}`}>Radar</button>
            <button onClick={() => setMapStyle('satellite')} className={`px-4 py-1.5 font-system text-[9px] uppercase transition-colors ${mapStyle === 'satellite' ? 'bg-line text-white' : 'text-text-muted hover:text-text-secondary'}`}>Satellite</button>
          </div>

          {/* Live Intel Panel (Hidden on very small mobile to save space) */}
          <div className="hidden md:block bg-surface/80 backdrop-blur-md border border-line p-3 min-w-[180px]">
            <div className="flex justify-between items-center border-b border-line pb-2 mb-2">
              <span className="font-system text-[9px] text-text-muted uppercase">Global Nodes</span>
              <span className="font-mono text-xs text-signal font-bold">{totalNodes.toString().padStart(4, '0')}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-system text-[9px] text-text-muted uppercase">Weather</span>
              <span className="font-mono text-[9px] text-white">28°C / Clear</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-system text-[9px] text-text-muted uppercase">Traffic</span>
              <span className="font-mono text-[9px] text-confirm">Optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER CROSSHAIRS */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-500 ${isScoutMode ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
        <div className="w-[15vw] h-[1px] bg-signal absolute" />
        <div className="w-[1px] h-[15vw] bg-signal absolute" />
        <div className="w-12 h-12 border border-signal rounded-full absolute shadow-[0_0_15px_#FFB000]" />
      </div>

      {/* NAVIGATION HUD */}
      <AnimatePresence>
        {infiltrationTime && distance && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-void/90 border-t-2 border-signal p-4 flex gap-8 items-center pointer-events-auto shadow-[0_10px_40px_rgba(255,176,0,0.15)]">
            <div className="flex flex-col text-center">
              <span className="font-system text-[9px] text-text-muted uppercase tracking-[2px]">Distance</span>
              <span className="font-mono text-lg md:text-xl text-white">{distance} km</span>
            </div>
            <div className="w-px h-8 bg-line" />
            <div className="flex flex-col text-center">
              <span className="font-system text-[9px] text-text-muted uppercase tracking-[2px]">Est. Time</span>
              <span className="font-mono text-lg md:text-xl text-signal">{infiltrationTime}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CONTROL BAR */}
      <div className="flex justify-between items-end w-full mt-auto pointer-events-auto">
        <div className="hidden md:block">
           <p className="font-system text-[10px] text-text-muted uppercase tracking-[2px]">
             {isScoutMode ? "> POSITION RETICLE AND LOCK COORDINATES" : "> SELECT A SPOT TO VIEW INTEL OR TRACE ROUTE"}
           </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={onToggleScoutMode} className={`flex-1 md:flex-none px-6 py-4 border font-system text-xs font-bold uppercase tracking-[2px] transition-colors ${isScoutMode ? 'bg-void text-white border-line' : 'bg-surface text-white border-line hover:border-signal'}`}>
            {isScoutMode ? 'Abort' : '+ Drop Spot'}
          </button>
          
          <AnimatePresence mode="popLayout">
            {isScoutMode && (
              <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onClick={onLockCoordinates} className="flex-1 md:flex-none px-8 py-4 bg-signal text-black font-system text-xs font-bold uppercase tracking-[2px] shadow-[0_0_20px_rgba(255,176,0,0.3)] hover:bg-white transition-colors">
                Lock Pos
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};