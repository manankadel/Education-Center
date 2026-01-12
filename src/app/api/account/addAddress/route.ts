// src/app/api/account/addAddress/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createCustomerAddress } from '@/lib/shopify';
import { NewAddressInput } from '@/types/shopify';

export async function POST(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get('swambasic_customer_token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Not authenticated. Please log in.' }, { status: 401 });
    }

    try {
        const addressData: NewAddressInput = await request.json();

        // VALIDATION: Reject if phone is missing
        if (!addressData.address1 || !addressData.city || !addressData.country || !addressData.zip || !addressData.province || !addressData.phone) {
            return NextResponse.json({ error: 'Address, City, Country, Zip, and Phone Number are required.' }, { status: 400 });
        }

        const result = await createCustomerAddress(token, addressData);

        if (result.customerUserErrors && result.customerUserErrors.length > 0) {
            return NextResponse.json({ error: result.customerUserErrors[0].message }, { status: 400 });
        }

        return NextResponse.json({ success: true, address: result.customerAddress }, { status: 200 });

    } catch (error) {
        console.error('Add Address API Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}