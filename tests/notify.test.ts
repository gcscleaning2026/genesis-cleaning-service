import { beforeEach, describe, expect, it, vi } from 'vitest';

const send = vi.fn().mockResolvedValue({ data: { id: 'email_1' }, error: null });
vi.mock('resend', () => ({ Resend: class { emails = { send }; } }));

describe('notifyOwnerOfPendingReview', () => {
  beforeEach(() => {
    send.mockClear();
    send.mockResolvedValue({ data: { id: 'email_1' }, error: null });
    process.env.RESEND_API_KEY = 'test-key';
    process.env.OWNER_EMAIL = 'owner@example.com';
    process.env.REVIEW_FROM_EMAIL = 'Genesis Reviews <onboarding@resend.dev>';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  it('emails the owner with the review and a link to the admin page', async () => {
    const { notifyOwnerOfPendingReview } = await import('../lib/notify');
    await notifyOwnerOfPendingReview({ id: 7, name: 'Ana R.', comment: 'Spotless work.', rating: 5, lang: 'es' });
    expect(send).toHaveBeenCalledTimes(1);
    const payload = send.mock.calls[0][0];
    expect(payload.to).toEqual(['owner@example.com']);
    expect(payload.subject).toContain('Ana R.');
    expect(payload.html).toContain('Spotless work.');
    expect(payload.html).toContain('https://example.com/admin');
  });

  it('escapes review content in the email body', async () => {
    const { notifyOwnerOfPendingReview } = await import('../lib/notify');
    await notifyOwnerOfPendingReview({ id: 8, name: '<b>x</b>', comment: 'a & b', rating: 4, lang: 'en' });
    expect(send.mock.calls[0][0].html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(send.mock.calls[0][0].html).toContain('a &amp; b');
  });

  it('does not throw when the mail provider fails', async () => {
    send.mockRejectedValueOnce(new Error('rate limited'));
    const { notifyOwnerOfPendingReview } = await import('../lib/notify');
    await expect(notifyOwnerOfPendingReview({ id: 9, name: 'Ana', comment: 'ok', rating: 5, lang: 'en' }))
      .resolves.toBeUndefined();
  });

  it('skips sending when configuration is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const { notifyOwnerOfPendingReview } = await import('../lib/notify');
    await notifyOwnerOfPendingReview({ id: 10, name: 'Ana', comment: 'ok', rating: 5, lang: 'en' });
    expect(send).not.toHaveBeenCalled();
  });
});
