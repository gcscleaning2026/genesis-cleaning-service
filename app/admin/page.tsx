import { getDb } from '@/lib/db';
import { listByStatus, type StoredReview } from '@/lib/reviews-repo';
import { decide } from './actions';

export const dynamic = 'force-dynamic';

const card = { border: '1px solid #E3ECF3', borderRadius: 12, padding: 16, margin: '16px 0', background: '#fff' };
const approveBtn = { padding: '8px 16px', borderRadius: 999, border: 0, background: '#0E9F6E', color: '#fff', fontWeight: 700, cursor: 'pointer' };
const rejectBtn = { padding: '8px 16px', borderRadius: 999, border: '1px solid #E3ECF3', background: '#fff', cursor: 'pointer' };
const meta = { fontSize: 13, color: '#56658A' };

/** Half stars exist in the data, so the fill is a percentage rather than N glyphs. */
function Stars({ rating }: { rating: number }) {
  const pct = `${Math.max(0, Math.min(5, rating)) / 5 * 100}%`;
  return (
    <span role="img" aria-label={`${rating} out of 5`} style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
      <span style={{ color: '#DAE4EC', letterSpacing: 2 }}>★★★★★</span>
      <span style={{ position: 'absolute', inset: 0, width: pct, overflow: 'hidden', color: '#F5A623', letterSpacing: 2, whiteSpace: 'nowrap' }}>
        ★★★★★
      </span>
    </span>
  );
}

/** Full text plus the details that decide a borderline review, collapsed by default. */
function FullReview({ review }: { review: StoredReview }) {
  return (
    <details style={{ marginTop: 10 }}>
      <summary style={{ cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#0B1E4E' }}>View full review</summary>
      <p style={{ margin: '10px 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{review.comment}</p>
      <p style={{ ...meta, margin: '10px 0 0' }}>
        #{review.id} · {review.rating}/5 · language {review.lang} · {review.comment.trim().split(/\s+/).length} words ·
        {' '}{review.comment.length} characters · submitted {review.created_at} UTC
      </p>
    </details>
  );
}

function DecisionButton({ id, decision, label, style }: { id: number; decision: 'approved' | 'rejected'; label: string; style: React.CSSProperties }) {
  return (
    <form action={decide}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="decision" value={decision} />
      <button type="submit" style={style}>{label}</button>
    </form>
  );
}

export default async function AdminPage() {
  const db = getDb();
  const [pending, approved] = await Promise.all([
    listByStatus(db, 'pending', 50),
    listByStatus(db, 'approved', 50)
  ]);

  return (
    <main style={{ maxWidth: 760, margin: '48px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24 }}>Pending reviews ({pending.length})</h1>
      {pending.length === 0 && <p>Nothing waiting. New reviews arrive by email.</p>}
      {pending.map(review => (
        <article key={review.id} style={card}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <strong style={{ fontSize: 16 }}>{review.name}</strong>
            <Stars rating={review.rating} />
            <span style={meta}>{review.rating}/5 · {review.lang} · {review.created_at} UTC</span>
          </div>
          <p style={{ margin: '10px 0 0', lineHeight: 1.6 }}>{review.comment}</p>
          <FullReview review={review} />
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <DecisionButton id={review.id} decision="approved" label="Approve" style={approveBtn} />
            <DecisionButton id={review.id} decision="rejected" label="Reject" style={rejectBtn} />
          </div>
        </article>
      ))}

      <h2 style={{ fontSize: 18, marginTop: 40 }}>Published ({approved.length})</h2>
      {approved.length === 0 && <p>No published reviews yet.</p>}
      {approved.map(review => (
        <article key={review.id} style={{ ...card, background: '#F7FBFD' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <strong style={{ fontSize: 16 }}>{review.name}</strong>
            <Stars rating={review.rating} />
            <span style={meta}>{review.rating}/5 · {review.lang} · {review.created_at} UTC</span>
          </div>
          <p style={{ margin: '10px 0 0', lineHeight: 1.6 }}>{review.comment}</p>
          <FullReview review={review} />
          <div style={{ marginTop: 14 }}>
            <DecisionButton
              id={review.id}
              decision="rejected"
              label="Unpublish"
              style={{ ...rejectBtn, color: '#B3123F' }}
            />
          </div>
        </article>
      ))}
    </main>
  );
}
