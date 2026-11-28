import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getContent } from '../lib/content';
import { SITE_URL } from '../lib/seed-data';

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
  openGraph: {
    type: 'website',
    siteName: 'Shuvo Halder Portfolio',
    url: SITE_URL,
    title: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
    description:
      'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
    description:
      'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
  },
};

// Set the saved theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.profile.name,
    url: SITE_URL,
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
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <div className="navbar-spacer" aria-hidden="true" />
        <main id="main-content">{children}</main>
        <Footer profile={content.profile} />
      </body>
    </html>
  );
}
