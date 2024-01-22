import { rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  await rm(join(__dirname, '..', 'dist/'), { recursive: true, force: true });
} catch (e) {
  console.error(e?.message ?? e);
  process.exit(1);
}
