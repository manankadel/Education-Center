"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotCategory, SpotEnvironment } from '@/types/atlas';

interface PinDropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  location: { lng: number; lat: number } | null;
}

const CATEGORIES: SpotCategory[] =['Risky', 'Fun', 'Safe', 'Chill'];
const ENVIRONMENTS: SpotEnvironment[] =['Mountain', 'Water', 'Urban', 'Forest', 'Indoor'];

export const PinDropModal = ({ isOpen, onClose, onSubmit, location }: PinDropModalProps) => {
  const [log, setLog] = useState('');
  const[author, setAuthor] = useState('Explorer_01');
  const [category, setCategory] = useState<SpotCategory>('Fun');
  const [environment, setEnvironment] = useState<SpotEnvironment>('Urban');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!log.trim()) return;
    
    onSubmit({ 
      intel_log: log, 
      author, 
      category, 
      environment, 
      media_vault: imagePreview ? [imagePreview] :[] 
    });
    
    // Clear form for next time
    setLog('');
    setImagePreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-md p-4 overflow-y-auto" onClick={onClose}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-2xl bg-surface border border-line p-6 md:p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-3xl text-white uppercase mb-2">Deploy Spot</h2>
            <p className="font-mono text-xs text-signal mb-6 border-b border-line pb-4">
              {location ? `LOC: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'LOC: UNKNOWN'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div>
                <label className="font-system text-[10px] uppercase text-text-secondary block mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button type="button" key={c} onClick={() => setCategory(c)} className={`px-4 py-2 font-system text-xs uppercase border transition-colors ${category === c ? 'bg-white text-black border-white' : 'bg-void text-text-muted border-line hover:border-text-secondary'}`}>{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-system text-[10px] uppercase text-text-secondary block mb-2">Environment</label>
                <div className="flex flex-wrap gap-2">
                  {ENVIRONMENTS.map(e => (
                    <button type="button" key={e} onClick={() => setEnvironment(e)} className={`px-4 py-2 font-system text-xs uppercase border transition-colors ${environment === e ? 'bg-intel text-white border-intel' : 'bg-void text-text-muted border-line hover:border-text-secondary'}`}>{e}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-system text-[10px] uppercase text-text-secondary block mb-2">Intel Log *</label>
                  <textarea value={log} onChange={(e) => setLog(e.target.value)} maxLength={140} rows={4} required placeholder="What makes this spot unique?" className="w-full bg-void border border-line p-3 font-mono text-sm text-white focus:outline-none focus:border-signal resize-none" />
                </div>
                
                <div>
                  <label className="font-system text-[10px] uppercase text-text-secondary block mb-2">Visual Intel</label>
                  <div className="w-full h-[104px] border-2 border-dashed border-line bg-void hover:border-signal transition-colors cursor-pointer flex flex-col items-center justify-center relative" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span className="font-system text-[10px] uppercase text-text-muted">Tap to Upload Image</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <button type="button" onClick={onClose} className="flex-1 py-4 border border-line text-text-primary font-system text-xs uppercase tracking-widest hover:bg-line transition-colors">Abort</button>
                <button type="submit" className="flex-1 py-4 bg-signal text-black font-system text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">Lock Coordinates</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};