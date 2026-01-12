// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginCustomer } from '@/lib/shopify';

const CUSTOMER_TOKEN_COOKIE_NAME = 'swambasic_customer_token';

export async function POST(request: Request) {
    console.time("REGISTER_API_TOTAL_TIME");

    try {
        const { firstName, lastName, email, password, phone } = await request.json();

        // VALIDATION: Phone is now mandatory
        if (!firstName || !lastName || !email || !password || !phone) {
            return NextResponse.json({ error: 'All fields including phone number are required.' }, { status: 400 });
        }

        const adminApiToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
        const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
        const adminApiUrl = `https://${storeDomain}/admin/api/2024-07/customers.json`;

        // We send phone at the ROOT level to set it as "Contact Info"
        const customerData = {
            customer: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone, // <--- This populates the "Contact" field in Admin
                password: password,
                password_confirmation: password,
                verified_email: true,
                addresses: [
                    {
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone, // <--- We ALSO add it to their default address
                        default: true
                    }
                ]
            }
        };

        console.time("SHOPIFY_ADMIN_CREATE_CALL");
        const createResponse = await fetch(adminApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': adminApiToken! },
            body: JSON.stringify(customerData),
        });
        console.timeEnd("SHOPIFY_ADMIN_CREATE_CALL");

        const createData = await createResponse.json();

        if (!createResponse.ok) {
            // Detailed error handling for phone number issues (e.g., duplicates)
            const errorMessage = createData.errors 
                ? Object.entries(createData.errors).map(([key, val]) => `${key} ${val}`).join(', ') 
                : 'Failed to create account.';
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }

        console.time("SHOPIFY_STOREFRONT_LOGIN_CALL");
        const loginResult = await loginCustomer({ email, password });
        console.timeEnd("SHOPIFY_STOREFRONT_LOGIN_CALL");

        if (loginResult.customerAccessToken) {
            const { accessToken, expiresAt } = loginResult.customerAccessToken;
            cookies().set(CUSTOMER_TOKEN_COOKIE_NAME, accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
                expires: new Date(expiresAt),
            });
            
            console.timeEnd("REGISTER_API_TOTAL_TIME");
            return NextResponse.json({ success: true }, { status: 201 });
        }

        return NextResponse.json({ error: 'Account created, but failed to log in.' }, { status: 500 });

    } catch (error) {
        console.error('Register API error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}