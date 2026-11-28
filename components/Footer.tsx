// Footer — markup ported verbatim from the static site's index.html.
// Main has Email + "↑ Back to top" (the Next.js version was missing both).
// Services + Admin links are kept after them: the admin panel needs a
// discoverable entry point on the dynamic site (intentional addition).
import Link from 'next/link';

export default function Footer({
  profile,
}: {
  profile: { name: string; role: string; github: string; linkedin: string; devto: string; email: string };
}) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-line-info">
          &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.role}
        </div>
        <nav className="footer-links" aria-label="Footer Quick Links">
          <a href={profile.github} className="footer-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <a href={profile.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <a href={profile.devto} className="footer-link" target="_blank" rel="noopener noreferrer">
            dev.to
          </a>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <a href={`mailto:${profile.email}`} className="footer-link">
            Email
          </a>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <Link href="/services" className="footer-link">
            Services
          </Link>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <Link href="/admin" className="footer-link">
            Admin
          </Link>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <a href="#hero" className="footer-link footer-link-top" aria-label="Scroll back to top">
            &uarr; Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
