// Prints the ADMIN_PASSWORD_HASH value for a password. The password itself is never stored.
//   node scripts/hash-password.mjs "the password"
import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];
if (!password) {
  console.error('usage: node scripts/hash-password.mjs "<password>"');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
console.log(`${salt}:${hash}`);
