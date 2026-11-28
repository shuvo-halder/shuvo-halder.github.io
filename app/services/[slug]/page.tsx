import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '../../../lib/content';
import { SITE_URL } from '../../../lib/seed-data';

export const revalidate = 60;

export async function generateStaticParams() {
  const content = await getContent();
  return content.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const content = await getContent();
  const service = content.services.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };
  const min = Math.min(...service.tiers.map((t) => t.price));
  return {
    title: `${service.title} — from $${min}`,
    description: service.description,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — from $${min} | Shuvo Halder`,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: 'website',
      images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const content = await getContent();
  const service = content.services.find((s) => s.slug === params.slug && s.published);
  if (!service) notFound();
  const p = content.profile;
  const others = content.services.filter((s) => s.published && s.slug !== service.slug).slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Person', name: p.name, url: SITE_URL },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/services/${service.slug}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.tiers.map((t) => ({
        '@type': 'Offer',
        name: t.name,
        price: t.price,
        priceCurrency: 'USD',
        description: t.label,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="section" aria-labelledby="service-heading">
        <div className="container">
          <p className="section-tag">
            <Link href="/services">// services</Link> / {service.title}
          </p>
          <h1 id="service-heading" className="section-title">
            {service.title}
          </h1>
          {service.imageUrl && (
            <Image
              src={service.imageUrl}
              alt={`${service.title} service by Shuvo Halder`}
              width={1054}
              height={629}
              style={{ borderRadius: '10px', margin: '1.25rem 0' }}
            />
          )}
          <p className="section-subtitle">{service.description}</p>
          <ul className="project-tech-list">
            {service.tech.map((t) => (
              <li key={t} className="project-tech-item">
                {t}
              </li>
            ))}
          </ul>

          <h2 className="project-title" style={{ marginTop: '1.5rem' }}>
            Packages
          </h2>
          <ul className="tier-list" style={{ maxWidth: 640 }}>
            {service.tiers.map((tier) => (
              <li key={tier.name}>
                <span>
                  <strong>{tier.name}</strong> — {tier.label} · {tier.deliveryDays} day
                  {tier.deliveryDays > 1 ? 's' : ''} delivery
                </span>
                <span className="tier-price">${tier.price}</span>
              </li>
            ))}
          </ul>

          <div className="contact-actions">
            <a
              href={`mailto:${p.email}?subject=${encodeURIComponent(`Service inquiry: ${service.title}`)}`}
              className="btn btn-primary"
            >
              Order by Email
            </a>
            <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              WhatsApp {p.phone}
            </a>
            {service.fiverrUrl && (
              <a href={service.fiverrUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Order on Fiverr →
              </a>
            )}
          </div>

          {others.length > 0 && (
            <>
              <h2 className="project-title" style={{ marginTop: '2.5rem' }}>
                Other services
              </h2>
              <div className="projects-grid" style={{ marginTop: '1rem' }}>
                {others.map((o) => (
                  <article key={o.slug} className="project-card">
                    <h3 className="project-title">
                      <Link href={`/services/${o.slug}`} style={{ color: 'inherit' }}>
                        {o.title}
                      </Link>
                    </h3>
                    <p className="project-description">{o.description}</p>
                    <div className="project-card-footer">
                      <span className="tier-price">
                        from ${Math.min(...o.tiers.map((t) => t.price))}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
