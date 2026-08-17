import { getDb } from '@/lib/db';
import { listByStatus } from '@/lib/reviews-repo';
import { decide } from './actions';

export const dynamic = 'force-dynamic';

const card = { border: '1px solid #E3ECF3', borderRadius: 12, padding: 16, margin: '16px 0', background: '#fff' };
const approveBtn = { padding: '8px 16px', borderRadius: 999, border: 0, background: '#0E9F6E', color: '#fff', fontWeight: 700, cursor: 'pointer' };
const rejectBtn = { padding: '8px 16px', borderRadius: 999, border: '1px solid #E3ECF3', background: '#fff', cursor: 'pointer' };

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
          <p style={{ margin: 0, fontWeight: 700 }}>
            {review.name} — {review.rating}/5 · {review.lang} · {review.created_at}
          </p>
          <p style={{ margin: '8px 0 12px' }}>{review.comment}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <form action={decide}>
              <input type="hidden" name="id" value={review.id} />
              <input type="hidden" name="decision" value="approved" />
              <button type="submit" style={approveBtn}>Approve</button>
            </form>
            <form action={decide}>
              <input type="hidden" name="id" value={review.id} />
              <input type="hidden" name="decision" value="rejected" />
              <button type="submit" style={rejectBtn}>Reject</button>
            </form>
          </div>
        </article>
      ))}

      <h2 style={{ fontSize: 18, marginTop: 40 }}>Published ({approved.length})</h2>
      {approved.length === 0 && <p>No published reviews yet.</p>}
      <ul style={{ paddingLeft: 18 }}>
        {approved.map(review => (
          <li key={review.id} style={{ margin: '6px 0' }}>
            <strong>{review.name}</strong> — {review.rating}/5
            <form action={decide} style={{ display: 'inline', marginLeft: 8 }}>
              <input type="hidden" name="id" value={review.id} />
              <input type="hidden" name="decision" value="rejected" />
              <button type="submit" style={{ border: 0, background: 'none', color: '#B3123F', cursor: 'pointer' }}>
                unpublish
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
