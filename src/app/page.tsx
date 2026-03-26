// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import { FloatingParticlesBackground } from "@/components/core/FloatingParticlesBackground";

// Mock data for the live feed
const RECENT_SPOTS =[
  { id: 1, author: "Agent_K", location: "Bandra Sea Link, Mumbai", desc: "2 AM drive. No traffic. The city is quiet.", time: "2 hrs ago" },
  { id: 2, author: "Freq_01", location: "Hauz Khas Village, Delhi", desc: "Found the hidden vinyl cafe. Dropping coords.", time: "5 hrs ago" },
  { id: 3, author: "SysAdmin", location: "Nandi Hills, Bangalore", desc: "Sunrise point secured. Fog is dense today.", time: "12 hrs ago" },
  { id: 4, author: "Anon_99", location: "Fort Kochi, Kerala", desc: "Old warehouse. Perfect acoustics.", time: "1 day ago" },
];

export default function SpottedDashboard() {
  return (
    <main className="bg-[#050505] min-h-[100dvh] text-white relative overflow-hidden pt-24 pb-12">
      
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <FloatingParticlesBackground mousePosition={{x: 0, y: 0}} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Sys.Online // 10 Agents Active</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Command<br/>Center.
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 md:mt-0 flex gap-8"
          >
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Total Spots</span>
              <span className="font-display text-4xl font-bold text-[#FFB000]">142</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Latest Region</span>
              <span className="font-display text-4xl font-bold text-white">BOM</span>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 relative h-[400px] md:h-[500px] border border-white/10 bg-[#0a0a0a] group overflow-hidden"
          >
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFB000] mb-2 block">
                [ Interactive Grid ]
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">
                Open The Atlas
              </h2>
              <Link href="/atlas">
                <button className="px-8 py-4 bg-[#FFB000] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-3">
                  Deploy Radar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </Link>
            </div>

            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-white/10 bg-[#0a0a0a] flex flex-col h-[400px] md:h-[500px]"
          >
            <div className="p-6 border-b border-white/10 bg-white/5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-white/50">Live Intel // Feed</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {RECENT_SPOTS.map((spot, i) => (
                <div key={spot.id} className="relative pl-4 border-l border-white/10 hover:border-[#FFB000] transition-colors group cursor-default">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#050505] border border-white/30 group-hover:border-[#FFB000] group-hover:bg-[#FFB000] transition-colors rounded-full" />
                  
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-[10px] text-[#FFB000]">{spot.author}</span>
                    <span className="font-mono text-[9px] text-white/30">{spot.time}</span>
                  </div>
                  <h4 className="font-sans text-sm font-bold text-white mb-1">{spot.location}</h4>
                  <p className="font-sans text-xs text-white/60 leading-relaxed">{spot.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}