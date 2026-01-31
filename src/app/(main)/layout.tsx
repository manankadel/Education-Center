// src/app/(main)/layout.tsx
"use client";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react';
import { CartToast } from '@/hooks/useCartNotification'; 

export default function MainLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ShopifyProvider
      storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!}
      storefrontToken={process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!}
      // FIX: Updated version to match Hydrogen package
      storefrontApiVersion="2025-04"
      countryIsoCode="IN"
      languageIsoCode="EN"
    >
      <CartProvider>
        <div>
          <Header />
          {children}
          <Footer />
          <CartToast /> 
        </div>
      </CartProvider>
    </ShopifyProvider>
  );
}