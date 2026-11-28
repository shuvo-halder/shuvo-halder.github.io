// MongoDB connection, cached across serverless invocations.
// Without a MONGODB_URI the app runs on the seed fallback data
// (see lib/content.ts) — the public site still renders.
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global._mongoose || { conn: null, promise: null };
if (!global._mongoose) global._mongoose = cached;

export async function dbConnect(): Promise<typeof mongoose | null> {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) return null;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
      maxPoolSize: 5,
    });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error('MongoDB connection failed, using seed fallback:', (err as Error).message);
    return null;
  }
}

export function hasDb(): boolean {
  return Boolean(MONGODB_URI);
}
