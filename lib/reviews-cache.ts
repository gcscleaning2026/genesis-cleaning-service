import 'server-only';
import { cache } from 'react';
import { getDb } from './db';
import { listByStatus } from './reviews-repo';
import type { CardReview } from './review-card';

/**
 * The approved reviews, fetched once per render.
 *
 * Two things need them and they are in different parts of the tree: the marquee in the page
 * body, and the `aggregateRating` on the business node in the document. `cache()` is what
 * keeps that one query rather than two.
 *
 * A build or a revalidation must never fail because Turso is unreachable: an empty strip and
 * a business node with no rating are far better outcomes than a 500 on the home page.
 */
export const getApprovedReviews = cache(async (): Promise<CardReview[]> => {
  try {
    const rows = await listByStatus(getDb(), 'approved', 24);
    return rows.map(row => ({ name: row.name, comment: row.comment, rating: row.rating }));
  } catch (error) {
    console.error('[reviews] could not load approved reviews', error);
    return [];
  }
});

/**
 * `aggregateRating` for the business node, or null when there is nothing to average.
 *
 * Null rather than a zero or a placeholder on purpose: a rating claimed without reviews
 * behind it is the one piece of structured data that can cost a site more than it earns.
 */
export function aggregateRating(reviews: CardReview[]) {
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    '@type': 'AggregateRating',
    ratingValue: Number((total / reviews.length).toFixed(1)),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };
}
