# Shuvo Halder - Professional Portfolio

Modern, lightweight, zero-dependency one-page portfolio website for **Shuvo Halder** (System Engineer | DevOps | Cloud Infrastructure).

Deployed directly from the root of the repository via **GitHub Pages**:
[https://shuvo-halder.github.io/](https://shuvo-halder.github.io/)

---

## Architecture & Features

- **Pure Static Stack**: Pure HTML5, CSS3, and Vanilla JavaScript. No node_modules, no npm build step, zero dependencies.
- **Dark & Light Modes**: Modern technical dark theme with high-contrast light theme toggle, persisted in `localStorage` and synchronized with `prefers-color-scheme`.
- **Fast & Responsive**: Mobile-first layout, hamburger menu, sticky glassmorphic navigation, and responsive typography.
- **Micro-Interactions**: Dynamic terminal typing effect, smooth-scrolling anchors, and scroll-reveal animations via `IntersectionObserver`.
- **Accessible & Performance-Minded**: Semantic HTML structure, `:focus-visible` styling, full `prefers-reduced-motion` compliance, and Open Graph / JSON-LD Person schema.

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
        └── profile.jpg              # Your profile image (add/replace here)
```

---

## Local Development & Preview

Because this is a pure static site, you can preview it with any local HTTP server:

### Using Python 3 (Recommended)
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## How to Edit Content & Replace Placeholders

All editable sections are located in `index.html` with explicit `TODO` tags:

1. **Profile Photo**:
   - Place your profile photo in `assets/images/profile.jpg` (or `.png`).
   - If missing, the site automatically falls back to `assets/images/placeholder-avatar.svg`.
2. **Resume**:
   - Save your PDF resume to `assets/resume.pdf`.
   - In `index.html`, uncomment the `Download Resume` button block in the hero section.
3. **Quick Metrics**:
   - In the About section, replace `[Years of experience: X]` and `[Cloud platforms: X]` with your numbers.
4. **Experience Timeline**:
   - Update `[Role Title]`, `[Dates]`, `[Company / Organization Name]`, and the 3 impact bullets.
5. **Projects**:
   - Existing real projects (*Performance Stats Tool* and *Mail Server Setup*) are live.
   - To add more projects, uncomment the project template in `index.html`.
6. **Certifications**:
   - When ready, uncomment the `<section id="certifications">` block and add your credentials.
7. **Contact Links**:
   - Replace the `mailto:` email address and update your LinkedIn profile URL in both the contact section and the footer/JSON-LD.

---

## Deployment to GitHub Pages

1. **Stage, Commit, and Push**:
   ```bash
   git add .
   git commit -m "feat: redesign portfolio to modern one-page static site"
   git push origin main
   ```

2. **Verify GitHub Pages Settings**:
   - Go to your repository on GitHub: `https://github.com/shuvo-halder/shuvo-halder.github.io`.
   - Click **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main`, and folder `/ (root)`.
     - Click **Save**.
   - Your site will be live at: [https://shuvo-halder.github.io/](https://shuvo-halder.github.io/)
