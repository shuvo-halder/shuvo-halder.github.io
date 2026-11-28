import type { MetadataRoute } from 'next';
import { getContent } from '../lib/content';
import { SITE_URL } from '../lib/seed-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...content.services
      .filter((s) => s.published)
      .map((s) => ({
        url: `${SITE_URL}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ];
}
