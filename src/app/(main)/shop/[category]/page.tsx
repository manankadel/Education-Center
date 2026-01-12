// src/app/(main)/shop/[category]/page.tsx

import { getProductsDetailed } from '@/lib/shopify';
import { ShopifyProductDetailed } from '@/types/shopify';
import { InteractiveProductCard } from '@/components/modules/products/InteractiveProductCard';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category;
  
  // Fetch all products
  const allProducts = await getProductsDetailed(50);
  
  // Filter by category keyword
  const filteredProducts = allProducts.filter(p => 
    p.title.toLowerCase().includes(category.toLowerCase()) || 
    p.handle.toLowerCase().includes(category.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
            {/* ORIGINAL NAV BAR RESTORED */}
            <div className="mb-12 flex gap-6 overflow-x-auto pb-4 border-b border-white/10">
                <Link href="/catalog" className="text-white font-sans text-xs font-bold uppercase tracking-widest border-b-2 border-white pb-1">All</Link>
                {/* Removed unwanted category links */}
            </div>

            <h1 className="font-display text-4xl font-bold text-white uppercase mb-8">{category.toUpperCase()}</h1>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredProducts.map((product) => (
                        <InteractiveProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400 font-sans uppercase tracking-widest">No products found.</p>
                </div>
            )}
        </div>
    </main>
  );
}