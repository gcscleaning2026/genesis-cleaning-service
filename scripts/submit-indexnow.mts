/**
 * Deploy-time IndexNow ping. Invoked after `next build` (vercel.ts buildCommand) so the
 * POST is not tied to a serverless sitemap request that can freeze before fetch completes.
 *
 * No-op when INDEXNOW_KEY is unset.
 */
import { indexNowKey, submitToIndexNow } from '../lib/indexnow.ts';
import { sitemapEntries } from '../app/sitemap.ts';

if (!indexNowKey()) {
  console.log('[indexnow] skip: INDEXNOW_KEY unset');
} else {
  await submitToIndexNow(sitemapEntries().map(entry => entry.url));
}
