// Admin authentication (Node runtime): bcrypt credential check + cookies.
// Token signing/verification lives in lib/jwt.ts so middleware.ts (Edge
// runtime) can use it without importing mongoose.
// Credentials live ONLY in env vars / the Admin collection as a bcrypt hash.
// There is no default password and no hardcoded credential anywhere.
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { dbConnect } from './db';
import { AdminModel } from './models';
import { COOKIE_NAME, signAdminToken, verifyAdminToken } from './jwt';

export { COOKIE_NAME, signAdminToken, verifyAdminToken };

export async function getAdminSession(): Promise<{ email: string } | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export function setAdminCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}

/** Verify an admin login. Returns the admin email on success, null otherwise. */
export async function checkAdminCredentials(
  email: string,
  password: string
): Promise<string | null> {
  const normalized = email.trim().toLowerCase();
  await dbConnect();
  const admin = (await AdminModel.findOne({ email: normalized })
    .lean()
    .catch(() => null)) as { email: string; passwordHash: string } | null;
  if (admin) {
    const ok = await bcrypt.compare(password, admin.passwordHash as string);
    return ok ? (admin.email as string) : null;
  }
  // First-login fallback: no admin document yet — check env credentials,
  // then persist the admin (bcrypt-hashed) so later logins use the DB.
  const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const envPass = process.env.ADMIN_PASSWORD || '';
  if (envEmail && normalized === envEmail && envPass && password === envPass) {
    const passwordHash = await bcrypt.hash(password, 12);
    await AdminModel.create({ email: normalized, passwordHash }).catch(() => null);
    return normalized;
  }
  return null;
}
