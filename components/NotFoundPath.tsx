// Shows the requested path in the 404 terminal — a direct port of
// init404Path() from the static site's main.js: the real pathname,
// truncated to 45 chars when very long.
'use client';

import { usePathname } from 'next/navigation';

export default function NotFoundPath() {
  const pathname = usePathname() || '/requested-page';
  const display = pathname.length > 45 ? pathname.substring(0, 42) + '...' : pathname;
  return <span className="error-path">{display}</span>;
}
