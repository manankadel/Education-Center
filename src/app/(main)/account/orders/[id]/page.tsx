// src/app/(main)/account/orders/[id]/page.tsx

import { getOrderDetails } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import OrderDetails from '@/components/modules/account/OrderDetails';
import { ShopifyOrderDetailed } from '@/types/shopify';

// This is a Server Component to fetch the data
const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  // The ID from the URL is encoded, so we decode it.
  const orderId = decodeURIComponent(params.id);

  if (!orderId) {
    notFound();
  }

  const order: ShopifyOrderDetailed | null = await getOrderDetails(orderId);

  if (!order) {
    return <div className="text-white/50">Order not found.</div>;
  }

  return <OrderDetails order={order} />;
};

export default OrderDetailsPage;
