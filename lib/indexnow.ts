import { SITE_ORIGIN } from './i18n';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_PATTERN = /^[A-Za-z0-9-]+$/;

/**
 * Tell IndexNow about a set of URLs. No-op when INDEXNOW_KEY is unset — local and preview
 * deploys should not ping Bing with a key they do not host a matching key file for.
 *
 * Failures are swallowed: a failed ping must not fail the deploy.
 * There is no in-memory "already submitted" latch: serverless cold starts would reset it,
 * and publish/deploy is the durable caller (scripts/submit-indexnow.mts).
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  const key = indexNowKey();
  if (!key || urls.length === 0) return;

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

/** INDEXNOW_KEY as it is on this request / this process, not as it was at config load. */
export function indexNowKey(): string | undefined {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key || !KEY_PATTERN.test(key)) return undefined;
  return key;
}

/** True when this request is the IndexNow key file (`/{INDEXNOW_KEY}.txt`). */
export function isIndexNowKeyFilePath(pathname: string): boolean {
  const key = indexNowKey();
  return Boolean(key) && pathname === `/${key}.txt`;
}
