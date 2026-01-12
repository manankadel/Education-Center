// src/app/(main)/privacy/page.tsx
import { PolicyPageLayout } from '@/components/core/PolicyPageLayout';

export default function PrivacyPage() {
  return (
    <PolicyPageLayout title="Privacy Policy">
      <p>At SWAMBASIC, we are committed to protecting your privacy and safeguarding the personal information you share with us. This policy explains how we collect, use, and protect your data when you visit or make a purchase from our website https://www.swambasic.com/.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping addresses, and payment details.</li>
        <li><strong>Order Details:</strong> Products purchased, order value, and transaction information.</li>
        <li><strong>Non-Personal Information:</strong> IP address, browser type, device information, and browsing activity on our site.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Process, confirm, and deliver your orders.</li>
        <li>Communicate with you regarding purchases, shipping updates, or customer service queries.</li>
        <li>Send promotional offers, updates, and newsletters (only if you opt-in).</li>
        <li>Improve our website, product offerings, and customer experience.</li>
        <li>Comply with applicable legal requirements.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>We respect your privacy and do not sell or rent your personal information. However, we may share your data with:</p>
      <ul>
        <li><strong>Payment Processors</strong> for secure transactions.</li>
        <li><strong>Shipping & Courier Partners</strong> to deliver your orders.</li>
        <li><strong>Marketing Platforms</strong> (only if you opt-in) for sending promotional content.</li>
        <li><strong>Legal Authorities</strong> when required by law or to protect our rights.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We use secure servers, SSL encryption, and regular monitoring to protect your personal information. While we take strong measures to safeguard your data, no online transmission can be guaranteed to be 100% secure.</p>

      <h2>5. Cookies & Tracking Technologies</h2>
      <p>Our website uses cookies and similar technologies to:</p>
      <ul>
        <li>Enhance your browsing experience.</li>
        <li>Remember your preferences and shopping cart contents.</li>
        <li>Analyze website traffic and performance.</li>
      </ul>
      <p>You can disable cookies in your browser settings, but certain site features may not function properly.</p>

      <h2>6. Your Rights</h2>
      <p>As a valued customer, you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request corrections to any inaccurate information.</li>
        <li>Request deletion of your personal data (subject to legal obligations).</li>
        <li>Opt out of promotional communications at any time.</li>
      </ul>
      <p>To exercise these rights, email us at care@swambasic.com.</p>

      <h2>7. Third-Party Links</h2>
      <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites.</p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically to reflect changes in our practices. Any updates will be posted on this page with the revised effective date.</p>
    </PolicyPageLayout>
  );
}