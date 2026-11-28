// Seed script: fills MongoDB with the real portfolio content and creates
// the admin account (bcrypt-hashed — plaintext is never stored).
//
// Usage:
//   1. Copy .env.example to .env and fill in MONGODB_URI, ADMIN_EMAIL,
//      ADMIN_PASSWORD (and JWT_SECRET).
//   2. Run:  npm run seed
//
// The script is idempotent: it replaces the content collections and
// upserts the admin, so re-running it is safe.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Tiny .env parser (no dotenv dependency).
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env — see .env.example');
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing ADMIN_EMAIL / ADMIN_PASSWORD in .env — see .env.example');
  process.exit(1);
}

// Seed data lives in TypeScript; import the compiled shape via a JSON
// snapshot generated from lib/seed-data.ts. To keep this script dependency
// free of ts compilation, the data is inlined below from the same source.
// (Regenerate by copying lib/seed-data.ts content into seed-data.json.)
const dataPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'seed-data.json');
if (!fs.existsSync(dataPath)) {
  console.error(
    'scripts/seed-data.json is missing. Generate it with:\n' +
      "  node -e \"const fs=require('fs');\" # see README.md (seed step)"
  );
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const tierSchema = new mongoose.Schema(
  { name: String, price: Number, deliveryDays: Number, label: String },
  { _id: false }
);
const base = { timestamps: true };
const models = {
  Profile: mongoose.model('Profile', new mongoose.Schema({
    name: String, role: String, tagline: String, bio: String, bio2: String,
    email: String, phone: String, whatsapp: String, location: String,
    github: String, linkedin: String, devto: String, fiverr: String,
    imageUrl: String, resumeUrl: String,
    heroRoles: [String],
  }, base)),
  Skill: mongoose.model('Skill', new mongoose.Schema({
    title: String, command: String, items: [String], order: Number, published: Boolean,
  }, base)),
  Experience: mongoose.model('Experience', new mongoose.Schema({
    role: String, company: String, period: String, points: [String], order: Number, published: Boolean,
  }, base)),
  Project: mongoose.model('Project', new mongoose.Schema({
    title: String, slug: String, description: String, tech: [String],
    githubUrl: String, category: String, badge: String, langDot: String,
    order: Number, published: Boolean,
  }, base)),
  Service: mongoose.model('Service', new mongoose.Schema({
    title: String, slug: String, description: String, tech: [String],
    tiers: [tierSchema], imageUrl: String, fiverrUrl: String, order: Number, published: Boolean,
  }, base)),
  Education: mongoose.model('Education', new mongoose.Schema({
    degree: String, school: String, period: String, detail: String, order: Number, published: Boolean,
  }, base)),
  Certification: mongoose.model('Certification', new mongoose.Schema({
    title: String, year: String, issuer: String, order: Number, published: Boolean,
  }, base)),
  Article: mongoose.model('Article', new mongoose.Schema({
    title: String, url: String, coverImage: String, publishedAt: String,
    description: String, tags: [String], order: Number, published: Boolean,
  }, base)),
  Faq: mongoose.model('Faq', new mongoose.Schema({
    question: String, answer: String, order: Number, published: Boolean,
  }, base)),
  Admin: mongoose.model('Admin', new mongoose.Schema({
    email: { type: String, unique: true }, passwordHash: String,
  }, base)),
};

const collectionMap = {
  profile: 'Profile', skills: 'Skill', experience: 'Experience', projects: 'Project',
  services: 'Service', education: 'Education', certifications: 'Certification',
  articles: 'Article', faqs: 'Faq',
};

async function main() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected to MongoDB.');

  for (const [key, modelName] of Object.entries(collectionMap)) {
    const Model = models[modelName];
    const docs = key === 'profile' ? [data.profile] : data[key];
    await Model.deleteMany({});
    if (docs?.length) await Model.insertMany(docs);
    console.log(`  ${modelName}: ${docs?.length || 0} document(s)`);
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await models.Admin.updateOne(
    { email: ADMIN_EMAIL.toLowerCase() },
    { email: ADMIN_EMAIL.toLowerCase(), passwordHash },
    { upsert: true }
  );
  console.log(`  Admin: ${ADMIN_EMAIL} (password hashed with bcrypt)`);

  console.log('Seed complete. Log in at /admin/login with ADMIN_EMAIL / ADMIN_PASSWORD.');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
