// src/components/modules/atlas/CreatorStudio.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AtlasNode } from '@/types/atlas';

interface CreatorStudioProps {
  node: AtlasNode;
  mapRef: React.MutableRefObject<any>;
  onClose: () => void;
}

type RenderStatus = 'idle' | 'rendering' | 'processing' | 'complete';
type CameraPath = 'orbit' | 'dive' | 'reveal';

export const CreatorStudio = ({ node, mapRef, onClose }: CreatorStudioProps) => {
  const [status, setStatus] = useState<RenderStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [cameraPath, setCameraPath] = useState<CameraPath>('orbit');
  const [duration, setDuration] = useState(8); // seconds
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // The core rendering engine
  const startRender = async () => {
    if (!mapRef.current) return;
    setStatus('rendering');
    setProgress(0);
    setVideoUrl(null);

    const map = mapRef.current.getMap();
    const canvas = map.getCanvas();
    
    // 1. Setup Recorder (60 FPS)
    const stream = canvas.captureStream(60);
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
    chunksRef.current =[];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      setStatus('processing');
      setTimeout(() => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('complete');
      }, 1000); // Artificial processing delay for tactical feel
    };

    // 2. Start Recording
    mediaRecorderRef.current.start();

    // Progress Bar Simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (duration * 10)); // 10 updates per second
      });
    }, 100);

    // 3. Execute Selected Camera Path
    if (cameraPath === 'orbit') {
      map.flyTo({ center: [node.lng, node.lat], zoom: 17, pitch: 65, duration: 2000 });
      await new Promise(r => setTimeout(r, 2000));
      map.easeTo({ bearing: map.getBearing() + 180, duration: duration * 1000, easing: (t: number) => t });
    } 
    else if (cameraPath === 'dive') {
      map.flyTo({ center: [node.lng, node.lat], zoom: 12, pitch: 0, duration: 1000 });
      await new Promise(r => setTimeout(r, 1000));
      map.flyTo({ center:[node.lng, node.lat], zoom: 18, pitch: 75, bearing: 45, duration: duration * 1000 });
    }
    else if (cameraPath === 'reveal') {
      map.flyTo({ center: [node.lng, node.lat], zoom: 18, pitch: 85, duration: 1000 });
      await new Promise(r => setTimeout(r, 1000));
      map.easeTo({ pitch: 30, zoom: 14, duration: duration * 1000 });
    }

    // 4. Stop Recording
    setTimeout(() => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      clearInterval(progressInterval);
    }, duration * 1000 + 2000); // add 2s buffer for initial flyTo
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-xl p-6"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 border border-signal p-8 bg-surface shadow-[0_0_50px_rgba(255,176,0,0.15)]">
        
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="font-system text-[10px] text-signal uppercase tracking-[4px] block mb-2">Creator Studio</span>
                <h2 className="font-display text-5xl text-text-primary uppercase leading-none">Director<br/>Mode.</h2>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-signal font-mono text-[10px]">[ ABORT ]</button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="font-system text-[9px] text-text-secondary uppercase tracking-[2px] block mb-3">Camera Path</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['orbit', 'dive', 'reveal'] as CameraPath[]).map(path => (
                    <button 
                      key={path} onClick={() => setCameraPath(path)} disabled={status !== 'idle'}
                      className={`py-3 font-system text-[10px] uppercase tracking-widest border transition-all ${cameraPath === path ? 'bg-signal text-void border-signal' : 'bg-void text-text-muted border-line hover:border-text-secondary'} disabled:opacity-50`}
                    >
                      {path}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-system text-[9px] text-text-secondary uppercase tracking-[2px]">Duration (Seconds)</label>
                  <span className="font-mono text-[10px] text-signal">{duration}s</span>
                </div>
                <input 
                  type="range" min="4" max="15" step="1" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} disabled={status !== 'idle'}
                  className="w-full h-1 bg-line rounded-none appearance-none cursor-pointer disabled:opacity-50" 
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            {status === 'idle' && (
              <button onClick={startRender} className="w-full py-4 bg-signal text-void font-system text-xs font-bold uppercase tracking-[4px] hover:bg-white transition-colors flex justify-center items-center gap-3">
                <div className="w-2 h-2 bg-alert rounded-full animate-pulse" />
                Initialize Render
              </button>
            )}

            {(status === 'rendering' || status === 'processing') && (
              <div className="w-full p-4 border border-signal bg-signal/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-system text-[10px] text-signal uppercase tracking-[2px] animate-pulse">
                    {status === 'rendering' ? 'CAPTURING WEBGL CANVAS...' : 'ENCODING .WEBM ASSET...'}
                  </span>
                  <span className="font-mono text-[10px] text-signal">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1 bg-line overflow-hidden">
                  <div className="h-full bg-signal transition-all duration-100" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Output & Preview */}
        <div className="bg-void border border-line flex flex-col items-center justify-center p-6 relative min-h-[300px]">
          {status === 'idle' && (
            <div className="text-center opacity-50">
              <svg className="w-12 h-12 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <p className="font-system text-[9px] uppercase tracking-[3px] text-text-muted">Output Preview Offline</p>
            </div>
          )}

          {status === 'rendering' && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-alert rounded-full animate-pulse" />
              <span className="font-system text-[9px] text-alert uppercase tracking-widest">LIVE</span>
            </div>
          )}

          {status === 'complete' && videoUrl && (
            <div className="w-full h-full flex flex-col">
              <video src={videoUrl} autoPlay loop muted controls className="w-full h-auto border border-line mb-6" />
              <a 
                href={videoUrl} 
                download={`SPOTTED_ASSET_${node.id.substring(0,6)}.webm`}
                className="w-full mt-auto py-4 bg-confirm text-void font-system text-xs font-bold uppercase tracking-[4px] hover:bg-white transition-colors text-center"
              >
                DOWNLOAD ASSET
              </a>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};