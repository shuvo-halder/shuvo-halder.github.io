import type { Metadata } from 'next';
import Link from 'next/link';
import { getContent, getArticles } from '../lib/content';
import { SITE_URL } from '../lib/seed-data';
import ContactForm from '../components/ContactForm';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shuvo Halder | System & Cloud Infrastructure Engineer',
  description:
    'System & Cloud Infrastructure Engineer in Dhaka, Bangladesh specializing in OpenStack, Proxmox, VMware ESXi, Ceph storage, Kubernetes, Linux, and networking.',
  alternates: { canonical: SITE_URL },
};

export default async function HomePage() {
  const content = await getContent();
  const articles = await getArticles();
  const p = content.profile;

  return (
    <>
      {/* Hero */}
      <section id="hero" className="hero-section" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div>
            <p className="hero-prefix">&gt; whoami</p>
            <h1 id="hero-title" className="hero-title">
              {p.name}
            </h1>
            <p className="hero-role-wrapper">{p.heroRoles[0] || p.role}</p>
            <p className="hero-tagline">{p.tagline}</p>
            <div className="hero-cta-group">
              <Link href="/#projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link href="/#contact" className="btn btn-secondary">
                Contact Me
              </Link>
              <Link href="/services" className="btn btn-secondary">
                Hire Me — from $40
              </Link>
            </div>
          </div>
          <div className="hero-terminal-window" aria-hidden="true">
            <div className="term-titlebar">
              <span className="term-dot red" />
              <span className="term-dot yellow" />
              <span className="term-dot green" />
              <span style={{ marginLeft: '0.5rem' }}>shuvo@infra: ~</span>
            </div>
            <div className="term-body">
              <p>
                <span className="term-prompt">$</span> whoami
              </p>
              <p>shuvo-halder</p>
              <p>
                <span className="term-prompt">$</span> cat /etc/os-release
              </p>
              <p>RHCSA · CCNA · BSc CSE</p>
              <p>
                <span className="term-prompt">$</span> uptime
              </p>
              <p>Assistant System Engineer @ Plexus Cloud</p>
              <p>
                <span className="term-prompt">$</span> echo $LOCATION
              </p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// 01. background</span>
            <h2 id="about-heading" className="section-title">
              About Me
            </h2>
          </header>
          <p className="section-subtitle">{p.bio}</p>
          <p className="section-subtitle">{p.bio2}</p>
          <div className="projects-grid" style={{ marginTop: '1.5rem' }}>
            <div className="project-card">
              <h3 className="project-title">Experience</h3>
              <p className="project-description">Since 2022: Working in IT</p>
            </div>
            <div className="project-card">
              <h3 className="project-title">Virtualization</h3>
              <p className="project-description">OpenStack • Proxmox • ESXi</p>
            </div>
            <div className="project-card">
              <h3 className="project-title">Storage &amp; Orchestration</h3>
              <p className="project-description">Ceph + k3s</p>
            </div>
            <div className="project-card">
              <h3 className="project-title">Certification</h3>
              <p className="project-description">RHCSA Certified</p>
            </div>
            <div className="project-card">
              <h3 className="project-title">Location</h3>
              <p className="project-description">Based in {p.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <div className="container">
          <header className="section-header">
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
            {content.skills
              .filter((s) => s.published)
              .map((group) => (
                <div key={group.title} className="skill-card">
                  <span className="skill-cmd">
                    $ {group.command}
                  </span>
                  <h3 className="project-title">{group.title}</h3>
                  <div>
                    {group.items.map((item) => (
                      <span key={item} className="skill-badge">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section" aria-labelledby="experience-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// 03. journey</span>
            <h2 id="experience-heading" className="section-title">
              Work Experience
            </h2>
            <p className="section-subtitle">
              Hands-on engineering roles across infrastructure, private cloud deployment, and
              system engineering.
            </p>
          </header>
          <div className="exp-list">
            {content.experience
              .filter((e) => e.published)
              .map((job) => (
                <article key={job.role + job.company} className="exp-item">
                  <h3 className="exp-role">{job.role}</h3>
                  <p>
                    <span className="exp-company">@ {job.company}</span>{' '}
                    <span className="exp-period">{job.period}</span>
                  </p>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section" aria-labelledby="projects-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// 04. work</span>
            <h2 id="projects-heading" className="section-title">
              Featured Projects
            </h2>
            <p className="section-subtitle">
              Real-world systems, cloud infrastructure deployments, and automation tooling.
            </p>
          </header>
          <div className="projects-grid">
            {content.projects
              .filter((pr) => pr.published)
              .map((project) => (
                <article key={project.slug} className="project-card">
                  <div className="project-top">
                    <span className="project-folder-icon" aria-hidden="true">
                      $
                    </span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-tech-list">
                    {project.tech.map((t) => (
                      <li key={t} className="project-tech-item">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="project-card-footer">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-cta"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
        <section id="articles" className="section" aria-labelledby="articles-heading">
          <div className="container">
            <header className="section-header">
              <span className="section-tag">// 05. writing</span>
              <h2 id="articles-heading" className="section-title">
                Latest Articles
              </h2>
              <p className="section-subtitle">
                Technical write-ups, cloud architecture breakdowns, and automation guides
                published on dev.to.
              </p>
            </header>
            <div className="articles-grid">
              {articles.map((a) => (
                <article key={a.url} className="article-card">
                  <h3>
                    <a href={a.url} target="_blank" rel="noopener noreferrer">
                      {a.title}
                    </a>
                  </h3>
                  <p className="project-description">{a.description}</p>
                  <p className="article-meta">
                    {a.publishedAt} · dev.to
                  </p>
                </article>
              ))}
            </div>
            <div className="hero-cta-group">
              <a href={p.devto} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                View all on dev.to →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      <section id="certifications" className="section" aria-labelledby="certifications-heading">
        <div className="container">
          <header className="section-header">
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
              .filter((c) => c.published)
              .map((cert) => (
                <div key={cert.title} className="cert-card">
                  <span className="cert-year">{cert.year}</span>
                  <h3 className="project-title">{cert.title}</h3>
                  <p className="project-description">{cert.issuer}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section" aria-labelledby="education-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// 07. academics</span>
            <h2 id="education-heading" className="section-title">
              Education
            </h2>
            <p className="section-subtitle">
              Academic foundations in Computer Science and Engineering.
            </p>
          </header>
          <div className="edu-grid">
            {content.education
              .filter((e) => e.published)
              .map((edu) => (
                <div key={edu.degree} className="edu-card">
                  <h3 className="project-title">{edu.degree}</h3>
                  <p className="project-description">{edu.school}</p>
                  <p className="muted small">{edu.period}</p>
                  {edu.detail && <p className="project-description">{edu.detail}</p>}
                </div>
              ))}
            <div className="edu-card">
              <h3 className="project-title">Languages</h3>
              <p className="project-description">
                Bengali (Native) · English (Professional Working Proficiency)
              </p>
            </div>
            <div className="edu-card">
              <h3 className="project-title">Areas of Interest</h3>
              <p className="project-description">
                Cybersecurity Research · Open Source Contribution · Private Cloud Architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">// 08. let&apos;s connect</span>
            <h2 id="contact-heading" className="section-title">
              Get In Touch
            </h2>
            <p className="section-subtitle">
              Whether you are exploring private cloud deployments, OpenStack virtualization,
              Kubernetes orchestration, or system engineering collaborations, feel free to reach
              out. Based in {p.location}.
            </p>
          </header>
          <div className="contact-wrapper">
            <div className="contact-actions">
              <a href={`mailto:${p.email}`} className="btn btn-primary">
                $ mail {p.email}
              </a>
              <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                WhatsApp {p.phone}
              </a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                GitHub
              </a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                LinkedIn
              </a>
              <a href={p.devto} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                dev.to
              </a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
