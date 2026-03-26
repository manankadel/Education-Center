"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface MapHUDProps {
  userLocation: { lng: number; lat: number } | null;
  totalNodes: number;
  isScoutMode: boolean;
  isAdminMode: boolean;
  isDirectorMode: boolean;
  isRecording: boolean;
  searchQuery: string;
  infiltrationTime: string | null;
  onSearchChange: (q: string) => void;
  onToggleAdmin: () => void;
  onToggleScoutMode: () => void;
  onLockCoordinates: () => void;
  onSelectRegion: (regionCode: string) => void;
}

const REGIONS = ['BOM', 'DEL', 'BLR', 'HYD', 'CHN', 'KOL', 'PNE', 'AHM'];

export const MapHUD = ({ 
  userLocation, totalNodes, isScoutMode, isAdminMode, isDirectorMode, isRecording,
  searchQuery, infiltrationTime, onSearchChange, onToggleAdmin, onToggleScoutMode, onLockCoordinates, onSelectRegion 
}: MapHUDProps) => {

  if (isRecording) {
    return (
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-void/80 px-8 py-3 border border-alert/50">
        <div className="w-3 h-3 bg-alert rounded-full animate-pulse shadow-[0_0_15px_#FF3333]" />
        <span className="font-system text-xs text-alert uppercase tracking-[4px] font-bold">REC // RENDERING_UPLINK</span>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10 transition-opacity duration-700 ${isDirectorMode ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* TOP HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-t-2 border-l-2 border-signal" />
            <span className="font-display text-3xl tracking-widest text-text-primary leading-none">SPOTTED.</span>
            <span className="font-system text-[10px] text-signal bg-signal/10 px-2 py-1 border border-signal/20 animate-pulse">LIVE_SIGNAL</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {REGIONS.map((region) => (
              <button 
                key={region} 
                onClick={() => onSelectRegion(region)} 
                className="px-3 py-1 bg-surface border border-line hover:border-signal text-text-muted hover:text-signal font-system text-[10px] tracking-widest transition-all uppercase"
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 pointer-events-auto w-full md:w-auto">
          <div className="relative w-full md:w-72">
             <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="SEARCH_COORDINATES..." 
              className="w-full bg-void/60 border-b border-signal/30 p-3 font-system text-xs text-signal placeholder:text-signal/20 focus:outline-none focus:border-signal transition-all uppercase tracking-widest"
            />
          </div>
          
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-end">
              <span className="font-system text-[9px] text-text-muted uppercase tracking-[2px]">Active_Nodes</span>
              <span className="font-display text-4xl text-signal leading-none">{totalNodes.toString().padStart(4, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CROSSHAIRS */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 ${isScoutMode ? 'opacity-100 scale-100' : 'opacity-10 scale-150'}`}>
        <div className="w-[15vw] h-[15vw] border border-signal/30 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-signal rounded-full shadow-[0_0_10px_#FFB000]" />
            <div className="absolute w-full h-[1px] bg-signal/20" />
            <div className="absolute h-full w-[1px] bg-signal/20" />
        </div>
      </div>

      {/* INFILTRATION TIME HUD */}
      <AnimatePresence>
        {infiltrationTime && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-32 bg-void/90 border border-signal p-6 border-signal-glow flex flex-col items-center min-w-[200px]"
          >
            <span className="font-system text-[9px] text-signal uppercase tracking-[4px] mb-3">Est. Infiltration Time</span>
            <span className="font-display text-6xl text-text-primary leading-none">{infiltrationTime}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CONTROL BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full mt-auto pointer-events-auto">
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
             <button onClick={onToggleAdmin} className={`font-system text-[10px] uppercase tracking-[2px] px-3 py-1 border transition-all ${isAdminMode ? 'bg-alert/10 border-alert text-alert' : 'bg-void border-line text-text-muted'}`}>
                OVERRIDE: {isAdminMode ? 'ENABLED' : 'DISABLED'}
             </button>
             <span className="font-system text-[10px] text-text-muted flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-confirm rounded-full" /> 
               SYS_READY
             </span>
          </div>
          <p className="font-system text-[10px] text-text-muted uppercase tracking-[2px] max-w-[300px] leading-relaxed">
            &gt; {isScoutMode ? "TARGETING DATA STREAM OPEN. POSITION RETICLE." : "AWAITING DEPLOYMENT PROTOCOL."}
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <motion.button
            onClick={onToggleScoutMode}
            whileHover={{ scale: 1.05, backgroundColor: '#111' }}
            whileTap={{ scale: 0.95 }}
            className={`px-10 py-5 border font-system text-xs font-bold uppercase tracking-[4px] transition-all ${
              isScoutMode ? 'border-signal text-signal' : 'border-line text-text-secondary'
            }`}
          >
            {isScoutMode ? 'ABORT_SCOUT' : 'SCOUT_MODE'}
          </motion.button>

          <AnimatePresence>
            {isScoutMode && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={onLockCoordinates}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,176,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-signal text-void font-system text-xs font-bold uppercase tracking-[4px]"
              >
                LOCK_COORDINATES
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};