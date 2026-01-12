// src/app/(main)/terms/page.tsx
import { PolicyPageLayout } from '@/components/core/PolicyPageLayout';

export default function TermsPage() {
  return (
    <PolicyPageLayout title="Terms & Conditions">
      <p>Welcome to SWAMBASIC. By accessing or purchasing from our website https://www.swambasic.com/, you agree to comply with the following Terms & Conditions. Please read them carefully before using our services.</p>

      <h2>1. General</h2>
      <ul>
        <li>These terms apply to all visitors, users, and customers of SWAMBASIC.</li>
        <li>We reserve the right to modify these Terms & Conditions at any time without prior notice. Updated terms will be effective immediately upon posting.</li>
      </ul>

      <h2>2. Products & Descriptions</h2>
      <ul>
        <li>We strive to display product images and descriptions as accurately as possible. However, colours, sizes, or designs may vary slightly due to lighting, screen settings, or handcrafted nature.</li>
        <li>All products are subject to availability.</li>
      </ul>

      <h2>3. Pricing & Payment</h2>
      <ul>
        <li>Prices are listed in Indian Rupees (INR) and include applicable taxes.</li>
        <li>SWAMBASIC reserves the right to change prices at any time without prior notice.</li>
        <li>Payment must be made in full before dispatch. We accept major credit/debit cards, UPI, net banking, and wallet payments.</li>
      </ul>

      <h2>4. Orders & Acceptance</h2>
      <ul>
        <li>Once an order is placed, you will receive an order confirmation email. This does not guarantee acceptance.</li>
        <li>We reserve the right to cancel or refuse any order due to product unavailability, payment issues, or suspected fraudulent activity.</li>
      </ul>

      <h2>5. Shipping & Delivery</h2>
      <ul>
        <li>Standard delivery within India takes 3–7 business days, depending on location.</li>
        <li>Delivery timelines may vary due to courier delays, strikes, or unforeseen circumstances.</li>
        <li>SWAMBASIC is not responsible for delays caused by third-party courier services.</li>
      </ul>

      <h2>6. Returns, Exchanges & Refunds</h2>
      <ul>
        <li>Returns or exchanges are accepted only for damaged, defective, or incorrect products.</li>
        <li>Requests must be raised within 3 days of delivery with proof of purchase and clear product images.</li>
        <li>For hygiene reasons, used or worn accessories cannot be returned unless defective.</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <ul>
        <li>All designs, images, text, and content on the SWAMBASIC website are the property of SWAMBASIC and protected by copyright and trademark laws.</li>
        <li>You may not copy, reproduce, or use any content without prior written permission.</li>
      </ul>

      <h2>8. Limitation of Liability</h2>
      <p>SWAMBASIC will not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
    </PolicyPageLayout>
  );
}