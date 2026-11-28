import Link from 'next/link';

export default function Footer({ profile }: { profile: { name: string; role: string; github: string; linkedin: string; devto: string } }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        <div>
          &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.role}
        </div>
        <nav aria-label="Footer Quick Links">
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
          <Link href="/services" className="footer-link">
            Services
          </Link>
          <span className="footer-sep" aria-hidden="true">&bull;</span>
          <Link href="/admin" className="footer-link">
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
