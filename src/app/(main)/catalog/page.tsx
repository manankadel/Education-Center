// src/app/(main)/catalog/page.tsx

import { getProductsDetailed } from '@/lib/shopify'; 
import { CatalogClientWrapper } from '@/components/modules/catalog/CatalogClientWrapper';
import { ShopifyProductDetailed } from '@/types/shopify';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products: ShopifyProductDetailed[] = await getProductsDetailed(20); 

  return (
    // Force Black Background
    <main className="relative min-h-screen w-full bg-black text-white">
        <CatalogClientWrapper products={products} />
    </main>
  );
}