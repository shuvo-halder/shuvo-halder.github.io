/**
 * PORTFOLIO SCRIPTS - SHUVO HALDER
 * Vanilla JavaScript (No dependencies, zero build step)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initTypingEffect();
  initScrollReveal();
  initNavHighlight();
});

/**
 * Theme Management (Dark / Light toggle)
 * Persists user preference to localStorage and respects OS preference.
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const storageKey = 'portfolio-theme';
  const savedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Determine initial theme: localStorage > system preference > default dark
  let currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
  applyTheme(currentTheme);

  // Toggle button handler
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem(storageKey, currentTheme);
  });

  // Listen for OS system theme changes if user hasn't explicitly saved a choice
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem(storageKey)) {
      currentTheme = e.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
    }
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeToggleBtn.setAttribute('title', 'Switch to dark theme');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      themeToggleBtn.setAttribute('title', 'Switch to light theme');
    }
  }
}

/**
 * Mobile Navigation Drawer & Hamburger Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(event.target) && 
        !toggleBtn.contains(event.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/**
 * Role Typing Effect in Hero
 * Types out technical roles sequentially; respects prefers-reduced-motion.
 */
function initTypingEffect() {
  const typedTarget = document.getElementById('role-typed');
  if (!typedTarget) return;

  const roles = [
    'System & Cloud Infrastructure Engineer',
    'DevOps Engineer',
    'OpenStack & Kubernetes Specialist'
  ];

  // Disable dynamic typing if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    typedTarget.textContent = 'System & Cloud Infrastructure Engineer';
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(typeStep, typingSpeed);
  }

  // Start typing after initial delay
  setTimeout(typeStep, 600);
}

/**
 * Scroll Reveal Animations via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Active Navigation Link Highlighter based on scroll position
 */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-70px 0px -50% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}
