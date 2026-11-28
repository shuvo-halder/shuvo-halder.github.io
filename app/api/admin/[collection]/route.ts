import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/db';
import { COLLECTIONS } from '../../../../lib/models';
import { getCollection } from '../../../../lib/admin-config';

// Generic admin CRUD for every collection (protected by middleware.ts).
// Request bodies are allow-listed against lib/admin-config.ts — unknown
// fields are dropped. List fields accept arrays or newline-separated text.

function sanitize(collection: string, body: Record<string, unknown>) {
  const config = getCollection(collection);
  if (!config) return null;
  const out: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (!(field.key in body)) continue;
    const value = body[field.key];
    if (field.type === 'number') {
      const n = Number(value);
      if (!Number.isNaN(n)) out[field.key] = n;
    } else if (field.type === 'checkbox') {
      out[field.key] = value === true || value === 'true' || value === 'on';
    } else if (field.type === 'list') {
      out[field.key] = Array.isArray(value)
        ? value.map(String).map((s) => s.trim()).filter(Boolean)
        : String(value || '')
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
    } else {
      out[field.key] = typeof value === 'string' ? value : String(value ?? '');
    }
  }
  // Service pricing tiers are stored as structured JSON, not in the field list.
  if (collection === 'services' && 'tiers' in body) {
    const tiers = body.tiers;
    if (Array.isArray(tiers)) {
      out.tiers = tiers
        .filter((t) => t && typeof t === 'object')
        .map((t) => {
          const o = t as Record<string, unknown>;
          return {
            name: String(o.name || ''),
            price: Number(o.price) || 0,
            deliveryDays: Number(o.deliveryDays) || 0,
            label: String(o.label || ''),
          };
        });
    } else if (typeof tiers === 'string') {
      try {
        out.tiers = JSON.parse(tiers);
      } catch {
        /* invalid JSON is ignored */
      }
    }
  }
  return out;
}

function serialize(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return { ...rest, _id: _id ? String(_id) : undefined };
}

export async function GET(_req: NextRequest, { params }: { params: { collection: string } }) {
  const model = COLLECTIONS[params.collection];
  if (!model) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  const docs = await model.find().sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json(docs.map((d) => serialize(d as Record<string, unknown>)));
}

export async function POST(req: NextRequest, { params }: { params: { collection: string } }) {
  const model = COLLECTIONS[params.collection];
  if (!model) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const data = sanitize(params.collection, body as Record<string, unknown>);
  if (!data) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  try {
    const created = await model.create(data);
    return NextResponse.json(serialize(created.toObject() as Record<string, unknown>), { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
