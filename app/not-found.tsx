// 404 page — markup ported from the static site's 404.html (terminal-style
// diagnostics window). The layout supplies the header and footer.
import type { Metadata } from 'next';
import Link from 'next/link';
import NotFoundPath from '../components/NotFoundPath';
import { GithubIcon } from '../components/ProjectCard';

export const metadata: Metadata = {
  title: 'Page Not Found | Shuvo Halder',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="error-main">
      <div className="container error-container">
      <div className="error-badge-404" aria-hidden="true">
        404
      </div>

      <div className="error-terminal-window" aria-label="Error Terminal Diagnostics">
        <div className="terminal-titlebar">
          <div className="terminal-dots" aria-hidden="true">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="terminal-title">shuvo@infra: ~</div>
          <div className="terminal-badge" aria-hidden="true">
            bash
          </div>
        </div>
        <div className="terminal-body error-terminal-body">
          <div className="term-line">
            <span className="term-prompt">$</span>
            <span className="term-input">
              cd <NotFoundPath />
            </span>
          </div>
          <div className="term-output error-term-output">
            bash: cd: <NotFoundPath />: No such file or directory
          </div>
          <div className="term-line">
            <span className="term-prompt">$</span>
            <span className="term-input">echo $?</span>
          </div>
          <div className="term-output error-term-code">404</div>
          <div className="term-line">
            <span className="term-prompt">$</span>
            <span className="terminal-cursor-block" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="error-text-group">
        <h1 className="error-heading">Page not found</h1>
        <p className="error-description">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="error-cta-group">
        <Link href="/" className="btn btn-primary">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
        <Link href="/#projects" className="btn btn-secondary">
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
        </Link>
        <a
          href="https://github.com/shuvo-halder"
          className="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="btn-icon" />
          My GitHub
        </a>
      </div>
    </div>
    </div>
  );
}
