import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { run } from 'node:test';
import { spec, tap } from 'node:test/reporters';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const parse_integer = (value, message) => {
  const value_as_number = +value;

  if (
    Number.isNaN(value_as_number) ||
    !Number.isSafeInteger(value_as_number) ||
    value_as_number < 0
  ) {
    throw new TypeError(message);
  }

  return value_as_number;
};

const {
  values: { parallel, only, timeout: input_timeout },
  positionals,
} = parseArgs({
  options: {
    parallel: {
      type: 'boolean',
      short: 'p',
      default: false,
    },
    only: {
      type: 'boolean',
      short: 'o',
      default: false,
    },
    timeout: {
      type: 'string',
      short: 't',
    },
  },
  allowPositionals: true,
});

const timeout = input_timeout
  ? parse_integer(input_timeout, 'timeout must be an integer >= 0')
  : undefined;

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'test');

const files =
  positionals.length > 0
    ? positionals
    : (await readdir(dir, { recursive: true }))
        .filter((el) => el.endsWith('.test.ts'))
        .map((el) => join(dir, el));

run({ files, concurrency: parallel, only, timeout })
  .on('test:fail', () => {
    process.exitCode = 1;
  })
  .compose(process.stdout.isTTY ? new spec() : tap)
  .pipe(process.stdout);
