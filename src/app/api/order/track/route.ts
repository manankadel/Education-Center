// src/app/api/order/track/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { orderName, email } = await request.json();

  if (!orderName || !email) {
    return NextResponse.json({ error: 'Order Number and Email are required.' }, { status: 400 });
  }

  const adminApiToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  if (!adminApiToken || !storeDomain) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // 1. Search for order using the Admin API
    const response = await fetch(`https://${storeDomain}/admin/api/2024-07/orders.json?name=${orderName}&status=any`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminApiToken,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch order.');

    const data = await response.json();
    const orders = data.orders;

    // 2. Validate Email matches (Security check)
    const matchingOrder = orders.find((o: any) => 
        o.email.toLowerCase() === email.toLowerCase() || 
        o.customer?.email.toLowerCase() === email.toLowerCase()
    );

    if (matchingOrder) {
      // Return safe public details
      return NextResponse.json({
        success: true,
        order: {
            id: matchingOrder.id,
            name: matchingOrder.name,
            status: matchingOrder.fulfillment_status || 'unfulfilled',
            financial: matchingOrder.financial_status,
            total: matchingOrder.total_price,
            currency: matchingOrder.currency,
            items: matchingOrder.line_items.map((item: any) => ({
                title: item.title,
                quantity: item.quantity
            }))
        }
      });
    } else {
      return NextResponse.json({ error: 'Order not found or email does not match.' }, { status: 404 });
    }

  } catch (error) {
    console.error('Track Order API Error:', error);
    return NextResponse.json({ error: 'System error. Please try again.' }, { status: 500 });
  }
}