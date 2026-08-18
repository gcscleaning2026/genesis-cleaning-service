import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Mirrors the `@/*` path alias in tsconfig.json, so app/ modules resolve in tests.
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      // The server-only marker throws on import unless the `react-server` export condition
      // is requested, which Next.js does and a Node test runner does not. Swapping it for a
      // no-op keeps the guard real in the build without failing every suite under lib/.
      'server-only': fileURLToPath(new URL('./tests/stubs/server-only.ts', import.meta.url))
    }
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts']
  }
});
