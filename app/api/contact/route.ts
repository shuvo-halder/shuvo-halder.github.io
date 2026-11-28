import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import { MessageModel } from '../../../lib/models';

// Public contact form: saves a Message to MongoDB (or returns a clear
// error when the database is not configured, so the form never lies).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (subject.length < 2 || subject.length > 200) {
      return NextResponse.json({ error: 'Please enter a subject.' }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    const conn = await dbConnect();
    if (!conn) {
      return NextResponse.json(
        { error: 'Message service is not configured yet (database missing). Please email directly.' },
        { status: 503 }
      );
    }
    const saved = await MessageModel.create({ name, email, subject, message });
    return NextResponse.json({ ok: true, id: String(saved._id) }, { status: 201 });
  } catch (err) {
    console.error('contact POST failed:', err);
    return NextResponse.json({ error: 'Could not send message. Please try again later.' }, { status: 500 });
  }
}
