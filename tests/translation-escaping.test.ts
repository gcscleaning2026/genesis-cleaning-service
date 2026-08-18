import { expect, it, vi } from 'vitest';

it('escapes translation text before server-rendering it as HTML', async () => {
  vi.resetModules();
  const { ES } = await import('../lib/i18n');
  const original = ES['nav.services'];
  ES['nav.services'] = '</a><script>alert(1)</script><a>';

  const { pageHtml } = await import('../lib/render');
  const html = pageHtml('es', []);

  ES['nav.services'] = original;
  expect(html).not.toContain('<script>alert(1)</script>');
  expect(html).toContain('&lt;/a&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;a&gt;');
});
