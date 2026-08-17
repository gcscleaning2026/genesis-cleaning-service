// One card template shared by the server (which writes approved reviews into the static
// HTML) and the client (which rebuilds the strip after a language switch). Both must emit
// byte-identical markup, or hydration and the GSAP marquee measurement disagree.
export type CardReview = { name: string; comment: string; rating: number };
const REVIEW_CARD = `<article style="flex:0 0 clamp(280px,74vw,352px);display:flex;flex-direction:column">
            <div style="position:relative;background:#fff;border:1px solid #E3ECF3;border-radius:20px;padding:26px 26px 28px;box-shadow:0 10px 30px rgba(11,30,78,.06)">
              <svg class="gi" aria-hidden="true" style="width:24px;height:24px;color:#8FD4EE"><use href="#i-fill-quotes"/></svg>
              <p style="font-size:15.5px;line-height:1.62;color:#2A3A60;margin:12px 0 0">{{ r.c }}</p>
              <span aria-hidden="true" style="position:absolute;left:36px;bottom:-9px;width:16px;height:16px;background:#fff;border-right:1px solid #E3ECF3;border-bottom:1px solid #E3ECF3;transform:rotate(45deg)"></span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;padding:24px 0 0 36px">
              <div role="img" aria-label="{{ r.aria }}" style="position:relative;display:inline-flex;align-self:flex-start;flex:0 0 auto">
              <div style="display:flex;gap:3px;color:#DAE4EC;width:max-content">
                <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
              </div>
              <div style="position:absolute;top:0;left:0;bottom:0;overflow:hidden;width:{{ r.pct }}">
                <div style="display:flex;gap:3px;color:#F5A623;width:max-content">
                  <svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg><svg class="gi" aria-hidden="true" style="width:16px;height:16px"><use href="#i-fill-star"/></svg>
                </div>
              </div>
            </div>
              <p style="font-family:Outfit,sans-serif;font-size:15.5px;font-weight:700;color:#0B1E4E;margin:0">{{ r.n }}</p>
            </div>
          </article>`;
function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderReviewCard(review: CardReview) {
  const rating = Math.max(0, Math.min(5, Number.isFinite(review.rating) ? review.rating : 5));
  return REVIEW_CARD
    .replaceAll('{{ r.c }}', escapeHtml(review.comment))
    .replaceAll('{{ r.n }}', escapeHtml(review.name))
    .replaceAll('{{ r.aria }}', escapeHtml(rating + ' / 5'))
    .replaceAll('{{ r.pct }}', escapeHtml((rating / 5) * 100 + '%'));
}

/**
 * One card per review, in order — no duplication. The marquee needs repeated copies to
 * loop, but only enough to cover the viewport, and only the client knows how wide that is.
 * buildMarquee() clones these nodes at runtime; emitting a second copy here just showed
 * every review twice on a page with one or two of them.
 */
export function renderTrack(reviews: CardReview[]) {
  return reviews.map(renderReviewCard).join('');
}
