import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '../../lib/content';
import { SITE_URL } from '../../lib/seed-data';
import type { ServiceItem } from '../../lib/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'DevOps & Cloud Services | Shuvo Halder - Hire from $40',
  description:
    'Fixed-price DevOps & cloud services from $40: Linux server hardening, Docker & Kubernetes, Proxmox/OpenStack private cloud, NGINX & SSL, CI/CD, monitoring, networking & business email servers.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'DevOps & Cloud Services | Shuvo Halder - Hire from $40',
    description:
      'Fixed-price DevOps & cloud services from $40: Linux hardening, Docker & Kubernetes, Proxmox/OpenStack, NGINX & SSL, CI/CD, monitoring, networking & email servers.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps & Cloud Services | Shuvo Halder - Hire from $40',
    description:
      'Fixed-price DevOps & cloud services from $40: Linux hardening, Docker & Kubernetes, Proxmox/OpenStack, NGINX & SSL, CI/CD, monitoring, networking & email servers.',
  },
};

function ServiceCard({ service, profile }: { service: ServiceItem; profile: { email: string; whatsapp: string } }) {
  return (
    <article className="project-card">
      {service.imageUrl && (
        <Image
          className="project-image"
          src={service.imageUrl}
          alt={`${service.title} service by Shuvo Halder`}
          width={1054}
          height={629}
          loading="lazy"
        />
      )}
      <div className="project-top">
        <span className="project-folder-icon" aria-hidden="true">
          $
        </span>
      </div>
      <h3 className="project-title">
        <Link href={`/services/${service.slug}`} style={{ color: 'inherit' }}>
          {service.title}
        </Link>
      </h3>
      <p className="project-description">{service.description}</p>
      <ul className="project-tech-list">
        {service.tech.map((t) => (
          <li key={t} className="project-tech-item">
            {t}
          </li>
        ))}
      </ul>
      <ul className="tier-list">
        {service.tiers.map((tier) => (
          <li key={tier.name}>
            <span>
              <strong>{tier.name}:</strong> ${tier.price} · {tier.deliveryDays} days
              {tier.label ? ` — ${tier.label}` : ''}
            </span>
            <span className="tier-price">${tier.price}</span>
          </li>
        ))}
      </ul>
      <div className="project-card-footer">
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent(`Service inquiry: ${service.title}`)}`}
          className="project-link-cta"
        >
          Order this service →
        </a>
        <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="project-link-cta">
          WhatsApp →
        </a>
        {service.fiverrUrl && (
          <a href={service.fiverrUrl} target="_blank" rel="noopener noreferrer" className="project-link-cta">
            Fiverr →
          </a>
        )}
      </div>
    </article>
  );
}

export default async function ServicesPage() {
  const content = await getContent();
  const p = content.profile;
  const services = content.services.filter((s) => s.published);
  const faqs = content.faqs.filter((f) => f.published);
  const minPrice = Math.min(...services.flatMap((s) => s.tiers.map((t) => t.price)));

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DevOps & Cloud Infrastructure Services',
    serviceType: 'DevOps and Cloud Infrastructure',
    provider: { '@type': 'Person', name: p.name, url: SITE_URL },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/services`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Infrastructure Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title },
        price: Math.min(...s.tiers.map((t) => t.price)),
        priceCurrency: 'USD',
        url: `${SITE_URL}/services/${s.slug}`,
      })),
    },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section id="services" className="section" aria-labelledby="services-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// services</span>
            <h1 id="services-heading" className="section-title">
              Services
            </h1>
            <p className="section-subtitle">
              DevOps and cloud infrastructure services for startups and small businesses: pick a
              service, pick a package, and get production-grade infrastructure work — fixed scope,
              fixed price, no surprises.
            </p>
            <p className="section-subtitle">
              Every gig is delivered by a{' '}
              <Link href="/#about">RHCSA and CCNA certified engineer</Link> with 3+ years of
              hands-on production experience — see <Link href="/#projects">past projects</Link>{' '}
              and <Link href="/#experience">work experience</Link> before you order. Prices start
              from ${minPrice}.
            </p>
          </header>
          <p className="section-subtitle">
            How it works: 1) choose a gig below → 2) email or WhatsApp me with your requirements
            → 3) get a confirmed price and delivery date before any work starts.
          </p>
          <div className="projects-grid" style={{ marginTop: '1.5rem' }}>
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} profile={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section" aria-labelledby="faq-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// faq</span>
            <h2 id="faq-heading" className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Answers before you order — anything else, just ask on Email or WhatsApp.
            </p>
          </header>
          <div className="projects-grid">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p className="project-description">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="section" aria-labelledby="order-heading">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-prompt">// custom project?</div>
            <h2 id="order-heading" className="section-title">
              Need Something Custom?
            </h2>
            <p className="section-subtitle">
              Not on the list? Tell me what your infrastructure needs — a full private cloud, a
              migration, or ongoing server management — and I will scope it for you.
            </p>
            <div className="contact-actions">
              <a href={`mailto:${p.email}?subject=Custom project inquiry`} className="btn btn-primary">
                $ mail {p.email}
              </a>
              <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                WhatsApp {p.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
