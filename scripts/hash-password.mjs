// Prints the ADMIN_PASSWORD_HASH value. The password is read without putting it in argv.
import { randomBytes, scryptSync } from 'node:crypto';
import { Writable } from 'node:stream';
import { createInterface } from 'node:readline';

if (process.argv.length > 2) {
  console.error('Do not pass the password as a command-line argument; run this script with no arguments.');
  process.exit(1);
}

async function readPassword() {
  if (!process.stdin.isTTY) {
    let value = '';
    process.stdin.setEncoding('utf8');
    for await (const chunk of process.stdin) value += chunk;
    return value.replace(/\r?\n$/, '');
  }

  let muted = false;
  const hiddenOutput = new Writable({
    write(chunk, encoding, callback) {
      if (!muted) process.stderr.write(chunk, encoding);
      callback();
    }
  });
  const prompt = createInterface({ input: process.stdin, output: hiddenOutput, terminal: true });
  const value = await new Promise((resolve) => {
    prompt.question('Admin password: ', (answer) => resolve(answer));
    muted = true;
  });
  muted = false;
  prompt.close();
  process.stderr.write('\n');
  return value;
}

const password = await readPassword();
if (!password) {
  console.error('Password must not be empty.');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
console.log(`${salt}:${hash}`);
