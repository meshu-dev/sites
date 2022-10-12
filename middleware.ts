import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

  console.log(
    'MIDDLEWARE',
    req.cookies,
    req.cookies.get('authToken'),
    req.nextUrl.pathname
  );

  const token = req.cookies.get('authToken');
  let redirectUrl = '';

  if (req.nextUrl.pathname === '/' && !token) {
    redirectUrl = '/login';
  } else if (req.nextUrl.pathname === '/login' && token) {
    redirectUrl = '/';
  }

  if (redirectUrl) {
    req.nextUrl.pathname = redirectUrl;
    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
}

/*
export const config = {
  matcher: ['/', '/login'],
}; */
