# Shuvo Halder - Professional Portfolio

Modern, lightweight, zero-dependency one-page portfolio website for **Shuvo Halder** (System &amp; Cloud Infrastructure Engineer | DevOps).

Live URL: [https://shuvo-halder.github.io/](https://shuvo-halder.github.io/)

---

## Architecture & Features

- **Pure Static Stack**: Pure HTML5, CSS3, and Vanilla JavaScript. No node_modules, no npm build step, zero frameworks required. Served directly from the root of the repository by GitHub Pages.
- **Dark & Light Modes**: Technical dark theme by default with clean light theme toggle, saved in `localStorage` and synchronized with `prefers-color-scheme`.
- **Fast & Responsive**: Mobile-first design, accessible hamburger drawer, sticky glassmorphic navigation bar, and responsive typography.
- **Micro-Interactions**: Dynamic terminal typing effect, smooth-scrolling anchors, and scroll-reveal animations via `IntersectionObserver`.
- **Accessibility & SEO**: Semantic HTML5 structure, proper `:focus-visible` states, full `prefers-reduced-motion` compliance, Open Graph tags, Twitter card tags, and JSON-LD `Person` schema.

---

## Directory Structure

```text
shuvo-halder.github.io/
├── .nojekyll                   # Disables Jekyll processing on GitHub Pages
├── 404.html                    # Themed 404 error page (with noindex)
├── apple-touch-icon.png        # 180x180 Apple touch icon
├── favicon.svg                 # Scalable SVG terminal icon
├── favicon-32x32.png           # 32x32 PNG favicon
├── favicon-16x16.png           # 16x16 PNG favicon
├── index.html                  # Main one-page portfolio
├── README.md                   # Documentation & setup guide
├── robots.txt                  # Search engine crawl directives
├── sitemap.xml                 # XML sitemap with canonical URL
├── site.webmanifest            # PWA/browser web app manifest
├── LICENSE                     # License file
└── assets/
    ├── css/
    │   └── style.css           # Modular stylesheet with CSS variables
    ├── js/
    │   └── main.js             # Theme switcher, typing effect, mobile nav, animations
    └── images/
        ├── og-image.png        # 1200x630 Open Graph & Twitter social card
        ├── placeholder-avatar.svg # Vector avatar fallback
        ├── shuvo-halder.webp   # Optimized WebP hero portrait (12 KB)
        └── shuvo-halder.png    # Original lossless PNG portrait fallback
```

---

## Local Development & Preview

Run a local server with Python 3:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your web browser.

---

## Deployment to GitHub Pages

1. **Stage, Commit, and Push**:
   ```bash
   git add .
   git commit -m "feat: complete modern portfolio with real CV content"
   git push origin main
   ```

2. **GitHub Pages Settings**:
   - Go to your repository on GitHub: `https://github.com/shuvo-halder/shuvo-halder.github.io`.
   - Click **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main`, and folder `/ (root)`.
     - Click **Save**.
   - Your site will be live at: [https://shuvo-halder.github.io/](https://shuvo-halder.github.io/)

---

## GitHub Pages Architecture: User Site vs. Project Sites

This repository (`shuvo-halder.github.io`) is a **GitHub Pages User Site**, hosted at the root domain:
`https://shuvo-halder.github.io/`

### 1. Project Sites & Namespace Isolation
- Any other repository published to GitHub Pages under this account (e.g. `core-panel`, `virtualhost-automation`, `certbot-smart-manager`, `nginx-inspector`, `log-archive-tool`, `performance-stats`) is published as an independent **Project Site** at:
  `https://shuvo-halder.github.io/<repo-name>/`
- Project sites are deployed and managed from their own separate repositories. They do **not** inherit or share this root repository's assets, styles, or `404.html`.

### 2. Preventing Path and Routing Conflicts
- **No Overlapping Top-Level Folders**: This repository must **never** contain a top-level directory matching any of your repository names (e.g., do not create `/core-panel/` or `/virtualhost-automation/` inside this repo). Doing so would cause GitHub Pages routing collisions between a local folder and the standalone project site.
- **Root-Relative vs. Relative Assets**:
  - In this root site (`shuvo-halder.github.io`), assets and cross-links use root-relative paths (`/assets/...`, `/#about`, `/`) because it resides at domain root `/`.
  - In project sites (`shuvo-halder.github.io/<repo-name>/`), project repositories must either use **relative asset paths** (`./assets/...` or `assets/...`) or configure their framework base path to `/<repo-name>/` (e.g. `base: '/<repo-name>/'` in Vite/Astro/Next.js) so asset references resolve to `https://shuvo-halder.github.io/<repo-name>/assets/...` rather than the user site root.

### 3. Global 404 Error Handling
- The `404.html` in this repository handles unrouted requests at any path depth across the root user site (e.g. `https://shuvo-halder.github.io/non-existent-path`).
- All scripts, stylesheets, and favicon links in `404.html` are strictly root-relative (`/assets/css/style.css`, `/assets/js/main.js`, `/favicon.svg`), guaranteeing styles, navigation, and theme toggling load accurately at any URL depth without redirect hacks or `<base>` tag conflicts.

---

## SEO & Search Engine Indexing

This portfolio is optimized for search engines with pure static files, valid structured data (`Person` and `WebSite` JSON-LD schema), Open Graph and Twitter Card tags, and root crawl directives.

### Submitting to Search Engines

1. **Google Search Console**:
   - Navigate to [Google Search Console](https://search.google.com/search-console).
   - Add property: `https://shuvo-halder.github.io/` (URL prefix method is recommended for GitHub Pages).
   - Verify ownership using the HTML tag or file upload method.
   - Go to **Sitemaps** in the sidebar, enter `sitemap.xml`, and click **Submit**.
   - Use the **URL Inspection** tool on `https://shuvo-halder.github.io/` and click **Request Indexing**.

2. **Bing Webmaster Tools**:
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - Sign in and either import your verified site from Google Search Console or add `https://shuvo-halder.github.io/` manually.
   - Go to **Sitemaps**, enter `https://shuvo-halder.github.io/sitemap.xml`, and click **Submit sitemap**.

### Key SEO Directives & Files
- **Canonical URL**: `https://shuvo-halder.github.io/`
- **Sitemap**: `https://shuvo-halder.github.io/sitemap.xml`
- **Robots Directives (`robots.txt`)**: Allows crawling of all public pages and points crawlers directly to `sitemap.xml`.
- **404 Handling (`404.html`)**: Includes `<meta name="robots" content="noindex">` to prevent error responses from being indexed by search engines.
