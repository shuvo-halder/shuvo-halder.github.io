'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AdminCollection, AdminField } from '../../../lib/admin-config';
import { SERVICE_TIER_HELP } from '../../../lib/admin-config';

type Item = Record<string, unknown> & { _id?: string };

function fieldToString(value: unknown, field: AdminField): string {
  if (value == null) return '';
  if (field.type === 'list') {
    return Array.isArray(value) ? (value as unknown[]).join('\n') : String(value);
  }
  if (field.type === 'checkbox') return '';
  return String(value);
}

export default function AdminCollectionClient({ config }: { config: AdminCollection }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [tiersJson, setTiersJson] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/${config.key}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load.');
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  }, [config.key]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    const blank: Record<string, string | boolean> = {};
    for (const f of config.fields) blank[f.key] = f.type === 'checkbox' ? true : f.type === 'number' ? '0' : '';
    setForm(blank);
    setTiersJson(config.key === 'services' ? '[{"name":"Basic","price":0,"deliveryDays":2,"label":""}]' : '');
    setEditing({} as Item);
    setNotice('');
  }

  function startEdit(item: Item) {
    const next: Record<string, string | boolean> = {};
    for (const f of config.fields) {
      if (f.type === 'checkbox') next[f.key] = item[f.key] !== false;
      else next[f.key] = fieldToString(item[f.key], f);
    }
    setForm(next);
    setTiersJson(
      config.key === 'services' ? JSON.stringify((item.tiers as unknown[]) || [], null, 2) : ''
    );
    setEditing(item);
    setNotice('');
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice('');
    setError('');
    const payload: Record<string, unknown> = {};
    for (const f of config.fields) {
      const v = form[f.key];
      if (f.type === 'number') payload[f.key] = Number(v) || 0;
      else if (f.type === 'checkbox') payload[f.key] = Boolean(v);
      else if (f.type === 'list') payload[f.key] = String(v || '').split('\n');
      else payload[f.key] = v ?? '';
    }
    if (config.key === 'services') {
      try {
        payload.tiers = JSON.parse(tiersJson || '[]');
      } catch {
        setError('Tiers JSON is invalid.');
        setSaving(false);
        return;
      }
    }
    const isNew = !editing?._id;
    const url = isNew ? `/api/admin/${config.key}` : `/api/admin/${config.key}/${editing?._id}`;
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || 'Save failed.');
      setSaving(false);
      return;
    }
    setNotice(isNew ? 'Created.' : 'Saved.');
    setEditing(null);
    setSaving(false);
    load();
  }

  async function remove(item: Item) {
    if (!item._id) return;
    if (!window.confirm(`Delete this ${config.singular}? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/${config.key}/${item._id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Delete failed.');
      return;
    }
    setNotice('Deleted.');
    load();
  }

  function cellValue(item: Item, key: string): string {
    const v = item[key];
    if (v == null) return '—';
    if (Array.isArray(v)) return (v as unknown[]).slice(0, 3).join(', ') + (v.length > 3 ? '…' : '');
    if (typeof v === 'boolean') return v ? 'yes' : 'no';
    const s = String(v);
    return s.length > 60 ? s.slice(0, 60) + '…' : s;
  }

  return (
    <div>
      <p className="section-tag">// admin</p>
      <h1 className="section-title">{config.label}</h1>
      <p className="section-subtitle">
        {items.length} item(s). Changes save to MongoDB and appear on the public site within a
        minute.
      </p>
      <div className="contact-actions" style={{ margin: '1rem 0' }}>
        <button type="button" className="btn btn-primary btn-sm" onClick={startNew}>
          + New {config.singular}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={load}>
          Refresh
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="form-success" role="status">
          {notice}
        </p>
      )}

      {editing && (
        <form onSubmit={save} className="contact-wrapper" style={{ marginBottom: '1.5rem' }}>
          <h2 className="project-title">
            {editing._id ? `Edit ${config.singular}` : `New ${config.singular}`}
          </h2>
          <div className="form-grid">
            {config.fields.map((f) =>
              f.type === 'checkbox' ? (
                <label key={f.key} className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={Boolean(form[f.key])}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                  />
                  {f.label}
                </label>
              ) : (
                <div key={f.key} className={`form-field${f.type === 'textarea' || f.type === 'list' ? ' full' : ''}`}>
                  <label htmlFor={`f-${f.key}`}>{f.label}</label>
                  {f.type === 'textarea' || f.type === 'list' ? (
                    <textarea
                      id={`f-${f.key}`}
                      value={String(form[f.key] ?? '')}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      rows={f.type === 'list' ? 4 : 3}
                    />
                  ) : (
                    <input
                      id={`f-${f.key}`}
                      type={f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                      value={String(form[f.key] ?? '')}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    />
                  )}
                </div>
              )
            )}
            {config.key === 'services' && (
              <div className="form-field full">
                <label htmlFor="f-tiers">Pricing tiers (JSON)</label>
                <textarea
                  id="f-tiers"
                  value={tiersJson}
                  onChange={(e) => setTiersJson(e.target.value)}
                  rows={6}
                />
                <span className="muted small">{SERVICE_TIER_HELP}</span>
              </div>
            )}
          </div>
          <div className="contact-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="project-description">Loading…</p>
      ) : items.length === 0 ? (
        <p className="project-description">
          No items in the database yet. Run <code>npm run seed</code> to fill the database with
          the real content, or create the first item above.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                {config.listColumns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                {config.key === 'messages' && <th>Read</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={String(item._id)}>
                  {config.listColumns.map((col) => (
                    <td key={col}>{cellValue(item, col)}</td>
                  ))}
                  {config.key === 'messages' && <td>{item.read ? 'yes' : 'no'}</td>}
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => startEdit(item)}>
                      Edit
                    </button>{' '}
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
