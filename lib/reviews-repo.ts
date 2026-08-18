import 'server-only';
import { createHmac } from 'node:crypto';
import type { Client } from '@libsql/client';
import type { CleanReview } from './moderation';

export type StoredReview = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  lang: 'en' | 'es';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

/**
 * Submitter IPs exist only to rate-limit one person, so the raw address never lands in the
 * database — a salted hash answers "is this the same submitter?" without storing who.
 */
export function hashIp(ip: string) {
  const salt = process.env.REVIEW_IP_SALT;
  if (!salt) throw new Error('REVIEW_IP_SALT must be set');
  return createHmac('sha256', salt).update(ip).digest('hex');
}

export async function insertPending(client: Client, review: CleanReview, ipHash: string) {
  const result = await client.execute({
    sql: 'INSERT INTO reviews (name, comment, rating, lang, ip_hash) VALUES (?, ?, ?, ?, ?)',
    args: [review.name, review.comment, review.rating, review.lang, ipHash]
  });
  return Number(result.lastInsertRowid);
}

/** Inserts only while the rolling per-IP quota has room; the check and write are one statement. */
export async function insertPendingWithinLimit(
  client: Client,
  review: CleanReview,
  ipHash: string,
  limit: number,
  hours: number
) {
  const result = await client.execute({
    sql: `INSERT INTO reviews (name, comment, rating, lang, ip_hash)
          SELECT ?, ?, ?, ?, ?
          WHERE ? = 0 OR (
            SELECT COUNT(*) FROM reviews
            WHERE ip_hash = ? AND created_at >= datetime('now', ?)
          ) < ?`,
    args: [
      review.name,
      review.comment,
      review.rating,
      review.lang,
      ipHash,
      limit,
      ipHash,
      `-${hours} hours`,
      limit
    ]
  });
  return result.rowsAffected === 0 ? null : Number(result.lastInsertRowid);
}

export async function countRecentByIp(client: Client, ipHash: string, hours: number) {
  const result = await client.execute({
    sql: `SELECT COUNT(*) AS n FROM reviews
          WHERE ip_hash = ? AND created_at >= datetime('now', ?)`,
    args: [ipHash, `-${hours} hours`]
  });
  return Number(result.rows[0]['n']);
}

export async function listByStatus(client: Client, status: StoredReview['status'], limit = 50) {
  const result = await client.execute({
    sql: `SELECT id, name, comment, rating, lang, status, created_at FROM reviews
          WHERE status = ? ORDER BY created_at DESC, id DESC LIMIT ?`,
    args: [status, limit]
  });
  return result.rows.map(row => ({
    id: Number(row['id']),
    name: String(row['name']),
    comment: String(row['comment']),
    rating: Number(row['rating']),
    lang: row['lang'] === 'es' ? 'es' : 'en',
    status: String(row['status']),
    created_at: String(row['created_at'])
  })) as StoredReview[];
}

export async function setStatus(client: Client, id: number, status: 'approved' | 'rejected') {
  await client.execute({
    sql: `UPDATE reviews SET status = ?, decided_at = datetime('now') WHERE id = ?`,
    args: [status, id]
  });
}
