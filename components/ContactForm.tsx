'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      subject: String(form.get('subject') || ''),
      message: String(form.get('message') || ''),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      (e.target as HTMLFormElement).reset();
      setStatus('ok');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" required minLength={2} maxLength={100} placeholder="Your name" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required maxLength={150} placeholder="you@example.com" />
        </div>
        <div className="form-field full">
          <label htmlFor="cf-subject">Subject</label>
          <input id="cf-subject" name="subject" required minLength={2} maxLength={200} placeholder="Project, server setup, private cloud…" />
        </div>
        <div className="form-field full">
          <label htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" required minLength={10} maxLength={5000} placeholder="Tell me about your infrastructure needs…" />
        </div>
      </div>
      <div className="contact-actions">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message →'}
        </button>
      </div>
      {status === 'ok' && (
        <p className="form-success" role="status">
          Thank you — your message was received. I will get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
