// Scroll chrome — a direct port of initScrollEffects() + initBackToTop() from
// the static site's assets/js/main.js: the top 3px cyan scroll-progress bar,
// the floating back-to-top button (visible past 600px), and the experience
// timeline line drawing (--timeline-progress). rAF-throttled, passive.
'use client';

import { useEffect } from 'react';

export default function ScrollChrome() {
  useEffect(() => {
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const timeline = document.querySelector('.timeline');
    let ticking = false;

    function update() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (progressBar) {
        const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
        progressBar.style.transform = `scaleX(${progress})`;
        progressBar.style.opacity = scrollY > 6 ? '1' : '0';
      }

      if (backToTopBtn) {
        backToTopBtn.classList.toggle('is-visible', scrollY > 600);
      }

      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.65;
        const totalHeight = rect.height;
        if (totalHeight > 0) {
          const progress = Math.min(Math.max((triggerPoint - rect.top) / totalHeight, 0), 1);
          (timeline as HTMLElement).style.setProperty('--timeline-progress', progress.toFixed(3));
        }
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    const onBackToTop = (e: Event) => {
      e.preventDefault();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
      (backToTopBtn as HTMLButtonElement | null)?.blur();
    };
    backToTopBtn?.addEventListener('click', onBackToTop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      backToTopBtn?.removeEventListener('click', onBackToTop);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />
      <button
        id="back-to-top"
        className="back-to-top"
        type="button"
        aria-label="Scroll back to top"
        title="Scroll back to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
