/**
 * PORTFOLIO SCRIPTS - SHUVO HALDER
 * Vanilla JavaScript (No dependencies, zero build step)
 */

/**
 * Global Configuration
 */
const DEVTO_CONFIG = {
  username: 'shuvo_h',
  count: 6,
  apiTimeoutMs: 5000,
  cacheTtlMs: 30 * 60 * 1000 // 30 minutes
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initTypingEffect();
  initHeroTerminal();
  initScrollReveal();
  initNavHighlight();
  initScrollEffects();
  initBackToTop();
  initFooterYear();
  init404Path();
  initPrivateProjectsToggle();
  initArticles();
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
    { cmd: 'ls skills/', output: '<span class="term-tag">openstack</span> <span class="term-tag">proxmox</span> <span class="term-tag">ceph</span> <span class="term-tag">kubernetes</span> <span class="term-tag">linux</span> <span class="term-tag">networking</span>' }
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
 * Reveals headings, cards, and text blocks (opacity 0 -> 1, translateY 24px -> 0) over 600ms ease-out.
 * Triggers when about 15% of the element is visible, and plays only once.
 * Staggers grids (skills badges, project cards, cert cards, education items) by 70ms (capped at 500ms).
 */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const allRevealElements = document.querySelectorAll('.reveal-item');
  if (!allRevealElements.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    allRevealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Configure staggered delays for grid items (70ms each, capped at 500ms)
  const staggerSelectors = [
    { container: '.skills-grid', items: '.skill-category-card' },
    { container: '.skill-badges', items: '.skill-badge' },
    { container: '#public-projects-grid', items: '.project-card' },
    { container: '#private-projects-grid', items: '.project-card' },
    { container: '#articles-grid', items: '.article-card' },
    { container: '.certs-grid', items: '.cert-card' },
    { container: '.education-grid', items: '.education-card' },
    { container: '.quick-facts-grid', items: '.fact-card' },
    { container: '.secondary-skills-row', items: '.skill-badge' }
  ];

  staggerSelectors.forEach(({ container, items }) => {
    const parentContainers = document.querySelectorAll(container);
    parentContainers.forEach(parent => {
      const children = parent.querySelectorAll(items);
      children.forEach((child, index) => {
        const delay = Math.min(index * 70, 500);
        child.style.transitionDelay = `${delay}ms`;
      });
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
  });

  allRevealElements.forEach(el => observer.observe(el));
}

/**
 * Active Navigation Link Highlighter based on scroll position using IntersectionObserver
 * Highlights active section with smooth underline and color transition.
 * Works seamlessly in both desktop and mobile navigation menus.
 */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    // If user has reached the bottom of the page, activate the last section (#contact)
    const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
    if (atBottom) {
      setActive('contact');
      return;
    }

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-70px 0px -55% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/**
 * Unified Scroll Effects Listener (requestAnimationFrame-throttled, passive)
 * Controls:
 *  1. Top fixed 3px cyan scroll-progress bar (using transform: scaleX)
 *  2. Navbar compacting past 40px
 *  3. Experience timeline line drawing down as user scrolls through the section
 *  4. Floating back-to-top button visibility past 600px
 */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const timeline = document.querySelector('.timeline');

  let ticking = false;

  function update() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Top fixed 3px cyan scroll-progress bar
    if (progressBar) {
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
      progressBar.style.opacity = scrollY > 6 ? '1' : '0';
    }

    // 2. Navbar compacting past 40px
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    // 3. Floating back-to-top button past 600px
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('is-visible', scrollY > 600);
    }

    // 4. Experience timeline line drawing down
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.65;
      const totalHeight = rect.height;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((triggerPoint - rect.top) / totalHeight, 0), 1);
        timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Initial update on load
  update();
}

/**
 * Floating Back-to-Top Button Handler
 * Keyboard accessible, smoothly scrolls back to hero, respects prefers-reduced-motion.
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroSection = document.getElementById('hero');

    if (heroSection) {
      heroSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }

    btn.blur();
  });
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
    if (!isCollapsed) {
      privateGrid.querySelectorAll('.reveal-item').forEach(el => el.classList.add('is-visible'));
    }
  });
}

/**
 * Dynamic Footer Year
 * Sets the current year dynamically, falling back to 2026 if JavaScript is unavailable.
 */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * 404 Error Page Path Display
 * Inserts sanitized window.location.pathname with textContent only (no innerHTML),
 * truncated if very long to prevent terminal layout overflow.
 */
