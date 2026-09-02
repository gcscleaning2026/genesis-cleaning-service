/**
 * One-hop canonical host. http and the apex both land on https://www.gcscleaning.net{path}
 * in a single 308 — a hop to https://gcscleaning.net first would be a second redirect for
 * crawlers, and a canonical pointing at a redirect is a canonical pointing away.
 */
export const CANONICAL_HOST = 'www.gcscleaning.net';
export const APEX_HOST = 'gcscleaning.net';

export function canonicalLocation(
  hostHeader: string | null | undefined,
  protoHeader: string | null | undefined,
  pathname: string,
  search = ''
): string | null {
  const host = (hostHeader ?? '').split(':')[0].toLowerCase();
  if (host !== APEX_HOST && host !== CANONICAL_HOST) return null;

  const proto = (protoHeader ?? 'https').split(',')[0].trim().toLowerCase();
  if (host === CANONICAL_HOST && proto === 'https') return null;

  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `https://${CANONICAL_HOST}${path}${search}`;
}
