import { NextResponse } from 'next/server';
import { getContent } from '../../../lib/content';

// Public read-only API: the whole published site content as JSON.
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
