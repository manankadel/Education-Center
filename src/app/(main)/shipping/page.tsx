// src/app/(main)/shipping/page.tsx
import { PolicyPageLayout } from '@/components/core/PolicyPageLayout';

export default function ShippingPage() {
  return (
    <PolicyPageLayout title="Shipping Policy">
      <h2>Order Processing</h2>
      <p>Once your order is placed, please allow 1–3 business days for processing. This includes order verification, quality checks, careful packaging, and handover to our delivery partners.</p>
      <p>You’ll receive a confirmation email once your order has been successfully processed and dispatched.</p>
      
      <h2>Estimated Delivery Time</h2>
      <p>Our standard delivery timeframe is 3–7 business days, depending on your location. In some cases, delivery may be faster or slightly delayed due to weather, high demand, or courier constraints.</p>
      <p>We coordinate closely with our courier partners to ensure minimal delays and timely updates.</p>
    </PolicyPageLayout>
  );
}