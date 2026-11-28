# Shuvo Halder — Dynamic Portfolio (Next.js)

A dynamic, SEO-friendly portfolio for **Shuvo Halder, System & Cloud Infrastructure
Engineer (Dhaka, Bangladesh)**, built with **Next.js 14 (App Router, TypeScript)** and
**MongoDB Atlas + Mongoose**. It reuses the design of the static site at
https://shuvo-halder.github.io/ — dark theme (`#0a0e17`, cyan `#06b6d4` accent),
light-theme toggle, mono `//section` tags, terminal-style brand `shuvo@infra:~$`,
grouped header nav with dropdowns (desktop) and accordion (mobile) — but all
content now lives in the database and is editable from an **admin panel with real
JWT authentication**.

## Features

- **Public site** — `/` (hero, about, skills, experience, projects, articles,
  certifications, education, contact form), `/services` (8 gig cards with prices,
  Fiverr links, FAQ), `/services/[slug]` (one page per service).
- **Content from MongoDB** — every section renders from the database. If the DB
  is empty or unreachable, the site falls back to the built-in seed data, so it
  always renders.
- **Contact form** — saves messages to MongoDB; read them in the admin inbox.
- **Dev.to articles** — fetched live from the Dev.to API (`shuvo_h`), cached 1h,
  with seed fallback.
- **SEO** — per-page metadata + `generateMetadata`, `sitemap.ts`, `robots.ts`
  (admin/API disallowed), canonical URLs, Open Graph/Twitter cards, JSON-LD
  (Person, Service catalog with prices, FAQPage, BreadcrumbList).
- **Admin panel** — `/admin` dashboard + CRUD for profile, skills, experience,
  projects, services (incl. pricing tiers), education, certifications, articles,
  FAQs, and the message inbox. All saves go to MongoDB via `/api/admin/*`.
- **Admin auth (real, not a demo)** — login at `/admin/login`. The admin account
  is created by the seed script with a **bcrypt-hashed** password from env vars.
  Login issues a signed JWT (`jose`, HS256) in an `httpOnly`, `secure` (in
  production), `sameSite=strict` cookie. `middleware.ts` protects `/admin/*`
  (except login) and `/api/admin/*`. No default password, no hardcoded
  credentials anywhere.
- **Public API** — `GET /api/content` returns all published content as JSON.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router, TypeScript, plain CSS | Same design, no Tailwind/UI kit; server components + SEO built in |
| Database | **MongoDB Atlas (free M0) + Mongoose** | Flexible document schema fits portfolio content (projects, services, tiers, messages); generous free tier; works on Vercel/Netlify serverless (connection cached in `lib/db.ts`) |
| Auth | bcryptjs + jose (JWT in httpOnly cookie) | Real password hashing, signed tokens, no sessions to store |
| Hosting | Vercel (recommended) or Netlify | Both run Next.js server-side; see deploy steps below |

## Run locally

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run seed           # creates the admin + fills MongoDB with the real content
npm run dev            # http://localhost:3000
```

Without `MONGODB_URI` the site still runs — it renders the seed fallback data.
The contact form and admin panel need the database.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Public base URL, no trailing slash (e.g. `https://shuvo-halder.vercel.app`) |
| `JWT_SECRET` | yes | Min 32 chars. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `MONGODB_URI` | yes | Atlas connection string, incl. database name (`.../portfolio?...`) |
| `ADMIN_EMAIL` | yes | Admin login email |
| `ADMIN_PASSWORD` | yes | Admin login password (hashed by seed; never stored plaintext) |

## MongoDB Atlas setup (free M0)

1. Create a free cluster at https://cloud.mongodb.com (M0, any region).
2. **Database Access** → Add a database user (username + strong password).
3. **Network Access** → Add IP `0.0.0.0/0` (required for Vercel/Netlify serverless;
   restrict later if you use a fixed egress IP).
