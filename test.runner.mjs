import { run } from 'node:test';
import { spec, tap } from 'node:test/reporters';
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'test');

const files = (await readdir(dir, { recursive: true }))
  .filter((el) => el.endsWith('.test.ts'))
  .map((el) => join(dir, el));

run({ files })
  .compose(process.stdout.isTTY ? new spec() : tap)
  .pipe(process.stdout);
