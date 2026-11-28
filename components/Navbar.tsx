'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Group {
  label: string;
  items: { label: string; href: string }[];
}

const GROUPS: Group[] = [
  {
    label: 'about',
    items: [
      { label: 'about', href: '/#about' },
      { label: 'skills', href: '/#skills' },
      { label: 'education', href: '/#education' },
      { label: 'certifications', href: '/#certifications' },
    ],
  },
  {
    label: 'work',
    items: [
      { label: 'experience', href: '/#experience' },
      { label: 'projects', href: '/#projects' },
      { label: 'articles', href: '/#articles' },
    ],
  },
  {
    label: 'hire-me',
    items: [
      { label: 'services', href: '/services' },
      { label: 'contact', href: '/#contact' },
    ],
  },
];

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme');
    if (stored === 'light' || stored === 'dark') setTheme(stored);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container nav-container">
        <Link href="/" className="brand-logo" aria-label="Shuvo Halder Portfolio Home">
          <span className="brand-user">shuvo</span>
          <span>@infra</span>
          <span>:~$</span>
          <span className="brand-cursor" aria-hidden="true" />
        </Link>

        <nav id="nav-menu" className={`nav-menu${menuOpen ? ' open' : ''}`} aria-label="Main Navigation">
          {GROUPS.map((group) => (
            <div
              key={group.label}
              className={`nav-dropdown${openGroup === group.label ? ' open' : ''}`}
            >
              <button
                type="button"
                className="nav-link nav-dropdown-toggle"
                aria-expanded={openGroup === group.label}
                aria-haspopup="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenGroup(openGroup === group.label ? null : group.label);
                }}
              >
                <span>//</span>
                {group.label} <span className="nav-caret" aria-hidden="true">▾</span>
              </button>
              <div className="nav-dropdown-menu">
                {group.items.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="nav-dropdown-item"
                    onClick={() => {
                      setOpenGroup(null);
                      setMenuOpen(false);
                    }}
                  >
                    <span>//</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            aria-label="Switch theme"
            title="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            type="button"
            className={`nav-toggle-btn${menuOpen ? ' open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>
    </header>
  );
}