function init404Path() {
  const pathElements = document.querySelectorAll('.error-path');
  if (!pathElements.length) return;

  let pathname = window.location.pathname || '/requested-page';
  
  // Truncate if very long
  const maxLen = 45;
  if (pathname.length > maxLen) {
    pathname = pathname.substring(0, maxLen - 3) + '...';
  }

  pathElements.forEach(el => {
    el.textContent = pathname;
  });
}

/**
 * Update Section Numbering
 * When articles are present:
 *  01 About, 02 Skills, 03 Experience, 04 Projects, 05 Articles, 06 Certs, 07 Education, 08 Contact
 * When articles are hidden:
 *  01 About, 02 Skills, 03 Experience, 04 Projects, 05 Certs, 06 Education, 07 Contact
 */
function updateSectionLabels(hasArticles) {
  const certTag = document.querySelector('#certifications .section-tag');
  const eduTag = document.querySelector('#education .section-tag');
  const contactPrompt = document.querySelector('#contact .contact-prompt');

  if (hasArticles) {
    if (certTag) certTag.textContent = '// 06. credentials';
    if (eduTag) eduTag.textContent = '// 07. academics';
    if (contactPrompt) contactPrompt.textContent = '// 08. let\'s connect';
  } else {
    if (certTag) certTag.textContent = '// 05. credentials';
    if (eduTag) eduTag.textContent = '// 06. academics';
    if (contactPrompt) contactPrompt.textContent = '// 07. let\'s connect';
  }
}

/**
 * Fetch and Render Articles from dev.to
 * Pure vanilla JS, no libraries, no API key, XSS-safe DOM node creation.
 */
