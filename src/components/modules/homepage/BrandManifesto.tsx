// src/components/modules/homepage/BrandManifesto.tsx

"use client";
import { motion } from 'framer-motion';
import { FloatingParticlesBackground } from '@/components/core/FloatingParticlesBackground';
import { useGyroscope } from '@/hooks/useGyroscope';
import { useState } from 'react';

const text = "We are not for everyone. Wants & Needs is a rejection of the ordinary, a uniform for the discerning individual who moves between worlds. This is luxury defined not by a price tag, but by a perspective.";

export const BrandManifesto = () => {
  // 1. Get Gyro Data
  const { smoothedGyroData } = useGyroscope();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = event.currentTarget;
    const x = (event.clientX / clientWidth) * 2 - 1;
    const y = -((event.clientY / clientHeight) * 2 - 1);
    setMousePosition({ x, y });
  };

  return (
    <section 
        className="relative py-32 px-6 md:px-12 bg-black text-white flex justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
    >
      {/* 2. Pass Gyro Data to Particles */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <FloatingParticlesBackground mousePosition={mousePosition} gyroData={smoothedGyroData} />
      </div>

      <motion.div 
        className="relative z-10 max-w-3xl text-center mix-blend-difference"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.05 }}
      >
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-12 tracking-tight">
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
            The Philosophy
          </motion.span>
        </h2>
        <p className="font-sans text-lg md:text-2xl leading-relaxed text-white/80 font-light">
          {text.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, filter: 'blur(10px)' },
                visible: { opacity: 1, filter: 'blur(0px)' }
              }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              {word} 
            </motion.span>
          ))}
        </p>
      </motion.div>
      
      <div className="absolute bottom-8 left-0 w-full text-center z-10 pointer-events-none opacity-30">
        <p className="font-mono text-[9px] uppercase tracking-widest">
            ( Tilt to navigate the void )
        </p>
      </div>
    </section>
  );
};