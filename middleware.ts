// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware now does nothing and allows all requests to pass through.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// We keep the config to prevent it from running on static files.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}