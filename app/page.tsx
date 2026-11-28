// Home page — markup ported from the static site's index.html, section by
// section, with content from the database (seed fallback). Section numbers
// are the renumbered values main.js applies once articles load (articles
// always render here, via the seed fallback, so the numbers are fixed):
// about //01, skills //02, experience //03, projects //04, articles //05,
// certifications //06, education //07, contact //08.
import type { Metadata } from 'next';
import { getContent, getArticles } from '../lib/content';
import { SITE_URL } from '../lib/seed-data';
import ContactForm from '../components/ContactForm';
import RoleTyper from '../components/RoleTyper';
import HeroTerminal from '../components/HeroTerminal';
import HeroPhoto from '../components/HeroPhoto';
import ProjectCard, { GithubIcon } from '../components/ProjectCard';
import PrivateProjects from '../components/PrivateProjects';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
  description:
    'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
  alternates: { canonical: SITE_URL },
};

// Quick facts are static copy from index.html (validated values from the CV).
const QUICK_FACTS = [
  { label: 'Experience', value: 'Since 2022: Working in IT' },
  { label: 'Virtualization', value: 'OpenStack • Proxmox • ESXi' },
  { label: 'Storage & Orchestration', value: 'Ceph + k3s' },
  { label: 'Certification', value: 'RHCSA Certified' },
  { label: 'Location', value: 'Based in Dhaka, Bangladesh' },
];

const LANGUAGES = ['Bengali (Native)', 'English (Professional Working Proficiency)'];
const INTERESTS = ['Cybersecurity Research', 'Open Source Contribution', 'Private Cloud Architecture'];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function truncate140(text: string): string {
  const t = (text || '').trim();
  return t.length > 140 ? `${t.substring(0, 137).trim()}...` : t;
}

