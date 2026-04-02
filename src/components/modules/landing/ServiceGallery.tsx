"use client";
import { SERVICES_DATA } from "@/lib/data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES =[
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop", // Counselling
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop", // Distance
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop", // Coaching
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"  // ISTP
];

export const ServiceGallery = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative w-full min-h-screen bg-background py-32 flex items-center overflow-hidden">
      
      {/* Background Image Reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence>
            {hovered !== null && (
                <motion.img 
                    key={hovered}
                    src={IMAGES[hovered]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                />
            )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6">
        <p className="font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase mb-16">
          Offerings & Disciplines
        </p>
        
        <div className="flex flex-col w-full">
          {SERVICES_DATA.map((service, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="group border-b border-foreground/10 py-10 md:py-16 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
            >
              <h3 className="text-4xl md:text-7xl font-serif font-black uppercase tracking-tighter group-hover:text-accent group-hover:italic transition-all duration-500">
                {service.title}
              </h3>
              
              <div className="mt-6 md:mt-0 max-w-sm w-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans text-sm text-foreground/80">
                <p className="mb-4">{service.desc}</p>
                <ul className="space-y-1 border-l border-accent pl-4">
                    {service.details.slice(0, 2).map((d, i) => (
                        <li key={i}>{d}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};