// Admin panel configuration: one entry per editable collection.
// `fields` drive both the generic CRUD form in the admin UI and the
// server-side allow-list in the admin API routes. Types:
//   text | textarea | number | checkbox | url | list (one item per line)
export interface AdminField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'url' | 'list';
}

export interface AdminCollection {
  key: string;
  label: string;
  singular: string;
  fields: AdminField[];
  /** fields shown as columns in the list table */
  listColumns: string[];
}

export const ADMIN_COLLECTIONS: AdminCollection[] = [
  {
    key: 'profile',
    label: 'Profile / About',
    singular: 'Profile',
    listColumns: ['name', 'role', 'email'],
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role / Title', type: 'text' },
      { key: 'tagline', label: 'Hero tagline', type: 'textarea' },
      { key: 'bio', label: 'Bio (paragraph 1)', type: 'textarea' },
      { key: 'bio2', label: 'Bio (paragraph 2)', type: 'textarea' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone / WhatsApp number', type: 'text' },
      { key: 'whatsapp', label: 'WhatsApp URL', type: 'url' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'github', label: 'GitHub URL', type: 'url' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
      { key: 'devto', label: 'Dev.to URL', type: 'url' },
      { key: 'fiverr', label: 'Fiverr URL', type: 'url' },
      { key: 'heroRoles', label: 'Hero rotating roles (one per line)', type: 'list' },
    ],
  },
  {
    key: 'skills',
    label: 'Skills',
    singular: 'Skill Group',
    listColumns: ['title', 'command'],
    fields: [
      { key: 'title', label: 'Group title', type: 'text' },
      { key: 'command', label: 'Terminal command (e.g. ls /skills/cloud)', type: 'text' },
      { key: 'items', label: 'Skills (one per line)', type: 'list' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'experience',
    label: 'Experience',
    singular: 'Job',
    listColumns: ['role', 'company', 'period'],
    fields: [
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'period', label: 'Period (e.g. May 2025 – Present)', type: 'text' },
      { key: 'points', label: 'Bullet points (one per line)', type: 'list' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'projects',
    label: 'Projects',
    singular: 'Project',
    listColumns: ['title', 'category'],
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tech', label: 'Tech stack (one per line)', type: 'list' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    singular: 'Service',
    listColumns: ['title', 'slug'],
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tech', label: 'Tech tags (one per line)', type: 'list' },
      { key: 'imageUrl', label: 'Image URL', type: 'url' },
      { key: 'fiverrUrl', label: 'Fiverr gig URL', type: 'url' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'education',
    label: 'Education',
    singular: 'Education',
    listColumns: ['degree', 'school'],
    fields: [
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'school', label: 'School', type: 'text' },
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'detail', label: 'Detail', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'certifications',
    label: 'Certifications',
    singular: 'Certification',
    listColumns: ['title', 'year', 'issuer'],
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'issuer', label: 'Issuer', type: 'text' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'articles',
    label: 'Articles',
    singular: 'Article',
    listColumns: ['title', 'publishedAt'],
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'coverImage', label: 'Cover image URL', type: 'url' },
      { key: 'publishedAt', label: 'Published date', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tags', label: 'Tags (one per line)', type: 'list' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    singular: 'FAQ',
    listColumns: ['question'],
    fields: [
      { key: 'question', label: 'Question', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'textarea' },
      { key: 'order', label: 'Order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'messages',
    label: 'Messages (Inbox)',
    singular: 'Message',
    listColumns: ['name', 'email', 'subject'],
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'subject', label: 'Subject', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
      { key: 'read', label: 'Read', type: 'checkbox' },
    ],
  },
];

export function getCollection(key: string): AdminCollection | undefined {
  return ADMIN_COLLECTIONS.find((c) => c.key === key);
}

/** Service tiers are edited as JSON in the admin form; kept separate. */
export const SERVICE_TIER_HELP =
  'Tiers are edited as JSON, e.g. [{"name":"Basic","price":49,"deliveryDays":2,"label":"..."}]';
