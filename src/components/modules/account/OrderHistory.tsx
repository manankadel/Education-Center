"use client";

import { ShopifyOrder } from "@/types/shopify";
import { format } from 'date-fns';
import { formatPrice } from '@/lib/utils/formatPrice';
import Link from "next/link"; // Import Link

interface OrderHistoryProps {
  orders: ShopifyOrder[];
}

const OrderCard = ({ order }: { order: ShopifyOrder }) => {
  // FIX: The entire card is now a link to the order details page.
  // We encode the full Shopify Order ID in the URL.
  return (
    <Link href={`/account/orders/${encodeURIComponent(order.id)}`} className="block">
      <div className="p-6 border border-white/10 rounded-lg flex justify-between items-center transition-colors hover:bg-white/5">
        <div className="flex flex-col">
          <span className="font-display font-bold text-lg">#{order.orderNumber}</span>
          <span className="font-sans text-xs text-white/50 mt-1">
            {format(new Date(order.processedAt), 'MMMM dd, yyyy')}
          </span>
        </div>
        <div className="text-right">
          <span className={`font-sans text-xs uppercase tracking-widest px-2 py-1 rounded ${
            order.financialStatus === 'PAID' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
          }`}>
            {order.financialStatus}
          </span>
        <p className="font-mono text-lg mt-2">{formatPrice(order.totalPriceV2.amount, order.totalPriceV2.currencyCode)}</p>
        </div>
      </div>
    </Link>
  );
};

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="font-sans text-white/50">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderHistory;
