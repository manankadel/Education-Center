// src/components/modules/products/InteractiveProductCard.tsx

"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@shopify/hydrogen-react';
import { ShopifyProductDetailed } from '@/types/shopify';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useCartNotification } from '@/hooks/useCartNotification';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/formatPrice';

const getOptimizedShopifyImageUrl = (url: string, size: number) => {
    if (!url) return '';
    try {
        const urlObj = new URL(url);
        const extension = urlObj.pathname.split('.').pop();
        const pathWithoutExtension = urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('.'));
        return `${urlObj.origin}${pathWithoutExtension}_${size}x.${extension}`;
    } catch (e) { return url; }
};

const ArrowLeft = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> );
const ArrowRight = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> );

interface InteractiveProductCardProps {
  product: ShopifyProductDetailed;
}

export const InteractiveProductCard = ({ product }: InteractiveProductCardProps) => {
    const router = useRouter();
    const { linesAdd, status: cartStatus } = useCart();
    const { showNotification } = useCartNotification();
    const [isUIActive, setUIActive] = useState(false);
    const isHoverCapable = useMediaQuery('(hover: hover)');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
        product.variants.edges.find(v => v.node.availableForSale)?.node.id || product.variants.edges[0]?.node.id
    );

    const imageGallery = useMemo(() => {
        if (!product?.featuredImage) return [];
        const otherImages = product.images?.edges.map(edge => edge.node) || [];
        return [product.featuredImage, ...otherImages.filter(img => img.url !== product.featuredImage.url)];
    }, [product]);

    const handleNextImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImageIndex((p) => (p + 1) % imageGallery.length); };
    const handlePrevImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImageIndex((p) => (p - 1 + imageGallery.length) % imageGallery.length); };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        const selectedVariant = product.variants.edges.find(edge => edge.node.id === selectedVariantId)?.node;
        if (selectedVariant) {
            linesAdd([{ merchandiseId: selectedVariant.id, quantity: 1 }]);
            showNotification(`${product.title} added to cart`);
        }
    };
    
    const isAddingToCart = cartStatus === 'updating';

    const handleCardClick = () => {
        if (isHoverCapable) {
            router.push(`/products/${product.handle}`);
        } else {
            if (isUIActive) {
                router.push(`/products/${product.handle}`);
            } else {
                setUIActive(true);
            }
        }
    };

    return (
        <motion.div 
            className="group relative w-full cursor-pointer"
            onClick={handleCardClick}
            onHoverStart={() => isHoverCapable && setUIActive(true)}
            onHoverEnd={() => isHoverCapable && setUIActive(false)}
        >
            {/* Changed: border-black/10, bg-white/20, shadow-black/10 */}
            <div className="relative w-full rounded-xl border border-black/10 bg-white/40 backdrop-blur-xl shadow-lg overflow-hidden transition-shadow duration-300 group-hover:shadow-black/20">
                {/* Changed: bg-black/5 */}
                <div className="relative w-full aspect-[3/4] bg-black/5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="w-full h-full"
                        >
                            <Image
                                src={getOptimizedShopifyImageUrl(imageGallery[currentImageIndex]?.url, 600)}
                                alt={imageGallery[currentImageIndex]?.altText || product.title}
                                fill
                                className="object-cover"
                                quality={80}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </motion.div>
                    </AnimatePresence>
                    
                    <AnimatePresence>
                        {isUIActive && (
                            <>
                                {/* Changed: bg-white/80, text-black */}
                                <motion.button onClick={handlePrevImage} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 text-black/70 hover:text-black backdrop-blur-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}> <ArrowLeft /> </motion.button>
                                <motion.button onClick={handleNextImage} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 text-black/70 hover:text-black backdrop-blur-sm" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}> <ArrowRight /> </motion.button>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4">
                    {/* Changed: text-black */}
                    <h3 className="font-sans font-semibold text-black truncate">{product.title}</h3>
                    <p className="font-mono text-sm text-black/70">{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}</p>
                </div>

                <AnimatePresence>
                    {isUIActive && (
                        <motion.div 
                            // Changed: bg-gradient to white
                            className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white via-white/90 to-transparent z-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="flex flex-wrap gap-2 mb-3">
                                {product.variants?.edges.map(({ node: variant }) => (
                                    <button
                                        key={variant.id}
                                        onClick={(e) => { e.stopPropagation(); setSelectedVariantId(variant.id); }}
                                        disabled={!variant.availableForSale}
                                        // Changed: bg-black text-white for active, bg-transparent text-black for inactive
                                        className={`px-2 py-1 rounded-md font-sans text-[10px] font-semibold border transition-colors duration-200 ${selectedVariantId === variant.id ? 'bg-black text-white border-black' : 'bg-transparent text-black border-black/20'} ${!variant.availableForSale ? 'opacity-30 cursor-not-allowed' : 'hover:border-black/70'}`}
                                    >
                                        {variant.title}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedVariantId || isAddingToCart}
                                // Changed: bg-black text-white
                                className="w-full py-2 bg-black/90 text-white font-sans text-xs font-bold uppercase tracking-widest disabled:opacity-50 enabled:hover:bg-black transition-all rounded-full"
                            >
                                {isAddingToCart ? '...' : 'Quick Add'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};