// Project card — markup ported verbatim from the static site's index.html.
// Open-source cards get the folder icon, a GitHub icon link and a
// "View on GitHub" footer CTA; private-system cards get the lock badge
// instead and no footer. Shared by the home page (server) and the
// PrivateProjects toggle (client).
import type { ProjectItem } from '../lib/types';

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg
      className="project-folder-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  );
}

export default function ProjectCard({ project, delay }: { project: ProjectItem; delay: number }) {
  const isPrivate = Boolean(project.badge);
  return (
    <article className={`project-card reveal-item delay-${delay}`}>
      <div className="project-top">
        <FolderIcon />
        {isPrivate ? (
          <span className="project-private-badge">
            <LockIcon />
            {project.badge}
          </span>
        ) : (
          project.githubUrl && (
            <div className="project-links">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-link"
                aria-label={`View ${project.title} GitHub repository`}
              >
                <GithubIcon />
              </a>
            </div>
          )
        )}
      </div>
      <h3 className="project-title">
        {project.langDot && <span className={`lang-dot ${project.langDot}`} aria-hidden="true" />}
        {project.title}
      </h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-tech-list">
        {project.tech.map((t) => (
          <li key={t} className="project-tech-item">
            {t}
          </li>
        ))}
      </ul>
      {!isPrivate && project.githubUrl && (
        <div className="project-card-footer">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-cta"
          >
            <GithubIcon />
            View on GitHub <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      )}
    </article>
  );
}
