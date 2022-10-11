import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const userData = req.cookies.get('user');

  if (req.nextUrl.pathname === '/' && !userData) {
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};