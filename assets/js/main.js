/**
 * PORTFOLIO SCRIPTS - SHUVO HALDER
 * Vanilla JavaScript (No dependencies, zero build step)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initTypingEffect();
  initHeroTerminal();
  initScrollReveal();
  initNavHighlight();
  initPrivateProjectsToggle();
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
 * Hero Terminal CLI Typer
 * Simulates a sequential terminal command execution with output.
 * Uses direct element references so each command and output appends cleanly.
 * Respects prefers-reduced-motion by rendering full static output immediately.
 */
function initHeroTerminal() {
  const container = document.getElementById('terminal-content');
  if (!container) return;

  const sequence = [
    { cmd: 'whoami', output: 'Shuvo Halder' },
    { cmd: 'cat role.txt', output: 'System &amp; Cloud Infrastructure Engineer' },
    { cmd: 'ls skills/', output: '<span class="term-tag">openstack</span> <span class="term-tag">proxmox</span> <span class="term-tag">ceph</span> <span class="term-tag">kubernetes</span> <span class="term-tag">linux</span> <span class="term-tag">networking</span>' },
    { cmd: 'uptime', output: 'Building reliable infrastructure since 2022' }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    let fullHtml = '';
    sequence.forEach(item => {
      fullHtml += `<div class="term-line"><span class="term-prompt">$</span> <span class="term-input">${item.cmd}</span></div>`;
      fullHtml += `<div class="term-output">${item.output}</div>`;
    });
    fullHtml += `<div class="term-line"><span class="term-prompt">$</span> <span class="terminal-cursor-block"></span></div>`;
    container.innerHTML = fullHtml;
    return;
  }

  container.innerHTML = '';
  let step = 0;

  function runNextCommand() {
    if (step >= sequence.length) {
      // Final idle prompt with blinking block cursor
      const finalPrompt = document.createElement('div');
      finalPrompt.className = 'term-line';
      finalPrompt.innerHTML = `<span class="term-prompt">$</span> <span class="terminal-cursor-block"></span>`;
      container.appendChild(finalPrompt);
      return;
    }

    const currentItem = sequence[step];
    const lineEl = document.createElement('div');
    lineEl.className = 'term-line';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'term-prompt';
    promptSpan.textContent = '$';

    const inputSpan = document.createElement('span');
    inputSpan.className = 'term-input';

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'terminal-cursor-block';

    lineEl.appendChild(promptSpan);
    lineEl.appendChild(document.createTextNode(' '));
    lineEl.appendChild(inputSpan);
    lineEl.appendChild(cursorSpan);
    container.appendChild(lineEl);

    let charIdx = 0;
    function typeChar() {
      if (charIdx < currentItem.cmd.length) {
        inputSpan.textContent += currentItem.cmd[charIdx];
        charIdx++;
        setTimeout(typeChar, 35 + Math.random() * 20);
      } else {
        // Finished typing command: remove cursor from active line and append output
        setTimeout(() => {
          cursorSpan.remove();

          const outputDiv = document.createElement('div');
          outputDiv.className = 'term-output';
          outputDiv.innerHTML = currentItem.output;
          container.appendChild(outputDiv);

          step++;
          setTimeout(runNextCommand, 240);
        }, 180);
      }
    }

    typeChar();
  }

  // Initial delay before typing begins
  setTimeout(runNextCommand, 400);
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

/**
 * Private Projects Mobile Collapse Toggle
 * Collapses the private projects grid on mobile screens (<= 768px) to keep the section scannable.
 * Supports accessible button interaction (aria-expanded, aria-controls) and handles viewport resizing.
 */
function initPrivateProjectsToggle() {
  const toggleBtn = document.getElementById('toggle-private-projects');
  const privateGrid = document.getElementById('private-projects-grid');
  if (!toggleBtn || !privateGrid) return;

  function updateCollapseState() {
    if (window.innerWidth <= 768) {
      if (!toggleBtn.dataset.userInteracted) {
        privateGrid.classList.add('is-collapsed');
        toggleBtn.setAttribute('aria-expanded', 'false');
        const textEl = toggleBtn.querySelector('.toggle-text');
        if (textEl) textEl.textContent = 'Show Production & Private Systems (5)';
        const iconEl = toggleBtn.querySelector('.toggle-icon');
        if (iconEl) iconEl.style.transform = 'rotate(0deg)';
      }
    } else {
      privateGrid.classList.remove('is-collapsed');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  // Set initial state
  updateCollapseState();

  // Handle window resizing
  window.addEventListener('resize', updateCollapseState);

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    toggleBtn.dataset.userInteracted = 'true';
    const isCollapsed = privateGrid.classList.toggle('is-collapsed');
    toggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
    const textEl = toggleBtn.querySelector('.toggle-text');
    if (textEl) {
      textEl.textContent = isCollapsed 
        ? 'Show Production & Private Systems (5)' 
        : 'Hide Production & Private Systems';
    }
    const iconEl = toggleBtn.querySelector('.toggle-icon');
    if (iconEl) {
      iconEl.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
}

