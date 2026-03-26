// src/components/modules/atlas/PinDropModal.tsx
"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PinDropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  location: { lng: number; lat: number } | null;
}

const Slider = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; }) => (
    <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
            <label className="font-system text-[9px] uppercase tracking-[2px] text-text-secondary">{label}</label>
            <span className="font-mono text-[10px] text-signal">{value}</span>
        </div>
        <input 
          type="range" min="0" max="10" value={value} 
          onChange={e => onChange(parseInt(e.target.value))} 
          className="w-full h-[2px] bg-line rounded-none appearance-none cursor-pointer accent-signal" 
        />
        <style jsx>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 10px;
            width: 4px;
            background: #FFB000;
            cursor: pointer;
          }
        `}</style>
    </div>
);

export const PinDropModal = ({ isOpen, onClose, onSubmit, location }: PinDropModalProps) => {
  const [intel_log, setIntelLog] = useState('');
  const [author, setAuthor] = useState('Agent_00');
  const[tag_taxonomy, setTagsInput] = useState('');
  const [vibe_signal, setVibeSignal] = useState({ solitude: 5, danger: 5, complexity: 5, history: 5, cinematic: 5 });
  
  // Tactical File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a full production setup with Supabase, you would upload to a Storage Bucket here.
    // For this tactical MVP, we convert the image to a Base64 Data URL to store directly
    // or simulate the upload to immediately show the preview.
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intel_log.trim()) return;
    
    const tagsArray = tag_taxonomy
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    // Build the data object
    onSubmit({
      lat: location?.lat,
      lng: location?.lng,
      intel_log,
      author,
      media_vault: imagePreview ? [imagePreview] :[], // Use the uploaded image preview
      tag_taxonomy: tagsArray,
      access_intel: { type: 'Public', bestTime: 'Unknown', guard: 'Unknown' }, // Hardcoded for MVP speed
      vibe_signal
    });
    
    // Reset form
    setIntelLog('');
    setImagePreview(null);
    setTagsInput('');
    setVibeSignal({ solitude: 5, danger: 5, complexity: 5, history: 5, cinematic: 5 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md p-4 overflow-y-auto" onClick={onClose}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-4xl my-auto bg-surface border border-line p-6 md:p-8 shadow-[0_0_50px_rgba(255,176,0,0.15)] relative" onClick={e => e.stopPropagation()}>
            
            <div className="flex justify-between items-start border-b border-line pb-4 mb-6">
              <div>
                <span className="font-system text-[10px] text-signal uppercase tracking-[4px] block mb-1">Establish Node</span>
                <h2 className="font-display text-4xl text-text-primary uppercase leading-none">Lock Coordinates</h2>
              </div>
              <div className="text-right">
                <span className="font-system text-[9px] text-text-muted uppercase tracking-[3px] block">Target Location</span>
                <span className="font-mono text-xs text-signal">
                  {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'UNKNOWN'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* LEFT COLUMN: Data Entry */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-system text-[10px] uppercase tracking-[3px] text-text-secondary">Intel Log *</label>
                    <span className="font-mono text-[9px] text-text-muted">{intel_log.length}/140</span>
                  </div>
                  <textarea 
                    value={intel_log} onChange={(e) => setIntelLog(e.target.value)} 
                    maxLength={140} rows={4} required placeholder="Document the environment..." 
                    className="w-full bg-void border border-line p-3 font-mono text-sm text-text-primary focus:outline-none focus:border-signal transition-colors resize-none placeholder:text-text-muted" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-system text-[10px] uppercase tracking-[3px] text-text-secondary block mb-2">Agent ID</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={16} className="w-full bg-void border-b border-line py-2 font-mono text-sm text-text-primary focus:outline-none focus:border-signal transition-colors" />
                  </div>
                  <div>
                    <label className="font-system text-[10px] uppercase tracking-[3px] text-text-secondary block mb-2">Tags (CSV)</label>
                    <input type="text" value={tag_taxonomy} onChange={(e) => setTagsInput(e.target.value)} placeholder="rooftop, neon..." className="w-full bg-void border-b border-line py-2 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-signal transition-colors" />
                  </div>
                </div>

                <div className="bg-void border border-line p-4 mt-2">
                  <label className="font-system text-[10px] text-signal uppercase tracking-[4px] block mb-4">Vibe Signature Calibration</label>
                  {Object.keys(vibe_signal).map(key => (
                      <Slider key={key} label={key} value={vibe_signal[key as keyof typeof vibe_signal]} onChange={v => setVibeSignal({...vibe_signal, [key]: v})} />
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Media Upload & Actions */}
              <div className="flex flex-col justify-between">
                
                <div>
                  <label className="font-system text-[10px] uppercase tracking-[3px] text-text-secondary block mb-2">Visual Intel (Required)</label>
                  
                  {/* TACTICAL IMAGE UPLOAD AREA */}
                  <div 
                    className={`relative w-full aspect-video border-2 border-dashed flex flex-col items-center justify-center transition-colors group ${imagePreview ? 'border-signal bg-void' : 'border-line bg-void hover:border-text-secondary'}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" // Hints mobile browsers to open camera directly
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                    
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 border-2 border-signal border-t-transparent rounded-full animate-spin" />
                        <span className="font-system text-[9px] text-signal uppercase tracking-widest">Processing Data...</span>
                      </div>
                    ) : imagePreview ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />
                        <div className="absolute bottom-2 right-2 bg-void/80 px-2 py-1 border border-signal">
                          <span className="font-system text-[8px] text-signal uppercase tracking-[2px]">ASSET_LOCKED</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 cursor-pointer">
                        <svg className="w-8 h-8 mx-auto mb-2 text-text-muted group-hover:text-signal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-system text-[10px] text-text-muted group-hover:text-text-primary uppercase tracking-[2px] transition-colors">
                          Capture Environment
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={onClose} className="flex-1 py-4 border border-line text-text-primary font-system text-[10px] font-bold uppercase tracking-[4px] hover:bg-surface transition-colors">
                    Abort
                  </button>
                  <button type="submit" disabled={!imagePreview || isUploading} className="flex-1 py-4 bg-signal text-void font-system text-[10px] font-bold uppercase tracking-[4px] hover:bg-white transition-colors disabled:opacity-50">
                    Transmit Node
                  </button>
                </div>

              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};