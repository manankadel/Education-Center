// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const adminApiToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  
  if (!adminApiToken || !storeDomain) {
      console.error("Missing Shopify Admin API credentials in .env file.");
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const adminApiBaseUrl = `https://${storeDomain}/admin/api/2024-07`;
  const adminApiHeaders = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': adminApiToken!,
  };

  try {
    // 1. Search for an existing customer with the provided email
    const searchUrl = `${adminApiBaseUrl}/customers/search.json?query=email:${encodeURIComponent(email)}`;
    const searchResponse = await fetch(searchUrl, { method: 'GET', headers: adminApiHeaders });

    if (!searchResponse.ok) {
        throw new Error('Failed to search for customer.');
    }
    const searchData = await searchResponse.json();
    const existingCustomer = searchData.customers?.[0];

    const noteContent = `Contact Form Submission:\n------------------------\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n------------------------\n\n`;

    if (existingCustomer) {
      // 2a. If customer exists, UPDATE them by appending the new message to their notes
      const updatedNote = `${noteContent}${existingCustomer.note || ''}`;
      const updateUrl = `${adminApiBaseUrl}/customers/${existingCustomer.id}.json`;
      const updatePayload = {
        customer: { id: existingCustomer.id, note: updatedNote },
      };
      
      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: adminApiHeaders,
        body: JSON.stringify(updatePayload),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update existing customer.');
      }

    } else {
      // 2b. If customer does NOT exist, CREATE a new one
      const createUrl = `${adminApiBaseUrl}/customers.json`;
      const createPayload = {
        customer: {
          first_name: name.split(' ')[0],
          last_name: name.split(' ').slice(1).join(' ') || name.split(' ')[0],
          email: email,
          verified_email: false,
          note: noteContent,
          tags: "contact-form-inquiry",
        }
      };
      
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: adminApiHeaders,
        body: JSON.stringify(createPayload),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        console.error('Shopify Create API Error:', errorData);
        throw new Error('Failed to create new customer.');
      }
    }

    // 3. If either path succeeds, return a success message
    return NextResponse.json({ success: true, message: "Message received. We'll be in touch." }, { status: 201 });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to submit message.' }, { status: 500 });
  }
}
