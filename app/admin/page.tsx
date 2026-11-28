import Link from 'next/link';
import { dbConnect } from '../../lib/db';
import { ADMIN_COLLECTIONS } from '../../lib/admin-config';
import { COLLECTIONS } from '../../lib/models';
import { getAdminSession } from '../../lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const counts: Record<string, number> = {};
  let dbOk = false;
  try {
    const conn = await dbConnect();
    dbOk = Boolean(conn);
    if (conn) {
      for (const c of ADMIN_COLLECTIONS) {
        counts[c.key] = await COLLECTIONS[c.key].countDocuments().catch(() => 0);
      }
    }
  } catch {
    dbOk = false;
  }
  const unread = counts.messages ?? 0;

  return (
    <div>
      <p className="section-tag">// admin</p>
      <h1 className="section-title">Dashboard</h1>
      <p className="section-subtitle">
        Signed in as {session.email}. Database: {dbOk ? 'connected' : 'not connected — showing seed fallback on the public site'}.
      </p>

      <div className="admin-cards">
        {ADMIN_COLLECTIONS.filter((c) => c.key !== 'profile').map((c) => (
          <Link key={c.key} href={`/admin/${c.key}`} style={{ color: 'inherit' }}>
            <div className="admin-stat">
              <b>{counts[c.key] ?? '—'}</b>
              <span>{c.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="contact-wrapper">
        <h2 className="project-title">Inbox</h2>
        <p className="project-description">
          {unread > 0
            ? `${unread} contact message(s) stored.`
            : 'No contact messages yet.'}{' '}
          <Link href="/admin/messages">Open inbox →</Link>
        </p>
        <h2 className="project-title" style={{ marginTop: '1.25rem' }}>
          Quick links
        </h2>
        <p className="project-description">
          <Link href="/admin/services">Edit services &amp; prices →</Link>
          <br />
          <Link href="/admin/profile">Edit profile &amp; about →</Link>
          <br />
          <Link href="/" target="_blank" rel="noopener noreferrer">
            View live site ↗
          </Link>
        </p>
      </div>
    </div>
  );
}