4. **Clusters → Connect → Drivers** → copy the connection string, replace
   `<password>` and the database name with `portfolio`.
5. Paste it as `MONGODB_URI` in `.env` and in the hosting provider's env vars.

## Seed the database

```bash
npm run seed
```

This (a) generates `scripts/seed-data.json` from `lib/seed-data.ts` (the single
source of truth), (b) replaces all content collections with the real content
(8 services with approved prices, 6 projects, 3 jobs, 5 skill groups, 4
certifications, 2 education entries, 7 Dev.to articles, 5 FAQs), and
(c) upserts the admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (bcrypt hash).
Re-running it is safe.

Then log in at `http://localhost:3000/admin/login`.

## Deploy — Vercel (recommended)

1. Push this folder to a GitHub repo (new branch, e.g. `nextjs-dynamic`).
2. https://vercel.com → Add New → Project → import the repo.
3. Framework preset: **Next.js**. Build command `npm run build` (default).
4. Environment variables: add `NEXT_PUBLIC_SITE_URL` (your Vercel URL),
   `JWT_SECRET`, `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
5. Deploy. Then run the seed **once** from your machine:
   ```bash
   MONGODB_URI="..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npm run seed
   ```
   (or set the same vars in a local `.env` and run `npm run seed`).
6. Log in at `https://<your-app>.vercel.app/admin/login`.

## Deploy — Netlify

1. Push to GitHub, then https://app.netlify.com → Add new site → Import from Git.
2. Build command `npm run build`, publish directory `.next`.
3. The repo includes `netlify.toml` which applies the Essential Next.js plugin
   (`@netlify/plugin-nextjs`).
4. Site settings → Environment variables: add the same five vars as Vercel.
5. Deploy, then seed once from your machine (same command as Vercel step 5).
6. Log in at `https://<your-site>.netlify.app/admin/login`.

## Project structure

```
app/
  layout.tsx            Root layout, fonts, metadata, Person JSON-LD, theme script
  page.tsx              Home: hero, about, skills, experience, projects,
                        articles, certifications, education, contact form
  services/page.tsx     Services list + FAQ + JSON-LD (Service/FAQ/Breadcrumb)
  services/[slug]/page.tsx  One page per service (generateMetadata + JSON-LD)
  sitemap.ts  robots.ts
  api/content/route.ts  Public JSON API
  api/contact/route.ts  Contact form → MongoDB Message
  api/admin/login|logout/route.ts
  api/admin/[collection]/route.ts        Generic admin CRUD (list/create)
  api/admin/[collection]/[id]/route.ts  Generic admin CRUD (read/update/delete)
  admin/                Login, dashboard, generic CRUD pages
components/             Navbar (grouped dropdowns + theme + mobile),
                        Footer, ContactForm, LogoutButton
lib/
  seed-data.ts          Real content (single source of truth + DB fallback)
  content.ts            getContent() — DB first, seed fallback
  db.ts                 Cached Mongoose connection (serverless-safe)
  models.ts             Mongoose models + collection registry
  auth.ts               JWT sign/verify, bcrypt credential check, cookies
  admin-config.ts       Admin CRUD field definitions (allow-list for the API)
  types.ts              Shared TypeScript types
middleware.ts           Protects /admin/* and /api/admin/* (except login)
scripts/
  seed.mjs              Seed script (content + bcrypt-hashed admin)
  generate-seed-json.mjs  Builds scripts/seed-data.json from lib/seed-data.ts
```

## Notes & limits

- Service images for the two Fiverr gigs are hotlinked from Fiverr's Cloudinary
  CDN (same as the static site) — if Fiverr changes those URLs, upload the
  originals to `public/images/` and update the `imageUrl` in the admin panel.
- Articles are cached from Dev.to for 1 hour; the admin Articles section holds
  the fallback list shown if Dev.to is unreachable.
- The static GitHub Pages site is untouched — this app is a separate codebase
  meant for Vercel/Netlify.
