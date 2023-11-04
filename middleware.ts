import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const hasSession = req.cookies.get('next-auth.session-token') ? true : false

  if (hasSession) {
    return NextResponse.next()
  }
  return NextResponse.redirect(String(process.env.NEXTAUTH_URL))
}

export const config = {
  // Below urls are excluded from middleware check
  matcher: [
    '/((?!api/auth|favicon.ico).*)'
  ]
}
