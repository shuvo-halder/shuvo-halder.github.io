'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || 'Login failed.');
      setBusy(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="login-card">
      <p className="section-tag">// admin</p>
      <h1 className="section-title">Admin Login</h1>
      <p className="section-subtitle">
        Sign in with the admin account created by <code>npm run seed</code> (ADMIN_EMAIL /
        ADMIN_PASSWORD).
      </p>
      <form onSubmit={onSubmit} style={{ marginTop: '1.25rem' }}>
        <div className="form-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="form-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy} style={{ marginTop: '0.5rem' }}>
          {busy ? 'Signing in…' : 'Sign in →'}
        </button>
      </form>
    </div>
  );
}
