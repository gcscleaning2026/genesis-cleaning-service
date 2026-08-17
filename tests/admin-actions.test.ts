import { describe, expect, it, vi } from 'vitest';

const setStatus = vi.fn();
const revalidatePath = vi.fn();
let sessionValid = true;

vi.mock('next/cache', () => ({ revalidatePath }));
vi.mock('next/headers', () => ({ cookies: async () => ({ get: () => ({ value: 'token' }) }) }));
vi.mock('@/lib/admin-session', () => ({
  ADMIN_COOKIE: 'gcs_admin',
  isValidSessionToken: async () => sessionValid
}));
vi.mock('@/lib/db', () => ({ getDb: () => ({}) }));
vi.mock('@/lib/reviews-repo', () => ({ setStatus }));

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe('decide', () => {
  it('approves a review and revalidates both public pages', async () => {
    sessionValid = true;
    setStatus.mockClear();
    revalidatePath.mockClear();
    const { decide } = await import('../app/admin/actions');
    await decide(form({ id: '7', decision: 'approved' }));
    expect(setStatus).toHaveBeenCalledWith({}, 7, 'approved');
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(revalidatePath).toHaveBeenCalledWith('/es');
  });

  it('refuses to act without a valid session', async () => {
    sessionValid = false;
    setStatus.mockClear();
    const { decide } = await import('../app/admin/actions');
    await expect(decide(form({ id: '7', decision: 'approved' }))).rejects.toThrow('Not authorised');
    expect(setStatus).not.toHaveBeenCalled();
  });

  it('rejects an unknown decision value', async () => {
    sessionValid = true;
    setStatus.mockClear();
    const { decide } = await import('../app/admin/actions');
    await expect(decide(form({ id: '7', decision: 'delete-everything' }))).rejects.toThrow('Bad decision');
    expect(setStatus).not.toHaveBeenCalled();
  });

  it('rejects a bad review id', async () => {
    sessionValid = true;
    setStatus.mockClear();
    const { decide } = await import('../app/admin/actions');
    await expect(decide(form({ id: 'abc', decision: 'approved' }))).rejects.toThrow('Bad review id');
    expect(setStatus).not.toHaveBeenCalled();
  });
});
