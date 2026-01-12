// src/app/(main)/products/[handle]/page.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useCart } from '@shopify/hydrogen-react';
import { ShopifyProductDetailed } from '@/types/shopify';
import { getProductByHandle } from '@/lib/shopify';
import Image from 'next/image';
import { useCartNotification } from '@/hooks/useCartNotification';
import { formatPrice } from '@/lib/utils/formatPrice';

const ProductDetailsClient = ({ product }: { product: ShopifyProductDetailed }) => {
    const { linesAdd, status: cartStatus } = useCart();
    const { showNotification } = useCartNotification();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedVariantId, setSelectedVariantId] = useState(product.variants.edges.find(v => v.node.availableForSale)?.node.id || product.variants.edges[0]?.node.id);

    const imageGallery = useMemo(() => { if (!product?.featuredImage) return []; const otherImages = product.images?.edges.map(edge => edge.node) || []; return [product.featuredImage, ...otherImages.filter(img => img.url !== product.featuredImage.url)]; }, [product]);
    const selectedVariant = useMemo(() => product.variants.edges.find(edge => edge.node.id === selectedVariantId)?.node, [product, selectedVariantId]);
    const isAddingToCart = cartStatus === 'updating';

    const handleAddToCart = () => { if (selectedVariant) { linesAdd([{ merchandiseId: selectedVariant.id, quantity: 1 }]); showNotification(`${product.title} added to bag`); } };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Gallery Section */}
            <div className="flex flex-col gap-4 sticky top-32">
                <div className="relative w-full aspect-[4/5] bg-[#f5f5f5]">
                    {imageGallery[currentImageIndex] && (
                        <Image
                            src={imageGallery[currentImageIndex].url}
                            alt={imageGallery[currentImageIndex].altText || product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>
                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                    {imageGallery.map((image, index) => (
                        <button 
                            key={index} 
                            onClick={() => setCurrentImageIndex(index)} 
                            className={`w-20 h-24 flex-shrink-0 relative border transition-all ${currentImageIndex === index ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        >
                            <Image src={image.url} alt="" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col pt-4 md:pt-0">
                <h1 className="font-display text-4xl md:text-5xl text-black mb-4">{product.title}</h1>
                
                <div className="font-sans text-xl text-gray-600 mb-8">
                    {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : 'Unavailable'}
                </div>

                <div className="prose prose-sm prose-gray max-w-none font-sans text-gray-600 mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

                <div className="border-t border-gray-100 pt-8">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-4">Select Size</h3>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {product.variants?.edges.map(({ node: variant }) => ( 
                            <button 
                                key={variant.id} 
                                onClick={() => setSelectedVariantId(variant.id)} 
                                disabled={!variant.availableForSale} 
                                className={`
                                    min-w-[3rem] h-10 px-4 flex items-center justify-center border text-xs font-sans font-bold uppercase tracking-wider transition-all
                                    ${selectedVariantId === variant.id ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}
                                    ${!variant.availableForSale ? 'opacity-40 cursor-not-allowed line-through bg-gray-50' : ''}
                                `}
                            > 
                                {variant.title} 
                            </button> 
                        ))}
                    </div>

                    <button 
                        onClick={handleAddToCart} 
                        disabled={!selectedVariant?.availableForSale || isAddingToCart} 
                        className="w-full py-4 bg-black text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAddingToCart ? 'Adding...' : !selectedVariant?.availableForSale ? 'Sold Out' : 'Add to Bag'}
                    </button>
                    
                    <p className="mt-4 text-center font-sans text-[10px] text-gray-400 uppercase tracking-widest">
                        Free shipping on all orders over ₹5,000
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function ProductPage({ params }: { params: { handle: string } }) {
    const [product, setProduct] = useState<ShopifyProductDetailed | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductByHandle(params.handle);
            if (!fetchedProduct) notFound();
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [params.handle]);

    if (!product) return <div className="min-h-screen bg-white flex items-center justify-center text-black font-sans text-xs uppercase tracking-widest">Loading...</div>;

    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <ProductDetailsClient product={product} />
            </div>
        </main>
    );
}