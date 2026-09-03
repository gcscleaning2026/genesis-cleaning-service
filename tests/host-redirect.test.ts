import { describe, expect, it } from 'vitest';
import { canonicalLocation, comboServiceRedirect } from '../lib/host-redirect';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

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

describe('comboServiceRedirect', () => {
  it('301/308s residential-commercial-cleaning to house-cleaning, not commercial', () => {
    expect(comboServiceRedirect('/services/residential-commercial-cleaning')).toBe(
      '/services/house-cleaning'
    );
    expect(comboServiceRedirect('/es/services/residential-commercial-cleaning')).toBe(
      '/es/services/house-cleaning'
    );
    expect(comboServiceRedirect('/services/residential-commercial-cleaning')).not.toBe(
      '/services/commercial-cleaning'
    );
    expect(comboServiceRedirect('/es/services/residential-commercial-cleaning')).not.toBe(
      '/es/services/commercial-cleaning'
    );
  });

  it('leaves house-cleaning, commercial-cleaning, and unrelated paths alone', () => {
    expect(comboServiceRedirect('/services/house-cleaning')).toBeNull();
    expect(comboServiceRedirect('/services/commercial-cleaning')).toBeNull();
    expect(comboServiceRedirect('/es/services/house-cleaning')).toBeNull();
    expect(comboServiceRedirect('/pricing')).toBeNull();
    expect(comboServiceRedirect('/areas/orange')).toBeNull();
  });

  it('is wired in next.config.ts as a permanent redirect', () => {
    const nextConfig = readFileSync(join(rootDir, 'next.config.ts'), 'utf8');
    expect(nextConfig).toMatch(/source:\s*'\/services\/residential-commercial-cleaning'/);
    expect(nextConfig).toMatch(/source:\s*'\/es\/services\/residential-commercial-cleaning'/);
    expect(nextConfig).toMatch(/destination:\s*'\/services\/house-cleaning'/);
    expect(nextConfig).toMatch(/destination:\s*'\/es\/services\/house-cleaning'/);
    expect(nextConfig).toMatch(/permanent:\s*true/);
    expect(nextConfig).not.toMatch(/destination:\s*'\/services\/commercial-cleaning'/);
    expect(nextConfig).not.toMatch(/destination:\s*'\/es\/services\/commercial-cleaning'/);
  });
});
