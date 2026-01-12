// src/components/modules/account/OrderDetails.tsx

"use client";

import { ShopifyOrderDetailed } from "@/types/shopify";
import { formatPrice } from "@/lib/utils/formatPrice";
import { format } from 'date-fns';
import Image from "next/image";

const OrderDetails = ({ order }: { order: ShopifyOrderDetailed }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold">Order #{order.orderNumber}</h2>
        <p className="font-sans text-sm text-white/50 mt-1">
          Placed on {format(new Date(order.processedAt), 'MMMM dd, yyyy')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border border-white/10 rounded-lg">
          <h3 className="font-sans uppercase tracking-wider text-sm text-white/50 mb-4">Shipping Address</h3>
          <p className="font-sans">
            {order.shippingAddress.address1}<br />
            {order.shippingAddress.address2 && <>{order.shippingAddress.address2}<br /></>}
            {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}<br />
            {order.shippingAddress.country}
          </p>
        </div>
        <div className="p-6 border border-white/10 rounded-lg">
          <h3 className="font-sans uppercase tracking-wider text-sm text-white/50 mb-4">Payment Summary</h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between"><span>Subtotal</span> <span>{formatPrice(order.subtotalPriceV2.amount, order.subtotalPriceV2.currencyCode)}</span></div>
            <div className="flex justify-between"><span>Shipping</span> <span>{formatPrice(order.totalShippingPriceV2.amount, order.totalShippingPriceV2.currencyCode)}</span></div>
            <div className="flex justify-between font-bold border-t border-white/10 pt-2 mt-2"><span>Total</span> <span>{formatPrice(order.totalPriceV2.amount, order.totalPriceV2.currencyCode)}</span></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-sans uppercase tracking-wider text-sm text-white/50 mb-4">Items in this order</h3>
        <div className="space-y-4">
          {order.lineItems.edges.map(({ node: item }) => (
            <div key={item.variant.image.url} className="flex gap-4 p-4 border border-white/10 rounded-lg">
              <div className="w-20 h-24 bg-white/5 rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.variant.image.url} alt={item.variant.image.altText || item.title} width={80} height={96} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-grow">
                <p className="font-sans font-semibold">{item.title}</p>
                <p className="font-sans text-sm text-white/50">{item.variant.title}</p>
                <p className="font-mono text-sm text-white/50 mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="font-mono text-right">{formatPrice(item.originalTotalPrice.amount, item.originalTotalPrice.currencyCode)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
