// Scroll reveal — a direct port of initScrollReveal() from the static site's
// assets/js/main.js. Elements with .reveal-item start hidden (gated on the
// `js` class on <html>) and get .is-visible when ~15% visible, once.
// Grid children get a 70ms stagger (capped at 500ms), exactly like main.js.
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const STAGGER = [
  { container: '.skills-grid', items: '.skill-category-card' },
  { container: '.skill-badges', items: '.skill-badge' },
  { container: '#public-projects-grid', items: '.project-card' },
  { container: '#private-projects-grid', items: '.project-card' },
  { container: '#articles-grid', items: '.article-card' },
  { container: '.cert-grid', items: '.cert-card' },
  { container: '.education-grid', items: '.education-card' },
  { container: '.quick-facts-grid', items: '.fact-card' },
  { container: '.secondary-skills-row', items: '.skill-badge' },
];

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const all = document.querySelectorAll('.reveal-item');
    if (!all.length) return;

    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window);
    if (reduced) {
      all.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    STAGGER.forEach(({ container, items }) => {
      document.querySelectorAll(container).forEach((parent) => {
        parent.querySelectorAll(items).forEach((child, index) => {
          (child as HTMLElement).style.transitionDelay = `${Math.min(index * 70, 500)}ms`;
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' },
    );
    all.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
