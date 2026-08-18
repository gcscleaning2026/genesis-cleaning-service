// `server-only` resolves to a module that throws unless the bundler asks for the
// `react-server` export condition. Next.js does; a plain Node test runner does not, so the
// real package would fail every suite that touches lib/. Vitest aliases the specifier here
// instead — the marker still does its job in the build, which is the only place it matters.
export {};
