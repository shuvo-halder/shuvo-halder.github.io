import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../../lib/db';
import { COLLECTIONS } from '../../../../../lib/models';
import { getCollection } from '../../../../../lib/admin-config';

function serialize(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return { ...rest, _id: _id ? String(_id) : undefined };
}

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

type Ctx = { params: { collection: string; id: string } };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const model = COLLECTIONS[params.collection];
  if (!model) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  const doc = await model.findById(params.id).lean();
  if (!doc) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json(serialize(doc as Record<string, unknown>));
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const model = COLLECTIONS[params.collection];
  if (!model) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const data = sanitize(params.collection, body as Record<string, unknown>);
  if (!data) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  try {
    const updated = await model.findByIdAndUpdate(params.id, data, { new: true, runValidators: true }).lean();
    if (!updated) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    return NextResponse.json(serialize(updated as Record<string, unknown>));
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const model = COLLECTIONS[params.collection];
  if (!model) return NextResponse.json({ error: 'Unknown collection.' }, { status: 404 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  const deleted = await model.findByIdAndDelete(params.id).lean();
  if (!deleted) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
