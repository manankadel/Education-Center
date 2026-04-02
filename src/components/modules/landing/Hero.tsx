"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HERO_DATA } from "@/lib/data";

// High-end editorial imagery
const HERO_IMAGES =[
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
];

const AUTOPLAY_DURATION = 5000; // 5 seconds per slide

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax the text apart on scroll
  const y1 = useTransform(scrollYProgress,[0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress,[0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Carousel Logic
  const[currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  },[]);

  return (
    <section ref={containerRef} className="relative h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      
      {/* Cinematic Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={HERO_IMAGES[currentImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }} // 0.35 opacity keeps the text highly legible
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity"
          />
        </AnimatePresence>
        
        {/* Gradients to blend the edges into the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        
        <p className="font-sans text-accent tracking-[0.3em] uppercase text-xs md:text-sm mb-8 font-bold">
          EST. 2008 • JAIPUR
        </p>

        <h1 className="text-[12vw] leading-[0.8] font-serif font-black tracking-tighter uppercase w-full flex flex-col items-center drop-shadow-2xl">
          <motion.span style={{ y: y1 }} className="block">
            {HERO_DATA.headline.split(" ")[0]}
          </motion.span>
          <motion.span style={{ y: y2 }} className="block text-outline font-sans italic">
            {HERO_DATA.headline.split(" ")[1]}
          </motion.span>
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-20 flex flex-col items-center gap-4"
        >
          <p className="font-sans text-sm uppercase tracking-widest text-foreground max-w-sm text-center drop-shadow-md">
            Destinies are not created alone. They are nurtured.
          </p>
          <div className="w-[1px] h-16 bg-accent mt-4" />
        </motion.div>

      </motion.div>

      {/* Premium Pagination Indicators */}
      <div className="absolute bottom-12 left-6 md:left-12 flex gap-3 z-20">
        {HERO_IMAGES.map((_, i) => (
          <div key={i} className="h-[2px] w-12 bg-foreground/20 overflow-hidden relative">
            {i === currentImage && (
              <motion.div 
                className="absolute inset-0 bg-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>

    </section>
  );
};