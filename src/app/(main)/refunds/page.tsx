// src/app/(main)/refunds/page.tsx
import { PolicyPageLayout } from '@/components/core/PolicyPageLayout';

export default function RefundsPage() {
  return (
    <PolicyPageLayout title="Return & Refund Policy">
      <h2>Return</h2>
      <p>We have a 3-day return policy, which means you have 3 days after receiving your item to request a return.</p>

      <h2>Replacement</h2>
      <p>After inspecting the returned item / damaged items we shall deliver you the replacement within 7-10 business days.</p>
      
      <h2>Refunds</h2>
      <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded and credited on your original payment method within 5 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
    </PolicyPageLayout>
  );
}