// Shared TypeScript types for portfolio content.
// These mirror the Mongoose models in lib/models.ts and the seed data in
// lib/seed-data.ts. Public pages render from the database and fall back to
// the seed data when MongoDB is empty or unreachable.

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  bio2: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  github: string;
  linkedin: string;
  devto: string;
  fiverr: string;
  heroRoles: string[];
}

export interface SkillGroup {
  title: string;
  command: string;
  items: string[];
  order: number;
  published: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
  order: number;
  published: boolean;
}

export interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  githubUrl: string;
  category: string;
  order: number;
  published: boolean;
}

export interface ServiceTier {
  name: string;
  price: number;
  deliveryDays: number;
  label: string;
}

export interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  tiers: ServiceTier[];
  imageUrl: string;
  fiverrUrl: string;
  order: number;
  published: boolean;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  detail: string;
  order: number;
  published: boolean;
}

export interface CertificationItem {
  title: string;
  year: string;
  issuer: string;
  order: number;
  published: boolean;
}

export interface ArticleItem {
  title: string;
  url: string;
  coverImage: string;
  publishedAt: string;
  description: string;
  tags: string[];
  order: number;
  published: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  order: number;
  published: boolean;
}

export interface MessageItem {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

export interface SiteContent {
  profile: Profile;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  articles: ArticleItem[];
  faqs: FaqItem[];
}
