import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollChrome from '../components/ScrollChrome';
import ScrollReveal from '../components/ScrollReveal';
import { getContent } from '../lib/content';
import { SITE_URL } from '../lib/seed-data';

const OG_IMAGE = 'https://shuvo-halder.github.io/assets/images/og-image.png';

// Same theme-color as the static site's head; Navbar updates it on toggle.
export const viewport: Viewport = { themeColor: '#0a0e17' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
    template: '%s | Shuvo Halder',
  },
  description:
    'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
  authors: [{ name: 'Shuvo Halder' }],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  // Same as the static site's head.
  verification: { google: 'K8mo0_NpGWgWPjdvIsjIHftorGojaTw3g4eWcybtNnE' },
  // Hotlinked from the static site: the GitHub push tools reject binary
  // uploads, same as the hero photo.
  icons: {
    icon: [
      { url: 'https://shuvo-halder.github.io/favicon.svg', type: 'image/svg+xml' },
      { url: 'https://shuvo-halder.github.io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://shuvo-halder.github.io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: 'https://shuvo-halder.github.io/apple-touch-icon.png',
  },
  // Served locally from /public so the browser never fetches the manifest
  // cross-origin from github.io (GitHub Pages answers
  // Access-Control-Allow-Origin: * and the fetch uses credentials, which
  // Chrome blocks — that was the CORS error in the login-page console).
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Shuvo Halder Portfolio',
    url: SITE_URL,
    title: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
    description:
      'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Shuvo Halder Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
    description:
      'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
    images: [OG_IMAGE],
  },
};

// Set the saved theme before first paint to avoid a flash.
// Key 'portfolio-theme', OS prefers-color-scheme fallback, dark = no attribute.
const themeScript = `(function(){try{var s=localStorage.getItem('portfolio-theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

// Reveal animations are gated on this class, exactly like the static site.
const jsClassScript = `document.documentElement.classList.add('js');`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const personLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: content.profile.name,
        url: SITE_URL,
        image: content.profile.imageUrl,
        jobTitle: content.profile.role,
        description: content.profile.tagline,
        email: content.profile.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
        worksFor: { '@type': 'Organization', name: 'Plexus Cloud' },
        alumniOf: { '@type': 'EducationalOrganization', name: 'Dhaka International University' },
        sameAs: [content.profile.github, content.profile.linkedin, content.profile.devto],
        knowsAbout: [
          'Cloud Infrastructure', 'OpenStack', 'Proxmox VE', 'VMware ESXi', 'Ceph Storage',
          'Kubernetes', 'Docker', 'Linux Administration', 'Bash Scripting', 'DevOps', 'CI/CD',
          'Computer Networking', 'BGP', 'OSPF', 'VLAN', 'MikroTik', 'Postfix',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Shuvo Halder Portfolio',
        description: content.profile.tagline,
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: jsClassScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <div className="navbar-spacer" aria-hidden="true" />
        <main id="main-content">{children}</main>
        <Footer profile={content.profile} />
        <ScrollChrome />
        <ScrollReveal />
      </body>
    </html>
  );
}
