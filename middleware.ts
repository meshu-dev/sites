import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(req: NextRequest) {
  //const { device } = userAgent(req);
  /*
  console.log('REQ', process.browser);

  if (process.browser) {
    const isLoggedIn = false; //Boolean(localStorage.getItem('isLoggedIn'));
    let redirectUrl = '';
  
    console.log('isLoggedIn', isLoggedIn);

    if (
      req.nextUrl.pathname === '/' &&
      isLoggedIn === false
    ) {
      redirectUrl = '/login';
    } else if (
      req.nextUrl.pathname === '/login' &&
      isLoggedIn === true
    ) {
      redirectUrl = '/';
    }
  
    if (redirectUrl) {
      req.nextUrl.pathname = redirectUrl;
      return NextResponse.redirect(req.nextUrl);
    }
  } */

  console.log('Middleware');

  return NextResponse.next();
}
