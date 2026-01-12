// src/components/modules/catalog/CatalogClientWrapper.tsx

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopifyProductDetailed } from '@/types/shopify';
import { CatalogControls } from './CatalogControls';
import { ImmersiveView } from './ImmersiveView';
import { GridView } from './GridView';
import { LiquidGrainBackground } from '@/components/core/LiquidGrainBackground';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SYNC_TRANSITION = {
  duration: 1.2,
  ease: [0.76, 0, 0.24, 1],
};

interface CollectionSplashProps {
  onReveal: () => void;
  shouldAnimateEntry: boolean;
}

const CollectionSplash = ({ onReveal, shouldAnimateEntry }: CollectionSplashProps) => {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  // VARIANTS
  const topVariants = {
    closed: { y: '0%' },
    open: { y: '-100%' }
  };

  const bottomVariants = {
    closed: { y: '0%' },
    open: { y: '100%' }
  };

  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      onClick={onReveal}
      initial={shouldAnimateEntry ? "open" : "closed"}
      animate="closed"
      exit="open"
    >
      {/* 
        TOP SHUTTER
        Height: 50% minus 1px gap.
      */}
      <motion.div 
        variants={topVariants}
        transition={SYNC_TRANSITION}
        className="absolute top-0 left-0 w-full bg-black border-b border-white/20 will-change-transform flex items-end justify-center pb-4 md:pb-8 overflow-hidden"
        style={{ height: 'calc(50% - 65px)' }}
      >
        {/* Adjusted Translate Y to 15% (Moved Up) */}
        <div className="text-center mix-blend-difference text-white ">
            <p className="font-sans uppercase tracking-widest text-[10px] md:text-sm text-white/50 mb-2 md:mb-6">Collection Vol. 1</p>
            <h1 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter">
              TAKE
            </h1>
        </div>
      </motion.div>
      
      {/* 
        BOTTOM SHUTTER
        Height: 50% minus 1px gap.
      */}
      <motion.div 
        variants={bottomVariants}
        transition={SYNC_TRANSITION}
        className="absolute bottom-0 left-0 w-full bg-black border-t border-white/20 will-change-transform flex items-start justify-center pt-4 md:pt-8 overflow-hidden"
        style={{ height: 'calc(50% - 65px)' }}
      >
         {/* Adjusted Translate Y to -15% (Moved Down) */}
         <div className="text-center mix-blend-difference text-white ">
            <h1 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-tighter">
              ACTION
            </h1>
            <p className="font-sans uppercase tracking-widest text-[10px] md:text-sm text-white/50 mt-8 md:mt-12 cursor-pointer animate-pulse">
              [ Click to Enter ]
            </p>
         </div>
      </motion.div>
    </motion.div>
  );
};

type ViewMode = 'immersive' | 'grid';
interface CatalogClientWrapperProps {
  products: ShopifyProductDetailed[];
}

export const CatalogClientWrapper = ({ products }: CatalogClientWrapperProps) => {
  const [showContent, setShowContent] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (!showContent) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      html.classList.remove('catalog-revealed');
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      html.classList.add('catalog-revealed');
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      html.classList.remove('catalog-revealed');
    };
  }, [showContent]);

  const handleEnter = () => {
    setShowContent(true);
    setHasInteracted(true);
  };

  const handleGoBack = () => {
    setShowContent(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background (Always Z-0) */}
      <LiquidGrainBackground />
      
      {/* The Gate (Z-Index 100) */}
      <AnimatePresence mode="wait">
        {!showContent && (
          <CollectionSplash 
            key="splash" 
            onReveal={handleEnter} 
            shouldAnimateEntry={hasInteracted} 
          />
        )}
      </AnimatePresence>
      
      {/* The Content (Z-Index 10) */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="relative z-10"
          >
            {viewMode === 'immersive' && (
              <ImmersiveView products={products} focusedIndex={focusedIndex} setFocusedIndex={setFocusedIndex} />
            )}
            {viewMode === 'grid' && <GridView products={products} />}
            
            <CatalogControls viewMode={viewMode} setViewMode={setViewMode} goBack={handleGoBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};