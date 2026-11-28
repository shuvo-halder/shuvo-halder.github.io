// Hero photo — a client component only because the <img> needs an onError
// fallback (main's onerror= switches to placeholder-avatar.svg). Markup is
// main's .hero-visual / .avatar-frame structure verbatim.
'use client';

export default function HeroPhoto({ imageUrl, webpUrl }: { imageUrl: string; webpUrl: string }) {
  return (
    <div className="hero-visual reveal-item delay-1">
      <div className="avatar-frame">
        <div className="avatar-backdrop" aria-hidden="true" />
        <div className="avatar-img-container">
          <picture className="avatar-picture">
            <source srcSet={webpUrl} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Shuvo Halder - System & Cloud Infrastructure Engineer"
              width={531}
              height={652}
              fetchPriority="high"
              className="avatar-img"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = 'https://shuvo-halder.github.io/assets/images/placeholder-avatar.svg';
              }}
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