async function initArticles() {
  const articlesSection = document.getElementById('articles');
  const navLinkArticles = document.getElementById('nav-link-articles');
  const grid = document.getElementById('articles-grid');

  if (!articlesSection || !grid) return;

  const CACHE_KEY = `devto_articles_${DEVTO_CONFIG.username}`;

  // Helper to completely collapse and hide the articles section and nav link
  function hideSection() {
    articlesSection.setAttribute('hidden', '');
    if (navLinkArticles) navLinkArticles.setAttribute('hidden', '');
    grid.innerHTML = '';
    updateSectionLabels(false);
  }

  // Helper to render skeleton loader cards during fetch
  function renderSkeleton(count = 3) {
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const skel = document.createElement('div');
      skel.className = 'article-card article-skeleton';
      skel.setAttribute('aria-hidden', 'true');

      const meta = document.createElement('div');
      meta.className = 'skeleton-line skeleton-meta';

      const title = document.createElement('div');
      title.className = 'skeleton-line skeleton-title';

      const desc1 = document.createElement('div');
      desc1.className = 'skeleton-line skeleton-desc';

      const desc2 = document.createElement('div');
      desc2.className = 'skeleton-line skeleton-desc short';

      const tags = document.createElement('div');
      tags.className = 'skeleton-line skeleton-tags';

      skel.appendChild(meta);
      skel.appendChild(title);
      skel.appendChild(desc1);
      skel.appendChild(desc2);
      skel.appendChild(tags);
      grid.appendChild(skel);
    }
  }

  // Helper to safely build an article card DOM node (Zero innerHTML with API data!)
  function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card reveal-item';

    // Optional cover image (must be valid https:// URL)
    if (article.cover_image && typeof article.cover_image === 'string' && article.cover_image.startsWith('https://')) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'article-cover-wrapper';

      const img = document.createElement('img');
      img.src = article.cover_image;
      img.alt = article.title ? `${article.title} cover` : 'Article cover image';
      img.loading = 'lazy';
      img.className = 'article-cover-img';
      imgWrapper.appendChild(img);
      card.appendChild(imgWrapper);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'article-content';

    // Meta bar: date & reading time
    const metaBar = document.createElement('div');
    metaBar.className = 'article-meta-bar';

    if (article.published_at) {
      const dateEl = document.createElement('time');
      dateEl.className = 'article-date';
      dateEl.setAttribute('datetime', article.published_at);
      try {
        const d = new Date(article.published_at);
        dateEl.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch (err) {
        dateEl.textContent = article.readable_publish_date || '';
      }
      metaBar.appendChild(dateEl);

      const sep = document.createElement('span');
      sep.className = 'article-meta-sep';
      sep.textContent = '•';
      sep.setAttribute('aria-hidden', 'true');
      metaBar.appendChild(sep);
    }

    const readTime = document.createElement('span');
    readTime.className = 'article-read-time';
    readTime.textContent = `${article.reading_time_minutes || 1} min read`;
    metaBar.appendChild(readTime);
    contentDiv.appendChild(metaBar);

    // Title & Link
    const titleH3 = document.createElement('h3');
    titleH3.className = 'article-title';

    const titleLink = document.createElement('a');
    titleLink.className = 'article-link';
    titleLink.href = (article.url && typeof article.url === 'string' && article.url.startsWith('https://')) ? article.url : `https://dev.to/${DEVTO_CONFIG.username}`;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.textContent = article.title || 'Untitled Article';
    titleH3.appendChild(titleLink);
    contentDiv.appendChild(titleH3);

    // Description truncated to ~140 chars
    if (article.description && typeof article.description === 'string') {
      const descP = document.createElement('p');
      descP.className = 'article-description';
      let desc = article.description.trim();
      if (desc.length > 140) {
        desc = desc.substring(0, 137).trim() + '...';
      }
      descP.textContent = desc;
      contentDiv.appendChild(descP);
    }

    // Tags (up to 3)
    let tagsList = [];
    if (Array.isArray(article.tag_list)) {
      tagsList = article.tag_list.slice(0, 3);
    } else if (typeof article.tags === 'string') {
      tagsList = article.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3);
    }

    if (tagsList.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'article-tags';
      tagsList.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'article-tag';
        tagSpan.textContent = tag.startsWith('#') ? tag : `#${tag}`;
        tagsContainer.appendChild(tagSpan);
      });
      contentDiv.appendChild(tagsContainer);
    }

    // Card Footer CTA
    const footerDiv = document.createElement('div');
    footerDiv.className = 'article-footer';

    const ctaLink = document.createElement('a');
    ctaLink.className = 'article-cta';
    ctaLink.href = (article.url && typeof article.url === 'string' && article.url.startsWith('https://')) ? article.url : `https://dev.to/${DEVTO_CONFIG.username}`;
    ctaLink.target = '_blank';
    ctaLink.rel = 'noopener noreferrer';
    ctaLink.textContent = 'Read on dev.to';

    const arrow = document.createElement('span');
    arrow.textContent = ' →';
    arrow.setAttribute('aria-hidden', 'true');
    ctaLink.appendChild(arrow);
    footerDiv.appendChild(ctaLink);
    contentDiv.appendChild(footerDiv);

    card.appendChild(contentDiv);
    return card;
  }

  // Display rendered articles and show section
  function renderArticles(articles) {
    if (!articles || !articles.length) {
      hideSection();
      return;
    }

    grid.innerHTML = '';
    articles.forEach(article => {
      const card = createArticleCard(article);
      grid.appendChild(card);
    });

    // Unhide the section and its nav link
    articlesSection.removeAttribute('hidden');
    if (navLinkArticles) navLinkArticles.removeAttribute('hidden');

    // Update section numbering for subsequent sections
    updateSectionLabels(true);

    // Apply scroll reveal and staggering
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = grid.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
      const delay = Math.min(index * 70, 500);
      card.style.transitionDelay = `${delay}ms`;
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
      });
      cards.forEach(c => observer.observe(c));
    }
  }

  // 1. Check sessionStorage cache
  try {
    const cachedRaw = sessionStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      if (cached && cached.timestamp && (Date.now() - cached.timestamp < DEVTO_CONFIG.cacheTtlMs) && Array.isArray(cached.articles)) {
        if (cached.articles.length > 0) {
          renderArticles(cached.articles);
          return;
        } else {
          hideSection();
          return;
        }
      }
    }
  } catch (err) {
    // Ignore cache retrieval errors
  }

  // 2. Fetch from dev.to API with 5-second timeout and skeleton loader
  renderSkeleton(Math.min(DEVTO_CONFIG.count, 3));
  articlesSection.removeAttribute('hidden'); // Reserve space during loading

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEVTO_CONFIG.apiTimeoutMs);

  const apiUrl = `https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_CONFIG.username)}&per_page=${DEVTO_CONFIG.count}`;

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`dev.to API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('dev.to API response is not an array');
    }

    // Cache the response
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        articles: data
      }));
    } catch (e) {
      // Ignore quota errors
    }

    if (data.length === 0) {
      hideSection();
    } else {
      renderArticles(data);
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('dev.to articles fetch failed or timed out:', err.message || err);
    hideSection();
  }
}

