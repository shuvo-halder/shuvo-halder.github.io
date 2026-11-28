// Navigation — ported from the static site (assets/js/main.js: initTheme,
// initMobileNav, initNavDropdowns, initNavHighlight) and index.html.
// Theme: localStorage key 'portfolio-theme', OS prefers-color-scheme fallback
// when unset, OS-change listener; dark = no data-theme attribute on <html>.
// Active section highlight: IntersectionObserver, rootMargin '-70px 0px -55%
// 0px'; the parent dropdown toggle gets .active too. Dropdowns close on
// Escape / outside click; only one dropdown open at a time.
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

const STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme: 'dark' | 'light', toggleBtn: HTMLButtonElement | null) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn?.setAttribute('aria-label', 'Switch to dark theme');
    toggleBtn?.setAttribute('title', 'Switch to dark theme');
  } else {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn?.setAttribute('aria-label', 'Switch to light theme');
    toggleBtn?.setAttribute('title', 'Switch to light theme');
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0a0e17');
}

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const toggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement | null;
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const initial = saved === 'light' || saved === 'dark' ? saved : prefersDark.matches ? 'dark' : 'light';
    setTheme(initial);
    applyTheme(initial, toggleBtn);

    const onOsChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const next = e.matches ? 'dark' : 'light';
        setTheme(next);
        applyTheme(next, toggleBtn);
      }
    };
    prefersDark.addEventListener('change', onOsChange);

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      prefersDark.removeEventListener('change', onOsChange);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Close open dropdown on Escape / outside click (main.js initNavDropdowns).
  useEffect(() => {
    if (!openGroup) return;
    const onDocClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.nav-dropdown')) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openGroup]);

  // Active-section nav highlight (main.js initNavHighlight).
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll(
      '.nav-link[href^="#"], .nav-dropdown-item[href*="#"]',
    );
    if (!sections.length || !navLinks.length) return;

    function setActive(id: string) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href === `#${id}` || href.endsWith(`#${id}`));
      });
      document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) {
          toggle.classList.toggle('active', !!dropdown.querySelector('.nav-dropdown-item.active'));
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
        if (atBottom) {
          setActive('contact');
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.15, rootMargin: '-70px 0px -55% 0px' },
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next, document.getElementById('theme-toggle') as HTMLButtonElement | null);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="container nav-container">
          <Link href="/" className="brand-logo" aria-label="Shuvo Halder Portfolio Home">
            <span className="brand-terminal">
              <span className="brand-user">shuvo</span>
              <span className="brand-host">@infra</span>
              <span className="brand-path">:~$</span>
              <span className="brand-cursor" aria-hidden="true" />
            </span>
          </Link>

          <nav
            id="nav-menu"
            className={`nav-menu${menuOpen ? ' open' : ''}`}
            role="navigation"
            aria-label="Main Navigation"
          >
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
                      id={item.label === 'articles' ? 'nav-link-articles' : undefined}
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
              id="theme-toggle"
              type="button"
              className="theme-toggle-btn"
              aria-label="Switch theme"
              title="Toggle theme"
              onClick={toggleTheme}
            >
              <svg
                className="theme-icon-sun"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  strokeLinecap="round"
                  d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
              <svg
                className="theme-icon-moon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button
              id="nav-toggle"
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
