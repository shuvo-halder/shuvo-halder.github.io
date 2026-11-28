// Content loading for public pages.
// Tries MongoDB first; on any failure (no MONGODB_URI, DB down, empty
// collections) falls back to the real seed data so the site always renders.
import { dbConnect } from './db';
import {
  ArticleModel,
  CertificationModel,
  EducationModel,
  ExperienceModel,
  FaqModel,
  ProfileModel,
  ProjectModel,
  ServiceModel,
  SkillModel,
} from './models';
import { seedContent } from './seed-data';
import type { SiteContent } from './types';

function plain<T>(docs: unknown[]): T[] {
  return (docs as Array<Record<string, unknown>>).map((d) => {
    const { _id, __v, createdAt, updatedAt, ...rest } = d;
    return { ...rest, _id: _id ? String(_id) : undefined } as T;
  });
}

function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getContent(): Promise<SiteContent> {
  try {
    const conn = await dbConnect();
    if (!conn) return seedContent;
    const [profile, skills, experience, projects, services, education, certifications, articles, faqs] =
      await Promise.all([
        ProfileModel.findOne().lean(),
        SkillModel.find().lean(),
        ExperienceModel.find().lean(),
        ProjectModel.find().lean(),
        ServiceModel.find().lean(),
        EducationModel.find().lean(),
        CertificationModel.find().lean(),
        ArticleModel.find().lean(),
        FaqModel.find().lean(),
      ]);
    // Empty DB (not seeded yet) -> seed fallback.
    if (!profile && skills.length === 0 && services.length === 0) return seedContent;
    return {
      profile: profile
        ? (plain([profile])[0] as SiteContent['profile'])
        : seedContent.profile,
      skills: skills.length ? sortByOrder(plain(skills) as SiteContent['skills']) : seedContent.skills,
      experience: experience.length
        ? sortByOrder(plain(experience) as SiteContent['experience'])
        : seedContent.experience,
      projects: projects.length
        ? sortByOrder(plain(projects) as SiteContent['projects'])
        : seedContent.projects,
      services: services.length
        ? sortByOrder(plain(services) as SiteContent['services'])
        : seedContent.services,
      education: education.length
        ? sortByOrder(plain(education) as SiteContent['education'])
        : seedContent.education,
      certifications: certifications.length
        ? sortByOrder(plain(certifications) as SiteContent['certifications'])
        : seedContent.certifications,
      articles: articles.length
        ? sortByOrder(plain(articles) as SiteContent['articles'])
        : seedContent.articles,
      faqs: faqs.length ? sortByOrder(plain(faqs) as SiteContent['faqs']) : seedContent.faqs,
    };
  } catch (err) {
    console.error('getContent failed, using seed fallback:', (err as Error).message);
    return seedContent;
  }
}

/** Latest Dev.to articles, fetched live with a 1h cache; falls back to seed. */
export async function getArticles() {
  try {
    const res = await fetch('https://dev.to/api/articles?username=shuvo_h&per_page=8', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`dev.to ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('empty dev.to response');
    // Newest first, like the static site's main.js.
    data.sort(
      (a: Record<string, unknown>, b: Record<string, unknown>) =>
        new Date(String(b.published_at || 0)).getTime() - new Date(String(a.published_at || 0)).getTime(),
    );
    return data.map((a: Record<string, unknown>, i: number) => ({
      title: String(a.title || ''),
      url: String(a.url || ''),
      coverImage: String(a.cover_image || a.social_image || ''),
      publishedAt: String(a.published_at || '').slice(0, 10),
      description: String(a.description || ''),
      tags: Array.isArray(a.tag_list) ? (a.tag_list as string[]) : [],
      readingTimeMinutes: Number(a.reading_time_minutes || 1),
      order: i + 1,
      published: true,
    }));
  } catch {
    return seedContent.articles;
  }
}
