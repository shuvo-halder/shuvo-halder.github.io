// Protects the admin panel and the admin API.
// /admin/login and /api/admin/login are public; everything else under
// /admin/* and /api/admin/* requires a valid admin JWT cookie.
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, COOKIE_NAME } from './lib/jwt';

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith('/api/admin');
  const isLogin = pathname === '/admin/login' || pathname === '/api/admin/login';
  if (isLogin) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyAdminToken(token) : null;
  if (!session) {
    if (isApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
