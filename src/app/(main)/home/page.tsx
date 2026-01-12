// src/app/(main)/home/page.tsx

"use client";

import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { FeaturedProducts } from "@/components/modules/homepage/FeaturedProducts";
import { motion } from "framer-motion";
import { BrandManifesto } from "@/components/modules/homepage/BrandManifesto";
import TerminalFooter from "@/components/modules/homepage/GlitchMarquee";
import { GyroSection } from "@/components/modules/homepage/GyroSection"; // Import new section

const HomePage = () => {
  return (
    <main className="bg-white min-h-screen">
      <HeroSection />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
      >
        <FeaturedProducts />
      </motion.div>
      
      {/* New Interactive Gyro Section */}
      <GyroSection />

      <BrandManifesto />
      
      <TerminalFooter />
      
    </main>
  );
};

export default HomePage;