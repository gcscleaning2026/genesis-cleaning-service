import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('submitToIndexNow', () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: 'OK' });

  beforeEach(() => {
    fetchMock.mockClear();
    vi.resetModules();
    vi.stubGlobal('fetch', fetchMock);
    delete process.env.INDEXNOW_KEY;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.INDEXNOW_KEY;
  });

  it('is a no-op when INDEXNOW_KEY is missing', async () => {
    const { submitToIndexNow } = await import('../lib/indexnow');
    await submitToIndexNow(['https://www.gcscleaning.net/']);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('is a no-op when INDEXNOW_KEY is blank', async () => {
    process.env.INDEXNOW_KEY = '   ';
    const { submitToIndexNow } = await import('../lib/indexnow');
    await submitToIndexNow(['https://www.gcscleaning.net/']);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the url list to IndexNow when a key is set', async () => {
    process.env.INDEXNOW_KEY = 'test-key-123';
    const { submitToIndexNow } = await import('../lib/indexnow');
    await submitToIndexNow(['https://www.gcscleaning.net/', 'https://www.gcscleaning.net/es']);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.indexnow.org/indexnow');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body.host).toBe('www.gcscleaning.net');
    expect(body.key).toBe('test-key-123');
    expect(body.keyLocation).toBe('https://www.gcscleaning.net/test-key-123.txt');
    expect(body.urlList).toEqual(['https://www.gcscleaning.net/', 'https://www.gcscleaning.net/es']);
  });

  it('does not throw when the endpoint fails', async () => {
    process.env.INDEXNOW_KEY = 'test-key-123';
    fetchMock.mockRejectedValueOnce(new Error('offline'));
    const { submitToIndexNow } = await import('../lib/indexnow');
    await expect(submitToIndexNow(['https://www.gcscleaning.net/'])).resolves.toBeUndefined();
  });

  it('does not latch on an in-memory submitted flag across calls', async () => {
    process.env.INDEXNOW_KEY = 'test-key-123';
    const { submitToIndexNow } = await import('../lib/indexnow');
    await submitToIndexNow(['https://www.gcscleaning.net/']);
    await submitToIndexNow(['https://www.gcscleaning.net/es']);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe('isIndexNowKeyFilePath', () => {
  afterEach(() => {
    delete process.env.INDEXNOW_KEY;
  });

  it('is false when the key is missing', async () => {
    delete process.env.INDEXNOW_KEY;
    vi.resetModules();
    const { isIndexNowKeyFilePath } = await import('../lib/indexnow');
    expect(isIndexNowKeyFilePath('/anything.txt')).toBe(false);
  });

  it('matches /{key}.txt from the runtime env', async () => {
    process.env.INDEXNOW_KEY = 'runtime-key-9';
    vi.resetModules();
    const { isIndexNowKeyFilePath } = await import('../lib/indexnow');
    expect(isIndexNowKeyFilePath('/runtime-key-9.txt')).toBe(true);
    expect(isIndexNowKeyFilePath('/other.txt')).toBe(false);
    expect(isIndexNowKeyFilePath('/robots.txt')).toBe(false);
  });
});
