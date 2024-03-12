import { resolve } from 'node:path';

export function watcher({ files }) {
  return {
    name: 'watcher',
    buildStart() {
      if (process.env.ROLLUP_WATCH === 'true')
        for (const file of files) {
          this.addWatchFile(resolve(file));
        }
    },
  };
}
