// src/app/(main)/home/page.tsx

"use client";

import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { FeaturedProducts } from "@/components/modules/homepage/FeaturedProducts";
import { motion } from "framer-motion";
import { BrandManifesto } from "@/components/modules/homepage/BrandManifesto";
import TerminalFooter from "@/components/modules/homepage/GlitchMarquee";
import { GyroSection } from "@/components/modules/homepage/GyroSection";
import { StaticInterlude } from "@/components/modules/homepage/StaticInterlude";

const HomePage = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Featured Products (MOVED UP) - Instant commerce context */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
      >
        <FeaturedProducts />
      </motion.div>
      
      {/* 3. Gyro Split Section - Interactive Brand Experience */}
      <GyroSection />
      
      {/* 4. Static Interlude - Editorial Break */}
      <StaticInterlude />

      {/* 5. Philosophy/Stars - Deep Dive */}
      <BrandManifesto />
      
      <TerminalFooter />
    </main>
  );
};

export default HomePage;