export default async function HomePage() {
  const content = await getContent();
  const articles = await getArticles();
  const p = content.profile;

  const openProjects = content.projects
    .filter((x) => x.category === 'Open Source & Automation' && x.published !== false)
    .sort((a, b) => a.order - b.order);
  const privateProjects = content.projects
    .filter((x) => x.category === 'Production & Private Systems' && x.published !== false)
    .sort((a, b) => a.order - b.order);
  const gridSkills = content.skills
    .filter((g) => g.title !== 'Programming & Web' && g.published !== false)
    .sort((a, b) => a.order - b.order);
  const secondarySkills = content.skills.find((g) => g.title === 'Programming & Web');

  const resumeUrl = p.resumeUrl || 'https://shuvo-halder.github.io/assets/resume.pdf';
  const imageUrl = p.imageUrl || 'https://shuvo-halder.github.io/assets/images/shuvo-halder.png';
  const webpUrl = imageUrl.replace(/\.png$/, '.webp');

  return (
    <>
      {/* Hero */}
      <section id="hero" className="hero-section" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-content reveal-item">
            <div className="hero-prefix">
              <span className="brand-prompt">&gt;</span>
              <span>whoami</span>
            </div>

            <h1 id="hero-title" className="hero-title">
              {p.name}
            </h1>

            <div className="hero-role-wrapper">
              <span className="brand-prompt">&gt;</span>
              <RoleTyper roles={p.heroRoles?.length ? p.heroRoles : [p.role]} />
            </div>

            <p className="hero-statement">{p.tagline}</p>

            <HeroTerminal />

            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary">
                <svg
                  className="btn-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                <svg
                  className="btn-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Me
              </a>
              <a
                href={resumeUrl}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="btn-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          <HeroPhoto imageUrl={imageUrl} webpUrl={webpUrl} />
        </div>
      </section>

      {/* About */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag">// 01. background</span>
            <h2 id="about-heading" className="section-title">
              About Me
            </h2>
          </header>

          <div className="about-grid">
            <div className="about-summary reveal-item delay-1">
              <p>{p.bio}</p>
              <p>{p.bio2}</p>
              <div className="about-degree-highlight">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span>B.Sc in CSE, Dhaka International University (expected May 2026)</span>
              </div>
            </div>

            <div className="quick-facts-grid reveal-item delay-2">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label} className="fact-card">
                  <div className="fact-label">{fact.label}</div>
                  <div className="fact-value">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag">// 02. capabilities</span>
            <h2 id="skills-heading" className="section-title">
              Technical Skills
            </h2>
            <p className="section-subtitle">
              Core competencies across cloud architecture, systems engineering, automation, and
              enterprise networking.
            </p>
          </header>

          <div className="skills-grid">
            {gridSkills.map((group, i) => {
              const [cmd, ...pathParts] = group.command.split(' ');
              return (
                <article key={group.title} className={`skill-category-card reveal-item delay-${i + 1}`}>
                  <div className="category-header">
                    <div className="category-cli-header">
                      <span className="term-prompt-sym">$</span>{' '}
                      <span className="term-cmd">{cmd}</span>{' '}
                      <span className="term-path">{pathParts.join(' ')}</span>
                    </div>
                    <h3 className="category-title">{group.title}</h3>
                  </div>
                  <div className="skill-badges">
                    {group.items.map((item) => (
                      <span key={item} className="skill-badge">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {secondarySkills && (
            <div className="secondary-skills-row reveal-item delay-2">
              <div className="category-cli-header">
                <span className="term-prompt-sym">$</span>{' '}
                <span className="term-cmd">ls</span>{' '}
                <span className="term-path">/skills/programming-web</span>
              </div>
              <span className="secondary-skills-label">{secondarySkills.title}</span>
              {secondarySkills.items.map((item) => (
                <span key={item} className="skill-badge">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section" aria-labelledby="experience-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag">// 03. journey</span>
            <h2 id="experience-heading" className="section-title">
              Work Experience
            </h2>
            <p className="section-subtitle">
              Hands-on engineering roles across infrastructure, private cloud deployment, and
              system engineering.
            </p>
          </header>

          <div className="git-log-bar reveal-item">
            <span className="term-prompt-sym">$</span> <span className="term-cmd">git</span>{' '}
            <span className="term-subcmd">log</span>{' '}
            <span className="term-flag">--oneline</span>
          </div>

          <div className="timeline">
            <div className="timeline-progress-line" aria-hidden="true" />
            {content.experience
              .filter((x) => x.published !== false)
              .sort((a, b) => a.order - b.order)
              .map((job, i) => (
                <div
                  key={job.role + job.company}
                  className={`timeline-item reveal-item${i > 0 ? ` delay-${i}` : ''}`}
                >
                  <div className="timeline-marker" aria-hidden="true" />
                  <article className="timeline-content">
                    <div className="timeline-header">
                      <div className="timeline-git-title">
                        <span className="git-commit-node" aria-hidden="true">
                          &bull;
                        </span>
                        <h3 className="timeline-role">{job.role}</h3>
                        <span className="git-at-symbol">@</span>
                        <span className="timeline-company" style={{ marginBottom: 0 }}>
                          {job.company}
                        </span>
                      </div>
                      <span className="timeline-period">{job.period}</span>
                    </div>
                    <ul className="timeline-bullets">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section" aria-labelledby="projects-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag">// 04. work</span>
            <h2 id="projects-heading" className="section-title">
              Featured Projects
            </h2>
            <p className="section-subtitle">
              Real-world systems, cloud infrastructure deployments, and automation tooling.
            </p>
          </header>

          <div className="projects-group-header reveal-item">
            <div className="group-cli-label">
              <span className="term-prompt-sym">$</span> <span className="term-cmd">git</span>{' '}
              <span className="term-subcmd">status</span>{' '}
              <span className="term-flag">--public</span>
            </div>
            <h3 className="projects-group-title">Open Source &amp; Automation</h3>
            <p className="projects-group-desc">
              Public automation tooling, VPS management platforms, and operational scripts.
            </p>
          </div>

          <div className="projects-grid" id="public-projects-grid">
            {openProjects.map((project, i) => (
              <ProjectCard
                key={project.slug || project.title}
                project={project}
                delay={(i % 3) + 1}
              />
            ))}
          </div>

          <div className="projects-all-cta reveal-item">
            <a
              href="https://github.com/shuvo-halder?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon className="btn-icon" />
              View all repositories on GitHub <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="projects-group-header group-b-header reveal-item">
            <div className="group-cli-label">
              <span className="term-prompt-sym">$</span> <span className="term-cmd">ls</span>{' '}
              <span className="term-path">/infra/private-systems</span>
            </div>
            <h3 className="projects-group-title">Production &amp; Private Systems</h3>
            <p className="projects-group-desc">
              Enterprise infrastructure, campus networks, and business platforms built in
              production environments.
            </p>
          </div>

          <PrivateProjects projects={privateProjects} />

          <div className="projects-notice reveal-item">
            <p>
              Some projects are not public due to confidentiality. Demos available on request.
              <a
                href="#contact"
                style={{ color: 'var(--accent)', marginLeft: '0.35rem', fontWeight: 600 }}
              >
                Get in touch &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="section articles-section" aria-labelledby="articles-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag" id="articles-section-tag">
              // 05. writing
            </span>
            <h2 id="articles-heading" className="section-title">
              Latest Articles
            </h2>
            <p className="section-subtitle">
              Technical write-ups, cloud architecture breakdowns, and automation guides published
              on dev.to.
            </p>
          </header>

          <div id="articles-grid" className="articles-grid" aria-live="polite">
            {articles.slice(0, 8).map((article) => (
              <article key={article.url} className="article-card reveal-item">
                {article.coverImage.startsWith('https://') && (
                  <div className="article-cover-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverImage}
                      alt={`${article.title} cover`}
                      loading="lazy"
                      className="article-cover-img"
                    />
                  </div>
                )}
                <div className="article-content">
                  <div className="article-meta-bar">
                    <time className="article-date" dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                    <span className="article-meta-sep" aria-hidden="true">
                      •
                    </span>
                    <span className="article-read-time">
                      {article.readingTimeMinutes || 1} min read
                    </span>
                  </div>
                  <h3 className="article-title">
                    <a
                      className="article-link"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h3>
                  {article.description && (
                    <p className="article-description">{truncate140(article.description)}</p>
                  )}
                  {article.tags.length > 0 && (
                    <div className="article-tags">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="article-tag">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="article-footer">
                    <a
                      className="article-cta"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read on dev.to
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="articles-all-cta reveal-item">
            <a
              href="https://dev.to/shuvo_h"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary articles-view-all"
            >
              <span>View all on dev.to</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <noscript>
            <div className="articles-noscript">
              <p>
                Read technical articles and infrastructure guides directly on{' '}
                <a href="https://dev.to/shuvo_h" target="_blank" rel="noopener noreferrer">
                  dev.to/shuvo_h &rarr;
                </a>
              </p>
            </div>
          </noscript>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="section" aria-labelledby="certifications-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag">// 06. credentials</span>
            <h2 id="certifications-heading" className="section-title">
              Certifications
            </h2>
            <p className="section-subtitle">
              Formal professional certifications and technical specializations.
            </p>
          </header>

          <div className="cert-grid">
            {content.certifications
              .filter((x) => x.published !== false)
              .sort((a, b) => a.order - b.order)
              .map((cert, i) => (
                <article key={cert.title} className={`cert-card reveal-item delay-${i + 1}`}>
                  <div className="cert-header">
                    <h3 className="cert-title">{cert.title}</h3>
                    <span className="cert-year">{cert.year}</span>
                  </div>
                  <div className="cert-issuer">{cert.issuer}</div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section" aria-labelledby="education-heading">
        <div className="container">
          <header className="section-header reveal-item">
            <span className="section-tag">// 07. academics</span>
            <h2 id="education-heading" className="section-title">
              Education
            </h2>
            <p className="section-subtitle">
              Academic foundations in Computer Science and Engineering.
            </p>
          </header>

          <div className="education-grid">
            {content.education
              .filter((x) => x.published !== false)
              .sort((a, b) => a.order - b.order)
              .map((edu, i) => (
                <article
                  key={edu.degree}
                  className={`education-card reveal-item delay-${i + 1}`}
                >
                  <h3 className="education-degree">{edu.degree}</h3>
                  <div className="education-institution">{edu.school}</div>
                  <div className="education-meta">{edu.detail || edu.period}</div>
                </article>
              ))}
          </div>

          <div className="profile-meta-grid reveal-item delay-3">
            <div className="profile-meta-card">
              <div className="profile-meta-title">Languages</div>
              <div className="meta-tags">
                {LANGUAGES.map((lang) => (
                  <span key={lang} className="meta-tag">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-meta-card">
              <div className="profile-meta-title">Areas of Interest</div>
              <div className="meta-tags">
                {INTERESTS.map((interest) => (
                  <span key={interest} className="meta-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="contact-wrapper reveal-item">
            <div className="contact-prompt">// 08. let&apos;s connect</div>
            <h2 id="contact-heading" className="contact-heading">
              Get In Touch
            </h2>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-location">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Based in Dhaka, Bangladesh</span>
            </div>

            <p className="contact-text">
              Whether you are exploring private cloud deployments, OpenStack virtualization,
              Kubernetes orchestration, or system engineering collaborations, feel free to reach
              out.
            </p>

            <div className="contact-actions">
              <a
                href={`mailto:${p.email}?subject=Portfolio%20inquiry`}
                className="btn btn-primary btn-mail-command"
                aria-label={`Send email to ${p.email}`}
              >
                <span className="term-prompt-sym">$</span>
                <span className="cmd-name">mail</span>
                <span className="cmd-arg">{p.email}</span>
              </a>
            </div>

            <div className="social-links">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Shuvo Halder on GitHub"
              >
                <GithubIcon />
                <span>GitHub</span>
              </a>
              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Shuvo Halder on LinkedIn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={p.devto}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Shuvo Halder on dev.to"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
                </svg>
                <span>dev.to</span>
              </a>
              </div>
            </div>

            <div className="contact-form-card">
              <div className="contact-form-head">
                <span className="term-prompt-sym">$</span>
                <span>new message</span>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
