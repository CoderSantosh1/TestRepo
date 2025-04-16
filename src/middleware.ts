import { NextResponse } from 'next/server';

export async function middleware() {
  // Allow all requests to proceed without authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};