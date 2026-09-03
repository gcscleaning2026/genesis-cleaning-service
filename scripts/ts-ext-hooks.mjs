import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Resolve `@/` and extensionless relative imports to `.ts` so postbuild can load the app graph. */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    let rel = specifier.slice(2);
    if (!/\.[A-Za-z0-9]+$/.test(rel)) rel += '.ts';
    return nextResolve(pathToFileURL(join(root, rel)).href, context);
  }
  if ((specifier.startsWith('.') || specifier.startsWith('/')) && !/\.[A-Za-z0-9]+$/.test(specifier)) {
    try {
      return await nextResolve(specifier + '.ts', context);
    } catch {
      // fall through to the default resolver
    }
  }
  return nextResolve(specifier, context);
}
