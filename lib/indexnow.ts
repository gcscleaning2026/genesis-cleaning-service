import { SITE_ORIGIN } from './i18n';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Sitemap generation can run more than once in a process. One POST per process is enough.
let submitted = false;

/**
 * Tell IndexNow about a set of URLs. No-op when INDEXNOW_KEY is unset — local and preview
 * deploys should not ping Bing with a key they do not host a matching key file for.
 *
 * Failures are swallowed: a sitemap that cannot reach IndexNow is still a sitemap.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key || urls.length === 0 || submitted) return;
  submitted = true;

  const host = new URL(SITE_ORIGIN).host;
  const payload = {
    host,
    key,
    keyLocation: `${SITE_ORIGIN}/${key}.txt`,
    urlList: urls
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.error(`[indexnow] ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('[indexnow] submit failed', error);
  }
}

export function indexNowKey(): string | undefined {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key || undefined;
}
