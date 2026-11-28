import type { Metadata } from 'next';
import Link from 'next/link';
import LogoutButton from '../../components/LogoutButton';
import { ADMIN_COLLECTIONS } from '../../lib/admin-config';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>
          <Link href="/admin">shuvo@infra:~$ admin</Link>
        </h2>
        <nav className="admin-nav" aria-label="Admin sections">
          <Link href="/admin">Dashboard</Link>
          {ADMIN_COLLECTIONS.map((c) => (
            <Link key={c.key} href={`/admin/${c.key}`}>
              {c.label}
            </Link>
          ))}
          <Link href="/" target="_blank" rel="noopener noreferrer">
            View live site ↗
          </Link>
        </nav>
        <div style={{ marginTop: '1.5rem' }}>
          <LogoutButton />
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
