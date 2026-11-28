import { NextRequest, NextResponse } from 'next/server';
import { checkAdminCredentials, setAdminCookie, signAdminToken } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '');
    const password = String(body.password || '');
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    const adminEmail = await checkAdminCredentials(email, password);
    if (!adminEmail) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    const token = await signAdminToken(adminEmail);
    setAdminCookie(token);
    return NextResponse.json({ ok: true, email: adminEmail });
  } catch (err) {
    console.error('admin login failed:', err);
    return NextResponse.json({ error: 'Login failed. Check server configuration.' }, { status: 500 });
  }
}
