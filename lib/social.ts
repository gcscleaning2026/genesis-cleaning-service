/**
 * The agency's social profiles, in one place because three consumers need them and a
 * mismatch between them is silent: the footer and contact-card links in SITE_HTML, and the
 * `sameAs` array in the CleaningService JSON-LD. `sameAs` is how Google and the AI crawlers
 * tie this site to the profiles it already knows, so the URLs there have to be the canonical
 * profile addresses — no tracking or locale query strings.
 */
export type SocialProfile = {
  /** Used for aria-label and title; brand names are identical in English and Spanish. */
  name: string;
  href: string;
  /** `<symbol>` id from the sprite at the top of SITE_HTML. */
  icon: string;
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/gcs.genesis/', icon: 'i-bold-instagram-logo' },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61593303294684',
    icon: 'i-bold-facebook-logo'
  },
  { name: 'TikTok', href: 'https://www.tiktok.com/@gcsgenesis', icon: 'i-bold-tiktok-logo' }
];

export const SAME_AS = SOCIAL_PROFILES.map(profile => profile.href);

/**
 * `rel="me"` alongside `noopener` states the reverse of `sameAs` in the markup itself, which
 * is what identity consumers (and Mastodon-style verification) read.
 */
export function socialIconLinks(size: number, gap: number) {
  const links = SOCIAL_PROFILES.map(
    profile =>
      `<a href="${profile.href}" target="_blank" rel="me noopener" aria-label="${profile.name}" title="${profile.name}" style="display:inline-flex;color:inherit;transition:opacity .2s ease" style-hover="opacity:.7"><svg class="gi" aria-hidden="true" style="width:${size}px;height:${size}px"><use href="#${profile.icon}"/></svg></a>`
  );
  return `<span style="display:inline-flex;align-items:center;gap:${gap}px">${links.join('')}</span>`;
}
