// Production & Private Systems group — a direct port of
// initPrivateProjectsToggle() from the static site's assets/js/main.js.
// On mobile (<=768px) the grid starts collapsed until the user expands it;
// on desktop it is always visible. The toggle button is only shown on
// mobile (CSS: .private-toggle-wrapper { display: none } above 768px).
'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ProjectItem } from '../lib/types';
import ProjectCard, { LockIcon } from './ProjectCard';

export default function PrivateProjects({ projects }: { projects: ProjectItem[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const updateCollapseState = useCallback(() => {
    if (window.innerWidth <= 768) {
      if (!interacted) setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [interacted]);

  useEffect(() => {
    updateCollapseState();
    window.addEventListener('resize', updateCollapseState);
    return () => window.removeEventListener('resize', updateCollapseState);
  }, [updateCollapseState]);

  const toggle = () => {
    setInteracted(true);
    const next = !collapsed;
    setCollapsed(next);
    if (!next) {
      // Reveal the cards immediately, like main.js does on expand.
      document
        .querySelectorAll('#private-projects-grid .reveal-item')
        .forEach((el) => el.classList.add('is-visible'));
    }
  };

  return (
    <>
      <div className="private-toggle-wrapper">
        <button
          type="button"
          className="btn btn-secondary private-toggle-btn"
          id="toggle-private-projects"
          aria-expanded={!collapsed}
          aria-controls="private-projects-grid"
          onClick={toggle}
        >
          <LockIcon className="btn-icon" />
          <span className="toggle-text">
            {collapsed
              ? `Show Production & Private Systems (${projects.length})`
              : 'Hide Production & Private Systems'}
          </span>
          <svg
            className="toggle-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div
        className={`projects-grid${collapsed ? ' is-collapsed' : ''}`}
        id="private-projects-grid"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug || project.title} project={project} delay={(i % 3) + 1} />
        ))}
      </div>
    </>
  );
}
