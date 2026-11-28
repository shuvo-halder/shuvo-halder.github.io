// Edge-safe JWT helpers (jose only — no mongoose, no bcrypt, no Node APIs).
// Used by middleware.ts (Edge runtime) and by lib/auth.ts (Node runtime).
import { jwtVerify, SignJWT } from 'jose';

export const COOKIE_NAME = 'admin_token';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || '';
  if (secret.length < 32) {
    throw new Error('JWT_SECRET env var is missing or too short (min 32 chars).');
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(email: string): Promise<string> {
  return new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.email !== 'string') return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
