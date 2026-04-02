// src/components/modules/atlas/NodePanel.tsx
"use client";
import { AtlasNode } from "@/types/atlas";
import { motion } from 'framer-motion';

interface NodePanelProps {
  node: AtlasNode | null;
  onClose: () => void;
  onTraceRoute: () => void;
}

export const NodePanel = ({ node, onClose, onTraceRoute }: NodePanelProps) => {
  if (!node) return null;

  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="absolute top-0 right-0 h-full w-full md:w-[400px] overflow-y-auto bg-void/95 border-l border-line p-6 md:p-8 z-30 flex flex-col">
      <div className="flex justify-between items-center mb-8 border-b border-line pb-4">
        <div>
           <span className="font-system text-[10px] text-signal uppercase tracking-[4px] block mb-1">Spot Intel</span>
           <span className="font-mono text-sm text-text-secondary uppercase">LOC_{node.id.substring(0,6)}</span>
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-white transition-colors font-mono">[ X ]</button>
      </div>
      
      {node.media_vault && node.media_vault.length > 0 && (
        <div className="w-full aspect-[4/5] mb-6 bg-surface border border-line p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.media_vault[0]} alt="Spot" className="object-cover w-full h-full" />
        </div>
      )}
      
      <div className="flex gap-2 mb-6">
        <span className={`px-3 py-1 font-system text-[10px] uppercase border ${node.category === 'Risky' ? 'border-alert text-alert bg-alert/10' : 'border-signal text-signal bg-signal/10'}`}>{node.category}</span>
        <span className="px-3 py-1 font-system text-[10px] uppercase border border-intel text-intel bg-intel/10">{node.environment}</span>
      </div>

      <p className="font-sans text-base text-white leading-relaxed mb-8">"{node.intel_log}"</p>

      <div className="border-t border-line pt-4 flex flex-col gap-2 mb-auto">
        <span className="font-system text-[10px] text-text-secondary uppercase">Discovered By: <span className="text-white">{node.author}</span></span>
        <span className="font-system text-[10px] text-text-secondary uppercase">Date: <span className="text-white">{new Date(node.created_at).toLocaleDateString()}</span></span>
      </div>

      <button onClick={onTraceRoute} className="w-full mt-8 py-4 bg-white text-black hover:bg-signal transition-all font-system text-xs font-bold uppercase tracking-[4px]">
        Trace Route
      </button>
    </motion.div>
  );
};