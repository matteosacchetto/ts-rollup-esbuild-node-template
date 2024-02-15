import { resolve } from 'node:path';

/**
 * Watch additional files
 *
 * @param {object} opt
 * @param {string[]} opt.files files to add to watch
 */
export function watcher({ files }) {
  return {
    // Custon plugin to watch for additional files
    name: 'watcher',
    buildStart() {
      if (process.env.ROLLUP_WATCH === 'true')
        for (const file of files) {
          this.addWatchFile(resolve(file));
        }
    },
  };
}
