// src/components/modules/atlas/NodePanel.tsx
"use client";

import { AtlasNode } from "@/types/atlas";
import { motion } from 'framer-motion';
import VibeSignalChart from "./VibeSignalChart";

interface NodePanelProps {
  node: AtlasNode | null;
  isAdminMode: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onTraceRoute: () => void;
  onOpenStudio: () => void; // <--- CHANGED THIS PROP
}

export const NodePanel = ({ node, isAdminMode, onClose, onDelete, onTraceRoute, onOpenStudio }: NodePanelProps) => {
  if (!node) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} 
      className="absolute top-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-[450px] max-h-[80vh] overflow-y-auto custom-scrollbar bg-void/95 border-l-4 border-signal p-8 z-30 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
    >
      <div className="flex justify-between items-center mb-8 border-b border-line pb-4">
        <div>
           <span className="font-system text-[10px] text-signal uppercase tracking-[4px] block mb-1">Intelligence Dossier</span>
           <span className="font-display text-4xl text-text-primary tracking-tighter uppercase leading-none">NODE_{node.id.substring(0,6)}</span>
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-signal transition-colors font-mono">[ CLOSE ]</button>
      </div>
      
      {node.media_vault && node.media_vault.length > 0 && (
        <div className="w-full aspect-[16/9] mb-8 bg-void border border-line p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.media_vault[0]} alt="Tactical Intel" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
      )}
      
      <div className="mb-8">
        <span className="font-system text-[10px] text-text-muted uppercase tracking-[3px] block mb-3">Subject_Log:</span>
        <p className="font-mono text-base text-text-primary leading-relaxed border-l border-line pl-6 py-2">
          "{node.intel_log}"
        </p>
      </div>
      
      {node.vibe_signal && (
        <div className="mb-8 p-6 bg-surface border border-line">
            <h4 className="font-system text-[10px] text-signal uppercase tracking-[4px] mb-6">Vibe_Signature_Radar</h4>
            <div className="px-4"><VibeSignalChart signal={node.vibe_signal} /></div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-surface border border-line">
          <span className="font-system text-[9px] text-text-muted uppercase block mb-1">Scout_ID</span>
          <span className="font-system text-xs text-signal uppercase tracking-widest">{node.author}</span>
        </div>
        <div className="p-4 bg-surface border border-line">
          <span className="font-system text-[9px] text-text-muted uppercase block mb-1">Time_Stamp</span>
          <span className="font-system text-xs text-text-primary uppercase">{new Date(node.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={onTraceRoute} className="w-full py-4 bg-text-primary text-void hover:bg-signal transition-all font-system text-xs font-bold uppercase tracking-[4px]">
          INITIALIZE_TRACE
        </button>
        {/* CHANGED TO OPEN STUDIO */}
        <button onClick={onOpenStudio} className="w-full py-4 border border-signal text-signal hover:bg-signal hover:text-void transition-all font-system text-xs font-bold uppercase tracking-[4px]">
          OPEN IN STUDIO
        </button>
      </div>

      {isAdminMode && (
        <button onClick={() => onDelete(node.id)} className="w-full mt-12 py-3 bg-alert/5 text-alert border border-alert/20 hover:bg-alert hover:text-void transition-all font-system text-[10px] uppercase tracking-[4px]">
          PURGE_FROM_ARCHIVE
        </button>
      )}
    </motion.div>
  );
};