import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The runtime is ~1100 lines of imperative DOM code carried over from the Vite build
    // with `// @ts-nocheck` at the top. Typing it is a separate piece of work; until then
    // the directive is deliberate, not an oversight. Unused `catch (e)` bindings are the
    // same story — every one of them is a `try { ... } catch (e) {}` around storage or
    // history access that is expected to fail silently.
    files: ["components/site-runtime.tsx"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { caughtErrors: "none" }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
