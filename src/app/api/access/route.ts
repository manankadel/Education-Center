import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // HARDCODED PASSWORD FOR TMP (The Musicians Planet)
    // Matches the "Backstage Pass" logic
    if (password === '12345677') {
      
      const cookieStore = cookies();
      
      // SET THE COOKIE
      cookieStore.set('tmp_session_v1', 'authorized_user', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 Week access
      });
      
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid Access Code' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}