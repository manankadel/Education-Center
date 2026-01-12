// src/components/modules/catalog/GridView.tsx

"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopifyProductDetailed } from '@/types/shopify';
import { InteractiveProductCard } from '@/components/modules/products/InteractiveProductCard';

const ChevronDown = () => ( <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> );
const GridDensityIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="3" x2="9" y2="21"></line></svg> );

const sortOptions = [
    { key: 'FEATURED', label: 'Sort: Featured' },
    { key: 'PRICE_LOW_TO_HIGH', label: 'Price: Low to High' },
    { key: 'PRICE_HIGH_TO_LOW', label: 'Price: High to Low' },
];

const gridColumnClasses: { [key: number]: string } = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-3 md:grid-cols-5',
};

interface GridViewProps {
  products: ShopifyProductDetailed[];
}

export const GridView = ({ products }: GridViewProps) => {
  const [sortKey, setSortKey] = useState(sortOptions[0].key);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState(3); 
  const [isGridSizeOpen, setIsGridSizeOpen] = useState(false);
  const gridSizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) setIsSortOpen(false);
      if (gridSizeRef.current && !gridSizeRef.current.contains(event.target as Node)) setIsGridSizeOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedProducts = useMemo(() => {
    const newArray = [...products];
    switch (sortKey) {
      case 'PRICE_LOW_TO_HIGH': return newArray.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
      case 'PRICE_HIGH_TO_LOW': return newArray.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
      default: return products;
    }
  }, [products, sortKey]);

  const selectedOption = sortOptions.find(opt => opt.key === sortKey) || sortOptions[0];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 md:p-12 pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="font-display text-4xl font-bold text-white">Catalog</h1>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative" ref={gridSizeRef}>
              <button onClick={() => setIsGridSizeOpen(!isGridSizeOpen)} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/20 rounded-full focus:outline-none transition-colors hover:border-white/30 text-white"> <GridDensityIcon /> </button>
              <AnimatePresence>
                {isGridSizeOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 md:left-auto md:right-0 mt-2 w-48 bg-black/80 border border-white/10 rounded-lg backdrop-blur-xl shadow-lg z-30 p-4">
                    <label className="font-sans text-xs uppercase text-white/50">View Density</label>
                    <input type="range" min="2" max="5" step="1" value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer custom-slider mt-2"/>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-full md:w-48" ref={sortDropdownRef}>
              <button onClick={() => setIsSortOpen(!isSortOpen)} className="w-full flex items-center justify-between bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-sm font-sans focus:outline-none transition-colors hover:border-white/30 text-white">
                <span>{selectedOption.label}</span>
                <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}> <ChevronDown /> </motion.div>
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full right-0 mt-2 w-full bg-black/80 border border-white/10 rounded-lg backdrop-blur-xl shadow-lg z-30 overflow-hidden">
                    {sortOptions.map((option) => ( <button key={option.key} onClick={() => { setSortKey(option.key); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-sans hover:bg-white/10 transition-colors text-white"> {option.label} </button> ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div layout className={`max-w-7xl mx-auto grid ${gridColumnClasses[gridSize]} gap-x-6 gap-y-12`}>
          {sortedProducts.map((product) => (
            <motion.div key={product.id} layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <InteractiveProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <style jsx global>{` .custom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; background: #ffffff; cursor: pointer; border-radius: 50%; margin-top: -6px; } .custom-slider::-moz-range-thumb { width: 16px; height: 16px; background: #ffffff; cursor: pointer; border-radius: 50%; } `}</style>
    </>
  );
};