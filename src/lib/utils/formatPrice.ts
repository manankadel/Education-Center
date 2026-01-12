// src/lib/utils/formatPrice.ts

export function formatPrice(
  amount: string | number,
  currencyCode: string = 'INR' // Default to INR
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  // Using 'en-IN' locale to get the correct symbol and formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0, // No decimals, e.g., ₹4,000
    maximumFractionDigits: 0, // Ensures no decimals are added
  }).format(numericAmount);
}