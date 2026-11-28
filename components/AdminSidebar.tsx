// Admin sidebar — hidden on the login page so no admin navigation is
// visible before login. The middleware already blocks the data (401 /
// redirect), but the sidebar itself must not render for logged-out visitors.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import { ADMIN_COLLECTIONS } from '../lib/admin-config';

export default function AdminSidebar() {
  const pathname = usePathname();
  if (pathname === '/admin/login') return null;

  return (
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
  );
}
