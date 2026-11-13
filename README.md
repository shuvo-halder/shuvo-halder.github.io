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
├── 404.html                    # Themed 404 error page
├── favicon.svg                 # SVG terminal icon
├── index.html                  # Main one-page portfolio
├── README.md                   # Documentation & setup guide
├── LICENSE                     # License file
└── assets/
    ├── css/
    │   └── style.css           # Modular stylesheet with CSS variables
    ├── js/
    │   └── main.js             # Theme switcher, typing effect, mobile nav, animations
    └── images/
        ├── placeholder-avatar.svg   # Vector avatar fallback
        └── shuvo-halder.png         # Profile photo
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
