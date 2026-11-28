// Mongoose models. One collection per content type so the admin panel can
// CRUD everything independently. All models are registered defensively
// (mongoose.models) because Next.js hot-reloads modules in development.
import mongoose, { Schema, type Model } from 'mongoose';

const tierSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
    label: { type: String, default: '' },
  },
  { _id: false }
);

const baseOpts = { timestamps: true };

const profileSchema = new Schema(
  {
    name: String,
    role: String,
    tagline: String,
    bio: String,
    bio2: String,
    email: String,
    phone: String,
    whatsapp: String,
    location: String,
    github: String,
    linkedin: String,
    devto: String,
    fiverr: String,
    heroRoles: { type: [String], default: [] },
  },
  baseOpts
);

const skillSchema = new Schema(
  {
    title: String,
    command: String,
    items: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const experienceSchema = new Schema(
  {
    role: String,
    company: String,
    period: String,
    points: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const projectSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true, sparse: true },
    description: String,
    tech: { type: [String], default: [] },
    githubUrl: String,
    category: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const serviceSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true, sparse: true },
    description: String,
    tech: { type: [String], default: [] },
    tiers: { type: [tierSchema], default: [] },
    imageUrl: String,
    fiverrUrl: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const educationSchema = new Schema(
  {
    degree: String,
    school: String,
    period: String,
    detail: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const certificationSchema = new Schema(
  {
    title: String,
    year: String,
    issuer: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const articleSchema = new Schema(
  {
    title: String,
    url: String,
    coverImage: String,
    publishedAt: String,
    description: String,
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const faqSchema = new Schema(
  {
    question: String,
    answer: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  baseOpts
);

const messageSchema = new Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    read: { type: Boolean, default: false },
  },
  baseOpts
);

const adminSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
  },
  baseOpts
);

function defineModel(name: string, schema: Schema): Model<any> {
  return (mongoose.models[name] as Model<any>) || mongoose.model(name, schema);
}

export const ProfileModel = defineModel('Profile', profileSchema);
export const SkillModel = defineModel('Skill', skillSchema);
export const ExperienceModel = defineModel('Experience', experienceSchema);
export const ProjectModel = defineModel('Project', projectSchema);
export const ServiceModel = defineModel('Service', serviceSchema);
export const EducationModel = defineModel('Education', educationSchema);
export const CertificationModel = defineModel('Certification', certificationSchema);
export const ArticleModel = defineModel('Article', articleSchema);
export const FaqModel = defineModel('Faq', faqSchema);
export const MessageModel = defineModel('Message', messageSchema);
export const AdminModel = defineModel('Admin', adminSchema);

// Registry used by the generic admin API routes.
export const COLLECTIONS: Record<string, Model<any>> = {
  profile: ProfileModel as Model<any>,
  skills: SkillModel as Model<any>,
  experience: ExperienceModel as Model<any>,
  projects: ProjectModel as Model<any>,
  services: ServiceModel as Model<any>,
  education: EducationModel as Model<any>,
  certifications: CertificationModel as Model<any>,
  articles: ArticleModel as Model<any>,
  faqs: FaqModel as Model<any>,
  messages: MessageModel as Model<any>,
};
