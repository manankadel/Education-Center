// src/components/modules/products/ProductCard.tsx

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShopifyProduct } from '@/types/shopify';
import { formatPrice } from '@/lib/utils/formatPrice';

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
  <Link href={`/products/${product.handle}`} passHref>
    <motion.div
      className="group flex flex-col h-full cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-full aspect-[3/4] bg-[#f5f5f5] overflow-hidden relative mb-4">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-400 uppercase">No Image</span>
          </div>
        )}
        
        {/* Optional: Add a 'Quick View' or 'Add' button that appears on hover */}
        <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full py-3 bg-white text-black text-center text-xs uppercase tracking-widest font-bold">
                View Detail
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <h3 className="font-sans text-sm text-gray-900 group-hover:text-black transition-colors">{product.title}</h3>
        <p className="font-sans text-sm text-gray-600">
            {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
        </p>
      </div>
    </motion.div>
  </Link>
);
}