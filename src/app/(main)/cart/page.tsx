// src/app/(main)/cart/page.tsx

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCart, type Cart } from '@shopify/hydrogen-react';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils/formatPrice';

type ArrayElement<T> = T extends readonly (infer U)[] ? U : T;
type CartLine = ArrayElement<Cart['lines']>;
type CartStatus = 'uninitialized' | 'fetching' | 'idle' | 'creating' | 'updating';

const CartLineItem = ({ 
    line,
    linesRemove,
    status 
}: { 
    line: CartLine,
    linesRemove: (lineIds: string[]) => void,
    status: CartStatus
}) => {
    return (
        <div className="flex gap-6 items-center py-6 border-b border-gray-100 last:border-0">
            <div className="w-20 h-28 bg-gray-50 rounded-sm flex-shrink-0 overflow-hidden relative">
                {line?.merchandise?.image && (
                    <Image
                        src={line.merchandise.image.url ?? ""}
                        alt={line.merchandise.image.altText || line.merchandise.product?.title || ""}
                        fill
                        className="object-cover"
                    />
                )}
            </div>
            <div className="flex-grow">
                <h3 className="font-display text-lg text-black">{line?.merchandise?.product?.title ?? ""}</h3>
                <p className="font-sans text-xs text-gray-500 uppercase tracking-wide mt-1">
                    {line?.merchandise?.title}
                </p>
                <button 
                    onClick={() => { if (line?.id) linesRemove([line.id]); }}
                    disabled={status === 'updating'}
                    className="text-xs font-sans text-gray-400 hover:text-red-600 transition-colors mt-4 disabled:opacity-50 underline"
                >
                    Remove
                </button>
            </div>
            <div className="font-sans text-sm text-gray-600">
                {line ? `Qty ${line.quantity}` : null}
            </div>
            <div className="font-sans text-sm font-medium text-black text-right min-w-[80px]">
                {formatPrice(line?.cost?.totalAmount?.amount ?? "0", line?.cost?.totalAmount?.currencyCode)}
            </div>
        </div>
    );
};

const CartPage = () => {
  const { lines, cost, checkoutUrl, status, linesRemove, discountCodes, discountCodesUpdate } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const isApplyingDiscount = status === 'updating';

  const handleApplyDiscount = () => {
    if (discountCode) discountCodesUpdate([discountCode]);
  };

  if (status === 'uninitialized' || status === 'fetching') {
      return (
          <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
              <h1 className="font-display text-2xl animate-pulse">Loading Cart...</h1>
          </main>
      );
  }

  if (!lines || lines.length === 0 || !cost) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-3xl md:text-4xl mb-6">Your Bag is Empty.</h1>
        <Link href="/catalog">
          <button className="px-8 py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Start Shopping
          </button>
        </Link>
      </main>
    );
  }
  
  const subtotal = parseFloat(cost.subtotalAmount?.amount ?? "0");
  const total = parseFloat(cost.totalAmount?.amount ?? "0");
  const discountAmount = subtotal - total;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-display text-4xl mb-12 border-b border-black pb-6">Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          <div className="lg:col-span-2 flex flex-col">
            {lines.map(line => (
              line ? <CartLineItem key={line.id} line={line} linesRemove={linesRemove} status={status} /> : null
            ))}
          </div>
          
          <div className="lg:col-span-1">
             <div className="lg:sticky top-32 p-8 bg-gray-50 rounded-sm">
              <h2 className="font-display text-xl mb-6">Order Summary</h2>
              
              <div className="mb-6 flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="GIFT CARD OR CODE"
                  className="flex-grow px-4 py-3 bg-white border border-gray-200 text-xs focus:outline-none focus:border-black transition-colors font-sans"
                />
                <button
                  onClick={handleApplyDiscount}
                  disabled={isApplyingDiscount || !discountCode}
                  className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm text-gray-600 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black">{formatPrice(cost.subtotalAmount?.amount ?? '0', cost.subtotalAmount?.currencyCode ?? 'INR')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discountCodes?.[0]?.code})</span>
                    <span>-{formatPrice(discountAmount, cost.subtotalAmount?.currencyCode ?? 'INR')}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-xs text-gray-400">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between font-display text-lg font-bold mb-8">
                <span>Total</span>
                <span>{formatPrice(cost.totalAmount?.amount ?? '0', cost.totalAmount?.currencyCode ?? 'INR')}</span>
              </div>
              
              <a href={checkoutUrl} className="block text-center w-full py-4 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;