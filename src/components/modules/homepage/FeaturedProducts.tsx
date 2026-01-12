// src/components/modules/homepage/FeaturedProducts.tsx

"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';
import { ProductCard } from '@/components/modules/products/ProductCard';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
        const p = await getProducts(4);
        setProducts(p);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <h2 className="font-display text-4xl md:text-5xl text-black leading-tight">
                    Curated<br />Selections
                </h2>
                <a href="/catalog" className="hidden md:block font-sans text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            <div className="mt-16 text-center md:hidden">
                 <a href="/catalog" className="font-sans text-xs uppercase tracking-widest border-b border-black pb-1">
                    View All
                </a>
            </div>
        </div>
    </section>
  );
};