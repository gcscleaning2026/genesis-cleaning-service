import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const script = fileURLToPath(new URL('../scripts/hash-password.mjs', import.meta.url));

describe('hash-password script', () => {
  it('rejects a password supplied in process arguments', () => {
    const result = spawnSync(process.execPath, [script, 'visible-in-process-list'], { encoding: 'utf8' });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Do not pass the password as a command-line argument');
    expect(result.stdout).not.toContain('visible-in-process-list');
  });

  it('reads non-interactive input from stdin', () => {
    const result = spawnSync(process.execPath, [script], { encoding: 'utf8', input: 'a long password\n' });
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toMatch(/^[a-f0-9]{32}:[a-f0-9]{128}$/);
    expect(result.stdout).not.toContain('a long password');
  });
});
