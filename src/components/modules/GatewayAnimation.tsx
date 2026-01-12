"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect, useMemo } from 'react';

const DESKTOP_VARIANTS = {
  container: {
    hidden: {},
    visible: { transition: { delayChildren: 0.5, staggerChildren: 0.2 } },
  },
  logoContainer: {
    hidden: { width: 0, opacity: 0, scale: 0 },
    visible: {
      width: 'auto', 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  },
  image: {
    hidden: { rotate: -180 },
    visible: { rotate: 0, transition: { duration: 1, delay: 0.5 } }
  }
};

const MOBILE_VARIANTS = {
  container: { visible: { transition: { staggerChildren: 0.2 } } },
  logoContainer: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.0, ease: "easeInOut", delay: 0.2 } }
  },
  text: {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
  }
};

// UPDATED TEXT LOGIC
const TEXT_LEFT = "WANTS".split('');
const TEXT_RIGHT = "NEEDS".split('');
const TEXT_FULL = "WANTS & NEEDS";

const DesktopLayout = () => {
  return (
    <motion.div 
      layout
      className="flex items-center justify-center text-black" 
      variants={DESKTOP_VARIANTS.container} 
      initial="hidden" 
      animate="visible"
    >
      <div className="flex">
        {TEXT_LEFT.map((letter, index) => (
            <motion.span key={`l-${index}`} className="font-heading text-5xl md:text-8xl font-black tracking-tight" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                {letter}
            </motion.span>
        ))}
      </div>

      <motion.div 
        className="flex items-center justify-center mx-6 md:mx-8" 
        variants={DESKTOP_VARIANTS.logoContainer}
      >
        <motion.div variants={DESKTOP_VARIANTS.image} className="relative w-24 h-24 md:w-32 md:h-32">
          {/* Using a placeholder circle if you don't have the specific logo GIF, or use the Swambasic rotating one if you want */}
          <div className="w-full h-full rounded-full border-4 border-black flex items-center justify-center">
             <span className="font-sans font-bold text-2xl">&</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex">
        {TEXT_RIGHT.map((letter, index) => (
            <motion.span key={`r-${index}`} className="font-heading text-5xl md:text-8xl font-black tracking-tight" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}>
                {letter}
            </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const MobileLayout = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-4 text-black"
      initial="hidden"
      animate="visible"
      variants={MOBILE_VARIANTS.container}
    >
       <motion.div variants={MOBILE_VARIANTS.logoContainer}>
        <div className="w-32 h-32 rounded-full border-4 border-black flex items-center justify-center mb-4">
             <span className="font-sans font-bold text-4xl">&</span>
        </div>
      </motion.div>

      <div className="overflow-hidden">
        <motion.span 
          className="font-heading text-4xl font-black tracking-widest uppercase inline-block text-center"
          variants={MOBILE_VARIANTS.text}
        >
          {TEXT_FULL}
        </motion.span>
      </div>
    </motion.div>
  );
};

export const GatewayAnimation = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <div className="h-[200px]" />;
  
  return (
    <div style={{ contain: 'layout style paint' }}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
};