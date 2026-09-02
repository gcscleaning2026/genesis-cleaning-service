import { describe, expect, it } from 'vitest';
import { canonicalLocation } from '../lib/host-redirect';

describe('canonicalLocation', () => {
  it('sends http apex to https www in one hop, path preserved', () => {
    expect(canonicalLocation('gcscleaning.net', 'http', '/services/deep-cleaning', '?x=1')).toBe(
      'https://www.gcscleaning.net/services/deep-cleaning?x=1'
    );
  });

  it('sends https apex to https www in one hop', () => {
    expect(canonicalLocation('gcscleaning.net', 'https', '/es', '')).toBe('https://www.gcscleaning.net/es');
  });

  it('sends http www to https www in one hop', () => {
    expect(canonicalLocation('www.gcscleaning.net', 'http', '/', '')).toBe('https://www.gcscleaning.net/');
  });

  it('leaves https www alone', () => {
    expect(canonicalLocation('www.gcscleaning.net', 'https', '/areas/essex-county', '')).toBeNull();
  });

  it('ignores preview and unrelated hosts', () => {
    expect(canonicalLocation('genesis-cleaning-service.vercel.app', 'https', '/', '')).toBeNull();
    expect(canonicalLocation('localhost', 'http', '/', '')).toBeNull();
  });
});
