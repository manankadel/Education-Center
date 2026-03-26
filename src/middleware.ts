// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'tmp_session_v1';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. IGNORE PUBLIC ASSETS & ATLAS ROUTE
    if (
        pathname.startsWith('/_next') || 
        pathname.startsWith('/api') || 
        pathname.startsWith('/static') || 
        pathname.startsWith('/atlas') || // <--- ADDED THIS TO BYPASS THE GATE FOR THE MAP
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // 2. CHECK IF USER IS AUTHENTICATED
    const hasSession = request.cookies.has(SESSION_COOKIE);

    // 3. LOGIC FOR THE GATEWAY PAGE ('/')
    if (pathname === '/') {
        if (hasSession) {
            return NextResponse.redirect(new URL('/home', request.url));
        }
        return NextResponse.next();
    }

    // 4. LOGIC FOR PROTECTED PAGES
    if (!hasSession) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}